import { useState } from "react";
import type { UserProfileV2 } from "./types";
import { filterValidProfileFields, saveSocialLinksV2 } from "./profile.service";

export function useSaveProfile(onSave?: (profile: UserProfileV2) => void, profile?: UserProfileV2) {
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const save = async () => {
    setSaving(true);
    setSuccessMsg("");
    setErrorMsg("");
    try {
      const safeProfile = filterValidProfileFields(profile!);
      // Salvar links sociais na tabela relacional
      if (profile?.id && Array.isArray(profile?.sociallinks)) {
        await saveSocialLinksV2(profile.id, profile.sociallinks.map((l: any) => ({
          platform: l.platform || l.type,
          url: l.url
        })));
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