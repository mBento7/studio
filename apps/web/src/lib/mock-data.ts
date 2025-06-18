import type { UserProfile } from './types';

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'joaofree',
    name: 'João Free',
    email: 'joao.free@email.com',
    bio: 'Plano gratuito, template básico. Conteúdo limitado.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=joaofree',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-joaofree/1200/300',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/joaofree' }
    ],
    location: { city: 'São Paulo', country: 'BR' },
    services: [
      { id: 's1', name: 'Landing Page Simples', description: 'Criação de landing pages para pequenos negócios.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/portfree1/400/300', caption: 'Landing Page Loja X', description: 'Página de apresentação para loja local.' }
    ],
    skills: ['HTML', 'CSS'],
    experience: [
      { id: 'e1', title: 'Freelancer Web', company: 'Autônomo', years: '2023', description: 'Pequenos projetos de sites estáticos.' }
    ],
    education: [
      { id: 'ed1', degree: 'Ensino Médio Completo', institution: 'Escola Estadual', years: '2018 - 2020' }
    ],
    category: 'Desenvolvedor',
    layoutTemplateId: 'minimalist-card',
    plan: 'free',
    isAvailable: true,
    isProfileComplete: true,
  },
  {
    id: '2',
    username: 'mariastandard',
    name: 'Maria Standard',
    email: 'maria.standard@email.com',
    bio: 'Plano standard, template moderno. Foco em serviços e alguns projetos.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mariastandard',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-mariastandard/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/mariastandard' }
    ],
    location: { city: 'Rio de Janeiro', country: 'BR' },
    services: [
      { id: 's2', name: 'Consultoria de UX', description: 'Orientação para melhoria da experiência do usuário.' },
      { id: 's3', name: 'Design de Interfaces', description: 'Criação de interfaces intuitivas e atraentes.' },
    ],
    portfolio: [
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/proj2/400/300', caption: 'Redesign de E-commerce', description: 'Projeto completo de reestruturação visual e de usabilidade.' },
      { id: 'p3', imageUrl: 'https://picsum.photos/seed/proj3/400/300', caption: 'App de Produtividade', description: 'Desenvolvimento do fluxo de usuário e prototipagem.' },
    ],
    skills: ['UX Design', 'UI Design', 'Figma', 'Prototipagem'],
    experience: [
      { id: 'e2', title: 'Designer Júnior', company: 'Agência Criativa', years: '2022 - 2023', description: 'Atendimento a clientes e criação de wireframes.' }
    ],
    education: [
      { id: 'ed2', degree: 'Tecnólogo em Design Gráfico', institution: 'IFRJ', years: '2020 - 2022' }
    ],
    category: 'Designer',
    layoutTemplateId: 'modern',
    plan: 'standard',
    isAvailable: true,
  },
  {
    id: '3',
    username: 'pedropremium',
    name: 'Pedro Premium',
    email: 'pedro.premium@email.com',
    bio: 'Plano premium, template avançado. Perfil completo com vasta experiência e projetos.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pedropremium',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-pedropremium/1200/300',
    socialLinks: [
      { id: '1', platform: 'twitter', url: 'https://twitter.com/pedropremium' },
      { id: '2', platform: 'github', url: 'https://github.com/pedropremium' },
      { id: '3', platform: 'website', url: 'https://pedropremium.com' },
    ],
    location: { city: 'Belo Horizonte', country: 'BR', address: 'Av. Principal, 123' },
    services: [
      { id: 's4', name: 'Desenvolvimento Mobile (iOS/Android)', description: 'Criação de aplicativos nativos de alta performance.' },
      { id: 's5', name: 'Consultoria de Arquitetura', description: 'Definição de arquitetura escalável para projetos.' },
      { id: 's6', name: 'Workshops de React Native', description: 'Treinamentos personalizados para equipes de desenvolvimento.' },
    ],
    portfolio: [
      { id: 'p4', imageUrl: 'https://picsum.photos/seed/proj4/400/300', caption: 'Plataforma EAD Completa', description: 'Sistema educacional com funcionalidades de vídeo, quiz e acompanhamento.' },
      { id: 'p5', imageUrl: 'https://picsum.photos/seed/proj5/400/300', caption: 'App de Fintech', description: 'Aplicativo financeiro com integração bancária e segurança de ponta.' },
      { id: 'p6', imageUrl: 'https://picsum.photos/seed/proj6/400/300', caption: 'Game Mobile 3D', description: 'Desenvolvimento de jogo com gráficos avançados e jogabilidade imersiva.' },
    ],
    skills: ['React Native', 'Flutter', 'Node.js', 'AWS', 'CI/CD'],
    experience: [
      { id: 'e3', title: 'Engenheiro de Software Sênior', company: 'Tech Solutions', years: '2020 - Atualmente', description: 'Liderança de equipes, desenvolvimento de arquiteturas e otimização de sistemas.' },
      { id: 'e4', title: 'Desenvolvedor Mobile Pleno', company: 'App Innovators', years: '2018 - 2020', description: 'Criação e manutenção de aplicativos mobile para clientes diversos.' },
    ],
    education: [
      { id: 'ed3', degree: 'Mestrado em Engenharia de Software', institution: 'Universidade Federal', years: '2023 - 2025' },
      { id: 'ed4', degree: 'Bacharelado em Ciência da Computação', institution: 'Universidade Estadual', years: '2014 - 2018' },
    ],
    category: 'Mobile',
    layoutTemplateId: 'advanced',
    plan: 'premium',
    isAvailable: true,
  },
  {
    id: '7',
    username: 'camilaportfolio',
    name: 'Camila Portfólio',
    email: 'camila.portfolio@email.com',
    bio: 'Plano standard, template focado em portfólio. Designer Visual.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=camilaportfolio',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-camila/1200/300',
    socialLinks: [
      { id: '1', platform: 'behance', url: 'https://behance.net/camilaportfolio' },
      { id: '2', platform: 'dribbble', url: 'https://dribbble.com/camilaportfolio' }
    ],
    location: { city: 'Salvador', country: 'BR' },
    services: [
      { id: 's7', name: 'Design de Logo', description: 'Criação de identidade visual.' },
      { id: 's8', name: 'Ilustração Digital', description: 'Serviços de ilustração personalizada.' },
    ],
    portfolio: [
      { id: 'p7', imageUrl: 'https://picsum.photos/seed/proj7/400/300', caption: 'Identidade Visual Marca X', description: 'Desenvolvimento completo de identidade visual.' },
      { id: 'p8', imageUrl: 'https://picsum.photos/seed/proj8/400/300', caption: 'Campanha Publicitária Y', description: 'Criação de artes para campanha digital.' },
    ],
    skills: ['Design Gráfico', 'Illustrator', 'Photoshop'],
    experience: [
      { id: 'e5', title: 'Designer Freelancer', company: 'Autônoma', years: '2021 - Atualmente', description: 'Projetos de branding e ilustração.' }
    ],
    education: [
      { id: 'ed5', degree: 'Bacharel em Design', institution: 'UFBA', years: '2017 - 2021' }
    ],
    category: 'Designer',
    layoutTemplateId: 'portfolio-focus',
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true,
  },
  {
    id: '8',
    username: 'robertobusiness',
    name: 'Roberto Business',
    email: 'roberto.business@email.com',
    bio: 'Plano premium, template Pro. Consultor de Marketing Digital.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=robertobusiness',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-roberto/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/robertobusiness' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/robertobusiness' }
    ],
    location: { city: 'Porto Alegre', country: 'BR' },
    services: [
      { id: 's9', name: 'Consultoria de SEO', description: 'Otimização para motores de busca.' },
      { id: 's10', name: 'Gestão de Tráfego Pago', description: 'Campanhas de anúncios online.' },
    ],
    portfolio: [
      { id: 'p9', imageUrl: 'https://picsum.photos/seed/proj9/400/300', caption: 'Estratégia de Conteúdo X', description: 'Planejamento e execução de conteúdo.' },
      { id: 'p10', imageUrl: 'https://picsum.photos/seed/proj10/400/300', caption: 'Campanha de Leads Y', description: 'Otimização de funis de vendas.' },
    ],
    skills: ['SEO', 'Google Ads', 'Facebook Ads', 'Marketing Digital'],
    experience: [
      { id: 'e6', title: 'Head de Marketing', company: 'Digital Solutions', years: '2021 - Atualmente', description: 'Liderança e estratégia de marketing digital.' },
    ],
    education: [
      { id: 'ed6', degree: 'Pós-graduação em Marketing', institution: 'FGV', years: '2019 - 2020' },
    ],
    category: 'Marketing',
    layoutTemplateId: 'premium-pro',
    plan: 'premium',
    isAvailable: true,
    isProfileComplete: true,
  },
  {
    id: '4',
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
    plan: 'free',
    layoutTemplateId: 'basic',
    isProfileComplete: false,
  },
  {
    id: '5',
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
    plan: 'free',
    layoutTemplateId: 'basic',
    isProfileComplete: false,
  },
  {
    id: '6',
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
    plan: 'free',
    layoutTemplateId: 'basic',
    isProfileComplete: false,
  }
];

export const mockCurrentUser = mockUserProfiles[0];

export function updateMockCurrentUser(data: any) {
  // Simulação de atualização do usuário mock
  console.log('Mock update user:', data);
}

export function getMockUserByUsername(username: string): UserProfile | null {
  return mockUserProfiles.find(user => user.username === username) || null;
}

export function updateUserProfileInMockData(updatedUser: UserProfile): UserProfile {
  const index = mockUserProfiles.findIndex(user => user.id === updatedUser.id);
  if (index !== -1) {
    mockUserProfiles[index] = updatedUser;
    // Se o usuário atualizado for o mockCurrentUser, atualize-o também
    if (mockCurrentUser.id === updatedUser.id) {
      Object.assign(mockCurrentUser, updatedUser);
    }
    console.log('Mock user profile updated:', updatedUser.username, updatedUser.plan);
  } else {
    console.warn('User not found in mockUserProfiles for update:', updatedUser.id);
  }
  return updatedUser;
} 