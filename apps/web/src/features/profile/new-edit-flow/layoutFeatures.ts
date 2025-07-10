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

export const PLAN_LIMITS = {
  free: {
    tags: 3,
    services: 4,
    experiences: 4,
    portfolio: 4,
    faq: 0,
    youtube: 0,
    stories: 0,
    banner: 0,
  },
  standard: {
    tags: 6,
    services: 8,
    experiences: 8,
    portfolio: 8,
    faq: 5,
    youtube: 1,
    stories: 0,
    banner: 0,
  },
  premium: {
    tags: 12,
    services: 12,
    experiences: 12,
    portfolio: 12,
    faq: 10,
    youtube: 1,
    stories: 4,
    banner: 1,
  }
};

// Com mais metadata para conversão
export const LAYOUTS: LayoutConfig[] = [
  {
    key: "modern",
    name: "Básico",
    description: "Layout moderno e visualmente atrativo, ideal para perfis gratuitos.",
    benefits: ["Seções essenciais de serviços, portfólio, habilidades, experiência e formação"],
    plan: PlanType.FREE,
    category: LayoutCategory.CREATIVE,
    popularity: 3,
    features: [
      "Visual moderno",
      "Seções essenciais",
      "Links para redes sociais (até 3)",
      "Botão para contato via WhatsApp",
      "Portfólio visual (até 4 itens)",
      "Serviços (até 4)",
      "Tags em destaque (até 3)",
      "Experiência profissional (até 4)",
      "Formação (até 4)",
      "QR Code para compartilhar perfil"
    ],
    component: dynamic(() => import("@/components/profile-layouts/FreeProfileLayout")),
    preloadPriority: 'low',
    previewImage: undefined,
  },
  {
    key: "advanced",
    name: "Padrão",
    description: "Layout avançado com múltiplas seções detalhadas, ideal para perfis profissionais.",
    benefits: ["Seções detalhadas de serviços, portfólio, tags, experiência e formação"],
    plan: PlanType.STANDARD,
    category: LayoutCategory.BUSINESS,
    popularity: 4,
    features: [
      "Abas e navegação rápida",
      "Seções detalhadas",
      "Vídeo do YouTube integrado",
      "Chat integrado",
      "Portfólio visual avançado (até 8 itens)",
      "Serviços (até 5)",
      "Tags em destaque (até 6)",
      "FAQ (até 5 perguntas)",
      "Experiência profissional (até 8)",
      "Links para redes sociais (até 6)",
      "Botão para contato via WhatsApp",
      "QR Code para compartilhar perfil"
    ],
    component: dynamic(() => import("@/components/profile-layouts/StandardProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
  {
    key: "premium",
    name: "Premium",
    description: "Visual sofisticado, animações suaves e destaque para conquistas e diferenciais.",
    benefits: [
      "Animações exclusivas para destacar seu perfil",
      "Destaque visual para conquistas e diferenciais",
      "Design premium e sofisticado",
      "Acesso a recursos avançados de engajamento",
      "Limite ampliado para portfólio e serviços",
      "Prioridade no suporte e novidades"
    ],
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
      "Botão para contato via WhatsApp",
      "Portfólio visual avançado (até 12 itens)",
      "Serviços (até 12)",
      "FAQ (até 10 perguntas)",
      "Experiência profissional (até 12)",
      "Tags em destaque (até 12)",
      "Links para redes sociais (até 12)",
      "Destaque de depoimentos",
      "Reviews e avaliações integradas",
      "QR Code para compartilhar perfil"
    ],
    component: dynamic(() => import("@/components/profile-layouts/PremiumProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
]; 