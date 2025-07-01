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
    key: "basic",
    name: "Básico",
    description: "Layout padrão, sempre disponível. Ideal para perfis simples ou em construção.",
    benefits: ["Simples e funcional", "Rápido para editar"],
    plan: PlanType.DEFAULT,
    category: LayoutCategory.BASIC,
    popularity: 2,
    features: ["Disponível para todos", "Visual clássico"],
    component: dynamic(() => import("@/components/profile-layouts/BasicProfileLayout")),
    preloadPriority: 'low',
    previewImage: undefined,
  },
  {
    key: "minimalist",
    name: "Minimalista",
    description: "Perfil direto ao ponto, com visual limpo e foco nas informações essenciais.",
    benefits: ["Foco em informações essenciais", "Visual limpo", "Ótimo para mobile"],
    plan: PlanType.FREE,
    category: LayoutCategory.BASIC,
    popularity: 4,
    features: ["Responsivo", "SEO otimizado"],
    preloadPriority: 'high',
    component: dynamic(() => import("@/components/profile-layouts/MinimalistCardLayout")),
    previewImage: undefined,
  },
  {
    key: "modern",
    name: "Moderno",
    description: "Layout atual, com destaques visuais e personalização de cores.",
    benefits: ["Destaque para portfólio", "Seções customizáveis", "Personalização de cores"],
    plan: PlanType.STANDARD,
    category: LayoutCategory.CREATIVE,
    popularity: 5,
    features: ["Portfólio em destaque", "Personalização de cores"],
    component: dynamic(() => import("@/components/profile-layouts/ModernProfileLayout")),
    preloadPriority: 'low',
    previewImage: undefined,
  },
  {
    key: "portfolio",
    name: "Portfólio",
    description: "Ideal para mostrar trabalhos e projetos em uma galeria visual.",
    benefits: ["Galeria de imagens", "Links externos para projetos", "Destaque para criatividade"],
    plan: PlanType.STANDARD,
    category: LayoutCategory.CREATIVE,
    popularity: 4,
    features: ["Galeria de imagens", "Links para projetos"],
    component: dynamic(() => import("@/components/profile-layouts/PortfolioFocusLayout")),
    preloadPriority: 'low',
    previewImage: undefined,
  },
  {
    key: "pro",
    name: "Pro",
    description: "Recursos avançados para profissionais que querem se destacar.",
    benefits: ["Depoimentos de clientes", "Certificados", "Personalização avançada"],
    plan: PlanType.PREMIUM,
    category: LayoutCategory.BUSINESS,
    popularity: 5,
    features: ["Depoimentos", "Certificados", "Personalização avançada"],
    component: dynamic(() => import("@/components/profile-layouts/ProProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
  {
    key: "advanced",
    name: "Avançado",
    description: "Layout premium com blocos customizáveis e máxima flexibilidade.",
    benefits: ["Blocos avançados", "Total personalização", "Flexibilidade máxima"],
    plan: PlanType.PREMIUM,
    category: LayoutCategory.BUSINESS,
    popularity: 4,
    features: ["Blocos customizáveis", "Personalização total"],
    component: dynamic(() => import("@/components/profile-layouts/AdvancedProfileLayout")),
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
    features: ["Animações", "Destaque para conquistas", "Visual sofisticado"],
    component: dynamic(() => import("@/components/profile-layouts/PremiumPlusProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
  {
    key: "super-premium",
    name: "Super Premium",
    description: "Experiência exclusiva, efeitos visuais avançados e máxima personalização para quem busca o topo.",
    benefits: ["Efeitos visuais avançados", "Personalização máxima", "Experiência exclusiva"],
    plan: PlanType.PREMIUM,
    category: LayoutCategory.BUSINESS,
    popularity: 5,
    features: ["Efeitos visuais", "Personalização máxima", "Exclusividade"],
    component: dynamic(() => import("@/components/profile-layouts/SuperPremiumProfileLayout")),
    preloadPriority: 'high',
    previewImage: undefined,
  },
]; 