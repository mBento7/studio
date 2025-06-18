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
import BasicProfileLayout from "@/components/profile-layouts/BasicProfileLayout";
import ModernProfileLayout from "@/components/profile-layouts/ModernProfileLayout";
import AdvancedProfileLayout from "@/components/profile-layouts/AdvancedProfileLayout";
import MinimalistCardLayout from "@/components/profile-layouts/MinimalistCardLayout";
import PortfolioFocusLayout from "@/components/profile-layouts/PortfolioFocusLayout";
import PremiumProLayout from "@/components/profile-layouts/PremiumProLayout";

interface ProfileClientPageProps {
  userProfile: UserProfile;
}

export const ProfileClientPage = ({ userProfile: initialUserProfile }: ProfileClientPageProps) => {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading, currentUserProfile } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [userToDisplay, setUserToDisplay] = useState<UserProfile | null>(initialUserProfile);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [primaryColorHex, setPrimaryColorHex] = useState('008080');

  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

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

  const renderProfileLayout = () => {
    // Lógica para determinar o layout baseado no plano e isProfileComplete
    if (userToDisplay.plan === 'free') {
      if (userToDisplay.isProfileComplete) {
        return <MinimalistCardLayout {...commonLayoutProps} />;
      } else {
        return <BasicProfileLayout {...commonLayoutProps} />;
      }
    } else if (userToDisplay.plan === 'standard') {
      if (userToDisplay.layoutTemplateId === 'portfolio-focus') {
        return <PortfolioFocusLayout {...commonLayoutProps} />;
      } else { // Default para standard
        return <ModernProfileLayout {...commonLayoutProps} />;
      }
    } else if (userToDisplay.plan === 'premium') {
      if (userToDisplay.layoutTemplateId === 'premium-pro') {
        return <PremiumProLayout {...commonLayoutProps} />;
      } else { // Default para premium
        return <AdvancedProfileLayout {...commonLayoutProps} />;
      }
    }
    // Fallback para qualquer caso não coberto ou plano desconhecido
    return <BasicProfileLayout {...commonLayoutProps} />;
  };

  return (
    <>
      {renderProfileLayout()}
      <PortfolioItemModal 
        item={selectedPortfolioItem}
        open={isPortfolioModalOpen}
        onOpenChange={setIsPortfolioModalOpen}
      />
    </>
  );
}
