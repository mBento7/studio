#!/usr/bin/env node

/**
 * Script principal para verificação da saúde do código
 * 
 * Executa todas as verificações de qualidade de código:
 * - Arquivos órfãos e imports quebrados
 * - Dependências não utilizadas
 * - Gera relatório consolidado
 * 
 * Uso: node scripts/check-code-health.js [--fix]
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const OrphanedFilesChecker = require('./check-orphaned-files');
const UnusedDependenciesChecker = require('./check-unused-dependencies');

class CodeHealthChecker {
  constructor() {
    this.projectRoot = process.cwd();
    this.shouldFix = process.argv.includes('--fix');
    this.results = {
      orphanedFiles: null,
      dependencies: null,
      summary: {
        totalIssues: 0,
        criticalIssues: 0,
        warnings: 0,
        suggestions: []
      }
    };
  }

  // Executa verificação de arquivos órfãos
  async checkOrphanedFiles() {
    console.log('🔍 Verificando arquivos órfãos e imports quebrados...\n');
    
    const checker = new OrphanedFilesChecker();
    await checker.analyze();
    
    // Lê o relatório gerado
    const reportPath = path.join(this.projectRoot, 'scripts', 'orphaned-files-report.json');
    if (fs.existsSync(reportPath)) {
      this.results.orphanedFiles = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    }
  }

  // Executa verificação de dependências
  async checkDependencies() {
    console.log('\n📦 Verificando dependências não utilizadas...\n');
    
    const checker = new UnusedDependenciesChecker();
    await checker.analyze();
    
    // Lê o relatório gerado
    const reportPath = path.join(this.projectRoot, 'scripts', 'dependencies-report.json');
    if (fs.existsSync(reportPath)) {
      this.results.dependencies = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    }
  }

  // Analisa resultados e gera resumo
  analyzeResults() {
    let totalIssues = 0;
    let criticalIssues = 0;
    let warnings = 0;
    const suggestions = [];

    // Analisa arquivos órfãos
    if (this.results.orphanedFiles) {
      const { orphanedFiles, brokenImports } = this.results.orphanedFiles;
      
      // Imports quebrados são críticos
      criticalIssues += brokenImports.length;
      totalIssues += brokenImports.length;
      
      if (brokenImports.length > 0) {
        suggestions.push({
          type: 'critical',
          category: 'imports',
          message: `${brokenImports.length} imports quebrados encontrados`,
          action: 'Corrija ou remova os imports que não existem'
        });
      }
      
      // Arquivos órfãos são warnings
      warnings += orphanedFiles.length;
      totalIssues += orphanedFiles.length;
      
      if (orphanedFiles.length > 0) {
        suggestions.push({
          type: 'warning',
          category: 'cleanup',
          message: `${orphanedFiles.length} arquivos órfãos encontrados`,
          action: 'Verifique se podem ser removidos com segurança'
        });
      }
    }

    // Analisa dependências
    if (this.results.dependencies) {
      const { unusedDependencies, unusedDevDependencies, missingDependencies, devDependenciesInProduction } = this.results.dependencies;
      
      // Dependências faltando são críticas
      criticalIssues += missingDependencies.length;
      totalIssues += missingDependencies.length;
      
      if (missingDependencies.length > 0) {
        suggestions.push({
          type: 'critical',
          category: 'dependencies',
          message: `${missingDependencies.length} dependências faltando`,
          action: `Execute: npm install ${missingDependencies.join(' ')}`
        });
      }
      
      // DevDeps em produção são críticas
      criticalIssues += devDependenciesInProduction.length;
      totalIssues += devDependenciesInProduction.length;
      
      if (devDependenciesInProduction.length > 0) {
        suggestions.push({
          type: 'critical',
          category: 'dependencies',
          message: `${devDependenciesInProduction.length} devDependencies em código de produção`,
          action: 'Mova para dependencies ou remova do código de produção'
        });
      }
      
      // Dependências não utilizadas são warnings
      const totalUnused = unusedDependencies.length + unusedDevDependencies.length;
      warnings += totalUnused;
      totalIssues += totalUnused;
      
      if (unusedDependencies.length > 0) {
        suggestions.push({
          type: 'warning',
          category: 'cleanup',
          message: `${unusedDependencies.length} dependencies não utilizadas`,
          action: `Execute: npm uninstall ${unusedDependencies.join(' ')}`
        });
      }
      
      if (unusedDevDependencies.length > 0) {
        suggestions.push({
          type: 'warning',
          category: 'cleanup',
          message: `${unusedDevDependencies.length} devDependencies não utilizadas`,
          action: `Execute: npm uninstall --save-dev ${unusedDevDependencies.join(' ')}`
        });
      }
    }

    this.results.summary = {
      totalIssues,
      criticalIssues,
      warnings,
      suggestions
    };
  }

  // Aplica correções automáticas (se --fix foi usado)
  async applyFixes() {
    if (!this.shouldFix) return;
    
    console.log('\n🔧 Aplicando correções automáticas...\n');
    
    let fixesApplied = 0;
    
    // Remove dependências não utilizadas
    if (this.results.dependencies) {
      const { commands } = this.results.dependencies;
      
      if (commands.removeUnusedDeps) {
        try {
          console.log(`📦 Removendo dependencies não utilizadas...`);
          execSync(commands.removeUnusedDeps, { stdio: 'inherit' });
          fixesApplied++;
        } catch (error) {
          console.warn(`⚠️  Erro ao remover dependencies: ${error.message}`);
        }
      }
      
      if (commands.removeUnusedDevDeps) {
        try {
          console.log(`🛠️  Removendo devDependencies não utilizadas...`);
          execSync(commands.removeUnusedDevDeps, { stdio: 'inherit' });
          fixesApplied++;
        } catch (error) {
          console.warn(`⚠️  Erro ao remover devDependencies: ${error.message}`);
        }
      }
      
      if (commands.installMissingDeps) {
        try {
          console.log(`📥 Instalando dependências faltando...`);
          execSync(commands.installMissingDeps, { stdio: 'inherit' });
          fixesApplied++;
        } catch (error) {
          console.warn(`⚠️  Erro ao instalar dependências: ${error.message}`);
        }
      }
    }
    
    console.log(`\n✅ ${fixesApplied} correções aplicadas automaticamente.`);
    
    if (fixesApplied > 0) {
      console.log('💡 Execute o script novamente para verificar se os problemas foram resolvidos.');
    }
  }

  // Gera relatório consolidado
  generateConsolidatedReport() {
    console.log('\n' + '='.repeat(70));
    console.log('🏥 RELATÓRIO DE SAÚDE DO CÓDIGO');
    console.log('='.repeat(70));
    
    const { totalIssues, criticalIssues, warnings, suggestions } = this.results.summary;
    
    // Status geral
    console.log('\n📊 STATUS GERAL:');
    if (totalIssues === 0) {
      console.log('   ✅ Código saudável! Nenhum problema encontrado.');
    } else {
      console.log(`   📈 Total de problemas: ${totalIssues}`);
      console.log(`   🚨 Críticos: ${criticalIssues}`);
      console.log(`   ⚠️  Avisos: ${warnings}`);
      
      // Calcula score de saúde (0-100)
      const healthScore = Math.max(0, 100 - (criticalIssues * 10) - (warnings * 2));
      console.log(`   💯 Score de saúde: ${healthScore}/100`);
    }
    
    // Sugestões por categoria
    if (suggestions.length > 0) {
      console.log('\n🎯 AÇÕES RECOMENDADAS:');
      
      const critical = suggestions.filter(s => s.type === 'critical');
      const warningsSugg = suggestions.filter(s => s.type === 'warning');
      
      if (critical.length > 0) {
        console.log('\n   🚨 CRÍTICO (ação imediata necessária):');
        critical.forEach((sugg, i) => {
          console.log(`   ${i + 1}. ${sugg.message}`);
          console.log(`      💡 ${sugg.action}`);
        });
      }
      
      if (warningsSugg.length > 0) {
        console.log('\n   ⚠️  AVISOS (recomendado corrigir):');
        warningsSugg.forEach((sugg, i) => {
          console.log(`   ${i + 1}. ${sugg.message}`);
          console.log(`      💡 ${sugg.action}`);
        });
      }
    }
    
    // Comandos úteis
    console.log('\n🛠️  COMANDOS ÚTEIS:');
    console.log('   📋 Verificar novamente: node scripts/check-code-health.js');
    console.log('   🔧 Aplicar correções: node scripts/check-code-health.js --fix');
    console.log('   🗑️  Só arquivos órfãos: node scripts/check-orphaned-files.js');
    console.log('   📦 Só dependências: node scripts/check-unused-dependencies.js');
    
    // Salva relatório consolidado
    this.saveConsolidatedReport();
    
    console.log('\n' + '='.repeat(70));
    console.log('✅ Verificação de saúde concluída!');
    console.log('📄 Relatório consolidado salvo em: scripts/code-health-report.json');
    console.log('='.repeat(70));
    
    // Exit code baseado na severidade dos problemas
    if (criticalIssues > 0) {
      process.exit(1); // Falha se há problemas críticos
    }
  }

  // Salva relatório consolidado
  saveConsolidatedReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.results.summary,
      details: {
        orphanedFiles: this.results.orphanedFiles,
        dependencies: this.results.dependencies
      },
      recommendations: {
        immediate: this.results.summary.suggestions.filter(s => s.type === 'critical'),
        suggested: this.results.summary.suggestions.filter(s => s.type === 'warning')
      },
      healthScore: Math.max(0, 100 - (this.results.summary.criticalIssues * 10) - (this.results.summary.warnings * 2))
    };
    
    const reportPath = path.join(this.projectRoot, 'scripts', 'code-health-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  }

  // Executa verificação completa
  async run() {
    console.log('🏥 Iniciando verificação de saúde do código...\n');
    
    try {
      // Executa todas as verificações
      await this.checkOrphanedFiles();
      await this.checkDependencies();
      
      // Analisa resultados
      this.analyzeResults();
      
      // Aplica correções se solicitado
      await this.applyFixes();
      
      // Gera relatório final
      this.generateConsolidatedReport();
      
    } catch (error) {
      console.error('❌ Erro durante a verificação:', error);
      process.exit(1);
    }
  }
}

// Executa o script
if (require.main === module) {
  const checker = new CodeHealthChecker();
  checker.run();
}

module.exports = CodeHealthChecker;