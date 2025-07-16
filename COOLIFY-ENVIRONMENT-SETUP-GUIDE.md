# Guia: Configurar Variáveis de Ambiente no Coolify

## 🚨 Problema Identificado
A seção "Environments" do projeto "Whosfy App" está vazia, causando o status `running:unhealthy` da aplicação.

## 📋 Passo a Passo para Configurar

### 1. Acessar o Painel do Coolify
- URL: `http://localhost:8000`
- Certifique-se de que o túnel SSH está ativo

### 2. Navegar para a Aplicação
1. Clique em **"Projects"** no menu lateral
2. Selecione **"Whosfy App"**
3. Clique na aplicação `m-bento7/studio:main`
4. Vá para a aba **"Environment Variables"**

### 3. Adicionar Variáveis Essenciais

Clique em **"+ Add"** e adicione cada variável:

#### Variável 1: NEXT_PUBLIC_SUPABASE_URL
```
Nome: NEXT_PUBLIC_SUPABASE_URL
Valor: http://host.docker.internal:54321
```

#### Variável 2: NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Nome: NEXT_PUBLIC_SUPABASE_ANON_KEY
Valor: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
```

#### Variável 3: DATABASE_URL
```
Nome: DATABASE_URL
Valor: postgresql://postgres:26Mn1597+1709@host.docker.internal:5432/postgres
```

#### Variável 4: NODE_ENV
```
Nome: NODE_ENV
Valor: production
```

#### Variável 5: NEXTAUTH_SECRET
```
Nome: NEXTAUTH_SECRET
Valor: your-secret-key-here-change-this
```

#### Variável 6: NEXTAUTH_URL
```
Nome: NEXTAUTH_URL
Valor: http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io
```

### 4. Salvar e Reiniciar
1. Após adicionar todas as variáveis, clique em **"Save"**
2. Vá para a aba **"Deployments"**
3. Clique em **"Deploy"** ou **"Restart"**
4. Aguarde o processo de rebuild

### 5. Verificar Status
- Monitore o status da aplicação
- Deve mudar de `running:unhealthy` para `running:healthy`
- Teste o acesso: http://w4kocsog4kkok48sgow48kc4.129.146.146.242.sslip.io

## 🔧 Troubleshooting

### Se a aplicação continuar unhealthy:
1. **Verifique os logs** na aba "Logs" do Coolify
2. **Confirme se o Supabase local está rodando** na porta 54321
3. **Teste conectividade** entre containers Docker

### Comandos de Verificação:
```bash
# Verificar se Supabase está rodando
docker ps | grep supabase

# Verificar logs da aplicação
docker logs <container-id>
```

### Alternativa para Conectividade Docker:
Se `host.docker.internal` não funcionar, use:
```
NEXT_PUBLIC_SUPABASE_URL=http://172.17.0.1:54321
DATABASE_URL=postgresql://postgres:26Mn1597+1709@172.17.0.1:5432/postgres
```

## ✅ Resultado Esperado
- Status: `running:healthy`
- Aplicação acessível via URL pública
- Conexão com Supabase funcionando
- Autenticação e banco de dados operacionais

## 📞 Próximos Passos
1. Configurar domínio personalizado (`whosfy.com`)
2. Habilitar SSL automático
3. Configurar Oracle Cloud Security List
4. Testar todas as funcionalidades da aplicação