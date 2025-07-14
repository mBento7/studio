#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Script para versionamento e organização de migrations e seeds
 * 
 * Funcionalidades:
 * - Verifica e organiza migrations por data
 * - Valida formato de nomeação
 * - Cria backup das migrations atuais
 * - Versiona seeds com timestamp
 * - Gera relatório de versionamento
 */

const MIGRATIONS_DIR = path.join(__dirname, '../supabase/migrations');
const SEEDS_DIR = path.join(__dirname, '../supabase/seeds');
const BACKUP_DIR = path.join(__dirname, '../backups/migrations');
const SEED_FILE = path.join(__dirname, '../supabase/seed.sql');

// Padrão de nomeação: YYYYMMDD_description.sql ou YYYYMMDDHHMMSS_description.sql
const MIGRATION_PATTERN = /^(\d{8}|\d{14})_[a-z0-9_-]+\.sql$/i;

function ensureDirectoryExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Diretório criado: ${dir}`);
  }
}

function validateMigrationName(filename) {
  return MIGRATION_PATTERN.test(filename);
}

function extractDateFromMigration(filename) {
  const match = filename.match(/^(\d{8}|\d{14})_/);
  if (!match) return null;
  
  const dateStr = match[1];
  if (dateStr.length === 8) {
    // YYYYMMDD format
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    return new Date(`${year}-${month}-${day}`);
  } else {
    // YYYYMMDDHHMMSS format
    const year = dateStr.substring(0, 4);
    const month = dateStr.substring(4, 6);
    const day = dateStr.substring(6, 8);
    const hour = dateStr.substring(8, 10);
    const minute = dateStr.substring(10, 12);
    const second = dateStr.substring(12, 14);
    return new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  }
}

function createBackup() {
  ensureDirectoryExists(BACKUP_DIR);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = path.join(BACKUP_DIR, `migrations-backup-${timestamp}`);
  
  if (fs.existsSync(MIGRATIONS_DIR)) {
    execSync(`xcopy "${MIGRATIONS_DIR}" "${backupPath}" /E /I /H /Y`, { stdio: 'inherit' });
    console.log(`✅ Backup criado em: ${backupPath}`);
  }
  
  return backupPath;
}

function analyzeMigrations() {
  if (!fs.existsSync(MIGRATIONS_DIR)) {
    console.log('❌ Diretório de migrations não encontrado');
    return { valid: [], invalid: [], sorted: [] };
  }
  
  const files = fs.readdirSync(MIGRATIONS_DIR)
    .filter(f => f.endsWith('.sql') && f !== 'README.md');
  
  const valid = [];
  const invalid = [];
  
  files.forEach(file => {
    if (validateMigrationName(file)) {
      const date = extractDateFromMigration(file);
      valid.push({ file, date });
    } else {
      invalid.push(file);
    }
  });
  
  // Ordenar por data
  const sorted = valid.sort((a, b) => a.date - b.date);
  
  return { valid, invalid, sorted };
}

function versionSeeds() {
  ensureDirectoryExists(SEEDS_DIR);
  
  if (fs.existsSync(SEED_FILE)) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
    const versionedSeedFile = path.join(SEEDS_DIR, `seed-${timestamp}.sql`);
    
    // Copiar seed atual para versão timestampada
    fs.copyFileSync(SEED_FILE, versionedSeedFile);
    console.log(`✅ Seed versionado: ${versionedSeedFile}`);
    
    // Criar seed master atualizado com header de versionamento
    const seedContent = fs.readFileSync(SEED_FILE, 'utf8');
    const versionedContent = `-- Seed Data - Versioned at ${new Date().toISOString()}
-- Original file: seed.sql
-- Version: ${timestamp}
-- 
-- IMPORTANTE: Este arquivo contém dados de exemplo/desenvolvimento
-- Revisar cuidadosamente antes de aplicar em produção

${seedContent}`;
    
    fs.writeFileSync(versionedSeedFile, versionedContent);
    
    return versionedSeedFile;
  }
  
  return null;
}

function generateReport(analysis, versionedSeed) {
  const report = {
    timestamp: new Date().toISOString(),
    migrations: {
      total: analysis.valid.length + analysis.invalid.length,
      valid: analysis.valid.length,
      invalid: analysis.invalid.length,
      invalidFiles: analysis.invalid,
      chronologicalOrder: analysis.sorted.map(m => m.file)
    },
    seeds: {
      versionedFile: versionedSeed,
      seedsDirectory: SEEDS_DIR
    },
    recommendations: []
  };
  
  // Adicionar recomendações
  if (analysis.invalid.length > 0) {
    report.recommendations.push('Renomear arquivos de migration inválidos para seguir o padrão YYYYMMDD_description.sql');
  }
  
  if (analysis.valid.length === 0) {
    report.recommendations.push('Criar migrations versionadas para o schema atual');
  }
  
  // Salvar relatório
  const reportPath = path.join(__dirname, 'migration-versioning-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`✅ Relatório salvo em: ${reportPath}`);
  
  return report;
}

function displayReport(report) {
  console.log('\n📊 RELATÓRIO DE VERSIONAMENTO DE MIGRATIONS E SEEDS');
  console.log('=' .repeat(60));
  
  console.log(`\n📁 MIGRATIONS:`);
  console.log(`   Total: ${report.migrations.total}`);
  console.log(`   Válidas: ${report.migrations.valid}`);
  console.log(`   Inválidas: ${report.migrations.invalid}`);
  
  if (report.migrations.invalidFiles.length > 0) {
    console.log(`\n❌ Arquivos com nomeação inválida:`);
    report.migrations.invalidFiles.forEach(file => {
      console.log(`   - ${file}`);
    });
  }
  
  console.log(`\n📅 Ordem cronológica das migrations:`);
  report.migrations.chronologicalOrder.forEach((file, index) => {
    console.log(`   ${index + 1}. ${file}`);
  });
  
  if (report.seeds.versionedFile) {
    console.log(`\n🌱 SEEDS:`);
    console.log(`   Arquivo versionado: ${path.basename(report.seeds.versionedFile)}`);
    console.log(`   Diretório de seeds: ${report.seeds.seedsDirectory}`);
  }
  
  if (report.recommendations.length > 0) {
    console.log(`\n💡 RECOMENDAÇÕES:`);
    report.recommendations.forEach((rec, index) => {
      console.log(`   ${index + 1}. ${rec}`);
    });
  }
  
  console.log('\n' + '=' .repeat(60));
}

function main() {
  console.log('🚀 Iniciando versionamento de migrations e seeds...');
  
  try {
    // Criar backup
    createBackup();
    
    // Analisar migrations
    const analysis = analyzeMigrations();
    
    // Versionar seeds
    const versionedSeed = versionSeeds();
    
    // Gerar e exibir relatório
    const report = generateReport(analysis, versionedSeed);
    displayReport(report);
    
    console.log('\n✅ Versionamento concluído com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro durante o versionamento:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  analyzeMigrations,
  versionSeeds,
  validateMigrationName,
  extractDateFromMigration
};