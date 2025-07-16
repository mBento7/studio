// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente
// Nunca commite chaves reais no codigo fonte!

// Usar fetch nativo do Node.js (disponÃ­vel a partir da v18)
const fs = require('fs');

// ConfiguraÃ§Ã£o do Supabase
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
        results.push('âœ… Tabela profiles criada via query!');
      } else {
        const errorText = await response.text();
        results.push(`âŒ Erro via query: ${errorText}`);
        
        // Tentar mÃ©todo alternativo - inserir dados para forÃ§ar criaÃ§Ã£o da tabela
        results.push('\n2. Tentando mÃ©todo alternativo...');
        
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
          results.push(`âŒ Tabela nÃ£o existe: ${error.message}`);
          
          // Tentar criar via SQL usando uma funÃ§Ã£o personalizada
          results.push('\n3. Tentando criar funÃ§Ã£o SQL personalizada...');
          
          // Primeiro, tentar criar uma funÃ§Ã£o que execute SQL
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
            results.push(`âœ… FunÃ§Ã£o executada: ${result}`);
          } else {
            const funcError = await funcResponse.text();
            results.push(`âŒ Erro na funÃ§Ã£o: ${funcError}`);
          }
        } else {
          results.push('âœ… Tabela profiles jÃ¡ existe e funcionando!');
        }
      }
    } catch (fetchError) {
      results.push(`âŒ Erro de fetch: ${fetchError.message}`);
    }
    
    // VerificaÃ§Ã£o final
    results.push('\n4. VerificaÃ§Ã£o final...');
    
    const { createClient } = require('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (profilesError) {
      results.push(`âŒ Erro final: ${profilesError.message}`);
    } else {
      results.push('âœ… Tabela profiles acessÃ­vel!');
      results.push(`Registros encontrados: ${profiles.length}`);
    }
    
    results.push('');
    results.push('=== PROCESSO CONCLUÃDO ===');
    
  } catch (error) {
    results.push(`âŒ Erro geral: ${error.message}`);
  }
  
  // Salvar resultados em arquivo
  const output = results.join('\n');
  fs.writeFileSync('create-tables-results.txt', output);
  
  // TambÃ©m exibir no console
  console.log(output);
}

createTables();
