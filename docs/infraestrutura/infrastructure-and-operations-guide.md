# Guia de Infraestrutura e Operações: [Nome do Projeto]

## 1. Visão Geral da Arquitetura

*   **Frontend:** Aplicação Next.js.
*   **Hospedagem:** Servidor VPS.
*   **Backend & Banco de Dados:** Supabase (PostgreSQL).
*   **Domínio:** `[seu-dominio.com]`
*   **Provedor de DNS:** `[ex: Cloudflare, GoDaddy, etc.]`

---

## 2. Configuração do Supabase

#### 2.1. Detalhes do Projeto
*   **Nome do Projeto:** Whosfy
*   **ID do Projeto:** wkwhvjsnqsognjorjsgf
*   **Região:** us-east-1
*   **Banco de Dados:** PostgreSQL 17.2.0
*   **URL do Projeto:** https://wkwhvjsnqsognjorjsgf.supabase.co
*   **Status:** ✅ Ativo e operacional
*   **Última verificação:** 15/01/2025
*   **Chave de API Pública (Anon Key):** `[Chave pública para uso no frontend]`
*   **Chave de Serviço (Service Role Key):** `[Chave secreta para uso no backend/Server Actions]` - **TRATAR COMO SENHA!**

#### 2.2. Estrutura do Banco de Dados (PostgreSQL)
O banco de dados inclui as seguintes tabelas principais:
*   `profiles` - Informações de perfil do usuário (5 perfis ativos)
*   `social_links` - Links de redes sociais para perfis
*   `services` - Serviços oferecidos pelos usuários
*   `activities` - Rastreamento de atividades do usuário
*   `reviews` - Avaliações e classificações de usuários
*   `faq` - Perguntas frequentes
*   `coupon_likes` - Sistema de curtidas em cupons

**Extensões Instaladas:**
*   `pg_graphql` - Suporte GraphQL
*   `pgcrypto` - Funções criptográficas
*   `uuid-ossp` - Geração de UUID
*   `pg_stat_statements` - Estatísticas de consultas
*   `supabase_vault` - Gerenciamento de segredos

**Schema SQL Completo:** Arquive o script `CREATE TABLE` para cada uma das suas tabelas.
    ```sql
    -- Exemplo para a tabela 'profiles'
    CREATE TABLE public.profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT,
        avatar_url TEXT,
        updated_at TIMESTAMPTZ DEFAULT NOW()
    );
    ```

**Políticas de Segurança (Row Level Security - RLS):**
    ```sql
    -- Exemplo de política RLS
    -- "Permite que usuários leiam seu próprio perfil."
    CREATE POLICY "Allow individual read access"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

    -- "Permite que usuários atualizem seu próprio perfil."
    CREATE POLICY "Allow individual update access"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);
    ```

#### 2.3. Autenticação
*   **Provedores Habilitados:** Email/Senha, provedores de login social configurados
*   **Templates de Email:** Documente quais templates de email (confirmação, reset de senha) foram customizados
*   **URL de Redirecionamento:** `[URL para onde o usuário é enviado após o login]`
*   **⚠️ Atenção:** Proteção contra senhas vazadas desabilitada
*   **⚠️ Atenção:** Configuração MFA insuficiente

#### 2.4. Storage
*   **Buckets Criados:** Bucket público para imagens de perfil, bucket privado para documentos do usuário
*   **CDN:** Habilitado para entrega rápida de conteúdo
*   **Políticas de Acesso dos Buckets:** Para cada bucket, descreva as regras de segurança (quem pode fazer upload, download, etc.)

#### 2.5. Edge Functions
Funções deployadas (4 ativas):
*   `chat-message` - Mensagens em tempo real
*   `send-notification` - Notificações push
*   `spend-credits` - Gerenciamento do sistema de créditos
*   `webhook-handler` - Processamento de webhooks externos

#### 2.6. Configurações de Segurança
**✅ Implementado:**
*   RLS habilitado na maioria das tabelas
*   Políticas de acesso configuradas
*   Autenticação JWT
*   HTTPS obrigatório

**⚠️ Pontos de Atenção:**
1. **RLS Desabilitado:** Tabelas `public.faq` e `public.coupon_likes`
2. **Search Path:** Função `public.update_user_plan` com search_path mutável
3. **Proteção de senhas:** Verificação de senhas vazadas desabilitada
4. **MFA:** Configuração de autenticação multifator insuficiente

**🔧 Ações Recomendadas:**
```sql
-- Habilitar RLS nas tabelas
ALTER TABLE public.faq ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coupon_likes ENABLE ROW LEVEL SECURITY;

-- Corrigir search_path da função
ALTER FUNCTION public.update_user_plan() SET search_path = '';
```

---

## 3. Configuração do Servidor VPS

#### 3.1. Provedor e Especificações
*   **Provedor:** `[ex: DigitalOcean, Vultr, AWS Lightsail, etc.]`
*   **Plano/Especificações:** `[ex: 2 GB RAM, 1 vCPU, 50 GB SSD]`
*   **Localização do Servidor:** `[ex: São Paulo, Brazil]`
*   **Sistema Operacional:** `[ex: Ubuntu 22.04 LTS]`

#### 3.2. Credenciais de Acesso
*   **Endereço de IP:** `[Endereço IPv4 do servidor]`
*   **Usuário de Acesso SSH:** `[ex: root, ou um usuário não-root como 'admin']`
*   **Método de Autenticação:** `[Chave SSH (preferencial) ou Senha]`
*   **Localização da Chave SSH:** `[Caminho no seu computador para a chave privada, ex: ~/.ssh/id_rsa_projeto]` - **NUNCA ARQUIVE A CHAVE PRIVADA!** Apenas o caminho e o nome dela.

#### 3.3. Software Instalado
*   **Node.js:** Versão `[ex: v18.x ou v20.x]` (use `node -v` para verificar).
*   **Gerenciador de Processos:** `PM2` (para manter a aplicação Next.js rodando).
*   **Servidor Web (Reverse Proxy):** `Nginx`.
*   **Firewall:** `UFW` (Uncomplicated Firewall).

#### 3.4. Configuração do Nginx
*   **Arquivo de Configuração do Site:** Salve o conteúdo completo de `/etc/nginx/sites-available/[seu-dominio.com]`. Este arquivo é crucial.
    ```nginx
    # /etc/nginx/sites-available/seu-dominio.com

    server {
        listen 80;
        listen [::]:80;
        server_name seu-dominio.com www.seu-dominio.com;

        # Redireciona HTTP para HTTPS
        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 ssl http2;
        listen [::]:443 ssl http2;
        server_name seu-dominio.com;

        # Caminhos dos certificados SSL (gerados pelo Certbot)
        ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;

        location / {
            # Faz o proxy reverso para a aplicação Next.js rodando na porta 3000
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

#### 3.5. Segurança
*   **Regras do Firewall (UFW):**
    ```
    # use `sudo ufw status` para ver as regras
    Status: active

    To                         Action      From
    --                         ------      ----
    OpenSSH                    ALLOW       Anywhere
    Nginx Full                 ALLOW       Anywhere
    ```
*   **Certificado SSL:** `Let's Encrypt (via Certbot)`.
*   **Comando de Renovação:** `sudo certbot renew --dry-run` (para teste).

---

## 4. Processo de Deploy (Implantação)

Documente o passo a passo para publicar uma nova versão do código.

1.  **Acessar o servidor:** `ssh [usuario]@[ip-do-servidor]`
2.  **Navegar para a pasta do projeto:** `cd /var/www/[nome-do-projeto]`
3.  **Puxar as atualizações do Git:** `git pull origin main`
4.  **Instalar dependências:** `npm install`
5.  **Buildar o projeto:** `npm run build`
6.  **Reiniciar a aplicação com PM2:** `pm2 restart [nome-da-app-no-pm2]`

---

## 5. Variáveis de Ambiente (`.env.production`)**

Liste **APENAS OS NOMES** das variáveis, nunca os valores. O arquivo com os valores deve estar no servidor, mas fora do repositório Git.

```
# Exemplo de lista de variáveis de ambiente

# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Outros
STRIPE_SECRET_KEY=
RESEND_API_KEY=
```

---

## 6. 📦 Versionamento e Queries Práticas

- Todas as migrations e políticas devem ser versionadas em `db/schemas/` e `db/policies/`.
- Para rollback, crie um arquivo de migration reversa e aplique manualmente.

### Exemplos de Queries SQL Comuns
- Buscar perfis por cidade:
  ```sql
  SELECT * FROM public.profiles WHERE location->>'city' = 'São Paulo';
  ```
- Buscar perfis disponíveis por categoria:
  ```sql
  SELECT * FROM public.profiles WHERE category = 'Designer' AND is_available = true;
  ```
- Buscar perfis por skill:
  ```sql
  SELECT * FROM public.profiles WHERE skills ? 'React';
  ```
