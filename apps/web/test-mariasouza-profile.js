// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente
// Nunca commite chaves reais no codigo fonte!

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function testMariasouzaProfile() {
  try {
    console.log('ðŸ” Testando perfil mariasouza...\n');

    // Test 1: Buscar perfil por username
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', 'mariasouza')
      .single();

    if (error) {
      console.error('âŒ Erro ao buscar perfil:', error);
      return;
    }

    console.log('âœ… Perfil encontrado:');
    console.log(`   Nome: ${profile.full_name}`);
    console.log(`   Username: ${profile.username}`);
    console.log(`   Email: ${profile.email}`);
    console.log(`   Categoria: ${profile.category}`);
    console.log(`   Plano: ${profile.plan}`);
    console.log(`   Layout: ${profile.layout_template_id}`);
    console.log(`   Bio: ${profile.bio}`);
    console.log(`   LocalizaÃ§Ã£o: ${JSON.stringify(profile.location)}`);
    console.log(`   Skills: ${profile.skills?.join(', ')}`);

    // Test 2: Verificar imagens
    console.log('\nðŸ“¸ Verificando imagens:');
    console.log(`   Foto de perfil: ${profile.profile_picture_url ? 'âœ… Presente' : 'âŒ Ausente'}`);
    if (profile.profile_picture_url) {
      console.log(`   URL: ${profile.profile_picture_url}`);
    }
    console.log(`   Foto de capa: ${profile.cover_photo_url ? 'âœ… Presente' : 'âŒ Ausente'}`);
    if (profile.cover_photo_url) {
      console.log(`   URL: ${profile.cover_photo_url}`);
    }

    // Test 3: Verificar dados relacionados
    console.log('\nðŸ”— Verificando dados relacionados:');

    // ExperiÃªncia
    const { data: experience } = await supabase
      .from('experience')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   ExperiÃªncia: ${experience?.length || 0} registros`);

    // EducaÃ§Ã£o
    const { data: education } = await supabase
      .from('education')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   EducaÃ§Ã£o: ${education?.length || 0} registros`);

    // Links sociais
    const { data: socialLinks } = await supabase
      .from('social_links')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   Links sociais: ${socialLinks?.length || 0} registros`);

    // Test 4: Verificar se o perfil estÃ¡ completo
    const hasProfileImage = !!profile.profile_picture_url;
    const hasCoverImage = !!profile.cover_photo_url;
    const hasBio = !!profile.bio;
    const hasCategory = !!profile.category;
    const hasSkills = profile.skills && profile.skills.length > 0;

    console.log('\nðŸ“Š Status do perfil:');
    console.log(`   Foto de perfil: ${hasProfileImage ? 'âœ…' : 'âŒ'}`);
    console.log(`   Foto de capa: ${hasCoverImage ? 'âœ…' : 'âŒ'}`);
    console.log(`   Bio: ${hasBio ? 'âœ…' : 'âŒ'}`);
    console.log(`   Categoria: ${hasCategory ? 'âœ…' : 'âŒ'}`);
    console.log(`   Skills: ${hasSkills ? 'âœ…' : 'âŒ'}`);

    const completenessScore = [hasProfileImage, hasCoverImage, hasBio, hasCategory, hasSkills].filter(Boolean).length;
    const percentage = (completenessScore / 5) * 100;

    console.log(`\nðŸŽ¯ Perfil ${percentage}% completo (${completenessScore}/5)`);

    if (percentage === 100) {
      console.log('ðŸŽ‰ Perfil mariasouza estÃ¡ completo e pronto para uso!');
      console.log('ðŸŒ Acesse: http://localhost:3000/profile/mariasouza');
    } else {
      console.log('âš ï¸ Alguns dados ainda precisam ser adicionados ao perfil.');
    }

  } catch (error) {
    console.error('âŒ Erro no teste:', error);
  }
}

testMariasouzaProfile(); 
