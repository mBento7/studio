"use client";

import React from 'react';
import type { UserProfile, PortfolioItem, ProfileLayoutProps } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { platformIcons } from "@/lib/types";
import Image from 'next/image';
import Link from 'next/link';
import { Globe, MapPin, Mail, Phone, Edit, MessageSquare } from 'lucide-react';

/*
 * BasicProfileLayout
 *
 * Plano: free (usuário com perfil incompleto)
 * Gatilho: user.plan === 'free' && !user.isProfileComplete
 *
 * Itens/Seções liberados:
 * - Informações de contato básicas (e-mail, telefone, localização)
 * - Nome, foto de perfil (se houver)
 * - Links sociais limitados (1-2)
 * - Placeholders incentivando o preenchimento do perfil
 *
 * Não exibe: portfólio, serviços, experiência, educação (ou apenas placeholders)
 */

const BasicProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
  toast,
  mounted,
}) => {
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 flex items-center justify-center">
      <Card className="w-full max-w-lg shadow-2xl rounded-2xl overflow-hidden border-0">
        <CardHeader className="p-0">
          <div className="relative">
            {/* Cover Image */}
            <div className="h-48 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
              {user.cover_photo_url && (
                <img
                  src={user.cover_photo_url}
                  alt="Capa do perfil"
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50" />
            </div>

            {/* Profile Picture */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2">
              <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-xl">
                <AvatarImage src={user.profile_picture_url} alt={user.name} />
                <AvatarFallback className="text-3xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-20 text-center flex flex-col items-center">
          <h1 className="text-3xl font-bold text-foreground">{user.name}</h1>
          <p className="text-primary font-medium mt-1">{user.category}</p>
          <p className="text-muted-foreground mt-4 max-w-md mx-auto text-sm leading-relaxed">
            {user.bio}
          </p>

          <div className="w-full border-t my-6" />

          {/* Contact Info */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground mb-6">
            {location.city && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{location.city}, {location.country}</span>
              </div>
            )}
            {user.email && (
              <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="w-4 h-4 text-primary" />
                <span>{user.email}</span>
              </a>
            )}
            {user.phone && (
              <a href={`tel:${user.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="w-4 h-4 text-primary" />
                <span>{user.phone}</span>
              </a>
            )}
          </div>

          {/* Social Links */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center gap-2 mb-6">
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

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mx-auto">
            <Button size="lg" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Entrar em Contato
            </Button>
            {isCurrentUserProfile && (
              <Button size="lg" variant="outline" className="flex-1" asChild>
                <Link href="/dashboard/my-profile">
                  <Edit className="w-4 h-4 mr-2" />
                  Editar Perfil
                </Link>
              </Button>
            )}
          </div>

          {/* QR Code Section */}
          {qrCodeUrl && (
            <div className="mt-8 flex flex-col items-center">
              <Image
                src={qrCodeUrl}
                alt={`QR Code de ${user.name}`}
                width={120}
                height={120}
                className="rounded-lg border p-1 bg-white shadow-md"
              />
              <p className="mt-2 text-xs text-muted-foreground">Escaneie para salvar o contato</p>
            </div>
          )}

          {isCurrentUserProfile && (
            <div className="w-full mt-6">
              <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 p-3 text-center text-xs font-semibold shadow-inner dark:bg-gradient-to-r dark:from-blue-900/50 dark:to-purple-900/50 dark:text-blue-200">
                Complete seu perfil para liberar mais recursos e layouts!
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicProfileLayout;

export const segmentConfig = {
  id: 'basic-profile',
  name: 'Perfil Básico',
  description: 'Um layout limpo e moderno para apresentar suas informações essenciais.',
  imageUrl: 'https://picsum.photos/seed/layout-basic/300/200',
  plan: 'free',
}; 