# README - db/schemas

Esta pasta armazena as migrations versionadas do banco de dados do projeto.

## Como usar
- Sempre que criar ou alterar tabelas, crie um novo arquivo de migration numerado e datado, seguindo o padrão: `YYYYMMDD_descricao.sql`.
- Aplique as migrations na ordem correta para garantir a integridade do banco.
- Utilize ferramentas como Supabase CLI para facilitar o versionamento e aplicação.
- Não edite migrations já aplicadas em produção; crie uma nova migration para cada alteração.

## Fluxo recomendado
1. Crie uma nova migration para cada alteração estrutural.
2. Documente a alteração no início do arquivo e neste README.
3. Aplique as migrations em ambiente de teste antes de produção.
4. Marque no README quando uma migration for aplicada em produção.

## Boas práticas
- Documente cada migration com um comentário no início do arquivo.
- Mantenha o histórico completo para facilitar rollback e auditoria.
- Remova gradualmente dependências do seed.sql, usando apenas migrations para evoluir o banco.

# Schemas (Migrations)

Coloque aqui os arquivos de migration versionados do banco de dados (ex: 001_create_profiles.sql, 002_add_services.sql, etc).

Use ferramentas como Supabase CLI, dbmate ou sqitch para versionar e aplicar as migrations. 

## Edge Functions
- Funções serverless para lógica customizada estão em `../../supabase/functions/`. Veja o README da pasta para detalhes.

## Políticas de Segurança (RLS)
- Versionamento e templates em `../policies/`. Consulte o README para exemplos práticos.

## Scripts de Automação
- Scripts para deploy, migrations e abertura de painéis estão em `../../scripts/`. Veja o README correspondente para instruções. 

# Funções do Banco

- **delete_expired_conversations**: Função responsável por remover conversas e mensagens expiradas do banco. Agora implementada com `search_path` explícito para maior segurança, evitando ambiguidades de schema.
- Recomenda-se sempre definir `search_path` explicitamente em funções PL/pgSQL para evitar riscos de segurança em ambientes multi-schema. 