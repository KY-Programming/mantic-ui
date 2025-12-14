const path = require('path');
const fs = require('fs');

const rootDir = path.join(__dirname, '..');
const outputPath = path.join(rootDir, 'dist', 'documentation', 'browser', 'assets');
const packageJsonPath = path.join(rootDir, 'dist', 'mantic-ui', 'package.json');

if (!fs.existsSync(outputPath)) {
    console.error(`\x1b[31mError: Output path does not exists: ${outputPath}`);
} else {
    const packageJson = require(packageJsonPath);
    const shortVersions = {
        name: 'mantic-ui',
        version: packageJson.version ?? ''
    };
    const appVersionsJson = JSON.stringify(shortVersions, null, 4);
    const appVersionsDistPath = path.join(outputPath, 'app.versions.json');
    fs.writeFileSync(appVersionsDistPath, appVersionsJson);
    console.log('\x1b[36mUPDATE\x1b[0m', appVersionsDistPath);
    console.log('\x1b[32m√\x1b[0m', `Versions written successfully`);
    console.log('');
}