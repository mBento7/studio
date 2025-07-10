# README - supabase

Esta pasta contém arquivos de configuração e seed para o Supabase.

## Como usar
- O arquivo `seed.sql` pode ser usado para popular o banco de dados com dados iniciais.
- Sempre que alterar o seed, documente as mudanças neste README.
- Considere migrar o conteúdo do seed para migrations versionadas em `db/schemas/` para melhor rastreabilidade.

## Boas práticas
- Não inclua dados sensíveis ou de produção no seed.
- Documente o propósito de cada alteração.
- Mantenha este README atualizado conforme o projeto evoluir. 

## Políticas de Segurança (RLS)
- Todas as tabelas sensíveis usam Row Level Security. Veja templates e exemplos em `../db/policies/`.

## Edge Functions
- Funções serverless para lógica customizada estão em `../supabase/functions/`. Consulte o README da pasta para exemplos de uso.

## Scripts de Automação
- Scripts para deploy, migrations e abertura de painéis estão em `../scripts/`. Veja o README correspondente para instruções. 

## Funções customizadas
- A função `delete_expired_conversations` foi atualizada para definir explicitamente o `search_path` como `public`, seguindo boas práticas de segurança.
- Recomenda-se que todas as funções PL/pgSQL definam `search_path` explicitamente para evitar ambiguidades e riscos em ambientes multi-schema. 