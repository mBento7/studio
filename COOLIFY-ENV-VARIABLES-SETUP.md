# Configuração das Variáveis de Ambiente no Coolify

## Status Atual da Aplicação
- **UUID**: `w4kocsog4kkok48sgow48kc4`
- **Status**: `running:unhealthy`
- **URL**: http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Porta**: 3000
- **Build Pack**: dockerfile

## Variáveis de Ambiente a Configurar

As seguintes variáveis de ambiente precisam ser configuradas no painel do Coolify:

### 1. NEXT_PUBLIC_SUPABASE_URL
```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
```

### 2. NEXT_PUBLIC_SUPABASE_ANON_KEY
```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

### 3. DATABASE_URL (PostgreSQL)
```
DATABASE_URL=postgresql://postgres:26Mn1597+1709@127.0.0.1:5432/postgres
```

## Como Configurar no Coolify

### Passo 1: Acessar o Painel do Coolify
1. Acesse: http://localhost:8000
2. Faça login no painel administrativo

### Passo 2: Navegar para a Aplicação
1. Vá para **Projects** → **Whosfy App**
2. Ou acesse diretamente a aplicação com UUID: `w4kocsog4kkok48sgow48kc4`

### Passo 3: Configurar Variáveis de Ambiente
1. Na página da aplicação, clique na aba **Environment Variables**
2. Adicione cada uma das variáveis listadas acima:
   - Clique em **+ Add Variable**
   - Insira o **Nome** da variável (ex: `NEXT_PUBLIC_SUPABASE_URL`)
   - Insira o **Valor** correspondente
   - Clique em **Save**

### Passo 4: Reiniciar a Aplicação
Após adicionar todas as variáveis:
1. Clique em **Deploy** ou **Restart**
2. Aguarde o processo de rebuild e restart
3. Verifique se o status muda de `running:unhealthy` para `running:healthy`

## Verificação

### URLs para Monitoramento
- **Aplicação**: http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
- **Painel Coolify**: http://localhost:8000

### Comandos de Verificação Local
```bash
# Verificar se as variáveis estão sendo carregadas
curl http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io

# Verificar logs da aplicação no Coolify
# (Disponível no painel web)
```

## Observações Importantes

1. **Supabase Local**: As variáveis apontam para uma instância local do Supabase (`127.0.0.1:54321`)
2. **Database**: A URL do PostgreSQL também aponta para localhost (`127.0.0.1:5432`)
3. **Rede Docker**: Certifique-se de que a aplicação no Docker consegue acessar os serviços locais
4. **Health Check**: O status `unhealthy` pode estar relacionado à falta dessas variáveis

## Próximos Passos

1. ✅ Configurar as variáveis de ambiente no Coolify
2. ✅ Reiniciar a aplicação
3. ✅ Verificar se o status muda para `healthy`
4. ✅ Testar a conectividade com Supabase
5. ✅ Verificar se a aplicação carrega corretamente

## Troubleshooting

### Se a aplicação continuar unhealthy:
1. Verifique os logs no painel do Coolify
2. Confirme se o Supabase local está rodando na porta 54321
3. Verifique se o PostgreSQL está acessível na porta 5432
4. Considere usar `host.docker.internal` em vez de `127.0.0.1` para acessar serviços do host

### Alternativa para Rede Docker:
Se houver problemas de conectividade, substitua `127.0.0.1` por `host.docker.internal`:
```
NEXT_PUBLIC_SUPABASE_URL=http://host.docker.internal:54321
DATABASE_URL=postgresql://postgres:26Mn1597+1709@host.docker.internal:5432/postgres
```