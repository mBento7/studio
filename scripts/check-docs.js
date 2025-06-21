const fs = require('fs');
const path = require('path');

const files = [
  'README.md',
  'NEXT_STEPS.md',
  path.join('docs', 'README.md'),
];

const THRESHOLD_DAYS = 3; // alerta se não houver atualização nos últimos 3 dias
const now = new Date();

let allOk = true;

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.warn(`Arquivo não encontrado: ${file}`);
    allOk = false;
    return;
  }
  const stats = fs.statSync(file);
  const mtime = new Date(stats.mtime);
  const diffDays = (now - mtime) / (1000 * 60 * 60 * 24);
  if (diffDays > THRESHOLD_DAYS) {
    console.warn(`⚠️  O arquivo ${file} não é atualizado há mais de ${THRESHOLD_DAYS} dias! Última modificação: ${mtime.toLocaleString()}`);
    allOk = false;
  }
});

if (!allOk) {
  console.warn('\nRevise e atualize a documentação antes de subir alterações para o GitHub!');
  process.exit(1);
} else {
  console.log('Documentação revisada recentemente.');
} 