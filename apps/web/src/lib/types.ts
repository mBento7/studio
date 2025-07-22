import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MessageSquare, Briefcase, Facebook, Twitch } from 'lucide-react';
import { SocialIcon } from 'react-social-icons'; // Importe SocialIcon
import type { User } from '@supabase/supabase-js';

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: string;
  icon?: string;
}

export interface PortfolioItem {
  id: string;
  imageUrl: string;
  caption: string; // Agora obrigatório
  description?: string;
  dataAiHint?: string;
  externalLink?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  description?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string | null;
  description?: string;
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

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountValue?: number;
  discountType?: 'percentage' | 'fixed';
  expiresAt?: string;
}

export interface Story {
  id: string;
  imageUrl: string;
  title: string;
  link?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  phone?: string;
  whatsappNumber?: string;
  website?: string;
  bio: string;
  profile_picture_url: string;
  profilePictureDataAiHint?: string;
  cover_photo_url: string;
  coverPhotoDataAiHint?: string;
  sociallinks: SocialLink[];
  // Endereço detalhado
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_estado?: string;
  endereco_cep?: string;
  maps_link?: string;
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
  coupons?: Coupon[];
  stories?: Story[];
  calendlyUrl?: string;
  isOnlineService?: boolean; // Novo campo para indicar se o serviço é online
  faqs?: FAQItem[];
  public_sections?: { [key: string]: boolean };
  public_visibility?: boolean;
}

export interface ProfileLayoutProps {
  user: UserProfile;
  primaryColorHex: string;
  isCurrentUserProfile: boolean;
  mounted: boolean;
  toast: ReturnType<typeof import('@/hooks/use-toast').useToast>['toast'];
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
  whatsapp: SocialIcon // Adicione o SocialIcon para o WhatsApp
};

export interface LayoutTemplate {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  availableFor: ('standard' | 'premium')[];
}
