"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/types";

// Esta função substitui 'getMockUserByUsername'
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  // Busca real no Supabase
  const supabase = await createClient();
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*, profile_snapshot')
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    console.error(`Perfil não encontrado para o username: ${username}`, profileError);
    return null;
  }

  // Merge automático dos campos do snapshot para o objeto principal
  const snapshot = profile.profile_snapshot || {};
  const merged = { ...profile, ...snapshot };

  // Busca dados agregados usando SEMPRE o id do merged
  const [socialLinksRes, couponsRes, reviewsRes, faqsRes, portfolioRes] = await Promise.all([
    supabase.from('social_links').select('*').eq('profile_id', merged.id),
    supabase.from('coupons').select('*').eq('username', merged.username), // Alterado para buscar por username
    supabase.from('reviews').select('*').eq('reviewed_user_id', merged.id).eq('is_public', true),
    supabase.from('faq').select('*').eq('profile_id', merged.id),
    supabase.from('portfolio_items').select('*').eq('profile_id', merged.id), // <-- ADICIONADO
  ]);

  // Log detalhado do resultado bruto da query de reviews
  console.log('🔍 DEBUG - reviewsRes.data:', reviewsRes.data);

  // Mapeamento correto dos campos de reviews
  const reviews = (reviewsRes.data || []).map((rev) => ({
    id: rev.id,
    authorName: rev.author_name || rev.profiles?.full_name || 'Anônimo',
    authorAvatarUrl: rev.author_avatar_url || rev.profiles?.avatar_url || '',
    rating: rev.rating,
    comment: rev.comment,
    createdAt: rev.created_at,
    // outros campos se necessário
  }));

  const socialLinks = socialLinksRes.data || [];
  const coupons = couponsRes.data || [];
  const faqs = faqsRes.data || [];
  const portfolio = (portfolioRes.data || []).map((item) => ({
    id: String(item.id),
    imageUrl: item.image_url,
    caption: item.caption,
    description: item.description,
    externalLink: item.external_link,
  }));

  // Log para depuração
  console.log('DEBUG FINAL userProfile.reviews:', reviews);

  // Monta o objeto UserProfile final, agora com todos os arrays disponíveis na raiz
  const userProfile: UserProfile = {
    id: merged.id,
    username: merged.username,
    name: merged.full_name || merged.name || 'Nome não definido',
    email: merged.email,
    phone: merged.phone,
    whatsappNumber: merged.whatsapp_number,
    bio: merged.bio || '',
    profile_picture_url: merged.profile_picture_url || '',
    cover_photo_url: merged.cover_photo_url || '',
    category: merged.category || 'Categoria não definida',
    plan: merged.plan as 'free' | 'standard' | 'premium' || 'free',
    layoutTemplateId: merged.layout_template_id || merged.layoutTemplateId,
    isAvailable: merged.is_available,
    location: merged.location || { city: '', country: '' },
    skills: merged.skills || [],
    premiumBanner: merged.premium_banner || undefined,
    sociallinks: socialLinks,
    services: (merged.services || []).map((s: any) => ({ ...s, icon: s.icon || undefined })),
    portfolio: portfolio,
    experience: (merged.experience || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })),
    education: (merged.education || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })),
    reviews: reviews, // <-- sempre o array reviews do banco, nunca do snapshot
    coupons: coupons,
    faqs: faqs,
    youtubeVideoUrl: merged.youtube_video_url || merged.youtubeVideoUrl,
    youtubeVideoTitle: merged.youtube_video_title || merged.youtubeVideoTitle,
    youtubeVideoDescription: merged.youtube_video_description || merged.youtubeVideoDescription,
    stories: merged.stories || [],
    // Adiciona campos detalhados de endereço e maps_link
    maps_link: merged.maps_link,
    endereco_rua: merged.endereco_rua,
    endereco_numero: merged.endereco_numero,
    endereco_complemento: merged.endereco_complemento,
    endereco_bairro: merged.endereco_bairro,
    endereco_cidade: merged.endereco_cidade,
    endereco_estado: merged.endereco_estado,
    endereco_cep: merged.endereco_cep,
  };

  // Se for o usuário joaosilva, insere portfólio de exemplo
  if (userProfile.username === 'joaosilva') {
    userProfile.plan = 'premium';
    userProfile.layoutTemplateId = 'premium';
    userProfile.premiumBanner = {
      title: 'Transforme seu negócio com João Silva',
      description: 'Soluções digitais sob medida para você crescer mais rápido. Peça seu orçamento premium!',
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
      ctaText: 'Solicitar orçamento',
    };
    userProfile.portfolio = [
      {
        id: '1',
        caption: 'Website Institucional',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        description: 'Site institucional moderno, responsivo e otimizado para SEO.',
        externalLink: 'https://exemplo.com/projeto1',
      },
      {
        id: '2',
        caption: 'Campanha de Oferta',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        description: 'Landing page de alta conversão para campanha promocional.',
        externalLink: 'https://exemplo.com/projeto2',
      },
      {
        id: '3',
        caption: 'Anúncio Patrocinado',
        imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        description: 'Criativo para mídia paga com foco em engajamento.',
        externalLink: 'https://exemplo.com/projeto3',
      },
      {
        id: '4',
        caption: 'Landing Page Responsiva',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        description: 'Página responsiva para captação de leads.',
        externalLink: 'https://exemplo.com/projeto4',
      },
    ];
    // Adiciona propriedades do YouTube
    userProfile.youtubeVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    userProfile.youtubeVideoTitle = 'Apresentação do João Silva';
    userProfile.youtubeVideoDescription = 'Conheça o trabalho e os diferenciais do João Silva neste vídeo especial.';
  }

  // Se for o usuário pedrosantos, insere dados de exemplo
  if (userProfile.username === 'pedrosantos') {
    userProfile.name = 'Pedro Santos';
    userProfile.bio = 'Especialista em marketing digital e criação de conteúdo. Ajudo empresas a crescerem online.';
    userProfile.category = 'Marketing Digital';
    userProfile.profile_picture_url = 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&w=200&q=80';
    userProfile.cover_photo_url = '';
    userProfile.phone = '+5511987654321';
    userProfile.whatsappNumber = '+5511987654321';
    userProfile.location = { city: 'São Paulo', country: 'Brasil' };
    userProfile.plan = 'free';
    userProfile.layoutTemplateId = 'free';

    // Removendo premiumBanner, reviews e youtubeVideoUrl/Title/Description para o plano FREE
    userProfile.premiumBanner = undefined;
    userProfile.reviews = [];
    userProfile.youtubeVideoUrl = undefined;
    userProfile.youtubeVideoTitle = undefined;
    userProfile.youtubeVideoDescription = undefined;

    userProfile.sociallinks = [
      { id: 'sl1', platform: 'linkedin', url: 'https://www.linkedin.com/in/pedrosantos' },
      { id: 'sl2', platform: 'instagram', url: 'https://www.instagram.com/pedrosantos_marketing' },
      { id: 'sl3', platform: 'website', url: 'https://www.pedrosantos.com.br' },
    ];

    userProfile.services = [
      { id: 's1', name: 'Consultoria SEO', description: 'Otimização para motores de busca.', icon: 'search' },
      { id: 's2', name: 'Gestão de Tráfego Pago', description: 'Campanhas no Google Ads e Meta Ads.', icon: 'ad' },
      { id: 's3', name: 'Criação de Conteúdo', description: 'Textos e vídeos para engajamento.', icon: 'content' },
      { id: 's4', name: 'Social Media', description: 'Gestão de redes sociais para empresas.', icon: 'instagram' },
    ];

    userProfile.portfolio = [
      {
        id: 'p1',
        caption: 'Campanha de Marketing para Startup',
        imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80',
        description: 'Campanha de lançamento de produto para startup de tecnologia, com foco em redes sociais e mídia paga.',
        externalLink: 'https://exemplo.com/portfolio/startup-campanha',
      },
      {
        id: 'p2',
        caption: 'Website para Consultoria Financeira',
        imageUrl: 'https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg?auto=compress&w=600&q=80',
        description: 'Desenvolvimento de site institucional moderno e responsivo para consultoria financeira.',
        externalLink: 'https://exemplo.com/portfolio/consultoria-site',
      },
      {
        id: 'p3',
        caption: 'Gestão de Redes Sociais para Restaurante',
        imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
        description: 'Criação de conteúdo e gestão de campanhas para restaurante local, aumentando o engajamento em 40%.',
        externalLink: 'https://exemplo.com/portfolio/restaurante-social',
      },
      {
        id: 'p4',
        caption: 'Landing Page para Evento',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        description: 'Landing page criada para evento corporativo, com foco em conversão de inscrições.',
        externalLink: 'https://exemplo.com/portfolio/evento-landing',
      },
    ];

    userProfile.experience = [
      { id: 'e1', title: 'Analista de Marketing Digital Sênior', company: 'Agência Alpha', startDate: '2020-03-01', endDate: null, description: 'Responsável por estratégias de SEO e SEM para grandes contas.' },
      { id: 'e2', title: 'Coordenador de Conteúdo', company: 'Startup Beta', startDate: '2017-06-01', endDate: '2020-02-28', description: 'Liderança da equipe de criação de conteúdo e blog.' },
    ];

    userProfile.education = [
      { id: 'edu1', degree: 'Pós-graduação em Marketing Digital', institution: 'Universidade XYZ', startDate: '2019-01-01', endDate: '2020-12-31', description: 'Especialização em estratégias digitais avançadas.' },
      { id: 'edu2', degree: 'Bacharelado em Comunicação Social', institution: 'Faculdade ABC', startDate: '2013-02-01', endDate: '2016-12-31', description: 'Formação abrangente em comunicação e publicidade.' },
    ];

    // Garantir que não há campos exclusivos de planos pagos
    userProfile.coupons = undefined;
    userProfile.stories = undefined;
    userProfile.themeColor = undefined;
    userProfile.calendlyUrl = undefined;
  }

  return userProfile;
}

export async function refreshProfileSnapshot(profileId: string) {
  const supabase = await createClient();
  const { error } = await supabase.rpc('refresh_profile_snapshot', { p_profile_id: profileId });

  if (error) {
    console.error("Erro ao atualizar snapshot do perfil:", error);
    throw error;
  }
}

// Busca perfil completo por ID, incluindo dados relacionados
export async function getUserProfileById(userId: string): Promise<UserProfile | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('profiles')
    .select('*, profile_snapshot')
    .eq('id', userId)
    .single();

  if (error || !data) {
    console.error('Erro ao buscar perfil por ID:', error);
    return null;
  }

  // Padroniza o objeto para UserProfile
  const userProfile: UserProfile = {
    ...data,
    name: data.full_name,
    isAvailable: data.is_available,
    profile_picture_url: data.profile_picture_url,
    cover_photo_url: data.cover_photo_url,
    whatsappNumber: data.whatsapp_number,
    sociallinks: (() => {
      // Tenta pegar do snapshot, depois do próprio profile
      if (data.profile_snapshot?.sociallinks) {
        return data.profile_snapshot.sociallinks;
      }
      if (data.sociallinks) {
        if (typeof data.sociallinks === 'string') {
          try {
            const arr = JSON.parse(data.sociallinks);
            return Array.isArray(arr) ? arr : [];
          } catch {
            return [];
          }
        }
        if (Array.isArray(data.sociallinks)) {
          return data.sociallinks;
        }
      }
      return [];
    })(),
    services: (data.profile_snapshot?.services || []).map((s: any) => ({ ...s, icon: s.icon || undefined })),
    portfolio: (data.profile_snapshot?.portfolio || []),
    experience: (data.profile_snapshot?.experience || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })),
    education: (data.profile_snapshot?.education || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })),
    reviews: (data.profile_snapshot?.reviews || []),
    skills: data.skills ?? [],
  };

  return userProfile;
}

// Atualiza o perfil do usuário e dados relacionados
export async function updateUserProfile(userId: string, data: Partial<UserProfile>) {
  const supabase = await createClient();

  // Separa os dados principais dos relacionamentos
  const {
    name,
    isAvailable,
    profile_picture_url,
    cover_photo_url,
    whatsappNumber,
    sociallinks = [],
    services = [],
    portfolio = [],
    experience = [],
    education = [],
    reviews = [],
    ...rest
  } = data;

  // Atualiza o perfil principal
  const updateData = {
    ...rest,
    full_name: name,
    is_available: isAvailable,
    profile_picture_url: profile_picture_url,
    cover_photo_url: cover_photo_url,
    whatsapp_number: whatsappNumber,
  };

  console.log('Dados enviados para profiles:', updateData);

  const { error: profileError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId);

  if (profileError) {
    throw profileError;
  }

  // Atualiza services
  for (const service of services) {
    if (service.id) {
      await supabase.from('services').update(service).eq('id', service.id);
    } else {
      await supabase.from('services').insert({ ...service, profile_id: userId });
    }
  }
  // Atualiza portfolio
  for (const item of portfolio) {
    if (item.id) {
      await supabase.from('portfolio_items').update(item).eq('id', item.id);
    } else {
      await supabase.from('portfolio_items').insert({ ...item, profile_id: userId });
    }
  }
  // Atualiza experience
  for (const exp of experience) {
    if (exp.id) {
      await supabase.from('experience').update(exp).eq('id', exp.id);
    } else {
      await supabase.from('experience').insert({ ...exp, profile_id: userId });
    }
  }
  // Atualiza education
  for (const edu of education) {
    if (edu.id) {
      await supabase.from('education').update(edu).eq('id', edu.id);
    } else {
      await supabase.from('education').insert({ ...edu, profile_id: userId });
    }
  }
  // Atualiza reviews
  for (const review of reviews) {
    if (review.id) {
      await supabase.from('reviews').update(review).eq('id', review.id);
    } else {
      await supabase.from('reviews').insert({ ...review, profile_id: userId });
    }
  }

  return true;
}

// Futuramente, você pode adicionar outras funções de serviço aqui, como:
// export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) { ... }

// ATENÇÃO: Não adicione fallback para mocks nesta função.
// Para um projeto escalável e robusto, todos os perfis públicos devem estar cadastrados no banco de dados real (Supabase).
// Use mocks apenas em páginas de exemplo, landing page ou testes locais, nunca em rotas públicas ou produção.

// Busca múltiplos perfis reais do Supabase
export async function getAllUserProfiles(limit = 20): Promise<UserProfile[]> {
  const supabase = await createClient();
  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*, profile_snapshot')
    .limit(limit);

  if (error || !profiles) {
    console.error('Erro ao buscar todos os perfis:', error);
    return [];
  }

  return profiles.map(profile => {
    // Certifique-se de que cada objeto retornado é um UserProfile completo
    const userProfile: UserProfile = {
      id: profile.id,
      username: profile.username,
      name: profile.full_name || 'Nome não definido',
      email: profile.email,
      phone: profile.phone,
      whatsappNumber: profile.whatsapp_number,
      bio: profile.bio || '',
      profile_picture_url: profile.profile_picture_url || '',
      cover_photo_url: profile.cover_photo_url || '',
      category: profile.category || 'Categoria não definida',
      plan: profile.plan as 'free' | 'standard' | 'premium' || 'free',
      layoutTemplateId: profile.layout_template_id,
      isAvailable: profile.is_available,
      location: profile.location || { city: '', country: '' },
      skills: profile.skills || [],
      premiumBanner: profile.premium_banner || undefined,
      sociallinks: (() => {
        // Tenta pegar do snapshot, depois do próprio profile
        if (profile.profile_snapshot?.sociallinks) {
          return profile.profile_snapshot.sociallinks;
        }
        if (profile.sociallinks) {
          if (typeof profile.sociallinks === 'string') {
            try {
              const arr = JSON.parse(profile.sociallinks);
              return Array.isArray(arr) ? arr : [];
            } catch {
              return [];
            }
          }
          if (Array.isArray(profile.sociallinks)) {
            return profile.sociallinks;
          }
        }
        return [];
      })() as UserProfile['sociallinks'],
      services: (profile.profile_snapshot?.services || []).map((s: any) => ({ ...s, icon: s.icon || undefined })) as UserProfile['services'],
      portfolio: (profile.profile_snapshot?.portfolio || []) as UserProfile['portfolio'],
      experience: (profile.profile_snapshot?.experience || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })) as UserProfile['experience'],
      education: (profile.profile_snapshot?.education || []).map((e: any) => ({ ...e, startDate: e.start_date || undefined, endDate: e.end_date || undefined })) as UserProfile['education'],
      reviews: (profile.profile_snapshot?.reviews || []) as UserProfile['reviews'],
    };
    return userProfile;
  });
}
