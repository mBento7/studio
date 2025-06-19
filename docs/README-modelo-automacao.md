# Script para criar nova subpasta de documentação com README padrão

Salve este conteúdo como `criar-doc.sh` na raiz do projeto e execute via terminal:

```bash
#!/bin/bash
# Uso: ./criar-doc.sh nome-da-nova-pasta "Título da Documentação"

if [ -z "$1" ]; then
  echo "Uso: $0 nome-da-nova-pasta 'Título da Documentação'"
  exit 1
fi

PASTA="docs/$1"
TITULO=${2:-"Documentação da Nova Área"}

mkdir -p "$PASTA"
cp docs/README-modelo.md "$PASTA/README.md"
sed -i "1s/.*/# $TITULO/" "$PASTA/README.md"

echo "Pasta '$PASTA' criada com README.md padrão."
```

> **Dica:** Edite o título do README conforme necessário após a criação. 