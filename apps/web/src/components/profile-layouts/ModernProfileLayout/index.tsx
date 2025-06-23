"use client";

import React from 'react';
import type { ProfileLayoutProps } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Mail,
  Phone,
  MapPin,
  Maximize,
  Globe,
  GraduationCap,
  Briefcase,
  Star,
  Edit,
  MessageSquare
} from "lucide-react";
import { platformIcons } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";

const ModernProfileLayout: React.FC<ProfileLayoutProps> = ({
  user,
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
}) => {
  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: "", country: "" };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="shadow-xl rounded-2xl overflow-hidden border-0 bg-white dark:bg-slate-900 dark:border-slate-700">
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Left Column: Avatar & Basic Info */}
              <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white dark:border-slate-800 shadow-lg">
                  <AvatarImage src={user.profilePictureUrl} alt={user.name} />
                  <AvatarFallback className="text-4xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <h1 className="text-3xl font-bold mt-4 text-foreground dark:text-white">{user.name}</h1>
                <p className="text-primary font-semibold text-lg mt-1">{user.category}</p>
                {socialLinks.length > 0 && (
                  <div className="flex justify-center md:justify-start gap-2 mt-4">
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
              </div>
              
              {/* Right Column: Bio & Actions */}
              <div className="md:col-span-2 space-y-4">
                <p className="text-muted-foreground text-base leading-relaxed">
                  <span className="dark:text-slate-300">{user.bio}</span>
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                  {location.city && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="dark:text-slate-300">{location.city}, {location.country}</span>
                    </div>
                  )}
                  {user.email && (
                    <a href={`mailto:${user.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Mail className="w-4 h-4" />
                      <span className="dark:text-slate-300">{user.email}</span>
                    </a>
                  )}
                  {user.phone && (
                    <a href={`tel:${user.phone}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                      <Phone className="w-4 h-4" />
                      <span className="dark:text-slate-300">{user.phone}</span>
                    </a>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button size="lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Entrar em Contato
                  </Button>
                  {isCurrentUserProfile && (
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/dashboard/my-profile">
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Perfil
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Skills */}
            {skills.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Star className="w-5 h-5 text-primary" /> Habilidades</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill: string, idx: number) => (
                      <Badge key={idx} variant="secondary" className="text-sm px-3 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Portfolio */}
            {portfolio.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Globe className="w-5 h-5 text-primary" /> Portfólio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {portfolio.slice(0, 6).map((item: any, idx: number) => (
                      <div
                        key={idx}
                        className="relative group rounded-lg overflow-hidden shadow-sm cursor-pointer aspect-square"
                        onClick={() => onPortfolioItemClick?.(item)}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={item.caption || "Portfólio"}
                          layout="fill"
                          objectFit="cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Services */}
            {services.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5 text-primary" /> Serviços</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service: any, idx: number) => (
                    <div key={idx} className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800/50">
                      <h3 className="font-semibold text-foreground">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Experience */}
            {experience.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><Briefcase className="w-5 h-5 text-primary" /> Experiência</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {experience.map((exp: any, idx: number) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
                      <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
                      <p className="font-semibold">{exp.title}</p>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-xs text-muted-foreground">{exp.years}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Education */}
            {education.length > 0 && (
              <Card className="shadow-lg rounded-xl border-0">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg"><GraduationCap className="w-5 h-5 text-primary" /> Educação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {education.map((edu: any, idx: number) => (
                    <div key={idx} className="relative pl-6">
                      <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
                      <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
                      <p className="font-semibold">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.institution}</p>
                      <p className="text-xs text-muted-foreground">{edu.years}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
            
            {qrCodeUrl && (
              <Card className="shadow-lg rounded-xl border-0 flex flex-col items-center p-6">
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

export default ModernProfileLayout;

export const config = {
  id: "modern-profile",
  name: "Perfil Moderno",
  description: "Layout com design moderno, ideal para profissionais criativos.",
  imageUrl: "https://picsum.photos/seed/layout-modern/300/200",
  plan: "paid",
};
