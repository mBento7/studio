#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Cores para output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logHeader(message) {
  log(`\n${colors.bold}${colors.blue}=== ${message} ===${colors.reset}`);
}

function logSuccess(message) {
  log(`✅ ${message}`, 'green');
}

function logWarning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function logError(message) {
  log(`❌ ${message}`, 'red');
}

// Verificações de SSR
function checkSSRIssues() {
  logHeader('Verificando problemas de SSR');
  
  const webAppPath = path.join(__dirname, '../apps/web/src');
  const issues = [];
  
  // Padrões problemáticos para SSR
  const ssrProblems = [
    {
      pattern: /window\./g,
      message: 'Uso de window sem verificação typeof window !== "undefined"'
    },
    {
      pattern: /document\./g,
      message: 'Uso de document sem verificação typeof document !== "undefined"'
    },
    {
      pattern: /localStorage\./g,
      message: 'Uso de localStorage sem verificação typeof window !== "undefined"'
    },
    {
      pattern: /sessionStorage\./g,
      message: 'Uso de sessionStorage sem verificação typeof window !== "undefined"'
    },
    {
      pattern: /navigator\./g,
      message: 'Uso de navigator sem verificação typeof navigator !== "undefined"'
    }
  ];
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Pular arquivos que já têm 'use client'
        if (content.includes('"use client"') || content.includes("'use client'")) {
          continue;
        }
        
        for (const problem of ssrProblems) {
          const matches = content.match(problem.pattern);
          if (matches) {
            // Verificar se há proteção adequada
            const lines = content.split('\n');
            let hasIssue = false;
            
            lines.forEach((line, index) => {
              if (problem.pattern.test(line)) {
                // Verificar se a linha está protegida
                const prevLines = lines.slice(Math.max(0, index - 5), index);
                const hasProtection = prevLines.some(prevLine => 
                  prevLine.includes('typeof window !== "undefined"') ||
                  prevLine.includes('typeof document !== "undefined"') ||
                  prevLine.includes('typeof navigator !== "undefined"') ||
                  prevLine.includes('if (typeof window === "undefined") return')
                );
                
                if (!hasProtection) {
                  hasIssue = true;
                  issues.push({
                    file: path.relative(webAppPath, filePath),
                    line: index + 1,
                    issue: problem.message,
                    code: line.trim()
                  });
                }
              }
            });
          }
        }
      }
    }
  }
  
  if (fs.existsSync(webAppPath)) {
    scanDirectory(webAppPath);
  }
  
  if (issues.length === 0) {
    logSuccess('Nenhum problema de SSR encontrado');
  } else {
    logError(`${issues.length} problemas de SSR encontrados:`);
    issues.forEach(issue => {
      log(`  📁 ${issue.file}:${issue.line}`);
      log(`     ${issue.issue}`);
      log(`     Código: ${issue.code}`, 'yellow');
    });
  }
  
  return issues;
}

// Verificar dependências
function checkDependencies() {
  logHeader('Verificando dependências');
  
  try {
    const packageJsonPath = path.join(__dirname, '../apps/web/package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Verificar se todas as dependências estão instaladas
    const nodeModulesPath = path.join(__dirname, '../apps/web/node_modules');
    if (!fs.existsSync(nodeModulesPath)) {
      logError('node_modules não encontrado. Execute: pnpm install');
      return false;
    }
    
    logSuccess('Dependências verificadas');
    return true;
  } catch (error) {
    logError(`Erro ao verificar dependências: ${error.message}`);
    return false;
  }
}

// Verificar variáveis de ambiente
function checkEnvironmentVariables() {
  logHeader('Verificando variáveis de ambiente');
  
  const envExamplePath = path.join(__dirname, '../apps/web/.env.example');
  const envPath = path.join(__dirname, '../apps/web/.env.local');
  
  if (!fs.existsSync(envPath)) {
    logWarning('.env.local não encontrado');
    if (fs.existsSync(envExamplePath)) {
      log('Copie .env.example para .env.local e configure as variáveis');
    }
    return false;
  }
  
  // Verificar variáveis críticas
  const envContent = fs.readFileSync(envPath, 'utf8');
  const criticalVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY'
  ];
  
  const missingVars = criticalVars.filter(varName => 
    !envContent.includes(varName) || envContent.includes(`${varName}=`)
  );
  
  if (missingVars.length > 0) {
    logWarning(`Variáveis de ambiente não configuradas: ${missingVars.join(', ')}`);
    return false;
  }
  
  logSuccess('Variáveis de ambiente verificadas');
  return true;
}

// Verificar sintaxe TypeScript
function checkTypeScript() {
  logHeader('Verificando sintaxe TypeScript');
  
  try {
    const webAppPath = path.join(__dirname, '../apps/web');
    execSync('npx tsc --noEmit', { 
      cwd: webAppPath, 
      stdio: 'pipe' 
    });
    logSuccess('Sintaxe TypeScript válida');
    return true;
  } catch (error) {
    logError('Erros de TypeScript encontrados:');
    log(error.stdout?.toString() || error.message, 'red');
    return false;
  }
}

// Verificar ESLint
function checkESLint() {
  logHeader('Verificando ESLint');
  
  try {
    const webAppPath = path.join(__dirname, '../apps/web');
    execSync('npx eslint . --ext .ts,.tsx --max-warnings 0', { 
      cwd: webAppPath, 
      stdio: 'pipe' 
    });
    logSuccess('ESLint passou sem erros');
    return true;
  } catch (error) {
    logWarning('Avisos/erros do ESLint encontrados:');
    log(error.stdout?.toString() || error.message, 'yellow');
    return false;
  }
}

// Teste de build
function testBuild() {
  logHeader('Testando build de produção');
  
  try {
    const webAppPath = path.join(__dirname, '../apps/web');
    log('Executando build de teste...');
    execSync('pnpm build', { 
      cwd: webAppPath, 
      stdio: 'inherit' 
    });
    logSuccess('Build de teste concluído com sucesso');
    return true;
  } catch (error) {
    logError('Build de teste falhou');
    return false;
  }
}

// Função principal
function main() {
  log(`${colors.bold}${colors.blue}🚀 Análise Pré-Deploy${colors.reset}\n`);
  
  const checks = [
    { name: 'SSR Issues', fn: checkSSRIssues, critical: true },
    { name: 'Dependencies', fn: checkDependencies, critical: true },
    { name: 'Environment Variables', fn: checkEnvironmentVariables, critical: false },
    { name: 'TypeScript', fn: checkTypeScript, critical: false },
    { name: 'ESLint', fn: checkESLint, critical: false },
    { name: 'Build Test', fn: testBuild, critical: true }
  ];
  
  const results = [];
  let criticalIssues = 0;
  
  for (const check of checks) {
    const result = check.fn();
    results.push({ ...check, passed: result });
    
    if (!result && check.critical) {
      criticalIssues++;
    }
  }
  
  // Resumo final
  logHeader('Resumo da Análise');
  
  results.forEach(result => {
    const status = result.passed ? '✅' : (result.critical ? '❌' : '⚠️');
    const criticality = result.critical ? '(crítico)' : '(opcional)';
    log(`${status} ${result.name} ${criticality}`);
  });
  
  if (criticalIssues === 0) {
    log(`\n${colors.bold}${colors.green}🎉 Análise concluída! Projeto pronto para deploy.${colors.reset}`);
    process.exit(0);
  } else {
    log(`\n${colors.bold}${colors.red}🚫 ${criticalIssues} problema(s) crítico(s) encontrado(s). Corrija antes do deploy.${colors.reset}`);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  checkSSRIssues,
  checkDependencies,
  checkEnvironmentVariables,
  checkTypeScript,
  checkESLint,
  testBuild
};