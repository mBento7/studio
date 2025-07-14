#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

/**
 * Script para configuração e teste do Supabase local
 * 
 * Funcionalidades:
 * - Verifica dependências (Docker, Supabase CLI)
 * - Configura Supabase local
 * - Aplica migrations e seeds
 * - Testa conectividade
 * - Gera configuração para desenvolvimento
 */

const SUPABASE_DIR = path.join(__dirname, '../supabase');
const CONFIG_FILE = path.join(SUPABASE_DIR, 'config.toml');
const ENV_LOCAL = path.join(__dirname, '../apps/web/.env.local');

// Configurações padrão para desenvolvimento local
const LOCAL_CONFIG = {
  api: {
    port: 54321,
    schemas: ['public', 'storage', 'graphql_public']
  },
  db: {
    port: 54322,
    shadow_port: 54320,
    major_version: 15
  },
  studio: {
    port: 54323
  },
  inbucket: {
    port: 54324,
    smtp_port: 54325,
    pop3_port: 54326
  },
  storage: {
    file_size_limit: '50MiB'
  },
  auth: {
    site_url: 'http://localhost:9002',
    additional_redirect_urls: ['https://localhost:9002']
  }
};

function checkDependencies() {
  console.log('🔍 Verificando dependências...');
  
  const dependencies = [
    { name: 'Docker', command: 'docker --version', required: true },
    { name: 'Docker Compose', command: 'docker-compose --version', required: true },
    { name: 'Supabase CLI', command: 'supabase --version', required: true },
    { name: 'Node.js', command: 'node --version', required: true },
    { name: 'Git', command: 'git --version', required: false }
  ];
  
  const missing = [];
  const present = [];
  
  dependencies.forEach(dep => {
    try {
      const output = execSync(dep.command, { stdio: 'pipe', encoding: 'utf8' });
      present.push({ ...dep, version: output.trim() });
      console.log(`✅ ${dep.name}: ${output.trim()}`);
    } catch (error) {
      if (dep.required) {
        missing.push(dep);
        console.log(`❌ ${dep.name}: Não encontrado`);
      } else {
        console.log(`⚠️  ${dep.name}: Não encontrado (opcional)`);
      }
    }
  });
  
  if (missing.length > 0) {
    console.error('\n❌ Dependências obrigatórias faltando:');
    missing.forEach(dep => {
      console.error(`   - ${dep.name}`);
    });
    
    console.error('\n💡 Instruções de instalação:');
    console.error('   Docker: https://docs.docker.com/get-docker/');
    console.error('   Supabase CLI: npm install -g supabase');
    
    throw new Error('Dependências faltando');
  }
  
  return { present, missing };
}

function checkDockerStatus() {
  console.log('\n🐳 Verificando status do Docker...');
  
  try {
    execSync('docker info', { stdio: 'pipe' });
    console.log('✅ Docker está rodando');
  } catch (error) {
    console.error('❌ Docker não está rodando');
    console.error('💡 Inicie o Docker Desktop ou serviço Docker');
    throw new Error('Docker não está rodando');
  }
  
  // Verificar se há containers Supabase rodando
  try {
    const containers = execSync('docker ps --format "table {{.Names}}\t{{.Status}}"', { 
      stdio: 'pipe', 
      encoding: 'utf8' 
    });
    
    const supabaseContainers = containers.split('\n')
      .filter(line => line.includes('supabase'))
      .filter(line => line.trim() !== '');
    
    if (supabaseContainers.length > 0) {
      console.log('\n📦 Containers Supabase ativos:');
      supabaseContainers.forEach(container => {
        console.log(`   ${container}`);
      });
    } else {
      console.log('ℹ️  Nenhum container Supabase ativo');
    }
    
  } catch (error) {
    console.log('⚠️  Não foi possível verificar containers');
  }
}

function initializeSupabase() {
  console.log('\n🚀 Inicializando Supabase local...');
  
  if (!fs.existsSync(SUPABASE_DIR)) {
    console.log('📁 Criando diretório supabase...');
    fs.mkdirSync(SUPABASE_DIR, { recursive: true });
  }
  
  // Verificar se já está inicializado
  if (fs.existsSync(CONFIG_FILE)) {
    console.log('✅ Supabase já inicializado');
    return;
  }
  
  try {
    console.log('⚙️  Executando supabase init...');
    execSync('supabase init', { 
      cwd: path.dirname(SUPABASE_DIR),
      stdio: 'inherit' 
    });
    console.log('✅ Supabase inicializado');
  } catch (error) {
    console.error('❌ Erro ao inicializar Supabase:', error.message);
    throw error;
  }
}

function configureSupabase() {
  console.log('\n⚙️  Configurando Supabase local...');
  
  if (!fs.existsSync(CONFIG_FILE)) {
    console.error('❌ Arquivo config.toml não encontrado');
    throw new Error('Supabase não inicializado');
  }
  
  // Ler configuração atual
  let config = fs.readFileSync(CONFIG_FILE, 'utf8');
  
  // Aplicar configurações locais
  console.log('📝 Aplicando configurações de desenvolvimento...');
  
  // Atualizar portas se necessário
  config = config.replace(/port = 54321/, `port = ${LOCAL_CONFIG.api.port}`);
  config = config.replace(/port = 54322/, `port = ${LOCAL_CONFIG.db.port}`);
  config = config.replace(/port = 54323/, `port = ${LOCAL_CONFIG.studio.port}`);
  
  // Adicionar configurações de auth se não existirem
  if (!config.includes('site_url')) {
    config += `\n[auth]\nsite_url = "${LOCAL_CONFIG.auth.site_url}"\n`;
    config += `additional_redirect_urls = ["${LOCAL_CONFIG.auth.additional_redirect_urls.join('", "')}"]\n`;
  }
  
  fs.writeFileSync(CONFIG_FILE, config);
  console.log('✅ Configuração atualizada');
}

function startSupabase() {
  console.log('\n🚀 Iniciando Supabase local...');
  
  try {
    console.log('⏳ Isso pode levar alguns minutos na primeira execução...');
    execSync('supabase start', { 
      cwd: path.dirname(SUPABASE_DIR),
      stdio: 'inherit',
      timeout: 300000 // 5 minutos
    });
    console.log('✅ Supabase iniciado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao iniciar Supabase:', error.message);
    
    // Tentar obter logs para diagnóstico
    try {
      console.log('\n📋 Logs do Docker:');
      const logs = execSync('docker-compose logs --tail=20', { 
        cwd: SUPABASE_DIR,
        encoding: 'utf8' 
      });
      console.log(logs);
    } catch (logError) {
      console.log('⚠️  Não foi possível obter logs');
    }
    
    throw error;
  }
}

function getSupabaseStatus() {
  console.log('\n📊 Verificando status do Supabase...');
  
  try {
    const status = execSync('supabase status', { 
      cwd: path.dirname(SUPABASE_DIR),
      encoding: 'utf8' 
    });
    
    console.log(status);
    
    // Extrair informações importantes
    const lines = status.split('\n');
    const info = {};
    
    lines.forEach(line => {
      if (line.includes('API URL:')) {
        info.apiUrl = line.split(':').slice(1).join(':').trim();
      }
      if (line.includes('DB URL:')) {
        info.dbUrl = line.split(':').slice(1).join(':').trim();
      }
      if (line.includes('Studio URL:')) {
        info.studioUrl = line.split(':').slice(1).join(':').trim();
      }
      if (line.includes('anon key:')) {
        info.anonKey = line.split(':')[1].trim();
      }
      if (line.includes('service_role key:')) {
        info.serviceRoleKey = line.split(':')[1].trim();
      }
    });
    
    return info;
    
  } catch (error) {
    console.error('❌ Erro ao obter status:', error.message);
    return null;
  }
}

function updateEnvFile(supabaseInfo) {
  console.log('\n📝 Atualizando arquivo .env.local...');
  
  if (!supabaseInfo) {
    console.log('⚠️  Informações do Supabase não disponíveis');
    return;
  }
  
  let envContent = '';
  
  // Ler arquivo existente se houver
  if (fs.existsSync(ENV_LOCAL)) {
    envContent = fs.readFileSync(ENV_LOCAL, 'utf8');
  }
  
  // Atualizar ou adicionar variáveis
  const updates = {
    'NEXT_PUBLIC_SUPABASE_URL': supabaseInfo.apiUrl,
    'NEXT_PUBLIC_SUPABASE_ANON_KEY': supabaseInfo.anonKey,
    'SUPABASE_SERVICE_ROLE_KEY': supabaseInfo.serviceRoleKey,
    'DB_URL': supabaseInfo.dbUrl,
    'SUPABASE_LOCAL_URL': supabaseInfo.apiUrl,
    'SUPABASE_LOCAL_ANON_KEY': supabaseInfo.anonKey,
    'SUPABASE_LOCAL_SERVICE_ROLE_KEY': supabaseInfo.serviceRoleKey
  };
  
  Object.entries(updates).forEach(([key, value]) => {
    if (value) {
      const regex = new RegExp(`^${key}=.*$`, 'm');
      const newLine = `${key}=${value}`;
      
      if (regex.test(envContent)) {
        envContent = envContent.replace(regex, newLine);
      } else {
        envContent += `\n${newLine}`;
      }
    }
  });
  
  // Adicionar comentário se arquivo novo
  if (!fs.existsSync(ENV_LOCAL)) {
    envContent = `# Configuração local do Supabase\n# Gerado automaticamente em ${new Date().toISOString()}\n${envContent}`;
  }
  
  fs.writeFileSync(ENV_LOCAL, envContent.trim() + '\n');
  console.log('✅ Arquivo .env.local atualizado');
}

function applyMigrationsAndSeeds() {
  console.log('\n📦 Aplicando migrations e seeds...');
  
  try {
    // Aplicar migrations
    const migrationsScript = path.join(__dirname, 'apply-migrations.js');
    if (fs.existsSync(migrationsScript)) {
      console.log('⚙️  Aplicando migrations...');
      execSync(`node "${migrationsScript}"`, { 
        stdio: 'inherit',
        env: { ...process.env, USE_SUPABASE_CLI: 'true', APPLY_SEEDS: 'true' }
      });
    } else {
      console.log('⚠️  Script de migrations não encontrado');
    }
    
  } catch (error) {
    console.error('❌ Erro ao aplicar migrations:', error.message);
    // Não falhar completamente, apenas avisar
  }
}

function testConnection(supabaseInfo) {
  console.log('\n🔗 Testando conectividade...');
  
  if (!supabaseInfo) {
    console.log('⚠️  Informações de conexão não disponíveis');
    return;
  }
  
  const tests = [
    {
      name: 'API REST',
      url: `${supabaseInfo.apiUrl}/rest/v1/`,
      headers: { 'apikey': supabaseInfo.anonKey }
    },
    {
      name: 'Studio',
      url: supabaseInfo.studioUrl
    }
  ];
  
  tests.forEach(test => {
    try {
      console.log(`   Testando ${test.name}...`);
      
      // Usar curl para testar (mais confiável que fetch em Node)
      const curlCmd = test.headers ? 
        `curl -s -o /dev/null -w "%{http_code}" -H "apikey: ${test.headers.apikey}" "${test.url}"` :
        `curl -s -o /dev/null -w "%{http_code}" "${test.url}"`;
      
      const statusCode = execSync(curlCmd, { encoding: 'utf8', timeout: 5000 }).trim();
      
      if (statusCode.startsWith('2') || statusCode.startsWith('3')) {
        console.log(`   ✅ ${test.name}: OK (${statusCode})`);
      } else {
        console.log(`   ⚠️  ${test.name}: ${statusCode}`);
      }
      
    } catch (error) {
      console.log(`   ❌ ${test.name}: Falha na conexão`);
    }
  });
}

function displaySummary(supabaseInfo) {
  console.log('\n' + '='.repeat(70));
  console.log('🎉 SUPABASE LOCAL CONFIGURADO COM SUCESSO!');
  console.log('='.repeat(70));
  
  if (supabaseInfo) {
    console.log('\n🔗 URLs importantes:');
    console.log(`   API: ${supabaseInfo.apiUrl}`);
    console.log(`   Studio: ${supabaseInfo.studioUrl}`);
    console.log(`   Database: ${supabaseInfo.dbUrl}`);
    
    console.log('\n🔑 Chaves (salvas em .env.local):');
    console.log(`   Anon Key: ${supabaseInfo.anonKey?.substring(0, 20)}...`);
    console.log(`   Service Role: ${supabaseInfo.serviceRoleKey?.substring(0, 20)}...`);
  }
  
  console.log('\n📋 Próximos passos:');
  console.log('   1. Acesse o Studio para gerenciar o banco');
  console.log('   2. Execute seu app: npm run dev');
  console.log('   3. Para parar: supabase stop');
  console.log('   4. Para resetar: supabase db reset');
  
  console.log('\n💡 Comandos úteis:');
  console.log('   supabase status    - Ver status dos serviços');
  console.log('   supabase logs      - Ver logs dos containers');
  console.log('   supabase db reset  - Resetar banco de dados');
  
  console.log('\n' + '='.repeat(70));
}

function main() {
  console.log('🚀 Configurando Supabase para desenvolvimento local...');
  
  try {
    // Verificações iniciais
    checkDependencies();
    checkDockerStatus();
    
    // Configuração
    initializeSupabase();
    configureSupabase();
    
    // Inicialização
    startSupabase();
    
    // Obter informações
    const supabaseInfo = getSupabaseStatus();
    
    // Configurar ambiente
    updateEnvFile(supabaseInfo);
    
    // Aplicar dados
    applyMigrationsAndSeeds();
    
    // Testes
    testConnection(supabaseInfo);
    
    // Resumo
    displaySummary(supabaseInfo);
    
    console.log('\n✅ Configuração concluída com sucesso!');
    
  } catch (error) {
    console.error('\n❌ Erro durante a configuração:', error.message);
    console.error('\n💡 Dicas para resolução:');
    console.error('   - Verifique se o Docker está rodando');
    console.error('   - Certifique-se de que as portas não estão em uso');
    console.error('   - Execute: supabase stop && supabase start');
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkDependencies,
  checkDockerStatus,
  initializeSupabase,
  startSupabase,
  getSupabaseStatus
};