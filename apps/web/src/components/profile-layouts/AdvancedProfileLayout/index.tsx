"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, ArrowRight, Loader2, Building, GraduationCap, Star, Palette, Facebook, Twitch, Save, Eye, Link as LinkIcon, Maximize, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { platformIcons } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { PremiumBannerDisplay } from '@/features/landing/premium-banner-display';
import { Badge } from "@/components/ui/badge";

/*
 * AdvancedProfileLayout
 *
 * Plano: premium
 * Gatilho: user.plan === 'premium' && (user.layoutTemplateId === 'advanced' || !user.layoutTemplateId)
 *
 * Itens/Seções liberados:
 * - Todas as funcionalidades do plano standard
 * - Maior quantidade de Serviços e Portfólio
 * - Integração com YouTube/Vídeos
 * - Banner personalizado
 * - Recursos de cupons avançados
 * - Funcionalidade de Stories
 */

interface AdvancedProfileLayoutProps {
  user: UserProfile;
  isCurrentUserProfile: boolean;
  qrCodeUrl: string | null;
  onPortfolioItemClick: (item: PortfolioItem) => void;
}

const AdvancedProfileLayout: React.FC<AdvancedProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);
  const primaryColorHex = "4F46E5";

  // Fallbacks seguros
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
  const youtubeEmbedUrl = user.youtubeVideoUrl ? getYoutubeEmbedUrl(user.youtubeVideoUrl) : null;

  const fullAddress = `${location.address || ''} ${location.city}${location.state ? `, ${location.state}` : ''} ${location.country}`.trim();
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
      <div className="container mx-auto px-4 py-8">
        <Card className="shadow-2xl border-primary/20">
          <CardHeader className="bg-gradient-to-r from-blue-700 to-purple-700 text-white p-8 rounded-t-lg relative overflow-hidden">
            {/* Capa */}
            {user.coverPhotoUrl && (
              <img src={user.coverPhotoUrl} alt="Capa do perfil" className="absolute inset-0 w-full h-40 object-cover opacity-60" style={{zIndex:1}} />
            )}
            <div className="relative z-10 flex flex-col md:flex-row md:items-center md:gap-8">
              {/* Foto de perfil */}
              <div className="flex-shrink-0 -mt-20 md:mt-0">
                <img
                  src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                />
              </div>
              <div>
                <CardTitle className="text-4xl font-bold drop-shadow-sm">{user.name}</CardTitle>
                <p className="text-blue-100 text-lg mt-2">{user.category}</p>
                <p className="text-base text-blue-50 mt-2 whitespace-pre-line">{user.bio}</p>
                {/* Localização */}
                {user.location?.city && (
                  <p className="text-xs mt-2 flex items-center gap-1 text-blue-100">
                    <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                    {user.location.city}{user.location.state ? `, ${user.location.state}` : ''} - {user.location.country}
                  </p>
                )}
                {/* Contatos */}
                <div className="flex flex-wrap gap-3 mt-3">
                  {user.email && (
                    <a href={`mailto:${user.email}`} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">{user.email}</a>
                  )}
                  {user.phone && (
                    <a href={`tel:${user.phone}`} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">{user.phone}</a>
                  )}
                  {user.whatsappNumber && (
                    <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition">WhatsApp</a>
                  )}
                  {user.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">Site</a>
                  )}
                </div>
                {/* Links sociais */}
                {socialLinks.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {socialLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Globe;
                      return (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition"
                          title={link.platform}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8 space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Sobre</h2>
                <p className="text-foreground/90 whitespace-pre-line text-base leading-relaxed mb-4">{user.bio}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {socialLinks.map((link, idx) => {
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
                <div className="flex flex-col gap-2">
                  <span className="flex items-center gap-2 text-muted-foreground"><Mail className="w-4 h-4" /> {user.email}</span>
                  {user.phone && <span className="flex items-center gap-2 text-muted-foreground"><Phone className="w-4 h-4" /> {user.phone}</span>}
                  {location.city && <span className="flex items-center gap-2 text-muted-foreground"><MapPin className="w-4 h-4" /> {location.city}, {location.country}</span>}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2">Skills</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  {skills.map((skill, idx) => (
                    <Badge key={idx} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <h2 className="text-2xl font-semibold mb-2">Portfólio</h2>
                <div className="flex flex-wrap gap-2">
                  {portfolio.slice(0, 4).map((item, idx) => (
                    <div key={idx} className="w-24 h-24 rounded-md overflow-hidden border shadow-sm cursor-pointer group relative" onClick={() => onPortfolioItemClick(item)}>
                      <Image src={item.imageUrl} alt={item.caption || 'Portfólio'} fill className="object-cover w-full h-full" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Experiência</h2>
                {experience.length > 0 ? (
                  <ul className="list-disc list-inside text-foreground">
                    {experience.map((exp, idx) => (
                      <li key={idx}><strong>{exp.title}</strong> em {exp.company} ({exp.years})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Nenhuma experiência listada.</p>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold mb-2">Educação</h2>
                {education.length > 0 ? (
                  <ul className="list-disc list-inside text-foreground">
                    {education.map((edu, idx) => (
                      <li key={idx}><strong>{edu.degree}</strong> de {edu.institution} ({edu.years})</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground">Nenhuma formação listada.</p>
                )}
              </div>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold mb-2">Serviços</h2>
              {services.length > 0 ? (
                <ul className="list-disc list-inside text-foreground">
                  {services.map((service, idx) => (
                    <li key={idx}>{service.name} - {service.description}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">Nenhum serviço listado.</p>
              )}
            </div>
            {user.youtubeVideoUrl && mounted && youtubeEmbedUrl && (
              <div className="mt-8">
                <h2 className="text-2xl font-semibold mb-2">Vídeo em Destaque</h2>
                <div className="aspect-video rounded-lg overflow-hidden border shadow-md">
                  <iframe
                    className="w-full h-full"
                    src={youtubeEmbedUrl}
                    title={user.youtubeVideoTitle || `Vídeo do YouTube de ${user.name}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                {user.youtubeVideoTitle && <h3 className="text-xl font-semibold mt-2 text-primary">{user.youtubeVideoTitle}</h3>}
                {user.youtubeVideoDescription && <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed mt-2">{user.youtubeVideoDescription}</p>}
              </div>
            )}
            {user.premiumBanner && (
              <div className="mt-8">
                <PremiumBannerDisplay {...user.premiumBanner} />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdvancedProfileLayout; 