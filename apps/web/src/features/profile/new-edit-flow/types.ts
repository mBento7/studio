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
  website?: string;
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  github?: string;
  whatsapp?: string;
  social_links?: Array<{
    type: string; // ex: 'instagram', 'linkedin', 'whatsapp', etc
    url: string;
    label?: string;
  }>;
  stories?: Array<{
    id: string;
    title: string;
    imageUrl: string;
    text?: string;
    createdAt?: string;
    expiresAt?: string;
  }>;
}

export interface ProfileEditPageV2Props {
  profile?: UserProfileV2;
  onProfileChange?: (profile: UserProfileV2) => void;
  onSave?: (profile: UserProfileV2) => void;
} 