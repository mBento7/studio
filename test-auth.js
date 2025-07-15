const { createClient } = require('@supabase/supabase-js');

// Configuração do Supabase
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testSupabase() {
  console.log('🔍 Testando conectividade com Supabase...');
  console.log('URL:', supabaseUrl);
  
  try {
    // 1. Teste básico de conectividade
    console.log('\n1. Testando conexão básica...');
    const { data: healthCheck, error: healthError } = await supabase
      .from('_realtime')
      .select('*')
      .limit(1);
    
    if (healthError) {
      console.log('⚠️ Erro esperado na tabela _realtime:', healthError.message);
    } else {
      console.log('✅ Conexão básica funcionando');
    }
    
    // 2. Verificar se a tabela profiles existe
    console.log('\n2. Verificando tabela profiles...');
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      console.log('❌ Tabela profiles não existe:', profilesError.message);
      
      // 3. Tentar criar a tabela profiles usando SQL direto
      console.log('\n3. Tentando criar tabela profiles...');
      
      // Usar fetch direto para executar SQL
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey
        },
        body: JSON.stringify({
          sql: `
            CREATE TABLE IF NOT EXISTS public.profiles (
              id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
              username TEXT UNIQUE NOT NULL,
              full_name TEXT,
              email TEXT UNIQUE,
              phone TEXT,
              whatsapp_number TEXT,
              bio TEXT,
              profile_picture_url TEXT,
              cover_photo_url TEXT,
              category TEXT,
              plan TEXT DEFAULT 'free',
              layout_template_id TEXT DEFAULT 'default',
              is_available BOOLEAN DEFAULT true,
              stripe_customer_id TEXT,
              location JSONB,
              skills JSONB,
              premium_banner JSONB,
              created_at TIMESTAMPTZ DEFAULT NOW(),
              updated_at TIMESTAMPTZ DEFAULT NOW()
            );
          `
        })
      });
      
      if (response.ok) {
        console.log('✅ Tabela profiles criada com sucesso!');
        
        // 4. Verificar novamente
        console.log('\n4. Verificando tabela profiles novamente...');
        const { data: newProfiles, error: newProfilesError } = await supabase
          .from('profiles')
          .select('*')
          .limit(1);
        
        if (newProfilesError) {
          console.log('❌ Ainda não consegue acessar profiles:', newProfilesError.message);
        } else {
          console.log('✅ Tabela profiles agora está acessível!');
        }
      } else {
        const errorText = await response.text();
        console.log('❌ Erro ao criar tabela:', errorText);
      }
    } else {
      console.log('✅ Tabela profiles já existe e está acessível');
    }
    
    // 5. Teste de autenticação
    console.log('\n5. Testando autenticação...');
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: 'test@example.com',
      password: 'testpassword'
    });
    
    if (authError) {
      console.log('⚠️ Erro de autenticação (esperado se usuário não existe):', authError.message);
    } else {
      console.log('✅ Autenticação funcionando:', authData.user?.email);
    }
    
    console.log('\n🎉 Teste concluído!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
    console.error('Stack:', error.stack);
  }
}

testSupabase();