"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import type { ProfileLayoutProps } from "@/lib/types";
import { platformIcons } from "@/lib/types";
import { Youtube, Globe, Mail, MessageSquare, Edit, Eye, Maximize, Phone, MapPin, Briefcase, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PortfolioFocusLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="h-56 w-full rounded-2xl overflow-hidden shadow-2xl">
            {user.coverPhotoUrl ? (
              <Image
                src={user.coverPhotoUrl}
                alt="Capa do perfil"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-gray-300 to-gray-400" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>
          <div className="absolute top-32 left-1/2 -translate-x-1/2 md:left-12 md:-translate-x-0 w-full md:w-auto">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="w-36 h-36 border-4 border-white dark:border-slate-800 shadow-2xl">
                <AvatarImage src={user.profilePictureUrl} alt={user.name} />
                <AvatarFallback className="text-4xl font-bold">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="mt-2 md:mt-12 text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{user.name}</h1>
                <p className="text-lg text-white/90 drop-shadow-md">{user.category}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-20 md:pt-8" />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Portfolio */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-xl rounded-2xl border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Star className="w-6 h-6 text-primary" />
                  Portfólio em Destaque
                </CardTitle>
              </CardHeader>
              <CardContent>
                {portfolio.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                    {portfolio.map((item, idx) => (
                      <div
                        key={idx}
                        className="aspect-square rounded-xl overflow-hidden border shadow-sm cursor-pointer group relative hover:shadow-lg transition-all duration-300"
                        onClick={() => onPortfolioItemClick(item)}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.caption || 'Portfólio'}
                          layout="fill"
                          objectFit="cover"
                          className="group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                           <h3 className="font-bold text-white text-lg drop-shadow-md">{item.caption}</h3>
                           <p className="text-white/90 text-sm drop-shadow-md">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-12">
                    Nenhum projeto no portfólio ainda.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
             <Card className="shadow-xl rounded-2xl border-0">
                <CardHeader>
                   <CardTitle className="text-xl">Sobre</CardTitle>
                </CardHeader>
                <CardContent>
                   <p className="text-muted-foreground text-base leading-relaxed">{user.bio}</p>
                   {socialLinks.length > 0 && (
                     <div className="flex gap-2 mt-4">
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
                </CardContent>
             </Card>
             
             {services.length > 0 && (
               <Card className="shadow-xl rounded-2xl border-0">
                  <CardHeader>
                     <CardTitle className="text-xl flex items-center gap-2"><Briefcase className="w-5 h-5 text-primary" /> Serviços</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                     {services.map((service, idx) => (
                       <div key={idx} className="p-3 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                          <h3 className="font-semibold text-foreground">{service.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                       </div>
                     ))}
                  </CardContent>
               </Card>
             )}
             
             <Card className="shadow-xl rounded-2xl border-0">
               <CardHeader>
                 <CardTitle className="text-xl">Contato Rápido</CardTitle>
               </CardHeader>
                <CardContent className="space-y-3">
                   <Button className="w-full" asChild>
                      <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                         <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
                      </a>
                   </Button>
                   <Button variant="outline" className="w-full" asChild>
                      <a href={`mailto:${user.email}`}>
                         <Mail className="w-4 h-4 mr-2" /> E-mail
                      </a>
                   </Button>
                </CardContent>
             </Card>

             {qrCodeUrl && (
              <Card className="shadow-xl rounded-2xl border-0 flex flex-col items-center p-6">
                 <Image
                    src={qrCodeUrl}
                    alt={`QR Code de ${user.name}`}
                    width={120}
                    height={120}
                    className="rounded-lg border p-1 bg-white shadow-md"
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Escaneie para salvar o contato</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioFocusLayout;

export const config = {
  id: 'portfolio-focus',
  name: 'Foco em Portfólio',
  description: 'Um layout visual que coloca seus projetos em primeiro plano.',
  imageUrl: 'https://picsum.photos/seed/layout-portfolio/300/200',
  plan: 'standard',
}; 