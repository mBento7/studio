import React, { createContext, useContext, useState, ReactNode } from "react";
import type { UserProfileV2 } from "./types";
import { saveUserProfileV2 } from "./profile.service";

interface ProfileEditContextType {
  profile: UserProfileV2 | null;
  updateProfile: (data: Partial<UserProfileV2>) => void;
  saveProfile: () => Promise<void>;
}

export const ProfileEditContext = createContext<ProfileEditContextType>({
  profile: null,
  updateProfile: () => {},
  saveProfile: async () => {},
});

export function ProfileEditProvider({ initialProfile, children }: { initialProfile: UserProfileV2; children: ReactNode }) {
  const [profile, setProfile] = useState<UserProfileV2 | null>(initialProfile);

  const updateProfile = (data: Partial<UserProfileV2>) => {
    setProfile((prev) => (prev ? { ...prev, ...data } : prev));
  };

  const saveProfile = async () => {
    if (!profile || !(profile as any).id) {
      throw new Error("Perfil sem ID. Não é possível salvar.");
    }
    await saveUserProfileV2((profile as any).id, profile);
  };

  return (
    <ProfileEditContext.Provider value={{ profile, updateProfile, saveProfile }}>
      {children}
    </ProfileEditContext.Provider>
  );
} 