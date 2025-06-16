import type { UserProfile } from './types';

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'joaosilva',
    name: 'João Silva',
    bio: 'Desenvolvedor Full Stack | React | Node.js',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joaosilva',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-joao/1200/300',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/joaosilva' },
      { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/joaosilva' }
    ],
    location: {
      city: 'São Paulo',
      country: 'BR',
    },
    services: [],
    portfolio: [],
    skills: ['React', 'Node.js', 'TypeScript'],
    experience: [],
    education: [],
    category: '',
  },
  {
    id: '2',
    username: 'mariasouza',
    name: 'Maria Souza',
    bio: 'Designer UX/UI | Figma | Adobe XD',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariasouza',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-maria/1200/300',
    socialLinks: [
      { id: '1', platform: 'behance', url: 'https://behance.net/mariasouza' },
      { id: '2', platform: 'dribbble', url: 'https://dribbble.com/mariasouza' }
    ],
    location: {
      city: 'Rio de Janeiro',
      country: 'BR',
    },
    services: [],
    portfolio: [],
    skills: ['Figma', 'Adobe XD', 'UI Design'],
    experience: [],
    education: [],
    category: '',
  },
  {
    id: '3',
    username: 'pedrosantos',
    name: 'Pedro Santos',
    bio: 'Desenvolvedor Mobile | React Native | Flutter',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedrosantos',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-pedro/1200/300',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/pedrosantos' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/pedrosantos' }
    ],
    location: {
      city: 'Belo Horizonte',
      country: 'BR',
    },
    services: [],
    portfolio: [],
    skills: ['React Native', 'Flutter', 'Mobile Development'],
    experience: [],
    education: [],
    category: '',
  }
];

export const mockCurrentUser = mockUserProfiles[0];

export function updateMockCurrentUser(data: any) {
  // Simulação de atualização do usuário mock
  console.log('Mock update user:', data);
}

export function updateMockUserLayout(username: string, layoutTemplateId: string) {
  // Simulação de atualização do layout do usuário mock
  console.log(`Mock update layout for user ${username} to layout ${layoutTemplateId}`);
} 