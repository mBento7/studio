export type BasicProfileLayoutConfig = {
  showPortfolio?: boolean;
  showSkills?: boolean;
  themeColor?: string;
};

export const defaultBasicProfileLayoutConfig: BasicProfileLayoutConfig = {
  showPortfolio: false,
  showSkills: true,
  themeColor: '#64748b',
}; 