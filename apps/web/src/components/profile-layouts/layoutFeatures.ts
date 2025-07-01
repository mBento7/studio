export type LayoutKey =
  | 'MinimalistCardLayout'
  | 'ModernProfileLayout'
  | 'PortfolioFocusLayout'
  | 'ProProfileLayout'
  | 'AdvancedProfileLayout'
  | 'BasicProfileLayout';

export type FeatureKey =
  | 'servicos'
  | 'portfolio'
  | 'experiencia'
  | 'habilidades'
  | 'depoimentos';

export type LayoutFeaturesMap = {
  [key in LayoutKey]: {
    [feature in FeatureKey]: boolean;
  };
};

export const layoutFeatures: LayoutFeaturesMap = {
  MinimalistCardLayout: {
    servicos: false,
    portfolio: false,
    experiencia: false,
    habilidades: true,
    depoimentos: false,
  },
  ModernProfileLayout: {
    servicos: true,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true,
  },
  PortfolioFocusLayout: {
    servicos: false,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true,
  },
  ProProfileLayout: {
    servicos: true,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true,
  },
  AdvancedProfileLayout: {
    servicos: true,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true,
  },
  BasicProfileLayout: {
    servicos: true,
    portfolio: false,
    experiencia: true,
    habilidades: true,
    depoimentos: false,
  },
}; 