export type LayoutKey =
  | 'MinimalistCardLayout'
  | 'FreeProfileLayout'
  | 'StandardProfileLayout';

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
  FreeProfileLayout: {
    servicos: true,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true
  },
  StandardProfileLayout: {
    servicos: true,
    portfolio: true,
    experiencia: true,
    habilidades: true,
    depoimentos: true
  }
};
