/**
 * Utilitários de segurança para prevenir vazamento de informações sensíveis
 */

// Lista de padrões que indicam URLs de desenvolvimento
const DEVELOPMENT_URL_PATTERNS = [
  /blob:http:\/\/localhost/,
  /blob:http:\/\/127\.0\.0\.1/,
  /blob:http:\/\/10\./,
  /blob:http:\/\/192\.168\./,
  /http:\/\/localhost/,
  /http:\/\/127\.0\.0\.1/,
  /http:\/\/10\./,
  /http:\/\/192\.168\./
];

// Lista de campos sensíveis que não devem ser logados
const SENSITIVE_FIELDS = [
  'password',
  'token',
  'secret',
  'key',
  'auth',
  'session',
  'cookie',
  'email',
  'phone',
  'ssn',
  'credit_card'
];

/**
 * Verifica se uma URL é de desenvolvimento
 */
export function isDevelopmentUrl(url: string): boolean {
  if (!url) return false;
  return DEVELOPMENT_URL_PATTERNS.some(pattern => pattern.test(url));
}

/**
 * Sanitiza URLs de desenvolvimento substituindo por URLs seguras
 */
export function sanitizeUrl(url: string, fallbackUrl?: string): string {
  if (!url) return fallbackUrl || '';

  if (isDevelopmentUrl(url)) {
    console.warn(`[Security] Development URL detected and sanitized: ${url}`);
    return fallbackUrl || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=400&fit=crop';
  }

  return url;
}

/**
 * Sanitiza um objeto removendo URLs de desenvolvimento
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = { ...obj };

  Object.keys(sanitized).forEach(key => {
    const value = sanitized[key];

    if (typeof value === 'string') {
      // Sanitizar URLs
      if (key.toLowerCase().includes('url') || key.toLowerCase().includes('image')) {
        sanitized[key] = sanitizeUrl(value, undefined);
      }
    } else if (Array.isArray(value)) {
      // Sanitizar arrays recursivamente
      sanitized[key] = value.map(item =>
        typeof item === 'object' ? sanitizeObject(item) : item
      );
    } else if (typeof value === 'object' && value !== null) {
      // Sanitizar objetos recursivamente
      sanitized[key] = sanitizeObject(value);
    }
  });

  return sanitized;
}

/**
 * Remove campos sensíveis de um objeto para logging seguro
 */
export function sanitizeForLogging<T extends Record<string, any>>(obj: T): Partial<T> {
  if (!obj || typeof obj !== 'object') return obj;

  const sanitized = { ...obj };

  Object.keys(sanitized).forEach(key => {
    const lowerKey = key.toLowerCase();

    // Remover campos sensíveis
    if (SENSITIVE_FIELDS.some(field => lowerKey.includes(field))) {
      delete sanitized[key];
      return;
    }

    const value = sanitized[key];

    if (typeof value === 'string') {
      // Sanitizar URLs de desenvolvimento
      if (isDevelopmentUrl(value)) {
        sanitized[key] = '[DEVELOPMENT_URL_SANITIZED]' as any;
      }
    } else if (Array.isArray(value)) {
      // Sanitizar arrays recursivamente
      sanitized[key] = value.map(item =>
        typeof item === 'object' ? sanitizeForLogging(item) : item
      ) as any;
    } else if (typeof value === 'object' && value !== null) {
      // Sanitizar objetos recursivamente
      sanitized[key] = sanitizeForLogging(value) as any;
    }
  });

  return sanitized;
}

/**
 * Console.log seguro que sanitiza dados automaticamente
 */
export function secureLog(message: string, data?: any): void {
  if (process.env.NODE_ENV === 'production') {
    // Em produção, não fazer log de dados sensíveis
    console.log(message);
    return;
  }

  if (data) {
    const sanitizedData = sanitizeForLogging(data);
    console.log(message, sanitizedData);
  } else {
    console.log(message);
  }
}

/**
 * Valida se um perfil de usuário está seguro para exibição pública
 */
export function validateUserProfileSecurity(profile: any): {
  isSecure: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  if (profile.profile_picture_url && isDevelopmentUrl(profile.profile_picture_url)) {
    issues.push('Profile picture contains development URL');
  }

  if (profile.cover_photo_url && isDevelopmentUrl(profile.cover_photo_url)) {
    issues.push('Cover photo contains development URL');
  }

  // Verificar outros campos que podem conter URLs
  const urlFields = ['website', 'portfolio_url', 'social_links'];
  urlFields.forEach(field => {
    const value = profile[field];
    if (typeof value === 'string' && isDevelopmentUrl(value)) {
      issues.push(`${field} contains development URL`);
    } else if (Array.isArray(value)) {
      value.forEach((item, index) => {
        if (typeof item === 'string' && isDevelopmentUrl(item)) {
          issues.push(`${field}[${index}] contains development URL`);
        } else if (typeof item === 'object' && item.url && isDevelopmentUrl(item.url)) {
          issues.push(`${field}[${index}].url contains development URL`);
        }
      });
    }
  });

  return {
    isSecure: issues.length === 0,
    issues
  };
}
