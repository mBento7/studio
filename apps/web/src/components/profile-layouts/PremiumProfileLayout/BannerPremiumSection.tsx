import { Button } from "@/components/ui/button";
import React from "react";

interface BannerPremiumSectionProps {
  premiumBanner: {
    title: string;
    description: string;
    imageUrl: string;
    ctaText?: string;
  };
}

export function BannerPremiumSection({ premiumBanner }: BannerPremiumSectionProps) {
  if (!premiumBanner) return null;
  return (
    <section
      className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-0 px-0 overflow-hidden"
      style={{
        backgroundImage: `url('${premiumBanner.imageUrl}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '240px',
        borderRadius: '0',
      }}
    >
      {/* Overlay para legibilidade do texto */}
      <div className="w-full h-full absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-900/60 to-orange-900/60 pointer-events-none" />
      <div className="relative flex flex-col md:flex-row items-center md:items-stretch justify-center gap-3 md:gap-8 w-full max-w-5xl mx-auto py-12 md:py-16 px-4 md:px-8">
        {/* Espaço vazio para alinhar à direita em telas grandes */}
        <div className="hidden md:block md:flex-1" />
        <div className="flex flex-col items-center md:items-start justify-center gap-4 md:gap-6 text-center md:text-left md:flex-1">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-2xl mb-2 md:mb-4 tracking-tight">{premiumBanner.title}</h2>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 drop-shadow mb-2 md:mb-4 max-w-2xl">{premiumBanner.description}</p>
          {premiumBanner.ctaText && (
            <Button className="bg-gradient-to-r from-orange-400 to-pink-500 text-white font-bold mt-2 px-8 py-3 text-lg rounded-full shadow-lg hover:scale-105 hover:from-orange-500 hover:to-pink-600 transition-transform duration-200">
              {premiumBanner.ctaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
} 