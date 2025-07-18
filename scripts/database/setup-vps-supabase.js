const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurações
const SSH_KEY = 'C:\\Users\\Micael\\.ssh\\oracle_new';
const VPS_HOST = 'ubuntu@129.146.146.242';
const VPS_SUPABASE_DIR = '/home/ubuntu/supabase';

function runSSHCommand(command, description) {
    return new Promise((resolve, reject) => {
        console.log(`\n🔄 ${description}...`);
        const sshCommand = `ssh -i "${SSH_KEY}" ${VPS_HOST} "${command}"`;
        
        exec(sshCommand, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout, stderr) => {
            if (error) {
                console.log(`❌ Erro: ${error.message}`);
                console.log(`Stderr: ${stderr}`);
                resolve({ success: false, error: error.message, stderr, stdout });
            } else {
                console.log(`✅ ${description} - Concluído`);
                if (stdout) console.log(`Stdout: ${stdout}`);
                if (stderr) console.log(`Stderr: ${stderr}`);
                resolve({ success: true, stdout, stderr });
            }
        });
    });
}

async function setupSupabaseVPS() {
    console.log('=== CONFIGURAÇÃO SUPABASE VPS ===\n');
    
    try {
        // 1. Verificar se o diretório existe
        await runSSHCommand('ls -la /home/ubuntu/', 'Verificando diretórios');
        
        // 2. Verificar se Supabase CLI está instalado
        await runSSHCommand('which supabase', 'Verificando Supabase CLI');
        
        // 3. Verificar status atual do Supabase
        await runSSHCommand(`cd ${VPS_SUPABASE_DIR} && supabase status`, 'Verificando status do Supabase');
        
        // 4. Tentar iniciar o Supabase
        await runSSHCommand(`cd ${VPS_SUPABASE_DIR} && supabase start`, 'Iniciando Supabase');
        
        // 5. Verificar se está rodando
        await runSSHCommand('docker ps | grep supabase', 'Verificando containers Supabase');
        
        // 6. Verificar se as migrações existem
        await runSSHCommand(`cd ${VPS_SUPABASE_DIR} && ls -la migrations/`, 'Verificando migrações');
        
        // 7. Aplicar migrações
        await runSSHCommand(`cd ${VPS_SUPABASE_DIR} && supabase db reset`, 'Aplicando migrações');
        
        // 8. Verificar status final
        await runSSHCommand(`cd ${VPS_SUPABASE_DIR} && supabase status`, 'Status final do Supabase');
        
        console.log('\n✅ Configuração do Supabase VPS concluída!');
        
    } catch (error) {
        console.error('❌ Erro na configuração:', error);
    }
}

// Executar
setupSupabaseVPS();