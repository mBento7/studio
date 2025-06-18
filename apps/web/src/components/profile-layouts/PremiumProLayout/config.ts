export type PremiumProLayoutConfig = {
  showPortfolio?: boolean;
  showSkills?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  themeColor?: string;
};

export const defaultPremiumProLayoutConfig: PremiumProLayoutConfig = {
  showPortfolio: true,
  showSkills: true,
  showExperience: true,
  showEducation: true,
  themeColor: '#a21caf',
}; 