"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Maximize,
  Globe,
  GraduationCap,
  Briefcase,
  ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const ModernProfileLayout = ({
  user,
  primaryColorHex = "#6366f1",
  isCurrentUserProfile,
  qrCodeUrl,
  onPortfolioItemClick,
  toast,
  mounted,
}: {
  user: any;
  primaryColorHex?: string;
  isCurrentUserProfile?: boolean;
  qrCodeUrl?: string;
  onPortfolioItemClick?: (item: any) => void;
  toast?: any;
  mounted?: boolean;
}) => {
  const skills = user.skills || [];
  const experience = user.experience || [];
  const education = user.education || [];
  const portfolio = user.portfolio || [];
  const services = user.services || [];
  const socialLinks = user.socialLinks || [];
  const location = user.location || { city: "", country: "" };

  return (
    <div
      className="min-h-screen px-4 py-10 bg-gradient-to-br from-zinc-100 to-zinc-300 dark:from-zinc-900 dark:to-zinc-800 flex items-center justify-center"
      style={{
        backgroundImage: `radial-gradient(circle at top left, ${primaryColorHex}20, transparent)`,
      }}
    >
      <div className="w-full max-w-5xl backdrop-blur-xl bg-white/60 dark:bg-zinc-900/60 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
        <div
          className="w-full px-6 py-8 flex flex-col items-center text-center bg-cover bg-center relative"
          style={{
            backgroundImage:
              user.coverPhotoUrl
                ? `url('${user.coverPhotoUrl}')`
                : "url('https://www.transparenttextures.com/patterns/cubes.png')",
            backgroundColor: primaryColorHex,
            color: "white",
          }}
        >
          <div className="absolute inset-0 bg-black/30" style={{zIndex:1}} />
          <img
            src={user.profilePictureUrl || "/default-avatar.png"}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover mb-4 relative z-10"
          />
          <h1 className="text-3xl font-bold relative z-10">{user.name}</h1>
          <p className="opacity-90 relative z-10">{user.category}</p>
          {/* Contatos */}
          <div className="flex flex-wrap justify-center gap-2 mt-2 relative z-10">
            {user.email && (
              <a href={`mailto:${user.email}`} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">{user.email}</a>
            )}
            {user.phone && (
              <a href={`tel:${user.phone}`} className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">{user.phone}</a>
            )}
            {user.whatsappNumber && (
              <a href={`https://wa.me/${user.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded hover:bg-green-200 transition">WhatsApp</a>
            )}
            {user.website && (
              <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-xs bg-white/10 px-2 py-1 rounded hover:bg-white/20 transition">Site</a>
            )}
          </div>
          {/* Links sociais */}
          {socialLinks.length > 0 && (
            <div className="flex justify-center flex-wrap gap-3 mt-3 relative z-10">
              {socialLinks.map(link => {
                const IconComponent = require('@/lib/types').platformIcons[link.platform] || Globe;
                return (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition" title={link.platform}>
                    <IconComponent className="w-5 h-5 text-white" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <CardContent className="p-6 space-y-8">
          {/* Bio + Contatos */}
          <section>
            <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
              <Globe className="w-5 h-5" />
              Sobre
            </h2>
            <p className="text-zinc-600 dark:text-zinc-300 whitespace-pre-line mb-4">
              {user.bio || "Nenhuma biografia fornecida."}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-zinc-600 dark:text-zinc-300">
              {user.email && (
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </span>
              )}
              {user.phone && (
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {user.phone}
                </span>
              )}
              {location.city && (
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {location.city}, {location.country}
                </span>
              )}
            </div>
          </section>

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
                Habilidades
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, idx: number) => (
                  <Badge key={idx} variant="outline" className="text-sm">
                    {skill}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {/* Portfólio */}
          {portfolio.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold mb-2 text-zinc-700 dark:text-zinc-100">
                Portfólio
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {portfolio.slice(0, 6).map((item: any, idx: number) => (
                  <div
                    key={idx}
                    className="relative group rounded-lg overflow-hidden shadow-md cursor-pointer"
                    onClick={() => onPortfolioItemClick?.(item)}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.caption || "Portfólio"}
                      className="object-cover w-full h-28"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <Maximize className="w-5 h-5 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experiência e Educação */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
                <Briefcase className="w-5 h-5" />
                Experiência
              </h2>
              {experience.length > 0 ? (
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
                  {experience.map((exp: any, idx: number) => (
                    <li key={idx}>
                      <strong>{exp.title}</strong> – {exp.company} ({exp.years})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500">Nenhuma experiência registrada.</p>
              )}
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-zinc-700 dark:text-zinc-100">
                <GraduationCap className="w-5 h-5" />
                Educação
              </h2>
              {education.length > 0 ? (
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-300">
                  {education.map((edu: any, idx: number) => (
                    <li key={idx}>
                      <strong>{edu.degree}</strong> – {edu.institution} ({edu.years})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-zinc-500">Nenhuma formação registrada.</p>
              )}
            </section>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default ModernProfileLayout;

export const config = {
  id: 'modern-profile',
  name: 'Perfil Moderno',
  description: 'Layout moderno e visualmente atraente.',
  imageUrl: 'https://picsum.photos/seed/layout-modern/300/200',
  plan: 'standard',
};
