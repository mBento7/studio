import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUTS, PlanType } from "./layoutFeatures";
import { Star as StarIcon, CheckCircle2, Info, Star, User, Briefcase, Award, Layers, Crown, Gem } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { motion } from "framer-motion";

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
  modern: <Layers className="w-7 h-7 text-green-700" />,
  portfolio: <Briefcase className="w-7 h-7 text-purple-400" />,
  pro: <Award className="w-7 h-7 text-yellow-500" />,
  advanced: <Info className="w-7 h-7 text-blue-700" />,
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
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <h4 className="text-2xl font-bold mb-4 text-center">Escolha seu Layout</h4>
        {/* Tabs para alternar entre os cards */}
        <div className="flex justify-center gap-2 mb-6">
          {LAYOUTS.map((layout, idx) => (
            <button
              key={layout.key}
              className={`px-4 py-2 rounded-t-lg font-semibold transition-all duration-200 border-b-2 ${selectedTab === idx ? 'border-primary text-primary bg-white shadow' : 'border-transparent text-muted-foreground bg-muted/40 hover:bg-white/80'}`}
              onClick={() => setSelectedTab(idx)}
            >
              {layout.name}
            </button>
          ))}
        </div>
        {/* Carrossel animado dos cards */}
        <div className="relative w-full flex items-center justify-center px-2 sm:px-0 min-h-[700px]">
          {LAYOUTS.map((layout, idx) => (
            <motion.div
              key={layout.key}
              initial={{ opacity: 0, x: idx > selectedTab ? 100 : -100 }}
              animate={{ opacity: idx === selectedTab ? 1 : 0, x: idx === selectedTab ? 0 : idx > selectedTab ? 100 : -100 }}
              transition={{ duration: 0.4, type: 'spring' }}
              className={`absolute w-full max-w-lg ${idx === selectedTab ? 'z-10' : 'z-0 pointer-events-none select-none'}`}
              style={{ display: idx === selectedTab ? 'block' : 'none' }}
            >
              <div className="relative">
                <Card
                  className={`p-6 flex flex-col gap-3 border-2 transition-all h-full shadow-md bg-white/95 dark:bg-card/90 ${selectedLayout === layout.key ? "border-primary ring-2 ring-primary/30" : "border-muted"} ${!isAllowed(currentPlan, layout.plan) ? "opacity-70" : ""}`}
                >
                  {layout.previewImage && (
                    <img src={layout.previewImage} alt={layout.name + ' preview'} className="w-full h-32 object-cover rounded mb-2 border" />
                  )}
                  <div className="flex items-center gap-3 mb-2">
                    {ICONS[layout.key] || <Info className="w-7 h-7 text-gray-300" />}
                    <span className="font-bold text-lg flex-1">{layout.name}</span>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className={`ml-2 px-2 py-1 rounded text-xs font-semibold border ${PLAN_COLORS[layout.plan]}`}>{PLAN_LABELS[layout.plan]}</span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {isAllowed(currentPlan, layout.plan) ? `Disponível no plano ${PLAN_LABELS[layout.plan]}` : `Requer plano ${PLAN_LABELS[layout.plan]}`}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-4 h-4 ${i < layout.popularity ? 'text-yellow-400' : 'text-gray-300'}`} fill={i < layout.popularity ? '#facc15' : 'none'} />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm mb-1">{layout.description}</span>
                  <ul className="list-none ml-0 text-xs text-muted-foreground mb-2 space-y-1">
                    {layout.features.map(f => {
                      const isPremiumExclusive = layout.plan === 'premium' && (
                        f.includes('Banner personalizável') ||
                        f.includes('Stories') ||
                        f.includes('Portfólio visual avançado (até 12 itens)') ||
                        f.includes('Serviços (até 12)') ||
                        f.includes('FAQ (até 10 perguntas)') ||
                        f.includes('Destaque de depoimentos') ||
                        f.includes('Reviews e avaliações integradas') ||
                        f.includes('Animações exclusivas')
                      );
                      const isStandardExclusive = layout.plan === 'standard' && (
                        f.includes('Abas e navegação rápida') ||
                        f.includes('Seções detalhadas') ||
                        f.includes('Portfólio visual avançado (até 8 itens)') ||
                        f.includes('Serviços (até 5)') ||
                        f.includes('Integração com agenda')
                      );
                      return (
                        <li key={f} className="flex items-center gap-2">
                          {isPremiumExclusive
                            ? <Crown className="w-4 h-4 text-yellow-500" />
                            : isStandardExclusive
                              ? <Award className="w-4 h-4 text-blue-500" />
                              : <CheckCircle2 className="w-4 h-4 text-green-500" />
                          }
                          {f}
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="list-disc ml-6 text-xs text-muted-foreground mb-2">
                    {layout.benefits.map(b => <li key={b}>{b}</li>)}
                  </ul>
                  <div className="mt-auto flex gap-2">
                    {isAllowed(currentPlan, layout.plan) ? (
                      <Button
                        variant={selectedLayout === layout.key ? "default" : "outline"}
                        onClick={() => onSelect(layout.key)}
                        disabled={selectedLayout === layout.key}
                        className="w-full"
                      >
                        {selectedLayout === layout.key ? "Selecionado" : "Selecionar"}
                      </Button>
                    ) : (
                      <Button variant="secondary" onClick={onUpgrade} className="w-full">
                        Fazer upgrade para acessar
                      </Button>
                    )}
                  </div>
                  {!isAllowed(currentPlan, layout.plan) && (
                    <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-10 rounded-lg">
                      <span className="text-sm font-medium text-gray-600 mb-2">Requer upgrade</span>
                    </div>
                  )}
                </Card>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </TooltipProvider>
  );
} 