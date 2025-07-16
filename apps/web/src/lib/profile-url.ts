/**
 * Utilitários para URLs de perfil personalizadas
 */

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
  'terms', 'www', 'about', 'privacy', 'assets', 'static',
  'public', '_next', 'favicon', 'robots', 'sitemap'
];

/**
 * Verifica se um username é reservado
 */
export function isReservedUsername(username: string): boolean {
  return RESERVED_USERNAMES.includes(username.toLowerCase());
}

/**
 * Valida username completo (formato + não reservado)
 */
export function validateUsername(username: string): string | null {
  if (!username) return 'Username é obrigatório';
  if (username.length < 2) return 'Username deve ter pelo menos 2 caracteres';
  if (username.length > 30) return 'Username deve ter no máximo 30 caracteres';
  if (!isValidUsername(username)) return 'Username contém caracteres inválidos';
  if (isReservedUsername(username)) return 'Este username está reservado';
  return null;
}

/**
 * Extrai username de uma URL
 */
export function extractUsernameFromUrl(url: string): string | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;
    const segments = pathname.split('/').filter(Boolean);
    
    // Se é formato /profile/username
    if (segments[0] === 'profile' && segments[1]) {
      return segments[1];
    }
    
    // Se é formato /username
    if (segments[0] && isValidUsername(segments[0]) && !isReservedUsername(segments[0])) {
      return segments[0];
    }
    
    return null;
  } catch {
    return null;
  }
}

/**
 * Gera URL de compartilhamento com parâmetros UTM
 */
export function getShareableProfileUrl(
  username: string, 
  source?: string, 
  medium?: string, 
  campaign?: string
): string {
  const baseUrl = getFullProfileUrl(username);
  const params = new URLSearchParams();
  
  if (source) params.set('utm_source', source);
  if (medium) params.set('utm_medium', medium);
  if (campaign) params.set('utm_campaign', campaign);
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}