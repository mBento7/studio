"use client";

import React from 'react';
import { ProfileLayoutProps, Service, PortfolioItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PremiumBannerDisplay } from '@/features/landing/premium-banner-display';

const PremiumProLayout: React.FC<ProfileLayoutProps> = ({ user, isCurrentUserProfile, qrCodeUrl, onPortfolioItemClick, toast, mounted, primaryColorHex }) => {
  // Fallbacks seguros
  const services = user.services || [];
  const portfolio = user.portfolio || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-xl border-purple-300">
        <CardHeader className="bg-purple-600 text-white p-6 rounded-t-lg">
          <CardTitle className="text-3xl font-bold">{user.name} (Premium Pro)</CardTitle>
          <p className="text-purple-100">O seu perfil profissional de elite.</p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <p className="text-lg text-gray-800">Este é o layout Premium Pro para {user.name}. Ele oferece os recursos mais avançados para o seu negócio.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold text-lg text-purple-700 mb-2">Serviços Premium</h3>
              {services.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {services.map((service: Service, index: number) => (
                    <li key={index}>{service.name}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Nenhum serviço premium configurado.</p>
              )}
            </div>
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold text-lg text-purple-700 mb-2">Portfólio Avançado</h3>
              {portfolio.length > 0 ? (
                <ul className="list-disc list-inside text-gray-700">
                  {portfolio.map((item: PortfolioItem, index: number) => (
                    <li key={index}>{item.caption}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Nenhum item de portfólio avançado.</p>
              )}
            </div>
          </div>

          {user.youtubeVideoUrl && (
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold text-lg text-purple-700 mb-2">Vídeo em Destaque</h3>
              <p className="text-gray-600">Integração com YouTube e outros recursos de vídeo.</p>
            </div>
          )}

          {user.premiumBanner && (
            <div className="bg-gray-50 p-4 rounded-md border">
              <h3 className="font-semibold text-lg text-purple-700 mb-2">Banner Personalizado</h3>
              <p className="text-gray-600">Seu banner exclusivo aqui para promoções.</p>
            </div>
          )}

          <p className="text-sm text-gray-600 mt-4">Este template é ideal para quem busca o máximo em apresentação e funcionalidades.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumProLayout; 