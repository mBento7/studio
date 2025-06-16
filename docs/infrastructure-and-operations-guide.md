# Guia de Infraestrutura e Operações: [Nome do Projeto]

## 1. Visão Geral da Arquitetura

*   **Frontend:** Aplicação Next.js.
*   **Hospedagem:** Servidor VPS.
*   **Backend & Banco de Dados:** Supabase (PostgreSQL).
*   **Domínio:** `[seu-dominio.com]`
*   **Provedor de DNS:** `[ex: Cloudflare, GoDaddy, etc.]`

---

## 2. Configuração do Supabase

#### 2.1. Credenciais do Projeto
*   **ID do Projeto:** `[ID encontrado no painel do Supabase]`
*   **URL do Projeto:** `https://[ID-do-projeto].supabase.co`
*   **Chave de API Pública (Anon Key):** `[Chave pública para uso no frontend]`
*   **Chave de Serviço (Service Role Key):** `[Chave secreta para uso no backend/Server Actions]` - **TRATAR COMO SENHA!**

#### 2.2. Estrutura do Banco de Dados (PostgreSQL)
*   **Schema SQL Completo:** Arquive o script `CREATE TABLE` para cada uma das suas tabelas. Isso é o bem mais valioso da sua aplicação.
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
*   **Políticas de Segurança (Row Level Security - RLS):** Para cada tabela, documente as políticas que definem quem pode ler, escrever, atualizar ou deletar dados.
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
*   **Provedores Habilitados:** (ex: Email/Senha, Google, GitHub).
*   **Templates de Email:** Documente quais templates de email (confirmação, reset de senha) foram customizados.
*   **URL de Redirecionamento:** `[URL para onde o usuário é enviado após o login]`

#### 2.4. Storage
*   **Buckets Criados:** Liste os nomes dos buckets (ex: `avatars`, `public-assets`).
*   **Políticas de Acesso dos Buckets:** Para cada bucket, descreva as regras de segurança (quem pode fazer upload, download, etc.).

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
