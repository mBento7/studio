"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
} from "lucide-react";
import type { ProfileLayoutProps, UserProfile } from "@/lib/types";
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

const platformIcons: Record<string, any> = {
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  github: Github,
  facebook: Facebook,
  twitch: Twitch,
  website: Globe,
};

const ProProfileLayout: React.FC<ProfileLayoutProps & {
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
  const [activeTab, setActiveTab] = useState('overview');

  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  useEffect(() => {
    setMounted(true);
  }, []);

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };

  const handleDownloadQrCode = async () => {
    console.log("Download QR Code");
  };

  const StatCard = ({ icon: Icon, label, value, trend }: { icon: any, label: string, value: string, trend?: string }) => (
    <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
          {trend && (
            <p className="text-sm text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="p-3 bg-primary/10 rounded-lg">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );

  const ServiceCard = ({ service }: { service: any }) => (
    <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Briefcase className="w-5 h-5 text-primary" />
        </div>
        {service.price && (
          <Badge variant="secondary" className="font-semibold">
            {service.price}
          </Badge>
        )}
      </div>
      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
        {service.name}
      </h3>
      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
        {service.description}
      </p>
      <Button size="sm" className="w-full">
        Solicitar Orçamento
        <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );

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
      {/* Hero Section */}
      <div className="relative">
        {/* Imagem de capa */}
        {user.cover_photo_url && (
          <div className="h-80 w-full relative">
            <img
              src={user.cover_photo_url}
              alt="Capa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-transparent" />
          </div>
        )}

        {/* Card flutuante */}
        <div className="absolute left-1/2 top-56 transform -translate-x-1/2 w-full max-w-5xl px-4 z-10">
          <div className="bg-white/90 dark:bg-slate-900/90 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center md:items-end gap-8 p-8 relative">
            {/* Badge PREMIUM */}
            {user.plan === 'premium' && (
              <span className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold px-4 py-1 rounded-full shadow-lg text-sm flex items-center gap-2 z-20">
                <Star className="w-4 h-4" /> PREMIUM
              </span>
            )}
            {/* Foto de perfil circular */}
            <div className="relative -mt-24 md:-mt-32">
              <img
                src={user.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                alt={user.name}
                className="w-40 h-40 rounded-full border-4 border-primary shadow-lg object-cover"
              />
              <span className="absolute bottom-2 right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                <CheckCircle className="w-5 h-5 text-white" />
              </span>
            </div>
            {/* Infos */}
            <div className="flex-1 text-center md:text-left min-w-0">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-2"
                style={{ fontFamily: font && font !== 'default' ? font : undefined }}
              >
                {user.name}
              </h1>
              <p className="text-lg text-primary font-semibold">{user.category}</p>
              <p className="text-muted-foreground mt-2 break-words">{user.bio}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4">
                {/* Social links */}
                {socialLinks.map(link => {
                  const Icon = platformIcons[link.platform] || Globe;
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-primary/10 hover:bg-primary/20 rounded-full p-3 transition focus:outline-none focus:ring-2 focus:ring-primary"
                      aria-label={`Acessar ${link.platform}`}
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </a>
                  );
                })}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-6 justify-center md:justify-start flex-wrap">
                <Button size="lg" className="px-8" aria-label="Entrar em Contato">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Entrar em Contato
                </Button>
                <Button variant="outline" size="lg" aria-label="Download QR">
                  <Download className="w-5 h-5 mr-2" />
                  Download QR
                </Button>
                {/* Botão Compartilhar */}
                <Button variant="ghost" size="lg" className="border border-primary text-primary hover:bg-primary/10" aria-label="Compartilhar Perfil" onClick={() => navigator.share ? navigator.share({ title: user.name, url: window.location.href }) : navigator.clipboard.writeText(window.location.href)}>
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8 pt-48">
        {/* Banner Premium */}
        {user.premiumBanner && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-r from-yellow-400 via-primary to-yellow-500 text-white relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-6 p-8">
              <img src={user.premiumBanner.imageUrl} alt={user.premiumBanner.title} className="w-32 h-32 rounded-xl object-cover shadow-lg border-4 border-white" />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-300" /> {user.premiumBanner.title}
                </h2>
                <p className="mb-4 text-lg">{user.premiumBanner.description}</p>
                {user.premiumBanner.ctaText && user.premiumBanner.ctaLink && (
                  <a href={user.premiumBanner.ctaLink} className="inline-block bg-white text-primary font-semibold px-6 py-2 rounded-full shadow hover:bg-primary hover:text-white transition focus:outline-none focus:ring-2 focus:ring-primary">
                    {user.premiumBanner.ctaText}
                  </a>
                )}
              </div>
            </div>
            {/* Selo PREMIUM flutuante */}
            <span className="absolute top-4 right-4 bg-yellow-500 text-white font-bold px-4 py-1 rounded-full shadow-lg text-sm flex items-center gap-2 z-20">
              <Star className="w-4 h-4" /> PREMIUM
            </span>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5 text-primary" />
                  Especialidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, idx) => (
                    <Badge 
                      key={skill + idx} 
                      variant="secondary" 
                      className="px-4 py-2 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Services Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-primary" />
                  Serviços Oferecidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {services.map((service, idx) => (
                    <ServiceCard key={service + idx} service={service} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Portfolio Section */}
            {portfolio.length > 0 && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="w-5 h-5 text-primary" />
                    Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                    {portfolio.slice(0, 6).map((item, idx) => (
                      <div 
                        key={item.id} 
                        className="aspect-square rounded-xl overflow-hidden border shadow-sm cursor-pointer group relative hover:shadow-lg transition-all duration-300"
                        onClick={() => onPortfolioItemClick && onPortfolioItemClick(item)}
                      >
                        <img 
                          src={item.imageUrl} 
                          alt={item.caption || 'Portfólio'} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Experience */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="w-5 h-5 text-primary" />
                  Experiência
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {experience.length > 0 ? (
                  experience.map((exp, idx) => (
                    <div key={exp.id} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-semibold text-foreground">{exp.title}</h4>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.years}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhuma experiência listada.</p>
                )}
              </CardContent>
            </Card>

            {/* Education */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  Formação
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {education.length > 0 ? (
                  education.map((edu, idx) => (
                    <div key={edu.id} className="border-l-2 border-primary/20 pl-4">
                      <h4 className="font-semibold text-foreground">{edu.degree}</h4>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground">{edu.years}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted-foreground text-sm">Nenhuma formação listada.</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="border-0 shadow-lg bg-primary/5">
              <CardHeader>
                <CardTitle className="text-center">Vamos Conversar?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-center text-sm text-muted-foreground">
                  Interessado em trabalhar comigo? Entre em contato!
                </p>
                <div className="space-y-3">
                  {user.whatsappNumber && (
                    <Button className="w-full" asChild>
                      <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  )}
                  {user.email && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={`mailto:${user.email}`}>
                        <Mail className="w-4 h-4 mr-2" />
                        E-mail
                      </a>
                    </Button>
                  )}
                  {user.website && (
                    <Button variant="outline" className="w-full" asChild>
                      <a href={user.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Website
                      </a>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* FAQ */}
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
                      <div key={item.id} className="border-b pb-4">
                        <h4 className="font-semibold text-lg mb-1">{item.question}</h4>
                        <p className="text-muted-foreground">{item.answer}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProProfileLayout;

export const segmentConfig = {
  id: 'pro-profile',
  name: 'Pro',
  description: 'Layout avançado para profissionais premium.',
  imageUrl: 'https://picsum.photos/seed/layout-pro/300/200',
  plan: 'premium',
};
