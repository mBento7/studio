"use client";

import { createBrowserClient } from "@supabase/ssr";
import { mockSupabase } from "./mock-client";
import { logger } from '@/lib/logger';

// Verificar se as variáveis de ambiente existem antes de criar o cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Log das variáveis de ambiente
logger.debug('Supabase Client configuração', { 
  hasUrl: !!supabaseUrl, 
  hasAnonKey: !!supabaseAnonKey 
});

// Verificar se estamos em modo mock
const isMockMode = supabaseUrl?.includes('mock') || supabaseAnonKey?.includes('mock');

// Função para criar o cliente apropriado
function createSupabaseClient() {
  if (isMockMode) {
    logger.info('Modo MOCK ativado - usando cliente simulado');
    logger.info('Usuários de teste disponíveis: test@example.com, admin@whosfy.com');
    
    return mockSupabase;
  } else {
    // Durante o build, permitir valores vazios, mas validar em runtime
    if (typeof window !== 'undefined' && (!supabaseUrl || !supabaseAnonKey)) {
      console.error('[Supabase Client] Variáveis de ambiente faltando:', {
        url: supabaseUrl,
        key: supabaseAnonKey ? 'Presente' : 'Ausente'
      });
      throw new Error('Missing Supabase environment variables');
    }

    // Verificar se a URL é válida
    if (typeof window !== 'undefined' && supabaseUrl && !supabaseUrl.startsWith('http')) {
      console.error('[Supabase Client] URL inválida:', supabaseUrl);
      throw new Error('Invalid Supabase URL format');
    }

    logger.info('Cliente Supabase real criado com sucesso');
    return createBrowserClient(
      supabaseUrl || '',
      supabaseAnonKey || ''
    );
  }
}

// Exportar o cliente
export const supabase = createSupabaseClient();
