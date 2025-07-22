// Mock data for development and testing purposes

export interface MockUser {
  id: string;
  username: string;
  full_name: string;
  email: string;
  profile_picture_url?: string;
  cover_photo_url?: string;
  bio?: string;
  skills?: string[];
  category?: string;
  location?: string;
  phone?: string;
  website?: string;
  social_links?: any;
  layout?: string;
  theme?: string;
}

export const mockCurrentUser: MockUser = {
  id: '1',
  username: 'currentuser',
  full_name: 'Current User',
  email: 'current@example.com',
  bio: 'This is the current user profile',
  skills: ['React', 'TypeScript', 'Next.js'],
  category: 'Developer',
  location: 'São Paulo, SP'
};

export const mockUserProfiles: MockUser[] = [
  {
    id: '1',
    username: 'defaultprofile',
    full_name: 'João Silva',
    email: 'joao@example.com',
    bio: 'Desenvolvedor Full Stack especializado em React e Node.js',
    skills: ['React', 'Node.js', 'TypeScript'],
    category: 'Developer',
    location: 'São Paulo, SP'
  },
  {
    id: '2',
    username: 'commercialweb',
    full_name: 'Maria Santos',
    email: 'maria@example.com',
    bio: 'Designer UX/UI com foco em experiência do usuário',
    skills: ['Figma', 'Adobe XD', 'Prototyping'],
    category: 'Designer',
    location: 'Rio de Janeiro, RJ'
  },
  {
    id: '3',
    username: 'minimalistcard',
    full_name: 'Pedro Costa',
    email: 'pedro@example.com',
    bio: 'Consultor de marketing digital e estratégias online',
    skills: ['SEO', 'Google Ads', 'Analytics'],
    category: 'Marketing',
    location: 'Belo Horizonte, MG'
  }
];

export function getMockUserByUsername(username: string): MockUser | undefined {
  return mockUserProfiles.find(user => user.username === username);
}

export function updateUserProfileInMockData(userId: string, updates: Partial<MockUser>): MockUser | null {
  const userIndex = mockUserProfiles.findIndex(user => user.id === userId);
  if (userIndex !== -1) {
    mockUserProfiles[userIndex] = { ...mockUserProfiles[userIndex], ...updates };
    return mockUserProfiles[userIndex];
  }
  return null;
}

export function updateMockCurrentUser(updates: Partial<MockUser>): MockUser {
  Object.assign(mockCurrentUser, updates);
  return mockCurrentUser;
}
