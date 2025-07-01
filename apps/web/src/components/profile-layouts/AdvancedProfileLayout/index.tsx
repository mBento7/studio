"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserProfile, PortfolioItem, SocialLink, ProfileLayoutProps } from "@/lib/types";

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

const AdvancedProfileLayout: React.FC<ProfileLayoutProps & {
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

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const couponsRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const premiumBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
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

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  // Adicionar tipagem temporária para user.faq como any
  const faq = (user as any).faq;

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        background: secondaryColor || undefined,
        color: primaryColor || undefined,
      }}
    >
      <BGPattern variant="grid" mask="fade-edges" />

      {/* Hero Section */}
      <div
        className="relative bg-gradient-to-b from-primary/10 to-background pb-16"
        style={{ background: primaryColor ? `${primaryColor}10` : undefined }}
      >
        {user.cover_photo_url && (
          <div className="h-64 md:h-80 w-full overflow-hidden relative">
            <img
              src={user.cover_photo_url}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-24 md:-mt-32 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-center lg:items-start gap-8"
          >
            <div className="flex-shrink-0">
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 border-background shadow-2xl overflow-hidden bg-background">
                <img
                  src={user.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="flex-1 space-y-4 text-center lg:text-left pt-4">
              <div>
                <h1
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                  style={{ fontFamily: font && font !== 'default' ? font : undefined }}
                >
                  {user.name}
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
                {socialLinks.map((link) => {
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

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-8">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-5 mb-8 h-auto p-1 rounded-lg bg-muted/50">
            <TabsTrigger value="overview" className="py-2 px-3 text-sm sm:text-base">Visão Geral</TabsTrigger>
            <TabsTrigger value="portfolio" className="py-2 px-3 text-sm sm:text-base">Portfólio</TabsTrigger>
            <TabsTrigger value="services" className="py-2 px-3 text-sm sm:text-base">Serviços</TabsTrigger>
            <TabsTrigger value="experience" className="py-2 px-3 text-sm sm:text-base">Experiência</TabsTrigger>
            <TabsTrigger value="media" className="py-2 px-3 text-sm sm:text-base">Mídia</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
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

                {skills.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={skillsRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Star className="w-6 h-6 text-primary" />
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

                {experience.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={experienceRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Building className="w-6 h-6 text-primary" />
                        Experiência Profissional
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
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {education.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={educationRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <GraduationCap className="w-6 h-6 text-primary" />
                        Formação Acadêmica
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

                {portfolio.slice(0, 6).length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={portfolioRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Palette className="w-6 h-6 text-primary" />
                        Meu Portfólio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolio.slice(0, 6).map((item, idx) => (
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
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <Maximize className="w-8 h-8 text-white" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {services.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={servicesRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Briefcase className="w-6 h-6 text-primary" />
                        Serviços Oferecidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, idx) => (
                          <motion.div
                            key={service.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                          >
                            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                            <p className="text-muted-foreground mb-3 text-sm">{service.description}</p>
                            {service.price && (
                              <div className="flex items-center justify-between">
                                <span className="text-primary font-semibold text-base">{service.price}</span>
                                <Button size="sm" variant="outline" className="rounded-full">
                                  Contratar
                                  <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.youtubeVideoUrl && mounted && youtubeEmbedUrl && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={youtubeRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Youtube className="w-6 h-6 text-primary" />
                        Vídeo em Destaque
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="aspect-video rounded-lg overflow-hidden border shadow-md mb-4">
                        <iframe
                          className="w-full h-full"
                          src={youtubeEmbedUrl}
                          title={user.youtubeVideoTitle || `Vídeo do YouTube de ${user.name}`}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                      {user.youtubeVideoTitle && (
                        <h3 className="text-xl font-semibold mb-2 text-primary">
                          {user.youtubeVideoTitle}
                        </h3>
                      )}
                      {user.youtubeVideoDescription && (
                        <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                          {user.youtubeVideoDescription}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )}

                {user.premiumBanner && (
                  <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-primary/80 to-purple-600 text-white relative overflow-hidden">
                    <div className="flex flex-col md:flex-row items-center gap-6 p-8">
                      <img src={user.premiumBanner.imageUrl} alt={user.premiumBanner.title} className="w-32 h-32 rounded-xl object-cover shadow-lg border-4 border-white" />
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-2">{user.premiumBanner.title}</h2>
                        <p className="mb-4 text-lg">{user.premiumBanner.description}</p>
                        {user.premiumBanner.ctaText && user.premiumBanner.ctaLink && (
                          <a href={user.premiumBanner.ctaLink} className="inline-block bg-white text-primary font-semibold px-6 py-2 rounded-full shadow hover:bg-primary hover:text-white transition">
                            {user.premiumBanner.ctaText}
                          </a>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {faq && Array.isArray(faq) && faq.length > 0 && (
                  <Card className="mb-8 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <MessageSquare className="w-6 h-6 text-primary" />
                        Perguntas Frequentes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {faq.map((item, idx) => (
                          <div key={item.id || idx} className="border-b pb-4">
                            <h4 className="font-semibold text-lg mb-1">{item.question}</h4>
                            <p className="text-muted-foreground">{item.answer}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.reviews && user.reviews.length > 0 && (
                  <Card className="mb-8 border-0 shadow-lg">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Star className="w-6 h-6 text-primary" />
                        Avaliações de Clientes
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {user.reviews.map((review, idx) => (
                          <div key={review.id || idx} className="p-4 rounded-lg bg-muted/50 border border-border flex flex-col md:flex-row gap-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="w-12 h-12">
                                <AvatarImage src={review.authorAvatarUrl || '/avatar-default.png'} alt={review.authorName} />
                                <AvatarFallback>{review.authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="flex items-center gap-1">
                                  {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" />)}
                                </div>
                                <span className="font-semibold">{review.authorName}</span>
                                <span className="block text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-base text-foreground">{review.comment}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="space-y-6">
                {user.stories && user.stories.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={storiesRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Eye className="w-6 h-6 text-primary" />
                        Stories
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                        {user.stories.map((story, idx) => (
                          <div key={story.id || idx} className="flex flex-col items-center space-y-2 min-w-[80px] cursor-pointer hover:scale-105 transition-transform">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-1">
                              <div className="bg-background p-1 rounded-full w-full h-full">
                                <img
                                  src={story.imageUrl}
                                  alt="Story"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-center text-muted-foreground">{story.title}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {user.coupons && user.coupons.length > 0 && (
                  <Card className="border-0 shadow-lg rounded-xl" ref={couponsRef}>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                        <Award className="w-6 h-6 text-primary" />
                        Cupons Especiais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {user.coupons.map((coupon, idx) => (
                        <div key={coupon.id || idx} className="p-4 rounded-lg border-2 border-dashed border-primary/50 bg-primary/10">
                          <h3 className="font-bold text-lg text-primary">{coupon.code}</h3>
                          <p className="text-sm text-primary/80 mt-1">{coupon.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg rounded-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center justify-between text-2xl font-semibold cursor-pointer" onClick={() => setShowQuickNav(!showQuickNav)}>
                      Navegação Rápida
                      {showQuickNav ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </CardTitle>
                  </CardHeader>
                  <AnimatePresence>
                    {showQuickNav && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <CardContent>
                          <div className="flex flex-col gap-2">
                            <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(aboutRef)}>
                              <Users className="w-5 h-5 mr-2 text-primary" /> Sobre
                            </Button>
                            {skills.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(skillsRef)}>
                                <Star className="w-5 h-5 mr-2 text-primary" /> Habilidades
                              </Button>
                            )}
                            {experience.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(experienceRef)}>
                                <Building className="w-5 h-5 mr-2 text-primary" /> Experiência
                              </Button>
                            )}
                            {education.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(educationRef)}>
                                <GraduationCap className="w-5 h-5 mr-2 text-primary" /> Formação
                              </Button>
                            )}
                            {portfolio.slice(0, 6).length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(portfolioRef)}>
                                <Palette className="w-5 h-5 mr-2 text-primary" /> Portfólio
                              </Button>
                            )}
                            {services.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(servicesRef)}>
                                <Briefcase className="w-5 h-5 mr-2 text-primary" /> Serviços
                              </Button>
                            )}
                            {user.youtubeVideoUrl && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(youtubeRef)}>
                                <Youtube className="w-5 h-5 mr-2 text-primary" /> Vídeo
                              </Button>
                            )}
                            {user.premiumBanner && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(premiumBannerRef)}>
                                <TrendingUp className="w-5 h-5 mr-2 text-primary" /> Banner Premium
                              </Button>
                            )}
                            {user.stories && user.stories.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(storiesRef)}>
                                <Eye className="w-5 h-5 mr-2 text-primary" /> Stories
                              </Button>
                            )}
                            {user.coupons && user.coupons.length > 0 && (
                              <Button variant="ghost" className="justify-start text-base hover:bg-muted/50" onClick={() => scrollToSection(couponsRef)}>
                                <Award className="w-5 h-5 mr-2 text-primary" /> Cupons
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Palette className="w-6 h-6 text-primary" />
                  Meu Portfólio
                </CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.slice(0, 6).length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {portfolio.slice(0, 6).map((item, idx) => (
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
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-8 h-8 text-white" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8 text-base">
                    Nenhum item no portfólio ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-0 shadow-lg rounded-xl">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                  <Briefcase className="w-6 h-6 text-primary" />
                  Serviços Oferecidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                      <motion.div
                        key={service.id || idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                      >
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-muted-foreground mb-3 text-sm">{service.description}</p>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-semibold text-base">{service.price}</span>
                            <Button size="sm" variant="outline" className="rounded-full">
                              Contratar
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8 text-base">
                    Nenhum serviço cadastrado ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Building className="w-6 h-6 text-primary" />
                    Experiência Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp, idx) => (
                        <div key={exp.id || idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-lg">{exp.title}</h3>
                            <p className="text-muted-foreground text-base">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.years}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-base">Nenhuma experiência listada.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    Formação Acadêmica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.length > 0 ? (
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
                  ) : (
                    <p className="text-muted-foreground text-base">Nenhuma formação listada.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            {user.youtubeVideoUrl && mounted && youtubeEmbedUrl && (
              <Card className="border-0 shadow-lg rounded-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
                    <Youtube className="w-6 h-6 text-primary" />
                    Vídeo em Destaque
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden border shadow-md mb-4">
                    <iframe
                      className="w-full h-full"
                      src={youtubeEmbedUrl}
                      title={user.youtubeVideoTitle || `Vídeo do YouTube de ${user.name}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  {user.youtubeVideoTitle && (
                    <h3 className="text-xl font-semibold mb-2 text-primary">
                      {user.youtubeVideoTitle}
                    </h3>
                  )}
                  {user.youtubeVideoDescription && (
                    <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">
                      {user.youtubeVideoDescription}
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {user.premiumBanner && (
              <Card className="border-0 shadow-lg rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={user.premiumBanner.imageUrl}
                    alt={user.premiumBanner.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {user.premiumBanner.title}
                    </h3>
                    <p className="text-lg text-white/90 mb-4">
                      {user.premiumBanner.description}
                    </p>
                    {user.premiumBanner.ctaText && user.premiumBanner.ctaLink && (
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-full">
                        <a
                          href={user.premiumBanner.ctaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {user.premiumBanner.ctaText}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdvancedProfileLayout;

export const segmentConfig = {
    id: 'advanced',
    name: 'Perfil Avançado',
    description: 'Um layout profissional e completo, com abas e navegação rápida.',
    imageUrl: 'https://picsum.photos/seed/layout-advanced/300/200',
    plan: 'premium',
}; 