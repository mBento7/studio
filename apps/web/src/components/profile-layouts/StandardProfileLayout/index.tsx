'use client';

import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { isValidUUID } from '@/lib/validation';
import {
  StartChatButton } from '@/components/chat/StartChatButton';
import {
  ReviewForm } from '@/components/reviews/ReviewForm';
import {
  ReviewList } from '@/components/reviews/ReviewList';
import {
  ReviewSummary } from '@/components/reviews/ReviewSummary';
import {
  Youtube,
  Linkedin,
  Twitter,
  Instagram,
  Github,
  Globe,
  Mail,
  MapPin,
  QrCode,
  Download,
  Edit3,
  MessageSquare,
  Briefcase,
  ArrowRight,
  Loader2,
  Building,
  GraduationCap,
  Star,
  Palette,
  Facebook,
  Twitch,
  Save,
  Eye,
  Link as LinkIcon,
  Maximize,
  Phone,
  Calendar,
  Award,
  Users,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Share2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Heart,
  X,
  Play,
  Sparkles,
  Zap,
  Clock,
  Plus,
  ArrowUp,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import type { UserProfile, PortfolioItem, SocialLink, ProfileLayoutProps } from '@/lib/types';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useFeatureAccess } from '@/features/profile/new-edit-flow/useFeatureAccess';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../ui/tooltip';
import Image from 'next/image';
import { platformIcons } from '@/lib/types';
import QRCode from 'react-qr-code';
import { SocialLinks } from '@/components/social/SocialLinks';
import { SkillsList } from '@/components/skills/SkillsList';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { ServicesList } from '@/components/services/ServicesList';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { EducationList } from '@/components/education/EducationList';
import { ProfileActions } from '@/components/profile-layouts/ProfileActions';
import { LocationInfo } from '@/components/profile-layouts/LocationInfo';
import StandardProfileCardHeader from '../StandardProfileCardHeader';
import { ProfileHeader } from '@/components/profile-layouts/ProfileHeader';
import { ProfileCardContainer } from '@/components/profile-layouts/ProfileCardContainer';
import { useProfileQrCode } from '@/components/profile-layouts/useProfileQrCode';

const BGPattern = ({ variant = 'grid', mask = 'fade-edges', className }: {
  variant?: 'dots' | 'grid' | 'diagonal-stripes';
  mask?: 'fade-edges' | 'fade-center' | 'none';
  className?: string;
}) => {
  const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
    'none': ''
  };

  const getBgImage = (variant: string) => {
    const fill = 'rgba(0,0,0,0.05)';
    switch (variant) {
      case 'dots':
        return `radial-gradient(${fill} 1px, transparent 1px)`;
      case 'grid':
        return `linear-gradient(to right, ${fill} 1px, transparent 1px), linear-gradient(to bottom, ${fill} 1px, transparent 1px)`;
      case 'diagonal-stripes':
        return `repeating-linear-gradient(45deg, ${fill}, ${fill} 1px, transparent 1px, transparent 24px)`;
      default:
        return undefined;
    }
  };

  return (
    <div
      className={cn('absolute inset-0 z-[-10] size-full', maskClasses[mask], className)}
      style={{
        backgroundImage: getBgImage(variant),
        backgroundSize: '24px 24px'
      }}
    />
  );
};

const PortfolioItemModal = lazy(() => import('@/features/profile/portfolio-item-modal').then(mod => ({ default: mod.PortfolioItemModal })));

interface Theme {
  primary: string;
  mode: 'light' | 'dark';
}
const defaultTheme: Theme = {
  primary: '#3B82F6',
  mode: 'light'
};
const DEFAULT_PRIMARY = '#E5E7EB';
const DEFAULT_SECONDARY = '#F4F4F5';
// 1. Novo componente ThemeCustomizer para StandardProfileLayout (apenas cor primária)
const StandardThemeCustomizer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}> = ({ isOpen, onClose, primaryColor, secondaryColor, onPrimaryColorChange, onSecondaryColorChange }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="bg-white dark:bg-[#18181b] dark:text-white rounded-xl shadow-xl dark:shadow-2xl p-6 z-30 w-80 border border-gray-200 dark:border-gray-700 transition-colors duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Personalizar Cor</h3>
            <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded" aria-label="Fechar customizador de cor">
              <ChevronUp className="w-5 h-5 dark:text-white" />
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Cor Primária</label>
            <div className="flex gap-2 items-center">
              {/* Opção padrão */}
              <button
                onClick={() => onPrimaryColorChange(DEFAULT_PRIMARY)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${primaryColor === DEFAULT_PRIMARY ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800`}
                aria-label="Cor padrão primária"
                title="Padrão"
              >
                <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
              </button>
              {/* Outras cores */}
              {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                <button
                  key={color}
                  onClick={() => onPrimaryColorChange(color)}
                  className={`w-8 h-8 rounded-full border-2 ${primaryColor === color ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Selecionar cor primária ${color}`}
                />
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cor Secundária</label>
            <div className="flex gap-2 items-center">
              {/* Opção padrão */}
              <button
                onClick={() => onSecondaryColorChange(DEFAULT_SECONDARY)}
                className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${secondaryColor === DEFAULT_SECONDARY ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800`}
                aria-label="Cor padrão secundária"
                title="Padrão"
              >
                <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
              </button>
              {/* Outras cores */}
              {['#8B5CF6', '#F59E0B', '#10B981', '#EF4444', '#3B82F6'].map(color => (
                <button
                  key={color}
                  onClick={() => onSecondaryColorChange(color)}
                  className={`w-8 h-8 rounded-full border-2 ${secondaryColor === color ? 'border-purple-500' : 'border-gray-300 dark:border-gray-600'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Selecionar cor secundária ${color}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Na definição do componente, adicione qrCodeUrl aos props desestruturados
const StandardProfileLayout: React.FC<ProfileLayoutProps & {
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}> = ({
  user,
  isCurrentUserProfile,
  onPortfolioItemClick,
  primaryColor,
  secondaryColor,
  font,
  qrCodeUrl,
  toast
}) => {
  // Adiciona os estados para as cores primária e secundária
  const [primaryColorState, setPrimaryColorState] = useState(primaryColor || DEFAULT_PRIMARY);
  const [secondaryColorState, setSecondaryColorState] = useState(secondaryColor || DEFAULT_SECONDARY);

  // Estados para modais e imagens
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: '' });
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [experienceForm, setExperienceForm] = useState({ title: '', company: '', years: '', description: '' });
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [mediaForm, setMediaForm] = useState({ youtubeUrl: '' });
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioItems, setPortfolioItems] = useState<any[]>([]);

  // Estados para listas de serviços e experiências
  const [servicesItems, setServicesItems] = useState<any[]>([]);
  const [experienceItems, setExperienceItems] = useState<any[]>([]);

  // Estado para modal de customização de tema
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  // Definir refs para cada seção
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);

  // Objeto sectionRefs para navegação
  const sectionRefs = {
    about: aboutRef,
    portfolio: portfolioRef,
    services: servicesRef,
    experience: experienceRef,
    education: educationRef,
    youtube: youtubeRef
  };

  // Função para salvar as cores (pode ser customizada conforme necessidade)
  const saveThemeColors = (primary: string, secondary: string) => {
    setPrimaryColorState(primary);
    setSecondaryColorState(secondary);
    // Aqui você pode adicionar lógica para persistir as cores, se necessário
  };

  useEffect(() => {
    // Removed setMounted(true) call
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Removed theme setting
  }, []);

  // Removed const { toast } = useToast(); to avoid redeclaration

  // Rest of the component code uses the destructured toast and mountedProp

  // Definir profileUrl antes de qualquer uso
  const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.username}` : `https://idbox.site/profile/${user.username}`;

  // QR code logic uses qrCodeUrl prop or generated QR code
  const { qrCodeUrl: generatedQrCodeUrl, isLoading: isQrLoading } = qrCodeUrl
    ? { qrCodeUrl, isLoading: false }
    : useProfileQrCode(profileUrl);

  // Dados fictícios para evitar erro de referência (substitua pela lógica real)
  const skills: any[] = [];
  const services: any[] = [];
  const portfolio: any[] = [];
  const experience: any[] = [];
  const education: any[] = [];
  const sortedSocialLinks: any[] = [];

  const handleDownloadQrCode = async () => {
    if (!user) return;
    const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.username}` : `https://idbox.site/profile/${user.username}`;
    const bgColorForDownload = 'FFFFFF';
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}&color=${primaryColorState?.replace('#', '')}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;

    try {
      const response = await fetch(qrCodeUrlForDownload);
      if (!response.ok) throw new Error(`Falha ao buscar QR Code: ${response.statusText}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `idbox-${user.username}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Erro ao baixar QR Code:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: user.bio,
          url: window.location.href
        });
        console.log('Conteúdo compartilhado com sucesso!');
      } catch (error) {
        console.error('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  const handleReviewSubmit = async ({ rating, comment }: { rating: number; comment: string }) => {
    if (!currentUserId) {
      toast({
        title: 'Erro',
        description: 'Você precisa estar logado para enviar uma avaliação.',
        variant: 'destructive'
      });
      return;
    }

    if (currentUserId === user.id) {
      toast({
        title: 'Erro',
        description: 'Você não pode avaliar seu próprio perfil.',
        variant: 'destructive'
      });
      return;
    }

    if (!isValidUUID(currentUserId) || !isValidUUID(user.id)) {
      toast({
        title: 'Erro',
        description: 'ID de usuário inválido para avaliação.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer_id: currentUserId,
          reviewed_user_id: user.id,
          rating,
          comment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar avaliação.');
      }

      toast({
        title: 'Sucesso!',
        description: 'Sua avaliação foi enviada.',
        variant: 'default'
      });
      // Opcional: Atualizar a lista de avaliações no frontend sem recarregar a página
      // Você pode buscar novamente as avaliações ou adicionar a nova avaliação ao estado local
    } catch (err: any) {
      console.error('Erro ao enviar avaliação:', err);
      toast({
        title: 'Erro',
        description: err.message || 'Não foi possível enviar sua avaliação.',
        variant: 'destructive'
      });
    }
  };

  // Definir currentUserId (ajuste conforme sua lógica de autenticação)
  const currentUserId = null; // Substitua por lógica real se necessário

  // Função para rolar até a seção
  const handleSectionClick = (section: string) => {
    const ref = sectionRefs[section as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função simples para exibir todas as seções (ajuste conforme sua lógica)
  const isSectionVisible = (section: string) => true;

  // Função utilitária fictícia para evitar erro de referência
  function getYoutubeEmbedUrl(url: string) {
    return url;
  }

  // Função para rolar ao topo
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className={`bg-background text-foreground ${primaryColorState ? `${primaryColorState}-theme` : ''}`}>
      {/* Hero Section */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
        <StandardProfileCardHeader user={user} isCurrentUserProfile={isCurrentUserProfile} />
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full mt-8">
          <ProfileHeader
            sections={[
              { key: 'about', label: 'Sobre' },
              { key: 'portfolio', label: 'Portfólio' },
              { key: 'services', label: 'Serviços' },
              { key: 'experience', label: 'Experiência' },
              { key: 'education', label: 'Educação' }
            ]}
            sectionRefs={sectionRefs}
            onSectionClick={handleSectionClick}
            variant="standard"
          />

          <div className="space-y-12 mt-4">
            {/* Sobre */}
            <div ref={aboutRef} />
            {/* Habilidades */}
            {isSectionVisible('skills') && skills.length > 0 && (
              <SkillsList
                skills={skills}
                maxToShow={12}
                variant="standard"
              />
            )}

            {/* Serviços */}
            <div ref={servicesRef}>
              {isSectionVisible('services') && services.length > 0 && (
                <ServicesList
                  services={services}
                  maxToShow={8}
                  variant="standard"
                  isCurrentUserProfile={isCurrentUserProfile}
                />
              )}
            </div>

            {/* Meu Portfólio */}
            <div ref={portfolioRef}>
              {isSectionVisible('portfolio') && portfolio.length > 0 && (
                <PortfolioGrid
                  items={portfolio}
                  maxToShow={9}
                  variant="standard"
                  onItemClick={onPortfolioItemClick}
                />
              )}
            </div>

            {/* Mídia (YouTube) */}
            {isSectionVisible('youtube') && user.youtubeVideoUrl && (
              <div ref={youtubeRef}>
                <ProfileCardContainer className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                      {/* <Youtube className="w-6 h-6 text-primary" /> */} Mídia
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row md:gap-6">
                      <div className="aspect-video rounded-lg overflow-hidden border shadow-sm w-full md:w-1/2">
                        <iframe
                          width="100%"
                          src={getYoutubeEmbedUrl(user.youtubeVideoUrl) || ''}
                          title={user.youtubeVideoTitle || 'YouTube video'}
                          frameBorder="0"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="mt-4 md:mt-0 w-full md:w-1/2 flex flex-col items-start">
                        {user.youtubeVideoTitle && (
                          <div className="font-semibold text-lg mb-1">{user.youtubeVideoTitle}</div>
                        )}
                        {user.youtubeVideoDescription && (
                          <div className="text-muted-foreground text-base">{user.youtubeVideoDescription}</div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </ProfileCardContainer>
              </div>
            )}

            {/* Experiência Profissional + Formação Acadêmica em duas colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Experiência Profissional */}
              <div ref={experienceRef}>
                {isSectionVisible('experience') && experience.length > 0 && (
                  <ExperienceList
                    experience={experience}
                    maxToShow={8}
                    variant="standard"
                    isCurrentUserProfile={isCurrentUserProfile}
                  />
                )}
              </div>

              {/* Formação Acadêmica */}
              <div ref={educationRef}>
                {isSectionVisible('education') && education.length > 0 && (
                  <EducationList
                    education={education}
                    maxToShow={8}
                    variant="standard"
                    isCurrentUserProfile={isCurrentUserProfile}
                  />
                )}
              </div>
            </div>

            {/* Links Sociais */}
            {sortedSocialLinks.length > 0 && (
              <ProfileCardContainer className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                    {/* <Users className="w-6 h-6 text-primary" /> */} Links Sociais
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sortedSocialLinks.map((link) => {
                      // const Icon = platformIcons[link.platform] || Globe;
                      return (
                        <Button
                          key={link.id}
                          variant="outline"
                          size="sm"
                          className="rounded-full hover:scale-105 transition-transform shadow-md shadow-black/10 dark:shadow-none"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {/* <Icon className="w-4 h-4 mr-2" /> */} {link.platform}
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </ProfileCardContainer>
            )}
          </div>
        </div>
      </div>

      {/* Seção de Contato (antes do footer) */}
      <section className="py-16 px-4 sm:px-8 bg-[#f7fafd] dark:bg-gray-950">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 dark:bg-blue-800 dark:text-blue-100">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 8.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5M12 13v.01M12 17a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v5a5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-semibold text-lg">Email</div>
                <div className="text-gray-500 dark:text-gray-300">{user.email || 'Não informado'}</div>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="bg-blue-100 text-blue-600 rounded-full p-3 dark:bg-blue-800 dark:text-blue-100">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div>
                <div className="font-semibold text-lg">Localização</div>
                <div className="text-gray-500 dark:text-gray-300">{user.location?.city || ''}{user.location?.country ? ', ' + user.location.country : ''}</div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center">
            <div className="font-semibold text-lg mb-2">Conecte-se</div>
            {/* QRCode gerado dinamicamente para o perfil */}
            <div className="mb-4">
              <QRCode value={window?.location?.href || ''} size={128} fgColor="#1e40af" bgColor="#fff" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900 shadow-md shadow-black/10 dark:shadow-none">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 8V7a5 5 0 0 0-10 0v1M12 15v2m0 0v2m0-2h2m-2 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Compartilhar Perfil
            </button>
          </div>
        </div>
      </section>

      {/* Modal de edição de capa */}
      <Dialog open={isCoverImageModalOpen} onOpenChange={setIsCoverImageModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Alterar imagem de capa</DialogTitle></DialogHeader>
          <Input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) setCoverImage(URL.createObjectURL(file));
            setIsCoverImageModalOpen(false);
          }} />
        </DialogContent>
      </Dialog>

      {/* Modal de edição de perfil */}
      <Dialog open={isProfileImageModalOpen} onOpenChange={setIsProfileImageModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Alterar foto de perfil</DialogTitle></DialogHeader>
          <Input type="file" accept="image/*" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (file) setProfileImage(URL.createObjectURL(file));
            setIsProfileImageModalOpen(false);
          }} />
        </DialogContent>
      </Dialog>

      {/* Modal de adicionar serviço */}
      <Dialog open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar Serviço</DialogTitle></DialogHeader>
          <form className="space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setServicesItems((items: any[]) => [{ ...serviceForm, id: Date.now().toString() }, ...items]);
            setIsServiceModalOpen(false);
            setServiceForm({ name: '', description: '', price: '' });
          }}>
            <Input placeholder="Nome do serviço" value={serviceForm.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceForm(f => ({ ...f, name: e.target.value }))} required />
            <Textarea placeholder="Descrição do serviço" value={serviceForm.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setServiceForm(f => ({ ...f, description: e.target.value }))} required />
            <Input placeholder="Preço (opcional)" value={serviceForm.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServiceForm(f => ({ ...f, price: e.target.value }))} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsServiceModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de adicionar experiência */}
      <Dialog open={isExperienceModalOpen} onOpenChange={setIsExperienceModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar Experiência</DialogTitle></DialogHeader>
          <form className="space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setExperienceItems((items: any[]) => [{
              id: Date.now().toString(),
              title: experienceForm.title,
              company: experienceForm.company,
              startDate: '',
              endDate: '',
              description: experienceForm.description
            }, ...items]);
            setIsExperienceModalOpen(false);
            setExperienceForm({ title: '', company: '', years: '', description: '' });
          }}>
            <Input placeholder="Cargo" value={experienceForm.title} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceForm(f => ({ ...f, title: e.target.value }))} required />
            <Input placeholder="Empresa" value={experienceForm.company} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceForm(f => ({ ...f, company: e.target.value }))} required />
            <Input placeholder="Período (ex: 2020-2023)" value={experienceForm.years} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExperienceForm(f => ({ ...f, years: e.target.value }))} required />
            <Textarea placeholder="Descrição (opcional)" value={experienceForm.description} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExperienceForm(f => ({ ...f, description: e.target.value }))} />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsExperienceModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Modal de adicionar mídia (YouTube) */}
      <Dialog open={isMediaModalOpen} onOpenChange={setIsMediaModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar vídeo do YouTube</DialogTitle></DialogHeader>
          <form className="space-y-4" onSubmit={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); setIsMediaModalOpen(false); }}>
            <Input placeholder="URL do vídeo do YouTube" value={mediaForm.youtubeUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMediaForm(f => ({ ...f, youtubeUrl: e.target.value }))} required />
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsMediaModalOpen(false)}>Cancelar</Button>
              <Button type="submit">Salvar</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Botão Voltar ao Topo */}
      {showBackToTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 p-3 rounded-full shadow-lg z-50 transition-all duration-300 transform hover:scale-105"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      )}

      <Suspense fallback={null}>
        <PortfolioItemModal
          item={portfolioItems[0]}
          open={isPortfolioModalOpen}
          onOpenChange={() => setIsPortfolioModalOpen(false)}
        />
      </Suspense>

      {/* Customizador de cor */}
      {isThemeOpen && (
        <div className="flex justify-end mb-8">
          <StandardThemeCustomizer
            isOpen={isThemeOpen}
            onClose={() => setIsThemeOpen(false)}
            primaryColor={primaryColorState}
            secondaryColor={secondaryColorState}
            onPrimaryColorChange={color => {
              setPrimaryColorState(color);
              saveThemeColors(color, secondaryColorState);
            }}
            onSecondaryColorChange={color => {
              setSecondaryColorState(color);
              saveThemeColors(primaryColorState, color);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StandardProfileLayout;

export const segmentConfig = {
  id: 'advanced',
  name: 'Perfil Avançado',
  description: 'Um layout profissional e completo, com abas, navegação rápida, capa e vídeo do YouTube.',
  imageUrl: 'https://picsum.photos/seed/layout-advanced/300/200',
  plan: 'standard'
};
