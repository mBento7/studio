# 🌐 Guia: URLs Personalizadas de Perfil - whosfy.com/username

## 📋 Visão Geral

Este guia explica como configurar URLs personalizadas para perfis de usuário no formato `whosfy.com/micaelsants`, permitindo que cada usuário tenha uma URL limpa e profissional para seu perfil.

## 🎯 Objetivo

Transformar URLs de perfil de:
- **Atual**: `whosfy.com/profile/micaelsants`
- **Desejado**: `whosfy.com/micaelsants`

## 🏗️ Arquitetura Atual

### Sistema de Username
- **Tabela**: `profiles`
- **Campo**: `username` (UNIQUE, NOT NULL)
- **Validação**: Regex estilo Instagram: `^[a-z0-9](?!.*[._]{2})[a-z0-9._]{0,28}[a-z0-9]$`
- **Rota Atual**: `/profile/[username]`

### Estrutura de Arquivos
```
apps/web/src/app/(public)/
├── profile/
│   └── [username]/
│       ├── page.tsx (Server Component)
│       └── ProfileClientPage.tsx (Client Component)
└── home/
    └── page.tsx
```

## 🔧 Implementação

### 1. Modificar o Middleware

Editar `apps/web/src/middleware.ts` para interceptar URLs diretas:

```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Lista de rotas reservadas que NÃO devem ser tratadas como usernames
const RESERVED_ROUTES = [
  'api',
  '_next',
  'auth',
  'login',
  'register',
  'dashboard',
  'admin',
  'profile',
  'home',
  'about',
  'contact',
  'terms',
  'privacy',
  'help',
  'support',
  'blog',
  'docs',
  'app',
  'www',
  'mail',
  'ftp',
  'cdn',
  'assets',
  'static',
  'public',
  'favicon.ico',
  'robots.txt',
  'sitemap.xml'
];

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl.clone();
  const pathname = url.pathname;

  // Headers de segurança existentes
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: http:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://vercel.live",
    "frame-src 'self' https://www.youtube.com https://youtube.com",
  ].join('; ');
  
  response.headers.set('Content-Security-Policy', csp);
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');

  // Bloqueio de rotas de desenvolvimento em produção
  if (process.env.NODE_ENV === 'production') {
    const blockedPaths = ['/api/debug', '/api/test', '/_next/webpack-hmr', '/showcase-'];
    if (blockedPaths.some(path => pathname.startsWith(path))) {
      return new NextResponse('Not Found', { status: 404 });
    }
  }

  // ===== LÓGICA DE URL PERSONALIZADA =====
  
  // Extrair o primeiro segmento da URL (possível username)
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  // Se não há segmentos, é a página inicial
  if (!firstSegment) {
    return response;
  }

  // Se é uma rota reservada, não processar como username
  if (RESERVED_ROUTES.includes(firstSegment.toLowerCase())) {
    return response;
  }

  // Se já está na estrutura /profile/[username], não reescrever
  if (pathname.startsWith('/profile/')) {
    return response;
  }

  // Validar se o primeiro segmento parece um username válido
  const usernameRegex = /^[a-z0-9](?!.*[._]{2})[a-z0-9._]{0,28}[a-z0-9]$/;
  if (usernameRegex.test(firstSegment)) {
    // Reescrever para a rota de perfil
    url.pathname = `/profile/${firstSegment}`;
    return NextResponse.rewrite(url);
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
```

### 2. Criar Página de Captura na Raiz

Criar `apps/web/src/app/[username]/page.tsx`:

```typescript
import { notFound, redirect } from "next/navigation";
import { getUserProfileByUsername } from "@/services/profile.service";

interface UsernamePageProps {
  params: Promise<{ username: string }>;
}

// Esta página captura URLs diretas e redireciona para a estrutura correta
export default async function UsernamePage({ params }: UsernamePageProps) {
  const resolvedParams = await params;
  const username = resolvedParams.username;

  // Validar se o username existe
  const userProfile = await getUserProfileByUsername(username);
  
  if (!userProfile) {
    notFound();
  }

  // Redirecionar para a estrutura de perfil (opcional)
  // Ou renderizar diretamente o perfil aqui
  redirect(`/profile/${username}`);
}
```

### 3. Atualizar Links Internos

Modificar todos os links internos para usar o novo formato:

```typescript
// Antes
<Link href={`/profile/${username}`}>

// Depois
<Link href={`/${username}`}>
```

### 4. Função Utilitária para URLs

Criar `apps/web/src/lib/profile-url.ts`:

```typescript
/**
 * Gera URL de perfil no formato personalizado
 */
export function getProfileUrl(username: string): string {
  return `/${username}`;
}

/**
 * Gera URL completa de perfil
 */
export function getFullProfileUrl(username: string, domain = 'whosfy.com'): string {
  return `https://${domain}/${username}`;
}

/**
 * Valida se uma string é um username válido
 */
export function isValidUsername(username: string): boolean {
  return /^[a-z0-9](?!.*[._]{2})[a-z0-9._]{0,28}[a-z0-9]$/.test(username);
}

/**
 * Lista de usernames reservados
 */
export const RESERVED_USERNAMES = [
  'admin', 'api', 'app', 'auth', 'blog', 'cdn', 'contact',
  'dashboard', 'docs', 'ftp', 'help', 'home', 'login',
  'mail', 'profile', 'register', 'root', 'support',
  'terms', 'www', 'about', 'privacy'
];

/**
 * Verifica se um username é reservado
 */
export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.includes(username.toLowerCase());
}
```

## 🔒 Validação e Segurança

### 1. Validação de Username

```typescript
// No formulário de registro/edição
function validateUsername(username: string): string | null {
  if (!username) return 'Username é obrigatório';
  if (username.length < 2) return 'Username deve ter pelo menos 2 caracteres';
  if (username.length > 30) return 'Username deve ter no máximo 30 caracteres';
  if (!isValidUsername(username)) return 'Username contém caracteres inválidos';
  if (isReservedUsername(username)) return 'Este username está reservado';
  return null;
}
```

### 2. Middleware de Segurança

```typescript
// Adicionar ao middleware existente
if (firstSegment.length > 30) {
  return new NextResponse('Not Found', { status: 404 });
}

if (firstSegment.includes('..') || firstSegment.includes('//')) {
  return new NextResponse('Bad Request', { status: 400 });
}
```

## 🌐 Configuração de Domínio

### 1. DNS no Cloudflare

Configurar registros DNS conforme o guia existente:

```dns
# Registro A - Domínio principal
Tipo: A
Nome: @
Conteúdo: 194.164.72.183
Proxy: Ativado (laranja)

# Registro CNAME - Subdomínio www
Tipo: CNAME
Nome: www
Conteúdo: whosfy.com
Proxy: Ativado (laranja)
```

### 2. Configuração no Coolify

1. Adicionar domínio: `whosfy.com`
2. Configurar SSL/TLS automático
3. Verificar redirecionamento www → não-www

## 📱 Exemplos de Uso

### URLs de Perfil
```
https://whosfy.com/micaelsants
https://whosfy.com/joao.silva
https://whosfy.com/maria_santos
https://whosfy.com/dev123
```

### Compartilhamento
```typescript
// Componente de compartilhamento
function ShareProfile({ username }: { username: string }) {
  const profileUrl = getFullProfileUrl(username);
  
  return (
    <div>
      <p>Compartilhe seu perfil:</p>
      <input value={profileUrl} readOnly />
      <button onClick={() => navigator.clipboard.writeText(profileUrl)}>
        Copiar Link
      </button>
    </div>
  );
}
```

## 🔍 SEO e Meta Tags

### 1. Metadata Dinâmica

```typescript
// Em app/[username]/page.tsx
export async function generateMetadata({ params }: UsernamePageProps) {
  const username = (await params).username;
  const profile = await getUserProfileByUsername(username);
  
  if (!profile) {
    return {
      title: 'Perfil não encontrado - Whosfy',
    };
  }

  return {
    title: `${profile.full_name} (@${profile.username}) - Whosfy`,
    description: profile.bio || `Conheça o perfil de ${profile.full_name} no Whosfy`,
    openGraph: {
      title: `${profile.full_name} (@${profile.username})`,
      description: profile.bio,
      url: `https://whosfy.com/${username}`,
      images: profile.profile_picture_url ? [profile.profile_picture_url] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.full_name} (@${profile.username})`,
      description: profile.bio,
    },
  };
}
```

## 🚀 Deploy e Testes

### 1. Checklist de Deploy

- [ ] Middleware atualizado
- [ ] Rotas reservadas configuradas
- [ ] Validação de username implementada
- [ ] Links internos atualizados
- [ ] Meta tags configuradas
- [ ] DNS configurado no Cloudflare
- [ ] SSL/TLS ativo

### 2. Testes

```bash
# Testar URLs personalizadas
curl -I https://whosfy.com/micaelsants
curl -I https://whosfy.com/usuario-inexistente
curl -I https://whosfy.com/admin  # Deve retornar 404
```

## ⚠️ Considerações Importantes

### 1. Compatibilidade
- URLs antigas (`/profile/username`) continuarão funcionando
- Implementar redirecionamentos 301 se necessário

### 2. Performance
- Middleware executa em todas as requisições
- Validação de username deve ser rápida
- Cache de usernames válidos (opcional)

### 3. Monitoramento
- Logs de URLs não encontradas
- Métricas de acesso por username
- Alertas para tentativas de acesso a rotas reservadas

## 🔄 Migração Gradual

### Fase 1: Implementação
1. Implementar middleware
2. Manter rotas antigas funcionando
3. Testar em ambiente de desenvolvimento

### Fase 2: Deploy
1. Deploy em produção
2. Monitorar logs de erro
3. Ajustar lista de rotas reservadas se necessário

### Fase 3: Otimização
1. Atualizar links internos
2. Implementar redirecionamentos 301
3. Otimizar SEO

## 📞 Suporte

Para dúvidas ou problemas:
1. Verificar logs do middleware
2. Testar validação de username
3. Confirmar configuração DNS
4. Verificar SSL/TLS no Cloudflare

---

**Resultado Final**: Usuários poderão acessar perfis diretamente via `whosfy.com/micaelsants` 🎉