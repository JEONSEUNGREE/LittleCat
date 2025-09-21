const fs = require('fs');
const path = require('path');

console.log('Fortune Cookie Maker - Testing Project Setup');
console.log('=============================================');

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    console.log('✓ package.json found');
    console.log(`  Name: ${packageJson.name}`);
    console.log(`  Version: ${packageJson.version}`);
    console.log(`  Dependencies: ${Object.keys(packageJson.dependencies).length}`);
    console.log(`  DevDependencies: ${Object.keys(packageJson.devDependencies).length}`);
} else {
    console.log('✗ package.json not found');
}

// Check for TypeScript config
if (fs.existsSync(path.join(__dirname, 'tsconfig.json'))) {
    console.log('✓ tsconfig.json found');
} else {
    console.log('✗ tsconfig.json not found');
}

// Check source files
const srcPath = path.join(__dirname, 'src');
if (fs.existsSync(srcPath)) {
    const countFiles = (dir, ext) => {
        let count = 0;
        const files = fs.readdirSync(dir, { withFileTypes: true });
        for (const file of files) {
            const fullPath = path.join(dir, file.name);
            if (file.isDirectory()) {
                count += countFiles(fullPath, ext);
            } else if (file.name.endsWith(ext)) {
                count++;
            }
        }
        return count;
    };
    
    console.log('✓ src directory found');
    console.log(`  TypeScript files: ${countFiles(srcPath, '.ts') + countFiles(srcPath, '.tsx')}`);
    console.log(`  Components: ${countFiles(path.join(srcPath, 'components'), '.tsx')}`);
}

// Check for node_modules
if (fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.log('✓ node_modules exists');
} else {
    console.log('✗ node_modules not found - run "npm install" to install dependencies');
}

console.log('\nProject Status: Ready for npm install');
console.log('To build and run:');
console.log('  1. npm install');
console.log('  2. npm run build');
console.log('  3. npm run dev');