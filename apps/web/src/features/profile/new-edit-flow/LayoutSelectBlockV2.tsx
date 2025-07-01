import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUTS, PlanType } from "./layoutFeatures";
import { Info, Star, User, Briefcase, Award, Layers } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const PLAN_COLORS: Record<PlanType, string> = {
  default: "bg-gray-200 text-gray-700",
  free: "bg-green-200 text-green-800",
  standard: "bg-blue-200 text-blue-800",
  premium: "bg-yellow-200 text-yellow-800",
};

const PLAN_LABELS: Record<PlanType, string> = {
  default: "Padrão",
  free: "Free",
  standard: "Standard",
  premium: "Premium",
};

const ICONS: Record<string, React.ReactNode> = {
  basic: <User className="w-7 h-7 text-gray-400" />,
  minimalist: <Star className="w-7 h-7 text-green-400" />,
  modern: <Layers className="w-7 h-7 text-blue-400" />,
  portfolio: <Briefcase className="w-7 h-7 text-purple-400" />,
  pro: <Award className="w-7 h-7 text-yellow-500" />,
  advanced: <Info className="w-7 h-7 text-yellow-700" />,
};

function isAllowed(plan: PlanType, layoutPlan: PlanType) {
  if (plan === "premium") return true;
  if (plan === "standard") return layoutPlan === "standard" || layoutPlan === "free" || layoutPlan === "default";
  if (plan === "free") return layoutPlan === "free" || layoutPlan === "default";
  return layoutPlan === "default";
}

export function LayoutSelectBlockV2({ currentPlan, selectedLayout, onSelect, onUpgrade }: {
  currentPlan: PlanType;
  selectedLayout: string;
  onSelect: (layout: string) => void;
  onUpgrade?: () => void;
}) {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h4 className="text-2xl font-bold mb-4 text-center">Escolha seu Layout</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {LAYOUTS.map(layout => {
            const allowed = isAllowed(currentPlan, layout.plan);
            const isSelected = selectedLayout === layout.key;
            return (
              <div key={layout.key} className="relative">
                <Card
                  className={`p-6 flex flex-col gap-3 border-2 transition-all h-full shadow-md ${isSelected ? "border-primary ring-2 ring-primary/30" : "border-muted"} ${!allowed ? "opacity-70" : ""}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    {ICONS[layout.key] || <Info className="w-7 h-7 text-gray-300" />}
                    <span className="font-bold text-lg flex-1">{layout.name}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${PLAN_COLORS[layout.plan]}`}>{PLAN_LABELS[layout.plan]}</span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {allowed ? `Disponível no plano ${PLAN_LABELS[layout.plan]}` : `Requer plano ${PLAN_LABELS[layout.plan]}`}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <span className="text-muted-foreground text-sm mb-1">{layout.description}</span>
                  <ul className="list-disc ml-6 text-xs text-muted-foreground mb-2">
                    {layout.benefits.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="mt-auto flex gap-2">
                    {allowed ? (
                      <Button
                        variant={isSelected ? "default" : "outline"}
                        onClick={() => onSelect(layout.key)}
                        disabled={isSelected}
                        className="w-full"
                      >
                        {isSelected ? "Selecionado" : "Selecionar"}
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={onUpgrade} className="w-full">
                        Fazer upgrade para acessar
                      </Button>
                    )}
                  </div>
                  {!allowed && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 mb-2">Requer upgrade</span>
                    </div>
                  )}
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </TooltipProvider>
  );
} 