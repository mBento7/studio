"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem, Service } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, ArrowRight, Loader2, Building, GraduationCap, Star, Palette, Facebook, Twitch, Save, Eye, Link as LinkIcon, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProfileLayoutProps, platformIcons } from "@/lib/types"; // Importar ProfileLayoutProps e platformIcons


const PortfolioFocusLayout: React.FC<ProfileLayoutProps> = ({ user, primaryColorHex, isCurrentUserProfile, mounted, toast, qrCodeUrl, onPortfolioItemClick }) => {
  const getYoutubeEmbedUrl = (url?: string) => {
    if (!url) return null;
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}` : null;
  };
  const youtubeEmbedUrl = user.youtubeVideoUrl ? getYoutubeEmbedUrl(user.youtubeVideoUrl) : null;

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
        <section className="text-center mb-12">
             <div className="mx-auto w-32 h-32 md:w-40 md:h-40 mb-4 rounded-lg border-4 border-card shadow-lg bg-muted overflow-hidden flex items-center justify-center">
                <Image
                    src={user.profilePictureUrl}
                    alt={user.name}
                    fill
                    sizes="(max-width: 767px) 128px, 160px"
                    className="object-cover rounded-md"
                    data-ai-hint={user.profilePictureDataAiHint || "person photo"}
                />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{user.name}</h1>
            <p className="text-lg text-primary mt-1 mb-3">{user.category}</p>
             <p className="text-foreground/80 max-w-xl mx-auto text-sm leading-relaxed mb-6 whitespace-pre-line">{user.bio}</p>
             {user.socialLinks && user.socialLinks.length > 0 && (
              <div className="flex justify-center flex-wrap gap-2 mb-6">
                  {user.socialLinks.map(link => {
                      const IconComponent = platformIcons[link.platform] || Globe;
                      return (
                      <Button key={link.id} variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-primary">
                          <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                          <IconComponent className="w-5 h-5" />
                          </Link>
                      </Button>
                      );
                  })}
              </div>
             )}
             <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                 {isCurrentUserProfile ? (
                    <Button asChild>
                    <Link href="/dashboard">
                        <Edit3 className="mr-2 h-4 w-4" /> Editar Perfil
                    </Link>
                    </Button>
                ) : (
                    user.email && (
                        <Button asChild>
                            <Link href={`mailto:${user.email}`}>
                                <Mail className="mr-2 h-4 w-4" /> Fale Comigo
                            </Link>
                        </Button>
                    )
                )}
                {user.whatsappNumber && (
                    <Button variant="outline" asChild>
                    <Link href={`https://wa.me/${user.whatsappNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">
                        <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
                    </Link>
                    </Button>
                )}
             </div>
        </section>

        {user.portfolio && user.portfolio.length > 0 && (
            <section>
                <h2 className="text-2xl font-semibold text-center mb-8">Meu Trabalho</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {user.portfolio.map((item: PortfolioItem, index: number) => (
                        <Card key={item.id} className="rounded-lg overflow-hidden shadow-lg group border bg-card cursor-pointer hover:shadow-xl transition-shadow" onClick={() => onPortfolioItemClick(item)}>
                            <div className="aspect-video relative">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.caption || "Item do portfólio"}
                                    fill
                                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-t-md"
                                    data-ai-hint={item.dataAiHint || "creative portfolio"}
                                />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
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
            </section>
        )}

         {user.services && user.services.length > 0 && (
            <section className="pt-12">
                <h2 className="text-2xl font-semibold text-center mb-8">Serviços</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {user.services.map((service: Service, index: number) => (
                    <Card key={service.id} className="p-4 border rounded-lg bg-card hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg text-primary mb-1">{service.name}</h3>
                        <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed">{service.description}</p>
                    </Card>
                    ))}
                </div>
            </section>
        )}


        {user.youtubeVideoUrl && mounted && youtubeEmbedUrl && (
            <section className="pt-12">
                <h2 className="text-2xl font-semibold text-center mb-8">{user.youtubeVideoTitle || 'Vídeo em Destaque'}</h2>
                <Card>
                    <CardContent className="pt-6 flex flex-col md:flex-row gap-6">
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
            </section>
        )}
    </div>
  );
};

export default PortfolioFocusLayout; 