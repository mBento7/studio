"use server";

import { createClient } from "@/lib/supabase/server";
import type { UserProfile } from "@/lib/types";
import { mockCurrentUser, mockUserProfiles } from "@/lib/mock-data";

// Esta função substitui 'getMockUserByUsername'
export async function getUserProfileByUsername(username: string): Promise<UserProfile | null> {
  const supabase = await createClient();

  // 1. Busca o perfil principal na tabela 'profiles', incluindo o profile_snapshot
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*, profile_snapshot') // Incluindo o novo campo snapshot
    .eq('username', username)
    .single();

  if (profileError || !profile) {
    // Fallback para qualquer usuário mock em desenvolvimento
    if (process.env.NODE_ENV !== 'production') {
      const mockUser = mockUserProfiles.find(u => u.username === username);
      if (mockUser) return mockUser;
    }
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
    profilePictureUrl: profile.profile_picture_url || '',
    coverPhotoUrl: profile.cover_photo_url || '',
    category: profile.category || 'Categoria não definida',
    plan: profile.plan as 'free' | 'standard' | 'premium' || 'free',
    layoutTemplateId: profile.layout_template_id,
    isAvailable: profile.is_available,
    
    // Campos JSONB que ainda existem na tabela profiles (location, skills, premium_banner)
    location: profile.location || { city: '', country: '' },
    skills: profile.skills || [],
    premiumBanner: profile.premium_banner || undefined,

    // Dados que agora vêm do profile_snapshot
    socialLinks: (profile.profile_snapshot?.social_links || []) as UserProfile['socialLinks'],
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

// Futuramente, você pode adicionar outras funções de serviço aqui, como:
// export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>) { ... }

// ATENÇÃO: Não adicione fallback para mocks nesta função.
// Para um projeto escalável e robusto, todos os perfis públicos devem estar cadastrados no banco de dados real (Supabase).
// Use mocks apenas em páginas de exemplo, landing page ou testes locais, nunca em rotas públicas ou produção.
