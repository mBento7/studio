# Use Node.js 18 Alpine para menor tamanho
FROM node:18-alpine AS base

# Instalar dependências necessárias
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm
ENV NEXT_TELEMETRY_DISABLED=1

# Copiar arquivos de configuração do workspace
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/

# Instalar dependências
RUN pnpm install --frozen-lockfile

# Copiar código fonte
COPY . .

# Build da aplicação web
WORKDIR /app/apps/web
RUN pnpm build

# Estágio de produção
FROM node:18-alpine AS runner
WORKDIR /app

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Criar usuário não-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar package.json e instalar apenas dependências de produção
COPY --from=base /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml ./
COPY --from=base /app/apps/web/package.json ./apps/web/
RUN pnpm install --prod --frozen-lockfile

# Copiar arquivos necessários
COPY --from=base --chown=nextjs:nodejs /app/apps/web/.next ./apps/web/.next
COPY --from=base --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public
COPY --from=base --chown=nextjs:nodejs /app/apps/web/next.config.js ./apps/web/
COPY --from=base --chown=nextjs:nodejs /app/apps/web/package.json ./apps/web/

# Configurar usuário
USER nextjs

# Expor porta
EXPOSE 3000

# Variáveis de ambiente
ENV PORT=3000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Comando de inicialização
WORKDIR /app/apps/web
CMD ["pnpm", "start"]