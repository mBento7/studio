import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://wkwhvjsnqsognjorjsgf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd2h2anNucXNvZ25qb3Jqc2dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAxOTMxMSwiZXhwIjoyMDY1NTk1MzExfQ.HjnU6EwPy1-KXQ8loIZ0i0ojnL6YeI78D4kVzj2-zEI'
)

async function testMariasouzaProfile() {
  try {
    console.log('🔍 Testando perfil mariasouza...\n');

    // Test 1: Buscar perfil por username
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', 'mariasouza')
      .single();

    if (error) {
      console.error('❌ Erro ao buscar perfil:', error);
      return;
    }

    console.log('✅ Perfil encontrado:');
    console.log(`   Nome: ${profile.full_name}`);
    console.log(`   Username: ${profile.username}`);
    console.log(`   Email: ${profile.email}`);
    console.log(`   Categoria: ${profile.category}`);
    console.log(`   Plano: ${profile.plan}`);
    console.log(`   Layout: ${profile.layout_template_id}`);
    console.log(`   Bio: ${profile.bio}`);
    console.log(`   Localização: ${JSON.stringify(profile.location)}`);
    console.log(`   Skills: ${profile.skills?.join(', ')}`);

    // Test 2: Verificar imagens
    console.log('\n📸 Verificando imagens:');
    console.log(`   Foto de perfil: ${profile.profile_picture_url ? '✅ Presente' : '❌ Ausente'}`);
    if (profile.profile_picture_url) {
      console.log(`   URL: ${profile.profile_picture_url}`);
    }
    console.log(`   Foto de capa: ${profile.cover_photo_url ? '✅ Presente' : '❌ Ausente'}`);
    if (profile.cover_photo_url) {
      console.log(`   URL: ${profile.cover_photo_url}`);
    }

    // Test 3: Verificar dados relacionados
    console.log('\n🔗 Verificando dados relacionados:');

    // Experiência
    const { data: experience } = await supabase
      .from('experience')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   Experiência: ${experience?.length || 0} registros`);

    // Educação
    const { data: education } = await supabase
      .from('education')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   Educação: ${education?.length || 0} registros`);

    // Links sociais
    const { data: socialLinks } = await supabase
      .from('social_links')
      .select('*')
      .eq('profile_id', profile.id);
    console.log(`   Links sociais: ${socialLinks?.length || 0} registros`);

    // Test 4: Verificar se o perfil está completo
    const hasProfileImage = !!profile.profile_picture_url;
    const hasCoverImage = !!profile.cover_photo_url;
    const hasBio = !!profile.bio;
    const hasCategory = !!profile.category;
    const hasSkills = profile.skills && profile.skills.length > 0;

    console.log('\n📊 Status do perfil:');
    console.log(`   Foto de perfil: ${hasProfileImage ? '✅' : '❌'}`);
    console.log(`   Foto de capa: ${hasCoverImage ? '✅' : '❌'}`);
    console.log(`   Bio: ${hasBio ? '✅' : '❌'}`);
    console.log(`   Categoria: ${hasCategory ? '✅' : '❌'}`);
    console.log(`   Skills: ${hasSkills ? '✅' : '❌'}`);

    const completenessScore = [hasProfileImage, hasCoverImage, hasBio, hasCategory, hasSkills].filter(Boolean).length;
    const percentage = (completenessScore / 5) * 100;

    console.log(`\n🎯 Perfil ${percentage}% completo (${completenessScore}/5)`);

    if (percentage === 100) {
      console.log('🎉 Perfil mariasouza está completo e pronto para uso!');
      console.log('🌐 Acesse: http://localhost:3000/profile/mariasouza');
    } else {
      console.log('⚠️ Alguns dados ainda precisam ser adicionados ao perfil.');
    }

  } catch (error) {
    console.error('❌ Erro no teste:', error);
  }
}

testMariasouzaProfile(); 