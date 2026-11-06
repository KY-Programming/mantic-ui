// Refreshes the checked-in src/index.html from the @ky/mantic template and src/app/app.config.json, when that private
// package is reachable. It is loaded through npx on purpose instead of being a dependency: anyone without access to the
// KY registry can still install and build, they get the checked-in file. Called directly from "start"/"build", a
// pre-script would never run with ignore-scripts=true.
import { spawnSync } from 'node:child_process';

const skip = reason => console.warn('\x1b[33mSKIPPED\x1b[0m', `index.html update, ${reason}. The checked-in src/index.html is used.`);

// Only with the @ky scope mapped in the npm config (the registry stays out of this public repository): without it, npx
// would look the package up on the public registry, where the scope is not ours, and run whatever it found there.
// One command string through the shell, npm/npx are .cmd files on Windows and cannot be spawned directly.
const scopeRegistry = spawnSync('npm config get @ky:registry', { shell: true, encoding: 'utf8' }).stdout?.trim();
if (!scopeRegistry || scopeRegistry === 'undefined') {
    skip('no registry configured for the @ky scope');
}
else {
    // --legacy-peer-deps, because the bin needs none of the package's Angular peers
    const result = spawnSync('npx --yes --legacy-peer-deps --package=@ky/mantic@^22 ky-index', { stdio: 'inherit', shell: true });
    if (result.status !== 0) {
        skip('ky-index of @ky/mantic could not run');
    }
}
