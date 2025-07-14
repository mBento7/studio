import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { ProfileActions } from "./ProfileActions";
import { SocialLinks } from "../social/SocialLinks";
import { useProfileQrCode } from "./useProfileQrCode";
import { LocationInfo } from "./LocationInfo";
import { Edit } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

interface ProfileCardHeaderProps {
  user: any;
  isCurrentUserProfile: boolean;
  variant: "standard" | "premium";
}

export default function ProfileCardHeaderStandardPremium({ user, isCurrentUserProfile, variant }: ProfileCardHeaderProps) {
  const showPremiumBadge = variant === "premium" && user.isPremium;
  const showExtraLinks = variant === "premium" || variant === "standard";
  // QR Code do perfil
  const profileUrl = typeof window !== 'undefined' ? window.location.origin + `/profile/${user.id}` : `https://example.com/profile/${user.id}`;
  const { qrCodeUrl, isLoading: qrLoading } = useProfileQrCode(profileUrl);

  let displayedSocialLinks = user.socialLinks || [];
  let displayedSkills = user.skills || [];

  return (
    <header className="w-full bg-white rounded-2xl shadow flex flex-col md:flex-row gap-8 p-8 items-center md:items-start relative">
      {/* Ícone de lápis no canto superior direito */}
      {isCurrentUserProfile && (
        <Link
          href="/dashboard"
          className="absolute top-4 right-4 z-20 bg-white rounded-full shadow p-2 hover:bg-primary/10 transition-colors border border-primary"
          aria-label="Editar perfil"
        >
          <Edit className="w-5 h-5 text-primary" />
        </Link>
      )}
      {/* Coluna Esquerda */}
      <section className="flex flex-col items-center md:w-1/3 w-full">
        {/* Avatar */}
        <Avatar className={`w-32 h-32 md:w-40 md:h-40 border-4 border-white dark:border-slate-800 shadow-lg ring-2 ring-primary/40`}>
          <AvatarImage src={user.profile_picture_url} alt={user.name} />
          <AvatarFallback className="text-4xl font-bold">
            {user.name?.split(' ').map((n: string) => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        {/* Selo premium */}
        {showPremiumBadge && (
          <Badge className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold px-4 py-1 mt-2">Premium</Badge>
        )}
        {/* Botão de compartilhar e editar */}
        <ProfileActions user={user} isCurrentUserProfile={isCurrentUserProfile} />
        {/* Social Links */}
        {displayedSocialLinks.length > 0 && (
          <div className="mt-4">
            <SocialLinks links={displayedSocialLinks} variant={variant} maxToShow={displayedSocialLinks.length} />
          </div>
        )}
        {/* Skills/tags no header, se desejado */}
        {variant === "standard" && displayedSkills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {displayedSkills.map((skill: string, idx: number) => (
              <span key={idx} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">{skill}</span>
            ))}
          </div>
        )}
      </section>

      {/* Coluna Direita */}
      <section className="flex flex-col justify-center md:w-2/3 w-full text-center md:text-left">
        {/* Nome e cargo */}
        {user.name && (
          <h1 className="text-3xl font-bold text-foreground dark:text-white mt-2">{user.name}</h1>
        )}
        {user.category && (
          <span className="text-primary font-light text-lg">{user.category}</span>
        )}
        {/* Bio */}
        {user.bio && (
          <p className="text-base leading-relaxed text-foreground max-w-xl mx-auto mt-2">{user.bio}</p>
        )}
        {/* Localização */}
        {(user.location?.city || user.location?.country) && (
          <div className="mt-3 flex flex-col items-center md:items-start">
            <LocationInfo city={user.location?.city} country={user.location?.country} mapsLink={user.maps_link} />
          </div>
        )}
        {/* Contatos */}
        {(user.email || user.phone) && (
          <div className="mt-2 flex flex-col gap-1 items-center md:items-start">
            {user.email && (
              <span className="text-sm text-gray-500">
                <strong>Email:</strong> {user.email}
              </span>
            )}
            {user.phone && (
              <span className="text-sm text-gray-500">
                <strong>Telefone:</strong> {user.phone}
              </span>
            )}
          </div>
        )}
        {/* QR Code do perfil */}
        <div className="mt-6 flex flex-col items-center md:items-start">
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
                      className="w-24 h-24 rounded bg-white p-2 border group-hover:opacity-80 transition"
                    />
                    <span className="text-xs text-primary mt-1 group-hover:underline">Baixar QR Code</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent side="top">
                  Clique para baixar o QR Code
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        {/* Links extras (exemplo: website, portfólio externo) */}
        {showExtraLinks && user.website && (
          <a href={user.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 block">{user.website}</a>
        )}
        {/* Botão de ação premium (exemplo) */}
        {variant === "premium" && (
          <Button variant="default" size="sm" className="mt-3">
            <Star className="w-4 h-4 mr-1" /> Destaque Premium
          </Button>
        )}
      </section>
    </header>
  );
}