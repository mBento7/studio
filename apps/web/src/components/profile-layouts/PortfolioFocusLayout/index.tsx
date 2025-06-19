"use client";

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserProfile, PortfolioItem, Service } from "@/lib/types";
import { Youtube, Linkedin, Twitter, Instagram, Github, Globe, Mail, MapPin, QrCode, Download, Edit3, MessageSquare, Briefcase, ArrowRight, Loader2, Building, GraduationCap, Star, Palette, Facebook, Twitch, Save, Eye, Link as LinkIcon, Maximize } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PremiumBannerDisplay } from "@/features/landing/premium-banner-display";
import { ProfileLayoutProps, platformIcons } from "@/lib/types";

/*
 * PortfolioFocusLayout
 *
 * Plano: standard
 * Gatilho: user.plan === 'standard' && user.layoutTemplateId === 'portfolio-focus'
 *
 * Itens/Seções liberados:
 * - Todas as funcionalidades do ModernProfileLayout
 * - Ênfase visual maior nas galerias de portfólio
 * - Mais itens de portfólio e serviços
 * - Funcionalidades de cupons
 */

const PortfolioFocusLayout: React.FC<ProfileLayoutProps> = ({ user, primaryColorHex, isCurrentUserProfile, qrCodeUrl, onPortfolioItemClick, toast, mounted }) => {
  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: '', country: '' };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-zinc-900 dark:to-zinc-800">
      <Card className="max-w-3xl w-full shadow-2xl overflow-hidden border-primary/20 relative">
        {/* Capa */}
        {user.coverPhotoUrl && (
          <div className="relative w-full h-40 bg-gray-200">
            <Image src={user.coverPhotoUrl} alt="Capa do perfil" fill style={{objectFit:'cover'}} className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center gap-6 p-6 -mt-16">
          {/* Foto de perfil */}
          <div className="flex-shrink-0">
            <Image src={user.profilePictureUrl} alt={user.name} width={120} height={120} className="rounded-full border-4 border-white shadow-lg object-cover bg-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
            <p className="text-purple-700 dark:text-purple-200 mt-1">{user.category}</p>
            <p className="text-sm mt-3 max-w-xl text-gray-700 dark:text-gray-200">{user.bio}</p>
            {/* Localização */}
            {user.location?.city && (
              <p className="text-xs mt-2 flex items-center gap-1 text-gray-500 dark:text-gray-300">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full" />
                {user.location.city}{user.location.state ? `, ${user.location.state}` : ''} - {user.location.country}
              </p>
            )}
            {/* Contatos */}
            <div className="flex flex-wrap gap-3 mt-3">
              {user.email && (
                <a href={`mailto:${user.email}`} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition">{user.email}</a>
              )}
              {user.phone && (
                <a href={`tel:${user.phone}`} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition">{user.phone}</a>
              )}
              {user.whatsappNumber && (
                <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition">WhatsApp</a>
              )}
              {user.website && (
                <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded hover:bg-purple-200 transition">Site</a>
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
                      className="bg-purple-100 hover:bg-purple-200 p-2 rounded-full transition"
                      title={link.platform}
                    >
                      <Icon className="w-5 h-5 text-purple-700" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <CardContent className="p-6">
          {/* Portfólio em destaque */}
          <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-200">Portfólio em Destaque</h2>
          {portfolio.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {portfolio.map((item, idx) => (
                <div key={idx} className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer group relative" onClick={() => onPortfolioItemClick?.(item)}>
                  <Image src={item.imageUrl} alt={item.caption || 'Portfólio'} fill className="object-cover w-full h-40" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <Maximize className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-white text-xs font-semibold">{item.caption}</div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">Nenhum item de portfólio listado.</p>
          )}
          {/* Serviços */}
          <h2 className="text-xl font-semibold mb-4 text-purple-700 dark:text-purple-200">Serviços</h2>
          {services.length > 0 ? (
            <ul className="list-disc list-inside mb-4 pl-4">
              {services.map((service, index) => (
                <li key={index}>{service.name} - {service.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">Nenhum serviço listado.</p>
          )}
          {/* Banner/Placeholder */}
          <div className="w-full mt-8">
            <div className="rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 text-purple-900 p-3 text-center text-xs font-semibold shadow-inner">
              Conheça todos os recursos do nosso showroom!
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioFocusLayout;

export const config = {
  id: 'portfolio-focus',
  name: 'Foco em Portfólio',
  description: 'Destaque seu portfólio de projetos.',
  imageUrl: 'https://picsum.photos/seed/layout-portfolio/300/200',
  plan: 'standard',
}; 