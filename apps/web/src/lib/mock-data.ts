import type { UserProfile } from './types';

export const mockUserProfiles: UserProfile[] = [
  // 1. Free Incompleto (BasicProfileLayout)
  {
    id: 'u1',
    username: 'ana_basic',
    name: 'Ana Básica',
    email: 'ana.basic@email.com',
    bio: 'Perfil gratuito incompleto. Preencha mais informações para liberar recursos!',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-placeholder/1200/300',
    socialLinks: [],
    location: { city: 'Curitiba', country: 'BR' },
    services: [],
    portfolio: [],
    skills: [],
    experience: [],
    education: [],
    category: 'Estudante',
    layoutTemplateId: 'basic',
    plan: 'free',
    isAvailable: true,
    isProfileComplete: false,
  },
  // 2. Free Completo (MinimalistCardLayout)
  {
    id: 'u2',
    username: 'bruno_minimal',
    name: 'Bruno Minimal',
    email: 'bruno.minimal@email.com',
    bio: 'Perfil gratuito completo, visual limpo e objetivo.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=brunominimal',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-bruno/1200/300',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/brunominimal' },
      { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/brunominimal' }
    ],
    location: { city: 'São Paulo', country: 'BR' },
    services: [],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/minimal1/400/300', caption: 'Projeto Minimalista', description: 'Exemplo de portfólio para layout minimalista.' }
    ],
    skills: ['HTML', 'CSS', 'Javascript'],
    experience: [],
    education: [],
    category: 'Desenvolvedor',
    layoutTemplateId: 'minimalist',
    plan: 'free',
    isAvailable: true,
    isProfileComplete: true,
  },
  // 3. Standard Modern (ModernProfileLayout)
  {
    id: 'u3',
    username: 'carla_modern',
    name: 'Carla Moderna',
    email: 'carla.modern@email.com',
    bio: 'Plano standard, layout moderno. Serviços, portfólio, experiência e educação.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlamodern',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-carla/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/carlamodern' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/carlamodern' }
    ],
    location: { city: 'Belo Horizonte', country: 'BR' },
    services: [
      { id: 's1', name: 'Consultoria Web', description: 'Consultoria para sites institucionais.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/modern1/400/300', caption: 'Site Institucional', description: 'Projeto de site para empresa.' }
    ],
    skills: ['Web Design', 'React', 'Figma'],
    experience: [
      { id: 'e1', title: 'Web Designer', company: 'Agência Web', years: '2022-2023', description: 'Criação de layouts responsivos.' }
    ],
    education: [
      { id: 'ed1', degree: 'Tecnólogo em Web Design', institution: 'IFMG', years: '2020-2022' }
    ],
    category: 'Web Designer',
    layoutTemplateId: 'modern',
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true,
  },
  // 4. Standard Portfolio Focus (PortfolioFocusLayout)
  {
    id: 'u4',
    username: 'danilo_portfolio',
    name: 'Danilo Portfólio',
    email: 'danilo.portfolio@email.com',
    bio: 'Plano standard, layout focado em portfólio. Destaque para projetos visuais.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniloportfolio',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-danilo/1200/300',
    socialLinks: [
      { id: '1', platform: 'behance', url: 'https://behance.net/daniloportfolio' },
      { id: '2', platform: 'dribbble', url: 'https://dribbble.com/daniloportfolio' }
    ],
    location: { city: 'Recife', country: 'BR' },
    services: [
      { id: 's1', name: 'Ilustração', description: 'Ilustrações digitais para campanhas.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/portfolio1/400/300', caption: 'Ilustração Publicitária', description: 'Arte para campanha de verão.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/portfolio2/400/300', caption: 'Logo Marca', description: 'Criação de logotipo para startup.' }
    ],
    skills: ['Illustrator', 'Photoshop', 'Branding'],
    experience: [
      { id: 'e1', title: 'Ilustrador', company: 'Estúdio Criativo', years: '2021-2023', description: 'Projetos de ilustração e identidade visual.' }
    ],
    education: [
      { id: 'ed1', degree: 'Bacharel em Design', institution: 'UFPE', years: '2017-2021' }
    ],
    category: 'Designer',
    layoutTemplateId: 'portfolio-focus',
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true,
  },
  // 5. Premium Avançado (AdvancedProfileLayout)
  {
    id: 'u5',
    username: 'elisa_advanced',
    name: 'Elisa Avançada',
    email: 'elisa.advanced@email.com',
    bio: 'Plano premium, layout avançado. Perfil completo, vídeos, banner e stories.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elisaadvanced',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-elisa/1200/300',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/elisaadvanced' },
      { id: '2', platform: 'github', url: 'https://github.com/elisaadvanced' }
    ],
    location: { city: 'Florianópolis', country: 'BR', address: 'Rua das Flores, 100' },
    services: [
      { id: 's1', name: 'Mentoria em Tech', description: 'Acompanhamento de carreira para devs.' },
      { id: 's2', name: 'Palestras', description: 'Palestras sobre inovação e tecnologia.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/advanced1/400/300', caption: 'Mentoria React', description: 'Mentoria para grupo de iniciantes.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/advanced2/400/300', caption: 'Palestra Tech', description: 'Evento sobre tendências em tecnologia.' }
    ],
    skills: ['Mentoria', 'Palestras', 'React', 'Inovação'],
    experience: [
      { id: 'e1', title: 'Tech Lead', company: 'InovaTech', years: '2020-2023', description: 'Liderança de squads de inovação.' }
    ],
    education: [
      { id: 'ed1', degree: 'Mestrado em Inovação', institution: 'UFSC', years: '2018-2020' }
    ],
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeVideoTitle: 'Como inovar em tecnologia',
    youtubeVideoDescription: 'Dicas práticas para inovar no mercado tech.',
    premiumBanner: {
      imageUrl: 'https://picsum.photos/seed/bannerelisa/800/200',
      title: 'Mentoria Premium',
      description: 'Garanta sua vaga na próxima turma!',
      ctaText: 'Saiba mais',
      ctaLink: 'https://elisaadvanced.com/mentoria'
    },
    category: 'Mentora',
    layoutTemplateId: 'advanced',
    plan: 'premium',
    isAvailable: true,
    isProfileComplete: true,
  },
  // 6. Premium Pro (PremiumProLayout)
  {
    id: 'u6',
    username: 'felipe_pro',
    name: 'Felipe Pro',
    email: 'felipe.pro@email.com',
    bio: 'Plano premium, layout Pro. Consultor com depoimentos, agendamento e SEO.',
    profilePictureUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=felipepro',
    coverPhotoUrl: 'https://picsum.photos/seed/cover-felipe/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/felipepro' },
      { id: '2', platform: 'website', url: 'https://felipepro.com' }
    ],
    location: { city: 'Brasília', country: 'BR' },
    services: [
      { id: 's1', name: 'Consultoria SEO', description: 'Otimização avançada para buscadores.' },
      { id: 's2', name: 'Agendamento Online', description: 'Sessões de consultoria via Calendly.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/pro1/400/300', caption: 'Case SEO', description: 'Resultados de SEO para cliente X.' }
    ],
    skills: ['SEO', 'Consultoria', 'Marketing Digital'],
    experience: [
      { id: 'e1', title: 'Consultor Sênior', company: 'SEO Experts', years: '2019-2023', description: 'Projetos de SEO e marketing.' }
    ],
    education: [
      { id: 'ed1', degree: 'MBA em Marketing', institution: 'ESPM', years: '2017-2019' }
    ],
    reviews: [
      { id: 'r1', authorName: 'Cliente Satisfeito', rating: 5, comment: 'Felipe é excelente!', createdAt: '2024-01-10' }
    ],
    premiumBanner: {
      imageUrl: 'https://picsum.photos/seed/bannerfelipe/800/200',
      title: 'Consultoria Pro',
      description: 'Agende sua sessão exclusiva.',
      ctaText: 'Agendar',
      ctaLink: 'https://felipepro.com/agenda'
    },
    category: 'Consultor',
    layoutTemplateId: 'premium-pro',
    plan: 'premium',
    isAvailable: true,
    isProfileComplete: true,
  },
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