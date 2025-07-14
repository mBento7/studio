# Configuração de Variáveis de Ambiente no Coolify

Este documento explica como configurar as variáveis de ambiente necessárias no Coolify para que o build do Docker funcione corretamente.

## Problema

O build do Docker estava falhando com o erro "Missing Supabase environment variables" durante a pré-renderização das páginas. Isso acontece porque o Next.js tenta acessar as variáveis de ambiente do Supabase durante o build, mas elas não estavam disponíveis no contexto do Docker.

## Solução

### 1. Modificações no Dockerfile

O Dockerfile foi modificado para aceitar as variáveis de ambiente como argumentos de build:

```dockerfile
# Argumentos de build para variáveis de ambiente
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG SUPABASE_SERVICE_ROLE_KEY

# Definir variáveis de ambiente para o build
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
```

### 2. Configuração no Coolify

No Coolify, você precisa configurar as seguintes variáveis de ambiente:

#### Build Arguments (Argumentos de Build)
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
```

#### Runtime Environment Variables (Variáveis de Ambiente de Runtime)
```
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima_do_supabase
SUPABASE_SERVICE_ROLE_KEY=sua_chave_de_servico_do_supabase
NODE_ENV=production
PORT=3000
```

### 3. Como Configurar no Coolify

1. **Acesse seu projeto no Coolify**
2. **Vá para a seção "Environment Variables"**
3. **Adicione as variáveis de build:**
   - Marque a opção "Build Time" para as variáveis do Supabase
   - Adicione cada variável com seu respectivo valor

4. **Adicione as variáveis de runtime:**
   - Mantenha desmarcada a opção "Build Time" para as variáveis de runtime
   - Adicione as mesmas variáveis do Supabase novamente

### 4. Valores das Variáveis

Para obter os valores corretos das variáveis do Supabase:

1. **Acesse seu projeto no Supabase Dashboard**
2. **Vá para Settings > API**
3. **Copie os valores:**
   - `NEXT_PUBLIC_SUPABASE_URL`: Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role key (⚠️ Mantenha esta chave segura!)

### 5. Verificação

Após configurar as variáveis:

1. **Faça um novo deploy no Coolify**
2. **Verifique os logs de build** para confirmar que não há mais erros de variáveis de ambiente
3. **Teste a aplicação** para garantir que o Supabase está funcionando corretamente

## Modificações no Código

Também foram feitas modificações nos arquivos de configuração do Supabase para serem mais tolerantes durante o build:

- `apps/web/src/lib/supabase/client.ts`: Agora só valida as variáveis em runtime (no browser)
- `apps/web/src/lib/supabase/server.ts`: Agora mostra um warning em vez de falhar durante o build

## Troubleshooting

Se ainda houver problemas:

1. **Verifique se todas as variáveis estão configuradas corretamente**
2. **Confirme que as variáveis de build estão marcadas como "Build Time"**
3. **Verifique os logs de build no Coolify**
4. **Teste as variáveis localmente** com `docker build --build-arg NEXT_PUBLIC_SUPABASE_URL=... .`

## Segurança

⚠️ **Importante**: A `SUPABASE_SERVICE_ROLE_KEY` é uma chave sensível que deve ser mantida segura. Nunca a exponha em código cliente ou logs públicos.