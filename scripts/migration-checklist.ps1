# Script de Automação do Checklist de Migração
# Autor: AI Assistant
# Data: Criado em resposta à solicitação do usuário

$projectRoot = "$PSScriptRoot\.."
Set-Location $projectRoot

Write-Host "🔍 Iniciando automação do Checklist de Migração..." -ForegroundColor Cyan

# Função para mostrar o status de uma tarefa
function Show-TaskStatus {
    param (
        [string]$task,
        [string]$status,
        [string]$color = "White"
    )
    Write-Host "  - $task: " -NoNewline
    Write-Host "$status" -ForegroundColor $color
}

# 1. Separar arquivos grandes em componentes menores
Write-Host "\n📂 Verificando arquivos grandes que podem ser componentizados..." -ForegroundColor Yellow
$largeFiles = Get-ChildItem -Path "$projectRoot\src", "$projectRoot\apps\web\src" -Recurse -Include "*.tsx","*.jsx" | 
             Where-Object { $_.Length -gt 10KB } | 
             Select-Object FullName, @{Name="SizeKB"; Expression={[math]::Round($_.Length/1KB, 2)}}

if ($largeFiles.Count -gt 0) {
    Write-Host "  Encontrados $($largeFiles.Count) arquivos grandes que podem precisar de componentização:" -ForegroundColor Yellow
    foreach ($file in $largeFiles) {
        Write-Host "  - $($file.FullName) ($($file.SizeKB) KB)" -ForegroundColor Gray
    }
} else {
    Write-Host "  Nenhum arquivo grande encontrado que precise de componentização." -ForegroundColor Green
}

# 2. Limpar código comentado e funções antigas
Write-Host "\n🧹 Procurando código comentado e funções potencialmente não utilizadas..." -ForegroundColor Yellow
$commentedCodePatterns = @(
    "// TODO:", 
    "// FIXME:", 
    "// @deprecated", 
    "// Código antigo", 
    "// Versão antiga",
    "/* Código antigo"
)

$filesWithComments = @()
foreach ($pattern in $commentedCodePatterns) {
    $found = Get-ChildItem -Path "$projectRoot\src", "$projectRoot\apps\web\src" -Recurse -Include "*.ts","*.tsx","*.js","*.jsx" | 
             Select-String -Pattern $pattern -SimpleMatch
    $filesWithComments += $found
}

if ($filesWithComments.Count -gt 0) {
    Write-Host "  Encontrados $($filesWithComments.Count) arquivos com código comentado ou marcações:" -ForegroundColor Yellow
    $filesWithComments | ForEach-Object { Write-Host "  - $($_.Path):$($_.LineNumber)" -ForegroundColor Gray }
} else {
    Write-Host "  Nenhum código comentado ou marcação encontrada." -ForegroundColor Green
}

# 3. Validar e Testar - Verificar se o projeto pode ser executado
Write-Host "\n🚀 Verificando se o projeto pode ser executado..." -ForegroundColor Yellow
if (Test-Path "$projectRoot\apps\web\package.json") {
    Show-TaskStatus "Projeto web encontrado" "✓ OK" "Green"
    Write-Host "  Para executar o projeto, use: pnpm dev --filter web" -ForegroundColor Cyan
} else {
    Show-TaskStatus "Projeto web não encontrado" "❌ ERRO" "Red"
}

# 4. Documentação - Verificar READMEs
Write-Host "\n📝 Verificando documentação..." -ForegroundColor Yellow
$readmes = Get-ChildItem -Path $projectRoot -Recurse -Filter "README.md"
$readmeDirs = $readmes | ForEach-Object { $_.DirectoryName }

# Encontrar pastas principais sem README
$mainDirs = @(
    "$projectRoot\src",
    "$projectRoot\apps",
    "$projectRoot\apps\web",
    "$projectRoot\apps\web\src",
    "$projectRoot\supabase",
    "$projectRoot\scripts",
    "$projectRoot\docs"
)

$missingReadmes = @()
foreach ($dir in $mainDirs) {
    if (Test-Path $dir) {
        $hasReadme = Test-Path "$dir\README.md"
        if (-not $hasReadme) {
            $missingReadmes += $dir
        }
    }
}

if ($missingReadmes.Count -gt 0) {
    Write-Host "  Pastas principais sem README.md:" -ForegroundColor Yellow
    foreach ($dir in $missingReadmes) {
        Write-Host "  - $dir" -ForegroundColor Gray
    }
} else {
    Write-Host "  Todas as pastas principais possuem README.md." -ForegroundColor Green
}

# 5. Verificar ESLint e TypeScript
Write-Host "\n🛠️ Verificando configuração de ESLint e TypeScript..." -ForegroundColor Yellow
$hasESLint = Test-Path "$projectRoot\apps\web\.eslintrc.js" -or Test-Path "$projectRoot\apps\web\.eslintrc.json"
$hasTSConfig = Test-Path "$projectRoot\apps\web\tsconfig.json"

Show-TaskStatus "ESLint configurado" ($hasESLint ? "✓ OK" : "❌ Não encontrado") ($hasESLint ? "Green" : "Red")
Show-TaskStatus "TypeScript configurado" ($hasTSConfig ? "✓ OK" : "❌ Não encontrado") ($hasTSConfig ? "Green" : "Red")

# 6. Verificar scripts para checar imports quebrados
Write-Host "\n🔗 Verificando scripts para checar imports quebrados..." -ForegroundColor Yellow
$hasImportCheckScript = $false

if (Test-Path "$projectRoot\package.json") {
    $packageJson = Get-Content "$projectRoot\package.json" | ConvertFrom-Json
    $scripts = $packageJson.scripts
    
    if ($scripts -and ($scripts.PSObject.Properties.Name -match "check|lint|validate")) {
        $hasImportCheckScript = $true
        Write-Host "  Scripts encontrados que podem verificar imports:" -ForegroundColor Green
        $scripts.PSObject.Properties | Where-Object { $_.Name -match "check|lint|validate" } | ForEach-Object {
            Write-Host "  - $($_.Name): $($_.Value)" -ForegroundColor Gray
        }
    }
}

if (-not $hasImportCheckScript) {
    Write-Host "  Nenhum script encontrado para verificar imports quebrados." -ForegroundColor Yellow
    Write-Host "  Sugestão: Adicione um script no package.json para verificar imports." -ForegroundColor Cyan
}

# Resumo final
Write-Host "\n✅ Resumo do Checklist de Migração:" -ForegroundColor Green
Write-Host "  1. Separar arquivos grandes: " -NoNewline
if ($largeFiles.Count -eq 0) {
    Write-Host "Concluído" -ForegroundColor Green
} else {
    Write-Host "$($largeFiles.Count) arquivos para revisar" -ForegroundColor Yellow
}

Write-Host "  2. Limpar código comentado: " -NoNewline
if ($filesWithComments.Count -eq 0) {
    Write-Host "Concluído" -ForegroundColor Green
} else {
    Write-Host "$($filesWithComments.Count) arquivos para revisar" -ForegroundColor Yellow
}

Write-Host "  3. Validar e testar: " -NoNewline
Write-Host "Pendente - Execute manualmente" -ForegroundColor Yellow

Write-Host "  4. Atualizar documentação: " -NoNewline
if ($missingReadmes.Count -eq 0) {
    Write-Host "Concluído" -ForegroundColor Green
} else {
    Write-Host "$($missingReadmes.Count) READMEs para criar" -ForegroundColor Yellow
}

Write-Host "  5. Configurar linters: " -NoNewline
if ($hasESLint -and $hasTSConfig) {
    Write-Host "Concluído" -ForegroundColor Green
} else {
    Write-Host "Pendente" -ForegroundColor Yellow
}

Write-Host "  6. Scripts para imports: " -NoNewline
if ($hasImportCheckScript) {
    Write-Host "Concluído" -ForegroundColor Green
} else {
    Write-Host "Pendente" -ForegroundColor Yellow
}

Write-Host "\n📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "  1. Execute 'pnpm dev --filter web' para validar o projeto localmente" -ForegroundColor White
Write-Host "  2. Atualize o NEXT_STEPS.md com as mudanças realizadas" -ForegroundColor White
Write-Host "  3. Crie os READMEs faltantes nas pastas principais" -ForegroundColor White
Write-Host "  4. Revise e refatore os arquivos grandes identificados" -ForegroundColor White