"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { UserProfile } from "@/components/profile-layouts/PremiumProfileLayout"; // Removido, pois não é mais usado aqui

interface ProfileHeaderProps {
  handleSectionClick: (section: string) => void;
  primaryColorHex?: string; // Adicionado
  isCurrentUserProfile?: boolean;
  onEditProfile?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ handleSectionClick, primaryColorHex, isCurrentUserProfile, onEditProfile }) => {
  // sectionRefs foi movido para o componente pai (PremiumProfileLayout) onde é usado para rolagem.
  // const sectionRefs = {
  //   hero: React.useRef<HTMLDivElement>(null),
  //   portfolio: React.useRef<HTMLDivElement>(null),
  //   services: React.useRef<HTMLDivElement>(null),
  //   reviews: React.useRef<HTMLDivElement>(null), // Adicionado para manter consistência
  //   contact: React.useRef<HTMLDivElement>(null),
  // };

  return (
    <div className="sticky top-0 z-20 w-full bg-white/90 dark:bg-background/80 backdrop-blur-md py-2 shadow-md">
      <div className="container mx-auto xxs:px-0 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="flex justify-center gap-2 py-2 rounded-full overflow-x-auto no-scrollbar w-full xxs:px-0 px-2 bg-transparent">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => {
                  if (tab.id === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    // Passar a string literal do id, o componente pai fará a rolagem
                    handleSectionClick(tab.id);
                  }
                }}
                className={cn(
                  "px-6 xxs:px-2 py-2 xxs:py-1 flex items-center justify-center rounded-full font-semibold whitespace-nowrap xxs:text-xs transition-all duration-200",
                  "bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700/50",
                  // Gradiente dinâmico baseado no primaryColorHex
                  primaryColorHex
                    ? `data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#${primaryColorHex}] data-[state=active]:to-[#${primaryColorHex}dd] data-[state=active]:text-black data-[state=active]:shadow-lg`
                    : "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-400 data-[state=active]:text-black data-[state=active]:shadow-lg"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        {/* Remover o botão de editar perfil do header */}
      </div>
    </div>
  );
};

export default ProfileHeader; 