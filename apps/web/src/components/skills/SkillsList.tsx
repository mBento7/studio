import React from "react";
import { Badge } from "@/components/ui/badge";

/**
 * Props para o componente SkillsList
 * @param skills Array de skills (strings)
 * @param maxToShow Número máximo de skills a exibir (default: 8)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param showMoreButton Exibe '+X' se houver mais skills (default: true)
 */
export interface SkillsListProps {
  skills: string[];
  maxToShow?: number;
  variant?: "free" | "standard" | "premium";
  showMoreButton?: boolean;
}

export const SkillsList: React.FC<SkillsListProps> = ({
  skills = [],
  maxToShow = 8,
  variant = "free",
  showMoreButton = true,
}) => {
  const displayed = skills.slice(0, maxToShow);
  const extraCount = skills.length - displayed.length;

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {displayed.map((skill, idx) => (
        <Badge
          key={skill + idx}
          className={
            variant === "premium"
              ? "bg-blue-100 dark:bg-blue-800/70 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-600/30 text-xs"
              : variant === "standard"
              ? "bg-green-100 dark:bg-green-800/70 text-green-800 dark:text-green-100 border-green-200 dark:border-green-600/30 text-xs"
              : "bg-slate-200 dark:bg-slate-700/50 text-slate-800 dark:text-white border-slate-200 dark:border-slate-600 text-xs"
          }
        >
          {skill}
        </Badge>
      ))}
      {showMoreButton && extraCount > 0 && (
        <Badge className="bg-slate-200 dark:bg-slate-700/50 text-slate-800 dark:text-white border-slate-200 dark:border-slate-600 text-xs">
          +{extraCount} mais
        </Badge>
      )}
    </div>
  );
}; 