// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente
// Nunca commite chaves reais no codigo fonte!

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, // Exemplo: https://xxxx.supabase.co
  process.env.SUPABASE_SERVICE_ROLE_KEY // Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
)

async function criarUsuarios() {
  const usuarios = [
    {
      email: 'joaosilva@exemplo.com',
      password: 'Senha123!',
      user_metadata: { full_name: 'JoÃ£o Silva', username: 'joaosilva' }
    },
    {
      email: 'mariasouza@exemplo.com',
      password: 'Senha123!',
      user_metadata: { full_name: 'Maria Souza', username: 'mariasouza' }
    },
    {
      email: 'pedrosantos@exemplo.com',
      password: 'Senha123!',
      user_metadata: { full_name: 'Pedro Santos', username: 'pedrosantos' }
    }
  ];

  for (const usuario of usuarios) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: usuario.email,
      password: usuario.password,
      email_confirm: true,
      user_metadata: usuario.user_metadata
    });
    if (error) {
      console.error(`Erro ao criar ${usuario.email}:`, error.message);
    } else {
      console.log(`UsuÃ¡rio criado: ${usuario.email}`);
    }
  }
}

criarUsuarios();
