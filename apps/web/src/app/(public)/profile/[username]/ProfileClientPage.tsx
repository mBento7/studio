"use client";

// Todo o código que estava em page.tsx foi movido para cá.
// Este é um Client Component que lida com estado, interatividade e hooks.

import React, { useState, useEffect, use } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, Loader2, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";
import { DigitalBusinessCard } from '@/features/profile/digital-business-card';
import { PortfolioItemModal } from '@/features/profile/portfolio-item-modal';
import { PremiumBannerDisplay } from '@/features/landing/premium-banner-display';
import { platformIcons } from "@/lib/types";
// Removidos notFound e getMockUserByUsername, pois são responsabilidades do Server Component
// import { notFound } from "next/navigation";
// import { getMockUserByUsername, mockUserProfiles } from "@/lib/mock-data";

// Componentes de layout de perfil
import FreeProfileLayout from "@/components/profile-layouts/FreeProfileLayout";
import StandardProfileLayout from "@/components/profile-layouts/StandardProfileLayout";
import PremiumProfileLayout from "@/components/profile-layouts/PremiumProfileLayout";
import { LeftProfileSidebar } from "@/components/layout/left-profile-sidebar";
import { isPremiumLayout } from "@/lib/isPremiumLayout";
import { ChatFloatingBox } from '@/components/chat/ChatFloatingBox';
import { useRouter } from 'next/navigation';

interface ProfileClientPageProps {
  userProfile: UserProfile;
  hideRightSidebar?: boolean;
}

// Função utilitária para checar se o perfil está realmente completo (ambas imagens)
function isProfileReallyComplete(user: UserProfile) {
  return !!user.profile_picture_url && user.profile_picture_url.trim() !== '' &&
         !!user.cover_photo_url && user.cover_photo_url.trim() !== '';
}

export const ProfileClientPage = ({ userProfile: initialUserProfile, hideRightSidebar = false }: ProfileClientPageProps) => {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading, currentUserProfile } = useAuth();
  const router = useRouter();
  
  const [mounted, setMounted] = useState(false);
  const [userToDisplay, setUserToDisplay] = useState<UserProfile | null>(initialUserProfile);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [primaryColorHex, setPrimaryColorHex] = useState('008080');

  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const isCurrentUserPremium = currentUserProfile?.plan === 'standard' || currentUserProfile?.plan === 'premium';

  const handleOpenPortfolioModal = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setIsPortfolioModalOpen(true);
  };
  
  // Detectar tema e montar
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (storedTheme) {
        setTheme(storedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark" : "light");
      }
      setMounted(true);
    }
  }, []);

  // Buscar perfil - Agora o perfil é passado diretamente como prop do Server Component
  useEffect(() => {
    // Apenas garante que o userToDisplay esteja sincronizado se initialUserProfile mudar (o que não deve acontecer no servidor)
    // Se houver lógica de atualização de perfil do cliente (ex: edição), isso precisará ser gerenciado separadamente.
    if (initialUserProfile && !userToDisplay) {
      setUserToDisplay(initialUserProfile);
    }
  }, [initialUserProfile, userToDisplay]);

  // Gerar QR Code
  useEffect(() => {
    if (!userToDisplay || typeof window === 'undefined') return;

    const computedStyle = getComputedStyle(document.documentElement);
    const primaryHsl = computedStyle.getPropertyValue('--primary').trim();
    let colorForQr = '008080';

    if (primaryHsl) {
      const match = primaryHsl.match(/(\d+(\.\d+)?)\s*(\d+(\.\d+)?)%\s*(\d+(\.\d+)?)%/);
      if (match) {
        const h = parseFloat(match[1]);
        const s = parseFloat(match[3]);
        const l = parseFloat(match[5]);

        const sDecimal = s / 100;
        const lDecimal = l / 100;
        const k = (n: number) => (n + h / 30) % 12;
        const a = sDecimal * Math.min(lDecimal, 1 - lDecimal);
        const f = (n: number) => lDecimal - a * Math.max(-1, Math.min(9 - k(n), 1));

        const toHex = (x: number) => {
          const hex = Math.round(x * 255).toString(16).padStart(2, '0');
          return hex;
        };

        colorForQr = `${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
      } else if (primaryHsl.startsWith('#')) {
        colorForQr = primaryHsl.replace('#', '');
      }
    }

    if (userToDisplay.username) {
      const profileUrl = `${window.location.origin}/profile/${userToDisplay.username}`;
      const bgColor = theme === 'dark' ? '1A1A1A' : 'FFFFFF';
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profileUrl)}&color=${colorForQr}&bgcolor=${bgColor}&format=png&qzone=1`;
      setQrCodeUrl(qrUrl);
      setPrimaryColorHex(colorForQr);
    }
  }, [userToDisplay, theme]);

  // Listener para abrir chat flutuante ao clicar em conversa no messenger
  useEffect(() => {
    const handler = (e: any) => {
      if (e.detail?.user) {
        setIsChatOpen(true);
        setUserToDisplay(e.detail.user);
      }
    };
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  const handleChatButtonClick = () => {
    if (!isCurrentUserPremium) {
      toast({
        title: "Funcionalidade Premium",
        description: "Para iniciar um chat, você precisa de um plano Standard ou Premium. Faça upgrade para ter acesso!",
        variant: "destructive",
        action: <Link href="/planos"><Button variant="outline">Ver Planos</Button></Link>,
      });
      return;
    }
    setIsChatOpen(true);
  };

  const handleUpgradeClick = () => {
    router.push('/planos');
  };

  if (authLoading || !userToDisplay || !mounted) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mr-3" />
        Carregando perfil...
      </div>
    );
  }

  const commonLayoutProps = {
    user: userToDisplay,
    primaryColorHex: primaryColorHex,
    isCurrentUserProfile: authUser?.id === userToDisplay.id,
    qrCodeUrl: qrCodeUrl,
    onPortfolioItemClick: handleOpenPortfolioModal,
    toast: toast,
    mounted: mounted,
  };

  // Extrair propriedades de aparência customizadas do perfil
  const premiumAppearanceProps = {
    primaryColor: (userToDisplay as any).primaryColor || (userToDisplay as any).data?.primaryColor,
    secondaryColor: (userToDisplay as any).secondaryColor || (userToDisplay as any).data?.secondaryColor,
    font: (userToDisplay as any).font || (userToDisplay as any).data?.font,
  };

  const renderProfileLayout = () => {
    // Lógica para determinar o layout baseado no plano e imagens
    if (userToDisplay.plan === 'free') {
      return <FreeProfileLayout {...commonLayoutProps} />;
    } else if (userToDisplay.plan === 'standard') {
      if (userToDisplay.layoutTemplateId === 'standard') {
        return <StandardProfileLayout {...commonLayoutProps} {...premiumAppearanceProps} />;
      }
      return <FreeProfileLayout {...commonLayoutProps} />;
    } else if (userToDisplay.plan === 'premium') {
      if (userToDisplay.layoutTemplateId === 'premiumprofile') {
        return <PremiumProfileLayout {...commonLayoutProps} {...premiumAppearanceProps} />;
      } else if (userToDisplay.layoutTemplateId === 'standard') {
        return <StandardProfileLayout {...commonLayoutProps} {...premiumAppearanceProps} />;
      } else {
        return <StandardProfileLayout {...commonLayoutProps} {...premiumAppearanceProps} />; // fallback
      }
    }
    // Fallback para qualquer caso não coberto ou plano desconhecido
    return <FreeProfileLayout {...commonLayoutProps} />;
  };

  return (
    <>
      {/* Mobile: apenas o layout do perfil */}
      <div className="block md:hidden">
        {renderProfileLayout()}
      </div>
      {/* Desktop: renderização existente */}
      <div className="hidden md:block">
        {authUser?.id === userToDisplay.id && (
          <Link href="/dashboard/profile-edit-v2?step=appearance">
            <Button
              variant="ghost"
              className="fixed top-6 right-6 z-50 bg-white/80 hover:bg-white shadow-lg rounded-full p-3 border border-primary"
              title="Personalizar aparência do perfil"
            >
              <Edit3 className="w-6 h-6 text-primary" />
            </Button>
          </Link>
        )}
        {/* Botão de chat para visitantes logados (não o próprio perfil) */}
        {authUser && authUser.id !== userToDisplay.id && (
          <Button
            variant={isCurrentUserPremium ? "default" : "outline"}
            className="fixed bottom-8 right-8 z-50 shadow-lg rounded-full p-4 sm:bottom-[88px]"
            onClick={handleChatButtonClick}
            title={isCurrentUserPremium ? "Chamar no chat" : "Recurso premium"}
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            {isCurrentUserPremium ? "Chamar no chat" : "Fazer Upgrade"}
          </Button>
        )}
        {renderProfileLayout()}
        <PortfolioItemModal 
          item={selectedPortfolioItem}
          open={isPortfolioModalOpen}
          onOpenChange={setIsPortfolioModalOpen}
        />
        {/* Caixa de chat flutuante */}
        {authUser && authUser.id !== userToDisplay.id && (
          <ChatFloatingBox
            open={isChatOpen}
            onOpenChange={setIsChatOpen}
            otherUser={userToDisplay}
          />
        )}
      </div>
    </>
  );
}
