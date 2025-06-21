# README - db/policies

Esta pasta armazena as políticas de segurança (RLS) versionadas do banco de dados do projeto.

## Como usar
- Sempre que criar ou alterar políticas, crie um novo arquivo numerado e datado, seguindo o padrão: `YYYYMMDD_descricao.sql`.
- Aplique as políticas na ordem correta após as migrations de schema.
- Utilize ferramentas como Supabase CLI para facilitar o versionamento e aplicação.
- Não edite políticas já aplicadas em produção; crie uma nova versão para cada alteração.

## Fluxo recomendado
1. Crie uma nova migration para cada alteração de política.
2. Documente a alteração no início do arquivo e neste README.
3. Aplique as migrations em ambiente de teste antes de produção.
4. Marque no README quando uma migration for aplicada em produção.

## Boas práticas
- Documente cada política com um comentário no início do arquivo.
- Mantenha o histórico completo para facilitar rollback e auditoria.
- Remova gradualmente dependências do seed.sql, usando apenas migrations para evoluir as políticas.

# Policies (RLS)

Coloque aqui os arquivos de políticas de Row Level Security (RLS) do banco de dados, um por tabela/domínio.

Exemplo: profiles_rls.sql, services_rls.sql, etc. 