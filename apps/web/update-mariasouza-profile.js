import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://wkwhvjsnqsognjorjsgf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indrd2h2anNucXNvZ25qb3Jqc2dmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MDAxOTMxMSwiZXhwIjoyMDY1NTk1MzExfQ.HjnU6EwPy1-KXQ8loIZ0i0ojnL6YeI78D4kVzj2-zEI'
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
      console.log('Perfil mariasouza não encontrado. Criando...');
      
      // Create the profile if it doesn't exist
      const { data: newProfile, error: createError } = await supabase
        .from('profiles')
        .insert({
          username: 'mariasouza',
          full_name: 'Maria Souza',
          email: 'mariasouza@exemplo.com',
          bio: 'Profissional criativa com experiência em design e desenvolvimento. Apaixonada por criar soluções inovadoras e experiências únicas.',
          category: 'Designer & Desenvolvedora',
          profile_picture_url: 'https://randomuser.me/api/portraits/women/32.jpg',
          cover_photo_url: 'https://images.unsplash.com/photo-1579547623912-d11e54051061?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          plan: 'standard',
          layout_template_id: 'standard',
          is_available: true,
          location: { city: 'São Paulo', country: 'Brasil' },
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
          bio: 'Profissional criativa com experiência em design e desenvolvimento. Apaixonada por criar soluções inovadoras e experiências únicas.',
          category: 'Designer & Desenvolvedora',
          plan: 'standard',
          layout_template_id: 'standard',
          is_available: true,
          location: { city: 'São Paulo', country: 'Brasil' },
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

    // PORTFÓLIO
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
        description: 'Criação de peças para campanha digital de grande alcance.'
      }
    ]);

    // SERVIÇOS
    await supabase.from('services').delete().eq('profile_id', profileId);
    await supabase.from('services').insert([
      {
        profile_id: profileId,
        name: 'Criação de Logotipo',
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
        description: 'Orientação estratégica para marcas.'
      }
    ]);

    // EXPERIÊNCIA
    await supabase.from('experience').delete().eq('profile_id', profileId);
    await supabase.from('experience').insert([
      {
        profile_id: profileId,
        title: 'Designer Sênior',
        company: 'Tech Solutions',
        years: '2022-Atual'
      },
      {
        profile_id: profileId,
        title: 'UI/UX Designer',
        company: 'Startup Inovação',
        years: '2020-2022'
      }
    ]);

    // EDUCAÇÃO
    await supabase.from('education').delete().eq('profile_id', profileId);
    await supabase.from('education').insert([
      {
        profile_id: profileId,
        degree: 'Bacharel em Design',
        institution: 'Universidade de São Paulo',
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
        question: 'Como funciona o processo de criação?',
        answer: 'O processo é colaborativo, com reuniões para entender as necessidades e entregas em etapas.'
      },
      {
        profile_id: profileId,
        question: 'Quais são as formas de pagamento?',
        answer: 'Aceito transferência, boleto e cartão de crédito.'
      }
    ]);

    // DEPOIMENTOS (REVIEWS)
    await supabase.from('reviews').delete().eq('profile_id', profileId);
    await supabase.from('reviews').insert([
      {
        profile_id: profileId,
        author_name: 'João Pedro',
        author_avatar_url: 'https://randomuser.me/api/portraits/men/45.jpg',
        rating: 5,
        comment: 'Maria é uma profissional incrível! Recomendo muito.',
        created_at: new Date().toISOString()
      },
      {
        profile_id: profileId,
        author_name: 'Marina Souza',
        author_avatar_url: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        comment: 'Trabalho impecável e entrega rápida.',
        created_at: new Date().toISOString()
      }
    ]);

    // BANNER PREMIUM (opcional, para referência)
    await supabase.from('profiles').update({
      premium_banner: {
        title: 'Consultoria Premium',
        description: 'Transforme sua marca com uma consultoria personalizada! Agende uma sessão.',
        imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600',
        ctaText: 'Agendar agora',
        ctaLink: '/contato'
      }
    }).eq('id', profileId);

    console.log('✅ Perfil mariasouza atualizado com todos os exemplos de itens do plano standard!');
    console.log('📸 Foto de perfil: https://randomuser.me/api/portraits/women/32.jpg');
    console.log('🖼️ Foto de capa: https://images.unsplash.com/photo-1579547623912-d11e54051061?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
    console.log('🌐 Acesse: http://localhost:3000/profile/mariasouza');

  } catch (error) {
    console.error('Erro geral:', error);
  }
}

updateMariasouzaProfile(); 