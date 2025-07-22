export type AdvancedProfileLayoutConfig = {
  showPortfolio?: boolean;
  showSkills?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  themeColor?: string;
};

export const defaultAdvancedProfileLayoutConfig: AdvancedProfileLayoutConfig = {
  showPortfolio: true,
  showSkills: true,
  showExperience: true,
  showEducation: true,
  themeColor: '#2563eb'
};

export const premiumProfileLayoutConfig = {
  id: 'premium',
  name: 'Premium Profile',
  description: 'Layout exclusivo para o plano Premium',
  imageUrl: 'https://picsum.photos/seed/layout-premium/300/200',
  plan: 'premium',
  ...defaultAdvancedProfileLayoutConfig
};
