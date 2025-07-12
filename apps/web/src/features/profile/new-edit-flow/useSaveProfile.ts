import { useState } from "react";
import type { UserProfileV2 } from "./types";
import { filterValidProfileFields, saveSocialLinksV2, saveCouponsV2 } from "./profile.service";
import { createClient } from "@supabase/supabase-js";

export function useSaveProfile(onSave?: (profile: UserProfileV2) => void, profile?: UserProfileV2) {
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Função de validação de username estilo Instagram
  function isValidInstagramUsername(username: string): boolean {
    return /^[a-z0-9](?!.*[._]{2})[a-z0-9._]{0,28}[a-z0-9]$/.test(username);
  }

  // Instanciar Supabase Client (ajuste para seu projeto se necessário)
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const save = async () => {
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      // Validação de username
      if (!profile?.username || !isValidInstagramUsername(profile.username)) {
        setErrorMsg("Nome de usuário inválido. Use apenas letras minúsculas, números, ponto e sublinhado, sem iniciar/terminar com ponto ou sublinhado, nem duplos.");
        setSaving(false);
        return;
      }
      // Checar unicidade no Supabase
      const { data: existing, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', profile.username)
        .neq('id', profile.id)
        .maybeSingle();
      if (checkError) throw checkError;
      if (existing) {
        setErrorMsg("Este nome de usuário já está em uso. Escolha outro.");
        setSaving(false);
        return;
      }
      const safeProfile = filterValidProfileFields(profile!);
      // Salvar links sociais na tabela relacional
      if (profile?.id && Array.isArray(profile?.sociallinks)) {
        await saveSocialLinksV2(profile.id, profile.sociallinks.map((l: any) => ({
          platform: l.platform || l.type,
          url: l.url
        })));
      }
      // Salvar cupons na tabela relacional (se existir profile.coupons)
      if (profile?.id && Array.isArray((profile as any)?.coupons) && profile.username) {
        await saveCouponsV2(profile.id, profile.username, (profile as any).coupons);
      }
      await onSave?.(safeProfile);
      setSuccessMsg("Perfil salvo com sucesso!");
    } catch (e: any) {
      setErrorMsg(e?.message || "Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };
  return { save, saving, successMsg, errorMsg };
} 