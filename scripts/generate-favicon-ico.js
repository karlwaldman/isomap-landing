const fs = require('fs');
const path = require('path');
const toIco = require('to-ico');

async function generateFaviconIco() {
  console.log('🎨 Generating favicon.ico...\n');

  const publicDir = path.join(__dirname, '..', 'public');

  try {
    // Read the PNG files
    const files = [
      fs.readFileSync(path.join(publicDir, 'favicon-16x16.png')),
      fs.readFileSync(path.join(publicDir, 'favicon-32x32.png')),
      fs.readFileSync(path.join(publicDir, 'favicon-48x48.png'))
    ];

    // Convert to ICO
    const ico = await toIco(files);

    // Write favicon.ico
    fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

    console.log('✅ favicon.ico generated successfully!');
    console.log('   Contains: 16x16, 32x32, 48x48 sizes');
    console.log('\nAll image assets are ready for deployment! 🚀');

  } catch (error) {
    console.error('❌ Error generating favicon.ico:', error);
    process.exit(1);
  }
}

generateFaviconIco();
