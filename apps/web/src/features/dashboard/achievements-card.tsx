"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Award, Star, Handshake, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";

const achievements = [
  { 
    id: "pioneer", 
    name: "Pioneiro", 
    description: "Entrou para o WhosDo no primeiro mês de lançamento.",
    icon: Star,
    unlocked: true 
  },
  { 
    id: "top-advertiser", 
    name: "Top Anunciante", 
    description: "Criou mais de 10 anúncios patrocinados.",
    icon: Megaphone,
    unlocked: true 
  },
  { 
    id: "super-connector", 
    name: "Super Conector", 
    description: "Convidou mais de 5 amigos para a plataforma.",
    icon: Handshake,
    unlocked: true 
  },
  { 
    id: "story-master", 
    name: "Mestre dos Stories", 
    description: "Publicou 20 stories.",
    icon: Award,
    unlocked: false 
  },
  {
    id: "profile-complete",
    name: "Perfil Completo",
    description: "Preencheu todas as seções do seu perfil público.",
    icon: Award,
    unlocked: false
  }
];

export function AchievementsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Suas Conquistas</CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <div className="flex flex-wrap gap-4">
            {achievements.map((ach) => (
              <Tooltip key={ach.id}>
                <TooltipTrigger>
                  <div
                    className={cn(
                      "flex items-center justify-center w-16 h-16 rounded-full border-2 transition-all duration-300",
                      ach.unlocked
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-muted/50 border-dashed border-muted-foreground/50 text-muted-foreground/50"
                    )}
                  >
                    <ach.icon className="w-8 h-8" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-bold">{ach.name} {ach.unlocked ? "(Desbloqueado)" : "(Bloqueado)"}</p>
                  <p className="text-sm text-muted-foreground">{ach.description}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  );
}
