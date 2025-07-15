const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Configuração do Supabase
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function simpleTest() {
  const results = [];
  
  try {
    results.push('=== TESTE DE CONECTIVIDADE SUPABASE ===');
    results.push(`URL: ${supabaseUrl}`);
    results.push('');
    
    // Teste 1: Verificar se consegue acessar profiles
    results.push('1. Testando acesso à tabela profiles...');
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);
      
      if (error) {
        results.push(`❌ Erro: ${error.message}`);
      } else {
        results.push('✅ Tabela profiles acessível');
        results.push(`Registros encontrados: ${data.length}`);
      }
    } catch (err) {
      results.push(`❌ Erro de conexão: ${err.message}`);
    }
    
    results.push('');
    
    // Teste 2: Tentar autenticação
    results.push('2. Testando autenticação...');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: 'test@example.com',
        password: 'testpassword'
      });
      
      if (error) {
        results.push(`⚠️ Erro de autenticação (esperado): ${error.message}`);
      } else {
        results.push(`✅ Login bem-sucedido: ${data.user?.email}`);
      }
    } catch (err) {
      results.push(`❌ Erro na autenticação: ${err.message}`);
    }
    
    results.push('');
    results.push('=== FIM DO TESTE ===');
    
  } catch (error) {
    results.push(`❌ Erro geral: ${error.message}`);
  }
  
  // Salvar resultados em arquivo
  const output = results.join('\n');
  fs.writeFileSync('test-results.txt', output);
  
  // Também exibir no console
  console.log(output);
}

simpleTest();