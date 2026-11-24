// Writes dist/documentation/browser/sitemap.xml after `ng build`: one url per page of the mantic section, and for a page
// with tabs one per tab, the way the tab group names them in the url (/mantic/button/examples). The pages come from
// src/app/app.routes.ts and the tabs from the templates of the page components, so a new page or tab is in the sitemap
// without anyone keeping a list. Anything the script cannot read for sure (a tab inside @if, a bound label) fails the
// build instead of silently leaving a page out.
//
// Only /mantic/ is listed: /semantic/ and /fomantic/ show the same examples with another theme, so they are duplicates
// for a search engine. /iframe/ (embedded copies) and the test page are left out as well.
import { parseTemplate, TmplAstElement, TmplAstIfBlock } from '@angular/compiler';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const origin = 'https://mantic-ui.ky-programming.de';
const section = 'mantic';
// Routes of the section that are not documentation
const excludedPaths = ['test', '**'];

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const routesPath = join(root, 'src', 'app', 'app.routes.ts');
const outputPath = join(root, 'dist', 'documentation', 'browser');

function fail(message) {
    console.error(`\x1b[31mSitemap: ${message}\x1b[0m`);
    process.exit(1);
}

function parseSource(path) {
    return ts.createSourceFile(path, readFileSync(path, 'utf8'), ts.ScriptTarget.Latest, true);
}

/** The value of a string property of an object literal, undefined when there is none */
function getString(object, name) {
    const property = object.properties.find(entry => ts.isPropertyAssignment(entry) && entry.name.getText() === name);
    if (!property) {
        return undefined;
    }
    if (!ts.isStringLiteralLike(property.initializer)) {
        fail(`${name} is no string literal: ${property.getText()}`);
    }
    return property.initializer.text;
}

function getProperty(object, name) {
    return object.properties.find(entry => ts.isPropertyAssignment(entry) && entry.name.getText() === name)?.initializer;
}

const routesSource = parseSource(routesPath);
const constants = new Map();
const imports = new Map();
for (const statement of routesSource.statements) {
    if (ts.isVariableStatement(statement)) {
        for (const declaration of statement.declarationList.declarations) {
            constants.set(declaration.name.getText(), declaration.initializer);
        }
    }
    if (ts.isImportDeclaration(statement)) {
        for (const element of statement.importClause?.namedBindings?.elements ?? []) {
            imports.set(element.name.text, statement.moduleSpecifier.text);
        }
    }
}

/** The route objects of an array literal, with spread constants (...sharedRoutes) resolved */
function getRoutes(array) {
    if (!array || !ts.isArrayLiteralExpression(array)) {
        fail(`routes are no array literal: ${array?.getText()}`);
    }
    return array.elements.flatMap(element => {
        if (ts.isSpreadElement(element)) {
            const spread = constants.get(element.expression.getText());
            if (!spread || !ts.isArrayLiteralExpression(spread)) {
                fail(`cannot resolve ${element.getText()}`);
            }
            return getRoutes(spread);
        }
        if (!ts.isObjectLiteralExpression(element)) {
            fail(`route is no object literal: ${element.getText()}`);
        }
        return [element];
    });
}

/** True when a template node (an element, @if, @for, @switch, ng-template, ...) has a tab anywhere below it */
function containsTab(node) {
    if (node instanceof TmplAstElement && node.name === 'm-tab') {
        return true;
    }
    const nested = [node.children, node.branches, node.cases, node.empty ? [node.empty] : undefined].filter(Boolean).flat();
    return nested.some(containsTab);
}

/** True for an `@if (isDev)` without @else: tabs the production build never shows (isDev = isDevMode()) */
function isDevOnly(node) {
    return node instanceof TmplAstIfBlock && node.branches.length === 1 && node.branches[0].expression?.source?.trim() === 'isDev';
}

/** The tab names of the routed tab group in the template of a component, as the tab group puts them in the url */
function getTabNames(componentName) {
    const importPath = imports.get(componentName);
    if (!importPath) {
        fail(`no import found for ${componentName}`);
    }
    const componentPath = resolve(dirname(routesPath), importPath + '.ts');
    const templateUrl = /templateUrl:\s*'([^']+)'/.exec(readFileSync(componentPath, 'utf8'))?.[1];
    if (!templateUrl) {
        fail(`${componentName} has no templateUrl`);
    }
    const templatePath = resolve(dirname(componentPath), templateUrl);
    const template = parseTemplate(readFileSync(templatePath, 'utf8'), templatePath);
    if (template.errors?.length) {
        fail(`${templatePath}: ${template.errors.map(error => error.msg).join(', ')}`);
    }
    const tabGroups = [];
    const findTabGroups = nodes => {
        for (const node of nodes ?? []) {
            if (node instanceof TmplAstElement && node.name === 'm-tab-group' && node.attributes.some(attribute => attribute.name === 'selectByRoute')) {
                tabGroups.push(node);
            }
            findTabGroups(node.children);
        }
    };
    findTabGroups(template.nodes);
    if (tabGroups.length !== 1) {
        fail(`${templatePath} has ${tabGroups.length} tab groups with selectByRoute, expected one`);
    }
    return tabGroups[0].children.flatMap(node => {
        if (node instanceof TmplAstElement && node.name === 'm-tab') {
            if (node.inputs.some(input => input.name === 'name' || input.name === 'label')) {
                fail(`${templatePath}: a tab with a bound name or label, its url is only known at runtime`);
            }
            const name = node.attributes.find(attribute => attribute.name === 'name')?.value;
            const label = node.attributes.find(attribute => attribute.name === 'label')?.value;
            // Same rule as TabGroupComponent.toName in projects/mantic-ui
            return [name ? name.toLowerCase() : label.toLowerCase().replaceAll(/[^a-zA-Z0-9]/g, '-').replaceAll(/-+/g, '-')];
        }
        if (isDevOnly(node)) {
            return [];
        }
        if (containsTab(node)) {
            fail(`${templatePath}: tabs inside ${node.name ?? node.constructor.name}, which tabs exist is only known at runtime`);
        }
        return [];
    });
}

const appRoutes = constants.get('routes');
if (!appRoutes || !ts.isArrayLiteralExpression(appRoutes)) {
    fail('no routes array in app.routes.ts');
}
const paths = [];
for (const route of getRoutes(appRoutes)) {
    const children = getProperty(route, 'children');
    // The start page: the empty route of the layout without a section
    if (getString(route, 'path') === '' && children && getRoutes(children).some(child => getString(child, 'path') === '' && getProperty(child, 'component'))) {
        paths.push('/');
    }
    // The sections with navigation hang below the empty root path; /iframe/<section> has the same names but is no page
    if (!children || getString(route, 'path') !== '') {
        continue;
    }
    const sectionRoute = getRoutes(children).find(child => getString(child, 'path') === section);
    if (!sectionRoute) {
        continue;
    }
    for (const page of getRoutes(getProperty(sectionRoute, 'children'))) {
        const path = getString(page, 'path');
        if (excludedPaths.includes(path) || getProperty(page, 'redirectTo')) {
            continue;
        }
        if (!path.includes(':')) {
            paths.push(`/${section}/${path}`);
            continue;
        }
        if (!path.endsWith('/:tab')) {
            fail(`unknown route parameter in ${section}/${path}`);
        }
        const component = getProperty(page, 'component')?.getText();
        for (const tab of getTabNames(component)) {
            paths.push(`/${section}/${path.replace(':tab', tab)}`);
        }
    }
}
if (!paths.includes('/') || paths.length < 2) {
    fail(`found only ${paths.join(', ')}, the routes changed their shape`);
}
const pages = [...new Set(paths)];

if (!existsSync(outputPath)) {
    fail(`output path does not exist: ${outputPath}`);
}
const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...pages.map(page => `  <url><loc>${origin}${page}</loc></url>`),
    '</urlset>',
    ''
].join('\n');
const sitemapPath = join(outputPath, 'sitemap.xml');
writeFileSync(sitemapPath, xml);
console.log('\x1b[36mUPDATE\x1b[0m', sitemapPath);
console.log('\x1b[32m√\x1b[0m', `Sitemap written with ${pages.length} pages`);
console.log('');
