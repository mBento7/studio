const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Configuração do Supabase
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createTablesDirectly() {
  console.log('🔄 Criando tabelas diretamente...');
  
  try {
    // Criar tabela profiles
    console.log('📄 Criando tabela profiles...');
    const { error: profilesError } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id UUID PRIMARY KEY,
          username TEXT UNIQUE NOT NULL,
          full_name TEXT,
          email TEXT UNIQUE,
          phone TEXT,
          whatsapp_number TEXT,
          bio TEXT,
          profile_picture_url TEXT,
          cover_photo_url TEXT,
          category TEXT,
          plan TEXT DEFAULT 'free'::text,
          layout_template_id TEXT DEFAULT 'default'::text,
          is_available BOOLEAN DEFAULT true,
          stripe_customer_id TEXT,
          location JSONB,
          skills JSONB,
          premium_banner JSONB,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
      `
    });
    
    if (profilesError) {
      console.error('❌ Erro ao criar tabela profiles:', profilesError.message);
    } else {
      console.log('✅ Tabela profiles criada');
    }
    
    // Verificar se as tabelas existem
    console.log('\n🔍 Verificando tabelas...');
    
    const { data: profiles, error: checkError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (checkError) {
      console.error('❌ Erro ao verificar tabela profiles:', checkError.message);
    } else {
      console.log('✅ Tabela profiles acessível');
    }
    
    console.log('\n🎉 Processo concluído!');
    
  } catch (error) {
    console.error('❌ Erro geral:', error.message);
  }
}

createTablesDirectly();