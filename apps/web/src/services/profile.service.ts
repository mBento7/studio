"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/types";

// Esta função substitui 'getMockUserByUsername'
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  // Busca real no Supabase
  const supabase = await createClient();
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*, profile_snapshot') // Incluindo o novo campo snapshot
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    console.error(`Perfil não encontrado para o username: ${username}`, profileError);
    return null;
  }

  // 2. Monta o objeto UserProfile final, combinando dados do perfil e do snapshot
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
    
    // Campos JSONB que ainda existem na tabela profiles (location, skills, premium_banner)
    location: profile.location || { city: '', country: '' },
    skills: profile.skills || [],
    premiumBanner: profile.premium_banner || undefined,

    // Dados que agora vêm do profile_snapshot
    socialLinks: (() => {
      if (profile.socialLinks) {
        if (typeof profile.socialLinks === 'string') {
          try {
            const arr = JSON.parse(profile.socialLinks);
            return Array.isArray(arr) ? arr : [];
          } catch {
            return [];
          }
        }
        if (Array.isArray(profile.socialLinks)) {
          return profile.socialLinks;
        }
      }
      // Fallback para profile_snapshot
      return (profile.profile_snapshot?.social_links || []);
    })() as UserProfile['socialLinks'],
    services: (profile.profile_snapshot?.services || []) as UserProfile['services'],
    portfolio: (profile.profile_snapshot?.portfolio || []) as UserProfile['portfolio'],
    experience: (profile.profile_snapshot?.experience || []) as UserProfile['experience'],
    education: (profile.profile_snapshot?.education || []) as UserProfile['education'],
    reviews: (profile.profile_snapshot?.reviews || []) as UserProfile['reviews'],
  };

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
    .select('*, social_links(*), services(*), portfolio_items(*), experience(*), education(*), reviews(*)')
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
    socialLinks: data.social_links?.map((link: any) => ({ ...link, id: String(link.id) })) || [],
    services: data.services?.map((service: any) => ({ ...service, id: String(service.id) })) || [],
    portfolio: data.portfolio_items?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
    experience: data.experience?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
    education: data.education?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
    reviews: data.reviews?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
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
    socialLinks = [],
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

  const { error: profileError } = await supabase
    .from('profiles')
    .update(updateData)
    .eq('id', userId);

  if (profileError) {
    throw profileError;
  }

  // Atualiza social_links
  for (const link of socialLinks) {
    if (link.id) {
      await supabase.from('social_links').update(link).eq('id', link.id);
    } else {
      await supabase.from('social_links').insert({ ...link, profile_id: userId });
    }
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
  const { data, error } = await supabase
    .from('profiles')
    .select('*, profile_snapshot')
    .limit(limit);

  if (error || !data) {
    console.error('Erro ao buscar perfis reais:', error);
    return [];
  }

  return data.map((profile: any) => ({
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
    socialLinks: (() => {
      if (profile.socialLinks) {
        if (typeof profile.socialLinks === 'string') {
          try {
            const arr = JSON.parse(profile.socialLinks);
            return Array.isArray(arr) ? arr : [];
          } catch {
            return [];
          }
        }
        if (Array.isArray(profile.socialLinks)) {
          return profile.socialLinks;
        }
      }
      return (profile.profile_snapshot?.social_links || []);
    })() as UserProfile['socialLinks'],
    services: (profile.profile_snapshot?.services || []) as UserProfile['services'],
    portfolio: (profile.profile_snapshot?.portfolio || []) as UserProfile['portfolio'],
    experience: (profile.profile_snapshot?.experience || []) as UserProfile['experience'],
    education: (profile.profile_snapshot?.education || []) as UserProfile['education'],
    reviews: (profile.profile_snapshot?.reviews || []) as UserProfile['reviews'],
  }));
}
