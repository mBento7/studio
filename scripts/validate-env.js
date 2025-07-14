#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/**
 * Script para validação de variáveis de ambiente e segredos
 * 
 * Funcionalidades:
 * - Verifica se todas as variáveis necessárias estão definidas
 * - Valida formato de URLs e chaves
 * - Detecta segredos expostos ou inseguros
 * - Gera relatório de segurança
 * - Sugere melhorias de configuração
 */

const ENV_FILES = [
  path.join(__dirname, '../apps/web/.env.local'),
  path.join(__dirname, '../apps/web/.env'),
  path.join(__dirname, '../.env.local'),
  path.join(__dirname, '../.env')
];

const ENV_EXAMPLE = path.join(__dirname, '../apps/web/.env.example');

// Variáveis obrigatórias por ambiente
const REQUIRED_VARS = {
  development: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'DB_URL'
  ],
  production: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'DB_URL'
  ],
  test: [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ]
};

// Padrões de validação
const VALIDATION_PATTERNS = {
  NEXT_PUBLIC_SUPABASE_URL: /^https:\/\/[a-z0-9-]+\.supabase\.co$/,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
  SUPABASE_SERVICE_ROLE_KEY: /^eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/,
  DB_URL: /^postgresql:\/\/[^\s]+$/,
  MCP_API_URL: /^https?:\/\/[^\s]+$/
};

// Valores inseguros conhecidos
const INSECURE_VALUES = [
  'your_supabase_project_url',
  'your_supabase_anon_key',
  'your_supabase_service_role_key',
  'password',
  '123456',
  'localhost',
  'example.com',
  '<SUA_STRING_DE_CONEXAO_PSQL>'
];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const vars = {};
  
  content.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        vars[key.trim()] = valueParts.join('=').trim().replace(/^["']|["']$/g, '');
      }
    }
  });
  
  return vars;
}

function loadAllEnvVars() {
  const allVars = {};
  const loadedFiles = [];
  
  // Carregar variáveis do processo
  Object.keys(process.env).forEach(key => {
    if (key.startsWith('NEXT_PUBLIC_') || 
        key.startsWith('SUPABASE_') || 
        key === 'DB_URL' || 
        key === 'DATABASE_URL' ||
        key === 'MCP_API_URL' ||
        key === 'NODE_ENV') {
      allVars[key] = process.env[key];
    }
  });
  
  // Carregar de arquivos .env
  ENV_FILES.forEach(filePath => {
    const vars = loadEnvFile(filePath);
    if (vars) {
      Object.assign(allVars, vars);
      loadedFiles.push(filePath);
    }
  });
  
  return { vars: allVars, files: loadedFiles };
}

function validateVariable(key, value) {
  const issues = [];
  
  // Verificar se está vazio
  if (!value || value.trim() === '') {
    issues.push({ type: 'empty', message: 'Variável está vazia' });
    return issues;
  }
  
  // Verificar valores inseguros
  if (INSECURE_VALUES.some(insecure => value.toLowerCase().includes(insecure.toLowerCase()))) {
    issues.push({ type: 'insecure', message: 'Contém valor inseguro ou de exemplo' });
  }
  
  // Verificar padrão específico
  if (VALIDATION_PATTERNS[key]) {
    if (!VALIDATION_PATTERNS[key].test(value)) {
      issues.push({ type: 'format', message: 'Formato inválido' });
    }
  }
  
  // Verificações específicas por tipo
  if (key.includes('URL')) {
    try {
      new URL(value);
    } catch (error) {
      issues.push({ type: 'url', message: 'URL inválida' });
    }
  }
  
  if (key.includes('KEY') && value.length < 32) {
    issues.push({ type: 'weak', message: 'Chave muito curta (< 32 caracteres)' });
  }
  
  return issues;
}

function checkEnvironmentCompleteness(vars, environment) {
  const required = REQUIRED_VARS[environment] || REQUIRED_VARS.development;
  const missing = [];
  const present = [];
  
  required.forEach(varName => {
    if (vars[varName]) {
      present.push(varName);
    } else {
      missing.push(varName);
    }
  });
  
  return { missing, present, required };
}

function checkForExposedSecrets(vars) {
  const exposed = [];
  
  Object.entries(vars).forEach(([key, value]) => {
    // Variáveis que NÃO devem ser públicas
    if (!key.startsWith('NEXT_PUBLIC_') && 
        (key.includes('SECRET') || 
         key.includes('PRIVATE') || 
         key.includes('SERVICE_ROLE') ||
         key === 'DB_URL' ||
         key === 'DATABASE_URL')) {
      
      // Verificar se pode estar sendo exposta no frontend
      if (value && value.length > 10) {
        exposed.push({
          key,
          risk: 'high',
          message: 'Variável sensível que não deve ser exposta no frontend'
        });
      }
    }
  });
  
  return exposed;
}

function generateSecurityScore(validationResults) {
  let score = 100;
  let issues = 0;
  
  // Penalizar por variáveis faltando
  score -= validationResults.completeness.missing.length * 15;
  issues += validationResults.completeness.missing.length;
  
  // Penalizar por problemas de validação
  Object.values(validationResults.validation).forEach(varIssues => {
    varIssues.forEach(issue => {
      switch (issue.type) {
        case 'insecure':
          score -= 20;
          break;
        case 'format':
          score -= 10;
          break;
        case 'weak':
          score -= 15;
          break;
        case 'empty':
          score -= 5;
          break;
        default:
          score -= 5;
      }
      issues++;
    });
  });
  
  // Penalizar por segredos expostos
  score -= validationResults.exposedSecrets.length * 25;
  issues += validationResults.exposedSecrets.length;
  
  return { score: Math.max(0, score), issues };
}

function generateReport(validationResults) {
  const report = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    ...validationResults,
    security: generateSecurityScore(validationResults),
    recommendations: []
  };
  
  // Gerar recomendações
  if (report.completeness.missing.length > 0) {
    report.recommendations.push({
      type: 'missing_vars',
      priority: 'high',
      message: `Configure as variáveis obrigatórias: ${report.completeness.missing.join(', ')}`,
      action: 'Adicione as variáveis ao arquivo .env.local'
    });
  }
  
  if (report.exposedSecrets.length > 0) {
    report.recommendations.push({
      type: 'exposed_secrets',
      priority: 'critical',
      message: 'Segredos podem estar expostos',
      action: 'Verifique se variáveis sensíveis não estão sendo enviadas para o frontend'
    });
  }
  
  const hasInsecureValues = Object.values(report.validation).some(issues => 
    issues.some(issue => issue.type === 'insecure')
  );
  
  if (hasInsecureValues) {
    report.recommendations.push({
      type: 'insecure_values',
      priority: 'high',
      message: 'Valores de exemplo ou inseguros detectados',
      action: 'Substitua por valores reais e seguros'
    });
  }
  
  if (!fs.existsSync(ENV_EXAMPLE)) {
    report.recommendations.push({
      type: 'missing_example',
      priority: 'medium',
      message: 'Arquivo .env.example não encontrado',
      action: 'Crie um arquivo .env.example com variáveis de exemplo'
    });
  }
  
  return report;
}

function displayReport(report) {
  console.log('\n🔒 RELATÓRIO DE VALIDAÇÃO DE VARIÁVEIS DE AMBIENTE');
  console.log('=' .repeat(70));
  
  // Score de segurança
  const scoreColor = report.security.score >= 80 ? '🟢' : 
                    report.security.score >= 60 ? '🟡' : '🔴';
  
  console.log(`\n${scoreColor} Score de Segurança: ${report.security.score}/100`);
  console.log(`📊 Total de problemas: ${report.security.issues}`);
  console.log(`🌍 Ambiente: ${report.environment}`);
  console.log(`📁 Arquivos carregados: ${report.loadedFiles.length}`);
  
  // Completeness
  console.log(`\n📋 COMPLETENESS:`);
  console.log(`   ✅ Presentes: ${report.completeness.present.length}/${report.completeness.required.length}`);
  
  if (report.completeness.missing.length > 0) {
    console.log(`   ❌ Faltando:`);
    report.completeness.missing.forEach(varName => {
      console.log(`      - ${varName}`);
    });
  }
  
  // Problemas de validação
  const validationIssues = Object.entries(report.validation)
    .filter(([key, issues]) => issues.length > 0);
  
  if (validationIssues.length > 0) {
    console.log(`\n⚠️  PROBLEMAS DE VALIDAÇÃO:`);
    validationIssues.forEach(([key, issues]) => {
      console.log(`   ${key}:`);
      issues.forEach(issue => {
        const icon = issue.type === 'insecure' ? '🚨' : 
                    issue.type === 'format' ? '📝' : 
                    issue.type === 'weak' ? '🔓' : '⚠️';
        console.log(`      ${icon} ${issue.message}`);
      });
    });
  }
  
  // Segredos expostos
  if (report.exposedSecrets.length > 0) {
    console.log(`\n🚨 SEGREDOS POTENCIALMENTE EXPOSTOS:`);
    report.exposedSecrets.forEach(secret => {
      console.log(`   - ${secret.key}: ${secret.message}`);
    });
  }
  
  // Recomendações
  if (report.recommendations.length > 0) {
    console.log(`\n💡 RECOMENDAÇÕES:`);
    report.recommendations.forEach((rec, index) => {
      const priorityIcon = rec.priority === 'critical' ? '🚨' :
                          rec.priority === 'high' ? '⚠️' :
                          rec.priority === 'medium' ? 'ℹ️' : '💡';
      console.log(`   ${index + 1}. ${priorityIcon} ${rec.message}`);
      console.log(`      Ação: ${rec.action}`);
    });
  }
  
  console.log('\n' + '=' .repeat(70));
}

function main() {
  console.log('🔍 Iniciando validação de variáveis de ambiente...');
  
  try {
    // Carregar variáveis
    const { vars, files } = loadAllEnvVars();
    
    // Validar cada variável
    const validation = {};
    Object.entries(vars).forEach(([key, value]) => {
      validation[key] = validateVariable(key, value);
    });
    
    // Verificar completeness
    const environment = process.env.NODE_ENV || 'development';
    const completeness = checkEnvironmentCompleteness(vars, environment);
    
    // Verificar segredos expostos
    const exposedSecrets = checkForExposedSecrets(vars);
    
    // Gerar relatório
    const validationResults = {
      loadedFiles: files,
      validation,
      completeness,
      exposedSecrets
    };
    
    const report = generateReport(validationResults);
    
    // Salvar relatório
    const reportPath = path.join(__dirname, 'env-validation-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Exibir relatório
    displayReport(report);
    
    console.log(`\n📄 Relatório detalhado salvo em: ${reportPath}`);
    
    // Exit code baseado no score
    if (report.security.score < 60) {
      console.log('\n❌ Validação falhou - Score de segurança muito baixo');
      process.exit(1);
    } else if (report.security.score < 80) {
      console.log('\n⚠️  Validação com avisos - Considere melhorar a configuração');
      process.exit(0);
    } else {
      console.log('\n✅ Validação passou - Configuração segura');
      process.exit(0);
    }
    
  } catch (error) {
    console.error('❌ Erro durante a validação:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  loadAllEnvVars,
  validateVariable,
  checkEnvironmentCompleteness,
  checkForExposedSecrets,
  generateReport
};