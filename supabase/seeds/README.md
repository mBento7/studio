# Seeds - Dados Iniciais

Este diretório contém arquivos de seed (dados iniciais) versionados para o banco de dados.

## Estrutura

```
seeds/
├── README.md                    # Este arquivo
├── seed-YYYY-MM-DDTHH-MM-SS.sql # Seeds versionados por timestamp
└── latest/                      # Link simbólico para o seed mais recente
```

## Versionamento de Seeds

### Padrão de Nomeação
- **Formato**: `seed-YYYY-MM-DDTHH-MM-SS.sql`
- **Exemplo**: `seed-2024-07-11T14-30-00.sql`

### Como Versionar Seeds

1. **Automático** (recomendado):
   ```bash
   node scripts/version-migrations.js
   ```

2. **Manual**:
   ```bash
   # Copiar seed atual com timestamp
   cp ../seed.sql seed-$(date +%Y-%m-%dT%H-%M-%S).sql
   ```

## Aplicação de Seeds

### Desenvolvimento Local
```bash
# Aplicar seed específico
psql $DB_URL -f seeds/seed-2024-07-11T14-30-00.sql

# Ou usando Supabase CLI
supabase db execute seeds/seed-2024-07-11T14-30-00.sql
```

### Produção
⚠️ **CUIDADO**: Seeds contêm dados de exemplo/desenvolvimento.

1. **Revisar** o conteúdo do seed antes de aplicar
2. **Filtrar** apenas dados necessários para produção
3. **Testar** em ambiente de staging primeiro

```bash
# Exemplo de aplicação filtrada
psql $DB_URL -c "-- Aplicar apenas estruturas, não dados de exemplo"
```

## Boas Práticas

### ✅ Fazer
- Versionar seeds antes de modificações importantes
- Documentar mudanças significativas nos seeds
- Manter seeds pequenos e focados
- Revisar dados antes de aplicar em produção
- Usar dados realistas mas não sensíveis

### ❌ Evitar
- Incluir dados pessoais reais
- Criar seeds muito grandes (>1MB)
- Aplicar seeds de desenvolvimento em produção sem revisão
- Misturar estrutura de banco com dados de seed

## Tipos de Seeds

### 1. Seeds de Desenvolvimento
- Dados para desenvolvimento local
- Perfis de teste
- Dados de exemplo para UI

### 2. Seeds de Produção
- Dados essenciais para funcionamento
- Configurações iniciais
- Dados de referência (países, categorias, etc.)

### 3. Seeds de Teste
- Dados específicos para testes automatizados
- Cenários de teste predefinidos

## Estrutura dos Dados

### Tabelas Principais
- `profiles` - Perfis de usuários de exemplo
- `services` - Serviços de exemplo
- `portfolio_items` - Itens de portfólio
- `social_links` - Links sociais
- `experience` - Experiências profissionais
- `education` - Formação acadêmica
- `reviews` - Avaliações e comentários

### Relacionamentos
- Todos os dados mantêm integridade referencial
- IDs são UUIDs válidos
- Datas seguem formato ISO 8601

## Scripts Relacionados

- `../scripts/version-migrations.js` - Versionamento automático
- `../scripts/apply-migrations.js` - Aplicação de migrations e seeds
- `../scripts/validate-seeds.js` - Validação de integridade dos seeds

## Monitoramento

### Verificar Integridade
```sql
-- Verificar se todos os perfis têm dados relacionados
SELECT 
  p.username,
  COUNT(s.id) as services_count,
  COUNT(pi.id) as portfolio_count
FROM profiles p
LEFT JOIN services s ON p.id = s.profile_id
LEFT JOIN portfolio_items pi ON p.id = pi.profile_id
GROUP BY p.id, p.username;
```

### Estatísticas
```sql
-- Estatísticas gerais dos seeds
SELECT 
  'profiles' as table_name, COUNT(*) as count FROM profiles
UNION ALL
SELECT 'services', COUNT(*) FROM services
UNION ALL
SELECT 'portfolio_items', COUNT(*) FROM portfolio_items
UNION ALL
SELECT 'reviews', COUNT(*) FROM reviews;
```

---

> 💡 **Dica**: Use o comando `node scripts/version-migrations.js` para automatizar o versionamento de seeds e migrations.