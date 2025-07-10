"use client";

import React, { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  StartChatButton } from "@/components/chat/StartChatButton";
import { 
  ReviewForm } from "@/components/reviews/ReviewForm";
import { 
  ReviewList } from "@/components/reviews/ReviewList";
import { 
  ReviewSummary } from "@/components/reviews/ReviewSummary";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserProfile, PortfolioItem, SocialLink, ProfileLayoutProps } from "@/lib/types";
import { supabase } from '@/lib/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useFeatureAccess } from '@/features/profile/new-edit-flow/useFeatureAccess';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../ui/tooltip';
import Image from 'next/image';
import { platformIcons } from "@/lib/types";
import QRCode from 'react-qr-code';

const BGPattern = ({ variant = 'grid', mask = 'fade-edges', className }: { 
  variant?: 'dots' | 'grid' | 'diagonal-stripes'; 
  mask?: 'fade-edges' | 'fade-center' | 'none'; 
  className?: string; 
}) => {
  const maskClasses = {
    'fade-edges': '[mask-image:radial-gradient(ellipse_at_center,var(--background),transparent)]',
    'fade-center': '[mask-image:radial-gradient(ellipse_at_center,transparent,var(--background))]',
    'none': '',
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
        backgroundSize: '24px 24px',
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
  mode: 'light',
};
const DEFAULT_PRIMARY = "#E5E7EB";
const DEFAULT_SECONDARY = "#F4F4F5";
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
              {["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"].map(color => (
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
              {["#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"].map(color => (
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

const StandardProfileLayout: React.FC<ProfileLayoutProps & {
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}> = ({ 
  user, 
  isCurrentUserProfile, 
  qrCodeUrl, 
  onPortfolioItemClick, 
  primaryColor, 
  secondaryColor, 
  font 
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({ title: '', description: '', image: null });
  const [portfolioItems, setPortfolioItems] = useState(user.portfolio || []);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [primaryColorState, setPrimaryColor] = useState<string>(DEFAULT_PRIMARY);
  // 1. Estado para cor secundária
  const [secondaryColorState, setSecondaryColor] = useState<string>(DEFAULT_SECONDARY);

  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // setTheme(prefersDark ? 'dark' : 'light'); // Removido
  }, []);

  const toggleTheme = () => {
    // setTheme(theme === 'light' ? 'dark' : 'light'); // Removido
  };

  // Refs para as seções
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const sectionRefs = {
    about: aboutRef,
    portfolio: portfolioRef,
    services: servicesRef,
    youtube: youtubeRef,
    reviews: reviewsRef,
    skills: skillsRef,
    experience: experienceRef,
    education: educationRef,
  };

  const handleSectionClick = useCallback((section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sectionRefs]);

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const sociallinks = Array.isArray(user.sociallinks) ? user.sociallinks : [];
  // Ordenar para WhatsApp primeiro
  const sortedSocialLinks = [
    ...sociallinks.filter(link => link.platform === 'whatsapp'),
    ...sociallinks.filter(link => link.platform !== 'whatsapp'),
  ];
  const location = user.location || { city: '', country: '' };

  const layoutKey = 'StandardProfileLayout';
  const plan = user.plan || 'free';
  const { canAccess } = useFeatureAccess(plan, layoutKey);
  const { toast } = useToast();

  // Estados para modais de edição
  const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);
  const [isCoverImageModalOpen, setIsCoverImageModalOpen] = useState(false);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isExperienceModalOpen, setIsExperienceModalOpen] = useState(false);
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(user.profile_picture_url);
  const [coverImage, setCoverImage] = useState(user.cover_photo_url);
  const [serviceForm, setServiceForm] = useState({ name: '', description: '', price: '' });
  const [servicesItems, setServicesItems] = useState(user.services || []);
  const [experienceForm, setExperienceForm] = useState({ title: '', company: '', years: '', description: '' });
  const [experienceItems, setExperienceItems] = useState(user.experience || []);
  const [mediaForm, setMediaForm] = useState({ youtubeUrl: '' });
  const [mediaItems, setMediaItems] = useState(user.youtubeVideoUrl ? [{ url: user.youtubeVideoUrl }] : []);

  const [showBackToTop, setShowBackToTop] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setMounted(true);

    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id);
    };

    fetchCurrentUser();

    const handleScroll = () => {
      if (window.scrollY > 200) { // Mostra o botão após rolar 200px
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPortfolioModalOpen(false);
        setIsProfileImageModalOpen(false);
        setIsCoverImageModalOpen(false);
        setIsServiceModalOpen(false);
        setIsExperienceModalOpen(false);
        setIsMediaModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const youtubeEmbedUrl = user.youtubeVideoUrl ? getYoutubeEmbedUrl(user.youtubeVideoUrl) : null;

  const handleDownloadQrCode = async () => {
    if (!user) return;
    const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.username}` : `https://idbox.site/profile/${user.username}`;
    const bgColorForDownload = 'FFFFFF';
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}&color=${primaryColorState?.replace("#", "")}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;

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
      console.error("Erro ao baixar QR Code:", error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: user.bio,
          url: window.location.href,
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
        title: "Erro",
        description: "Você precisa estar logado para enviar uma avaliação.",
        variant: "destructive",
      });
      return;
    }

    if (currentUserId === user.id) {
      toast({
        title: "Erro",
        description: "Você não pode avaliar seu próprio perfil.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUUID(currentUserId) || !isValidUUID(user.id)) {
      toast({
        title: "Erro",
        description: "ID de usuário inválido para avaliação.",
        variant: "destructive",
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
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar avaliação.');
      }

      toast({
        title: "Sucesso!",
        description: "Sua avaliação foi enviada.",
        variant: "default",
      });
      // Opcional: Atualizar a lista de avaliações no frontend sem recarregar a página
      // Você pode buscar novamente as avaliações ou adicionar a nova avaliação ao estado local
    } catch (err: any) {
      console.error('Erro ao enviar avaliação:', err);
      toast({
        title: "Erro",
        description: err.message || 'Não foi possível enviar sua avaliação.',
        variant: "destructive",
      });
    }
  };

  const isValidUUID = (uuid: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const normalizedPortfolioItems = (user.portfolio || []).map((item: any) => ({
    ...item,
    imageUrl: item.imageUrl || item.image_url || '',
  }));

  function isSectionVisible(section: string) {
    if (!user.public_sections) return true;
    return user.public_sections[section] !== false;
  }

  if (user.public_visibility === false && !isCurrentUserProfile) {
    return <div className="text-center p-8">Este perfil é privado.</div>;
  }

  return (
    <div className={`bg-background text-foreground ${primaryColorState ? `${primaryColorState}-theme` : ''}`}>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 to-background pb-16">
        {user.cover_photo_url && (
          <div className="relative w-full h-64 sm:h-80 bg-muted/50">
            <img
              src={coverImage}
              alt="Capa"
              className="w-full h-full object-cover"
            />
            {isCurrentUserProfile && (
              <button
                type="button"
                className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow hover:bg-white"
                title="Editar capa"
                onClick={() => setIsCoverImageModalOpen(true)}
              >
                <Edit3 className="w-5 h-5 text-primary" />
              </button>
            )}
          </div>
        )}
        <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
          <div
            className="flex flex-col lg:flex-row gap-8 p-8 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg items-center lg:items-start relative"
            style={{ borderColor: primaryColorState, borderWidth: 2, background: `${secondaryColorState}15` }}
          >
            {isCurrentUserProfile && (
              <>
                <motion.button
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setIsThemeOpen(!isThemeOpen)}
                  className="absolute top-3 left-3 z-20 p-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                  aria-label="Abrir customizador de cor"
                >
                  <Settings className="w-5 h-5 text-gray-700" />
                </motion.button>
                {isThemeOpen && (
                  <div className="absolute top-16 left-3 z-[9999]">
                    <StandardThemeCustomizer
                      isOpen={isThemeOpen}
                      onClose={() => setIsThemeOpen(false)}
                      primaryColor={primaryColorState}
                      secondaryColor={secondaryColorState}
                      onPrimaryColorChange={color => { setPrimaryColor(color); setIsThemeOpen(false); }}
                      onSecondaryColorChange={color => { setSecondaryColor(color); setIsThemeOpen(false); }}
                    />
                  </div>
                )}
              </>
            )}
            {/* Coluna da esquerda: Avatar + botões de Ação */}
            <div className="flex flex-col items-center w-full lg:w-1/3 gap-4">
              {/* Avatar Section */}
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 shadow-lg ring-2 overflow-hidden bg-background flex-shrink-0"
                style={{ borderColor: primaryColorState, boxShadow: `0 0 0 4px ${primaryColorState}40` }}
              >
                <img
                  src={user.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'} // Usar user.profile_picture_url diretamente
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
                {isCurrentUserProfile && (
                  <button
                    type="button"
                    className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-50 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white hover:bg-primary/90 transition"
                    title="Editar foto de perfil"
                    onClick={() => setIsProfileImageModalOpen(true)}
                  >
                    <Edit3 className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>

              {/* Botão Chamar no Chat (Condicional) */}
              {(plan === 'standard' || plan === 'premium') && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full px-3 py-1 text-sm flex items-center gap-1 w-fit justify-center hover:bg-accent focus:ring-2 focus:ring-primary transition-all duration-200 mt-6 shadow-md shadow-black/10 dark:shadow-none"
                  onClick={() => {/* lógica de abrir chat */}}
                >
                  <MessageSquare className="w-4 h-4" /> Chamar no Chat
                </Button>
              )}

              {/* Botão Compartilhar Perfil */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="rounded-full flex items-center gap-1 w-fit justify-center hover:bg-primary focus:ring-2 focus:ring-primary transition-all duration-200 mt-2 shadow-md shadow-black/10 dark:shadow-none"
                aria-label="Compartilhar perfil"
              >
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar perfil
              </Button>
            </div>
            {/* Coluna da direita: informações do perfil */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
              <div className="flex items-center gap-2 justify-center lg:justify-start">
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-0"
                  style={{
                    fontFamily: font && font !== 'default' ? font : undefined,
                    color: primaryColorState === DEFAULT_PRIMARY ? '#111827' : primaryColorState
                  }}
                >
                  {user.name}
                </h1>
                {isCurrentUserProfile && (
                  <button type="button" onClick={() => setIsEditing((prev) => !prev)} className="ml-2 p-1 rounded-full hover:bg-muted transition" title={isEditing ? 'Visualizar perfil' : 'Editar perfil'} aria-label={isEditing ? 'Visualizar perfil' : 'Editar perfil'}>
                    {isEditing ? <Eye className="w-5 h-5 text-primary" /> : <Edit3 className="w-5 h-5 text-primary" />}
                  </button>
                )}
              </div>
              <div className="text-lg sm:text-xl text-muted-foreground mb-1">{user.category}</div>
              <div className="mt-2 mb-4 max-w-2xl">{/* Bio */}
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-base">{user.bio}</p>
              </div>
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground mb-2">
                {user.email && (
                  <div className="flex items-center gap-1"><Mail className="w-4 h-4" /><span>{user.email}</span></div>
                )}
                {/* Endereço completo + pino do Google Maps destacado visualmente, sem duplicidade */}
                {(
                  user.endereco_rua || user.endereco_numero || user.endereco_complemento || user.endereco_bairro || user.endereco_cidade || user.endereco_estado || user.endereco_cep
                ) ? (
                  <div className="flex items-center gap-2">
                    {user.maps_link ? (
                      <a
                        href={user.maps_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-150 shadow cursor-pointer"
                        title="Abrir no Google Maps"
                        style={{ marginRight: 0 }}
                      >
                        <MapPin className="w-5 h-5" />
                      </a>
                    ) : (
                      <MapPin className="w-5 h-5 text-muted-foreground" />
                    )}
                    <span>
                      {user.endereco_rua ? user.endereco_rua : ''}
                      {user.endereco_numero ? `, ${user.endereco_numero}` : ''}
                      {user.endereco_complemento ? `, ${user.endereco_complemento}` : ''}
                      {user.endereco_bairro ? `, ${user.endereco_bairro}` : ''}
                      {user.endereco_cidade ? `, ${user.endereco_cidade}` : ''}
                      {user.endereco_estado ? ` - ${user.endereco_estado}` : ''}
                      {user.endereco_cep ? `, CEP: ${user.endereco_cep}` : ''}
                    </span>
                  </div>
                ) : (
                  (user.maps_link || (user.location && user.location.city)) && (
                    <div className="flex items-center gap-2">
                      {user.maps_link ? (
                        <a
                          href={user.maps_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors duration-150 shadow cursor-pointer"
                          title="Abrir no Google Maps"
                          style={{ marginRight: 0 }}
                        >
                          <MapPin className="w-5 h-5" />
                        </a>
                      ) : (
                        <MapPin className="w-5 h-5 text-muted-foreground" />
                      )}
                      <span>
                        {user.location?.city}
                        {user.location?.country ? `, ${user.location.country}` : ''}
                      </span>
                    </div>
                  )
                )}
                {user.phone && (
                  <div className="flex items-center gap-1"><Phone className="w-4 h-4" /><span>{user.phone}</span></div>
                )}
              </div>
              {/* Social links */}
              {sortedSocialLinks.length > 0 && (
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 mt-2">
                  <TooltipProvider>
                    {sortedSocialLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Globe;

                      if (link.platform === 'whatsapp') {
                        return (
                          <Tooltip key={link.id}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full transition-all duration-200 hover:bg-primary focus:ring-2 focus:ring-primary shadow-md shadow-black/10 dark:shadow-none"
                                aria-label={link.platform}
                                asChild
                              >
                                {/* O SocialIcon renderiza seu próprio <a>, que será estilizado pelo Button asChild */}
                                <Icon
                                  url={link.url}
                                  network="whatsapp"
                                  fgColor="currentColor"
                                  bgColor="transparent"
                                  size={20} // Definindo o tamanho usando a prop 'size' para 20px
                                />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                            </TooltipContent>
                          </Tooltip>
                        );
                      } else {
                        return (
                          <Tooltip key={link.id}>
                            <TooltipTrigger asChild>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full transition-all duration-200 hover:bg-primary focus:ring-2 focus:ring-primary shadow-md shadow-black/10 dark:shadow-none"
                                asChild
                              >
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                  <Icon className="w-5 h-5" /> {/* Aumentado para 20x20px */}
                                </a>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                            </TooltipContent>
                          </Tooltip>
                        );
                      }
                    })}
                  </TooltipProvider>
                </div>
              )}
              {/* Botão Baixar QR Code */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadQrCode}
                className="rounded-full w-fit hover:bg-accent focus:ring-2 focus:ring-primary transition-all duration-200 mt-2 shadow-md shadow-black/10 dark:shadow-none"
                aria-label="Baixar QR Code"
              >
                <QrCode className="w-4 h-4 mr-2" /> QR Code
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full mt-12">
          <div className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg flex w-full mb-12 h-auto p-2 justify-center items-center">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('overview')}
              className={activeTab === 'overview' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : 'text-foreground hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700'}
            >
              Visão Geral
            </Button>
            <Button
              variant={activeTab === 'portfolio' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('portfolio')}
              className={activeTab === 'portfolio' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : 'text-foreground hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700'}
            >
              Portfólio
            </Button>
            <Button
              variant={activeTab === 'services' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('services')}
              className={activeTab === 'services' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : 'text-foreground hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700'}
            >
              Serviços
            </Button>
            <Button
              variant={activeTab === 'youtube' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('youtube')}
              className={activeTab === 'youtube' ? 'bg-blue-700 text-white hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700' : 'text-foreground hover:bg-blue-50 hover:text-blue-700 dark:text-gray-300 dark:hover:bg-gray-700'}
            >
              Mídia
            </Button>
          </div>

          <div className="space-y-12">
            {/* Habilidades */}
            {isSectionVisible('skills') && skills.length > 0 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={skillsRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                    Tags
                    <span className="relative group">
                      <span className="ml-1 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 cursor-pointer text-base font-bold border border-blue-200">i</span>
                      <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white text-gray-700 text-sm rounded-lg shadow-lg px-4 py-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                        Tags são palavras-chave que ajudam as pessoas a encontrar seu perfil. Exemplo: design, consultoria, mentorias, aulas online.
                      </span>
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {skills.map((skill, idx) => (
                      <span
                        key={skill + idx}
                        className="bg-blue-700 text-white px-3 py-1 rounded-full shadow-sm text-xs font-medium capitalize transition hover:bg-blue-800 hover:shadow-md cursor-pointer"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Serviços */}
            {isSectionVisible('services') && services.length > 0 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={servicesRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                    {/* <Briefcase className="w-6 h-6 text-primary" /> */} Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.slice(0, 6).map((item, idx) => (
                      <div key={item.id || idx} className="rounded-xl overflow-hidden shadow bg-background p-4 transition-all duration-200 hover:shadow-2xl hover:border-[#5A6B8A] hover:-translate-y-1">
                        <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                        <p className="text-muted-foreground text-base mb-2">{item.description}</p>
                        {item.price && <span className="text-primary font-bold">{item.price}</span>}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Meu Portfólio */}
            {normalizedPortfolioItems.length > 0 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={portfolioRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                    {/* <Palette className="w-6 h-6 text-primary" /> */} Meu Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {normalizedPortfolioItems.slice(0, 6).map((item, idx) => {
                      const isDefaultSupabase = item.imageUrl?.includes('/portfolio/default.png');
                      return (
                        <motion.div
                          key={item.id || idx}
                          whileHover={{ scale: 1.05 }}
                          className="aspect-square w-full min-h-[200px] rounded-lg overflow-hidden border shadow-sm cursor-pointer group relative transition-all duration-200 hover:shadow-xl hover:border-[#5A6B8A] hover:-translate-y-1"
                          onClick={() => onPortfolioItemClick(item)}
                        >
                          <Image
                            src={isDefaultSupabase ? '/avatar-default.png' : item.imageUrl}
                            alt={item.caption || 'Portfólio'}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="w-full h-full object-cover transition-transform group-hover:scale-110"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              if (target.src !== '/avatar-default.png') {
                                target.src = '/avatar-default.png';
                              }
                            }}
                          />
                          {/* Título sobreposto */}
                          {item.caption && (
                            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-sm font-semibold px-2 py-1 truncate z-10">
                              {item.caption}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mídia (YouTube) */}
            {isSectionVisible('youtube') && user.youtubeVideoUrl && (
              <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={youtubeRef}>
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
              </Card>
            )}

            {/* Experiência Profissional + Formação Acadêmica em duas colunas */}
            {(isSectionVisible('experience') && experience.length > 0) || (isSectionVisible('education') && education.length > 0) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Experiência Profissional */}
                {isSectionVisible('experience') && experience.length > 0 && (
                  <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={experienceRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                        {/* <Building className="w-6 h-6 text-primary" /> */} Experiência Profissional
                        {isEditing && (
                          <button
                            type="button"
                            className="ml-1 p-1 rounded-full hover:bg-muted transition"
                            title="Adicionar experiência"
                            aria-label="Adicionar experiência"
                          >
                            <Plus className="w-5 h-5 text-primary" />
                          </button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {experience.map((exp, idx) => (
                          <div key={exp.id || idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-lg">{exp.title}</h3>
                              <p className="text-muted-foreground text-base">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">
                                {exp.startDate && exp.endDate
                                  ? `${exp.startDate} - ${exp.endDate}`
                                  : exp.startDate && !exp.endDate
                                  ? `${exp.startDate} - Atual`
                                  : (exp as any).years || ''
                                }
                              </p>
                              {exp.description && <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Formação Acadêmica */}
                {isSectionVisible('education') && education.length > 0 && (
                  <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={educationRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-foreground">
                        {/* <GraduationCap className="w-6 h-6 text-primary" /> */} Formação Acadêmica
                        {isEditing && (
                          <button
                            type="button"
                            className="ml-1 p-1 rounded-full hover:bg-muted transition"
                            title="Adicionar formação"
                            aria-label="Adicionar formação"
                          >
                            <Plus className="w-5 h-5 text-primary" />
                          </button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {education.map((edu, idx) => (
                          <div key={edu.id || idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold text-lg">{edu.degree}</h3>
                              <p className="text-muted-foreground text-base">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground">
                                {edu.startDate && edu.endDate
                                  ? `${edu.startDate} - ${edu.endDate}`
                                  : edu.startDate && !edu.endDate
                                  ? `${edu.startDate} - Atual`
                                  : (edu as any).years || ''
                                }
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : null}

            {/* Links Sociais */}
            {sortedSocialLinks.length > 0 && (
              <Card className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg transition-colors" ref={skillsRef}>
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
              </Card>
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
            setServicesItems(items => [{ ...serviceForm, id: Date.now().toString() }, ...items]);
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
            setExperienceItems(items => [{
              id: Date.now().toString(),
              title: experienceForm.title,
              company: experienceForm.company,
              startDate: '',
              endDate: '',
              description: experienceForm.description,
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
            onPrimaryColorChange={color => { setPrimaryColor(color); setIsThemeOpen(false); }}
            onSecondaryColorChange={color => { setSecondaryColor(color); setIsThemeOpen(false); }}
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
  plan: 'standard',
};