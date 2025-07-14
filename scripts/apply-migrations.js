#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
require('dotenv').config({ path: path.join(__dirname, '../apps/web/.env.local') });

/**
 * Script melhorado para aplicação de migrations e seeds
 * 
 * Funcionalidades:
 * - Validação de variáveis de ambiente
 * - Suporte a migrations do Supabase
 * - Aplicação de seeds versionados
 * - Logs detalhados
 * - Verificação de conectividade
 */

// Configurações - com validação de ambiente
const DB_URL = process.env.DB_URL || process.env.DATABASE_URL;
const SUPABASE_CLI = process.env.USE_SUPABASE_CLI === 'true' || false;
const APPLY_SEEDS = process.env.APPLY_SEEDS === 'true' || false;
const ENVIRONMENT = process.env.NODE_ENV || 'development';

// Diretórios
const MIGRATIONS_DIR = path.join(__dirname, '../supabase/migrations');
const POLICIES_DIR = path.join(__dirname, '../db/policies');
const SCHEMAS_DIR = path.join(__dirname, '../db/schemas');
const SEEDS_DIR = path.join(__dirname, '../supabase/seeds');
const SEED_FILE = path.join(__dirname, '../supabase/seed.sql');

function validateEnvironment() {
  console.log('🔍 Validando ambiente...');
  
  const errors = [];
  
  if (!DB_URL || DB_URL.includes('<SUA_STRING_DE_CONEXAO_PSQL>')) {
    errors.push('DB_URL não configurada ou usando valor padrão');
  }
  
  if (SUPABASE_CLI) {
    try {
      execSync('supabase --version', { stdio: 'pipe' });
      console.log('✅ Supabase CLI encontrado');
    } catch (error) {
      errors.push('Supabase CLI não encontrado (necessário quando USE_SUPABASE_CLI=true)');
    }
  } else {
    try {
      execSync('psql --version', { stdio: 'pipe' });
      console.log('✅ PostgreSQL CLI encontrado');
    } catch (error) {
      errors.push('PostgreSQL CLI (psql) não encontrado');
    }
  }
  
  if (errors.length > 0) {
    console.error('❌ Erros de validação:');
    errors.forEach(error => console.error(`   - ${error}`));
    console.error('\n💡 Dicas:');
    console.error('   - Configure DB_URL no arquivo .env.local');
    console.error('   - Instale PostgreSQL CLI ou Supabase CLI');
    console.error('   - Verifique o arquivo .env.example para referência');
    process.exit(1);
  }
  
  console.log(`✅ Ambiente validado (${ENVIRONMENT})`);
}

function testConnection() {
  console.log('🔗 Testando conexão com banco...');
  
  try {
    if (SUPABASE_CLI) {
      execSync('supabase db ping', { stdio: 'pipe' });
    } else {
      execSync(`psql "${DB_URL}" -c "SELECT 1;"`, { stdio: 'pipe' });
    }
    console.log('✅ Conexão com banco estabelecida');
  } catch (error) {
    console.error('❌ Falha na conexão com banco:');
    console.error(`   ${error.message}`);
    console.error('\n💡 Verifique:');
    console.error('   - Se o banco está rodando');
    console.error('   - Se a string de conexão está correta');
    console.error('   - Se as credenciais estão válidas');
    process.exit(1);
  }
}

function applyMigrations(dir, description) {
  if (!fs.existsSync(dir)) {
    console.log(`⚠️  Diretório não encontrado: ${dir}`);
    return;
  }
  
  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.sql') && f !== 'README.md')
    .sort();
  
  if (files.length === 0) {
    console.log(`ℹ️  Nenhuma migration encontrada em ${description}`);
    return;
  }
  
  console.log(`\n📁 Aplicando ${description} (${files.length} arquivos)...`);
  
  files.forEach((file, index) => {
    const filePath = path.join(dir, file);
    console.log(`   ${index + 1}/${files.length} ${file}`);
    
    try {
      if (SUPABASE_CLI) {
        execSync(`supabase db execute "${filePath}"`, { stdio: 'pipe' });
      } else {
        execSync(`psql "${DB_URL}" -f "${filePath}"`, { stdio: 'pipe' });
      }
      console.log(`   ✅ Aplicada com sucesso`);
    } catch (error) {
      console.error(`   ❌ Erro ao aplicar ${file}:`);
      console.error(`      ${error.message}`);
      throw error;
    }
  });
}

function applySeeds() {
  if (!APPLY_SEEDS) {
    console.log('\n🌱 Seeds não serão aplicados (APPLY_SEEDS=false)');
    return;
  }
  
  if (ENVIRONMENT === 'production') {
    console.log('\n⚠️  ATENÇÃO: Aplicando seeds em ambiente de PRODUÇÃO!');
    console.log('   Certifique-se de que os dados são apropriados para produção.');
    
    // Em produção, exigir confirmação explícita
    if (process.env.FORCE_PRODUCTION_SEEDS !== 'true') {
      console.log('   Para aplicar seeds em produção, defina FORCE_PRODUCTION_SEEDS=true');
      return;
    }
  }
  
  // Tentar aplicar seed versionado mais recente primeiro
  if (fs.existsSync(SEEDS_DIR)) {
    const seedFiles = fs.readdirSync(SEEDS_DIR)
      .filter(f => f.startsWith('seed-') && f.endsWith('.sql'))
      .sort()
      .reverse(); // Mais recente primeiro
    
    if (seedFiles.length > 0) {
      const latestSeed = path.join(SEEDS_DIR, seedFiles[0]);
      console.log(`\n🌱 Aplicando seed versionado: ${seedFiles[0]}`);
      
      try {
        if (SUPABASE_CLI) {
          execSync(`supabase db execute "${latestSeed}"`, { stdio: 'pipe' });
        } else {
          execSync(`psql "${DB_URL}" -f "${latestSeed}"`, { stdio: 'pipe' });
        }
        console.log('   ✅ Seed aplicado com sucesso');
        return;
      } catch (error) {
        console.error(`   ❌ Erro ao aplicar seed versionado: ${error.message}`);
        console.log('   Tentando seed.sql principal...');
      }
    }
  }
  
  // Fallback para seed.sql principal
  if (fs.existsSync(SEED_FILE)) {
    console.log(`\n🌱 Aplicando seed principal: seed.sql`);
    
    try {
      if (SUPABASE_CLI) {
        execSync(`supabase db execute "${SEED_FILE}"`, { stdio: 'pipe' });
      } else {
        execSync(`psql "${DB_URL}" -f "${SEED_FILE}"`, { stdio: 'pipe' });
      }
      console.log('   ✅ Seed aplicado com sucesso');
    } catch (error) {
      console.error(`   ❌ Erro ao aplicar seed: ${error.message}`);
      throw error;
    }
  } else {
    console.log('\n⚠️  Nenhum arquivo de seed encontrado');
  }
}

function displaySummary() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 RESUMO DA APLICAÇÃO');
  console.log('='.repeat(60));
  console.log(`Ambiente: ${ENVIRONMENT}`);
  console.log(`Método: ${SUPABASE_CLI ? 'Supabase CLI' : 'PostgreSQL CLI'}`);
  console.log(`Seeds aplicados: ${APPLY_SEEDS ? 'Sim' : 'Não'}`);
  console.log('='.repeat(60));
}

function main() {
  console.log('🚀 Iniciando aplicação de migrations e seeds...');
  console.log(`Ambiente: ${ENVIRONMENT}`);
  
  try {
    // Validações
    validateEnvironment();
    testConnection();
    
    // Aplicar migrations em ordem
    applyMigrations(MIGRATIONS_DIR, 'migrations do Supabase');
    applyMigrations(SCHEMAS_DIR, 'schemas customizados');
    applyMigrations(POLICIES_DIR, 'políticas de segurança');
    
    // Aplicar seeds se solicitado
    applySeeds();
    
    // Resumo
    displaySummary();
    
    console.log('\n✅ Todas as migrations e seeds foram aplicados com sucesso!');
    
  } catch (error) {
    console.error('\n❌ Erro durante a aplicação:');
    console.error(`   ${error.message}`);
    console.error('\n💡 Verifique os logs acima para mais detalhes.');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  applyMigrations,
  applySeeds,
  validateEnvironment,
  testConnection
};