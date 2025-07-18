# Script para configurar novas chaves do Supabase após regeneração
# Execute este script APÓS regenerar as chaves no painel do Supabase

Write-Host "CONFIGURACAO DE NOVAS CHAVES SUPABASE" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Green
Write-Host ""
Write-Host "IMPORTANTE: Execute este script APENAS APOS regenerar as chaves no Supabase!" -ForegroundColor Yellow
Write-Host "URL: https://supabase.com/dashboard/project/wkwhvjsnqsognjorjsgf/settings/api" -ForegroundColor Cyan
Write-Host ""

# Solicita as novas chaves do usuário
Write-Host "Por favor, insira as NOVAS chaves regeneradas:" -ForegroundColor White
Write-Host ""

$supabaseUrl = "https://wkwhvjsnqsognjorjsgf.supabase.co"
Write-Host "URL do Supabase: $supabaseUrl" -ForegroundColor Gray
Write-Host ""

$anonKey = Read-Host "Nova ANON KEY (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
if ([string]::IsNullOrWhiteSpace($anonKey)) {
    Write-Host "ERRO: Anon Key é obrigatória!" -ForegroundColor Red
    exit 1
}

$serviceKey = Read-Host "Nova SERVICE ROLE KEY (eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...)"
if ([string]::IsNullOrWhiteSpace($serviceKey)) {
    Write-Host "ERRO: Service Role Key é obrigatória!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Configurando variáveis de ambiente..." -ForegroundColor Cyan

# Cria o conteúdo do arquivo .env.local
$envContent = @"
# Configurações do Supabase - CHAVES REGENERADAS
# Data: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
NEXT_PUBLIC_SUPABASE_URL=$supabaseUrl
NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey
SUPABASE_SERVICE_ROLE_KEY=$serviceKey

# Outras configurações
NEXTAUTH_SECRET=your-nextauth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Configurações de produção (para Coolify)
NEXTAUTH_URL_PRODUCTION=https://seu-dominio.com
"@

# Cria o arquivo .env.local
$envPath = "apps\web\.env.local"
Set-Content -Path $envPath -Value $envContent -Encoding UTF8
Write-Host "   Arquivo .env.local criado em: $envPath" -ForegroundColor Green

# Atualiza o arquivo .env.production se existir
$envProdPath = "apps\web\.env.production"
if (Test-Path $envProdPath) {
    Write-Host "   Atualizando .env.production..." -ForegroundColor Yellow
    $prodContent = Get-Content $envProdPath -Raw
    $prodContent = $prodContent -replace "NEXT_PUBLIC_SUPABASE_ANON_KEY=.*", "NEXT_PUBLIC_SUPABASE_ANON_KEY=$anonKey"
    $prodContent = $prodContent -replace "SUPABASE_SERVICE_ROLE_KEY=.*", "SUPABASE_SERVICE_ROLE_KEY=$serviceKey"
    Set-Content -Path $envProdPath -Value $prodContent -Encoding UTF8
    Write-Host "   .env.production atualizado" -ForegroundColor Green
}

Write-Host ""
Write-Host "TESTANDO CONEXAO COM SUPABASE..." -ForegroundColor Cyan

# Cria um script de teste rápido
$testScript = @"
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  '$supabaseUrl',
  '$anonKey'
);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) {
      console.log('❌ Erro na conexão:', error.message);
      process.exit(1);
    }
    console.log('✅ Conexão com Supabase funcionando!');
    console.log('✅ Chaves configuradas corretamente!');
  } catch (err) {
    console.log('❌ Erro:', err.message);
    process.exit(1);
  }
}

testConnection();
"@

Set-Content -Path "test-supabase-connection.js" -Value $testScript -Encoding UTF8

Write-Host "Executando teste de conexão..." -ForegroundColor Yellow
try {
    $testResult = node "test-supabase-connection.js" 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   $testResult" -ForegroundColor Green
    } else {
        Write-Host "   $testResult" -ForegroundColor Red
        Write-Host "   VERIFIQUE se as chaves estão corretas!" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   Erro ao executar teste. Verifique se o Node.js está instalado." -ForegroundColor Yellow
}

# Remove o arquivo de teste
Remove-Item "test-supabase-connection.js" -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "PROXIMOS PASSOS:" -ForegroundColor Yellow
Write-Host "================" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. TESTAR LOCALMENTE:" -ForegroundColor White
Write-Host "   cd apps/web" -ForegroundColor Gray
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "2. CONFIGURAR NO COOLIFY:" -ForegroundColor White
Write-Host "   - Acesse: http://localhost:8000" -ForegroundColor Gray
Write-Host "   - Vá para Environment Variables" -ForegroundColor Gray
Write-Host "   - Adicione as mesmas chaves" -ForegroundColor Gray
Write-Host ""
Write-Host "3. FAZER DEPLOY:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'feat: configure new Supabase keys'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "CONFIGURACAO CONCLUIDA!" -ForegroundColor Green
Write-Host "O projeto agora deve funcionar normalmente." -ForegroundColor Cyan
Write-Host ""