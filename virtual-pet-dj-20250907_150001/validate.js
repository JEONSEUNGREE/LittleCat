const fs = require('fs');
const path = require('path');

function validateProject() {
  const requiredFiles = [
    'package.json',
    'vite.config.ts',
    'tsconfig.json',
    'index.html',
    'src/main.tsx',
    'src/App.tsx',
    'src/index.css',
    'src/components/VirtualPet.tsx',
    'src/components/DJMixer.tsx',
    'src/components/MixHistory.tsx',
    'src/store/petStore.ts'
  ];

  let allFilesExist = true;
  
  console.log('🔍 Validating Virtual Pet DJ project structure...\n');
  
  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - Missing`);
      allFilesExist = false;
    }
  });
  
  if (allFilesExist) {
    console.log('\n✨ All files validated successfully!');
    console.log('📦 Project structure is complete.');
    console.log('🎯 Next steps:');
    console.log('   1. npm install');
    console.log('   2. npm run dev');
    return 0;
  } else {
    console.log('\n⚠️ Some files are missing!');
    return 1;
  }
}

process.exit(validateProject());