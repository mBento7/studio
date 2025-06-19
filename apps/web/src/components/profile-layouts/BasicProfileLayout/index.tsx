"use client";

import React from 'react';
import type { UserProfile, PortfolioItem } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { cn } from "@/lib/utils";
import { platformIcons } from "@/lib/types";
import Image from 'next/image';
import Link from 'next/link';
import { Globe, MapPin, Mail, Phone, Maximize } from 'lucide-react';
import { DigitalBusinessCard } from "@/features/profile/digital-business-card";

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

interface BasicProfileLayoutProps {
  user: UserProfile;
  isCurrentUserProfile: boolean;
  qrCodeUrl: string | null;
  onPortfolioItemClick: (item: PortfolioItem) => void;
  toast: any;
  mounted: boolean;
}

const BasicProfileLayout: React.FC<BasicProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
  toast,
  mounted,
}) => {
  // Fallbacks seguros
  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-0 overflow-hidden">
        {/* Capa */}
        {user.coverPhotoUrl && (
          <div className="relative w-full h-32 bg-gray-200">
            <img src={user.coverPhotoUrl} alt="Capa do perfil" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
        )}
        <div className="flex flex-col items-center p-6">
          {/* Foto de perfil */}
          <div className="w-full flex justify-center -mt-16 mb-4">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-200 flex items-center justify-center">
              <Avatar className="w-full h-full">
                <AvatarImage src={user.profilePictureUrl} alt={user.name} className="object-cover" />
                <AvatarFallback className="text-xl font-semibold">{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1 text-center">{user.name}</h1>
          <p className="text-gray-600 mb-2 text-center">{user.category}</p>
          <p className="text-gray-700 text-sm mb-4 text-center whitespace-pre-line px-2">{user.bio}</p>
          {/* Contatos */}
          <div className="flex space-x-4 mb-4">
            {user.email && (
              <a href={`mailto:${user.email}`} className="text-blue-500 hover:text-blue-700" aria-label="Email"><Mail className="w-5 h-5" /></a>
            )}
            {user.phone && (
              <a href={`tel:${user.phone}`} className="text-blue-500 hover:text-blue-700" aria-label="Telefone"><Phone className="w-5 h-5" /></a>
            )}
            {location.city && location.country && (
              <span className="text-gray-500 flex items-center"><MapPin className="w-5 h-5 mr-1" /> {location.city}, {location.country}</span>
            )}
          </div>
          {/* Links sociais */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mb-6">
              {socialLinks.map(link => {
                const IconComponent = platformIcons[link.platform as keyof typeof platformIcons] || Globe;
                return (
                  <Button key={link.id} variant="ghost" size="icon" className="text-muted-foreground hover:text-primary rounded-full w-8 h-8 hover:bg-primary/10">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                      <IconComponent className="w-4 h-4" />
                    </Link>
                  </Button>
                );
              })}
            </div>
          )}
          {/* Banner/Placeholder */}
          <div className="w-full mb-4">
            <div className="rounded-lg bg-gradient-to-r from-blue-100 to-purple-100 text-blue-900 p-3 text-center text-xs font-semibold shadow-inner">
              Complete seu perfil para liberar mais recursos e layouts!
            </div>
          </div>
          <div className="text-gray-700 text-sm w-full text-left mt-4">
            <h2 className="text-lg font-semibold mb-2">Serviços</h2>
            {services.length > 0 ? (
              <ul className="list-disc list-inside mb-4 pl-4">
                {services.map((service, index) => (
                  <li key={index}>{service.name} - {service.description}</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhum serviço listado.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Portfólio</h2>
            {portfolio.length > 0 ? (
              <div className="grid grid-cols-2 gap-2 mb-4">
                {portfolio.slice(0, 4).map((item, index) => (
                  <div key={index} className="relative w-full h-24 rounded-md overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer" onClick={() => onPortfolioItemClick(item)}>
                    <Image src={item.imageUrl} alt={item.caption || 'Portfólio'} layout="fill" objectFit="cover" />
                    <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Maximize className="w-6 h-6 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum item de portfólio listado.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Experiência</h2>
            {experience.length > 0 ? (
              <ul className="list-disc list-inside mb-4 pl-4">
                {experience.map((exp, index) => (
                  <li key={index}><strong>{exp.title}</strong> em {exp.company} ({exp.years})</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma experiência listada.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Educação</h2>
            {education.length > 0 ? (
              <ul className="list-disc list-inside mb-4 pl-4">
                {education.map((edu, index) => (
                  <li key={index}><strong>{edu.degree}</strong> de {edu.institution} ({edu.years})</li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhuma formação listada.</p>
            )}
          </div>
          
          {qrCodeUrl && (
            <div className="mt-6 flex flex-col items-center">
              <Image
                src={qrCodeUrl}
                alt={`QR Code de ${user.name}`}
                width={100}
                height={100}
                className="rounded-md border p-1 bg-white shadow-sm"
              />
              <p className="mt-2 text-xs text-muted-foreground">Escaneie para visualizar o perfil completo</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicProfileLayout;

export const config = {
  id: 'basic-profile',
  name: 'Perfil Básico',
  description: 'Layout básico para perfis simples.',
  imageUrl: 'https://picsum.photos/seed/layout-basic/300/200',
  plan: 'free',
}; 