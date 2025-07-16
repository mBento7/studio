import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

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
    const url = request.nextUrl.pathname;
    
    // Bloquear rotas de desenvolvimento/debug
    const blockedPaths = [
      '/api/debug',
      '/api/test',
      '/_next/webpack-hmr',
      '/showcase-',
    ];
    
    if (blockedPaths.some(path => url.startsWith(path))) {
      return new NextResponse('Not Found', { status: 404 });
    }
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