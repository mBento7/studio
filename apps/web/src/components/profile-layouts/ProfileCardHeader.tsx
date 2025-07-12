import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProfileActions } from "./ProfileActions";
import { SocialLinks } from "../social/SocialLinks";
import { useProfileQrCode } from "./useProfileQrCode";
import { LocationInfo } from "./LocationInfo";
import { Edit, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { defaultFreeProfileLayoutConfig } from "./FreeProfileLayout/config";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import FreeProfileCardHeaderStandardPremium from "./ProfileCardHeaderStandardPremium";
import StandardProfileCardHeader from "./StandardProfileCardHeader";
import { SkillsList } from "@/components/skills/SkillsList";

interface ProfileCardHeaderProps {
  user: any;
  isCurrentUserProfile: boolean;
  variant: "free" | "standard" | "premium";
}

export default function ProfileCardHeader({ user, isCurrentUserProfile, variant }: ProfileCardHeaderProps) {
  if (variant === "free") {
    // Header Free (mantém o código atual do header free)
    const showPremiumBadge = false;
    const showExtraLinks = false;
    const config = defaultFreeProfileLayoutConfig;
    // QR Code do perfil
    const profileUrl = typeof window !== 'undefined' ? window.location.origin + `/profile/${user.id}` : `/profile/${user.id}`;
    const { qrCodeUrl, isLoading: qrLoading } = useProfileQrCode(profileUrl);

    // Social links: priorizar WhatsApp e garantir 3 exibidos (com placeholder se faltar)
    let displayedSocialLinks = user.socialLinks;
    if (!displayedSocialLinks || displayedSocialLinks.length === 0) {
      // Mock: WhatsApp e Instagram
      displayedSocialLinks = [
        { id: 'mock-whatsapp', platform: 'whatsapp', url: 'https://wa.me/5599999999999' },
        { id: 'mock-instagram', platform: 'instagram', url: 'https://instagram.com/exemplo' }
      ];
    }
    // WhatsApp primeiro
    const whatsapp = displayedSocialLinks.filter((link: any) => link.platform === 'whatsapp');
    const others = displayedSocialLinks.filter((link: any) => link.platform !== 'whatsapp');
    displayedSocialLinks = [...whatsapp, ...others].slice(0, 3);
    // Preencher com placeholders se faltar
    while (displayedSocialLinks.length < 3) {
      displayedSocialLinks.push(null);
    }
    // Skills/tags: limitar a 3 apenas para plano free (caso exibidas no header)
    let displayedSkills = user.skills || [];
    if (displayedSkills.length > 0) {
      displayedSkills = displayedSkills.slice(0, 3);
    }

    return (
      <header className="w-full bg-slate-50 dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row gap-6 p-2 items-start md:items-start relative transition-colors">
        {/* Botão de editar perfil removido */}
        {/* <Link
            href="/dashboard"
            className="absolute top-4 right-4 z-20 bg-white dark:bg-slate-800 rounded-full shadow p-2 hover:bg-primary/10 dark:hover:bg-slate-700 transition-colors border border-primary dark:border-slate-700"
            aria-label="Editar perfil"
          >
            <Edit className="w-5 h-5 text-primary dark:text-blue-400 transition-colors" />
          </Link> */}
        {/* Coluna Esquerda */}
        <section className="flex flex-col items-center gap-4 md:w-1/3 w-full">
          {/* Avatar */}
          <Avatar className="w-48 h-48 mt-8 ring-4 ring-primary/30 shadow-2xl dark:shadow-black/60 border-4 border-white dark:border-slate-800 transition-all duration-300 hover:scale-105">
            <AvatarImage src={user.profile_picture_url} alt={user.name} />
            <AvatarFallback className="text-4xl font-bold">
              {user.name?.split(' ').map((n: string) => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          {/* Botão de compartilhar e editar */}
          <div className="w-full flex justify-center">
            <div className="shadow-xl dark:shadow-black/40 rounded-full">
              <ProfileActions user={user} isCurrentUserProfile={isCurrentUserProfile} />
            </div>
          </div>
          {/* Social Links */}
          {variant !== "free" || config.showSocialLinks !== false ? (
            <div className="flex gap-6 justify-center mt-2">
              {displayedSocialLinks.map((link: any, idx: number) =>
                link ? (
                  <span key={link.id || idx} className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 dark:border-slate-700 shadow-lg dark:shadow-black/40 transition-all hover:bg-primary/10 dark:hover:bg-slate-700 text-primary dark:text-white transition-colors">
                    <SocialLinks links={[link]} variant={variant} maxToShow={1} />
                  </span>
                ) : (
                  <span key={"placeholder-"+idx} className="w-10 h-10 rounded-full border-2 border-primary/30 dark:border-slate-700 flex items-center justify-center opacity-40 bg-white dark:bg-slate-800 shadow-lg dark:shadow-black/40 transition-colors" />
                )
              )}
            </div>
          ) : null}
        </section>

        {/* Coluna Direita */}
        <section className="flex flex-col justify-center md:w-2/3 w-full text-center md:text-left gap-2">
          {/* Nome e cargo */}
          {user.name && (
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-2 transition-colors">{user.name}</h1>
          )}
          {user.category && (
            <span className="text-blue-700 dark:text-blue-300 font-semibold text-lg transition-colors">{user.category}</span>
          )}
          {/* Bio */}
          {user.bio && (
            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-200 max-w-xl mx-auto mt-4 mb-2 transition-colors">{user.bio}</p>
          )}
          {/* Localização, Contatos e QR Code lado a lado */}
          <div className="mt-3 flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full">
            <div className="flex-1 flex flex-col items-center md:items-start">
              {(user.location?.city || user.location?.country) && (
                <div className="flex flex-col items-center md:items-start">
                  <LocationInfo city={user.location?.city} country={user.location?.country} mapsLink={user.maps_link} />
                </div>
              )}
              {(user.email || user.phone) && (
                <div className="mt-4 flex flex-col gap-1 items-center md:items-start text-sm text-gray-600 dark:text-slate-300 transition-colors">
                  {user.email && (
                    <span><Mail className="inline w-4 h-4 mr-1 text-primary dark:text-blue-400 transition-colors" /> {user.email}</span>
                  )}
                  {user.phone && (
                    <span><Phone className="inline w-4 h-4 mr-1 text-primary dark:text-blue-400 transition-colors" /> {user.phone}</span>
                  )}
                </div>
              )}
              {/* Tags abaixo dos contatos */}
              {displayedSkills.length > 0 && (
                <div className="mt-2 flex justify-center md:justify-start">
                  <SkillsList skills={displayedSkills} maxToShow={3} variant="free" />
                </div>
              )}
            </div>
            {/* QR Code à direita */}
            <div className="flex flex-col items-center md:items-start md:justify-start">
              {!qrLoading && qrCodeUrl && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a
                        href={qrCodeUrl}
                        download={`qr-code-${user.username || user.id}.png`}
                        className="group focus:outline-none focus:ring-2 focus:ring-primary"
                        aria-label="Baixar QR Code do perfil"
                      >
                        <img
                          src={qrCodeUrl}
                          alt="QR Code do perfil"
                          className="w-24 h-24 rounded bg-white p-2 border border-slate-200 dark:border-slate-700 shadow group-hover:opacity-80 transition"
                        />
                        <span className="text-xs text-primary dark:text-blue-400 mt-1 group-hover:underline transition">Baixar QR Code</span>
                      </a>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      Clique para baixar o QR Code
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </div>
        </section>
      </header>
    );
  }
  if (variant === "standard") {
    return <StandardProfileCardHeader user={user} isCurrentUserProfile={isCurrentUserProfile} />;
  }
  if (variant === "premium") {
    return <FreeProfileCardHeaderStandardPremium user={user} isCurrentUserProfile={isCurrentUserProfile} variant={variant} />;
  }
  return null;
} 