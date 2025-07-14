# Guia de Instalação: Supabase Self-Hosted na VPS

## 1. 🎯 Visão Geral

Este guia detalha como instalar e configurar o Supabase self-hosted na sua VPS Oracle, criando uma infraestrutura completa e autônoma com:

- **Docker & Docker Compose** para orquestração
- **Supabase Self-Hosted** (PostgreSQL, Auth, Storage, APIs)
- **Aplicação Next.js** via Coolify
- **Nginx** como reverse proxy
- **SSL/TLS** com Let's Encrypt

## 2. 📋 Pré-requisitos

- VPS Ubuntu 22.04 LTS com pelo menos 4GB RAM
- Acesso SSH configurado
- Domínio apontando para o IP da VPS
- Portas 80, 443, 3000, 8000 abertas

## 3. 🐳 Instalação do Docker e Docker Compose

### 3.1. Atualizar o sistema
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y apt-transport-https ca-certificates curl gnupg lsb-release
```

### 3.2. Adicionar repositório oficial do Docker
```bash
# Adicionar chave GPG
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar repositório
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

### 3.3. Instalar Docker
```bash
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verificar instalação
sudo docker --version
sudo docker compose version
```

### 3.4. Configurar usuário Docker
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER

# Aplicar mudanças (ou fazer logout/login)
newgrp docker

# Testar sem sudo
docker run hello-world
```

## 4. 🏗️ Instalação do Supabase Self-Hosted

### 4.1. Clonar repositório oficial
```bash
cd /opt
sudo git clone --depth 1 https://github.com/supabase/supabase
sudo chown -R $USER:$USER /opt/supabase
cd /opt/supabase/docker
```

### 4.2. Configurar variáveis de ambiente
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar configurações
nano .env
```

### 4.3. Configurações essenciais no .env
```bash
############
# Secrets
############
POSTGRES_PASSWORD=sua_senha_super_segura_aqui
JWT_SECRET=sua_jwt_secret_super_longa_aqui
ANON_KEY=sua_anon_key_aqui
SERVICE_ROLE_KEY=sua_service_role_key_aqui
DASHBOARD_USERNAME=admin
DASHBOARD_PASSWORD=sua_senha_dashboard_aqui

############
# Database
############
POSTGRES_HOST=db
POSTGRES_DB=postgres
POSTGRES_PORT=5432

############
# API Proxy
############
KONG_HTTP_PORT=8000
KONG_HTTPS_PORT=8443

############
# API
############
SUPABASE_PUBLIC_URL=https://seu-dominio.com
SUPABASE_ANON_KEY=${ANON_KEY}
SUPABASE_SERVICE_KEY=${SERVICE_ROLE_KEY}

############
# Dashboard
############
SUPABASE_PORT=3000
STUDIO_DEFAULT_ORGANIZATION=Sua Organização
STUDIO_DEFAULT_PROJECT=Seu Projeto

############
# Auth
############
SITE_URL=https://seu-dominio.com
ADDITIONAL_REDIRECT_URLS=
JWT_EXPIRY=3600
DISABLE_SIGNUP=false
API_EXTERNAL_URL=https://seu-dominio.com

############
# Email Auth
############
ENABLE_EMAIL_SIGNUP=true
ENABLE_EMAIL_AUTOCONFIRM=false
SMTP_ADMIN_EMAIL=admin@seu-dominio.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
SMTP_SENDER_NAME=Sua Aplicação
```

### 4.4. Gerar chaves JWT
```bash
# Instalar openssl se necessário
sudo apt install -y openssl

# Gerar JWT Secret (64 caracteres)
openssl rand -base64 64

# Gerar chaves ANON e SERVICE_ROLE usando o JWT Secret
# Use o site: https://supabase.com/docs/guides/hosting/overview#api-keys
# Ou use o script Python/Node.js para gerar
```

### 4.5. Iniciar Supabase
```bash
# Iniciar todos os serviços
docker compose up -d

# Verificar status
docker compose ps

# Ver logs
docker compose logs -f
```

## 5. 🌐 Configuração do Nginx

### 5.1. Instalar Nginx
```bash
sudo apt install -y nginx
sudo systemctl enable nginx
sudo systemctl start nginx
```

### 5.2. Configurar site
```bash
sudo nano /etc/nginx/sites-available/seu-dominio.com
```

### 5.3. Configuração Nginx completa
```nginx
# /etc/nginx/sites-available/seu-dominio.com

server {
    listen 80;
    listen [::]:80;
    server_name seu-dominio.com www.seu-dominio.com;
    
    # Redirecionar HTTP para HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name seu-dominio.com;
    
    # Certificados SSL (serão configurados pelo Certbot)
    ssl_certificate /etc/letsencrypt/live/seu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/seu-dominio.com/privkey.pem;
    
    # Configurações SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    # Aplicação Next.js (Coolify)
    location / {
        proxy_pass http://localhost:3001;  # Porta do Coolify
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # Supabase API
    location /api/ {
        proxy_pass http://localhost:8000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # Supabase Dashboard (opcional - apenas para desenvolvimento)
    location /dashboard/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### 5.4. Ativar site
```bash
# Criar link simbólico
sudo ln -s /etc/nginx/sites-available/seu-dominio.com /etc/nginx/sites-enabled/

# Remover site padrão
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Recarregar Nginx
sudo systemctl reload nginx
```

## 6. 🔒 Configuração SSL com Let's Encrypt

### 6.1. Instalar Certbot
```bash
sudo apt install -y certbot python3-certbot-nginx
```

### 6.2. Obter certificado
```bash
sudo certbot --nginx -d seu-dominio.com -d www.seu-dominio.com
```

### 6.3. Configurar renovação automática
```bash
# Testar renovação
sudo certbot renew --dry-run

# Adicionar ao crontab
sudo crontab -e

# Adicionar linha:
0 12 * * * /usr/bin/certbot renew --quiet
```

## 7. 🚀 Instalação do Coolify

### 7.1. Instalar Coolify
```bash
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

### 7.2. Acessar Coolify
- URL: `https://seu-dominio.com:8000`
- Configurar primeiro usuário admin
- Conectar repositório Git do projeto

## 8. 🔧 Configuração da Aplicação Next.js

### 8.1. Variáveis de ambiente para produção
```bash
# No Coolify, configurar as seguintes variáveis:
NEXT_PUBLIC_SUPABASE_URL=https://seu-dominio.com/api
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
```

## 9. 🛡️ Configuração de Segurança

### 9.1. Firewall (UFW)
```bash
# Ativar UFW
sudo ufw enable

# Permitir SSH
sudo ufw allow OpenSSH

# Permitir HTTP/HTTPS
sudo ufw allow 'Nginx Full'

# Permitir Coolify (apenas se necessário externamente)
sudo ufw allow 8000

# Verificar status
sudo ufw status
```

### 9.2. Configurações adicionais de segurança
```bash
# Desabilitar login root via SSH
sudo nano /etc/ssh/sshd_config
# Alterar: PermitRootLogin no

# Reiniciar SSH
sudo systemctl restart ssh

# Configurar fail2ban
sudo apt install -y fail2ban
sudo systemctl enable fail2ban
sudo systemctl start fail2ban
```

## 10. 📊 Monitoramento e Manutenção

### 10.1. Scripts úteis
```bash
# Verificar status dos serviços
docker compose ps
sudo systemctl status nginx
sudo systemctl status docker

# Logs do Supabase
docker compose logs -f

# Backup do banco
docker compose exec db pg_dump -U postgres postgres > backup_$(date +%Y%m%d).sql

# Atualizar Supabase
cd /opt/supabase/docker
git pull
docker compose pull
docker compose up -d
```

### 10.2. Monitoramento de recursos
```bash
# Instalar htop
sudo apt install -y htop

# Monitorar uso de disco
df -h

# Monitorar uso de memória
free -h

# Monitorar containers
docker stats
```

## 11. ✅ Checklist de Verificação

- [ ] Docker e Docker Compose instalados
- [ ] Supabase self-hosted funcionando
- [ ] Nginx configurado como reverse proxy
- [ ] SSL/TLS ativo com Let's Encrypt
- [ ] Coolify instalado e configurado
- [ ] Aplicação Next.js deployada
- [ ] Firewall configurado
- [ ] Backups automáticos configurados
- [ ] Monitoramento ativo
- [ ] Domínio apontando corretamente
- [ ] Variáveis de ambiente configuradas

## 12. 🆘 Troubleshooting

### Problemas comuns:

**Supabase não inicia:**
```bash
# Verificar logs
docker compose logs

# Verificar portas
sudo netstat -tlnp | grep :8000

# Reiniciar serviços
docker compose down
docker compose up -d
```

**Erro de conexão com banco:**
```bash
# Verificar se PostgreSQL está rodando
docker compose exec db psql -U postgres -c "SELECT version();"

# Verificar configurações de rede
docker network ls
```

**Problemas de SSL:**
```bash
# Verificar certificados
sudo certbot certificates

# Renovar manualmente
sudo certbot renew

# Testar configuração Nginx
sudo nginx -t
```

Este guia fornece uma base sólida para uma instalação completa e segura do Supabase self-hosted na sua VPS Oracle.