const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, '..', 'dist');

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
fs.writeFileSync(path.join(distDir, 'index.html'), html);

// Copy styles
const cssDir = path.join(distDir, 'src');
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir, { recursive: true });
const css = fs.readFileSync(path.join(__dirname, '..', 'src', 'styles.css'), 'utf8');
fs.writeFileSync(path.join(cssDir, 'styles.css'), css);

// Copy public assets
const publicSrc = path.join(__dirname, '..', 'public');
const publicDst = path.join(distDir, 'public');
if (fs.existsSync(publicSrc)) {
  if (!fs.existsSync(publicDst)) fs.mkdirSync(publicDst, { recursive: true });
  fs.readdirSync(publicSrc).forEach(f => {
    fs.copyFileSync(path.join(publicSrc, f), path.join(publicDst, f));
  });
}

console.log('Build complete → dist/');
