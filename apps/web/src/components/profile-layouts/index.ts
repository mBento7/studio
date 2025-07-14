// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import FreeProfileLayout from './FreeProfileLayout';
import { defaultFreeProfileLayoutConfig } from './FreeProfileLayout/config';
import PremiumProfileLayout from './PremiumProfileLayout';
import { premiumProfileLayoutConfig } from './PremiumProfileLayout/config';
import StandardProfileLayout from './StandardProfileLayout';
import { defaultStandardProfileLayoutConfig } from './StandardProfileLayout/config';
// Layouts removidos: EnhancedProfileLayout e SuperPremiumProfileLayout
// Importa os componentes de card de resultado de busca
import SearchResultCardFree from './FreeProfileLayout/SearchResultCardFree';
import StandardSearchResultCard from './StandardProfileLayout/SearchResultCard';
import SearchResultCardPremium from './PremiumProfileLayout/SearchResultCardPremium';

interface BaseProfileLayout {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  plan: string;
  Component: React.FC<any>; // Ou o tipo correto para o componente de layout
  SearchResultComponent?: React.FC<any>; // Adicione esta linha
  showPortfolio?: boolean;
  showSocialLinks?: boolean;
  themeColor?: string;
}

export const profileLayouts: BaseProfileLayout[] = [
  { ...defaultFreeProfileLayoutConfig, id: 'free', name: 'Perfil Gratuito', description: 'Layout para usuários gratuitos.', imageUrl: '', plan: 'free', Component: FreeProfileLayout, SearchResultComponent: SearchResultCardFree },
  { ...defaultStandardProfileLayoutConfig, id: 'standard', name: 'Perfil Standard', description: 'Layout para usuários standard.', imageUrl: '', plan: 'standard', Component: StandardProfileLayout, SearchResultComponent: StandardSearchResultCard },
  // Registro do layout super premium
  // {
  //   id: 'super-premium',
  //   name: 'Super Premium',
  //   description: 'Layout exclusivo para o plano Super Premium',
  //   ...superPremiumConfig,
  //   Component: SuperPremiumProfileLayout,
  //   SearchResultComponent: SuperPremiumSearchResultCard,
  // },
  { ...premiumProfileLayoutConfig, Component: PremiumProfileLayout, SearchResultComponent: SearchResultCardPremium },
  // { ...enhancedConfig, Component: EnhancedProfileLayout, SearchResultComponent: undefined },
];

export {
  FreeProfileLayout,
  PremiumProfileLayout,
  StandardProfileLayout,
  // EnhancedProfileLayout,
};

export type ProfileLayout = BaseProfileLayout; // Altere para usar a nova interface