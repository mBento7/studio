// Registro centralizado de layouts de perfil para escolha dinâmica e escalável

import MinimalistCardLayout, { config as minimalistConfig } from './MinimalistCardLayout';
import BasicProfileLayout, { config as basicConfig } from './BasicProfileLayout';
import ModernProfileLayout, { config as modernConfig } from './ModernProfileLayout';
import PortfolioFocusLayout, { config as portfolioConfig } from './PortfolioFocusLayout';
import PremiumProLayout, { config as premiumProConfig } from './PremiumProLayout';
import AdvancedProfileLayout, { config as advancedConfig } from './AdvancedProfileLayout';

export const profileLayouts = [
  {
    ...minimalistConfig,
    Component: MinimalistCardLayout,
  },
  {
    ...basicConfig,
    Component: BasicProfileLayout,
  },
  {
    ...modernConfig,
    Component: ModernProfileLayout,
  },
  {
    ...portfolioConfig,
    Component: PortfolioFocusLayout,
  },
  {
    ...premiumProConfig,
    Component: PremiumProLayout,
  },
  {
    ...advancedConfig,
    Component: AdvancedProfileLayout,
  },
];

export type ProfileLayout = typeof profileLayouts[number]; 