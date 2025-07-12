import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

/**
 * Props para o componente EducationList
 * @param education Array de formações (degree, institution, years, id?)
 * @param maxToShow Número máximo de formações a exibir (default: 6)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param isCurrentUserProfile Se é o próprio perfil (exibe botão de editar)
 * @param onEdit Callback ao clicar em editar (opcional)
 */
export interface EducationItem {
  id?: string;
  degree: string;
  institution: string;
  years?: string;
}

export interface EducationListProps {
  education: EducationItem[];
  maxToShow?: number;
  variant?: "free" | "standard" | "premium";
  isCurrentUserProfile?: boolean;
  onEdit?: (index: number) => void;
}

export const EducationList: React.FC<EducationListProps> = ({
  education = [],
  maxToShow = 6,
  variant = "free",
  isCurrentUserProfile = false,
  onEdit,
}) => {
  const displayed = education.slice(0, maxToShow);

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
      {displayed.map((edu, idx) => (
        <Card key={edu.id || idx} className="relative pl-6 p-4 shadow-none">
          <div className="absolute left-0 top-1 w-2 h-2 rounded-full bg-primary" />
          <div className="absolute left-[3px] top-2 h-full w-px bg-primary/20" />
          <div className="font-semibold">{edu.degree}</div>
          <div className="text-sm text-muted-foreground">{edu.institution}</div>
          {edu.years && <div className="text-xs text-muted-foreground">{edu.years}</div>}
          {isCurrentUserProfile && onEdit && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2"
              onClick={() => onEdit(idx)}
              aria-label="Editar formação"
            >
              <Pencil className="w-4 h-4" />
            </Button>
          )}
        </Card>
      ))}
    </div>
  );
}; 