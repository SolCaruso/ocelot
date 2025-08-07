const fs = require('fs');
const path = require('path');

function analyzePerformance() {
  console.log('🔍 Performance Analysis Report');
  console.log('==============================\n');

  // Check for common performance issues
  const issues = [];

  // 1. Check for large images
  const publicDir = path.join(process.cwd(), 'public');
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
  
  function checkDirectory(dir, relativePath = '') {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        checkDirectory(filePath, path.join(relativePath, file));
      } else if (imageExtensions.some(ext => file.toLowerCase().endsWith(ext))) {
        const sizeKB = stat.size / 1024;
        if (sizeKB > 500) {
          issues.push({
            type: 'Large Image',
            file: path.join(relativePath, file),
            size: `${(sizeKB / 1024).toFixed(1)} MB`,
            suggestion: 'Consider compressing or using WebP/AVIF format'
          });
        }
      }
    });
  }

  checkDirectory(publicDir);

  // 2. Check for unused imports
  const srcDir = path.join(process.cwd(), 'src');
  
  function findUnusedImports(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findUnusedImports(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        try {
          const content = fs.readFileSync(filePath, 'utf8');
          const lines = content.split('\n');
          
          lines.forEach((line, index) => {
            if (line.includes('import') && line.includes('@/')) {
              const importPath = line.match(/from ['"]([^'"]+)['"]/)?.[1];
              if (importPath && !content.includes(importPath.split('/').pop()?.replace('.tsx', '').replace('.ts', ''))) {
                issues.push({
                  type: 'Unused Import',
                  file: filePath.replace(process.cwd(), ''),
                  line: index + 1,
                  import: importPath,
                  suggestion: 'Remove unused import'
                });
              }
            }
          });
        } catch (error) {
          // Skip files that can't be read
        }
      }
    });
  }

  findUnusedImports(srcDir);

  // 3. Performance recommendations
  const recommendations = [
    {
      category: 'JavaScript',
      items: [
        'Use dynamic imports for large components',
        'Implement code splitting for routes',
        'Remove unused polyfills',
        'Optimize bundle size with tree shaking'
      ]
    },
    {
      category: 'CSS',
      items: [
        'Inline critical CSS',
        'Defer non-critical CSS',
        'Use CSS containment',
        'Optimize CSS selectors'
      ]
    },
    {
      category: 'Images',
      items: [
        'Use WebP/AVIF formats',
        'Implement responsive images',
        'Add fetchpriority="high" to LCP images',
        'Optimize image compression'
      ]
    },
    {
      category: 'Network',
      items: [
        'Add preload hints for critical resources',
        'Use DNS prefetch for external domains',
        'Implement resource hints',
        'Optimize critical rendering path'
      ]
    }
  ];

  // Display results
  if (issues.length > 0) {
    console.log('❌ Issues Found:');
    issues.forEach(issue => {
      console.log(`  • ${issue.type}: ${issue.file}`);
      if (issue.size) console.log(`    Size: ${issue.size}`);
      if (issue.line) console.log(`    Line: ${issue.line}`);
      if (issue.import) console.log(`    Import: ${issue.import}`);
      console.log(`    Suggestion: ${issue.suggestion}\n`);
    });
  } else {
    console.log('✅ No obvious performance issues found!\n');
  }

  console.log('💡 Performance Recommendations:');
  recommendations.forEach(rec => {
    console.log(`\n${rec.category}:`);
    rec.items.forEach(item => {
      console.log(`  • ${item}`);
    });
  });

  console.log('\n🚀 Quick Wins:');
  console.log('  • Run: npm run optimize-images');
  console.log('  • Enable gzip compression on server');
  console.log('  • Use CDN for static assets');
  console.log('  • Implement service worker for caching');
}

analyzePerformance();
