const path = require('path');
const fs = require('fs');
const os = require('os');
const readline = require('readline');
const { spawnSync } = require('child_process');

const rootDir = path.join(__dirname, '..');

const groups = {
    mantic: {
        label: 'mantic  (mantic-ui, mantic-ui-doc, fomantic-ui, semantic-ui)',
        displayName: 'mantic UI',
        packages: [
            { file: 'projects/mantic-ui/package.json', build: 'mantic:build' },
            { file: 'projects/mantic-ui-doc/package.json', build: 'doc:build' },
            { file: 'projects/fomantic-ui/package.json', build: 'fomantic:build' },
            { file: 'projects/semantic-ui/package.json', build: 'semantic:build' }
        ]
    },
    eslint: {
        label: 'eslint  (eslint-config)',
        displayName: 'ESLint Config',
        packages: [
            { file: 'projects/eslint-config/package.json', build: 'eslint:build' }
        ]
    }
};

const parts = [
    { key: 'revision', label: 'revision       (x.x.X)', next: (v) => bumpVersion(v, 2) },
    { key: 'minor', label: 'minor          (x.X.0)', next: (v) => bumpVersion(v, 1) },
    { key: 'major', label: 'major          (X.0.0)', next: (v) => bumpVersion(v, 0) },
    { key: 'revisionPreview', label: 'rev. preview   (x.x.x-preview.X)', next: bumpRevisionPreview },
    { key: 'minorPreview', label: 'minor preview  (x.x-preview.X.0)', next: bumpMinorPreview },
    { key: 'skip', label: 'skip           (no version change)', next: (v) => v }
];

function readPackage(relativePath) {
    const fullPath = path.join(rootDir, relativePath);
    const json = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
    return { fullPath, json };
}

// Local preview builds use "x.x.x-preview.X" (previewing the next revision) or "x.x-preview.X.0"
// (previewing the next minor, whose exact revision isn't fixed yet). Split the numeric base from
// the "-preview.…" suffix so each bump variant below can reason about them independently.
function parseVersion(version) {
    const str = String(version);
    const match = /-preview\.(.+)$/.exec(str);
    const base = match ? str.slice(0, match.index) : str;
    return {
        baseSegments: base.split('.').map(s => parseInt(s, 10)),
        previewSegments: match ? match[1].split('.').map(s => parseInt(s, 10)) : null
    };
}

// A preview build already represents the upcoming revision, so finalizing it via a revision bump
// should just drop the "-preview" suffix rather than incrementing past it.
function bumpVersion(version, partIndex) {
    const { baseSegments, previewSegments } = parseVersion(version);
    const segments = baseSegments.slice(0, 3);
    while (segments.length < 3) segments.push(0);
    if (!(previewSegments && partIndex === 2)) {
        segments[partIndex] = segments[partIndex] + 1;
    }
    for (let i = partIndex + 1; i < segments.length; i++) segments[i] = 0;
    return segments.join('.');
}

// Start or continue a "x.x.x-preview.X" preview of the next revision.
function bumpRevisionPreview(version) {
    const { baseSegments, previewSegments } = parseVersion(version);
    const segments = baseSegments.slice(0, 3);
    while (segments.length < 3) segments.push(0);

    const continuing = previewSegments && previewSegments.length === 1 && baseSegments.length >= 3;
    if (!continuing) segments[2] = segments[2] + 1;
    const iteration = continuing ? previewSegments[0] + 1 : 1;
    return segments.join('.') + '-preview.' + iteration;
}

// Start or continue a "x.x-preview.X.0" preview of the next minor (revision not yet fixed).
function bumpMinorPreview(version) {
    const { baseSegments, previewSegments } = parseVersion(version);
    const continuing = previewSegments && previewSegments.length === 2;

    if (continuing) {
        const majorMinor = baseSegments.slice(0, 2);
        while (majorMinor.length < 2) majorMinor.push(0);
        return majorMinor.join('.') + '-preview.' + (previewSegments[0] + 1) + '.0';
    }

    const segments = baseSegments.slice(0, 3);
    while (segments.length < 3) segments.push(0);
    segments[1] = segments[1] + 1;
    return segments[0] + '.' + segments[1] + '-preview.1.0';
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
            lines.push('      \x1b[2m(use ↑/↓ arrows, enter to confirm, esc to cancel)\x1b[0m');
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

// ---- git -----------------------------------------------------------------

function gitCapture(args) {
    const result = spawnSync('git', args, { cwd: rootDir, encoding: 'utf8' });
    return { status: result.status, out: result.stdout || '' };
}

function gitRun(args) {
    const result = spawnSync('git', args, { cwd: rootDir, stdio: 'inherit' });
    return result.status;
}

// Refuse to start when the working tree has uncommitted changes anywhere in the repo — the
// prepare-release commit should only ever contain the version-bump files, and a dirty tree would
// make that commit (and the tag/release built on top of it) misleading.
function checkCleanRepo() {
    const status = gitCapture(['status', '--porcelain']);
    if (status.status !== 0) {
        console.error('\x1b[31mgit status failed — is this a git repository?\x1b[0m');
        process.exit(1);
    }
    const dirty = status.out.split('\n').map(l => l.trimEnd()).filter(Boolean);
    if (dirty.length === 0) return;

    console.error('\x1b[31mUncommitted changes in the working tree — commit or stash them first:\x1b[0m');
    dirty.forEach(line => console.error('  ' + line));
    process.exit(1);
}

// Offer to commit just the version-bump files (default yes), mirroring the KY.AI bump workflow.
// Declining leaves the changes uncommitted but does not stop the rest of the pipeline.
async function commitVersionFiles(files) {
    if (!files.length) {
        console.log('\x1b[2mNo version files changed — nothing to commit.\x1b[0m');
        return;
    }
    console.log('');
    const doCommit = await confirm('Commit these changes?', true);
    if (!doCommit) {
        console.log('\x1b[2mLeft uncommitted.\x1b[0m');
        return;
    }
    const relFiles = files.map(f => path.relative(rootDir, f));
    if (gitRun(['commit', '-m', 'chore: prepare release', '--', ...relFiles]) !== 0) {
        console.error('\x1b[31mgit commit failed — nothing committed.\x1b[0m');
    }
}

function pushBranch() {
    console.log('\x1b[36m▶\x1b[0m  git push origin HEAD');
    return gitRun(['push', 'origin', 'HEAD']) === 0;
}

// Create an annotated tag at HEAD, unless it already exists (idempotent — a re-run after a failed
// push still picks up tags an earlier run already created).
function ensureTag(tag, message) {
    const exists = gitCapture(['rev-parse', '-q', '--verify', 'refs/tags/' + tag]).status === 0;
    if (exists) {
        console.log('\x1b[2mskip    ' + tag + ' (already exists)\x1b[0m');
        return true;
    }
    if (gitRun(['tag', '-a', tag, '-m', message]) !== 0) {
        console.error('\x1b[31mfailed to create tag ' + tag + '\x1b[0m');
        return false;
    }
    console.log('\x1b[32m√\x1b[0m created ' + tag);
    return true;
}

function pushTag(tag) {
    console.log('\x1b[36m▶\x1b[0m  git push origin ' + tag);
    return gitRun(['push', 'origin', tag]) === 0;
}

// A local clone can be missing tags pushed from elsewhere; fetch first so the "does this tag
// already exist" check and the release-notes "previous tag" lookup both see the full picture.
function fetchTags() {
    console.log('\x1b[36m▶\x1b[0m  git fetch origin --tags');
    return gitRun(['fetch', 'origin', '--tags']) === 0;
}

// ---- GitHub release --------------------------------------------------------

function checkGhCli() {
    if (spawnSync('gh', ['--version'], { cwd: rootDir, stdio: 'ignore' }).status !== 0) {
        console.error('\x1b[31mGitHub CLI not found — install it (https://cli.github.com) to create releases.\x1b[0m');
        return false;
    }
    if (spawnSync('gh', ['auth', 'status'], { cwd: rootDir, stdio: 'ignore' }).status !== 0) {
        console.error('\x1b[31mNot logged in to the GitHub CLI — run "gh auth login".\x1b[0m');
        return false;
    }
    return true;
}

// Every feat:/fix: line since the group's previous same-prefix tag, scoped to the group's package
// folders. Checked per line (not per commit), so a mixed commit keeps just its feat:/fix: lines.
function releaseNotes(tagPrefix, tag, paths) {
    const allTags = gitCapture(['tag', '-l', '--sort=-v:refname']).out
        .split('\n').map(s => s.trim()).filter(Boolean);

    const prefixedTags = allTags.filter(t => t.startsWith(tagPrefix + '-v'));
    const currentIndex = prefixedTags.indexOf(tag);
    let prev = currentIndex >= 0 ? prefixedTags[currentIndex + 1] : undefined;

    // First release under the new "<group>-v<version>" scheme — this repo's 71 earlier releases
    // are bare version tags (e.g. "22.0.4"). Fall back to the newest one so notes cover just what's
    // new instead of the entire repo history.
    if (!prev) {
        prev = allTags.find(t => t !== tag && /^\d+\.\d+\.\d+$/.test(t));
    }

    const range = prev ? prev + '..' + tag : tag;

    const raw = gitCapture(['log', '--no-merges', '--pretty=format:%B', range, '--', ...paths]).out;
    const lines = raw.split('\n')
        .map(l => l.trim())
        .filter(l => /^(feat|fix)(\([^)]*\))?:/i.test(l));

    return lines.length > 0 ? lines.join('\n') : ('Release ' + tag + '.');
}

// Open the notes in the user's editor ($VISUAL / $EDITOR, default notepad) and read them back once
// the file is saved and closed. Split the editor command so a value like "code --wait" still works
// without needing shell:true (which, combined with an args array, Node flags as unsafe — args
// wouldn't be escaped).
function editText(initialText) {
    const file = path.join(os.tmpdir(), 'mantic-ui-release-notes-' + Date.now() + '.txt');
    fs.writeFileSync(file, initialText, 'utf8');
    const editorCommand = process.env.VISUAL || process.env.EDITOR || 'notepad';
    const [editor, ...editorArgs] = editorCommand.split(' ').filter(Boolean);
    console.log('\x1b[2m  Opening release notes in ' + editorCommand + ' — save and close to continue...\x1b[0m');
    spawnSync(editor, [...editorArgs, file], { stdio: 'ignore' });
    const edited = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n').trim();
    fs.unlinkSync(file);
    return edited;
}

function createRelease(tag, title, notes) {
    const result = spawnSync(
        'gh', ['release', 'create', tag, '--title', title, '--notes', notes, '--verify-tag'],
        { cwd: rootDir, stdio: 'inherit' }
    );
    return result.status === 0;
}

async function main() {
    checkCleanRepo();

    const groupKeys = Object.keys(groups);
    const groupOptions = groupKeys.map(k => groups[k]);

    clearScreen();
    const groupIndex = await select(
        'Which package group?',
        groupOptions,
        (opt) => opt.label
    );
    const group = groupOptions[groupIndex];
    const groupKey = groupKeys[groupIndex];

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
    const labelWidth = Math.max(...parts.map(opt => opt.label.length)) + 2;
    const partIndex = await select(
        'Which part to bump? (current: ' + previewVersion + ')',
        parts,
        (opt) => {
            const next = opt.next(previewVersion);
            return opt.label.padEnd(labelWidth) + '  \x1b[2m→\x1b[0m  \x1b[33m' + next + '\x1b[0m';
        }
    );
    const part = parts[partIndex];

    clearScreen();

    // Compute all next versions first, then build a name -> version map so cross-dependencies
    // between the group's packages can be pinned to the exact new version.
    const versionByName = {};
    packages.forEach(pkg => {
        pkg.nextVersion = part.next(pkg.currentVersion);
        if (pkg.json.name) {
            versionByName[pkg.json.name] = pkg.nextVersion;
        }
    });

    const dependencySections = ['dependencies', 'peerDependencies', 'optionalDependencies', 'devDependencies'];

    const changedFiles = [];
    packages.forEach(pkg => {
        const before = fs.readFileSync(pkg.fullPath, 'utf8');
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
        const rel = path.relative(rootDir, pkg.fullPath);
        if (text !== before) {
            fs.writeFileSync(pkg.fullPath, text);
            changedFiles.push(pkg.fullPath);
            console.log('\x1b[32m√\x1b[0m  ' + rel.padEnd(40) + '  \x1b[2m' + pkg.currentVersion + '\x1b[0m  \x1b[2m→\x1b[0m  \x1b[33m' + pkg.nextVersion + '\x1b[0m');
        } else {
            console.log('\x1b[2m·  ' + rel.padEnd(40) + '  unchanged\x1b[0m');
        }
        updatedDeps.forEach(dep => {
            console.log('     \x1b[2m↳ dep\x1b[0m  ' + dep);
        });
    });

    await commitVersionFiles(changedFiles);

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
    } else {
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

    // ---- tag ----------------------------------------------------------------
    // One tag/release per group (not per package) — the flagship (first) package's version stands
    // for the whole bundle. Push the branch first so the tag lands on a commit that's on origin.

    console.log('');
    if (!fetchTags()) {
        console.error('\x1b[31mgit fetch (tags) failed — can\'t reliably check existing tags. No tag created.\x1b[0m');
        return;
    }
    if (gitCapture(['status', '--porcelain']).out.trim().length > 0) {
        console.log('\x1b[33mwarning: working tree has uncommitted changes — the tag will point at the current HEAD.\x1b[0m');
    }

    if (!pushBranch()) {
        console.error('\x1b[31mgit push (branch) failed — reconcile with origin, then re-run. No tag created.\x1b[0m');
        return;
    }

    const releaseVersion = packages[0].nextVersion;
    const tag = groupKey + '-v' + releaseVersion;
    if (!ensureTag(tag, groupKey + ' ' + releaseVersion)) return;
    if (!pushTag(tag)) {
        console.error('\x1b[31mgit push (tag) failed.\x1b[0m');
        return;
    }

    // ---- release --------------------------------------------------------------

    console.log('');
    if (!checkGhCli()) return;

    if (spawnSync('gh', ['release', 'view', tag], { cwd: rootDir, stdio: 'ignore' }).status === 0) {
        console.log('\x1b[2mskip    release ' + tag + ' (already exists)\x1b[0m');
        return;
    }

    const paths = group.packages.map(entry => entry.file.slice(0, entry.file.lastIndexOf('/')));
    const title = (group.displayName || groupKey) + ' v' + releaseVersion;
    let notes = releaseNotes(groupKey, tag, paths);

    console.log('');
    console.log('\x1b[1m' + title + '\x1b[0m  \x1b[2m(' + tag + ')\x1b[0m');
    notes.split('\n').forEach(line => console.log('  ' + line));

    notes = editText(notes);
    if (!notes) notes = 'Release ' + tag + '.';

    console.log('');
    console.log('\x1b[1m' + title + '\x1b[0m  \x1b[2m(' + tag + ')\x1b[0m');
    notes.split('\n').forEach(line => console.log('  ' + line));
    console.log('');

    const doRelease = await confirm('Create the GitHub release now?', true);
    if (!doRelease) {
        console.log('\x1b[2mSkipped — no release created.\x1b[0m');
        return;
    }

    if (createRelease(tag, title, notes)) {
        console.log('\x1b[32m√\x1b[0m released ' + tag);
    } else {
        console.error('\x1b[31mfailed to create release ' + tag + '\x1b[0m');
    }
}

main().catch(err => {
    console.error('\x1b[31m' + (err && err.message ? err.message : err) + '\x1b[0m');
    process.exit(1);
});
