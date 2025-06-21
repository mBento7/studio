// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import MinimalistCardLayout, { config as minimalistConfig } from './MinimalistCardLayout';
import BasicProfileLayout, { config as basicConfig } from './BasicProfileLayout';
import ModernProfileLayout, { config as modernConfig } from './ModernProfileLayout';
import PortfolioFocusLayout, { config as portfolioConfig } from './PortfolioFocusLayout';
import PremiumProLayout, { config as premiumProConfig } from './PremiumProLayout';
import AdvancedProfileLayout, { config as advancedConfig } from './AdvancedProfileLayout';

// Importa os componentes de card de resultado de busca
import MinimalistSearchResultCard from './MinimalistCardLayout/SearchResultCard';
import BasicSearchResultCard from './BasicProfileLayout/SearchResultCard';
import ModernSearchResultCard from './ModernProfileLayout/SearchResultCard';
import PortfolioFocusSearchResultCard from './PortfolioFocusLayout/SearchResultCard';
import PremiumProSearchResultCard from './PremiumProLayout/SearchResultCard';
import AdvancedSearchResultCard from './AdvancedProfileLayout/SearchResultCard';

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
    ...premiumProConfig,
    Component: PremiumProLayout,
    SearchResultComponent: PremiumProSearchResultCard,
  },
  {
    ...advancedConfig,
    Component: AdvancedProfileLayout,
    SearchResultComponent: AdvancedSearchResultCard,
  },
];

export type ProfileLayout = typeof profileLayouts[number]; 