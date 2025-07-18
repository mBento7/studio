# Caminho do Supabase CLI
$supabase = "C:\Program Files\Supabase\supabase.exe"

# Caminho do seed.sql
$seed = ".\supabase\seed.sql"

# 1. Aplica todas as migrações (reset)
Write-Host "Resetando banco e aplicando migrações..."
& $supabase db reset --no-backup

# 2. Roda o seed.sql usando psql
Write-Host "Rodando seed.sql..."

# Parâmetros padrão do Supabase local
$host = "localhost"
$port = "54322"
$user = "postgres"
$db = "postgres"
$pass = "postgres"

# Comando para rodar o seed.sql
$env:PGPASSWORD = $pass
psql -h $host -p $port -U $user -d $db -f $seed

Write-Host "Processo finalizado!"