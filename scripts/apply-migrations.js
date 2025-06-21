const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações - ajuste conforme seu ambiente
const DB_URL = process.env.DB_URL || '<SUA_STRING_DE_CONEXAO_PSQL>'; // ou use variáveis de ambiente
const SUPABASE_CLI = false; // true para usar supabase db execute, false para psql

function applyMigrations(dir) {
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.sql'))
    .sort();
  files.forEach(file => {
    const filePath = path.join(dir, file);
    console.log(`Aplicando migration: ${filePath}`);
    if (SUPABASE_CLI) {
      execSync(`supabase db execute ${filePath}`, { stdio: 'inherit' });
    } else {
      execSync(`psql ${DB_URL} -f ${filePath}`, { stdio: 'inherit' });
    }
  });
}

console.log('Aplicando migrations de db/schemas...');
applyMigrations(path.join(__dirname, '../db/schemas'));
console.log('Aplicando migrations de db/policies...');
applyMigrations(path.join(__dirname, '../db/policies'));
console.log('Todas as migrations foram aplicadas.'); 