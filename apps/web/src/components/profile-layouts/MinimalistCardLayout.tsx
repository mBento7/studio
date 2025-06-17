"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, ArrowRight, Loader2, Building, GraduationCap, Star, Palette, Facebook, Twitch, Save, Eye, Link as LinkIcon, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProfileLayoutProps, platformIcons } from "@/lib/types"; // Importar ProfileLayoutProps e platformIcons
import { DigitalBusinessCard } from "@/features/profile/digital-business-card"; // Caminho corrigido após refatoração

const MinimalistCardLayout: React.FC<ProfileLayoutProps> = ({ user, primaryColorHex, isCurrentUserProfile, mounted, toast, qrCodeUrl, onPortfolioItemClick }) => {
  const handleDownloadQrCodeMinimalist = async () => {
    if (!user || !primaryColorHex) return;
    const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.username}` : `https://idbox.site/profile/${user.username}`;
    const bgColorForDownload = 'FFFFFF';
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(profileUrl)}&color=${primaryColorHex.replace("#","")}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;

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
      toast({ title: "QR Code Baixado", description: "O QR Code do perfil foi baixado como PNG." });
    } catch (error) {
        console.error("Erro ao baixar QR Code:", error);
        toast({ title: "Erro no Download", description: "Não foi possível baixar o QR Code.", variant: "destructive" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-muted/30 to-background">
      <Card className="max-w-md w-full shadow-2xl overflow-hidden border-primary/20 relative">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/light-grey-floral-motif.png')] "></div>

        <div className="h-32 bg-muted relative rounded-t-lg">
            <Image
                src={user.coverPhotoUrl}
                alt={`Foto de capa de ${user.name}`}
                fill
                style={{ objectFit: "cover" }}
                data-ai-hint={user.coverPhotoDataAiHint || "abstract gradient"}
                priority
                className="rounded-t-lg"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

         <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-lg border-4 border-card shadow-lg bg-muted overflow-hidden flex items-center justify-center">
           <Image
              src={user.profilePictureUrl}
              alt={user.name}
              fill
              sizes="96px"
              className="object-cover rounded-md"
              data-ai-hint={user.profilePictureDataAiHint || "person portrait"}
            />
        </div>

        <CardContent className="pt-16 text-center relative z-0">
          <h1 className="text-2xl font-bold mt-2">{user.name}</h1>
          <p className="text-md text-primary mt-1">{user.category}</p>
          <p className="text-sm text-foreground/80 my-4 whitespace-pre-line px-2">
            {user.bio}
          </p>

          {user.socialLinks && user.socialLinks.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {user.socialLinks.map(link => {
                const IconComponent = platformIcons[link.platform] || Globe;
                return (
                  <Button key={link.id} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary rounded-full w-10 h-10 hover:bg-primary/10">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                      <IconComponent className="w-5 h-5" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}

          {user.portfolio && user.portfolio.length > 0 && (
             <div className="mb-6">
                 <h3 className="text-sm font-semibold text-muted-foreground mb-2">Alguns trabalhos:</h3>
                  <div className="flex justify-center flex-wrap gap-2">
                    {user.portfolio.slice(0, 3).map(item => (
                      <div key={item.id} className="w-16 h-16 rounded-md overflow-hidden border shadow-sm cursor-pointer group relative" onClick={() => onPortfolioItemClick(item)}>
                        <Image src={item.imageUrl} alt={item.caption || 'Portfólio'} fill style={{objectFit: 'cover'}} data-ai-hint={item.dataAiHint || 'thumbnail project'} />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-4 h-4 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
             </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {isCurrentUserProfile ? (
              <Button size="sm" variant="outline" asChild className="w-full sm:w-auto">
                <Link href="/dashboard">
                  <Edit3 className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
            ) : user.plan === 'free' ? (
                user.whatsappNumber ? (
                  <Button size="sm" asChild className="w-full sm:w-auto">
                    <Link href={`https://wa.me/${user.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                  </Button>
                ) : user.email ? (
                  <Button size="sm" asChild className="w-full sm:w-auto">
                    <Link href={`mailto:${user.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> Contato
                    </Link>
                  </Button>
                ) : null
            ) : (
              <>
                {user.email && (
                  <Button size="sm" asChild className="w-full sm:w-auto">
                    <Link href={`mailto:${user.email}`}>
                      <Mail className="mr-2 h-4 w-4" /> Contato
                    </Link>
                  </Button>
                )}
                {user.whatsappNumber && (
                  <Button size="sm" variant="secondary" asChild className="w-full sm:w-auto">
                    <Link href={`https://wa.me/${user.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                      <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>

           {qrCodeUrl && (
             <div className="mt-6 flex flex-col items-center">
                 <div
                    className="opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={handleDownloadQrCodeMinimalist}
                    title="Baixar QR Code"
                 >
                    <Image
                        src={qrCodeUrl}
                        alt={`QR Code de ${user.name}`}
                        width={80}
                        height={80}
                        className="rounded-md border p-0.5 bg-white"
                        data-ai-hint="qr small"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">Escaneie ou clique para baixar</p>
                 </div>
                <Button
                    variant="link"
                    size="sm"
                    className="mt-2 text-xs text-primary"
                    asChild
                    disabled={!mounted}
                >
                  <Link href={`/profile/${user.username}/card-preview`} target="_blank">
                    <Eye className="mr-1 h-3 w-3"/> Visualizar Cartão
                  </Link>
                </Button>
            </div>
           )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MinimalistCardLayout;