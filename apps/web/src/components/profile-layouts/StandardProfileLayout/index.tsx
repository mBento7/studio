"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserProfile, PortfolioItem, SocialLink, ProfileLayoutProps } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFeatureAccess } from '@/features/profile/new-edit-flow/useFeatureAccess';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StartChatButton } from "@/components/chat/StartChatButton";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewSummary } from "@/components/reviews/ReviewSummary";
import { supabase } from '@/lib/supabase/client';
import { useToast } from "@/hooks/use-toast";

// AVISO: Avaliações (reviews) só devem existir neste layout e no PremiumProfileLayout!

const platformIcons: Record<string, any> = {
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  facebook: Facebook,
  twitch: Twitch,
  website: Globe,
  globe: Globe,
};

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
  font,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [showQuickNav, setShowQuickNav] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState<{ title: string; description: string; image: File | null }>({ title: '', description: '', image: null });
  const [portfolioItems, setPortfolioItems] = useState(user.portfolio || []);

  // Refs para as seções
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const sociallinks = user.socialLinks || [];
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
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}&color=${primaryColor?.replace("#", "")}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;

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

  // Função utilitária para validar UUID
  const isValidUUID = (uuid: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
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

  // Adicionar tipagem temporária para user.faq como any
  const faq = (user as any).faq;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className="bg-background text-foreground"
      style={{
        background: secondaryColor || undefined,
        color: primaryColor || undefined,
      }}
    >
      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-b from-primary/10 to-background pb-16"
        style={{ background: primaryColor ? `${primaryColor}10` : undefined }}
      >
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

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-6 relative z-10">
          {/* Botão Conversar */}
          {!isCurrentUserProfile && (
            <StartChatButton
              targetUserId={user.id}
              targetUserName={user.name}
              className="absolute top-4 right-4 z-10"
            />
          )}
          <div className="bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col lg:flex-row items-center lg:items-start gap-8 transition-colors">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-8 w-full"
            >
              <div className="flex-shrink-0">
                <div className="relative flex flex-col items-center" style={{ width: '12rem', height: '13rem' }}>
                  <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-background">
                    <img
                      src={profileImage || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
              </div>

              <div className="flex-1 space-y-4 text-center lg:text-left pt-4">
                <div>
                  <h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2 flex items-center gap-2 justify-center lg:justify-start"
                    style={{ fontFamily: font && font !== 'default' ? font : undefined }}
                  >
                    {user.name}
                    {isCurrentUserProfile && (
                      <button
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                        className="ml-2 p-1 rounded-full hover:bg-muted transition"
                        title={isEditing ? 'Visualizar perfil' : 'Editar perfil'}
                        aria-label={isEditing ? 'Visualizar perfil' : 'Editar perfil'}
                      >
                        {isEditing ? (
                          <Eye className="w-5 h-5 text-primary" />
                        ) : (
                          <Edit3 className="w-5 h-5 text-primary" />
                        )}
                      </button>
                    )}
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground mb-4">{user.category}</p>
                  <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-6 gap-y-2 text-sm sm:text-base text-muted-foreground">
                    {user.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{user.email}</span>
                      </div>
                    )}
                    {location.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{location.city}, {location.country}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">
                  {sociallinks.map((link) => {
                    const Icon = platformIcons[link.platform] || Globe;
                    return (
                      <Button
                        key={link.id}
                        variant="outline"
                        size="sm"
                        className="rounded-full hover:scale-105 transition-transform"
                        asChild
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <Icon className="w-4 h-4 mr-2" />
                          {link.platform}
                        </a>
                      </Button>
                    );
                  })}

                  {user.whatsappNumber && (
                    <Button
                      variant="default"
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 rounded-full hover:scale-105 transition-transform"
                      asChild
                    >
                      <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  )}

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownloadQrCode}
                    className="rounded-full hover:scale-105 transition-transform"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleShare}
                    className="rounded-full hover:scale-105 transition-transform"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="w-full mt-8">
          <div className="flex w-full mb-8 h-auto p-1 rounded-lg bg-muted/50 justify-center items-center">
            <Button variant="ghost" onClick={() => scrollToSection(aboutRef)} className="py-2 px-3 text-sm sm:text-base">Visão Geral</Button>
            <Button variant="ghost" onClick={() => scrollToSection(portfolioRef)} className="py-2 px-3 text-sm sm:text-base">Portfólio</Button>
            <Button variant="ghost" onClick={() => scrollToSection(servicesRef)} className="py-2 px-3 text-sm sm:text-base">Serviços</Button>
            <Button variant="ghost" onClick={() => scrollToSection(youtubeRef)} className="py-2 px-3 text-sm sm:text-base">Mídia</Button>
          </div>

          <div className="space-y-8">
            {/* Sobre */}
            <Card className="border-0 shadow-lg rounded-xl" ref={aboutRef}>
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Users className="w-6 h-6 text-primary" />
                  Sobre
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-base">
                  {user.bio}
                </p>
              </CardContent>
            </Card>

            {/* Serviços */}
            {services.length > 0 && (
              <Card className="border-0 shadow-lg rounded-xl" ref={servicesRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Briefcase className="w-6 h-6 text-primary" />
                    Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.slice(0, 6).map((item, idx) => (
                      <div key={item.id || idx} className="rounded-xl overflow-hidden shadow border bg-background p-4">
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
            {portfolioItems.slice(0, 6).length > 0 && (
              <Card className="border-0 shadow-lg rounded-xl" ref={portfolioRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Palette className="w-6 h-6 text-primary" />
                    Meu Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolioItems.slice(0, 6).map((item, idx) => (
                      <motion.div
                        key={item.id || idx}
                        whileHover={{ scale: 1.05 }}
                        className="aspect-square rounded-lg overflow-hidden border shadow-sm cursor-pointer group relative"
                        onClick={() => onPortfolioItemClick(item)}
                      >
                        <img
                          src={item.imageUrl}
                          alt={item.caption || 'Portfólio'}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110"
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
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Mídia (YouTube) */}
            {user.youtubeVideoUrl && (
              <Card className="border-0 shadow-lg rounded-xl" ref={youtubeRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Youtube className="w-6 h-6 text-primary" />
                    Mídia
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

            {/* Seção de Avaliações */}
            <section ref={reviewsRef} className="mb-8 p-4 bg-white shadow-lg rounded-lg">
              <h2 className="text-2xl font-bold mb-4 flex items-center">
                <Star className="w-6 h-6 mr-2 text-yellow-500" /> Avaliações
              </h2>
              <ReviewSummary reviewedUserId={user.id} />
              {!isCurrentUserProfile && currentUserId && (
                <ReviewForm onSubmit={handleReviewSubmit} />
              )}
              <ReviewList reviewedUserId={user.id} currentUserId={currentUserId} />
            </section>

            {/* Habilidades */}
            {skills.length > 0 && (
              <Card className="border-0 shadow-lg rounded-xl" ref={skillsRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Award className="w-6 h-6 text-primary" />
                    Habilidades
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <Badge key={skill + idx} variant="secondary" className="px-4 py-2 text-sm rounded-full">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Experiência Profissional */}
            {experience.length > 0 && (
              <Card className="border-0 shadow-lg rounded-xl" ref={experienceRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Building className="w-6 h-6 text-primary" />
                    Experiência Profissional
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
                      <div key={exp.id || idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">{exp.title}</h3>
                          <p className="text-muted-foreground text-base">{exp.company}</p>
                          <p className="text-sm text-muted-foreground">{exp.years}</p>
                          {exp.description && <p className="text-sm text-muted-foreground mt-1">{exp.description}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Formação Acadêmica */}
            {education.length > 0 && (
              <Card className="border-0 shadow-lg rounded-xl" ref={educationRef}>
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    Formação Acadêmica
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
                      <div key={edu.id || idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-muted-foreground text-base">{edu.institution}</p>
                          <p className="text-sm text-muted-foreground">{edu.years}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Modal de edição de capa */}
      <Dialog open={isCoverImageModalOpen} onOpenChange={setIsCoverImageModalOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Alterar imagem de capa</DialogTitle></DialogHeader>
          <Input type="file" accept="image/*" onChange={e => {
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
          <Input type="file" accept="image/*" onChange={e => {
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
          <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            setServicesItems(items => [{ ...serviceForm, id: Date.now().toString() }, ...items]);
            setIsServiceModalOpen(false);
            setServiceForm({ name: '', description: '', price: '' });
          }}>
            <Input placeholder="Nome do serviço" value={serviceForm.name} onChange={e => setServiceForm(f => ({ ...f, name: e.target.value }))} required />
            <Textarea placeholder="Descrição do serviço" value={serviceForm.description} onChange={e => setServiceForm(f => ({ ...f, description: e.target.value }))} required />
            <Input placeholder="Preço (opcional)" value={serviceForm.price} onChange={e => setServiceForm(f => ({ ...f, price: e.target.value }))} />
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
          <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            setExperienceItems(items => [{ ...experienceForm, id: Date.now().toString() }, ...items]);
            setIsExperienceModalOpen(false);
            setExperienceForm({ title: '', company: '', years: '', description: '' });
          }}>
            <Input placeholder="Cargo" value={experienceForm.title} onChange={e => setExperienceForm(f => ({ ...f, title: e.target.value }))} required />
            <Input placeholder="Empresa" value={experienceForm.company} onChange={e => setExperienceForm(f => ({ ...f, company: e.target.value }))} required />
            <Input placeholder="Período (ex: 2020-2023)" value={experienceForm.years} onChange={e => setExperienceForm(f => ({ ...f, years: e.target.value }))} required />
            <Textarea placeholder="Descrição (opcional)" value={experienceForm.description} onChange={e => setExperienceForm(f => ({ ...f, description: e.target.value }))} />
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
          <form className="space-y-4" onSubmit={e => {
            e.preventDefault();
            setMediaItems(items => [{ url: mediaForm.youtubeUrl }, ...items]);
            setIsMediaModalOpen(false);
            setMediaForm({ youtubeUrl: '' });
          }}>
            <Input placeholder="URL do vídeo do YouTube" value={mediaForm.youtubeUrl} onChange={e => setMediaForm(f => ({ ...f, youtubeUrl: e.target.value }))} required />
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