import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";

interface PremiumBannerDisplayProps {
  imageUrl: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
}

export const PremiumBannerDisplay: React.FC<PremiumBannerDisplayProps> = ({
  imageUrl,
  title,
  description,
  ctaText,
  ctaLink,
}) => {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between bg-gradient-to-r from-blue-800 via-purple-800 to-indigo-900 text-white overflow-hidden">
      
      {/* Imagem com espaçamento interno (recuada) */}
      <div className="p-4 w-full md:w-1/2 flex items-center justify-center">
        <div className="relative w-full h-64 md:h-[300px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Conteúdo à direita */}
      <div className="w-full md:w-1/2 px-6 py-10 text-center md:text-left space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
        <p className="text-sm md:text-base">{description}</p>
        {ctaText && ctaLink && (
          <Button asChild>
            <a href={ctaLink} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};
