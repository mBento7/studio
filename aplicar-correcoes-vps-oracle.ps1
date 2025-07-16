# ========================================
# SCRIPT: APLICAR CORRECOES NA VPS ORACLE
# ========================================
# IP VPS Oracle: 129.146.146.242
# Objetivo: Aplicar correções diretamente na VPS

Write-Host "=== APLICANDO CORRECOES NA VPS ORACLE ===" -ForegroundColor Green
Write-Host "IP do servidor: 129.146.146.242" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== COMANDOS SSH PARA CONEXAO ===" -ForegroundColor Yellow
Write-Host "1. Conexão SSH básica:" -ForegroundColor White
Write-Host "   ssh -i \"C:\Users\Micael\.ssh\oracle_new\" ubuntu@129.146.146.242" -ForegroundColor Cyan
Write-Host ""

Write-Host "2. Túnel para Coolify (porta 8000):" -ForegroundColor White
Write-Host "   ssh -i \"C:\Users\Micael\.ssh\oracle_new\" -L 8000:localhost:8000 ubuntu@129.146.146.242" -ForegroundColor Cyan
Write-Host ""

Write-Host "3. Túnel para Supabase (portas 54321 e 54323):" -ForegroundColor White
Write-Host "   ssh -i \"C:\Users\Micael\.ssh\oracle_new\" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242" -ForegroundColor Cyan
Write-Host ""

Write-Host "=== PASSOS PARA APLICAR CORRECOES ===" -ForegroundColor Blue
Write-Host ""

Write-Host "PASSO 1: ESTABELECER CONEXAO COM A VPS" -ForegroundColor Yellow
Write-Host "• Abra um terminal PowerShell" -ForegroundColor White
Write-Host "• Execute o comando de túnel para Coolify:" -ForegroundColor White
Write-Host "  ssh -i \"C:\Users\Micael\.ssh\oracle_new\" -L 8000:localhost:8000 ubuntu@129.146.146.242" -ForegroundColor Cyan
Write-Host "• Mantenha esta janela aberta" -ForegroundColor White
Write-Host ""

Write-Host "PASSO 2: ESTABELECER CONEXAO COM SUPABASE" -ForegroundColor Yellow
Write-Host "• Abra outro terminal PowerShell" -ForegroundColor White
Write-Host "• Execute o comando de túnel para Supabase:" -ForegroundColor White
Write-Host "  ssh -i \"C:\Users\Micael\.ssh\oracle_new\" -L 54321:127.0.0.1:54321 -L 54323:127.0.0.1:54323 -N ubuntu@129.146.146.242" -ForegroundColor Cyan
Write-Host "• Mantenha esta janela aberta" -ForegroundColor White
Write-Host ""

Write-Host "PASSO 3: ACESSAR COOLIFY E APLICAR CORRECOES" -ForegroundColor Yellow
Write-Host "• Abra seu navegador e acesse: http://localhost:8000" -ForegroundColor White
Write-Host "• Faça login no Coolify" -ForegroundColor White
Write-Host "• Siga as instruções do script 'APLICAR-CORRECOES-FINAIS-WHOSFY.ps1':" -ForegroundColor White
Write-Host "  1. Adicionar variáveis de ambiente" -ForegroundColor Cyan
Write-Host "  2. Habilitar health check" -ForegroundColor Cyan
Write-Host "  3. Atualizar FQDN para HTTPS" -ForegroundColor Cyan
Write-Host "  4. Fazer redeploy" -ForegroundColor Cyan
Write-Host ""

Write-Host "PASSO 4: VERIFICAR APLICACAO" -ForegroundColor Yellow
Write-Host "• Após o redeploy, verifique se o status mudou para 'running:healthy'" -ForegroundColor White
Write-Host "• Teste o acesso ao site: https://whosfy.com" -ForegroundColor White
Write-Host "• Verifique o health check: curl https://whosfy.com/api/health" -ForegroundColor White
Write-Host ""

Write-Host "=== NOTAS IMPORTANTES ===" -ForegroundColor Magenta
Write-Host "• As alterações serão aplicadas diretamente na VPS Oracle" -ForegroundColor White
Write-Host "• O IP correto da VPS é 129.146.146.242" -ForegroundColor White
Write-Host "• O Supabase está rodando localmente na VPS nas portas 54321/54323" -ForegroundColor White
Write-Host "• O banco de dados PostgreSQL está na porta 5432" -ForegroundColor White
Write-Host "• Senha do PostgreSQL: 26Mn1597+1709" -ForegroundColor White
Write-Host ""

Write-Host "SCRIPT CONCLUIDO! Siga os passos acima para aplicar as correções na VPS." -ForegroundColor Green