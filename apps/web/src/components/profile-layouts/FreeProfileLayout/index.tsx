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
import { SocialLinks } from "@/components/social/SocialLinks";
import { SkillsList } from "@/components/skills/SkillsList";
import { PortfolioGrid } from "@/components/portfolio/PortfolioGrid";
import { ServicesList } from "@/components/services/ServicesList";
import { ExperienceList } from "@/components/experience/ExperienceList";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ProfileActions } from "@/components/profile-layouts/ProfileActions";
import { LocationInfo } from "@/components/profile-layouts/LocationInfo";
import FreeProfileCardHeader from "@/components/profile-layouts/ProfileCardHeader";
import { ProfileHeader } from "@/components/profile-layouts/ProfileHeader";
import { ProfileCardContainer } from "@/components/profile-layouts/ProfileCardContainer";
import { useProfileQrCode } from "@/components/profile-layouts/useProfileQrCode";

const PortfolioItemModal = lazy(() => import('@/features/profile/portfolio-item-modal').then(mod => ({ default: mod.PortfolioItemModal })));

const FreeProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
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

  type SectionKey = 'skills' | 'portfolio' | 'services' | 'experience' | 'education';
  const handleSectionClick = useCallback((section: SectionKey) => {
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

  function isSectionVisible(section: SectionKey) {
    if (!user.public_sections) return true;
    return user.public_sections[section] !== false;
  }

  if (user.public_visibility === false && !isCurrentUserProfile) {
    return <div className="text-center p-8">Este perfil é privado.</div>;
  }

  const profileUrl = user.username ? `${window?.location?.origin || ''}/profile/${user.username}` : '';
  const { qrCodeUrl, isLoading: isQrLoading } = useProfileQrCode(profileUrl);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-gradient-to-b dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 p-4 md:p-8">
      <div className="relative max-w-6xl mx-auto space-y-10">
        {/* Gradiente no topo, só no light */}
        <div className="absolute inset-x-0 top-0 h-[340px] bg-gradient-to-b from-blue-200 via-slate-100 to-transparent dark:hidden pointer-events-none -z-10" />
        {/* Header Section */}
        <FreeProfileCardHeader user={user} isCurrentUserProfile={isCurrentUserProfile} variant="free" />

        {/* Removido: <ProfileHeader ... /> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-10">
            {isSectionVisible('portfolio') && portfolio.length > 0 && (
              <ProfileCardContainer className="p-6 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                    <Globe className="w-5 h-5 text-primary" /> Portfólio
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <PortfolioGrid
                    items={portfolio}
                    maxToShow={6}
                    variant="free"
                    onItemClick={onPortfolioItemClick}
                  />
                </CardContent>
              </ProfileCardContainer>
            )}

            {isSectionVisible('services') && services.length > 0 && (
              <ProfileCardContainer className="p-6 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                    <Briefcase className="w-5 h-5 text-primary" /> Serviços
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ServicesList
                    services={services}
                    maxToShow={6}
                    variant="free"
                    isCurrentUserProfile={isCurrentUserProfile}
                  />
                </CardContent>
              </ProfileCardContainer>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-10">
            {isSectionVisible('experience') && experience.length > 0 && (
              <ProfileCardContainer className="p-6 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                    <Briefcase className="w-5 h-5 text-primary" /> Experiência
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  <ExperienceList
                    experience={experience}
                    maxToShow={6}
                    variant="free"
                    isCurrentUserProfile={isCurrentUserProfile}
                  />
                </CardContent>
              </ProfileCardContainer>
            )}

            {isSectionVisible('education') && education.length > 0 && (
              <ProfileCardContainer className="p-6 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                    <GraduationCap className="w-5 h-5 text-primary" /> Educação
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2 space-y-4">
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
              </ProfileCardContainer>
            )}
            
            {qrCodeUrl && (
              <ProfileCardContainer className="p-6 shadow-xl flex flex-col items-center">
                 <Image
                    src={qrCodeUrl}
                    alt={`QR Code de ${user.name}`}
                    width={120}
                    height={120}
                    className="rounded-lg border p-1 bg-white shadow-md"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Escaneie para salvar o contato</p>
              </ProfileCardContainer>
            )}
            {isSectionVisible('skills') && (
              <ProfileCardContainer className="p-6 shadow-xl">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl font-bold text-blue-700 dark:text-blue-300">
                    <Star className="w-5 h-5 text-primary" /> Tags
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="ml-1 cursor-pointer">
                            <InformationCircleIcon className="w-4 h-4 text-blue-400 dark:text-blue-400" />
                          </span>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          Adicione tags com suas habilidades, ferramentas e áreas de atuação. Assim, mais pessoas encontrarão você!
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-2">
                  {skills.length > 0 && (
                    <SkillsList
                      skills={skills}
                      maxToShow={8}
                      variant="free"
                    />
                  )}
                </CardContent>
              </ProfileCardContainer>
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
