const fs = require('fs');
const path = require('path');

const files = [
  'NEXT_STEPS.md',
  path.join('docs', 'README.md'),
];

const today = new Date().toISOString().slice(0, 10);

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  // Atualiza o campo Data: [....] se existir
  if (/Data:\s*\[.*?\]/.test(content)) {
    content = content.replace(/Data:\s*\[.*?\]/g, `Data: [${today}]`);
    fs.writeFileSync(file, content);
    console.log(`Data de revisão atualizada em ${file}`);
  }
}); 