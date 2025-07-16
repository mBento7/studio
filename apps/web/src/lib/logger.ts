/**
 * Sistema de logging seguro para produção
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogConfig {
  enableConsoleInProduction: boolean;
  enableDebugLogs: boolean;
  sensitiveFields: string[];
}

const config: LogConfig = {
  enableConsoleInProduction: false,
  enableDebugLogs: process.env.NODE_ENV !== 'production',
  sensitiveFields: [
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
    'credit_card',
  ],
};

/**
 * Remove campos sensíveis de um objeto para logging
 */
function sanitizeLogData(data: any): any {
  if (!data || typeof data !== 'object') return data;
  
  if (Array.isArray(data)) {
    return data.map(item => sanitizeLogData(item));
  }
  
  const sanitized = { ...data };
  
  Object.keys(sanitized).forEach(key => {
    const lowerKey = key.toLowerCase();
    
    // Remover campos sensíveis
    if (config.sensitiveFields.some(field => lowerKey.includes(field))) {
      sanitized[key] = '[REDACTED]';
      return;
    }
    
    // Sanitizar objetos aninhados
    if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeLogData(sanitized[key]);
    }
  });
  
  return sanitized;
}

/**
 * Logger seguro que respeita configurações de produção
 */
export const logger = {
  debug: (message: string, data?: any) => {
    if (!config.enableDebugLogs) return;
    
    if (process.env.NODE_ENV === 'production' && !config.enableConsoleInProduction) {
      return;
    }
    
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.log(`[DEBUG] ${message}`, sanitizedData);
  },
  
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production' && !config.enableConsoleInProduction) {
      return;
    }
    
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.info(`[INFO] ${message}`, sanitizedData);
  },
  
  warn: (message: string, data?: any) => {
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.warn(`[WARN] ${message}`, sanitizedData);
  },
  
  error: (message: string, error?: any) => {
    const sanitizedError = error ? sanitizeLogData(error) : undefined;
    console.error(`[ERROR] ${message}`, sanitizedError);
  },
  
  // Método especial para logs de autenticação (mais restritivo)
  auth: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production') {
      // Em produção, apenas log de erros de auth
      return;
    }
    
    // Em desenvolvimento, sanitizar dados sensíveis
    const sanitizedData = data ? {
      ...sanitizeLogData(data),
      email: data.email ? data.email.replace(/(.{2}).*(@.*)/, '$1***$2') : undefined,
    } : undefined;
    
    console.log(`[AUTH] ${message}`, sanitizedData);
  },
  
  // Método para logs de perfil (sanitiza dados do usuário)
  profile: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'production' && !config.enableConsoleInProduction) {
      return;
    }
    
    const sanitizedData = data ? sanitizeLogData(data) : undefined;
    console.log(`[PROFILE] ${message}`, sanitizedData);
  },
};

/**
 * Função para configurar o logger em runtime
 */
export function configureLogger(newConfig: Partial<LogConfig>) {
  Object.assign(config, newConfig);
}

/**
 * Wrapper para console.log que é automaticamente desabilitado em produção
 */
export function devLog(message: string, ...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    console.log(message, ...args.map(arg => sanitizeLogData(arg)));
  }
}