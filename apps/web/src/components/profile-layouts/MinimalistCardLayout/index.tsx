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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="p-0">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-40 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              {user.coverPhotoUrl && (
                <Image
                  src={user.coverPhotoUrl}
                  alt="Capa do perfil"
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-28 left-1/2 -translate-x-1/2">
              <Avatar className="w-24 h-24 border-4 border-white dark:border-slate-900 shadow-xl">
                <AvatarImage src={user.profilePictureUrl} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-16 text-center flex flex-col items-center">
          <h1 className="text-2xl font-bold text-foreground">{user.name}</h1>
          <p className="text-primary font-medium mt-1">{user.category}</p>
          <p className="text-muted-foreground mt-3 max-w-xs mx-auto text-sm">
            {user.bio}
          </p>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-2 my-5">
              {socialLinks.map((link) => {
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
          )}
          
          <div className="w-full border-t my-4" />

          {/* Portfolio Snippet */}
          {portfolio.length > 0 && (
             <div className="w-full px-4 mb-4">
                 <h3 className="text-sm font-semibold text-muted-foreground mb-3 text-left">Portfólio</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {portfolio.slice(0, 3).map(item => (
                      <div key={item.id} className="aspect-square rounded-lg overflow-hidden border shadow-sm cursor-pointer group relative" onClick={() => onPortfolioItemClick(item)}>
                        <Image src={item.imageUrl} alt={item.caption || 'Portfólio'} layout="fill" objectFit="cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
             </div>
          )}

          {/* Contact & Actions */}
          <div className="w-full px-4">
            <Button size="lg" className="w-full mb-2" asChild>
              <a href={user.whatsappNumber ? `https://wa.me/${user.whatsappNumber}` : `mailto:${user.email}`}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Contato Principal
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" asChild>
                <Link href={`/profile/${user.username}/card-preview`} target="_blank">
                  <Eye className="w-4 h-4 mr-2" /> Cartão
                </Link>
              </Button>
              {isCurrentUserProfile && (
                <Button variant="outline" asChild>
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
                width={80}
                height={80}
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

export const config = {
  id: 'minimalist-card',
  name: 'Cartão Minimalista',
  description: 'Um layout elegante e direto, perfeito para um cartão de visitas digital.',
  imageUrl: 'https://picsum.photos/seed/layout-minimalist/300/200',
  plan: 'free',
}; 