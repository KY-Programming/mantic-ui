const path = require('path');
const fs = require('fs');
const {execSync} = require('child_process');

const rootDir = path.join(__dirname, '..');
const packageDir = path.join(rootDir, 'projects/eslint-config');
const packageJson = require(path.join(packageDir, 'package.json'));
const packageName = packageJson.name;

// Move all .tgz files to project root
let packageFile;
fs.readdirSync(packageDir)
    .filter(file => file.endsWith('.tgz'))
    .forEach(file => {
        const sourcePath = path.join(packageDir, file);
        const targetPath = path.join(rootDir, file);
        fs.renameSync(sourcePath, targetPath);
        packageFile = targetPath;
    });

// Install dependencies
execSync(`npm install ${packageFile}`, {stdio: 'inherit', cwd: rootDir});
console.log(`Installed ${packageName}`);
