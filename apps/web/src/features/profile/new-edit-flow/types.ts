export interface UserProfileV2 {
  full_name: string;
  username: string;
  bio: string;
  profile_picture_url?: string;
  cover_photo_url?: string;
  email?: string;
  phone?: string;
  layout?: string;
  services?: any[];
  portfolio?: any[];
  skills?: string[];
  plan?: string;
}

export interface ProfileEditPageV2Props {
  profile?: UserProfileV2;
  onProfileChange?: (profile: UserProfileV2) => void;
  onSave?: (profile: UserProfileV2) => void;
} 