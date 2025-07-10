"use client";

import React, { useState, useRef, useCallback, lazy, Suspense, useEffect } from 'react';
import type { ProfileLayoutProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Maximize,
  Globe,
  GraduationCap,
  Briefcase,
  Star,
  Edit,
  MessageSquare,
  Share2
} from "lucide-react";
import { platformIcons } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../ui/tooltip';

const PortfolioItemModal = lazy(() => import('@/features/profile/portfolio-item-modal').then(mod => ({ default: mod.PortfolioItemModal })));

const FreeProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
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
  const displayedLinks = sortedSocialLinks.slice(0, 3);
  const location = user.location || { city: "", country: "" };

  const sectionRefs = {
    skills: useRef<HTMLDivElement>(null),
    portfolio: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
  };

  const handleSectionClick = useCallback((section: keyof typeof sectionRefs) => {
    sectionRefs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [sectionRefs]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Fechar modais se existirem
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  function isSectionVisible(section: string) {
    if (!user.public_sections) return true;
    return user.public_sections[section] !== false;
  }

  if (user.public_visibility === false && !isCurrentUserProfile) {
    return <div className="text-center p-8">Este perfil é privado.</div>;
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="shadow-xl rounded-2xl overflow-hidden border-0 bg-white dark:bg-slate-900 dark:border-slate-700">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Column: Avatar & Basic Info */}
              <div className="md:col-span-1 flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white dark:border-slate-800 shadow-lg ring-2 ring-primary/40">
                  <AvatarImage src={user.profile_picture_url} alt={user.name} />
                  <AvatarFallback className="text-4xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: user.name,
                        text: user.bio,
                        url: typeof window !== 'undefined' ? window.location.href : ''
                      });
                    } else {
                      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                      alert('Link do perfil copiado!');
                    }
                  }}
                  className="rounded-full flex items-center gap-1 mt-4 w-fit"
                  aria-label="Compartilhar perfil"
                >
                  <Share2 className="w-4 h-4" /> Compartilhar perfil
                </Button>

                {/* Social links com tooltip e aria-label */}
                {displayedLinks.length > 0 && (
                  <div className="flex justify-center gap-3 mt-6">
                    {displayedLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Globe;
                      return (
                        <Button asChild key={link.id} variant="outline" size="icon" className="rounded-full transition-all duration-200 hover:bg-primary/10 focus:ring-2 focus:ring-primary" aria-label={link.platform} title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}>
                          <a href={link.url} target="_blank" rel="noopener noreferrer">
                            <Icon className="w-4 h-4" />
                          </a>
                        </Button>
                      );
                    })}
                  </div>
                )}
              </div>
              
              {/* Right Column: Bio & Actions */}
              <div className="md:col-span-2 space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-3xl font-bold text-foreground dark:text-white">{user.name}</h1>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: user.name,
                        text: user.bio,
                        url: typeof window !== 'undefined' ? window.location.href : ''
                      });
                    } else {
                      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
                      alert('Link do perfil copiado!');
                    }
                  }}
                  className="rounded-full flex items-center gap-1 mt-2 w-fit"
                  aria-label="Compartilhar perfil"
                >
                  <Star className="w-4 h-4" /> Compartilhar perfil
                </Button>
                <p className="text-primary font-light text-lg">{user.category}</p>
                <p className="text-base leading-relaxed text-foreground">
                  <span>{user.bio}</span>
                </p>
                <div className="flex flex-col gap-3 text-sm text-muted-foreground mt-4">
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
                  {user.email && (
                    <Button asChild className="w-fit transition-all duration-200 hover:bg-primary/20 focus:ring-2 focus:ring-primary">
                      <a href={`mailto:${user.email}`} className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        <span className="dark:text-slate-300">{user.email}</span>
                      </a>
                    </Button>
                  )}
                  {user.phone && (
                    <Button asChild className="w-fit bg-primary text-white shadow-lg hover:bg-primary/90 focus:ring-2 focus:ring-primary transition-all duration-200">
                      <a href={`tel:${user.phone}`} className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        <span>{user.phone}</span>
                      </a>
                    </Button>
                  )}
                </div>
                {isCurrentUserProfile && (
                  <Button size="lg" variant="outline" asChild className="mt-4">
                    <Link href="/dashboard/my-profile">
                      <Edit className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {isSectionVisible('about') && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="w-5 h-5 text-primary" /> Tags
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-pointer">
                            <InformationCircleIcon className="w-4 h-4 text-muted-foreground" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Adicione tags com suas habilidades, ferramentas e áreas de atuação. Assim, mais pessoas encontrarão você!
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="default" className="text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {isSectionVisible('portfolio') && portfolio.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Globe className="w-5 h-5 text-primary" /> Portfólio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {portfolio.slice(0, 6).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="relative group rounded-lg overflow-hidden shadow-sm cursor-pointer w-full h-40"
                        onClick={() => onPortfolioItemClick?.(item)}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.caption || "Portfólio"}
                          fill
                          style={{ objectFit: "cover" }}
                          sizes="(max-width: 768px) 100vw, 400px"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Exibir avaliações reais e comentários */}
            {user.reviews && user.reviews.length > 0 && (
              <div className="mt-8">
                {/* Importação dinâmica para evitar SSR issues */}
                {(() => {
                  const ReviewList = require("@/components/reviews/ReviewList").ReviewList;
                  return <ReviewList reviewedUserId={user.id} reviews={user.reviews} />;
                })()}
              </div>
            )}

            {isSectionVisible('services') && services.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5 text-primary" /> Serviços</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            {isSectionVisible('experience') && experience.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5 text-primary" /> Experiência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((exp: any, idx: number) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
                      <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.years}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {isSectionVisible('education') && education.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><GraduationCap className="w-5 h-5 text-primary" /> Educação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu: any, idx: number) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
                      <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground">{edu.years}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {qrCodeUrl && (
              <Card className="shadow-lg rounded-xl border-0 flex flex-col items-center p-6">
                 <Image
                    src={qrCodeUrl}
                    alt={`QR Code de ${user.name}`}
                    width={120}
                    height={120}
                    className="rounded-lg border p-1 bg-white shadow-md"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Escaneie para salvar o contato</p>
              </Card>
            )}
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <PortfolioItemModal
          item={portfolio[0]}
          open={false}
          onOpenChange={() => {}}
        />
      </Suspense>
    </div>
  );
};

export default FreeProfileLayout;

export const segmentConfig = {
  id: 'modern',
  name: 'Moderno',
  description: 'Layout moderno e visualmente atrativo, ideal para perfis gratuitos.',
  imageUrl: 'https://picsum.photos/seed/layout-modern/300/200',
  plan: 'free',
};
