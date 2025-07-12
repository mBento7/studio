import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Edit3, Mail, Phone, MapPin, QrCode, Share2, MessageSquare, Settings, Eye, Star, X, Instagram, Linkedin, Twitter, Facebook, Github, Globe, Youtube } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { useProfileQrCode } from "./useProfileQrCode";
import Link from "next/link";
import { SocialLinks } from "../social/SocialLinks";
import { LocationInfo } from "./LocationInfo";
import { motion } from "framer-motion"; // Importar motion

interface StandardProfileCardHeaderProps {
  user: any;
  isCurrentUserProfile: boolean;
}

const DEFAULT_PRIMARY = "#BDBDBD"; // igual à borda padrão dos cards
const DEFAULT_SECONDARY = "#F4F4F5"; // cinza claro padrão
const PRIMARY_COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];
const SECONDARY_COLORS = ["#8B5CF6", "#F59E0B", "#10B981", "#EF4444", "#3B82F6"];

const ColorCustomizer = ({
  isOpen,
  onClose,
  primaryColor,
  secondaryColor,
  onPrimaryColorChange,
  onSecondaryColorChange,
}: {
  isOpen: boolean;
  onClose: () => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryColorChange: (color: string) => void;
  onSecondaryColorChange: (color: string) => void;
}) => {
  if (!isOpen) return null;
  return (
    <div className="absolute top-14 left-3 z-50 bg-white dark:bg-[#18181b] dark:text-white rounded-xl shadow-xl p-6 w-80 border border-gray-200 dark:border-gray-700 transition-colors duration-300 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Personalizar Cor</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded" aria-label="Fechar customizador de cor">
          <X className="w-5 h-5 dark:text-white" />
        </button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Cor Primária</label>
        <div className="flex gap-2 items-center">
          {/* Opção padrão */}
          <button
            onClick={() => onPrimaryColorChange(DEFAULT_PRIMARY)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${primaryColor === DEFAULT_PRIMARY ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800`}
            aria-label="Cor padrão primária"
            title="Padrão"
          >
            <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
          </button>
          {/* Outras cores */}
          {PRIMARY_COLORS.map(color => (
            <button
              key={color}
              onClick={() => onPrimaryColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 ${primaryColor === color ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'}`}
              style={{ backgroundColor: color }}
              aria-label={`Selecionar cor primária ${color}`}
            />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Cor Secundária</label>
        <div className="flex gap-2 items-center">
          {/* Opção padrão */}
          <button
            onClick={() => onSecondaryColorChange(DEFAULT_SECONDARY)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${secondaryColor === DEFAULT_SECONDARY ? 'border-yellow-400' : 'border-gray-300 dark:border-gray-600'} bg-white dark:bg-gray-800`}
            aria-label="Cor padrão secundária"
            title="Padrão"
          >
            <Star className="w-4 h-4 text-yellow-400 dark:text-yellow-300" />
          </button>
          {/* Outras cores */}
          {SECONDARY_COLORS.map(color => (
            <button
              key={color}
              onClick={() => onSecondaryColorChange(color)}
              className={`w-8 h-8 rounded-full border-2 ${secondaryColor === color ? 'border-purple-500' : 'border-gray-300 dark:border-gray-600'}`}
              style={{ backgroundColor: color }}
              aria-label={`Selecionar cor secundária ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Mapeamento de plataforma para ícone Lucide
const platformIcons: Record<string, any> = {
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
  whatsapp: MessageSquare,
  globe: Globe,
  youtube: Youtube,
};

const StandardProfileCardHeader: React.FC<StandardProfileCardHeaderProps> = ({ user, isCurrentUserProfile }) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [primaryColor, setPrimaryColor] = useState<string>(DEFAULT_PRIMARY);
  const [secondaryColor, setSecondaryColor] = useState<string>(DEFAULT_SECONDARY);
  const [isEditing, setIsEditing] = useState(false);

  // QR Code do perfil
  const profileUrl = typeof window !== 'undefined' ? window.location.origin + `/profile/${user.id}` : `/profile/${user.id}`;
  const { qrCodeUrl, isLoading: qrLoading } = useProfileQrCode(profileUrl);

  // Social links: priorizar WhatsApp e garantir 3 exibidos (com placeholder se faltar)
  let displayedSocialLinks = user.socialLinks;
  if (!displayedSocialLinks || displayedSocialLinks.length === 0) {
    displayedSocialLinks = [
      { id: 'mock-whatsapp', platform: 'whatsapp', url: 'https://wa.me/5599999999999' },
      { id: 'mock-instagram', platform: 'instagram', url: 'https://instagram.com/exemplo' }
    ];
  }
  const whatsapp = displayedSocialLinks.filter((link: any) => link.platform === 'whatsapp');
  const others = displayedSocialLinks.filter((link: any) => link.platform !== 'whatsapp');
  displayedSocialLinks = [...whatsapp, ...others].slice(0, 3);
  while (displayedSocialLinks.length < 3) {
    displayedSocialLinks.push(null);
  }

  // Função para compartilhar perfil
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: user.name,
          text: user.bio,
          url: window.location.href,
        });
      } catch (error) {
        // fallback
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copiado para a área de transferência!');
    }
  };

  return (
    <div className="relative bg-gradient-to-b from-primary/10 to-background pb-8 rounded-2xl shadow-lg">
      {/* Capa */}
      {user.cover_photo_url && (
        <div className="relative w-full h-64 sm:h-80 bg-muted/50 rounded-t-2xl overflow-hidden">
          <img
            src={user.cover_photo_url}
            alt="Capa"
            className="w-full h-full object-cover"
          />
          {isCurrentUserProfile && (
            <button
              type="button"
              className="absolute top-2 right-2 p-2 bg-white/80 rounded-full shadow hover:bg-white"
              title="Editar capa"
            >
              <Edit3 className="w-5 h-5 text-primary" />
            </button>
          )}
        </div>
      )}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-[-2rem] relative z-10">
        <div
          className="flex flex-col lg:flex-row gap-8 p-8 border border-gray-200 dark:border-transparent backdrop-blur-md rounded-2xl shadow-lg items-center lg:items-start relative bg-white/90 dark:bg-slate-900/90"
          style={{ borderColor: primaryColor, borderWidth: 2, background: `${secondaryColor}15` }}
        >
          {isCurrentUserProfile && (
            <>
              <button
                onClick={() => setIsThemeOpen(!isThemeOpen)}
                className="absolute top-3 left-3 z-20 p-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Abrir customizador de cor"
              >
                <Settings className="w-5 h-5 text-gray-700" />
              </button>
              <ColorCustomizer
                isOpen={isThemeOpen}
                onClose={() => setIsThemeOpen(false)}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                onPrimaryColorChange={setPrimaryColor}
                onSecondaryColorChange={setSecondaryColor}
              />
            </>
          )}
          {/* Coluna da esquerda: Avatar + botões de Ação */}
          <div className="flex flex-col items-center w-full lg:w-1/3 gap-4">
            {/* Avatar Section */}
            <motion.div
              className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full border-4 shadow-lg ring-2 overflow-hidden bg-background flex-shrink-0 shadow-xl dark:shadow-black/70"
              style={{ borderColor: primaryColor, boxShadow: `0 0 0 4px ${primaryColor}40` }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.4)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Avatar className="w-full h-full">
                <AvatarImage src={user.profile_picture_url || 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder'} alt={user.name} />
                <AvatarFallback className="text-4xl font-bold">
                  {user.name?.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {isCurrentUserProfile && (
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-6 z-50 p-2 bg-primary text-white rounded-full shadow-lg border-2 border-white hover:bg-primary/90 transition"
                  title="Editar foto de perfil"
                >
                  <Edit3 className="w-6 h-6 text-white" />
                </button>
              )}
            </motion.div>
            {/* Botão Chamar no Chat (Condicional) */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="shadow-lg dark:shadow-black/40 rounded-full"
            >
              <Button
                size="sm"
                className="rounded-full px-4 py-2 text-sm flex items-center gap-2 w-fit justify-center bg-primary text-primary-foreground hover:bg-accent focus:ring-2 focus:ring-primary transition-all duration-200 mt-6 shadow-lg shadow-primary/20 dark:shadow-none"
              >
                <MessageSquare className="w-4 h-4" /> Chamar no Chat
              </Button>
            </motion.div>
            {/* Botão Compartilhar Perfil */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="shadow-md dark:shadow-black/40 rounded-full"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="rounded-full px-4 py-2 flex items-center gap-2 w-fit justify-center border-primary text-primary hover:bg-primary hover:text-primary-foreground focus:ring-2 focus:ring-primary transition-all duration-200 mt-2 shadow-md shadow-primary/10 dark:shadow-none"
                aria-label="Compartilhar"
              >
                <Share2 className="w-4 h-4 mr-2" /> Compartilhar
              </Button>
            </motion.div>
          </div>
          {/* Coluna da direita: informações do perfil */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left gap-2">
            <div className="flex items-center gap-2 justify-center lg:justify-start">
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-0"
                style={{ color: primaryColor === '#BDBDBD' ? '#111827' : primaryColor }}
              >
                {user.name}
              </h1>
              {isCurrentUserProfile && (
                <button type="button" onClick={() => setIsEditing((prev) => !prev)} className="ml-2 p-1 rounded-full hover:bg-muted transition" title={isEditing ? 'Visualizar perfil' : 'Editar perfil'} aria-label={isEditing ? 'Visualizar perfil' : 'Editar perfil'}>
                  {isEditing ? <Eye className="w-5 h-5 text-primary" /> : <Edit3 className="w-5 h-5 text-primary" />}
                </button>
              )}
            </div>
            <div className="text-lg sm:text-xl text-muted-foreground mb-1">{user.category}</div>
            <div className="mt-2 mb-4 max-w-2xl">
              <p className="text-foreground/90 leading-relaxed whitespace-pre-line text-base">{user.bio}</p>
            </div>
            {/* Localização (lado direito) */}
            <div className="flex w-full justify-center lg:justify-start">
              <LocationInfo city={user.location?.city} country={user.location?.country} mapsLink={user.maps_link} />
            </div>
            {/* Contatos e SocialLinks e QR Code lado a lado */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 w-full">
              <div className="flex-1 flex flex-col items-center md:items-start">
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 text-sm sm:text-base text-muted-foreground mb-2">
                  {user.email && (
                    <div className="flex items-center gap-1"><Mail className="w-4 h-4" /><span>{user.email}</span></div>
                  )}
                  {user.phone && (
                    <div className="flex items-center gap-1"><Phone className="w-4 h-4" /><span>{user.phone}</span></div>
                  )}
                </div>
                {/* Social links */}
                <div className="flex gap-6 justify-center md:justify-start mt-2">
                  {displayedSocialLinks.map((link: any, idx: number) =>
                    link ? (
                      <motion.span
                        key={link.id || idx}
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border-2 border-primary/20 dark:border-slate-700 shadow-xl dark:shadow-black/40 transition-all hover:bg-primary/10 dark:hover:bg-slate-700 text-primary dark:text-white transition-colors"
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <SocialLinks links={[link]} variant="standard" maxToShow={1} />
                      </motion.span>
                    ) : (
                      <span key={"placeholder-"+idx} className="w-10 h-10 rounded-full border-2 border-primary/30 dark:border-slate-700 flex items-center justify-center opacity-40 bg-white dark:bg-slate-800 shadow-xl dark:shadow-black/40 transition-colors" />
                    )
                  )}
                </div>
              </div>
              {/* QR Code à direita */}
              <div className="flex flex-col items-center md:items-end md:justify-end min-w-[110px]">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default StandardProfileCardHeader; 