# ========================================
# SCRIPT FINAL: CORRECOES WHOSFY COOLIFY
# ========================================
# Aplicacao: m-bento7/studio:main
# Status Atual: running:unhealthy
# Objetivo: running:healthy

Write-Host '=== APLICANDO CORRECOES FINAIS WHOSFY ===' -ForegroundColor Green
Write-Host 'Status atual: running:unhealthy' -ForegroundColor Red
Write-Host 'Objetivo: running:healthy' -ForegroundColor Green
Write-Host ''

Write-Host '=== SITUACAO CONFIRMADA ===' -ForegroundColor White
Write-Host '✓ IP do servidor: CORRETO (129.146.146.242 - VPS Oracle)' -ForegroundColor Green
Write-Host '✓ Aplicacao rodando: SIM' -ForegroundColor Green
Write-Host '✗ Status: running:unhealthy' -ForegroundColor Red
Write-Host '✗ Health check: DESABILITADO' -ForegroundColor Red
Write-Host '✗ FQDN: HTTP (deveria ser HTTPS)' -ForegroundColor Red
Write-Host '✗ Variaveis de ambiente: INCOMPLETAS' -ForegroundColor Red
Write-Host ''

Write-Host '=== CORRECOES NECESSARIAS (MANUAL) ===' -ForegroundColor White
Write-Host ''
Write-Host '1. ADICIONAR VARIAVEIS DE AMBIENTE:' -ForegroundColor Yellow
Write-Host '   Acesse: http://localhost:8000 -> Applications -> whosfy -> Environment Variables' -ForegroundColor Cyan
Write-Host ''
Write-Host '   VARIAVEIS CRITICAS:' -ForegroundColor Red
Write-Host '   DATABASE_URL="postgresql://postgres:26Mn1597+1709@localhost:5432/postgres"' -ForegroundColor White
Write-Host '   NEXTAUTH_SECRET=whosfy-nextauth-secret-production-2024' -ForegroundColor White
Write-Host '   NEXTAUTH_URL=https://whosfy.com' -ForegroundColor White
Write-Host ''
Write-Host '   SUPABASE CONFIG:' -ForegroundColor Yellow
Write-Host '   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321' -ForegroundColor White
Write-Host '   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' -ForegroundColor White
Write-Host ''
Write-Host '   OUTRAS VARIAVEIS:' -ForegroundColor Yellow
Write-Host '   NODE_ENV=production' -ForegroundColor White
Write-Host '   PORT=3000' -ForegroundColor White
Write-Host '   CORS_ORIGIN=https://whosfy.com' -ForegroundColor White
Write-Host ''

Write-Host '2. HABILITAR HEALTH CHECK:' -ForegroundColor Yellow
Write-Host '   Va para: Configuration -> Health Check' -ForegroundColor Cyan
Write-Host '   ✓ Enable Health Check: SIM' -ForegroundColor Green
Write-Host '   Path: /api/health' -ForegroundColor White
Write-Host '   Port: 3000' -ForegroundColor White
Write-Host '   Method: GET' -ForegroundColor White
Write-Host '   Expected Status Code: 200' -ForegroundColor White
Write-Host ''

Write-Host '3. ATUALIZAR FQDN PARA HTTPS:' -ForegroundColor Yellow
Write-Host '   Va para: Configuration -> Domains' -ForegroundColor Cyan
Write-Host '   Alterar de: http://whosfy.com' -ForegroundColor Red
Write-Host '   Para: https://whosfy.com' -ForegroundColor Green
Write-Host '   ✓ Enable Automatic HTTPS: SIM' -ForegroundColor Green
Write-Host ''

Write-Host '4. FAZER REDEPLOY:' -ForegroundColor Yellow
Write-Host '   Clique em: Deploy' -ForegroundColor Cyan
Write-Host '   Aguarde: 5-10 minutos' -ForegroundColor White
Write-Host '   Verifique: Status deve mudar para running:healthy' -ForegroundColor Green
Write-Host ''

Write-Host '=== VERIFICACAO FINAL ===' -ForegroundColor White
Write-Host 'Apos aplicar todas as correcoes:' -ForegroundColor Yellow
Write-Host '1. Status da aplicacao: running:healthy' -ForegroundColor Green
Write-Host '2. Teste health check: curl https://whosfy.com/api/health' -ForegroundColor Cyan
Write-Host '3. Acesso ao site: https://whosfy.com' -ForegroundColor Cyan
Write-Host '4. SSL funcionando: Certificado valido' -ForegroundColor Green
Write-Host ''

Write-Host '=== ARQUIVOS CRIADOS ===' -ForegroundColor White
Write-Host '✓ .env.production - Variaveis de ambiente' -ForegroundColor Green
Write-Host '✓ COOLIFY-ENV-VARIAVEIS-ATUALIZADAS.md - Guia detalhado' -ForegroundColor Green
Write-Host '✓ ANALISE-IP-CORRIGIDA.ps1 - Analise atualizada' -ForegroundColor Green
Write-Host ''

Write-Host 'TEMPO ESTIMADO TOTAL: 20-30 minutos' -ForegroundColor Cyan
Write-Host 'PRIORIDADE: URGENTE' -ForegroundColor Red
Write-Host ''
Write-Host 'SCRIPT CONCLUIDO! Execute as correcoes manuais acima.' -ForegroundColor Green