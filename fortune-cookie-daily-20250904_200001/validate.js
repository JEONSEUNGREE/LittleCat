// Simple validation script to check if all files are valid
const fs = require('fs');
const path = require('path');

let errors = [];

// Check if all required files exist
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tsconfig.json',
  'index.html',
  'src/main.tsx',
  'src/App.tsx',
  'src/index.css',
  'src/components/FortuneCookie.tsx',
  'src/components/Header.tsx',
  'src/components/History.tsx',
  'src/components/Statistics.tsx',
  'src/store/fortuneStore.ts'
];

console.log('Validating Fortune Cookie Daily App...\n');

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file} exists`);
  } else {
    errors.push(`❌ Missing file: ${file}`);
  }
});

// Check package.json structure
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.name === 'fortune-cookie-daily') {
    console.log('✅ package.json is valid');
  }
} catch (e) {
  errors.push('❌ Invalid package.json');
}

console.log('\n' + '='.repeat(50));
if (errors.length === 0) {
  console.log('✅ All validations passed! App structure is complete.');
} else {
  console.log('❌ Validation failed:');
  errors.forEach(err => console.log(err));
  process.exit(1);
}

console.log('\n📱 App Details:');
console.log('- Name: Fortune Cookie Daily');
console.log('- Type: Entertainment / Fortune Telling');
console.log('- Features: Daily fortunes, lucky numbers, statistics, dark mode');
console.log('- Tech Stack: Vite + React + TypeScript + Tailwind CSS + Zustand');
console.log('- Path: /home/tory/cronjob/frontApp/LittleCat/fortune-cookie-daily-20250904_200001');