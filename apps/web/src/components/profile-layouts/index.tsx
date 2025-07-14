// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import FreeProfileLayout, { segmentConfig as freeConfig } from './FreeProfileLayout';
import StandardProfileLayout, { segmentConfig as standardConfig } from './StandardProfileLayout';
// Layouts removidos: SuperPremiumProfileLayout
// Importa os componentes de card de resultado de busca
import SearchResultCardFree from './FreeProfileLayout/SearchResultCardFree';
import StandardSearchResultCard from './StandardProfileLayout/SearchResultCard';
import PremiumProfileLayout from './PremiumProfileLayout';
import SearchResultCardPremium from './PremiumProfileLayout/SearchResultCardPremium';
import { premiumProfileLayoutConfig } from './PremiumProfileLayout/config';
import React, { useState } from 'react';
import { layoutFeatures, LayoutKey, FeatureKey } from './layoutFeatures';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '../ui/dialog';
import { Plus, Lock, Star } from 'lucide-react';

const featureLabels: Record<FeatureKey, string> = {
  servicos: 'Serviços',
  portfolio: 'Portfólio',
  experiencia: 'Experiência',
  habilidades: 'Habilidades',
  depoimentos: 'Depoimentos',
  bannerPromocional: 'Banner Promocional',
  videoYoutube: 'Vídeo do YouTube',
};

const featureDescriptions: Record<FeatureKey, string> = {
  servicos: 'Adicione serviços oferecidos.',
  portfolio: 'Mostre seus melhores trabalhos.',
  experiencia: 'Compartilhe sua experiência profissional.',
  habilidades: 'Liste suas principais habilidades.',
  bannerPromocional: 'Destaque promoções especiais.',
  videoYoutube: 'Incorpore vídeos do YouTube.',
};

export function LayoutBenefitsModal({
  open,
  onOpenChange,
  layoutKey,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  layoutKey: LayoutKey;
}) {
  const features = layoutFeatures[layoutKey];
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-full">
        <DialogHeader>
          <DialogTitle>Benefícios do Layout</DialogTitle>
          <DialogDescription>
            Veja o que você pode adicionar neste layout:
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {Object.entries(features).map(([key, value]) => {
            if (!value || (typeof value === 'object' && !value.enabled)) return null;
            const v = typeof value === 'object' ? value : { enabled: !!value };
            return (
              <div key={key} className="rounded-lg border bg-muted/40 p-4 flex flex-col gap-2 items-start">
                <div className="font-semibold flex items-center gap-2">
                  {featureLabels[key as FeatureKey]}
                  {v.premiumOnly && <Star className="w-4 h-4 text-yellow-500" title="Exclusivo Premium" />}
                </div>
                <div className="text-xs text-muted-foreground mb-2">{featureDescriptions[key as FeatureKey]}</div>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-xs text-primary font-bold">Limite: {v.limit ?? '∞'}</span>
                  {v.premiumOnly ? (
                    <Button size="sm" variant="outline" className="ml-2" disabled>
                      <Lock className="w-4 h-4 mr-1" /> Premium
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="ml-2">
                      <Plus className="w-4 h-4 mr-1" /> Adicionar
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <DialogClose asChild>
          <Button variant="outline" className="mt-6 w-full">Fechar</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export const profileLayouts = [
  {
    ...freeConfig,
    Component: FreeProfileLayout,
    SearchResultComponent: SearchResultCardFree,
  },
  {
    ...standardConfig,
    Component: StandardProfileLayout,
    SearchResultComponent: StandardSearchResultCard,
  },
  // Registro do layout super premium
  // {
  //   id: 'super-premium',
  //   name: 'Super Premium',
  //   description: 'Layout exclusivo para o plano Super Premium',
  //   ...superPremiumConfig,
  //   Component: SuperPremiumProfileLayout,
  //   SearchResultComponent: SuperPremiumSearchResultCard,
  // },
  {
    ...premiumProfileLayoutConfig,
    Component: PremiumProfileLayout,
    SearchResultComponent: SearchResultCardPremium,
  },
  // Novo layout aprimorado
  // {
  //   ...enhancedConfig,
  //   Component: EnhancedProfileLayout,
  //   SearchResultComponent: FreeSearchResultCard, // Pode ser customizado depois
  // },
];

export type ProfileLayout = typeof profileLayouts[number];