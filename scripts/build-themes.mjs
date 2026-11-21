// Compiles the Semantic UI / Fomantic UI themes from their LESS sources (semantic-ui-less, fomantic-ui-less) into the
// plain CSS files the theme libraries ship. The output is checked in, so building a library or serving the
// documentation app never needs this step: run it after changing a theme's `less` folder or upgrading a source package.
//
//   node scripts/build-themes.mjs              all themes
//   node scripts/build-themes.mjs semantic     one theme
//
// A theme's `less` folder is laid over the source package root, exactly like a regular Semantic UI project: its
// `theme.config`, `site/` and `themes/` win over the package's files, everything else comes from the package. The
// definitions import `../../theme.config` relative to themselves, so nothing has to be written into node_modules.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const workspace = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(path.join(workspace, 'package.json'));
const less = require('less');
const postcss = require('postcss');

// less only logs, e.g. an :extend in a site override that matches nothing (a selector changed upstream). The notice
// that targeting a selector with combinators "can have unexpected behavior" comes for every such :extend, which is
// the point of the site overrides, so it is no warning here. Since less 4.9 the Semantic / Fomantic definitions also
// raise the "numeric-variable-name" deprecation (`@1px`, `@4px`, ...). Those files are the pinned upstream packages and
// cannot be changed, so the deprecation is skipped there only; in the theme's own less folder it still fails the build.
// less 5 drops these names: a less major means a newer upstream package or a patch layer, not just an npm update.
let warnings = 0;
less.logger.addListener({
    warn: message => {
        if (message.includes('Targeting complex selectors')) {
            return;
        }
        if (message.includes('Variable names beginning with a number') && /[\\/]node_modules[\\/](semantic|fomantic)-ui-less[\\/]/.test(message)) {
            return;
        }
        warnings++;
        console.warn(`\x1b[33mWARNING\x1b[0m ${message}`);
    }
});

// The components mantic has Angular components for. Both themes ship the same set.
const components = [
    'globals/reset', 'globals/site',
    'elements/button', 'elements/container', 'elements/divider', 'elements/flag', 'elements/header', 'elements/icon',
    'elements/image', 'elements/input', 'elements/label', 'elements/list', 'elements/loader', 'elements/placeholder',
    'elements/segment',
    'collections/form', 'collections/grid', 'collections/menu', 'collections/message', 'collections/table',
    'modules/accordion', 'modules/checkbox', 'modules/dimmer', 'modules/dropdown', 'modules/modal', 'modules/popup',
    'modules/progress', 'modules/search', 'modules/sidebar', 'modules/tab', 'modules/transition',
    'views/card'
];

// Each theme:
// - less: laid over the package root (theme.config, site/, themes/)
// - output: one CSS file per component
// - fontFaces: the @font-face rules of a component are moved out of its CSS into a component of their own, so an app
//   opts into the fonts (e.g. m-semantic-ui-icons-local). Their font path is relative to that component, which lets
//   ng-packagr inline the fonts: an absolute path would break every app served below a base href.
// - assets: the package's default theme assets are copied there (fonts, flag sprite)
const themes = {
    semantic: {
        package: 'semantic-ui-less',
        less: 'projects/semantic-ui/less',
        output: 'projects/semantic-ui/src/lib/styles/components',
        fontFaces: {
            icon: 'projects/semantic-ui/src/lib/semantic-ui-icons-local/semantic-ui-icons-local.component.css'
        },
        assets: 'projects/semantic-ui/assets/themes/default/assets'
    },
    fomantic: {
        package: 'fomantic-ui-less',
        less: 'projects/fomantic-ui/less',
        output: 'projects/fomantic-ui/src/lib/styles/components',
        fontFaces: {
            icon: 'projects/fomantic-ui/src/lib/fomantic-ui-icons-local/fomantic-ui-icons-local.component.css',
            site: 'projects/fomantic-ui/src/lib/fomantic-ui-lato-local/fomantic-ui-lato-local.component.css'
        },
        assets: 'projects/fomantic-ui/assets/themes/default/assets'
    }
};

const exists = file => fs.existsSync(file) && fs.statSync(file).isFile();
const isInside = (parent, child) => {
    const relative = path.relative(parent, child);
    return !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
};

/** Serves every file below the package root from the theme's `less` folder when it has one, else from the package. */
const createOverlayPlugin = (packageRoot, overlayRoot) => {
    class OverlayFileManager extends less.FileManager {
        supports(filename, currentDirectory) {
            return isInside(packageRoot, path.resolve(currentDirectory, filename));
        }

        supportsSync() {
            return false;
        }

        async loadFile(filename, currentDirectory) {
            const file = path.resolve(currentDirectory, filename);
            const overlay = path.join(overlayRoot, path.relative(packageRoot, file));
            const source = exists(overlay) ? overlay : file;
            if (!exists(source)) {
                // the type tells less it is a missing file, which an (optional) import silently skips
                throw { type: 'File', message: `'${filename}' wasn't found` };
            }
            // keep the virtual path below the package root, so relative imports of the loaded file resolve in the overlay too
            return { contents: fs.readFileSync(source, 'utf8'), filename: file };
        }
    }

    return { install: (_, pluginManager) => pluginManager.addFileManager(new OverlayFileManager()) };
};

const createHeader = ({ name, version, homepage }, component) => [
    '/*!',
    ` * ${name} ${version} - ${component}`,
    ` * ${homepage}`,
    ' *',
    ' * Generated by scripts/build-themes.mjs from the LESS sources and this theme\'s less folder. Do not edit,',
    ' * change the less folder and run the script again.',
    ' *',
    ' * Released under the MIT license',
    ' */',
    ''
].join('\n');

const buildTheme = async (name, theme) => {
    const packageRoot = path.dirname(require.resolve(`${theme.package}/package.json`));
    const packageJson = JSON.parse(fs.readFileSync(path.join(packageRoot, 'package.json'), 'utf8'));
    const overlayRoot = path.join(workspace, theme.less);
    const outputRoot = path.join(workspace, theme.output);
    const plugin = createOverlayPlugin(packageRoot, overlayRoot);
    fs.mkdirSync(outputRoot, { recursive: true });

    for (const component of components) {
        const element = path.basename(component);
        const filename = path.join(packageRoot, 'definitions', `${component}.less`);
        // math 'always': the definitions are written for the less 2 behaviour, where every operation is evaluated
        const result = await less.render(fs.readFileSync(filename, 'utf8'), { filename, plugins: [plugin], math: 'always' });
        const root = postcss.parse(result.css);
        // the definitions keep every comment of the variable files they import, the generated header replaces them
        root.walkComments(comment => comment.remove());
        const fontFaceFile = theme.fontFaces[element];
        if (fontFaceFile) {
            const fontFaces = postcss.root();
            root.walkAtRules('font-face', rule => {
                rule.remove();
                fontFaces.append(rule);
            });
            writeCss(path.join(workspace, fontFaceFile), createHeader(packageJson, `${element} fonts`), fontFaces);
        }
        writeCss(path.join(outputRoot, `${element}.css`), createHeader(packageJson, element), root);
    }
    copyDirectory(path.join(packageRoot, 'themes', 'default', 'assets'), path.join(workspace, theme.assets));
    console.log(`${name}: ${components.length} components built from ${theme.package} ${packageJson.version} into ${theme.output}`);
};

const writeCss = (file, header, root) => {
    root.raws.after = '\n';
    // one blank line between rules, none inside them
    const css = root.toString().replace(/^\s*\n/gm, '').replace(/^\s+/, '').replace(/}\n(?=\S)/g, '}\n\n');
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, header + css);
};

const copyDirectory = (source, target) => {
    fs.rmSync(target, { recursive: true, force: true });
    fs.cpSync(source, target, { recursive: true });
};

const requested = process.argv.slice(2);
const unknown = requested.filter(name => !themes[name]);
if (unknown.length) {
    console.error(`Unknown theme(s): ${unknown.join(', ')}. Known: ${Object.keys(themes).join(', ')}`);
    process.exit(1);
}
for (const name of requested.length ? requested : Object.keys(themes)) {
    await buildTheme(name, themes[name]);
}
if (warnings) {
    console.error(`${warnings} warning(s), see above`);
    process.exit(1);
}
