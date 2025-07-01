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