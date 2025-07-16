# Script para corrigir exposicao de chaves JWT do Supabase
# Este script remove todas as chaves hardcoded e as substitui por variaveis de ambiente

Write-Host "CORRECAO CRITICA DE SEGURANCA - EXPOSICAO DE CHAVES JWT" -ForegroundColor Red
Write-Host "========================================================" -ForegroundColor Red
Write-Host ""
Write-Host "ALERTA: GitGuardian detectou chaves JWT do Supabase expostas!" -ForegroundColor Yellow
Write-Host "Repositorio: mBento7/studio" -ForegroundColor Yellow
Write-Host "Tipo: Funcao de servico Supabase JWT" -ForegroundColor Yellow
Write-Host ""

# Lista de arquivos com chaves expostas que precisam ser corrigidos
$arquivosComChaves = @(
    "apps\web\update-mariasouza-profile.js",
    "apps\web\test-mariasouza-profile.js",
    "apps\web\criar-usuarios.js",
    "apps\web\fix-profile-snapshot.js",
    "apply-migrations.js",
    "test-auth.js",
    "create-tables.js",
    "simple-test.js"
)

Write-Host "Corrigindo arquivos com chaves expostas..." -ForegroundColor Cyan
Write-Host ""

foreach ($arquivo in $arquivosComChaves) {
    $caminhoCompleto = Join-Path $PWD $arquivo
    
    if (Test-Path $caminhoCompleto) {
        Write-Host "Corrigindo: $arquivo" -ForegroundColor Yellow
        
        # Le o conteudo do arquivo
        $conteudo = Get-Content $caminhoCompleto -Raw
        
        # Substitui a chave real por variavel de ambiente
        $conteudo = $conteudo -replace "'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd2h2anNucXNvZ25qb3Jqc2dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAxOTMxMSwiZXhwIjoyMDY1NTk1MzExfQ\.[^']*'", "process.env.SUPABASE_SERVICE_ROLE_KEY"
        
        # Substitui outras variacoes da chave
        $conteudo = $conteudo -replace "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd2h2anNucXNvZ25qb3Jqc2dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAxOTMxMSwiZXhwIjoyMDY1NTk1MzExfQ\.[A-Za-z0-9_-]*", "process.env.SUPABASE_SERVICE_ROLE_KEY"
        
        # Substitui a URL hardcoded tambem
        $conteudo = $conteudo -replace "'https://wkwhvjsnqsognjorjsgf\.supabase\.co'", "process.env.NEXT_PUBLIC_SUPABASE_URL"
        $conteudo = $conteudo -replace "https://wkwhvjsnqsognjorjsgf\.supabase\.co", "process.env.NEXT_PUBLIC_SUPABASE_URL"
        
        # Adiciona comentario de seguranca no topo do arquivo se for JS
        if ($arquivo -like "*.js") {
            $comentarioSeguranca = "// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente`n// Nunca commite chaves reais no codigo fonte!`n`n"
            if (-not $conteudo.StartsWith("// SEGURANCA:")) {
                $conteudo = $comentarioSeguranca + $conteudo
            }
        }
        
        # Salva o arquivo corrigido
        Set-Content -Path $caminhoCompleto -Value $conteudo -Encoding UTF8
        Write-Host "   Corrigido com sucesso" -ForegroundColor Green
    } else {
        Write-Host "   Arquivo nao encontrado: $arquivo" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "Criando arquivo .env.example atualizado..." -ForegroundColor Cyan

# Cria arquivo .env.example com as variaveis necessarias
$envExample = @"
# Configuracoes do Supabase
# IMPORTANTE: Nunca commite as chaves reais!
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Outras configuracoes
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
"@

Set-Content -Path "apps\web\.env.example" -Value $envExample -Encoding UTF8
Write-Host "   .env.example criado" -ForegroundColor Green

Write-Host ""
Write-Host "ACOES CRITICAS NECESSARIAS:" -ForegroundColor Red
Write-Host "===========================" -ForegroundColor Red
Write-Host ""
Write-Host "1. REGENERAR CHAVES IMEDIATAMENTE:" -ForegroundColor Yellow
Write-Host "   - Acesse: https://supabase.com/dashboard/project/wkwhvjsnqsognjorjsgf/settings/api" -ForegroundColor White
Write-Host "   - Regenere a Service Role Key" -ForegroundColor White
Write-Host "   - Regenere a Anon Key (se necessario)" -ForegroundColor White
Write-Host ""
Write-Host "2. CONFIGURAR VARIAVEIS DE AMBIENTE:" -ForegroundColor Yellow
Write-Host "   - Crie arquivo apps/web/.env.local" -ForegroundColor White
Write-Host "   - Adicione as novas chaves regeneradas" -ForegroundColor White
Write-Host "   - Configure no Coolify/servidor de producao" -ForegroundColor White
Write-Host ""
Write-Host "3. REMOVER ARQUIVOS SENSIVEIS DO GIT:" -ForegroundColor Yellow
Write-Host "   - git rm --cached apps/web/update-mariasouza-profile.js" -ForegroundColor White
Write-Host "   - git rm --cached apps/web/test-mariasouza-profile.js" -ForegroundColor White
Write-Host "   - git rm --cached apps/web/criar-usuarios.js" -ForegroundColor White
Write-Host ""
Write-Host "4. ATUALIZAR .gitignore:" -ForegroundColor Yellow
Write-Host "   - Adicionar .env.local" -ForegroundColor White
Write-Host "   - Adicionar *.key" -ForegroundColor White
Write-Host ""
Write-Host "5. VERIFICAR HISTORICO DO GIT:" -ForegroundColor Yellow
Write-Host "   - Considere usar git filter-branch ou BFG Repo-Cleaner" -ForegroundColor White
Write-Host "   - Para remover chaves do historico completo" -ForegroundColor White
Write-Host ""

Write-Host "IMPORTANTE: As chaves expostas ja estao comprometidas!" -ForegroundColor Red
Write-Host "Regenere-as IMEDIATAMENTE antes de continuar." -ForegroundColor Red
Write-Host ""

Write-Host "Script de correcao concluido!" -ForegroundColor Green
Write-Host "Lembre-se: Seguranca e responsabilidade de todos!" -ForegroundColor Cyan
Write-Host ""