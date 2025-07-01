"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileLayoutProps } from "@/lib/types";
import { platformIcons } from "@/lib/types";
import { Globe, Mail, MessageSquare, Edit, Eye, Maximize, Phone, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const MinimalistCardLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick
}) => {
  const portfolio = user.portfolio || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  // Limitar links sociais a 2
  const limitedSocialLinks = socialLinks.slice(0, 2);
  // Limitar portfólio a 2
  const limitedPortfolio = portfolio.slice(0, 2);
  // Limitar serviços a 1
  const limitedServices = user.services ? user.services.slice(0, 1) : [];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="p-0">
          <div className="relative">
            {/* Profile Picture */}
            <div className="flex justify-center pt-8">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl">
                <AvatarImage src={user.profile_picture_url} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-16 text-center flex flex-col items-center justify-center h-full gap-6">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-primary font-medium mt-1 text-lg">{user.category}</p>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto text-base">{user.bio}</p>
          {/* Localização */}
          {user.location && (user.location.city || user.location.state || user.location.country) && (
            <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {[user.location.city, user.location.state, user.location.country].filter(Boolean).join(', ')}
            </div>
          )}
          {/* Email e Telefone */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            {user.email && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 mr-1" />
                <span>{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 mr-1" />
                <span>{user.phone}</span>
              </div>
            )}
          </div>
          {/* Skills */}
          {user.skills && user.skills.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {user.skills.slice(0, 6).map(skill => (
                <span key={skill} className="bg-slate-200 dark:bg-slate-700 text-xs px-3 py-1 rounded-full">{skill}</span>
              ))}
            </div>
          ) : (
            <div className="text-xs text-muted-foreground mt-2">Adicione habilidades para destacar seu perfil!</div>
          )}

          {/* Social Links */}
          {limitedSocialLinks.length > 0 && (
            <div className="flex flex-col items-center my-5 w-full">
              <div className="font-semibold text-xs text-muted-foreground mb-1">Links sociais ({limitedSocialLinks.length})</div>
              <div className="flex justify-center gap-2">
                {limitedSocialLinks.map((link) => {
                  const Icon = platformIcons[link.platform] || Globe;
                  return (
                    <Button key={link.id} variant="outline" size="icon" className="rounded-full" asChild>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                        <Icon className="w-4 h-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
            </div>
          )}
          <div className="w-full border-t my-4" />

          {/* Portfolio */}
          {limitedPortfolio.length > 0 ? (
            <div className="w-full px-4 mb-4 flex flex-col items-center">
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 text-center">Portfólio ({limitedPortfolio.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center min-w-0">
                {limitedPortfolio.map(item => (
                  <div
                    key={item.id}
                    className="relative w-44 h-44 md:w-56 md:h-56 rounded-xl overflow-hidden border shadow-sm cursor-pointer group"
                    style={{ minWidth: '11rem', minHeight: '11rem' }}
                    onClick={() => onPortfolioItemClick(item)}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.caption || 'Portfólio'}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 176px, 224px"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize className="w-7 h-7 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground mb-4">Adicione projetos ao seu portfólio para valorizar seu perfil!</div>
          )}

          {/* Serviços */}
          {limitedServices.length > 0 ? (
            <div className="w-full px-4 mb-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-1 text-left">Serviço em destaque</h3>
              <ul className="list-disc list-inside text-left text-xs">
                {limitedServices.map(service => (
                  <li key={service.id}><span className="font-medium">{service.name}</span>: {service.description}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground mb-4">Adicione um serviço para ser encontrado por mais pessoas!</div>
          )}

          {/* Contact & Actions */}
          <div className="w-full px-4 flex flex-col items-center">
            <Button size="lg" className="w-full max-w-xs mb-2" asChild>
              <a href={user.whatsappNumber ? `https://wa.me/${user.whatsappNumber}` : `mailto:${user.email}`}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contato Principal
              </a>
            </Button>
            <div className="flex flex-row gap-2 w-full justify-center">
              <Button variant="outline" className="max-w-xs w-full" asChild>
                <Link href={`/profile/${user.username}/card-preview`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" /> Cartão
                </Link>
              </Button>
              {isCurrentUserProfile && (
                <Button variant="outline" className="max-w-xs w-full" asChild>
                  <Link href="/dashboard/my-profile">
                    <Edit className="w-4 h-4 mr-2" /> Editar
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {qrCodeUrl && (
            <div className="mt-6">
              <Image
                src={qrCodeUrl}
                alt={`QR Code de ${user.name}`}
                width={100}
                height={100}
                className="rounded-lg border p-1 bg-white shadow-sm"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MinimalistCardLayout;

export const segmentConfig = {
  id: 'minimalist-card',
  name: 'Cartão Minimalista',
  description: 'Um layout elegante e direto, perfeito para um cartão de visitas digital.',
  imageUrl: 'https://picsum.photos/seed/layout-minimalist/300/200',
  plan: 'free',
}; 