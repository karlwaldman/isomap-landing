const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateImages() {
  console.log('🎨 Generating favicon and og:image...\n');

  const publicDir = path.join(__dirname, '..', 'public');

  try {
    // Generate PNG favicon (multiple sizes)
    console.log('📱 Generating favicon sizes...');

    await sharp(path.join(publicDir, 'favicon.svg'))
      .resize(32, 32)
      .png()
      .toFile(path.join(publicDir, 'favicon-32x32.png'));
    console.log('  ✓ favicon-32x32.png');

    await sharp(path.join(publicDir, 'favicon.svg'))
      .resize(16, 16)
      .png()
      .toFile(path.join(publicDir, 'favicon-16x16.png'));
    console.log('  ✓ favicon-16x16.png');

    await sharp(path.join(publicDir, 'favicon.svg'))
      .resize(48, 48)
      .png()
      .toFile(path.join(publicDir, 'favicon-48x48.png'));
    console.log('  ✓ favicon-48x48.png');

    // Generate apple-touch-icon
    await sharp(path.join(publicDir, 'favicon.svg'))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('  ✓ apple-touch-icon.png\n');

    // Generate og:image (1200x630)
    console.log('🖼️  Generating og:image...');
    await sharp(path.join(publicDir, 'og-image.svg'))
      .resize(1200, 630)
      .png()
      .toFile(path.join(publicDir, 'og-image.png'));
    console.log('  ✓ og-image.png (1200x630)\n');

    console.log('✅ All images generated successfully!');
    console.log('\nNext steps:');
    console.log('1. Convert favicon-32x32.png to favicon.ico using: https://realfavicongenerator.net/');
    console.log('2. Or just use the PNG favicons (modern browsers support this)');
    console.log('3. Commit and deploy the new images');

  } catch (error) {
    console.error('❌ Error generating images:', error);
    process.exit(1);
  }
}

generateImages();
