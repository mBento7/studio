"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserProfile, PortfolioItem, SocialLink, ProfileLayoutProps } from "@/lib/types";
import { platformIcons } from "@/lib/types";

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

const AdvancedProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const primaryColorHex = user.themeColor || "#4F46E5";

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };
  const stories = user.stories || [];
  const coupons = user.coupons || [];

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

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const youtubeEmbedUrl = user.youtubeVideoUrl ? getYoutubeEmbedUrl(user.youtubeVideoUrl) : null;

  const handleDownloadQrCode = async () => {
    if (!qrCodeUrl) return;
    try {
      const response = await fetch(qrCodeUrl);
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

  return (
    <div className="min-h-screen bg-background">
      <BGPattern variant="grid" mask="fade-edges" />

      {/* Hero Section */}
      <div className="relative">
        {user.coverPhotoUrl && (
          <div className="h-80 w-full overflow-hidden">
            <img
              src={user.coverPhotoUrl}
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}

        <div className="container mx-auto px-6 py-8">
          <div className="relative -mt-20 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col lg:flex-row items-start lg:items-end gap-6"
            >
              <Avatar className="w-32 h-32 border-4 border-background shadow-2xl">
                <AvatarImage
                  src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-2">
                    {user.name}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-3">{user.category}</p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    {user.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span>{user.email}</span>
                      </div>
                    )}
                    {location.city && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{location.city}, {location.country}</span>
                      </div>
                    )}
                    {user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => {
                    const Icon = platformIcons[link.platform] || Globe;
                    return (
                      <Button
                        key={link.id}
                        variant="outline"
                        size="sm"
                        className="hover:scale-105 transition-transform"
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
                      className="bg-green-600 hover:bg-green-700"
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
                    className="hover:scale-105 transition-transform"
                  >
                    <QrCode className="w-4 h-4 mr-2" />
                    QR Code
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="portfolio">Portfólio</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="experience">Experiência</TabsTrigger>
            <TabsTrigger value="media">Mídia</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card className="border-0 shadow-lg" ref={aboutRef}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Sobre
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground/90 leading-relaxed whitespace-pre-line">
                      {user.bio}
                    </p>
                  </CardContent>
                </Card>

                {skills.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={skillsRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Star className="w-5 h-5" />
                        Habilidades
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary" className="px-3 py-1">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {experience.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={experienceRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building className="w-5 h-5" />
                        Experiência Profissional
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {experience.map((exp, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold">{exp.title}</h3>
                              <p className="text-muted-foreground">{exp.company}</p>
                              <p className="text-sm text-muted-foreground">{exp.years}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {education.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={educationRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        Formação Acadêmica
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {education.map((edu, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <div>
                              <h3 className="font-semibold">{edu.degree}</h3>
                              <p className="text-muted-foreground">{edu.institution}</p>
                              <p className="text-sm text-muted-foreground">{edu.years}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {portfolio.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={portfolioRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Palette className="w-5 h-5" />
                        Meu Portfólio
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {portfolio.map((item, idx) => (
                          <motion.div
                            key={idx}
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
                  <Card className="border-0 shadow-lg" ref={servicesRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        Serviços Oferecidos
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {services.map((service, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                          >
                            <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                            <p className="text-muted-foreground mb-3">{service.description}</p>
                            {service.price && (
                              <div className="flex items-center justify-between">
                                <span className="text-primary font-semibold">{service.price}</span>
                                <Button size="sm" variant="outline">
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

                {user.youtubeVideoUrl && youtubeEmbedUrl && (
                  <Card className="border-0 shadow-lg" ref={youtubeRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Youtube className="w-5 h-5" />
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
                  <Card className="border-0 shadow-lg overflow-hidden" ref={premiumBannerRef}>
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
                          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
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
              </div>

              <div className="space-y-6">
                {stories.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={storiesRef}>
                    <CardHeader>
                      <CardTitle>Stories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-3 overflow-x-auto pb-2">
                        {stories.map((story, idx) => (
                          <div key={idx} className="flex flex-col items-center space-y-2 min-w-[80px]">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-1">
                              <div className="bg-background p-1 rounded-full w-full h-full">
                                <img
                                  src={story.imageUrl}
                                  alt="Story"
                                  className="w-full h-full object-cover rounded-full"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-center">{story.title}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {coupons.length > 0 && (
                  <Card className="border-0 shadow-lg" ref={couponsRef}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="w-5 h-5" />
                        Cupons Especiais
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {coupons.map((coupon, idx) => (
                        <div key={idx} className="p-4 rounded-lg border-2 border-dashed border-primary/50 bg-primary/10">
                          <h3 className="font-bold text-lg text-primary">{coupon.code}</h3>
                          <p className="text-sm text-primary/80 mt-1">{coupon.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}

                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>Navegação Rápida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(aboutRef)}>
                        <Users className="w-4 h-4 mr-2" /> Sobre
                      </Button>
                      {skills.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(skillsRef)}>
                          <Star className="w-4 h-4 mr-2" /> Habilidades
                        </Button>
                      )}
                      {experience.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(experienceRef)}>
                          <Building className="w-4 h-4 mr-2" /> Experiência
                        </Button>
                      )}
                      {education.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(educationRef)}>
                          <GraduationCap className="w-4 h-4 mr-2" /> Formação
                        </Button>
                      )}
                      {portfolio.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(portfolioRef)}>
                          <Palette className="w-4 h-4 mr-2" /> Portfólio
                        </Button>
                      )}
                      {services.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(servicesRef)}>
                          <Briefcase className="w-4 h-4 mr-2" /> Serviços
                        </Button>
                      )}
                      {user.youtubeVideoUrl && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(youtubeRef)}>
                          <Youtube className="w-4 h-4 mr-2" /> Vídeo
                        </Button>
                      )}
                      {user.premiumBanner && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(premiumBannerRef)}>
                          <TrendingUp className="w-4 h-4 mr-2" /> Banner Premium
                        </Button>
                      )}
                      {stories.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(storiesRef)}>
                          <Eye className="w-4 h-4 mr-2" /> Stories
                        </Button>
                      )}
                      {coupons.length > 0 && (
                        <Button variant="ghost" className="justify-start" onClick={() => scrollToSection(couponsRef)}>
                          <Award className="w-4 h-4 mr-2" /> Cupons
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Meu Portfólio
                </CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {portfolio.map((item, idx) => (
                      <motion.div
                        key={idx}
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
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum item no portfólio ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Serviços Oferecidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                {services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow"
                      >
                        <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                        <p className="text-muted-foreground mb-3">{service.description}</p>
                        {service.price && (
                          <div className="flex items-center justify-between">
                            <span className="text-primary font-semibold">{service.price}</span>
                            <Button size="sm" variant="outline">
                              Contratar
                              <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">
                    Nenhum serviço cadastrado ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="w-5 h-5" />
                    Experiência Profissional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {experience.length > 0 ? (
                    <div className="space-y-4">
                      {experience.map((exp, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold">{exp.title}</h3>
                            <p className="text-muted-foreground">{exp.company}</p>
                            <p className="text-sm text-muted-foreground">{exp.years}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhuma experiência listada.</p>
                  )}
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Formação Acadêmica
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {education.length > 0 ? (
                    <div className="space-y-4">
                      {education.map((edu, idx) => (
                        <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold">{edu.degree}</h3>
                            <p className="text-muted-foreground">{edu.institution}</p>
                            <p className="text-sm text-muted-foreground">{edu.years}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Nenhuma formação listada.</p>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="media" className="space-y-6">
            {user.youtubeVideoUrl && youtubeEmbedUrl && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Youtube className="w-5 h-5" />
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
              <Card className="border-0 shadow-lg overflow-hidden">
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
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
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

export const config = {
    id: 'advanced',
    name: 'Perfil Avançado',
    description: 'Um layout profissional e completo, com abas e navegação rápida.',
    imageUrl: 'https://picsum.photos/seed/layout-advanced/300/200',
    plan: 'premium',
}; 