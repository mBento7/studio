// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import MinimalistCardLayout, { segmentConfig as minimalistConfig } from './MinimalistCardLayout';
import BasicProfileLayout, { segmentConfig as basicConfig } from './BasicProfileLayout';
import ModernProfileLayout, { segmentConfig as modernConfig } from './ModernProfileLayout';
import PortfolioFocusLayout, { segmentConfig as portfolioConfig } from './PortfolioFocusLayout';
import ProProfileLayout, { segmentConfig as proProfileConfig } from './ProProfileLayout';
import AdvancedProfileLayout, { segmentConfig as advancedConfig } from './AdvancedProfileLayout';
// Importa o layout super premium
import SuperPremiumProfileLayout from './SuperPremiumProfileLayout';
import SuperPremiumSearchResultCard from './SuperPremiumProfileLayout/SearchResultCard';
import { defaultAdvancedProfileLayoutConfig as superPremiumConfig } from './SuperPremiumProfileLayout/config';
// Importa os componentes de card de resultado de busca
import MinimalistSearchResultCard from './MinimalistCardLayout/SearchResultCard';
import BasicSearchResultCard from './BasicProfileLayout/SearchResultCard';
import ModernSearchResultCard from './ModernProfileLayout/SearchResultCard';
import PortfolioFocusSearchResultCard from './PortfolioFocusLayout/SearchResultCard';
import ProProfileSearchResultCard from './ProProfileLayout/SearchResultCard';
import AdvancedSearchResultCard from './AdvancedProfileLayout/SearchResultCard';
import PremiumPlusProfileLayout from './PremiumPlusProfileLayout';
import PremiumPlusSearchResultCard from './PremiumPlusProfileLayout/SearchResultCard';
import { defaultAdvancedProfileLayoutConfig as premiumplusConfig } from './PremiumPlusProfileLayout/config';

export const profileLayouts = [
  {
    ...minimalistConfig,
    Component: MinimalistCardLayout,
    SearchResultComponent: MinimalistSearchResultCard,
  },
  {
    ...basicConfig,
    Component: BasicProfileLayout,
    SearchResultComponent: BasicSearchResultCard,
  },
  {
    ...modernConfig,
    Component: ModernProfileLayout,
    SearchResultComponent: ModernSearchResultCard,
  },
  {
    ...portfolioConfig,
    Component: PortfolioFocusLayout,
    SearchResultComponent: PortfolioFocusSearchResultCard,
  },
  {
    ...proProfileConfig,
    Component: ProProfileLayout,
    SearchResultComponent: ProProfileSearchResultCard,
  },
  {
    ...advancedConfig,
    Component: AdvancedProfileLayout,
    SearchResultComponent: AdvancedSearchResultCard,
  },
  // Registro do layout super premium
  {
    id: 'super-premium',
    name: 'Super Premium',
    description: 'Layout exclusivo para o plano Super Premium',
    ...superPremiumConfig,
    Component: SuperPremiumProfileLayout,
    SearchResultComponent: SuperPremiumSearchResultCard,
  },
  {
    id: 'premiumplus',
    name: 'Premium Plus',
    description: 'Layout exclusivo para o plano Premium Plus',
    ...premiumplusConfig,
    Component: PremiumPlusProfileLayout,
    SearchResultComponent: PremiumPlusSearchResultCard,
  },
];

export type ProfileLayout = typeof profileLayouts[number]; 