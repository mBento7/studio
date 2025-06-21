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
  ExternalLink
} from "lucide-react";

interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  phone?: string;
  bio: string;
  category: string;
  profilePictureUrl?: string;
  coverPhotoUrl?: string;
  website?: string;
  whatsappNumber?: string;
  location?: {
    city: string;
    state?: string;
    country: string;
    address?: string;
    googleMapsUrl?: string;
  };
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    years: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    years: string;
  }>;
  portfolio?: PortfolioItem[];
  services?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
  socialLinks?: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  youtubeVideoUrl?: string;
  youtubeVideoTitle?: string;
  youtubeVideoDescription?: string;
  stories?: Array<{
    imageUrl: string;
    title: string;
  }>;
  premiumBanner?: {
    imageUrl: string;
    title: string;
    description: string;
    ctaText?: string;
    ctaLink?: string;
  };
  coupons?: Array<{
    code: string;
    description: string;
  }>;
  plan?: string;
}

interface PortfolioItem {
  id: string;
  imageUrl: string;
  caption?: string;
  description?: string;
}

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

interface PremiumProLayoutProps {
  user?: UserProfile;
  isCurrentUserProfile?: boolean;
  qrCodeUrl?: string | null;
  onPortfolioItemClick?: (item: PortfolioItem) => void;
}

const PremiumProLayout: React.FC<PremiumProLayoutProps> = ({
  user = {
    id: "1",
    name: "Dr. Maria Silva",
    username: "mariasilva",
    email: "maria@exemplo.com",
    phone: "+55 11 99999-9999",
    bio: "Especialista em Marketing Digital com mais de 10 anos de experiência. Ajudo empresas a crescerem online através de estratégias inovadoras e resultados comprovados.",
    category: "Consultora de Marketing Digital",
    profilePictureUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    coverPhotoUrl: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop",
    website: "https://mariasilva.com",
    whatsappNumber: "5511999999999",
    location: {
      city: "São Paulo",
      state: "SP",
      country: "Brasil",
      address: "Av. Paulista, 1000"
    },
    skills: ["Marketing Digital", "SEO", "Google Ads", "Analytics", "Estratégia", "Consultoria"],
    experience: [
      { title: "Diretora de Marketing", company: "TechCorp", years: "2020-2024" },
      { title: "Gerente de Marketing", company: "StartupXYZ", years: "2018-2020" }
    ],
    education: [
      { degree: "MBA em Marketing", institution: "FGV", years: "2018" },
      { degree: "Bacharelado em Administração", institution: "USP", years: "2016" }
    ],
    portfolio: [
      { id: "1", imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=300&fit=crop", caption: "Projeto A" },
      { id: "2", imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=300&fit=crop", caption: "Projeto B" }
    ],
    services: [
      { name: "Consultoria em Marketing Digital", description: "Análise completa e estratégia personalizada", price: "R$ 2.500" },
      { name: "Gestão de Campanhas", description: "Criação e otimização de campanhas publicitárias", price: "R$ 1.800" }
    ],
    socialLinks: [
      { id: "1", platform: "linkedin", url: "https://linkedin.com/in/mariasilva" },
      { id: "2", platform: "instagram", url: "https://instagram.com/mariasilva" }
    ],
    plan: "premium"
  },
  isCurrentUserProfile = false,
  qrCodeUrl = null,
  onPortfolioItemClick = () => {}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900">
      {/* Hero Section */}
      <div className="relative">
        {/* Cover Image */}
        {user.coverPhotoUrl && (
          <div className="h-80 relative overflow-hidden">
            <img 
              src={user.coverPhotoUrl} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
        )}
        
        {/* Profile Header */}
        <div className="relative">
          <div className="container mx-auto px-6 py-8">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              {/* Profile Picture */}
              <div className="relative -mt-20 lg:-mt-16">
                <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-white">
                  <img
                    src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 lg:mt-4">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">
                      {user.name}
                    </h1>
                    <p className="text-xl text-primary font-semibold mb-3">
                      {user.category}
                    </p>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl mb-4">
                      {user.bio}
                    </p>
                    
                    {/* Contact Info */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      {user.email && (
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          <span>{user.email}</span>
                        </div>
                      )}
                      {user.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          <span>{user.phone}</span>
                        </div>
                      )}
                      {location.city && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{location.city}, {location.country}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button size="lg" className="px-8">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Entrar em Contato
                    </Button>
                    <Button variant="outline" size="lg">
                      <Download className="w-5 h-5 mr-2" />
                      Download QR
                    </Button>
                  </div>
                </div>

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex gap-3 mt-6">
                    {socialLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Globe;
                      return (
                        <Button
                          key={link.id}
                          variant="outline"
                          size="sm"
                          className="rounded-full w-10 h-10 p-0"
                          asChild
                        >
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Icon className="w-4 h-4" />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          <StatCard 
            icon={Users} 
            label="Clientes Atendidos" 
            value="150+" 
            trend="+12% este mês"
          />
          <StatCard 
            icon={Star} 
            label="Avaliação Média" 
            value="4.9" 
          />
          <StatCard 
            icon={Award} 
            label="Projetos Concluídos" 
            value="85" 
          />
          <StatCard 
            icon={Calendar} 
            label="Anos de Experiência" 
            value="10+" 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                      key={idx} 
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.map((service, idx) => (
                    <ServiceCard key={idx} service={service} />
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="aspect-square rounded-xl overflow-hidden border shadow-sm cursor-pointer group relative hover:shadow-lg transition-all duration-300"
                        onClick={() => onPortfolioItemClick(item)}
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
                    <div key={idx} className="border-l-2 border-primary/20 pl-4">
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
                    <div key={idx} className="border-l-2 border-primary/20 pl-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumProLayout;

export const config = {
  id: 'premium-pro',
  name: 'Premium Pro',
  description: 'Layout profissional para um perfil detalhado e completo.',
  imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=300&h=200&fit=crop',
  plan: 'premium',
};
