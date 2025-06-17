
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Eye, Link as LinkIcon, QrCode, MapPin, Info } from 'lucide-react';
import type { UserProfile } from '@/lib/types';
import { cn } from '@/lib/utils';
import { siteConfig } from '@/config/site';
import { useToast } from '@/hooks/use-toast';

interface DigitalBusinessCardProps {
  user: UserProfile;
  primaryColorHex: string;
  mounted: boolean;
  qrCodeUrl: string;
}

export function DigitalBusinessCard({ user, primaryColorHex, mounted, qrCodeUrl }: DigitalBusinessCardProps) {
  const { toast } = useToast();
  
  const handleDownloadQrCode = async () => {
    if (!user || !primaryColorHex) return;
    
    const profileUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/profile/${user.username}` 
        : `${siteConfig.url}/profile/${user.username}`; // Fallback for server/static generation context

    const bgColorForDownload = 'FFFFFF'; // White background for better print/scan compatibility
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}&color=${primaryColorHex.replace("#","")}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;
    
    try {
      toast({ title: "Preparando QR Code para download..." });
      const response = await fetch(qrCodeUrlForDownload);
      if (!response.ok) throw new Error(`Falha ao buscar QR Code: ${response.statusText}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${siteConfig.name}-${user.username}-qrcode.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast({ title: "QR Code Baixado", description: "O QR Code do perfil foi baixado como PNG." });
    } catch (error) {
        console.error("Erro ao baixar QR Code:", error);
        toast({ title: "Erro no Download", description: "Não foi possível baixar o QR Code.", variant: "destructive" });
    }
  };

  const handleViewCardPreview = () => {
    if (typeof window !== 'undefined' && user.username) {
      window.open(`/profile/${user.username}/card-preview`, '_blank');
    } else {
      toast({ title: "Erro", description: "Não foi possível abrir a pré-visualização do cartão.", variant: "destructive"});
    }
  };

  const isFreeUser = user.plan === 'free';
  const isStandardUser = user.plan === 'standard';
  const isPremiumUser = user.plan === 'premium';

  return (
    <div className="space-y-4 text-center">
      {qrCodeUrl && (
        <div className="flex flex-col items-center">
          <div className="relative w-36 h-36 md:w-40 md:h-40 mb-2 rounded-lg border-4 border-card shadow-lg bg-muted overflow-hidden flex items-center justify-center p-1">
              <Image
                  src={qrCodeUrl}
                  alt={`QR Code do perfil de ${user.name}`}
                  width={160}
                  height={160}
                  className="rounded-md"
                  data-ai-hint="qr code"
              />
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Aponte a câmera para acessar meu perfil!
          </p>
        </div>
      )}

      <div className={cn(
          "grid gap-2",
          (isFreeUser || isStandardUser) ? "sm:grid-cols-2" : "sm:grid-cols-1" 
        )}>
         <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownloadQrCode} 
            disabled={!mounted}
            className="w-full"
          >
            <Download className="mr-2 h-4 w-4" /> Baixar QR Code
          </Button>
        
        <Button 
          variant="default" 
          size="sm" 
          onClick={handleViewCardPreview} 
          disabled={!mounted}
          className={cn(
            "w-full",
            (isFreeUser || isStandardUser) ? "sm:col-span-1" : "sm:col-span-1" 
          )}
        >
          <Eye className="mr-2 h-4 w-4" /> Visualizar Cartão
        </Button>
      </div>

       { (isFreeUser) && (
        <p className="text-xs text-muted-foreground pt-2">
            Funcionalidades avançadas de cartão (como PDF) disponíveis nos planos Padrão e Premium.
        </p>
      )}
      { (isStandardUser) && (
        <p className="text-xs text-muted-foreground pt-2">
            Funcionalidade de download do cartão em PDF disponível no plano Premium.
        </p>
      )}


      <div className="pt-2 text-left space-y-1 text-sm">
        {user.location.city && user.location.country && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span>{user.location.city}, {user.location.country}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <LinkIcon className="w-4 h-4 text-primary" />
          <Link href={`/profile/${user.username}`} target="_blank" className="hover:underline break-all">
            {siteConfig.url.replace('https://', '')}/{user.username}
          </Link>
        </div>
      </div>
    </div>
  );
}
