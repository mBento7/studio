import React from "react";
import { Button } from "@/components/ui/button";
import { platformIcons } from "@/lib/types";

/**
 * Props para o componente SocialLinks
 * @param links Array de links sociais (id, platform, url)
 * @param maxToShow Número máximo de links a exibir (default: 3)
 * @param highlightWhatsapp Destaca o WhatsApp (default: true)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param showMoreButton Exibe botão "+X" se houver mais links (default: false)
 */
export interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

interface SocialLinksProps {
  links: SocialLink[];
  maxToShow?: number;
  highlightWhatsapp?: boolean;
  variant?: "free" | "standard" | "premium";
  showMoreButton?: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  links = [],
  maxToShow = 3,
  highlightWhatsapp = true,
  variant = "free",
  showMoreButton = false,
}) => {
  // Ordena WhatsApp primeiro
  const sortedLinks = [
    ...links.filter((l) => l.platform === "whatsapp"),
    ...links.filter((l) => l.platform !== "whatsapp"),
  ];
  const displayedLinks = sortedLinks.slice(0, maxToShow);
  const extraCount = sortedLinks.length - displayedLinks.length;

  return (
    <div className="flex gap-2 flex-wrap items-center">
      {displayedLinks.map((link) => {
        // Corrigir: evitar <a> aninhado para WhatsApp
        const Icon = platformIcons[link.platform] || platformIcons["globe"];
        const isWhatsapp = link.platform === "whatsapp" && highlightWhatsapp;
        return (
          <Button
            asChild
            key={link.id}
            variant={isWhatsapp ? "default" : "outline"}
            size="icon"
            className={`rounded-full transition-all duration-200 focus:ring-2 focus:ring-primary ${
              isWhatsapp ? "bg-green-500 text-white hover:bg-green-600" : ""
            } ${variant === "premium" ? "shadow-lg" : ""}`}
            aria-label={link.platform}
            title={link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {/* Para WhatsApp, renderizar apenas o SVG do SocialIcon, nunca o <a> interno */}
              {isWhatsapp ? (
                <span className="w-4 h-4 inline-block align-middle">
                  {/* SVG do WhatsApp (exemplo simplificado) */}
                  <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.832 4.584 2.236 6.364L4 29l7.818-2.236A11.96 11.96 0 0016 27c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 22c-1.885 0-3.68-.516-5.207-1.414l-.37-.221-4.642 1.327 1.327-4.642-.221-.37A9.956 9.956 0 016 15c0-5.514 4.486-10 10-10s10 4.486 10 10-4.486 10-10 10zm5.29-7.71c-.29-.145-1.715-.848-1.98-.945-.265-.097-.458-.145-.65.145-.19.29-.748.945-.917 1.14-.17.195-.34.22-.63.075-.29-.145-1.225-.452-2.334-1.44-.863-.77-1.445-1.72-1.615-2.01-.17-.29-.018-.447.127-.592.13-.13.29-.34.435-.51.145-.17.193-.29.29-.485.097-.194.048-.365-.024-.51-.073-.145-.65-1.57-.89-2.15-.235-.565-.475-.49-.65-.5-.17-.007-.365-.01-.56-.01-.194 0-.51.073-.78.365-.27.29-1.02 1-.99 2.43.03 1.43 1.04 2.81 1.19 3.01.145.195 2.05 3.13 5.01 4.27.7.3 1.25.48 1.68.615.705.225 1.345.193 1.85.117.565-.085 1.715-.7 1.96-1.38.24-.68.24-1.265.17-1.38-.07-.115-.265-.19-.555-.335z"/></svg>
                </span>
              ) : (
                <Icon className="w-4 h-4" />
              )}
            </a>
          </Button>
        );
      })}
      {showMoreButton && extraCount > 0 && (
        <span className="ml-2 text-xs text-muted-foreground">+{extraCount}</span>
      )}
    </div>
  );
}; 