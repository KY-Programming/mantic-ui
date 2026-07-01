const path = require('path');
const fs = require('fs');
const readline = require('readline');
const { spawnSync } = require('child_process');

const rootDir = path.join(__dirname, '..');

const groups = {
    mantic: {
        label: 'mantic  (mantic-ui, mantic-ui-doc, fomantic-ui, semantic-ui)',
        packages: [
            { file: 'projects/mantic-ui/package.json', build: 'mantic:build' },
            { file: 'projects/mantic-ui-doc/package.json', build: 'doc:build' },
            { file: 'projects/fomantic-ui/package.json', build: 'fomantic:build' },
            { file: 'projects/semantic-ui/package.json', build: 'semantic:build' }
        ]
    },
    eslint: {
        label: 'eslint  (eslint-config)',
        packages: [
            { file: 'projects/eslint-config/package.json', build: 'eslint:build' }
        ]
    }
};

const parts = [
    { key: 'revision', label: 'revision  (x.x.X)', index: 2 },
    { key: 'minor', label: 'minor     (x.X.0)', index: 1 },
    { key: 'major', label: 'major     (X.0.0)', index: 0 }
];

function readPackage(relativePath) {
    const fullPath = path.join(rootDir, relativePath);
    const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return { fullPath, json };
}

function bumpVersion(version, partIndex) {
    const segments = version.split('.').map(s => parseInt(s, 10));
    while (segments.length < 3) segments.push(0);
    segments[partIndex] = segments[partIndex] + 1;
    for (let i = partIndex + 1; i < segments.length; i++) segments[i] = 0;
    return segments.join('.');
}

function select(question, options, formatter) {
    return new Promise((resolve, reject) => {
        if (!process.stdin.isTTY) {
            reject(new Error('Interactive selection requires a TTY.'));
            return;
        }

        let index = 0;
        let drawnLines = 0;

        const render = (initial) => {
            if (!initial) {
                readline.moveCursor(process.stdout, 0, -drawnLines);
                readline.clearScreenDown(process.stdout);
            }
            const lines = [];
            lines.push('\x1b[36m?\x1b[0m \x1b[1m' + question + '\x1b[0m');
            lines.push('  \x1b[2m(use ↑/↓ arrows, enter to confirm, esc to cancel)\x1b[0m');
            options.forEach((opt, i) => {
                const text = formatter ? formatter(opt, i) : opt;
                if (i === index) {
                    lines.push('\x1b[32m❯ ' + text + '\x1b[0m');
                } else {
                    lines.push('  ' + text);
                }
            });
            const out = lines.join('\n') + '\n';
            process.stdout.write(out);
            drawnLines = lines.length;
        };

        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.resume();

        const onKey = (_str, key) => {
            if (!key) return;
            if (key.ctrl && key.name === 'c') {
                cleanup();
                process.stdout.write('\n');
                process.exit(130);
            }
            if (key.name === 'escape') {
                cleanup();
                process.stdout.write('\n');
                process.exit(0);
            }
            if (key.name === 'up' || (key.name === 'k' && !key.ctrl)) {
                index = (index - 1 + options.length) % options.length;
                render(false);
            } else if (key.name === 'down' || (key.name === 'j' && !key.ctrl)) {
                index = (index + 1) % options.length;
                render(false);
            } else if (key.name === 'return') {
                cleanup();
                resolve(index);
            }
        };

        const cleanup = () => {
            process.stdin.removeListener('keypress', onKey);
            process.stdin.setRawMode(false);
            process.stdin.pause();
        };

        process.stdin.on('keypress', onKey);
        render(true);
    });
}

function confirm(question, defaultYes) {
    return new Promise((resolve) => {
        if (!process.stdin.isTTY) {
            resolve(defaultYes);
            return;
        }
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
        const hint = defaultYes ? '(Y/n)' : '(y/N)';
        rl.question('\x1b[36m?\x1b[0m \x1b[1m' + question + '\x1b[0m \x1b[2m' + hint + '\x1b[0m ', (answer) => {
            rl.close();
            const a = (answer || '').trim().toLowerCase();
            if (a === '') {
                resolve(defaultYes);
            } else {
                resolve(a === 'y' || a === 'yes');
            }
        });
    });
}

function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[3J\x1b[H');
}

async function main() {
    const groupKeys = Object.keys(groups);
    const groupOptions = groupKeys.map(k => groups[k]);

    clearScreen();
    const groupIndex = await select(
        'Which package group?',
        groupOptions,
        (opt) => opt.label
    );
    const group = groupOptions[groupIndex];

    const packages = group.packages.map(entry => {
        const pkg = readPackage(entry.file);
        return {
            file: entry.file,
            build: entry.build,
            fullPath: pkg.fullPath,
            json: pkg.json,
            currentVersion: pkg.json.version
        };
    });

    const previewVersion = packages[0].currentVersion;

    clearScreen();
    const partIndex = await select(
        'Which part to bump? (current: ' + previewVersion + ')',
        parts,
        (opt) => {
            const next = bumpVersion(previewVersion, opt.index);
            return opt.label.padEnd(20) + '  \x1b[2m→\x1b[0m  \x1b[33m' + next + '\x1b[0m';
        }
    );
    const part = parts[partIndex];

    clearScreen();

    // Compute all next versions first, then build a name -> version map so cross-dependencies
    // between the group's packages can be pinned to the exact new version.
    const versionByName = {};
    packages.forEach(pkg => {
        pkg.nextVersion = bumpVersion(pkg.currentVersion, part.index);
        if (pkg.json.name) {
            versionByName[pkg.json.name] = pkg.nextVersion;
        }
    });

    const dependencySections = ['dependencies', 'peerDependencies', 'optionalDependencies', 'devDependencies'];

    packages.forEach(pkg => {
        pkg.json.version = pkg.nextVersion;

        // Keep references between the group's packages (e.g. fomantic/semantic/doc depending on
        // @mantic-ui/angular) pinned to the exact new version of the depended-on package.
        const updatedDeps = [];
        dependencySections.forEach(section => {
            const deps = pkg.json[section];
            if (!deps) return;
            Object.keys(deps).forEach(depName => {
                if (Object.prototype.hasOwnProperty.call(versionByName, depName) && deps[depName] !== versionByName[depName]) {
                    deps[depName] = versionByName[depName];
                    updatedDeps.push(depName + '@' + versionByName[depName]);
                }
            });
        });

        const text = JSON.stringify(pkg.json, null, 2) + '\n';
        fs.writeFileSync(pkg.fullPath, text);
        const rel = path.relative(rootDir, pkg.fullPath);
        console.log('\x1b[32m√\x1b[0m  ' + rel.padEnd(40) + '  \x1b[2m' + pkg.currentVersion + '\x1b[0m  \x1b[2m→\x1b[0m  \x1b[33m' + pkg.nextVersion + '\x1b[0m');
        updatedDeps.forEach(dep => {
            console.log('     \x1b[2m↳ dep\x1b[0m  ' + dep);
        });
    });

    console.log('');
    for (const pkg of packages) {
        console.log('\x1b[36m▶\x1b[0m  npm run ' + pkg.build);
        const result = spawnSync('npm run ' + pkg.build, {
            cwd: rootDir,
            stdio: 'inherit',
            shell: true
        });
        if (result.status !== 0) {
            console.error('\x1b[31m✗  Build failed for ' + pkg.build + ' (exit ' + result.status + ')\x1b[0m');
            process.exit(result.status || 1);
        }
    }

    console.log('');
    console.log('\x1b[32m✓  All builds completed successfully.\x1b[0m');
    packages.forEach(pkg => {
        const name = pkg.json.name || pkg.file;
        console.log('   \x1b[2m' + name.padEnd(28) + '\x1b[0m  \x1b[33m' + pkg.nextVersion + '\x1b[0m');
    });
    console.log('');

    const shouldPublish = await confirm('Publish these packages to npm?', false);
    if (!shouldPublish) {
        console.log('\x1b[2m  Skipped publishing.\x1b[0m');
        return;
    }

    console.log('');
    for (const pkg of packages) {
        const publishScript = pkg.build.replace(':build', ':publish');
        console.log('\x1b[36m▶\x1b[0m  npm run ' + publishScript);
        const result = spawnSync('npm run ' + publishScript, {
            cwd: rootDir,
            stdio: 'inherit',
            shell: true
        });
        if (result.status !== 0) {
            console.error('\x1b[31m✗  Publish failed for ' + publishScript + ' (exit ' + result.status + ')\x1b[0m');
            process.exit(result.status || 1);
        }
    }

    console.log('');
    console.log('\x1b[32m✓  All packages published successfully.\x1b[0m');
}

main().catch(err => {
    console.error('\x1b[31m' + (err && err.message ? err.message : err) + '\x1b[0m');
    process.exit(1);
});
