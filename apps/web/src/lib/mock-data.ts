import type { UserProfile } from './types';
import { superPremiumShowcaseUser } from '@/features/profile/new-edit-flow/mock-data';

export const mockUserProfiles: UserProfile[] = [
  // 1. Free Incompleto (BasicProfileLayout)
  {
    id: 'u1',
    username: 'ana_basic',
    name: 'Ana Básica',
    email: 'ana.basic@email.com',
    bio: 'Perfil gratuito incompleto. Preencha mais informações para liberar recursos!',
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder',
    cover_photo_url: '',
    socialLinks: [],
    location: { city: 'Curitiba', state: 'PR', country: 'BR' },
    services: [],
    portfolio: [],
    skills: [],
    experience: [],
    education: [
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' }
    ],
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
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=brunominimal',
    cover_photo_url: 'https://picsum.photos/seed/cover-bruno/1200/300',
    socialLinks: [
      { id: '1', platform: 'github', url: 'https://github.com/brunominimal' },
      { id: '2', platform: 'linkedin', url: 'https://linkedin.com/in/brunominimal' }
    ],
    location: { city: 'São Paulo', state: 'SP', country: 'BR' },
    services: [
      { id: 's1', name: 'Site Pessoal', description: 'Desenvolvimento de site pessoal minimalista.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/minimal1/400/300', caption: 'Projeto Minimalista', description: 'Exemplo de portfólio para layout minimalista.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/minimal2/400/300', caption: 'Landing Page', description: 'Landing page clean e responsiva.' }
    ],
    skills: ['HTML', 'CSS', 'Javascript'],
    experience: [],
    education: [
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' }
    ],
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
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=carlamodern',
    cover_photo_url: 'https://picsum.photos/seed/cover-carla/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/carlamodern' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/carlamodern' }
    ],
    location: { city: 'Belo Horizonte', state: 'MG', country: 'BR' },
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
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' }
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
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=daniloportfolio',
    cover_photo_url: 'https://picsum.photos/seed/cover-danilo/1200/300',
    socialLinks: [
      { id: '1', platform: 'behance', url: 'https://behance.net/daniloportfolio' },
      { id: '2', platform: 'dribbble', url: 'https://dribbble.com/daniloportfolio' }
    ],
    location: { city: 'Recife', state: 'PE', country: 'BR' },
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
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' }
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
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=elisaadvanced',
    cover_photo_url: 'https://picsum.photos/seed/cover-elisa/1200/300',
    socialLinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/elisaadvanced' },
      { id: '2', platform: 'github', url: 'https://github.com/elisaadvanced' }
    ],
    location: { city: 'Florianópolis', state: 'SC', country: 'BR', address: 'Rua das Flores, 100' },
    services: [
      { id: 's1', name: 'Mentoria em Tech', description: 'Acompanhamento de carreira para devs.' },
      { id: 's2', name: 'Palestras', description: 'Palestras sobre inovação e tecnologia.' },
      { id: 's3', name: 'Consultoria UX', description: 'Consultoria em experiência do usuário.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/advanced1/400/300', caption: 'Mentoria React', description: 'Mentoria para grupo de iniciantes.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/advanced2/400/300', caption: 'Palestra Tech', description: 'Evento sobre tendências em tecnologia.' },
      { id: 'p3', imageUrl: 'https://picsum.photos/seed/advanced3/400/300', caption: 'Workshop UX', description: 'Workshop prático de UX Design.' },
      { id: 'p4', imageUrl: 'https://picsum.photos/seed/advanced4/400/300', caption: 'Live Coding', description: 'Live de programação ao vivo.' },
      { id: 'p5', imageUrl: 'https://picsum.photos/seed/advanced5/400/300', caption: 'App Mobile', description: 'Aplicativo mobile para eventos.' },
      { id: 'p6', imageUrl: 'https://picsum.photos/seed/advanced6/400/300', caption: 'Dashboard Analytics', description: 'Dashboard de dados para empresas.' }
    ],
    skills: ['Mentoria', 'Palestras', 'React', 'Inovação', 'UX', 'Design'],
    experience: [
      { id: 'e1', title: 'Tech Lead', company: 'InovaTech', years: '2020-2023', description: 'Liderança de squads de inovação.' },
      { id: 'e2', title: 'UX Designer', company: 'DesignPro', years: '2018-2020', description: 'Projetos de experiência do usuário.' }
    ],
    education: [
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' },
      { id: 'ed2', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2013-2017' }
    ],
    reviews: [
      { id: 'r1', authorName: 'Cliente 1', rating: 5, comment: 'Mentoria transformadora!', createdAt: '2024-01-10' },
      { id: 'r2', authorName: 'Cliente 2', rating: 5, comment: 'Palestra inspiradora.', createdAt: '2024-02-15' },
      { id: 'r3', authorName: 'Cliente 3', rating: 4, comment: 'Consultoria muito útil.', createdAt: '2024-03-05' },
      { id: 'r4', authorName: 'Cliente 4', rating: 5, comment: 'Recomendo para todos!', createdAt: '2024-04-01' },
      { id: 'r5', authorName: 'Cliente 5', rating: 5, comment: 'Didática excelente.', createdAt: '2024-05-10' }
    ],
    stories: [
      { id: 's1', title: 'Story 1', imageUrl: 'https://picsum.photos/seed/storyelisa1/100/100' },
      { id: 's2', title: 'Story 2', imageUrl: 'https://picsum.photos/seed/storyelisa2/100/100' },
      { id: 's3', title: 'Story 3', imageUrl: 'https://picsum.photos/seed/storyelisa3/100/100' }
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
  // 6. Pro Profile (ProProfileLayout)
  {
    id: 'u6',
    username: 'felipe_pro',
    name: 'Felipe Pro',
    email: 'felipe.pro@email.com',
    bio: 'Plano premium, layout Pro. Consultor com depoimentos, agendamento e SEO.',
    profile_picture_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=felipepro',
    cover_photo_url: 'https://picsum.photos/seed/cover-felipe/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/felipepro' },
      { id: '2', platform: 'website', url: 'https://felipepro.com' }
    ],
    location: { city: 'Brasília', state: 'DF', country: 'BR' },
    services: [
      { id: 's1', name: 'Consultoria SEO', description: 'Otimização avançada para buscadores.' },
      { id: 's2', name: 'Agendamento Online', description: 'Sessões de consultoria via Calendly.' },
      { id: 's3', name: 'Auditoria de Site', description: 'Análise técnica e recomendações.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/pro1/400/300', caption: 'Case SEO', description: 'Resultados de SEO para cliente X.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/pro2/400/300', caption: 'Landing Page Otimizada', description: 'Exemplo de landing page com alta conversão.' },
      { id: 'p3', imageUrl: 'https://picsum.photos/seed/pro3/400/300', caption: 'Blog Corporativo', description: 'Estratégia de conteúdo para blog.' },
      { id: 'p4', imageUrl: 'https://picsum.photos/seed/pro4/400/300', caption: 'E-commerce', description: 'Loja virtual otimizada.' },
      { id: 'p5', imageUrl: 'https://picsum.photos/seed/pro5/400/300', caption: 'App de Reservas', description: 'Aplicativo para agendamento online.' },
      { id: 'p6', imageUrl: 'https://picsum.photos/seed/pro6/400/300', caption: 'Dashboard SEO', description: 'Painel de métricas para clientes.' }
    ],
    skills: ['SEO', 'Consultoria', 'Marketing Digital', 'Conteúdo', 'Analytics', 'Gestão'],
    experience: [
      { id: 'e1', title: 'Consultor Sênior', company: 'SEO Experts', years: '2019-2023', description: 'Projetos de SEO e marketing.' },
      { id: 'e2', title: 'Analista de Marketing', company: 'Agência Z', years: '2016-2019', description: 'Campanhas digitais.' }
    ],
    education: [
      { id: 'ed1', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2020-2022' },
      { id: 'ed2', degree: 'Exemplo de Formação', institution: 'Instituição Exemplo', years: '2012-2016' }
    ],
    reviews: [
      { id: 'r1', authorName: 'Empresa Y', rating: 5, comment: 'Resultados rápidos e comunicação clara.', createdAt: '2024-02-15' },
      { id: 'r2', authorName: 'Agência Z', rating: 4, comment: 'Consultoria detalhada e personalizada.', createdAt: '2024-03-05' },
      { id: 'r3', authorName: 'Cliente Satisfeito', rating: 5, comment: 'Felipe é excelente!', createdAt: '2024-01-10' },
      { id: 'r4', authorName: 'Cliente Fiel', rating: 5, comment: 'Sempre entrega mais do que promete.', createdAt: '2024-04-20' },
      { id: 'r5', authorName: 'Parceiro Digital', rating: 5, comment: 'Parceria de sucesso!', createdAt: '2024-05-01' }
    ],
    stories: [
      { id: 's1', title: 'Story 1', imageUrl: 'https://picsum.photos/seed/storyfelipe1/100/100' },
      { id: 's2', title: 'Story 2', imageUrl: 'https://picsum.photos/seed/storyfelipe2/100/100' }
    ],
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=3JZ_D3ELwOQ',
    youtubeVideoTitle: 'SEO na Prática',
    youtubeVideoDescription: 'Como aplicar SEO para resultados reais.',
    premiumBanner: {
      imageUrl: 'https://picsum.photos/seed/bannerfelipe/800/200',
      title: 'Consultoria Premium',
      description: 'Transforme seu negócio com SEO!',
      ctaText: 'Contrate agora',
      ctaLink: 'https://felipepro.com/consultoria'
    },
    category: 'Consultor',
    layoutTemplateId: 'pro',
    plan: 'premium',
    isAvailable: true,
    isProfileComplete: true,
  },
  // 7. Super Premium (SuperPremiumProfileLayout)
  {
    id: 'u7',
    username: 'lucas_super',
    name: 'Lucas Super Premium',
    email: 'lucas.super@email.com',
    bio: 'Perfil super premium, todos os recursos ativados e visual de destaque.',
    profile_picture_url: 'https://randomuser.me/api/portraits/men/32.jpg',
    cover_photo_url: 'https://picsum.photos/seed/cover-lucas/1200/300',
    socialLinks: [
      { id: '1', platform: 'linkedin', url: 'https://linkedin.com/in/lucassuper' },
      { id: '2', platform: 'instagram', url: 'https://instagram.com/lucassuper' },
      { id: '3', platform: 'github', url: 'https://github.com/lucassuper' }
    ],
    location: { city: 'Rio de Janeiro', state: 'RJ', country: 'BR', address: 'Av. das Américas, 500' },
    services: [
      { id: 's1', name: 'Consultoria Premium', description: 'Consultoria personalizada para negócios.' },
      { id: 's2', name: 'Mentoria VIP', description: 'Mentoria exclusiva para profissionais.' }
    ],
    portfolio: [
      { id: 'p1', imageUrl: 'https://picsum.photos/seed/super1/400/300', caption: 'Projeto Super', description: 'Projeto de alto impacto.' },
      { id: 'p2', imageUrl: 'https://picsum.photos/seed/super2/400/300', caption: 'App Exclusivo', description: 'Aplicativo desenvolvido para clientes premium.' }
    ],
    skills: ['Liderança', 'Inovação', 'Gestão', 'Tecnologia'],
    experience: [
      { id: 'e1', title: 'CEO', company: 'Super Company', years: '2019-2024', description: 'Gestão de equipe e projetos inovadores.' }
    ],
    education: [
      { id: 'ed1', degree: 'MBA em Negócios', institution: 'FGV', years: '2017-2019' }
    ],
    reviews: [
      { id: 'r1', authorName: 'Cliente Premium', rating: 5, comment: 'Serviço impecável!', createdAt: '2024-06-01' }
    ],
    stories: [
      { id: 's1', title: 'Conquista', imageUrl: 'https://picsum.photos/seed/storylucas1/100/100' }
    ],
    youtubeVideoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    youtubeVideoTitle: 'Destaque Super Premium',
    youtubeVideoDescription: 'Veja como alcançar o topo com o plano super premium.',
    premiumBanner: {
      imageUrl: 'https://picsum.photos/seed/bannerlucas/800/200',
      title: 'Super Premium Banner',
      description: 'Aproveite todos os benefícios do plano super premium!',
      ctaText: 'Contrate agora',
      ctaLink: 'https://lucassuper.com/contratar'
    },
    category: 'Empreendedor',
    layoutTemplateId: 'super-premium',
    plan: 'premium',
    isAvailable: true,
    isProfileComplete: true,
    coupons: [
      { id: 'c1', code: 'SUPER10', description: '10% de desconto para clientes super premium', discountValue: 10, discountType: 'percentage', expiresAt: '2024-12-31' }
    ],
    calendlyUrl: 'https://calendly.com/lucassuper/consultoria',
  },
  superPremiumShowcaseUser,
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

export const feedMockCards = [
  { 
    id: 1, 
    title: "Serviço de Limpeza Premium", 
    description: "Deixe sua casa brilhando com nosso serviço de limpeza detalhado.",
    category: "Limpeza",
    author: {
      name: "CleanPro",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Especialista em Limpeza"
    }
  },
  { 
    id: 2, 
    title: "Consultoria em Marketing Digital", 
    description: "Alavanque seu negócio com estratégias de marketing digital personalizadas.",
    category: "Marketing",
    author: {
      name: "DigitalMax",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      role: "Consultor de Marketing"
    }
  },
  { 
    id: 3, 
    title: "Aulas de Yoga Personalizadas", 
    description: "Encontre seu equilíbrio com aulas de yoga adaptadas para você.",
    category: "Saúde",
    author: {
      name: "YogaLife",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      role: "Instrutora de Yoga"
    }
  },
  { 
    id: 4, 
    title: "Desenvolvimento de Apps", 
    description: "Transforme sua ideia em um aplicativo incrível e funcional.",
    category: "Tecnologia",
    author: {
      name: "TechSolutions",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      role: "Desenvolvedor de Software"
    }
  },
];

export const feedMocks = [
  // Post comum (já existente)
  {
    tipo: "oferta_servico",
    usuario: "Ana Básica",
    preco: "R$ 35",
    descricao: "Cortes femininos e consultoria de imagem. Atendimento em Curitiba.",
    tags: ["Beleza", "Consultoria"],
    imagem: "https://picsum.photos/seed/ana-basic/400/300",
    curtidas: 23,
    comentarios: 4,
    usuarioId: "u1",
  },
  // Anúncio patrocinado com usuário real
  {
    tipo: "anuncio_patrocinado",
    titulo: "Mentoria Premium com Elisa",
    descricao: "Garanta sua vaga na próxima turma de mentoria tech!",
    imagem: "https://picsum.photos/seed/bannerelisa/800/200",
    link: "https://elisaadvanced.com/mentoria",
    usuarioId: "u5",
  },
  // Banner promocional com imagem de portfólio
  {
    tipo: "banner",
    imagem: "https://picsum.photos/seed/portfolio1/800/200",
    texto: "Veja o novo projeto de Danilo Portfólio!",
    link: "https://behance.net/daniloportfolio",
  },
  // Cupom de desconto
  {
    tipo: "cupom",
    codigo: "BEMVINDO10",
    desconto: "10%",
    validade: "30/06/2024",
    descricao: "Use o cupom e ganhe 10% de desconto em qualquer serviço.",
  },
  // Atualização da plataforma
  {
    tipo: "atualizacao",
    titulo: "Novidade!",
    descricao: "Agora você pode favoritar profissionais para acessar mais rápido.",
    data: "10/06/2024",
  },
  // Depoimento com usuário real
  {
    tipo: "depoimento",
    usuario: "Felipe Pro",
    nota: 5,
    comentario: "Excelente consultoria de SEO, resultados em poucas semanas!",
    servico: "Consultoria SEO",
    imagem: "https://api.dicebear.com/7.x/avataaars/svg?seed=felipepro",
    usuarioId: "u6",
  },
  // Convite para indicação
  {
    tipo: "indicacao",
    texto: "Indique amigos e ganhe créditos para usar em serviços!",
    bonus: "R$ 10 por indicação",
    link: "#",
  },
  // Evento local com imagem de portfólio
  {
    tipo: "evento",
    nome: "Palestra Tech com Elisa",
    data: "25/06/2024",
    local: "Florianópolis",
    imagem: "https://picsum.photos/seed/advanced2/800/200",
    link: "https://elisaadvanced.com/palestra",
  },
]; 