import { supabase } from "@/lib/supabase/client";

// Busca o perfil do usuário logado (V2)
export async function getUserProfileV2(userId: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  if (error) throw error;
  return data;
}

// Lista de campos válidos do perfil (ajuste conforme o schema real do banco)
const VALID_PROFILE_FIELDS = [
  'id',
  'full_name',
  'username',
  'bio',
  'profile_picture_url',
  'cover_photo_url',
  'email',
  'phone',
  'layout',
  'layoutTemplateId',
  // 'services', // Removido: services deve ser manipulado via tabela relacional 'services'
  'skills',
  // adicione/remova conforme o schema real
  'primaryColor',
  'secondaryColor',
  'font',
  'social_links',
];

export function filterValidProfileFields(profile: any) {
  const filtered: any = {};
  for (const key of VALID_PROFILE_FIELDS) {
    if (profile[key] !== undefined) {
      filtered[key] = profile[key];
    }
  }
  return filtered;
}

// Salva as alterações do perfil do usuário (V2)
export async function saveUserProfileV2(userId: string, profileData: any) {
  // Filtra apenas os campos válidos
  const safeProfileData = filterValidProfileFields(profileData);
  // Converter social_links para string JSON, se existir
  if (safeProfileData.social_links) {
    safeProfileData.social_links = JSON.stringify(safeProfileData.social_links);
  }
  const { error } = await supabase
    .from("profiles")
    .update(safeProfileData)
    .eq("id", userId);
  if (error) throw error;

  // Registra atividade de atualização de perfil
  const activity = {
    user_id: userId,
    type: 'profile_update',
    data: safeProfileData,
  };
  await supabase.from('activities').insert([activity]);

  return true;
}

// Exemplo de uso:
// const profile = await getUserProfileV2(user.id);
// await saveUserProfileV2(user.id, profileData); 