#!/usr/bin/env node

/**
 * Script para detectar arquivos órfãos e imports quebrados no projeto
 * 
 * Funcionalidades:
 * - Detecta arquivos TypeScript/JavaScript não importados por nenhum outro arquivo
 * - Verifica imports quebrados (arquivos que não existem)
 * - Identifica componentes não utilizados
 * - Gera relatório detalhado
 * 
 * Uso: node scripts/check-orphaned-files.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configurações
const config = {
  // Diretórios para analisar
  scanDirs: [
    'apps/web/src',
    'src' // Para compatibilidade com estruturas antigas
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
  
  // Arquivos especiais que não devem ser considerados órfãos
  specialFiles: [
    'layout.tsx',
    'page.tsx',
    'loading.tsx',
    'error.tsx',
    'not-found.tsx',
    'globals.css',
    'middleware.ts',
    'next.config.ts',
    'tailwind.config.ts',
    'postcss.config.mjs',
    'components.json'
  ]
};

class OrphanedFilesChecker {
  constructor() {
    this.allFiles = new Set();
    this.importedFiles = new Set();
    this.brokenImports = [];
    this.orphanedFiles = [];
    this.projectRoot = process.cwd();
  }

  // Verifica se um caminho deve ser ignorado
  shouldIgnore(filePath) {
    return config.ignorePatterns.some(pattern => pattern.test(filePath));
  }

  // Verifica se é um arquivo especial que não deve ser considerado órfão
  isSpecialFile(fileName) {
    return config.specialFiles.includes(fileName);
  }

  // Coleta todos os arquivos do projeto
  collectAllFiles(dir) {
    if (!fs.existsSync(dir)) return;
    
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const relativePath = path.relative(this.projectRoot, fullPath);
      
      if (this.shouldIgnore(relativePath)) continue;
      
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        this.collectAllFiles(fullPath);
      } else if (config.extensions.some(ext => item.endsWith(ext))) {
        this.allFiles.add(relativePath.replace(/\\/g, '/'));
      }
    }
  }

  // Analisa imports em um arquivo
  analyzeImports(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const imports = this.extractImports(content);
      
      for (const importPath of imports) {
        const resolvedPath = this.resolveImport(filePath, importPath);
        
        if (resolvedPath) {
          const relativePath = path.relative(this.projectRoot, resolvedPath).replace(/\\/g, '/');
          this.importedFiles.add(relativePath);
        } else {
          // Import quebrado
          this.brokenImports.push({
            file: path.relative(this.projectRoot, filePath).replace(/\\/g, '/'),
            import: importPath
          });
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
      /import\s*\(\s*['"]([^'"]+)['"]\s*\)/g,
      // next/dynamic
      /dynamic\s*\(\s*\(\s*\)\s*=>\s*import\s*\(\s*['"]([^'"]+)['"]\s*\)/g
    ];
    
    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(content)) !== null) {
        const importPath = match[1];
        // Ignora imports de node_modules
        if (!importPath.startsWith('.') && !importPath.startsWith('/')) continue;
        imports.push(importPath);
      }
    }
    
    return imports;
  }

  // Resolve um import para um caminho absoluto
  resolveImport(fromFile, importPath) {
    const fromDir = path.dirname(fromFile);
    
    // Tenta diferentes extensões
    const possibleExtensions = ['', ...config.extensions];
    const possiblePaths = [];
    
    if (importPath.startsWith('.')) {
      // Import relativo
      const basePath = path.resolve(fromDir, importPath);
      
      for (const ext of possibleExtensions) {
        possiblePaths.push(basePath + ext);
        possiblePaths.push(path.join(basePath, 'index' + ext));
      }
    } else if (importPath.startsWith('/')) {
      // Import absoluto do projeto
      const basePath = path.join(this.projectRoot, importPath.slice(1));
      
      for (const ext of possibleExtensions) {
        possiblePaths.push(basePath + ext);
        possiblePaths.push(path.join(basePath, 'index' + ext));
      }
    }
    
    // Verifica qual caminho existe
    for (const possiblePath of possiblePaths) {
      if (fs.existsSync(possiblePath)) {
        return possiblePath;
      }
    }
    
    return null;
  }

  // Executa a análise completa
  async analyze() {
    console.log('🔍 Iniciando análise de arquivos órfãos e imports quebrados...\n');
    
    // Coleta todos os arquivos
    for (const scanDir of config.scanDirs) {
      const fullScanDir = path.join(this.projectRoot, scanDir);
      console.log(`📁 Coletando arquivos de: ${scanDir}`);
      this.collectAllFiles(fullScanDir);
    }
    
    console.log(`📊 Total de arquivos encontrados: ${this.allFiles.size}\n`);
    
    // Analisa imports em todos os arquivos
    console.log('🔗 Analisando imports...');
    for (const file of this.allFiles) {
      const fullPath = path.join(this.projectRoot, file);
      this.analyzeImports(fullPath);
    }
    
    // Identifica arquivos órfãos
    for (const file of this.allFiles) {
      const fileName = path.basename(file);
      
      if (!this.importedFiles.has(file) && !this.isSpecialFile(fileName)) {
        this.orphanedFiles.push(file);
      }
    }
    
    this.generateReport();
  }

  // Gera relatório detalhado
  generateReport() {
    console.log('\n' + '='.repeat(60));
    console.log('📋 RELATÓRIO DE ANÁLISE');
    console.log('='.repeat(60));
    
    // Estatísticas gerais
    console.log('\n📊 ESTATÍSTICAS:');
    console.log(`   Total de arquivos: ${this.allFiles.size}`);
    console.log(`   Arquivos importados: ${this.importedFiles.size}`);
    console.log(`   Arquivos órfãos: ${this.orphanedFiles.length}`);
    console.log(`   Imports quebrados: ${this.brokenImports.length}`);
    
    // Arquivos órfãos
    if (this.orphanedFiles.length > 0) {
      console.log('\n🗑️  ARQUIVOS ÓRFÃOS (não importados):');
      this.orphanedFiles.sort().forEach(file => {
        console.log(`   ❌ ${file}`);
      });
      
      console.log('\n💡 Sugestão: Verifique se estes arquivos podem ser removidos.');
    } else {
      console.log('\n✅ Nenhum arquivo órfão encontrado!');
    }
    
    // Imports quebrados
    if (this.brokenImports.length > 0) {
      console.log('\n🔗 IMPORTS QUEBRADOS:');
      this.brokenImports.forEach(({ file, import: importPath }) => {
        console.log(`   ❌ ${file}`);
        console.log(`      └─ Import: ${importPath}`);
      });
      
      console.log('\n💡 Sugestão: Corrija ou remova estes imports.');
    } else {
      console.log('\n✅ Nenhum import quebrado encontrado!');
    }
    
    // Salva relatório em arquivo
    this.saveReport();
    
    console.log('\n' + '='.repeat(60));
    console.log('✅ Análise concluída!');
    console.log('📄 Relatório salvo em: scripts/orphaned-files-report.json');
    console.log('='.repeat(60));
  }

  // Salva relatório em JSON
  saveReport() {
    const report = {
      timestamp: new Date().toISOString(),
      statistics: {
        totalFiles: this.allFiles.size,
        importedFiles: this.importedFiles.size,
        orphanedFiles: this.orphanedFiles.length,
        brokenImports: this.brokenImports.length
      },
      orphanedFiles: this.orphanedFiles.sort(),
      brokenImports: this.brokenImports.sort((a, b) => a.file.localeCompare(b.file)),
      allFiles: Array.from(this.allFiles).sort(),
      importedFiles: Array.from(this.importedFiles).sort()
    };
    
    const reportPath = path.join(this.projectRoot, 'scripts', 'orphaned-files-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }
}

// Executa o script
if (require.main === module) {
  const checker = new OrphanedFilesChecker();
  checker.analyze().catch(error => {
    console.error('❌ Erro durante a análise:', error);
    process.exit(1);
  });
}

module.exports = OrphanedFilesChecker;