import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

/**
 * Props para o componente ExperienceList
 * @param experience Array de experiências (title, company, years, id?)
 * @param maxToShow Número máximo de experiências a exibir (default: 6)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param isCurrentUserProfile Se é o próprio perfil (exibe botão de editar)
 * @param onEdit Callback ao clicar em editar (opcional)
 */
export interface ExperienceItem {
  id?: string;
  title: string;
  company: string;
  years?: string;
}

export interface ExperienceListProps {
  experience: ExperienceItem[];
  maxToShow?: number;
  variant?: "free" | "standard" | "premium";
  isCurrentUserProfile?: boolean;
  onEdit?: (index: number) => void;
}

export const ExperienceList: React.FC<ExperienceListProps> = ({
  experience = [],
  maxToShow = 6,
  variant = "free",
  isCurrentUserProfile = false,
  onEdit,
}) => {
  const displayed = experience.slice(0, maxToShow);

  return (
    <div
      className={
        variant === "premium"
          ? "space-y-4"
          : variant === "standard"
          ? "space-y-3"
          : "space-y-2"
      }
    >
      {displayed.map((exp, idx) => (
        variant === "free" ? (
          <div key={exp.id || idx} className="relative pl-6 py-2">
            <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary" />
            <div className="absolute left-[3px] top-4 h-full w-px bg-primary/20" />
            <div className="font-semibold text-base text-white dark:text-white">{exp.title}</div>
            <div className="text-sm text-muted-foreground">{exp.company}</div>
            {exp.years && <div className="text-xs text-muted-foreground">{exp.years}</div>}
          </div>
        ) : (
          <Card key={exp.id || idx} className="relative pl-6 p-4 shadow-none">
            <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
            <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
            <div className="font-semibold">{exp.title}</div>
            <div className="text-sm text-muted-foreground">{exp.company}</div>
            {exp.years && <div className="text-xs text-muted-foreground">{exp.years}</div>}
            {isCurrentUserProfile && onEdit && (
              <Button
                size="icon"
                variant="ghost"
                className="absolute top-2 right-2"
                onClick={() => onEdit(idx)}
                aria-label="Editar experiência"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            )}
          </Card>
        )
      ))}
    </div>
  );
}; 