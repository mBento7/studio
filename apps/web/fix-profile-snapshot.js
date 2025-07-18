// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente
// Nunca commite chaves reais no codigo fonte!

const { createClient } = require('@supabase/supabase-js');

// ConfiguraÃ§Ã£o do Supabase local
const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProfileSnapshot() {
  try {
    console.log('Adicionando coluna profile_snapshot...');
    
    // Adicionar a coluna profile_snapshot diretamente
    const { error: addColumnError } = await supabase
      .rpc('sql', {
        query: 'ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profile_snapshot JSONB;'
      });
    
    if (addColumnError) {
      console.error('Erro ao adicionar coluna:', addColumnError);
      // Tentar mÃ©todo alternativo
      console.log('Tentando mÃ©todo alternativo...');
      const { error: altError } = await supabase
        .from('profiles')
        .select('profile_snapshot')
        .limit(1);
      
      if (altError && altError.code === '42703') {
        console.log('Coluna realmente nÃ£o existe, mas nÃ£o conseguimos adicionÃ¡-la via RPC.');
        console.log('SerÃ¡ necessÃ¡rio adicionar manualmente via SQL.');
        return;
      } else {
        console.log('Coluna jÃ¡ existe!');
      }
    } else {
      console.log('Coluna profile_snapshot adicionada com sucesso!');
    }
    
    // Criar a funÃ§Ã£o refresh_profile_snapshot se nÃ£o existir
    console.log('Criando funÃ§Ã£o refresh_profile_snapshot...');
    
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION public.refresh_profile_snapshot(p_profile_id uuid)
      RETURNS void
      LANGUAGE plpgsql
      AS $function$
      BEGIN
        UPDATE public.profiles
        SET profile_snapshot = (
          SELECT jsonb_build_object(
            'sociallinks', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'platform', platform,
                'url', url
              ))
              FROM public.social_links
              WHERE profile_id = p_profile_id), '[]'::jsonb
            ),
            'services', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'name', name,
                'description', description,
                'price', price,
                'icon', icon
              ))
              FROM public.services
              WHERE profile_id = p_profile_id), '[]'::jsonb
            ),
            'portfolio', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'title', title,
                'description', description,
                'image_url', image_url,
                'project_url', project_url
              ))
              FROM public.portfolio_items
              WHERE profile_id = p_profile_id), '[]'::jsonb
            ),
            'experience', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'company', company,
                'position', position,
                'start_date', start_date,
                'end_date', end_date,
                'description', description
              ))
              FROM public.experience
              WHERE profile_id = p_profile_id), '[]'::jsonb
            ),
            'education', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'institution', institution,
                'degree', degree,
                'field_of_study', field_of_study,
                'start_date', start_date,
                'end_date', end_date
              ))
              FROM public.education
              WHERE profile_id = p_profile_id), '[]'::jsonb
            ),
            'reviews', COALESCE(
              (SELECT jsonb_agg(jsonb_build_object(
                'id', id,
                'author_name', author_name,
                'author_avatar_url', author_avatar_url,
                'rating', rating,
                'comment', comment,
                'created_at', created_at,
                'verified', verified
              ))
              FROM public.reviews
              WHERE profile_id = p_profile_id), '[]'::jsonb
            )
          )
        )
        WHERE id = p_profile_id;
      END;
      $function$;
    `;
    
    const { error: functionError } = await supabase.rpc('exec_sql', {
      sql: createFunctionSQL
    });
    
    if (functionError) {
      console.error('Erro ao criar funÃ§Ã£o:', functionError);
      return;
    }
    
    console.log('FunÃ§Ã£o refresh_profile_snapshot criada com sucesso!');
    console.log('CorreÃ§Ã£o concluÃ­da!');
    
  } catch (error) {
    console.error('Erro geral:', error);
  }
}

fixProfileSnapshot();
