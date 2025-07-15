# Guia de Onboarding para Desenvolvedores

> **Última revisão:** 10/07/2025  
> **Responsável:** Micael Bento

## Objetivo
Facilitar o início rápido de novos desenvolvedores no projeto Whosfy, padronizando setup, boas práticas e links úteis.

## Passos Iniciais
1. Instale o pnpm globalmente:
   ```bash
   npm install -g pnpm
   ```
2. Instale as dependências na raiz do projeto:
   ```bash
   pnpm install
   ```
3. Copie o arquivo `.env.example` para `.env.local` e preencha as variáveis necessárias:
   ```bash
   # Configurações do Supabase (Projeto Whosfy)
   NEXT_PUBLIC_SUPABASE_URL=https://wkwhvjsnqsognjorjsgf.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[solicite ao responsável]
   SUPABASE_SERVICE_ROLE_KEY=[solicite ao responsável]
   
   # Para desenvolvimento local com Supabase CLI
   SUPABASE_DB_URL=postgresql://postgres:[password]@localhost:54322/postgres
   ```
4. Inicie o app principal:
   ```bash
   pnpm --filter whosfy-web dev
   ```
5. Consulte o Storybook (se disponível):
   ```bash
   pnpm --filter whosfy-web storybook
   ```

## Padrões de Branch e PR
- Use nomes claros e descritivos para branches (ex: `feature/novo-componente`, `fix/bug-login`).
- Sempre crie PRs para revisão, mesmo em times pequenos.
- Descreva claramente o que foi feito no PR e relacione a issues/tarefas.
- Siga o checklist de testes antes de pedir revisão.

## Boas Práticas
- Documente toda alteração relevante na área correspondente dos docs.
- Atualize o `NEXT_STEPS.md` e checklists quando concluir etapas.
- Consulte sempre os READMEs das subpastas e o índice geral em `docs/README.md`.
- Em caso de dúvida, pergunte ao responsável ou abra uma issue.

## Configuração do Supabase

### Projeto Ativo
- **Nome:** Whosfy (wkwhvjsnqsognjorjsgf)
- **Status:** ✅ Ativo e operacional
- **Região:** us-east-1
- **Banco:** PostgreSQL 17.2.0
- **URL:** https://wkwhvjsnqsognjorjsgf.supabase.co

### Setup Local (Opcional)
```bash
# Instalar Supabase CLI
npm install -g supabase

# Inicializar projeto local
supabase start

# Aplicar migrations
supabase db reset

# Verificar status
supabase status
```

### Recursos Disponíveis
- ✅ **Database:** 5 perfis ativos, 7 migrations aplicadas
- ✅ **Auth:** Email/senha configurado
- ✅ **Storage:** Buckets para imagens e documentos
- ✅ **Edge Functions:** 4 funções deployadas
- ✅ **Realtime:** Ativo para mensagens

### Monitoramento via MCP
O projeto utiliza MCP Supabase para monitoramento:
```
# Exemplos de comandos via MCP
"Verifique o status do projeto Whosfy"
"Liste todas as tabelas do banco"
"Obtenha logs da API dos últimos minutos"
"Verifique avisos de segurança"
```

## Links Úteis
- [README principal](../../README.md)
- [Guia de Infraestrutura](../infraestrutura/README.md)
- [Guia MCP Supabase](../infraestrutura/supabase-mcp-guia.md)
- [Planejamento e Blueprints](../planejamento/README.md)
- [Guia Visual e UX](../guia-visual/guia-visual-unificado.md)
- [Checklist de Segurança](../infraestrutura/README.md)
- [Dashboard Supabase](https://supabase.com/dashboard/project/wkwhvjsnqsognjorjsgf)

> Mantenha este guia atualizado conforme o time evoluir!