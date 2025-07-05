// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import FreeProfileLayout, { segmentConfig as freeConfig } from './FreeProfileLayout';
import StandardProfileLayout, { segmentConfig as standardConfig } from './StandardProfileLayout';
// Importa o layout super premium
// import SuperPremiumProfileLayout from './SuperPremiumProfileLayout';
// import SuperPremiumSearchResultCard from './SuperPremiumProfileLayout/SearchResultCard';
// import { defaultAdvancedProfileLayoutConfig as superPremiumConfig } from './SuperPremiumProfileLayout/config';
// Importa os componentes de card de resultado de busca
import FreeSearchResultCard from './FreeProfileLayout/SearchResultCard';
import StandardSearchResultCard from './StandardProfileLayout/SearchResultCard';
import PremiumProfileLayout from './PremiumProfileLayout';
import PremiumProfileSearchResultCard from './PremiumProfileLayout/SearchResultCard';
import { premiumProfileLayoutConfig } from './PremiumProfileLayout/config';

export const profileLayouts = [
  {
    ...freeConfig,
    Component: FreeProfileLayout,
    SearchResultComponent: FreeSearchResultCard,
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
    id: 'premiumplus',
    name: 'Premium Plus',
    description: 'Layout exclusivo para o plano Premium Plus',
    ...premiumProfileLayoutConfig,
    Component: PremiumProfileLayout,
    SearchResultComponent: PremiumProfileSearchResultCard,
  },
];

export type ProfileLayout = typeof profileLayouts[number]; 