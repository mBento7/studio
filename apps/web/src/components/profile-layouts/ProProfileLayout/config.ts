export type ProProfileLayoutConfig = {
  showPortfolio?: boolean;
  showSkills?: boolean;
  showExperience?: boolean;
  showEducation?: boolean;
  themeColor?: string;
};

export const defaultProProfileLayoutConfig: ProProfileLayoutConfig = {
  showPortfolio: true,
  showSkills: true,
  showExperience: true,
  showEducation: true,
  themeColor: '#a21caf',
}; 