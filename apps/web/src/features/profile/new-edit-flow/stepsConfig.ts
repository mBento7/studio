import { User, Briefcase, Award, Camera, Layout, FolderOpen, Sparkles } from "lucide-react";
import { ProfileBasicTabV2 } from "./ProfileBasicTabV2";
import { MinimalistBlockV2 } from "./blocks/MinimalistBlockV2";
import { LayoutSelectBlockV2 } from "./LayoutSelectBlockV2";
import { ServicesBlockV2 } from "./blocks/ServicesBlockV2";
import { PortfolioBlockV2 } from "./blocks/PortfolioBlockV2";
import { SkillsBlockV2 } from "./blocks/SkillsBlockV2";
import React from "react";
import type { UserProfileV2 } from "./types";
import type { Dispatch } from "react";
import { ProfileContentTabV2 } from "./ProfileContentTabV2";
import { ProfileAppearanceTabV2 } from "./ProfileAppearanceTabV2";

export const RAW_STEPS = [
  { key: 'basic', label: 'Básico', icon: User, component: ProfileBasicTabV2, requiredPlan: 'free' },
  { key: 'minimalist', label: 'Imagens', icon: Camera, component: MinimalistBlockV2, requiredPlan: 'free' },
  { key: 'layout', label: 'Layout', icon: Layout, component: LayoutSelectBlockV2, requiredPlan: 'free' },
  { key: 'services', label: 'Serviços', icon: Briefcase, component: ServicesBlockV2, requiredPlan: 'standard' },
  { key: 'conteudo', label: 'Conteúdo', icon: FolderOpen, component: ProfileContentTabV2, requiredPlan: 'standard' },
  {
    key: 'appearance',
    label: plan => plan !== 'premium' ? 'Aparência ' : 'Aparência',
    badge: plan => plan !== 'premium' ? 'Upgrade' : undefined,
    icon: Sparkles,
    component: ProfileAppearanceTabV2,
    requiredPlan: 'premium'
  },
];

export function buildSteps(
  profile: UserProfileV2,
  plan: string,
  userId: string | undefined,
  dispatch: Dispatch<{ type: "update"; payload: Partial<UserProfileV2> }>
) {
  return RAW_STEPS.map(s => {
    let componentProps: Record<string, any> = {};
    switch (s.key) {
      case 'basic':
        componentProps = {
          data: profile,
          onChange: (data: UserProfileV2) => dispatch({ type: 'update', payload: data })
        };
        break;
      case 'minimalist':
        componentProps = {
          profile_picture_url: profile.profile_picture_url,
          cover_photo_url: profile.cover_photo_url,
          email: profile.email,
          phone: profile.phone,
          onChange: (data: Partial<UserProfileV2>) => dispatch({ type: 'update', payload: data }),
          userId
        };
        break;
      case 'layout':
        componentProps = {
          currentPlan: plan,
          selectedLayout: profile.layout || 'minimalist',
          onSelect: (layoutKey: string) => {
            console.log('[DEBUG] Layout selecionado:', layoutKey);
            dispatch({ type: 'update', payload: { layout: layoutKey, layoutTemplateId: layoutKey } });
            setTimeout(() => {
              console.log('[DEBUG] Novo estado do perfil após seleção:', JSON.stringify(profile));
            }, 100);
          },
          onUpgrade: () => alert('Faça upgrade para acessar este layout!')
        };
        break;
      case 'services':
        componentProps = {
          services: profile.services || [],
          onChange: (services: any[]) => dispatch({ type: 'update', payload: { services } })
        };
        break;
      case 'portfolio':
        componentProps = {
          portfolio: profile.portfolio || [],
          onChange: (portfolio: any[]) => dispatch({ type: 'update', payload: { portfolio } })
        };
        break;
      case 'skills':
        componentProps = {
          skills: profile.skills || [],
          onChange: (skills: string[]) => dispatch({ type: 'update', payload: { skills } })
        };
        break;
      case 'conteudo':
        componentProps = {
          data: profile,
          plan,
          layout: profile.layout,
          onChange: (data: any) => dispatch({ type: 'update', payload: data })
        };
        break;
      case 'appearance':
        componentProps = {
          data: profile,
          plan,
          layout: profile.layout,
          onChange: (data: any) => dispatch({ type: 'update', payload: data }),
          premiumLayouts: plan === 'premium' ? ['pro', 'advanced'] : []
        };
        break;
      default:
        break;
    }
    return {
      ...s,
      allowed: plan === 'premium' || s.requiredPlan === 'free' || (plan === 'standard' && s.requiredPlan !== 'premium'),
      component: React.createElement(s.component, componentProps)
    };
  });
}

export const stepIcons = RAW_STEPS.reduce((acc, s) => ({ ...acc, [s.key]: s.icon }), {});
export const stepLabels = RAW_STEPS.reduce((acc, s) => ({ ...acc, [s.key]: s.label }), {}); 