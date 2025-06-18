"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Star, Video, Calendar, Trophy, Zap, Rocket } from "lucide-react";
import { ProfileLayoutProps, platformIcons } from "@/lib/types";

const fallbackBadges = [
  { id: 'b1', name: 'Top Performer', description: 'Reconhecimento por excelência', icon: 'star', color: 'gold', earnedAt: '2024-01-01' },
  { id: 'b2', name: 'Mentor', description: 'Ajudou 10+ pessoas', icon: 'zap', color: 'purple', earnedAt: '2024-02-01' },
];

type BadgeType = {
  id: string;
  name: string;
  description?: string;
  icon: 'star' | 'zap' | string;
  color: string;
  earnedAt?: string;
};

const PremiumProLayout: React.FC<ProfileLayoutProps> = ({
  user,
  primaryColorHex,
}) => {
  const services = user.services || [];
  const portfolio = user.portfolio || [];
  const testimonials = user.reviews || [];
  const badges: BadgeType[] = (user as any).badges || fallbackBadges;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 dark:from-slate-950 dark:to-purple-950/30 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="relative bg-gradient-to-r from-purple-600 to-indigo-700 text-white rounded-xl shadow-lg overflow-hidden">
          {/* Capa */}
          {user.coverPhotoUrl && (
            <img
              src={user.coverPhotoUrl}
              alt="Capa do perfil"
              className="absolute inset-0 w-full h-40 md:h-56 object-cover opacity-60"
              style={{ zIndex: 1 }}
            />
          )}
          <div className="relative z-10 p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Foto de perfil */}
              <div className="flex-shrink-0 -mt-20 md:mt-0">
                <img
                  src={user.profilePictureUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold drop-shadow-sm">{user.name}</h1>
                <p className="text-purple-100 mt-1">{user.category}</p>
                <p className="text-sm mt-3 max-w-xl text-purple-200">{user.bio}</p>
                {/* Localização */}
                {user.location?.city && (
                  <p className="text-xs mt-2 flex items-center gap-1 text-purple-200">
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
                    <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">WhatsApp</a>
                  )}
                  {user.website && (
                    <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">Site</a>
                  )}
                </div>
                {/* Links sociais */}
                {user.socialLinks && user.socialLinks.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {user.socialLinks.map((link) => {
                      const Icon = platformIcons[link.platform] || Star;
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
            <div className="flex flex-col gap-2 items-end">
              <Badge variant="outline" className="bg-white/10 text-white">
                <Star className="w-4 h-4 mr-1" /> Premium Pro
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white">
                <Rocket className="w-4 h-4 mr-1" /> Performance Máxima
              </Badge>
              {/* Botões de ação */}
              <div className="flex gap-2 mt-4">
                {user.email && (
                  <a href={`mailto:${user.email}`} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded shadow transition text-xs font-semibold">Enviar e-mail</a>
                )}
                {user.whatsappNumber && (
                  <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow transition text-xs font-semibold">WhatsApp</a>
                )}
                {user.website && (
                  <a href={user.website} target="_blank" rel="noopener noreferrer" className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded shadow transition text-xs font-semibold">Visitar site</a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Serviços */}
        <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Serviços Premium
            </CardTitle>
          </CardHeader>
          <CardContent>
            {services.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {services.map((service, index) => (
                  <li key={index} className="p-3 bg-purple-50 dark:bg-purple-950/10 rounded-lg border text-gray-700 dark:text-gray-300">
                    <span className="font-medium">{service.name}</span>
                    {service.description && (
                      <p className="text-xs mt-1 text-muted-foreground">{service.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted-foreground">Nenhum serviço premium configurado.</p>
            )}
          </CardContent>
        </Card>

        {/* Portfólio */}
        <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Portfólio Avançado
            </CardTitle>
          </CardHeader>
          <CardContent>
            {portfolio.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolio.map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-lg border overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="font-semibold">{item.caption}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">Nenhum item de portfólio avançado.</p>
            )}
          </CardContent>
        </Card>

        {/* Depoimentos */}
        {testimonials.length > 0 && (
          <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
            <CardHeader>
              <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Depoimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((test, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 border">
                    <div className="flex items-center gap-3 mb-2">
                      <img src={test.authorAvatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=avatar'} alt={test.authorName} className="w-10 h-10 rounded-full" />
                      <div>
                        <p className="font-semibold">{test.authorName}</p>
                        <p className="text-xs text-muted-foreground">{test.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-sm italic">“{test.comment}”</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Badges/Conquistas */}
        <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              Conquistas & Badges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge: BadgeType) => (
                <Badge key={badge.id} className="flex items-center gap-1 px-3 py-2 text-xs" style={{ background: badge.color }}>
                  <span>{badge.icon === 'star' ? <Star className="w-3 h-3" /> : <Zap className="w-3 h-3" />}</span>
                  {badge.name}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Vídeo YouTube */}
        {user.youtubeVideoUrl && (
          <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
            <CardHeader>
              <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
                <Youtube className="w-5 h-5" />
                Apresentação em Vídeo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden border">
                <iframe
                  src={user.youtubeVideoUrl.replace("watch?v=", "embed/")}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Calendário/Agendamento (Placeholder) */}
        <Card className="bg-white/80 dark:bg-slate-900/60 backdrop-blur-md border">
          <CardHeader>
            <CardTitle className="text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Agendamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Integração com Calendly ou ferramenta de agenda personalizada.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PremiumProLayout; 