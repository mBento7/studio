const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuração
const POSTGRES_HOST = '127.0.0.1';
const POSTGRES_PORT = '54321';
const POSTGRES_USER = 'postgres';
const POSTGRES_DB = 'postgres';
const POSTGRES_PASSWORD = 'postgres';

// Diretório de migrations
const MIGRATIONS_DIR = path.join(__dirname, 'supabase', 'migrations');

function applyMigrationsDirect() {
  console.log('🔄 Aplicando migrations diretamente via psql...');
  
  try {
    // Verificar se o diretório de migrations existe
    if (!fs.existsSync(MIGRATIONS_DIR)) {
      console.error('❌ Diretório de migrations não encontrado:', MIGRATIONS_DIR);
      return;
    }
    
    // Listar arquivos de migration
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(file => file.endsWith('.sql') && !file.includes('README'))
      .sort();
    
    if (migrationFiles.length === 0) {
      console.log('⚠️ Nenhum arquivo de migration encontrado');
      return;
    }
    
    console.log(`📁 Encontrados ${migrationFiles.length} arquivos de migration:`);
    migrationFiles.forEach(file => console.log(`   - ${file}`));
    
    // Aplicar cada migration
    for (const file of migrationFiles) {
      console.log(`\n📄 Aplicando: ${file}`);
      
      const migrationPath = path.join(MIGRATIONS_DIR, file);
      const migrationSQL = fs.readFileSync(migrationPath, 'utf8');
      
      // Salvar SQL em arquivo temporário
      const tempFile = path.join(__dirname, 'temp_migration.sql');
      fs.writeFileSync(tempFile, migrationSQL);
      
      try {
        // Executar via psql
        const command = `psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f "${tempFile}"`;
        
        console.log(`Executando: ${command}`);
        
        // Definir variável de ambiente para senha
        const env = { ...process.env, PGPASSWORD: POSTGRES_PASSWORD };
        
        const result = execSync(command, { 
          stdio: 'pipe', 
          encoding: 'utf8',
          env: env
        });
        
        console.log('✅ Migration aplicada com sucesso');
        if (result.trim()) {
          console.log('📋 Saída:', result.trim());
        }
        
      } catch (error) {
        console.error(`❌ Erro ao aplicar ${file}:`);
        console.error('Erro:', error.message);
        if (error.stdout) {
          console.error('Stdout:', error.stdout);
        }
        if (error.stderr) {
          console.error('Stderr:', error.stderr);
        }
      } finally {
        // Limpar arquivo temporário
        if (fs.existsSync(tempFile)) {
          fs.unlinkSync(tempFile);
        }
      }
    }
    
    // Verificar se as tabelas foram criadas
    console.log('\n🔍 Verificando tabelas criadas...');
    
    const checkSQL = `
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `;
    
    const tempCheckFile = path.join(__dirname, 'temp_check.sql');
    fs.writeFileSync(tempCheckFile, checkSQL);
    
    try {
      const env = { ...process.env, PGPASSWORD: POSTGRES_PASSWORD };
      const result = execSync(
        `psql -h ${POSTGRES_HOST} -p ${POSTGRES_PORT} -U ${POSTGRES_USER} -d ${POSTGRES_DB} -f "${tempCheckFile}"`,
        { stdio: 'pipe', encoding: 'utf8', env: env }
      );
      
      console.log('✅ Tabelas no banco:');
      console.log(result);
      
    } catch (error) {
      console.error('❌ Erro ao verificar tabelas:', error.message);
    } finally {
      if (fs.existsSync(tempCheckFile)) {
        fs.unlinkSync(tempCheckFile);
      }
    }
    
    console.log('\n🎉 Processo de aplicação de migrations concluído!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

applyMigrationsDirect();