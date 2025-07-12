import { supabase } from "@/lib/supabase/client";
import { refreshProfileSnapshot } from '@/services/profile.service';

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
  'maps_link',
  // 'social_links', // Removido: social_links é uma tabela relacional separada
];

export function filterValidProfileFields(profile: any) {
  const filtered: any = {};
  for (const key of VALID_PROFILE_FIELDS) {
    if (profile[key] !== undefined) {
      filtered[key] = profile[key];
    }
  }
  // Remover a padronização de social_links aqui, pois é tratado pela saveSocialLinksV2
  // if (filtered.social_links && Array.isArray(filtered.social_links)) {
  //   filtered.social_links = filtered.social_links.map((link: any) => ({
  //     platform: link.platform || link.type,
  //     url: link.url
  //   }));
  // }
  return filtered;
}

// Salva as alterações do perfil do usuário (V2)
export async function saveUserProfileV2(userId: string, profileData: any) {
  // Filtra apenas os campos válidos
  const safeProfileData = filterValidProfileFields(profileData);
  // Remover a conversão de social_links para string JSON aqui
  // if (safeProfileData.social_links) {
  //   safeProfileData.social_links = JSON.stringify(safeProfileData.social_links);
  // }
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

  // Atualiza o snapshot do perfil para refletir imediatamente as alterações
  await refreshProfileSnapshot(userId);

  return true;
}

// Salva, atualiza e remove links sociais na tabela relacional social_links
export async function saveSocialLinksV2(userId: string, socialLinks: Array<{ platform: string, url: string, id?: string }>) {
  // Buscar links atuais do banco
  const { data: currentLinks, error: fetchError } = await supabase
    .from('social_links')
    .select('*')
    .eq('profile_id', userId);
  if (fetchError) throw fetchError;

  // Mapear por plataforma+url para facilitar comparação
  const currentMap = new Map((currentLinks || []).map((l: any) => [l.platform + l.url, l]));
  const newMap = new Map(socialLinks.map(l => [l.platform + l.url, l]));

  // Remover links que não existem mais
  for (const l of currentLinks || []) {
    if (!newMap.has(l.platform + l.url)) {
      await supabase.from('social_links').delete().eq('id', l.id);
    }
  }
  // Adicionar ou atualizar links
  for (const l of socialLinks) {
    const found = (currentLinks || []).find((c: any) => c.platform === l.platform && c.url === l.url);
    if (!found) {
      await supabase.from('social_links').insert({ profile_id: userId, platform: l.platform, url: l.url });
    }
    // Se quiser atualizar campos extras, adicione aqui
  }
}

// Salva, atualiza e remove cupons na tabela relacional coupons
export async function saveCouponsV2(userId: string, username: string, coupons: Array<any>) {
  // Buscar cupons atuais do banco
  const { data: currentCoupons, error: fetchError } = await supabase
    .from('coupons')
    .select('*')
    .eq('profile_id', userId);
  if (fetchError) throw fetchError;

  // Mapear por código para facilitar comparação
  const currentMap = new Map((currentCoupons || []).map((c: any) => [c.code, c]));

  // Remover cupons que não existem mais
  for (const c of currentCoupons || []) {
    if (!coupons.find((nc: any) => nc.code === c.code)) {
      await supabase.from('coupons').delete().eq('id', c.id);
    }
  }
  // Adicionar ou atualizar cupons
  for (const c of coupons) {
    const found = (currentCoupons || []).find((cc: any) => cc.code === c.code);
    const cupomComUsername = { ...c, username };
    if (!found) {
      await supabase.from('coupons').insert({ profile_id: userId, ...cupomComUsername });
    } else {
      await supabase.from('coupons').update({ ...cupomComUsername }).eq('id', found.id);
    }
  }
}

// Exemplo de uso:
// const profile = await getUserProfileV2(user.id);
// await saveUserProfileV2(user.id, profileData); 