const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const imagesToOptimize = [
    {
      input: 'public/webp/smoke-mask-2.webp',
      output: 'public/webp/smoke-mask-2.webp',
      quality: 60
    },
    {
      input: 'public/webp/smoke-mask.webp',
      output: 'public/webp/smoke-mask.webp',
      quality: 60
    },
    {
      input: 'public/webp/faq-mask.webp',
      output: 'public/webp/faq-mask.webp',
      quality: 60
    },
    {
      input: 'public/webp/hero-mask.webp',
      output: 'public/webp/hero-mask.webp',
      quality: 60
    }
  ];

  for (const image of imagesToOptimize) {
    try {
      if (fs.existsSync(image.input)) {
        console.log(`Optimizing ${image.input}...`);
        
        await sharp(image.input)
          .webp({ quality: image.quality })
          .toFile(image.output);
        
        const stats = fs.statSync(image.output);
        console.log(`✅ Optimized ${image.input} - ${(stats.size / 1024).toFixed(1)} KB`);
      } else {
        console.log(`⚠️  File not found: ${image.input}`);
      }
    } catch (error) {
      console.error(`❌ Error optimizing ${image.input}:`, error.message);
    }
  }
}

optimizeImages().catch(console.error);
