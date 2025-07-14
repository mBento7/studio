#!/usr/bin/env node

/**
 * Script para detectar dependências não utilizadas no projeto
 * 
 * Funcionalidades:
 * - Verifica dependências do package.json que não são importadas
 * - Identifica devDependencies que podem estar sendo usadas em produção
 * - Detecta imports de pacotes não declarados como dependências
 * - Gera relatório com sugestões de limpeza
 * 
 * Uso: node scripts/check-unused-dependencies.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const config = {
  // Diretórios para analisar
  scanDirs: [
    'apps/web/src',
    'src'
  ],
  
  // Extensões de arquivo para analisar
  extensions: ['.ts', '.tsx', '.js', '.jsx'],
  
  // Padrões de arquivos para ignorar
  ignorePatterns: [
    /node_modules/,
    /\.next/,
    /\.git/,
    /dist/,
    /build/,
    /coverage/,
    /\.genkit/,
    /public/,
    /\.vscode/,
    /\.cursor/,
    /\.idx/,
    /\.husky/
  ],
  
  // Dependências que são usadas implicitamente (não aparecem em imports)
  implicitDependencies: [
    'next',
    'react',
    'react-dom',
    'typescript',
    'tailwindcss',
    'postcss',
    'autoprefixer',
    '@types/node',
    '@types/react',
    '@types/react-dom',
    'eslint',
    'prettier'
  ],
  
  // Dependências de desenvolvimento que podem aparecer em código de produção
  devDepsInProd: [
    '@types/',
    'eslint',
    'prettier',
    'jest',
    'vitest',
    'cypress',
    'playwright'
  ]
};

class UnusedDependenciesChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.packageJsonPath = path.join(this.projectRoot, 'package.json');
    this.dependencies = new Set();
    this.devDependencies = new Set();
    this.usedPackages = new Set();
    this.unusedDeps = [];
    this.unusedDevDeps = [];
    this.missingDeps = [];
    this.devDepsInProdCode = [];
  }

  // Carrega dependências do package.json
  loadPackageJson() {
    // Carrega package.json do workspace root
    if (fs.existsSync(this.packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
      this.loadDependenciesFromPackageJson(packageJson, 'root');
    }
    
    // Carrega package.json do apps/web (workspace principal)
    const webPackageJsonPath = path.join(this.projectRoot, 'apps/web/package.json');
    if (fs.existsSync(webPackageJsonPath)) {
      const webPackageJson = JSON.parse(fs.readFileSync(webPackageJsonPath, 'utf8'));
      this.loadDependenciesFromPackageJson(webPackageJson, 'apps/web');
    }
    
    console.log(`📦 Dependencies: ${this.dependencies.size}`);
    console.log(`🛠️  DevDependencies: ${this.devDependencies.size}`);
  }
  
  // Carrega dependências de um package.json específico
  loadDependenciesFromPackageJson(packageJson, source) {
    // Carrega dependencies
    if (packageJson.dependencies) {
      Object.keys(packageJson.dependencies).forEach(dep => {
        this.dependencies.add(dep);
      });
    }
    
    // Carrega devDependencies
    if (packageJson.devDependencies) {
      Object.keys(packageJson.devDependencies).forEach(dep => {
        this.devDependencies.add(dep);
      });
    }
  }

  // Verifica se um caminho deve ser ignorado
  shouldIgnore(filePath) {
    return config.ignorePatterns.some(pattern => pattern.test(filePath));
  }

  // Coleta todos os arquivos e analisa imports
  analyzeFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(this.projectRoot, fullPath);
      
      if (this.shouldIgnore(relativePath)) continue;
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.analyzeFiles(fullPath);
      } else if (config.extensions.some(ext => item.endsWith(ext))) {
        this.analyzeImports(fullPath);
      }
    }
  }

  // Analisa imports em um arquivo
  analyzeImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = this.extractImports(content);
      
      for (const importPath of imports) {
        const packageName = this.extractPackageName(importPath);
        if (packageName) {
          this.usedPackages.add(packageName);
          
          // Verifica se é devDependency sendo usada em código de produção
          if (this.devDependencies.has(packageName) && !this.isDevFile(filePath)) {
            const shouldBeInProd = !config.devDepsInProd.some(pattern => 
              packageName.includes(pattern)
            );
            
            if (shouldBeInProd) {
              this.devDepsInProdCode.push({
                file: path.relative(this.projectRoot, filePath).replace(/\\/g, '/'),
                package: packageName
              });
            }
          }
        }
      }
    } catch (error) {
      console.warn(`Erro ao analisar ${filePath}: ${error.message}`);
    }
  }

  // Extrai imports de um arquivo
  extractImports(content) {
    const imports = [];
    
    // Regex para diferentes tipos de import
    const patterns = [
      // import ... from '...'
      /import\s+(?:[^'"]*\s+from\s+)?['"]([^'"]+)['"]/g,
      // require('...')
      /require\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      // import('...')
      /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const importPath = match[1];
        // Só considera imports de node_modules (não relativos e não path aliases)
        if (!importPath.startsWith('.') && !importPath.startsWith('/') && !importPath.startsWith('@/')) {
          imports.push(importPath);
        }
      }
    }
    
    return imports;
  }

  // Extrai o nome do pacote de um import
  extractPackageName(importPath) {
    // Remove subpaths e mantém apenas o nome do pacote
    if (importPath.startsWith('@')) {
      // Scoped package: @scope/package
      const parts = importPath.split('/');
      return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
    } else {
      // Regular package: package/subpath
      return importPath.split('/')[0];
    }
  }

  // Verifica se é um arquivo de desenvolvimento
  isDevFile(filePath) {
    const devPatterns = [
      /\.test\./,
      /\.spec\./,
      /\.stories\./,
      /\.config\./,
      /\.setup\./,
      /jest/,
      /vitest/,
      /cypress/,
      /playwright/,
      /\.eslintrc/,
      /prettier/
    ];
    
    return devPatterns.some(pattern => pattern.test(filePath));
  }

  // Identifica dependências não utilizadas
  findUnusedDependencies() {
    // Dependencies não utilizadas
    for (const dep of this.dependencies) {
      if (!this.usedPackages.has(dep) && !config.implicitDependencies.includes(dep)) {
        this.unusedDeps.push(dep);
      }
    }
    
    // DevDependencies não utilizadas
    for (const dep of this.devDependencies) {
      if (!this.usedPackages.has(dep) && !config.implicitDependencies.includes(dep)) {
        this.unusedDevDeps.push(dep);
      }
    }
    
    // Pacotes usados mas não declarados
    for (const pkg of this.usedPackages) {
      if (!this.dependencies.has(pkg) && !this.devDependencies.has(pkg)) {
        this.missingDeps.push(pkg);
      }
    }
  }

  // Executa a análise completa
  async analyze() {
    console.log('📦 Iniciando análise de dependências não utilizadas...\n');
    
    // Carrega package.json
    this.loadPackageJson();
    
    // Analisa arquivos
    for (const scanDir of config.scanDirs) {
      const fullScanDir = path.join(this.projectRoot, scanDir);
      if (fs.existsSync(fullScanDir)) {
        console.log(`📁 Analisando: ${scanDir}`);
        this.analyzeFiles(fullScanDir);
      }
    }
    
    console.log(`🔍 Pacotes encontrados em imports: ${this.usedPackages.size}\n`);
    
    // Identifica dependências não utilizadas
    this.findUnusedDependencies();
    
    this.generateReport();
  }

  // Gera relatório detalhado
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 RELATÓRIO DE DEPENDÊNCIAS');
    console.log('='.repeat(60));
    
    // Estatísticas gerais
    console.log('\n📊 ESTATÍSTICAS:');
    console.log(`   Total dependencies: ${this.dependencies.size}`);
    console.log(`   Total devDependencies: ${this.devDependencies.size}`);
    console.log(`   Pacotes usados: ${this.usedPackages.size}`);
    console.log(`   Dependencies não utilizadas: ${this.unusedDeps.length}`);
    console.log(`   DevDependencies não utilizadas: ${this.unusedDevDeps.length}`);
    console.log(`   Dependências faltando: ${this.missingDeps.length}`);
    console.log(`   DevDeps em código de produção: ${this.devDepsInProdCode.length}`);
    
    // Dependencies não utilizadas
    if (this.unusedDeps.length > 0) {
      console.log('\n🗑️  DEPENDENCIES NÃO UTILIZADAS:');
      this.unusedDeps.sort().forEach(dep => {
        console.log(`   ❌ ${dep}`);
      });
      
      console.log('\n💡 Comando para remover:');
      console.log(`   npm uninstall ${this.unusedDeps.join(' ')}`);
    } else {
      console.log('\n✅ Todas as dependencies estão sendo utilizadas!');
    }
    
    // DevDependencies não utilizadas
    if (this.unusedDevDeps.length > 0) {
      console.log('\n🛠️  DEVDEPENDENCIES NÃO UTILIZADAS:');
      this.unusedDevDeps.sort().forEach(dep => {
        console.log(`   ❌ ${dep}`);
      });
      
      console.log('\n💡 Comando para remover:');
      console.log(`   npm uninstall --save-dev ${this.unusedDevDeps.join(' ')}`);
    } else {
      console.log('\n✅ Todas as devDependencies estão sendo utilizadas!');
    }
    
    // Dependências faltando
    if (this.missingDeps.length > 0) {
      console.log('\n⚠️  DEPENDÊNCIAS FALTANDO:');
      this.missingDeps.sort().forEach(dep => {
        console.log(`   ❌ ${dep}`);
      });
      
      console.log('\n💡 Comando para instalar:');
      console.log(`   npm install ${this.missingDeps.join(' ')}`);
    } else {
      console.log('\n✅ Todas as dependências estão declaradas!');
    }
    
    // DevDependencies em código de produção
    if (this.devDepsInProdCode.length > 0) {
      console.log('\n⚠️  DEVDEPENDENCIES EM CÓDIGO DE PRODUÇÃO:');
      const grouped = {};
      this.devDepsInProdCode.forEach(({ file, package: pkg }) => {
        if (!grouped[pkg]) grouped[pkg] = [];
        grouped[pkg].push(file);
      });
      
      Object.entries(grouped).forEach(([pkg, files]) => {
        console.log(`   ⚠️  ${pkg}`);
        files.forEach(file => {
          console.log(`      └─ ${file}`);
        });
      });
      
      console.log('\n💡 Sugestão: Mova estas dependências para dependencies se necessário.');
    } else {
      console.log('\n✅ Nenhuma devDependency sendo usada em produção!');
    }
    
    // Salva relatório em arquivo
    this.saveReport();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Análise concluída!');
    console.log('📄 Relatório salvo em: scripts/dependencies-report.json');
    console.log('='.repeat(60));
  }

  // Salva relatório em JSON
  saveReport() {
    const report = {
      timestamp: new Date().toISOString(),
      statistics: {
        totalDependencies: this.dependencies.size,
        totalDevDependencies: this.devDependencies.size,
        usedPackages: this.usedPackages.size,
        unusedDeps: this.unusedDeps.length,
        unusedDevDeps: this.unusedDevDeps.length,
        missingDeps: this.missingDeps.length,
        devDepsInProd: this.devDepsInProdCode.length
      },
      unusedDependencies: this.unusedDeps.sort(),
      unusedDevDependencies: this.unusedDevDeps.sort(),
      missingDependencies: this.missingDeps.sort(),
      devDependenciesInProduction: this.devDepsInProdCode.sort((a, b) => a.package.localeCompare(b.package)),
      usedPackages: Array.from(this.usedPackages).sort(),
      commands: {
        removeUnusedDeps: this.unusedDeps.length > 0 ? `npm uninstall ${this.unusedDeps.join(' ')}` : null,
        removeUnusedDevDeps: this.unusedDevDeps.length > 0 ? `npm uninstall --save-dev ${this.unusedDevDeps.join(' ')}` : null,
        installMissingDeps: this.missingDeps.length > 0 ? `npm install ${this.missingDeps.join(' ')}` : null
      }
    };
    
    const reportPath = path.join(this.projectRoot, 'scripts', 'dependencies-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
}

// Executa o script
if (require.main === module) {
  const checker = new UnusedDependenciesChecker();
  checker.analyze().catch(error => {
    console.error('❌ Erro durante a análise:', error);
    process.exit(1);
  });
}

module.exports = UnusedDependenciesChecker;