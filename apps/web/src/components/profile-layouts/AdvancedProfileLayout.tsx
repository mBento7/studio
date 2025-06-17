"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, ArrowRight, Loader2, Building, GraduationCap, Star, Palette, Facebook, Twitch, Save, Eye, Link as LinkIcon, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { platformIcons } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PremiumBannerDisplay } from '@/features/landing/premium-banner-display';

interface AdvancedProfileLayoutProps {
  user: UserProfile;
  isCurrentUserProfile: boolean;
  qrCodeUrl: string | null;
  onPortfolioItemClick: (item: PortfolioItem) => void;
}

export const AdvancedProfileLayout: React.FC<AdvancedProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const primaryColorHex = "4F46E5"; // Definindo uma cor padrão para o QR Code

  useEffect(() => {
    setMounted(true);
  }, []);

  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };
  const youtubeEmbedUrl = user.youtubeVideoUrl ? getYoutubeEmbedUrl(user.youtubeVideoUrl) : null;

  const fullAddress = `${user.location?.address || ''} ${user.location?.city}${user.location?.state ? `, ${user.location.state}` : ''} ${user.location?.country}`.trim();
  const effectiveGoogleMapsUrl = user.location?.googleMapsUrl || (fullAddress ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}` : null);

  const handleDownloadQrCodePremium = async () => {
    if (!user) return;
    const profileUrl = typeof window !== 'undefined' ? `${window.location.origin}/profile/${user.username}` : `https://idbox.site/profile/${user.username}`;
    const bgColorForDownload = 'FFFFFF';
    const qrCodeUrlForDownload = `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(profileUrl)}&color=${primaryColorHex.replace("#","")}&bgcolor=${bgColorForDownload}&format=png&qzone=1`;
    
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
    <div className="bg-background text-foreground">
      <header className="relative">
      {/* Capa */}

      
    <div className="h-[40vh] md:h-[30vh] bg-muted overflow-hidden rounded-b-lg md:rounded-b-xl">
      {user.coverPhotoUrl ? (
        <Image
          src={user.coverPhotoUrl}
          alt={`Foto de capa de ${user.name}`}
          fill
          className="object-cover opacity-80 rounded-b-lg md:rounded-b-xl"
          data-ai-hint={user.coverPhotoDataAiHint || "professional banner"}
          priority
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold rounded-b-lg md:rounded-b-xl">
          Capa
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
    </div>

    {/* Conteúdo principal */}
    
    <div className="container mx-auto px-4">
      <div className="-mt-28 md:-mt-32 relative z-10">
        <div className="grid md:grid-cols-2 gap-6 bg-card/80 backdrop-blur-md p-6 rounded-lg shadow-xl border border-border">
          
          {/* Foto quadrada grande */}
          <div className="relative w-full max-w-[460px]  rounded-xl border-3  shadow-xl overflow-hidden mx-auto">
            {user.profilePictureUrl ? (
              <Image
                src={user.profilePictureUrl}
                alt={user.name}
                fill
                className="object-cover rounded-xl"
                data-ai-hint={user.profilePictureDataAiHint || "professional portrait"}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-4xl font-semibold text-gray-600 rounded-xl">
                {user.name.charAt(0)}
              </div>
            )}
            {/* Selo Premium opcional */}
            <span className="absolute top-2 right-2 bg-yellow-400 text-xs text-black px-2 py-0.5 rounded-full font-semibold shadow">
              PRO
            </span>
          </div>




{/* Informações do perfil */}
<div className="flex flex-col justify-center text-center md:text-left h-full">

            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{user.name}</h1>
            <p className="text-primary text-base flex items-center justify-center md:justify-start gap-2 mt-2">
              <Briefcase className="w-5 h-5" />
              {user.category}
            </p>

            {/* Links sociais */}
            {user.socialLinks && user.socialLinks.length > 0 && (
              <div className="flex justify-center md:justify-start flex-wrap gap-2 mt-4">
                {user.socialLinks.map(link => {
                  const Icon = platformIcons[link.platform] || Globe;
                  return (
                    <Button key={link.id} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                      <Link href={link.url} target="_blank" rel="noopener noreferrer">
                        <Icon className="w-5 h-5" />
                      </Link>
                    </Button>
                  );
                })}
              </div>
            )}
<section className="py-6 md:py-7">
  <Card>
    <CardHeader>
      <CardTitle>Sobre</CardTitle>
    </CardHeader>
    <CardContent className="max-w-xl mx-auto">
      <p className="text-foreground/90 whitespace-pre-line text-sm leading-relaxed">
        {user.bio}
      </p>
    </CardContent>
  </Card>
</section>

            {/* Botões de contato */}
            <div className="mt-4 flex flex-col md:flex-row gap-2 justify-center md:justify-start">
              <Button variant="default" className="w-full md:w-auto">Fale Comigo</Button>
              <Button variant="outline" className="w-full md:w-auto">WhatsApp</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </header>



      {user.skills && user.skills.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Habilidades Principais</h2>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex flex-wrap justify-center gap-3">
                            {user.skills.map((skill, index) => (
                                <Button key={index} variant="secondary" className="cursor-default">
                                    {skill}
                                </Button>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
      )}


    {(user.experience && user.experience.length > 0) || (user.education && user.education.length > 0) ? (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8">
                    {user.experience && user.experience.length > 0 && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary"/>Experiência</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {user.experience.map((exp, index) => (
                                    <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary/30">
                                        <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary ring-2 ring-background"></div>
                                        <h3 className="font-semibold text-lg text-foreground">{exp.title}</h3>
                                        <p className="text-sm text-muted-foreground">{exp.company} ({exp.years})</p>
                                        {exp.description && <p className="text-sm text-foreground/80 mt-1">{exp.description}</p>}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                    {user.education && user.education.length > 0 && (
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><GraduationCap className="w-5 h-5 text-primary"/>Formação</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                {user.education.map((edu, index) => (
                                    <div key={index} className="relative pl-6 before:absolute before:left-0 before:top-0 before:h-full before:w-0.5 before:bg-primary/30">
                                        <div className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-primary ring-2 ring-background"></div>
                                        <h3 className="font-semibold text-lg text-foreground">{edu.degree}</h3>
                                        <p className="text-sm text-muted-foreground">{edu.institution} ({edu.years})</p>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </section>
    ) : null}

      {user.services && user.services.length > 0 && (
        <section className="py-12 md:py-16 bg-muted/50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Meus Serviços</h2>
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">O que eu ofereço</CardTitle>
                    </CardHeader>
                    <CardContent className="grid md:grid-cols-2 gap-6">
                        {user.services.map(service => (
                            <Card key={service.id} className="bg-card">
                                <CardHeader>
                                    <CardTitle className="text-lg">{service.name}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-foreground/80">{service.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
      )}

  {/* PremiumBanner */}
{user.plan === 'premium' && user.premiumBanner && (
    <section className="py-8 bg-background">
      <PremiumBannerDisplay {...user.premiumBanner} />
    </section>
  )}
  
      {user.portfolio && user.portfolio.length > 0 && (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">Meu Portfólio</h2>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {user.portfolio.slice(0, 9).map(item => (
                      <Card key={item.id} className="rounded-lg overflow-hidden shadow-md group border bg-card cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onPortfolioItemClick(item)}>
                        <div className="aspect-video relative">
                          <Image
                            src={item.imageUrl}
                            alt={item.caption || "Item de Portfólio"}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-md"
                            data-ai-hint={item.dataAiHint || "creative work thumbnail"}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Maximize className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        <div className="p-4">
                          {item.caption && (
                            <h3 className="font-semibold text-base text-primary mb-1 truncate">{item.caption}</h3>
                          )}
                          {item.description && (
                            <p className="text-xs text-foreground/70 line-clamp-3 leading-relaxed">{item.description}</p>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                  {user.portfolio.length > 9 && (
                      <div className="text-center mt-8">
                          <Button variant="outline">Ver Mais Projetos (Link)</Button>
                      </div>
                  )}
                </CardContent>
            </div>
        </section>
      )}

      {user.youtubeVideoUrl && youtubeEmbedUrl && (
           <section className="py-12 md:py-16 bg-muted/50">
              <div className="container mx-auto px-4">
                 <h2 className="text-3xl font-bold text-center mb-12">{user.youtubeVideoTitle || 'Vídeo em Destaque'}</h2>
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center text-xl"><Youtube className="mr-2 h-6 w-6 text-red-600"/> {user.youtubeVideoTitle || 'Assista Meu Último Trabalho'}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-col md:flex-row gap-6">
                          <div className="md:w-1/2 lg:w-2/5 aspect-video rounded-lg overflow-hidden border shadow-md">
                            <iframe
                                className="w-full h-full"
                                src={youtubeEmbedUrl}
                                title={user.youtubeVideoTitle || `Vídeo do YouTube de ${user.name}`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                          </div>
                          <div className="md:w-1/2 lg:w-3/5">
                            {user.youtubeVideoTitle && <h3 className="text-xl font-semibold mb-2 text-primary">{user.youtubeVideoTitle}</h3>}
                            {user.youtubeVideoDescription && <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">{user.youtubeVideoDescription}</p>}
                          </div>
                      </CardContent>
                  </Card>
              </div>
           </section>
      )}


    <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><MapPin className="w-5 h-5 text-primary"/>Localização</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <address className="not-italic text-sm mb-2">
                            {user.location?.address && <div>{user.location.address}</div>}
                            <div>{user.location?.city}{user.location?.state ? `, ${user.location.state}` : ''}</div>
                            <div>{user.location?.country}</div>
                        </address>
                        {effectiveGoogleMapsUrl && (
                            <Button variant="outline" size="sm" asChild>
                                <Link href={effectiveGoogleMapsUrl} target="_blank" rel="noopener noreferrer">
                                    Ver no Mapa <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </CardContent>
                    <div className="relative w-full h-48 bg-muted rounded-b-lg overflow-hidden">
                        <Image
                            src={`https://picsum.photos/seed/${user.username}-map-medium/350/250`}
                            alt="Mapa Ilustrativo"
                            fill
                            style={{objectFit: "cover"}}
                            className="opacity-60"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    </div>
                </Card>

                <Card className="flex flex-col items-center justify-center p-6 text-center">
                    <CardHeader className="text-center">
                        <CardTitle className="flex items-center justify-center gap-2 text-2xl mb-4">
                            <QrCode className="w-8 h-8 text-primary"/>
                            Cartão Digital
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center space-y-3 text-center">
                        <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
                        {(user.email || user.phone) && (
                            <p className="text-xs text-muted-foreground">
                                {user.email ? <Link href={`mailto:${user.email}`} className="hover:underline">{user.email}</Link> : user.phone}
                            </p>
                         )}
                        {qrCodeUrl && ( 
                            <Image
                                src={qrCodeUrl}
                                alt={`QR Code do Perfil de ${user.name}`}
                                width={180}
                                height={180}
                                className="rounded-md border p-2 bg-white shadow-sm"
                            />
                        )}
                        <p className="text-xs text-muted-foreground">Escaneie para salvar o contato e ver o perfil completo</p>
                        <Button
                            variant="link"
                            size="sm"
                            className="mt-2 text-xs text-primary"
                            asChild
                            disabled={!mounted}
                        >
                          <Link href={`/profile/${user.username}/card-preview`} target="_blank">
                            <Eye className="mr-2 h-4 w-4"/> Visualizar Cartão
                          </Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
    </div>
  );
};