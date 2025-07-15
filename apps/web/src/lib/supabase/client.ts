"use client";

import { createBrowserClient } from "@supabase/ssr";

// Verificar se as variáveis de ambiente existem antes de criar o cliente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug: Log das variáveis de ambiente
console.log('[Supabase Client] URL:', supabaseUrl);
console.log('[Supabase Client] Anon Key:', supabaseAnonKey ? 'Presente' : 'Ausente');

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

export const supabase = createBrowserClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

console.log('[Supabase Client] Cliente criado com sucesso');
