#!/usr/bin/env node

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
    console.log(`⏰ Intervalo: ${this.interval / 1000 / 60} minutos`);
    
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
