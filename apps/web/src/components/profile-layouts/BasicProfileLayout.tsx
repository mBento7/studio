"use client";

import React from 'react';
// Removidos Button, Card, CardContent, CardHeader, CardTitle se não forem usados diretamente aqui
import type { UserProfile, PortfolioItem } from '@/lib/types';
import { Globe, MapPin } from 'lucide-react'; // Apenas os ícones realmente usados
// Removidos Image e Link se não forem usados diretamente aqui
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';

interface BasicProfileLayoutProps {
  userProfile: UserProfile;
  isCurrentUserProfile: boolean;
  qrCodeUrl: string | null;
  onPortfolioItemClick: (item: PortfolioItem) => void;
  toast: any; // Adicionado para compatibilidade, idealmente tipar melhor
  mounted: boolean;
}

export const BasicProfileLayout: React.FC<BasicProfileLayoutProps> = ({
  userProfile,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
  toast,
  mounted,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={userProfile.profilePictureUrl} alt={userProfile.name} />
            <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{userProfile.name}</h1>
          <p className="text-gray-600 mb-2">{userProfile.bio}</p>
          <div className="flex space-x-4 mb-4">
            {userProfile.email && (
              <a href={`mailto:${userProfile.email}`} className="text-blue-500 hover:text-blue-700">
                <Mail className="w-5 h-5" />
              </a>
            )}
            {userProfile.phone && (
              <a href={`tel:${userProfile.phone}`} className="text-blue-500 hover:text-blue-700">
                <Phone className="w-5 h-5" />
              </a>
            )}
            {userProfile.location && (
              <span className="text-gray-500 flex items-center">
                <MapPin className="w-5 h-5 mr-1" /> {userProfile.location.city}, {userProfile.location.country}
              </span>
            )}
          </div>
          {userProfile.website && (
            <Button asChild className="mb-4">
              <a href={userProfile.website} target="_blank" rel="noopener noreferrer">
                Visitar Website
              </a>
            </Button>
          )}
          <div className="text-gray-700 text-sm w-full text-left">
            <h2 className="text-lg font-semibold mb-2">Serviços</h2>
            {userProfile.services && userProfile.services.length > 0 ? (
              <ul className="list-disc list-inside mb-4">
                {userProfile.services.map((service, index) => (
                  <li key={index}>{service.name}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum serviço listado.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Portfólio</h2>
            {userProfile.portfolio && userProfile.portfolio.length > 0 ? (
              <ul className="list-disc list-inside mb-4">
                {userProfile.portfolio.map((item, index) => (
                  <li key={index}><strong>{item.caption}</strong>: {item.description}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum item de portfólio listado.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Experiência</h2>
            {userProfile.experience && userProfile.experience.length > 0 ? (
              <ul className="list-disc list-inside mb-4">
                {userProfile.experience.map((exp, index) => (
                  <li key={index}><strong>{exp.title}</strong> at {exp.company} ({exp.years})</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma experiência listada.</p>
            )}

            <h2 className="text-lg font-semibold mb-2">Educação</h2>
            {userProfile.education && userProfile.education.length > 0 ? (
              <ul className="list-disc list-inside mb-4">
                {userProfile.education.map((edu, index) => (
                  <li key={index}><strong>{edu.degree}</strong> from {edu.institution} ({edu.years})</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma educação listada.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 