import React from "react";
import { cn } from "@/lib/utils";

interface ProfileCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Container padronizado para Cards dos layouts de perfil.
 * Aplica classes utilitárias comuns para sombra, borda e arredondamento.
 */
export const ProfileCardContainer: React.FC<ProfileCardContainerProps> = ({ children, className }) => (
  <div className={cn("shadow-lg shadow-black/30 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#23272f] p-6 transition-colors duration-300", className)}>
    {children}
  </div>
); 