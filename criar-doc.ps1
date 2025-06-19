# Uso: .\criar-doc.ps1 nome-da-nova-pasta "Título da Documentação"
param(
    [string]$nome,
    [string]$titulo = "Documentação da Nova Área"
)

$PASTA = "docs\$nome"
New-Item -ItemType Directory -Force -Path $PASTA | Out-Null
Copy-Item "docs\README-modelo.md" "$PASTA\README.md" -Force
(Get-Content "$PASTA\README.md") -replace '^# .+', "# $titulo" | Set-Content "$PASTA\README.md"
Write-Host "Pasta '$PASTA' criada com README.md padrão." 