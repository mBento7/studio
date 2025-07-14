#!/usr/bin/env node

/**
 * Script para configurar automação de verificação de saúde do código
 * 
 * Funcionalidades:
 * - Cria hooks do Git para verificação automática
 * - Gera configuração para GitHub Actions
 * - Configura scripts no package.json
 * - Cria configuração para ESLint personalizada
 * 
 * Uso: node scripts/setup-code-health-automation.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class CodeHealthAutomationSetup {
  constructor() {
    this.projectRoot = process.cwd();
    this.packageJsonPath = path.join(this.projectRoot, 'package.json');
  }

  // Configura scripts no package.json
  setupPackageScripts() {
    console.log('📦 Configurando scripts no package.json...');
    
    if (!fs.existsSync(this.packageJsonPath)) {
      console.warn('⚠️  package.json não encontrado!');
      return;
    }
    
    const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
    
    // Adiciona scripts de verificação
    if (!packageJson.scripts) {
      packageJson.scripts = {};
    }
    
    const newScripts = {
      'code-health': 'node scripts/check-code-health.js',
      'code-health:fix': 'node scripts/check-code-health.js --fix',
      'check-orphans': 'node scripts/check-orphaned-files.js',
      'check-deps': 'node scripts/check-unused-dependencies.js',
      'precommit-check': 'npm run code-health',
      'ci-check': 'npm run code-health && npm run lint && npm run type-check'
    };
    
    let scriptsAdded = 0;
    Object.entries(newScripts).forEach(([key, value]) => {
      if (!packageJson.scripts[key]) {
        packageJson.scripts[key] = value;
        scriptsAdded++;
      }
    });
    
    if (scriptsAdded > 0) {
      fs.writeFileSync(this.packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log(`✅ ${scriptsAdded} scripts adicionados ao package.json`);
    } else {
      console.log('ℹ️  Scripts já existem no package.json');
    }
  }

  // Cria configuração do GitHub Actions
  setupGitHubActions() {
    console.log('🔄 Configurando GitHub Actions...');
    
    const workflowsDir = path.join(this.projectRoot, '.github', 'workflows');
    const workflowFile = path.join(workflowsDir, 'code-health.yml');
    
    // Cria diretório se não existir
    if (!fs.existsSync(workflowsDir)) {
      fs.mkdirSync(workflowsDir, { recursive: true });
    }
    
    const workflowContent = `name: Code Health Check

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  code-health:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run code health check
      run: npm run code-health
      
    - name: Run linting
      run: npm run lint
      continue-on-error: true
      
    - name: Run type checking
      run: npm run type-check
      continue-on-error: true
      
    - name: Upload code health report
      uses: actions/upload-artifact@v4
      if: always()
      with:
        name: code-health-report
        path: |
          scripts/code-health-report.json
          scripts/orphaned-files-report.json
          scripts/dependencies-report.json
        retention-days: 30
      
    - name: Comment PR with results
      if: github.event_name == 'pull_request'
      uses: actions/github-script@v7
      with:
        script: |
          const fs = require('fs');
          const path = 'scripts/code-health-report.json';
          
          if (fs.existsSync(path)) {
            const report = JSON.parse(fs.readFileSync(path, 'utf8'));
            const { summary } = report;
            
            const comment = \`## 🏥 Code Health Report
            
            **Health Score:** \${report.healthScore}/100
            
            **Issues Found:**
            - 🚨 Critical: \${summary.criticalIssues}
            - ⚠️ Warnings: \${summary.warnings}
            - 📊 Total: \${summary.totalIssues}
            
            \${summary.criticalIssues > 0 ? '❌ **Action required before merge!**' : '✅ **Ready to merge!**'}
            
            <details>
            <summary>📋 Detailed Report</summary>
            
            \${summary.suggestions.map(s => \`- \${s.type === 'critical' ? '🚨' : '⚠️'} \${s.message}\`).join('\\n')}
            
            </details>\`;
            
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
          }
`;
    
    if (!fs.existsSync(workflowFile)) {
      fs.writeFileSync(workflowFile, workflowContent);
      console.log('✅ GitHub Actions workflow criado');
    } else {
      console.log('ℹ️  GitHub Actions workflow já existe');
    }
  }

  // Configura Git hooks
  setupGitHooks() {
    console.log('🪝 Configurando Git hooks...');
    
    const hooksDir = path.join(this.projectRoot, '.git', 'hooks');
    const preCommitHook = path.join(hooksDir, 'pre-commit');
    
    if (!fs.existsSync(hooksDir)) {
      console.warn('⚠️  Diretório .git/hooks não encontrado. Certifique-se de estar em um repositório Git.');
      return;
    }
    
    const hookContent = `#!/bin/sh
# Code Health Pre-commit Hook

echo "🔍 Executando verificação de saúde do código..."

# Executa verificação de saúde
if ! npm run code-health; then
  echo "❌ Verificação de saúde falhou!"
  echo "💡 Execute 'npm run code-health:fix' para correções automáticas"
  echo "📋 Veja o relatório em scripts/code-health-report.json"
  exit 1
fi

echo "✅ Verificação de saúde passou!"
exit 0
`;
    
    if (!fs.existsSync(preCommitHook)) {
      fs.writeFileSync(preCommitHook, hookContent);
      
      // Torna o hook executável (Unix/Linux/Mac)
      try {
        execSync(`chmod +x "${preCommitHook}"`);
      } catch (error) {
        // Ignora erro no Windows
      }
      
      console.log('✅ Git pre-commit hook criado');
    } else {
      console.log('ℹ️  Git pre-commit hook já existe');
    }
  }

  // Cria configuração personalizada do ESLint
  setupESLintConfig() {
    console.log('🔧 Configurando ESLint personalizado...');
    
    const eslintConfigPath = path.join(this.projectRoot, '.eslintrc.code-health.js');
    
    const eslintConfig = `module.exports = {
  extends: [
    // Suas configurações existentes
    './.eslintrc.js'
  ],
  rules: {
    // Regras para detectar código não utilizado
    '@typescript-eslint/no-unused-vars': ['error', {
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_',
      'ignoreRestSiblings': true
    }],
    
    // Detecta imports não utilizados
    'no-unused-vars': 'off', // Desabilita a regra JS em favor da TS
    
    // Detecta imports duplicados
    'import/no-duplicates': 'error',
    
    // Ordena imports
    'import/order': ['error', {
      'groups': [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index'
      ],
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc',
        'caseInsensitive': true
      }
    }],
    
    // Detecta imports de desenvolvimento em produção
    'import/no-extraneous-dependencies': ['error', {
      'devDependencies': [
        '**/*.test.{ts,tsx,js,jsx}',
        '**/*.spec.{ts,tsx,js,jsx}',
        '**/*.stories.{ts,tsx,js,jsx}',
        '**/*.config.{ts,js}',
        '**/jest.setup.{ts,js}',
        '**/vitest.setup.{ts,js}'
      ]
    }],
    
    // Detecta console.log esquecidos
    'no-console': ['warn', {
      'allow': ['warn', 'error']
    }],
    
    // Detecta debugger esquecidos
    'no-debugger': 'error',
    
    // Detecta código morto
    'no-unreachable': 'error',
    'no-unused-expressions': 'error'
  },
  
  // Configurações específicas para diferentes tipos de arquivo
  overrides: [
    {
      files: ['**/*.test.{ts,tsx,js,jsx}', '**/*.spec.{ts,tsx,js,jsx}'],
      rules: {
        // Permite console em testes
        'no-console': 'off'
      }
    },
    {
      files: ['**/*.stories.{ts,tsx,js,jsx}'],
      rules: {
        // Permite imports de desenvolvimento em stories
        'import/no-extraneous-dependencies': 'off'
      }
    }
  ]
};
`;
    
    if (!fs.existsSync(eslintConfigPath)) {
      fs.writeFileSync(eslintConfigPath, eslintConfig);
      console.log('✅ Configuração ESLint personalizada criada');
    } else {
      console.log('ℹ️  Configuração ESLint personalizada já existe');
    }
  }

  // Cria script de monitoramento contínuo
  setupContinuousMonitoring() {
    console.log('📊 Configurando monitoramento contínuo...');
    
    const monitoringScript = path.join(this.projectRoot, 'scripts', 'monitor-code-health.js');
    
    const scriptContent = `#!/usr/bin/env node

/**
 * Script de monitoramento contínuo da saúde do código
 * Executa verificações em intervalos regulares e mantém histórico
 */

const fs = require('fs');
const path = require('path');
const CodeHealthChecker = require('./check-code-health');

class ContinuousMonitor {
  constructor() {
    this.projectRoot = process.cwd();
    this.historyFile = path.join(this.projectRoot, 'scripts', 'health-history.json');
    this.interval = 60 * 60 * 1000; // 1 hora
  }

  async runCheck() {
    console.log('🔍 Executando verificação de saúde...');
    
    const checker = new CodeHealthChecker();
    await checker.run();
    
    // Lê o relatório gerado
    const reportPath = path.join(this.projectRoot, 'scripts', 'code-health-report.json');
    if (fs.existsSync(reportPath)) {
      const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
      this.saveToHistory(report);
    }
  }

  saveToHistory(report) {
    let history = [];
    
    if (fs.existsSync(this.historyFile)) {
      history = JSON.parse(fs.readFileSync(this.historyFile, 'utf8'));
    }
    
    history.push({
      timestamp: report.timestamp,
      healthScore: report.healthScore,
      summary: report.summary
    });
    
    // Mantém apenas os últimos 100 registros
    if (history.length > 100) {
      history = history.slice(-100);
    }
    
    fs.writeFileSync(this.historyFile, JSON.stringify(history, null, 2));
  }

  start() {
    console.log('🚀 Iniciando monitoramento contínuo...');
    console.log(\`⏰ Intervalo: \${this.interval / 1000 / 60} minutos\`);
    
    // Executa imediatamente
    this.runCheck();
    
    // Agenda execuções futuras
    setInterval(() => {
      this.runCheck();
    }, this.interval);
  }
}

if (require.main === module) {
  const monitor = new ContinuousMonitor();
  monitor.start();
}

module.exports = ContinuousMonitor;
`;
    
    if (!fs.existsSync(monitoringScript)) {
      fs.writeFileSync(monitoringScript, scriptContent);
      console.log('✅ Script de monitoramento contínuo criado');
    } else {
      console.log('ℹ️  Script de monitoramento contínuo já existe');
    }
  }

  // Executa configuração completa
  async setup() {
    console.log('🔧 Configurando automação de verificação de saúde do código...\n');
    
    try {
      this.setupPackageScripts();
      this.setupGitHubActions();
      this.setupGitHooks();
      this.setupESLintConfig();
      this.setupContinuousMonitoring();
      
      console.log('\n' + '='.repeat(60));
      console.log('✅ AUTOMAÇÃO CONFIGURADA COM SUCESSO!');
      console.log('='.repeat(60));
      
      console.log('\n🎯 PRÓXIMOS PASSOS:');
      console.log('1. Execute: npm run code-health');
      console.log('2. Commit suas mudanças para testar o pre-commit hook');
      console.log('3. Faça um PR para testar o GitHub Actions');
      console.log('4. Configure seu CI/CD para usar npm run ci-check');
      
      console.log('\n📋 COMANDOS DISPONÍVEIS:');
      console.log('- npm run code-health          # Verificação completa');
      console.log('- npm run code-health:fix      # Com correções automáticas');
      console.log('- npm run check-orphans        # Só arquivos órfãos');
      console.log('- npm run check-deps           # Só dependências');
      console.log('- npm run precommit-check      # Verificação pré-commit');
      console.log('- npm run ci-check             # Verificação completa para CI');
      
      console.log('\n📁 ARQUIVOS CRIADOS:');
      console.log('- .github/workflows/code-health.yml');
      console.log('- .git/hooks/pre-commit');
      console.log('- .eslintrc.code-health.js');
      console.log('- scripts/monitor-code-health.js');
      
      console.log('\n='.repeat(60));
      
    } catch (error) {
      console.error('❌ Erro durante a configuração:', error);
      process.exit(1);
    }
  }
}

// Executa o script
if (require.main === module) {
  const setup = new CodeHealthAutomationSetup();
  setup.setup();
}

module.exports = CodeHealthAutomationSetup;