import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MessageSquare, Briefcase, Facebook, Twitch } from "lucide-react";

export interface SocialLink {
  id: string;
  platform: string; 
  url: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  caption?: string;
  description?: string;
  dataAiHint?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  years: string;
  description: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  years: string;
}

export interface Review {
  id: string;
  authorName: string;
  authorAvatarUrl?: string;
  rating: number; 
  comment: string;
  createdAt: string; 
}

export interface PremiumBanner {
  imageUrl: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email?: string;
  phone?: string;
  whatsappNumber?: string;
  website?: string;
  bio: string;
  profilePictureUrl: string;
  profilePictureDataAiHint?: string;
  coverPhotoUrl: string;
  coverPhotoDataAiHint?: string;
  socialLinks: SocialLink[];
  location?: {
    address?: string;
    city: string;
    state?: string;
    country: string;
    googleMapsUrl?: string;
  };
  services: Service[];
  portfolio: PortfolioItem[];
  skills?: string[];
  experience?: ExperienceItem[];
  education?: EducationItem[];
  youtubeVideoUrl?: string;
  youtubeVideoTitle?: string;
  youtubeVideoDescription?: string;
  themeColor?: string;
  category: string;
  layoutTemplateId?: string;
  plan?: 'free' | 'standard' | 'premium';
  isAvailable?: boolean;
  isProfileComplete?: boolean;
  reviews?: Review[];
  premiumBanner?: PremiumBanner;
}

export interface ProfileLayoutProps {
  user: UserProfile;
  primaryColorHex: string;
  isCurrentUserProfile: boolean;
  mounted: boolean;
  toast: ReturnType<typeof import("@/hooks/use-toast").useToast>['toast'];
  qrCodeUrl: string;
  onPortfolioItemClick: (item: PortfolioItem) => void;
}

export const platformIcons: { [key: string]: React.ElementType } = {
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  website: Globe,
  youtube: Youtube,
  behance: Globe, 
  discord: MessageSquare, 
  tiktok: MessageSquare, 
  facebook: Facebook,
  twitch: Twitch,
};

export interface AccentColor {
  name: string;
  value: string;
  foreground: string;
  accent: string;
}

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  availableFor: ('standard' | 'premium')[];
}
