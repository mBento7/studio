// SEGURANCA: Chaves JWT removidas e substituidas por variaveis de ambiente
// Nunca commite chaves reais no codigo fonte!

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function updateMariasouzaProfile() {
  try {
    // First, let's find the user by username
    const { data: profiles, error: searchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', 'mariasouza')
      .single();

    if (searchError) {
      console.error('Erro ao buscar perfil:', searchError);
      return;
    }

    let profileId = profiles?.id;

    if (!profiles) {
      console.log('Perfil mariasouza nÃ£o encontrado. Criando...');
      
      // Create the profile if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          username: 'mariasouza',
          full_name: 'Maria Souza',
          email: 'mariasouza@exemplo.com',
          bio: 'Profissional criativa com experiÃªncia em design e desenvolvimento. Apaixonada por criar soluÃ§Ãµes inovadoras e experiÃªncias Ãºnicas.',
          category: 'Designer & Desenvolvedora',
          profile_picture_url: 'https://randomuser.me/api/portraits/women/32.jpg',
          cover_photo_url: 'https://images.unsplash.com/photo-1579547623912-d11e54051061?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          plan: 'standard',
          layout_template_id: 'standard',
          is_available: true,
          location: { city: 'SÃ£o Paulo', country: 'Brasil' },
          skills: ['Design', 'UI/UX', 'React', 'TypeScript', 'Figma', 'Photoshop']
        })
        .select()
        .single();

      if (createError) {
        console.error('Erro ao criar perfil:', createError);
        return;
      }

      profileId = newProfile.id;
      console.log('Perfil mariasouza criado com sucesso!');
      console.log('Dados do perfil:', newProfile);
    } else {
      console.log('Perfil mariasouza encontrado. Atualizando...');
      
      // Update the existing profile with images
      const { data: updatedProfile, error: updateError } = await supabase
        .from('profiles')
        .update({
          profile_picture_url: 'https://randomuser.me/api/portraits/women/32.jpg',
          cover_photo_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
          bio: 'Profissional criativa com experiÃªncia em design e desenvolvimento. Apaixonada por criar soluÃ§Ãµes inovadoras e experiÃªncias Ãºnicas.',
          category: 'Designer & Desenvolvedora',
          plan: 'standard',
          layout_template_id: 'standard',
          is_available: true,
          location: { city: 'SÃ£o Paulo', country: 'Brasil' },
          skills: ['Design', 'UI/UX', 'React', 'TypeScript', 'Figma', 'Photoshop']
        })
        .eq('username', 'mariasouza')
        .select()
        .single();

      if (updateError) {
        console.error('Erro ao atualizar perfil:', updateError);
        return;
      }

      profileId = updatedProfile.id;
      console.log('Perfil mariasouza atualizado com sucesso!');
      console.log('Dados do perfil:', updatedProfile);
    }

    // PORTFÃ“LIO
    await supabase.from('portfolio_items').delete().eq('profile_id', profileId);
    await supabase.from('portfolio_items').insert([
      {
        profile_id: profileId,
        image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400',
        caption: 'Identidade Visual para Startup',
        description: 'Projeto de branding e identidade visual para startup de tecnologia.'
      },
      {
        profile_id: profileId,
        image_url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400',
        caption: 'Website Institucional',
        description: 'Desenvolvimento de site institucional para ONG.'
      },
      {
        profile_id: profileId,
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400',
        caption: 'Campanha Digital',
        description: 'CriaÃ§Ã£o de peÃ§as para campanha digital de grande alcance.'
      }
    ]);

    // SERVIÃ‡OS
    await supabase.from('services').delete().eq('profile_id', profileId);
    await supabase.from('services').insert([
      {
        profile_id: profileId,
        name: 'CriaÃ§Ã£o de Logotipo',
        description: 'Desenvolvimento de identidade visual profissional.'
      },
      {
        profile_id: profileId,
        name: 'Design de Posts',
        description: 'Artes para redes sociais.'
      },
      {
        profile_id: profileId,
        name: 'Consultoria de Branding',
        description: 'OrientaÃ§Ã£o estratÃ©gica para marcas.'
      }
    ]);

    // EXPERIÃŠNCIA
    await supabase.from('experience').delete().eq('profile_id', profileId);
    await supabase.from('experience').insert([
      {
        profile_id: profileId,
        title: 'Designer SÃªnior',
        company: 'Tech Solutions',
        years: '2022-Atual'
      },
      {
        profile_id: profileId,
        title: 'UI/UX Designer',
        company: 'Startup InovaÃ§Ã£o',
        years: '2020-2022'
      }
    ]);

    // EDUCAÃ‡ÃƒO
    await supabase.from('education').delete().eq('profile_id', profileId);
    await supabase.from('education').insert([
      {
        profile_id: profileId,
        degree: 'Bacharel em Design',
        institution: 'Universidade de SÃ£o Paulo',
        years: '2016-2020'
      }
    ]);

    // LINKS SOCIAIS
    await supabase.from('social_links').delete().eq('profile_id', profileId);
    await supabase.from('social_links').insert([
      {
        profile_id: profileId,
        platform: 'linkedin',
        url: 'https://linkedin.com/in/mariasouza'
      },
      {
        profile_id: profileId,
        platform: 'instagram',
        url: 'https://instagram.com/mariasouza'
      },
      {
        profile_id: profileId,
        platform: 'github',
        url: 'https://github.com/mariasouza'
      }
    ]);

    // FAQ
    await supabase.from('faq').delete().eq('profile_id', profileId);
    await supabase.from('faq').insert([
      {
        profile_id: profileId,
        question: 'Como funciona o processo de criaÃ§Ã£o?',
        answer: 'O processo Ã© colaborativo, com reuniÃµes para entender as necessidades e entregas em etapas.'
      },
      {
        profile_id: profileId,
        question: 'Quais sÃ£o as formas de pagamento?',
        answer: 'Aceito transferÃªncia, boleto e cartÃ£o de crÃ©dito.'
      }
    ]);

    // DEPOIMENTOS (REVIEWS)
    await supabase.from('reviews').delete().eq('profile_id', profileId);
    await supabase.from('reviews').insert([
      {
        profile_id: profileId,
        author_name: 'JoÃ£o Pedro',
        author_avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        comment: 'Maria Ã© uma profissional incrÃ­vel! Recomendo muito.',
        created_at: new Date().toISOString()
      },
      {
        profile_id: profileId,
        author_name: 'Marina Souza',
        author_avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        comment: 'Trabalho impecÃ¡vel e entrega rÃ¡pida.',
        created_at: new Date().toISOString()
      }
    ]);

    // BANNER PREMIUM (opcional, para referÃªncia)
    await supabase.from('profiles').update({
      premium_banner: {
        title: 'Consultoria Premium',
        description: 'Transforme sua marca com uma consultoria personalizada! Agende uma sessÃ£o.',
        imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600',
        ctaText: 'Agendar agora',
        ctaLink: '/contato'
      }
    }).eq('id', profileId);

    console.log('âœ… Perfil mariasouza atualizado com todos os exemplos de itens do plano standard!');
    console.log('ðŸ“¸ Foto de perfil: https://randomuser.me/api/portraits/women/32.jpg');
    console.log('ðŸ–¼ï¸ Foto de capa: https://images.unsplash.com/photo-1579547623912-d11e54051061?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    console.log('ðŸŒ Acesse: http://localhost:3000/profile/mariasouza');

  } catch (error) {
    console.error('Erro geral:', error);
  }
}

updateMariasouzaProfile(); 
