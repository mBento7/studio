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
  themeColor: '#2563eb',
};

export const premiumProfileLayoutConfig = {
  id: 'premiumprofile',
  name: 'Premium Profile',
  description: 'Layout exclusivo para o plano Premium Plus',
  imageUrl: 'https://picsum.photos/seed/layout-premiumplus/300/200',
  plan: 'premium',
  ...defaultAdvancedProfileLayoutConfig,
}; 