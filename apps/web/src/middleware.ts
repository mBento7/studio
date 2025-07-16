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

  // Adicionar headers de segurança
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Content Security Policy para prevenir XSS e outros ataques
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

  // Remover headers que podem expor informações do servidor
  response.headers.delete('Server');
  response.headers.delete('X-Powered-By');

  // Em produção, bloquear acesso a rotas de desenvolvimento
  if (process.env.NODE_ENV === 'production') {
    // Bloquear rotas de desenvolvimento/debug
    const blockedPaths = [
      '/api/debug',
      '/api/test',
      '/_next/webpack-hmr',
      '/showcase-',
    ];
    
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
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};