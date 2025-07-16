# Script para Aplicar Todas as Correções via MCP Coolify
# ATUALIZADO COM NOVAS VARIAVEIS DE AMBIENTE DO SUPABASE LOCAL
# Aplicação: whosfy (m-bento7/studio:main)
# UUID: w4kocsog4kkok48sgow48kc4

Write-Host "=== APLICANDO TODAS AS CORRECOES VIA MCP COOLIFY ===" -ForegroundColor Green
Write-Host "Iniciando processo de correcao automatica..." -ForegroundColor Cyan
Write-Host "ATUALIZADO: Incluindo variaveis de ambiente do Supabase local" -ForegroundColor Yellow
Write-Host ""

# Status atual identificado
Write-Host "STATUS ATUAL IDENTIFICADO:" -ForegroundColor Yellow
Write-Host "• Aplicacao: running:unhealthy"
Write-Host "• IP Servidor: 129.146.146.242 (CORRETO - VPS Oracle)"
Write-Host "• FQDN: http://whosfy.com (sem HTTPS)"
Write-Host "• Health Check: Desabilitado"
Write-Host "• Variaveis de Ambiente: Nao configuradas"
Write-Host ""

# Correções que podem ser aplicadas via MCP
Write-Host "CORRECOES VIA MCP COOLIFY:" -ForegroundColor Cyan
Write-Host "1. Restart da aplicacao (FEITO)"
Write-Host "2. Deploy da aplicacao (tentativa)"
Write-Host "3. Verificacao de status"
Write-Host ""

# Correções manuais necessárias
Write-Host "CORRECOES MANUAIS NECESSARIAS:" -ForegroundColor Red
Write-Host "1. Adicionar variaveis de ambiente (.env.production)" -ForegroundColor Yellow
Write-Host "2. Habilitar Health Check (/api/health:3000)" -ForegroundColor Yellow
Write-Host "3. Atualizar FQDN (http -> https://whosfy.com)" -ForegroundColor Yellow
Write-Host "4. Habilitar SSL automatico" -ForegroundColor Yellow
Write-Host ""

# Variáveis de ambiente necessárias
Write-Host "VARIAVEIS DE AMBIENTE NECESSARIAS:" -ForegroundColor Magenta

# Supabase Configuration
Write-Host "# Supabase Configuration" -ForegroundColor Cyan
Write-Host "NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321"
Write-Host "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

# Expo/Mobile Configuration
Write-Host "# Expo/Mobile Configuration" -ForegroundColor Cyan
Write-Host "EXPO_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321"
Write-Host "EXPO_PUBLIC_SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"

# Database Configuration
Write-Host "# Database Configuration" -ForegroundColor Cyan
Write-Host "DATABASE_URL=\"postgresql://postgres:26Mn1597+1709@localhost:5432/postgres\""
Write-Host "DIRECT_URL=\"postgresql://postgres:26Mn1597+1709@localhost:5432/postgres\""

# NextAuth Configuration
Write-Host "# NextAuth Configuration" -ForegroundColor Cyan
Write-Host "NEXTAUTH_URL=https://whosfy.com"
Write-Host "NEXTAUTH_SECRET=whosfy-nextauth-secret-production-2024"

# Application Configuration
Write-Host "# Application Configuration" -ForegroundColor Cyan
Write-Host "NODE_ENV=production"
Write-Host "PORT=3000"
Write-Host "CORS_ORIGIN=https://whosfy.com"
Write-Host ""

# Instruções passo a passo
Write-Host "INSTRUCOES PASSO A PASSO:" -ForegroundColor Blue
Write-Host ""
Write-Host "PASSO 1 - ADICIONAR VARIAVEIS DE AMBIENTE:" -ForegroundColor Yellow
Write-Host "• Acesse: http://localhost:8000"
Write-Host "• Va para: Applications -> whosfy -> Environment Variables"
Write-Host "• Adicione cada uma das variaveis listadas acima:"
Write-Host "  - Supabase Configuration (2 variaveis)"
Write-Host "  - Expo/Mobile Configuration (2 variaveis)"
Write-Host "  - Database Configuration (2 variaveis)"
Write-Host "  - NextAuth Configuration (2 variaveis)"
Write-Host "  - Application Configuration (3 variaveis)"
Write-Host "• Clique em 'Save' apos adicionar todas"
Write-Host ""

Write-Host "PASSO 2 - HABILITAR HEALTH CHECK:" -ForegroundColor Yellow
Write-Host "• Na aplicacao, va para aba 'Health Check'"
Write-Host "• Habilite: Enable Health Check"
Write-Host "• Path: /api/health"
Write-Host "• Port: 3000"
Write-Host "• Method: GET"
Write-Host "• Expected Status: 200"
Write-Host "• Clique em 'Save'"
Write-Host ""

Write-Host "PASSO 3 - ATUALIZAR FQDN:" -ForegroundColor Yellow
Write-Host "• Na aplicacao, va para aba 'Configuration'"
Write-Host "• Altere FQDN: http://whosfy.com -> https://whosfy.com"
Write-Host "• Habilite SSL automatico"
Write-Host "• Clique em 'Save'"
Write-Host ""

Write-Host "PASSO 4 - FAZER REDEPLOY:" -ForegroundColor Yellow
Write-Host "• Va para aba 'Deployments'"
Write-Host "• Clique em 'Deploy'"
Write-Host "• Aguarde 5-10 minutos"
Write-Host "• Monitore os logs"
Write-Host ""

# Verificações pós-deploy
Write-Host "VERIFICACOES POS-DEPLOY:" -ForegroundColor Green
Write-Host "1. Status deve mudar para 'running:healthy'"
Write-Host "2. Teste: curl https://whosfy.com/api/health"
Write-Host "3. Acesso: https://whosfy.com deve carregar"
Write-Host "4. SSL deve estar ativo"
Write-Host ""

# Resultado esperado
Write-Host "RESULTADO ESPERADO:" -ForegroundColor Green
Write-Host "• Status: running:healthy"
Write-Host "• IP: 129.146.146.242 (VPS Oracle - correto)"
Write-Host "• FQDN: https://whosfy.com (com SSL)"
Write-Host "• Health Check: Ativo"
Write-Host "• Aplicacao: Totalmente funcional"
Write-Host ""

Write-Host "Todas as correcoes identificadas e prontas para aplicacao!" -ForegroundColor Green
Write-Host "Execute os passos manuais acima para completar o deploy."
Write-Host "Tempo estimado: 30-45 minutos"
Write-Host ""