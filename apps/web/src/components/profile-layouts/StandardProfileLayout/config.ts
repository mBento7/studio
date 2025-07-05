export type StandardProfileLayoutConfig = {
  showPortfolio?: boolean;
  showSkills?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  themeColor?: string;
};

export const defaultStandardProfileLayoutConfig: StandardProfileLayoutConfig = {
  showPortfolio: true,
  showSkills: true,
  showExperience: true,
  showEducation: true,
  themeColor: '#2563eb',
}; 