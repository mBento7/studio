# Como Gerar o Token de Acesso do Coolify

Este guia mostra passo-a-passo como gerar o token de acesso necessário para configurar o MCP do Coolify.

## Pré-requisitos

1. **Túnel SSH ativo** para acessar o Coolify
2. **Acesso administrativo** ao painel do Coolify

## Passo 1: Estabelecer Conexão com o Coolify

### Opção A: Usando PowerShell (Windows)
```powershell
# Execute o script de túnel SSH
.\tunnel-coolify.ps1
```

### Opção B: Comando SSH Manual
```bash
ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 8000:127.0.0.1:8000 -N ubuntu@129.146.116.166
```

### Opção C: Script Bash (se disponível)
```bash
./connect-coolify-auto.sh
```

## Passo 2: Acessar o Painel do Coolify

1. **Abra seu navegador**
2. **Acesse**: http://localhost:8000
3. **Faça login** com suas credenciais de administrador

## Passo 3: Navegar para Configurações de API

1. No menu lateral esquerdo, clique em **"Settings"** (ícone de engrenagem)
2. Na página de Settings, clique na aba **"Advanced"**
3. Role para baixo até encontrar a seção **"API Settings"**
4. Primeiro, **habilite o "API Access"** marcando a checkbox
5. Configure os **"Allowed IPs for API Access"** se necessário (deixe vazio para permitir todos os IPs)

## Passo 4: Configurar API Access

### 4.1: Habilitar API Access
1. Na seção **"API Settings"**, marque a checkbox **"API Access"**
2. No campo **"Allowed IPs for API Access"**, você pode:
   - Deixar vazio para permitir qualquer IP
   - Ou adicionar IPs específicos (ex: `127.0.0.1,::1` para localhost apenas)

### 4.2: Navegar para Keys & Tokens
1. No menu lateral esquerdo, clique em **"Keys & Tokens"**
2. Procure pela seção de **"API Tokens"** ou **"Personal Access Tokens"**
3. **Clique no botão** "Create New Token" ou "Add Token"

### 4.3: Criar o Token
1. **Preencha os campos**:
   - **Name**: `MCP Integration`
   - **Description**: `Token para integração MCP com Cursor IDE`
   - **Permissions**: Selecione as permissões necessárias:
     - ✅ Read servers
     - ✅ Read projects
     - ✅ Read applications
     - ✅ Read services
     - ✅ Read databases
     - ✅ Read deployments
     - ✅ Write (opcional, para criar/modificar recursos)

2. **Clique em** "Create Token" ou "Generate"

## Passo 5: Copiar o Token

⚠️ **IMPORTANTE**: O token será mostrado apenas UMA VEZ!

1. **Copie o token completo** (geralmente começa com algo como `0|` seguido de uma string longa)
2. **Salve em local seguro** temporariamente

Exemplo de formato do token:
```
0|1234567890abcdef1234567890abcdef12345678
```

## Passo 6: Configurar o Token no MCP

1. **Abra o arquivo** `.cursor/mcp.json` no seu projeto
2. **Localize a linha**:
   ```json
   "COOLIFY_ACCESS_TOKEN": "your-coolify-access-token-here",
   ```
3. **Substitua** `your-coolify-access-token-here` pelo token real:
   ```json
   "COOLIFY_ACCESS_TOKEN": "0|1234567890abcdef1234567890abcdef12345678",
   ```
4. **Salve o arquivo**

## Passo 7: Reiniciar o Cursor IDE

1. **Feche completamente** o Cursor IDE
2. **Abra novamente** o Cursor
3. **Aguarde** o MCP carregar (pode levar alguns segundos)

## Passo 8: Testar a Integração

Após reiniciar o Cursor, teste a integração com comandos como:

- "Mostre-me todos os servidores Coolify"
- "Liste meus projetos no Coolify"
- "Qual é o status dos meus deployments?"

## Troubleshooting

### Problema: Token inválido
**Solução**:
1. Verifique se copiou o token completo
2. Confirme se não há espaços extras
3. Gere um novo token se necessário

### Problema: Conexão recusada
**Solução**:
1. Verifique se o túnel SSH está ativo
2. Teste o acesso manual: http://localhost:8000
3. Reinicie o túnel SSH se necessário

### Problema: MCP não carrega
**Solução**:
1. Verifique a sintaxe do arquivo mcp.json
2. Reinicie o Cursor IDE
3. Consulte os logs do Cursor para erros

### Problema: Permissões insuficientes
**Solução**:
1. Volte ao Coolify
2. Edite o token existente
3. Adicione mais permissões conforme necessário

## Comandos de Teste Manual

Para testar se o token está funcionando, você pode usar curl:

```bash
# Testar listagem de servidores
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" http://localhost:8000/api/v1/servers

# Testar listagem de projetos
curl -H "Authorization: Bearer SEU_TOKEN_AQUI" http://localhost:8000/api/v1/projects
```

## Segurança

⚠️ **Práticas de Segurança**:
- **Nunca compartilhe** o token publicamente
- **Use permissões mínimas** necessárias
- **Revogue tokens** não utilizados
- **Rotacione tokens** periodicamente
- **Mantenha backup seguro** das configurações

## Arquivo Final Esperado

Seu arquivo `.cursor/mcp.json` deve ficar assim:

```json
{
  "mcpServers": {
    "supabase": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@supabase/mcp-server-supabase@dev",
        "--access-token",
        "sbp_4448ee512a0156b0f28c9cdad0d9eba8b9006409"
      ]
    },
    "coolify": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@stumason/coolify-mcp"
      ],
      "env": {
        "COOLIFY_ACCESS_TOKEN": "0|SEU_TOKEN_REAL_AQUI",
        "COOLIFY_BASE_URL": "http://localhost:8000"
      }
    }
  }
}
```

## Próximos Passos

Após configurar o token:

1. ✅ **Token configurado** no mcp.json
2. ✅ **Cursor reiniciado**
3. ✅ **Integração testada**
4. 🎯 **Pronto para usar comandos em linguagem natural!**

---

**Dica**: Mantenha este guia salvo para referência futura ou para configurar em outras máquinas.