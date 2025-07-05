import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://wkwhvjsnqsognjorjsgf.supabase.co', // Exemplo: https://xxxx.supabase.co
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd2h2anNucXNvZ25qb3Jqc2dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAxOTMxMSwiZXhwIjoyMDY1NTk1MzExfQ.HjnU6EwPy1-KXQ8loIZ0i0ojnL6YeI78D4kVzj2-zEI' // Exemplo: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
)

async function criarUsuarios() {
  const usuarios = [
    {
      email: 'joaosilva@exemplo.com',
      password: 'Senha123!',
      user_metadata: { full_name: 'João Silva', username: 'joaosilva' }
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
      console.log(`Usuário criado: ${usuario.email}`);
    }
  }
}

criarUsuarios();