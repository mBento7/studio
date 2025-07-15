const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const SSH_KEY = 'C:\\Users\\Micael\\.ssh\\oracle_new';
const VPS_HOST = 'ubuntu@129.146.146.242';
const MIGRATIONS_DIR = './supabase/migrations';

function runSSHCommand(command, description) {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 ${description}...`);
        const sshCommand = `ssh -i "${SSH_KEY}" ${VPS_HOST} "${command}"`;
        
        exec(sshCommand, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Erro: ${error.message}`);
                if (stderr) console.log(`Stderr: ${stderr}`);
                resolve({ success: false, error: error.message, stderr, stdout });
            } else {
                console.log(`✅ ${description} - Concluído`);
                if (stdout) console.log(`Stdout: ${stdout}`);
                if (stderr && !stderr.includes('NOTICE')) console.log(`Stderr: ${stderr}`);
                resolve({ success: true, stdout, stderr });
            }
        });
    });
}

function copyFileToVPS(localPath, remotePath, description) {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 ${description}...`);
        const scpCommand = `scp -i "${SSH_KEY}" "${localPath}" ${VPS_HOST}:${remotePath}`;
        
        exec(scpCommand, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Erro: ${error.message}`);
                resolve({ success: false, error: error.message });
            } else {
                console.log(`✅ ${description} - Concluído`);
                resolve({ success: true });
            }
        });
    });
}

async function applyMigrationsVPS() {
    console.log('=== APLICANDO MIGRAÇÕES NO SUPABASE VPS ===\n');
    
    try {
        // 1. Verificar containers Docker
        await runSSHCommand('docker ps | grep supabase', 'Verificando containers Supabase');
        
        // 2. Listar arquivos de migração locais
        const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
            .filter(file => file.endsWith('.sql'))
            .sort();
        
        console.log(`\n📁 Encontrados ${migrationFiles.length} arquivos de migração:`);
        migrationFiles.forEach(file => console.log(`   - ${file}`));
        
        // 3. Copiar e aplicar cada migração
        for (const file of migrationFiles) {
            const localPath = path.join(MIGRATIONS_DIR, file);
            const remotePath = `/tmp/${file}`;
            
            // Copiar arquivo para VPS
            await copyFileToVPS(localPath, remotePath, `Copiando ${file}`);
            
            // Aplicar migração usando Docker exec
            const dockerCommand = `docker exec supabase_db_studio psql -U postgres -d postgres -f ${remotePath}`;
            await runSSHCommand(dockerCommand, `Aplicando migração ${file}`);
        }
        
        // 4. Verificar tabelas criadas usando Docker
        await runSSHCommand(
            'docker exec supabase_db_studio psql -U postgres -d postgres -c "\\dt public.*"',
            'Verificando tabelas criadas'
        );
        
        // 5. Verificar especificamente a tabela profiles
        await runSSHCommand(
            'docker exec supabase_db_studio psql -U postgres -d postgres -c "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = \'public\' AND table_name = \'profiles\';"',
            'Verificando tabela profiles'
        );
        
        console.log('\n✅ Aplicação de migrações concluída!');
        
    } catch (error) {
        console.error('❌ Erro na aplicação de migrações:', error);
    }
}

// Executar
applyMigrationsVPS();