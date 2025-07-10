import { useContext } from "react";
import { ProfileVisibilitySettings } from "./ProfileVisibilitySettings";
import { ProfileEditContext } from "./new-edit-flow/ProfileEditContext";
import { useToast } from "@/hooks/use-toast";

export function ProfileSidebarSettings({ onAfterSave }: { onAfterSave?: () => void }) {
  const { profile, updateProfile, saveProfile } = useContext(ProfileEditContext);
  const { toast } = useToast();

  if (!profile) return null;

  const handleSave = async ({ public_visibility, public_sections }: { public_visibility: boolean; public_sections: Record<string, boolean> }) => {
    try {
      updateProfile({ public_visibility, public_sections });
      await saveProfile();
      toast({ title: "Configurações salvas com sucesso!" });
      if (onAfterSave) onAfterSave();
    } catch (e: any) {
      toast({ title: "Erro ao salvar configurações", description: e.message, variant: "destructive" });
    }
  };

  return (
    <aside className="w-[320px] p-4 bg-white rounded shadow-lg flex flex-col gap-6">
      <ProfileVisibilitySettings
        publicVisibility={profile.public_visibility}
        publicSections={profile.public_sections}
        onSave={handleSave}
      />
      {/* Outras opções rápidas podem ser adicionadas aqui */}
    </aside>
  );
} 