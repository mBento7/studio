# Estratégia de Hospedagem e Deploy com VPS, Coolify e Supabase

## 1. 🎯 Visão Geral

Este documento descreve a arquitetura de infraestrutura e o fluxo de deploy para hospedar esta aplicação de forma profissional, escalável e segura. A estratégia se baseia em uma combinação de VPS para autonomia, Coolify para orquestração simplificada e Supabase como nosso backend e banco de dados gerenciado.

O objetivo é ter controle total sobre a infraestrutura, otimizar custos e garantir alta performance.

## 2. 🏛️ Componentes da Arquitetura

*   **Servidor (VPS - Virtual Private Server):** Onde nossa aplicação e serviços irão rodar. Nos dá autonomia total sobre o ambiente.
*   **Orquestrador (Coolify):** Uma camada de software auto-hospedada que roda na nossa VPS. Ele simplifica drasticamente o processo de deploy, gerenciamento de serviços, configuração de domínios e certificados SSL. Essencialmente, é o nosso "Heroku / Vercel" privado.
*   **Backend & Banco de Dados (Supabase):** Nosso backend serverless para autenticação, banco de dados PostgreSQL, storage de arquivos e APIs automáticas.

## 3. 📁 Estrutura de Repositório Recomendada (Monorepo)

Para facilitar o gerenciamento de múltiplos serviços (ex: web, API customizada), a estrutura do projeto pode evoluir para um modelo de monorepo:

```bash
/
├── apps/
│   ├── web/              # Frontend (Nosso projeto Next.js atual)
│   └── backend-api/      # (Opcional) API customizada (Node.js, etc.)
├── infra/
│   ├── coolify-config/   # Arquivos docker-compose.yaml e .coolify
│   └── scripts/          # Scripts de deploy, backup, etc.
├── db/
│   └── schemas/          # Migrations, policies e schemas do Supabase
└── docs/                 # Documentação do projeto
```
**Nota:** Esta é uma evolução futura. Atualmente, nosso projeto Next.js ocupa a raiz do repositório.

## 4. ⚙️ Configuração da Infraestrutura

### 4.1. Banco de Dados (Supabase)
*   **Modelagem:** As tabelas são criadas com foco em performance e normalização.
*   **Segurança:** Utilizar **Row Level Security (RLS)** em todas as tabelas para garantir que os usuários só possam acessar seus próprios dados.
*   **Automação:** Usar **Triggers e Funções SQL** para automações, como a criação de um perfil de usuário após o cadastro (já implementado no nosso `seed.sql`).

### 4.2. Hospedagem (Coolify na VPS)
*   **Serviços:** O Coolify será configurado para hospedar e gerenciar nosso **Frontend (Next.js)**.
*   **Dados Persistentes:** Utilizar **volumes** do Docker (gerenciados pelo Coolify) para quaisquer dados que precisem sobreviver a um deploy, como uploads de usuários.
*   **Segurança:** Configurar certificados **SSL via Let's Encrypt** com um clique através do painel do Coolify.

## 5. 🚀 Fluxo de Deploy e Atualização

O Coolify simplifica o deploy, que pode ser feito de duas formas principais:

1.  **Deploy via Git (Recomendado):**
    *   Configurar o Coolify para "observar" uma branch específica do nosso repositório no GitHub (ex: `main` ou `production`).
    *   Sempre que um novo commit for enviado para essa branch, o Coolify automaticamente:
        1.  Puxa o código mais recente.
        2.  Instala as dependências (`npm install`).
        3.  Executa o build (`npm run build`).
        4.  Inicia a nova versão da aplicação, sem downtime.

2.  **Deploy via Webhook:**
    *   O Coolify gera uma URL de webhook única. Podemos configurar o GitHub ou outros serviços para chamar essa URL e acionar um novo deploy.

## 6. 🔒 Gestão de Ambientes e Segredos

*   **Desenvolvimento Local:** Usamos o arquivo `.env.local`, que nunca é enviado para o Git.
*   **Produção (Coolify):** As variáveis de ambiente (chaves de API, segredos) são inseridas diretamente na interface do Coolify como **"secrets"**. O Coolify as injeta de forma segura na aplicação durante o runtime, garantindo que elas nunca fiquem expostas no repositório.

## 7. 📦 Ecossistema de Serviços Adicionais na VPS

Com o controle total da VPS, podemos facilmente adicionar outros serviços gerenciados pelo Coolify:

*   **Redis:** Para cache de dados e gerenciamento de filas de tarefas.
*   **Metabase:** Para criar dashboards analíticos e de Business Intelligence conectados ao nosso banco de dados Supabase.
*   **N8N / Activepieces:** Para automação de workflows (ex: enviar um email de boas-vindas quando um novo usuário se cadastra).
*   **Mailhog:** Para testar o envio de emails em um ambiente de desenvolvimento ou staging.

## 8. ✅ Checklist de Produção

*   [ ] **Monitoramento:** Ativar o monitoramento de recursos no Coolify.
*   [ ] **Backups:** Configurar a rotina de backups automáticos do banco de dados no Supabase.
*   [ ] **CDN:** Configurar o Supabase Storage com a CDN para entrega otimizada de imagens e assets.
*   [ ] **DNS:** Apontar o domínio principal para o endereço de IP da VPS.
*   [ ] **SSL:** Certificado SSL ativo e configurado via Coolify.
*   [ ] **CI/CD:** Fluxo de deploy automático configurado e testado.
*   [ ] **Versionamento de banco:** Migrations e policies versionadas em `db/` e testadas.

## 9. 📦 Versionamento de Banco de Dados

- Todas as migrations, policies e triggers devem ser versionadas em `db/schemas/` e `db/policies/`.
- Para rollback, crie migrations reversas e documente o processo em `docs/`.

## 10. 🧑‍💻 Exemplos de Queries SQL Comuns
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
