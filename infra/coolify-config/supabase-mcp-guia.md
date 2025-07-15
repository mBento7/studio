# Guia do MCP Supabase para Trae

## Configuração Atual

O MCP do Supabase já está configurado no arquivo `.cursor/mcp.json` com as seguintes configurações:

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
    }
  }
}
```

## Como Usar o MCP Supabase no Chat

Após reiniciar o Trae, você pode usar comandos em linguagem natural para interagir com o Supabase:

### Exemplos de Comandos

#### Consultas de Dados
```
"Mostre todos os usuários da tabela profiles"
"Busque os últimos 10 posts criados"
"Liste todas as tabelas do banco de dados"
"Conte quantos usuários temos cadastrados"
```

#### Inserção de Dados
```
"Crie um novo usuário com email teste@exemplo.com"
"Adicione um post para o usuário ID 123"
"Insira dados de teste na tabela activities"
```

#### Atualizações
```
"Atualize o perfil do usuário com ID 456"
"Modifique o status do post para 'publicado'"
"Altere a configuração do layout do perfil"
```

#### Análises e Relatórios
```
"Gere um relatório dos usuários mais ativos"
"Analise as métricas de engajamento dos posts"
"Mostre estatísticas de uso da plataforma"
```

#### Estrutura do Banco
```
"Descreva a estrutura da tabela profiles"
"Mostre as relações entre as tabelas"
"Liste todas as funções (functions) disponíveis"
```

## Funcionalidades Disponíveis

- **Consultas SQL**: Execute queries diretamente no banco
- **Gerenciamento de Tabelas**: Criar, modificar e consultar estruturas
- **Inserção/Atualização**: Manipular dados das tabelas
- **Análises**: Gerar relatórios e estatísticas
- **Funções**: Executar stored procedures e functions
- **Políticas RLS**: Gerenciar Row Level Security

## Configuração do Token

O token atual (`sbp_4448ee512a0156b0f28c9cdad0d9eba8b9006409`) está configurado para acesso ao projeto Supabase. Este token permite:

- Leitura e escrita em todas as tabelas
- Execução de funções
- Acesso às configurações do projeto

## Segurança

⚠️ **Importante**: O token de acesso está visível no arquivo de configuração. Certifique-se de:

1. Não compartilhar este arquivo publicamente
2. Usar tokens com permissões mínimas necessárias
3. Rotacionar tokens periodicamente
4. Monitorar o uso através do painel do Supabase

## Troubleshooting

### Problema: MCP não responde
**Solução**: Reinicie o Trae completamente

### Problema: Erro de autenticação
**Solução**: Verifique se o token está correto no painel do Supabase

### Problema: Comandos não funcionam
**Solução**: Certifique-se de que o npx pode acessar o pacote `@supabase/mcp-server-supabase`

## Próximos Passos

1. Reinicie o Trae para ativar o MCP
2. Teste com comandos simples como "Liste todas as tabelas"
3. Explore as funcionalidades gradualmente
4. Use comandos em português - o MCP entende linguagem natural

## Suporte

Para mais informações sobre o MCP do Supabase:
- [Documentação oficial do Supabase MCP](https://github.com/supabase/mcp-server-supabase)
- [Guia de comandos avançados](https://supabase.com/docs/guides/ai)