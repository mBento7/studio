// Usar fetch nativo do Node.js (disponível a partir da v18)
const fs = require('fs');

// Configuração do Supabase
const supabaseUrl = 'http://127.0.0.1:54321';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

async function createTables() {
  const results = [];
  
  try {
    results.push('=== CRIANDO TABELAS NO SUPABASE ===');
    results.push(`URL: ${supabaseUrl}`);
    results.push('');
    
    // Tentar conectar diretamente ao PostgreSQL via SQL
    results.push('1. Tentando criar tabela profiles via SQL direto...');
    
    // SQL para criar a tabela profiles
    const createProfilesSQL = `
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
    `;
    
    // Tentar usar a API de query direta
    try {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceRoleKey}`,
          'apikey': serviceRoleKey
        },
        body: JSON.stringify({
          query: createProfilesSQL
        })
      });
      
      if (response.ok) {
        results.push('✅ Tabela profiles criada via query!');
      } else {
        const errorText = await response.text();
        results.push(`❌ Erro via query: ${errorText}`);
        
        // Tentar método alternativo - inserir dados para forçar criação da tabela
        results.push('\n2. Tentando método alternativo...');
        
        const { createClient } = require('@supabase/supabase-js');
        const supabase = createClient(supabaseUrl, serviceRoleKey);
        
        // Tentar inserir um registro para ver se a tabela existe
        const { data, error } = await supabase
          .from('profiles')
          .insert({
            username: 'test_user',
            full_name: 'Test User',
            email: 'test@example.com'
          })
          .select();
        
        if (error) {
          results.push(`❌ Tabela não existe: ${error.message}`);
          
          // Tentar criar via SQL usando uma função personalizada
          results.push('\n3. Tentando criar função SQL personalizada...');
          
          // Primeiro, tentar criar uma função que execute SQL
          const createFunctionSQL = `
            CREATE OR REPLACE FUNCTION execute_sql(sql_text text)
            RETURNS text
            LANGUAGE plpgsql
            SECURITY DEFINER
            AS $$
            BEGIN
              EXECUTE sql_text;
              RETURN 'SUCCESS';
            EXCEPTION
              WHEN OTHERS THEN
                RETURN SQLERRM;
            END;
            $$;
          `;
          
          const funcResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/execute_sql`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${serviceRoleKey}`,
              'apikey': serviceRoleKey
            },
            body: JSON.stringify({
              sql_text: createProfilesSQL
            })
          });
          
          if (funcResponse.ok) {
            const result = await funcResponse.text();
            results.push(`✅ Função executada: ${result}`);
          } else {
            const funcError = await funcResponse.text();
            results.push(`❌ Erro na função: ${funcError}`);
          }
        } else {
          results.push('✅ Tabela profiles já existe e funcionando!');
        }
      }
    } catch (fetchError) {
      results.push(`❌ Erro de fetch: ${fetchError.message}`);
    }
    
    // Verificação final
    results.push('\n4. Verificação final...');
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      results.push(`❌ Erro final: ${profilesError.message}`);
    } else {
      results.push('✅ Tabela profiles acessível!');
      results.push(`Registros encontrados: ${profiles.length}`);
    }
    
    results.push('');
    results.push('=== PROCESSO CONCLUÍDO ===');
    
  } catch (error) {
    results.push(`❌ Erro geral: ${error.message}`);
  }
  
  // Salvar resultados em arquivo
  const output = results.join('\n');
  fs.writeFileSync('create-tables-results.txt', output);
  
  // Também exibir no console
  console.log(output);
}

createTables();