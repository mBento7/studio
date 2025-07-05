import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// 🚀 Versão melhorada sugerida
export enum PlanType {
  DEFAULT = "default",
  FREE = "free",
  STANDARD = "standard",
  PREMIUM = "premium"
}

export enum LayoutCategory {
  BASIC = "basic",
  CREATIVE = "creative",
  BUSINESS = "business"
}

export interface LayoutConfig {
  key: string;
  name: string;
  description: string;
  benefits: string[];
  plan: PlanType;
  category: LayoutCategory;
  popularity: number; // 1-5
  previewImage?: string;
  features: string[];
  component: ComponentType<any>;
  preloadPriority?: 'high' | 'low';
}

// Com mais metadata para conversão
export const LAYOUTS: LayoutConfig[] = [
  {
    key: "modern",
    name: "Moderno",
    description: "Layout moderno e visualmente atrativo, ideal para perfis gratuitos.",
    benefits: ["Seções essenciais de serviços, portfólio, habilidades, experiência e formação"],
    plan: PlanType.FREE,
    category: LayoutCategory.CREATIVE,
    popularity: 5,
    features: [
      "Visual moderno",
      "Seções essenciais",
      "Links para redes sociais",
      "Integração com WhatsApp",
      "Portfólio visual (até 4 itens)",
      "Serviços (até 2)",
      "Experiência profissional",
      "Habilidades em destaque"
    ],
    component: dynamic(() => import("@/components/profile-layouts/FreeProfileLayout")),
    preloadPriority: 'low',
    previewImage: undefined,
  },
  {
    key: "advanced",
    name: "Avançado",
    description: "Layout avançado com múltiplas seções detalhadas, ideal para perfis profissionais.",
    benefits: ["Seções detalhadas de serviços, portfólio, habilidades, experiência e formação"],
    plan: PlanType.STANDARD,
    category: LayoutCategory.BUSINESS,
    popularity: 4,
    features: [
      "Abas e navegação rápida",
      "Seções detalhadas",
      "Vídeo do YouTube integrado",
      "Chat integrado",
      "Depoimentos de clientes",
      "Integração com WhatsApp",
      "Portfólio visual avançado (até 8 itens)",
      "Serviços (até 5)",
      "Experiência profissional",
      "Habilidades em destaque",
      "Integração com agenda",
      "Links para redes sociais"
    ],
    component: dynamic(() => import("@/components/profile-layouts/StandardProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
  {
    key: "premium-plus",
    name: "Premium Plus",
    description: "Visual sofisticado, animações suaves e destaque para conquistas e diferenciais.",
    benefits: ["Animações exclusivas", "Destaque para conquistas", "Visual premium"],
    plan: PlanType.PREMIUM,
    category: LayoutCategory.BUSINESS,
    popularity: 5,
    features: [
      "Animações exclusivas",
      "Destaque para conquistas",
      "Visual sofisticado",
      "Banner personalizável",
      "Stories (destaques rápidos)",
      "Vídeo do YouTube integrado",
      "Chat integrado",
      "Depoimentos de clientes",
      "Integração com WhatsApp",
      "Portfólio visual avançado (até 12 itens)",
      "Serviços (até 12)",
      "FAQ (até 10 perguntas)",
      "Experiência profissional",
      "Habilidades em destaque",
      "Integração com agenda",
      "Links para redes sociais",
      "Destaque de depoimentos",
      "Reviews e avaliações integradas"
    ],
    component: dynamic(() => import("@/components/profile-layouts/PremiumProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
]; 