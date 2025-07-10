# Scripts de Banco de Dados

Este diretório contém scripts utilitários para automação do versionamento e aplicação de migrations no banco de dados do projeto.

## apply-migrations.js

Script para aplicar todas as migrations de `db/schemas/` e `db/policies/` em ordem cronológica.

### Como usar

1. **Configure a string de conexão do banco:**
   - Defina a variável de ambiente `DB_URL` com a string de conexão do seu banco Postgres.
   - Exemplo:
     ```bash
     export DB_URL="postgres://usuario:senha@host:porta/db"
     ```
   - Ou edite diretamente no script.

2. **Escolha o modo de aplicação:**
   - Por padrão, o script usa o `psql` (cliente Postgres).
   - Para usar o Supabase CLI, altere a variável `SUPABASE_CLI` para `true` no script.

3. **Execute o script:**
   ```bash
   node scripts/apply-migrations.js
   ```

### O que o script faz
- Aplica todos os arquivos `.sql` de `db/schemas/` e depois de `db/policies/`, em ordem alfabética (que deve ser cronológica pelo padrão de nome).
- Exibe no terminal o progresso de cada migration aplicada.

### Boas práticas
- Sempre crie migrations versionadas para toda alteração estrutural ou de políticas.
- Teste as migrations em ambiente local antes de aplicar em produção.
- Nunca edite migrations já aplicadas; crie uma migration reversa se necessário.

### Exemplo de fluxo
1. Crie uma migration: `db/schemas/20240610_add_coluna.sql`
2. Teste localmente: `node scripts/apply-migrations.js`
3. Se tudo estiver ok, aplique em produção usando a mesma abordagem.

---

> Em caso de dúvidas, consulte o README de `db/schemas/` e `db/policies/` para mais detalhes sobre versionamento e boas práticas. 

## Scripts de Automação de Painéis
- Scripts para abrir painéis de controle (Coolify, Supabase, etc.) estão disponíveis nesta pasta. Veja exemplos: `abrir-coolify.sh`, `abrir-supabase.sh`, etc.

## Edge Functions
- Para lógica customizada, consulte as Edge Functions em `../supabase/functions/`.

## Versionamento
- Siga as práticas de versionamento descritas em `../db/schemas/README.md` e `../db/policies/README.md`. 