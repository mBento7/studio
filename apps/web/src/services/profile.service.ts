"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/types";

// Esta função substitui 'getMockUserByUsername'
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  const supabase = await createClient();

  // 1. Busca o perfil principal na tabela 'profiles'
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    console.error(`Perfil não encontrado para o username: ${username}`, profileError);
    return null;
  }

  // 2. Busca os dados relacionados em paralelo para otimizar o tempo de carregamento
  const [
    { data: socialLinks, error: socialLinksError },
    { data: services, error: servicesError },
    { data: portfolioItems, error: portfolioItemsError }
  ] = await Promise.all([
    supabase.from('social_links').select('*').eq('profile_id', profile.id),
    supabase.from('services').select('*').eq('profile_id', profile.id),
    supabase.from('portfolio_items').select('*').eq('profile_id', profile.id)
  ]);

  if (socialLinksError || servicesError || portfolioItemsError) {
    console.error("Erro ao buscar dados relacionados do perfil:", {
      socialLinksError,
      servicesError,
      portfolioItemsError
    });
    // Mesmo com erro, podemos retornar o perfil principal, se preferir
  }

  // 3. Monta o objeto UserProfile final, combinando todos os dados
  const userProfile: UserProfile = {
    id: profile.id,
    username: profile.username,
    name: profile.full_name || 'Nome não definido',
    email: profile.email,
    phone: profile.phone,
    whatsappNumber: profile.whatsapp_number,
    bio: profile.bio || '',
    profilePictureUrl: profile.profile_picture_url || '',
    coverPhotoUrl: profile.cover_photo_url || '',
    category: profile.category || 'Categoria não definida',
    plan: profile.plan as 'free' | 'standard' | 'premium' || 'free',
    layoutTemplateId: profile.layout_template_id,
    isAvailable: profile.is_available,
    
    // Converte os dados JSONB e os dados relacionais para o formato esperado
    location: profile.location ? JSON.parse(JSON.stringify(profile.location)) : { city: '', country: '' },
    skills: profile.skills ? JSON.parse(JSON.stringify(profile.skills)) : [],
    premiumBanner: profile.premium_banner ? JSON.parse(JSON.stringify(profile.premium_banner)) : undefined,

    socialLinks: socialLinks || [],
    services: services || [],
    portfolio: portfolioItems || [],
    
    // Campos que podem não estar na tabela `profiles` e precisam ser tratados
    experience: [], // Adicionar busca se criar a tabela 'experience'
    education: [],  // Adicionar busca se criar a tabela 'education'
    reviews: [],    // Adicionar busca se criar a tabela 'reviews'
  };

  return userProfile;
}

// Futuramente, você pode adicionar outras funções de serviço aqui, como:
// export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) { ... }

// ATENÇÃO: Não adicione fallback para mocks nesta função.
// Para um projeto escalável e robusto, todos os perfis públicos devem estar cadastrados no banco de dados real (Supabase).
// Use mocks apenas em páginas de exemplo, landing page ou testes locais, nunca em rotas públicas ou produção.
