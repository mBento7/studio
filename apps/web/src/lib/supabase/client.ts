"use client";

import { createBrowserClient } from "@supabase/ssr";
import { mockSupabase } from "./mock-client";

// Verificar se as variáveis de ambiente existem antes de criar o cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Log das variáveis de ambiente
console.log('[Supabase Client] URL:', supabaseUrl);
console.log('[Supabase Client] Anon Key:', supabaseAnonKey ? 'Presente' : 'Ausente');

// Verificar se estamos em modo mock
const isMockMode = supabaseUrl?.includes('mock') || supabaseAnonKey?.includes('mock');

// Função para criar o cliente apropriado
function createSupabaseClient() {
  if (isMockMode) {
    console.log('[Supabase Client] 🎭 Modo MOCK ativado - usando cliente simulado');
    console.log('[Supabase Client] Usuários de teste disponíveis:');
    console.log('[Supabase Client] - test@example.com / 123456');
    console.log('[Supabase Client] - admin@whosfy.com / admin123');
    
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

    console.log('[Supabase Client] Cliente real criado com sucesso');
    return createBrowserClient(
      supabaseUrl || '',
      supabaseAnonKey || ''
    );
  }
}

// Exportar o cliente
export const supabase = createSupabaseClient();
