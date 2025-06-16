"use client";

// Todo o código que estava em page.tsx foi movido para cá.
// Este é um Client Component que lida com estado, interatividade e hooks.

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, Loader2, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from '@/hooks/use-auth';
import { useToast } from "@/hooks/use-toast";
import { DigitalBusinessCard } from '@/app/(public)/components/digital-business-card';
import { PortfolioItemModal } from '@/features/public/portfolio-item-modal';
import { PremiumBannerDisplay } from '@/app/(public)/components/premium-banner-display';

// Layouts - Eles podem ser movidos para seus próprios arquivos em /components/profile-layouts/ se crescerem muito
const DefaultProfileLayout: React.FC<any> = ({ user, isCurrentUserProfile, onPortfolioItemClick }) => {
    const youtubeEmbedUrl = user.youtubeVideoUrl ? `https://www.youtube.com/embed/${user.youtubeVideoUrl.split('v=')[1]}` : null;
    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            {/* O conteúdo do layout permanece o mesmo */}
            {/* ... cole o conteúdo do DefaultProfileLayout aqui ... */}
        </div>
    );
};

// ... Defina os outros layouts (CommercialWebLayout, etc.) aqui da mesma forma

interface ProfileClientPageProps {
  userProfile: UserProfile;
}

export function ProfileClientPage({ userProfile }: ProfileClientPageProps) {
  const { toast } = useToast();
  const { user: authUser, loading: authLoading } = useAuth();
  
  const [mounted, setMounted] = useState(false);
  const [primaryColorHex, setPrimaryColorHex] = useState('008080'); // Cor padrão
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const handleOpenPortfolioModal = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setIsPortfolioModalOpen(true);
  };
  
  // Efeito para montar o componente e definir o tema
  useEffect(() => {
    setMounted(true);
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Efeito para gerar o QR Code
  useEffect(() => {
    if (typeof window !== 'undefined' && userProfile) {
      // Lógica para gerar QR Code e extrair cor primária...
      // (Esta lógica pode ser simplificada ou movida para um hook customizado)
      const profileUrl = `${window.location.origin}/profile/${userProfile.username}`;
      const bgColorForQr = theme === 'dark' ? '1A1A1A' : 'FFFFFF';
      const generatedQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(profileUrl)}&color=${primaryColorHex}&bgcolor=${bgColorForQr}&format=png&qzone=1`;
      setQrCodeUrl(generatedQrUrl);
    }
  }, [userProfile, theme, primaryColorHex]);

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4">Carregando perfil...</p>
      </div>
    );
  }

  const layoutId = userProfile.layoutTemplateId || 'default';
  const isCurrentUserProfile = authUser?.id === userProfile.id;

  const layoutProps = {
    user: userProfile,
    isCurrentUserProfile,
    mounted,
    toast,
    qrCodeUrl,
    onPortfolioItemClick: handleOpenPortfolioModal,
  };

  const SelectedLayoutComponent = () => {
    switch (layoutId) {
      // case 'commercial-web':
      //   return <CommercialWebLayout {...layoutProps} />;
      // Adicione outros casos de layout aqui
      default:
        return <DefaultProfileLayout {...layoutProps} />;
    }
  };

  return (
    <>
      <SelectedLayoutComponent />
      <PortfolioItemModal
        item={selectedPortfolioItem}
        open={isPortfolioModalOpen}
        onOpenChange={setIsPortfolioModalOpen}
      />
    </>
  );
}
