# Configuração do MCP Coolify

Este documento explica como configurar o MCP (Model Context Protocol) do Coolify para integração com o Cursor IDE.

## Configuração Atual

O MCP do Coolify já está configurado no arquivo `.cursor/mcp.json` com as seguintes configurações:

```json
{
  "coolify": {
    "command": "cmd",
    "args": [
      "/c",
      "npx",
      "-y",
      "@stumason/coolify-mcp"
    ],
    "env": {
      "COOLIFY_ACCESS_TOKEN": "your-coolify-access-token-here",
      "COOLIFY_BASE_URL": "http://localhost:8000"
    }
  }
}
```

## Informações da Instância

**Instância Coolify Atual:**
- **Nome**: Coolify
- **IP Público IPv4**: 129.146.146.242
- **IP Público IPv6**: 2001:db8::1
- **Timezone**: UTC
- **Acesso via túnel SSH**: http://localhost:8000

## Como Obter o Token de Acesso do Coolify

### 1. Acesse o Painel do Coolify
- Primeiro, estabeleça o túnel SSH:
  ```bash
  ssh -i "C:\Users\Micael\Downloads\ssh-key-2025-07-13.key" -L 8000:127.0.0.1:8000 -N ubuntu@129.146.116.166
  ```
- Acesse: http://localhost:8000

### 2. Gere um Token de API
1. Faça login no Coolify
2. Vá para **Security** > **API Tokens**
3. Clique em **Create New Token**
4. Configure:
   - **Name**: MCP Integration
   - **Description**: Token para integração MCP com Cursor IDE
   - **Permissions**: Selecione as permissões necessárias
5. Clique em **Create Token**
6. **Copie o token** (ele só será mostrado uma vez)

### 3. Configure o Token no MCP
1. Abra o arquivo `.cursor/mcp.json`
2. Substitua `"your-coolify-access-token-here"` pelo token real
3. Salve o arquivo
4. Reinicie o Cursor IDE

## Exemplo de Configuração Final

```json
{
  "mcpServers": {
    "coolify": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@stumason/coolify-mcp"
      ],
      "env": {
        "COOLIFY_ACCESS_TOKEN": "0|seu-token-real-aqui",
        "COOLIFY_BASE_URL": "http://localhost:8000"
      }
    }
  }
}
```

## Funcionalidades Disponíveis

Após a configuração, você poderá usar comandos em linguagem natural no Cursor:

### Gerenciamento de Servidores
- "Mostre-me todos os servidores Coolify"
- "Qual é o status do servidor {uuid}?"
- "Valide a conexão com o servidor {uuid}"

### Gerenciamento de Projetos
- "Liste todos os meus projetos Coolify"
- "Crie um novo projeto chamado 'minha-webapp'"
- "Mostre detalhes do projeto {uuid}"

### Gerenciamento de Aplicações
- "Liste todas as aplicações"
- "Crie uma nova aplicação Node.js"
- "Faça deploy da aplicação {uuid}"

### Gerenciamento de Bancos de Dados
- "Liste todos os bancos de dados"
- "Crie um banco PostgreSQL"
- "Configure uma instância Redis"

## Troubleshooting

### Problemas Comuns

1. **Token inválido**
   - Verifique se o token foi copiado corretamente
   - Confirme se o token não expirou
   - Gere um novo token se necessário

2. **Conexão recusada**
   - Verifique se o túnel SSH está ativo
   - Confirme se o Coolify está rodando na porta 8000
   - Teste o acesso manual: http://localhost:8000

3. **MCP não carrega**
   - Reinicie o Cursor IDE
   - Verifique a sintaxe do arquivo mcp.json
   - Consulte os logs do Cursor para erros

### Comandos de Teste

```bash
# Testar conexão com Coolify
curl -H "Authorization: Bearer seu-token" http://localhost:8000/api/v1/servers

# Verificar se o túnel SSH está ativo
netstat -an | findstr :8000
```

## Segurança

⚠️ **Importante**:
- Mantenha o token de acesso seguro
- Não compartilhe o token publicamente
- Use tokens com permissões mínimas necessárias
- Revogue tokens não utilizados
- Considere rotacionar tokens periodicamente

## Referências

- [Documentação do Coolify MCP](https://github.com/StuMason/coolify-mcp)
- [Documentação oficial do Coolify](https://coolify.io/docs)
- [Model Context Protocol](https://modelcontextprotocol.io/)