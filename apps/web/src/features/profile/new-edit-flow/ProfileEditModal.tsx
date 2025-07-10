import { useContext } from "react";
import { Dialog } from "@/components/ui/dialog";
import ProfileEditPageV2 from "./ProfileEditPageV2";
import { ProfileEditContext } from "./ProfileEditContext";

export function ProfileEditModal({ open, onOpenChange, onAfterSave }: { open: boolean; onOpenChange: (v: boolean) => void; onAfterSave?: () => void }) {
  const { profile, saveProfile } = useContext(ProfileEditContext);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {profile && <ProfileEditPageV2 profile={profile} onSave={saveProfile} onClose={onOpenChange ? () => onOpenChange(false) : undefined} onAfterSave={onAfterSave} />}
    </Dialog>
  );
} 