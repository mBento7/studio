export const superPremiumUser = {
  id: "user-superpremium-001",
  name: "Dra. Ana Premium",
  username: "ana.premium",
  email: "ana.premium@exemplo.com",
  phone: "+55 11 99999-8888",
  bio: "Profissional referência em inovação, com mais de 20 anos de experiência em múltiplas áreas. Consultora, mentora e palestrante internacional.",
  category: "Consultoria & Mentoria",
  profilePictureUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  coverPhotoUrl: "/img/users/ana-premium-cover.jpg",
  themeColor: "#8B5CF6",
  whatsappNumber: "5511999998888",
  youtubeVideoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  youtubeVideoTitle: "Apresentação Dra. Ana Premium",
  youtubeVideoDescription: "Conheça a trajetória e os diferenciais da Dra. Ana Premium.",
  plan: "premium",
  skills: ["Inovação", "Gestão de Projetos", "Mentoria", "Palestras", "Liderança", "Coaching"],
  experience: [
    { title: "CEO", company: "Premium Consulting", years: "2015-Atual" },
    { title: "Mentora Sênior", company: "MentorUp", years: "2010-2015" }
  ],
  education: [
    { degree: "Doutorado em Administração", institution: "USP", years: "2005-2009" },
    { degree: "MBA em Inovação", institution: "FGV", years: "2002-2004" }
  ],
  portfolio: [
    { imageUrl: "/img/portfolio/ana-premium-1.jpg", caption: "Palestra TEDx" },
    { imageUrl: "/img/portfolio/ana-premium-2.jpg", caption: "Consultoria internacional" }
  ],
  services: [
    { id: "s1", name: "Mentoria Executiva", description: "Acompanhamento personalizado para líderes.", price: "R$ 1.500/h" },
    { id: "s2", name: "Palestras", description: "Palestras motivacionais e técnicas.", price: "Sob consulta" }
  ],
  socialLinks: [
    { id: "1", platform: "linkedin", url: "https://linkedin.com/in/anapremium" },
    { id: "2", platform: "instagram", url: "https://instagram.com/anapremium" },
    { id: "3", platform: "youtube", url: "https://youtube.com/@anapremium" }
  ],
  location: { city: "São Paulo", country: "Brasil" },
  stories: [
    { id: "s1", title: "TEDx Speaker", imageUrl: "/img/stories/ana-tedx.jpg" },
    { id: "s2", title: "Mentoria Global", imageUrl: "/img/stories/ana-mentoria.jpg" }
  ],
  coupons: [
    { code: "PREMIUM10", description: "10% de desconto em mentorias" },
    { code: "PALESTRA20", description: "20% off em palestras" }
  ],
  premiumBanner: {
    title: "Consultoria Premium",
    description: "Transforme sua carreira com quem é referência!",
    imageUrl: "/img/banners/ana-premium-banner.jpg",
    ctaText: "Agende uma sessão",
    ctaLink: "/contato"
  },
  reviews: [
    { id: "r1", authorName: "Carlos Silva", authorAvatarUrl: "/img/users/carlos.jpg", rating: 5, comment: "A melhor mentora que já tive!", createdAt: "2024-05-01" },
    { id: "r2", authorName: "Fernanda Lima", authorAvatarUrl: "/img/users/fernanda.jpg", rating: 5, comment: "Transformou minha carreira.", createdAt: "2024-04-15" }
  ],
  faq: [
    { question: "Como funciona a mentoria?", answer: "A mentoria é personalizada conforme o perfil do cliente." },
    { question: "Atende empresas?", answer: "Sim, consultoria e treinamentos corporativos." }
  ],
  layoutTemplateId: "super-premium"
};

// Card de resultado de pesquisa para o usuário premium
export const superPremiumUserSearchCard = {
  id: superPremiumUser.id,
  name: superPremiumUser.name,
  username: superPremiumUser.username,
  profilePictureUrl: superPremiumUser.profilePictureUrl,
  bio: superPremiumUser.bio,
  category: superPremiumUser.category,
  plan: "premium",
  highlight: true,
  badge: "Super Premium",
};

export const superPremiumShowcaseUser = {
  id: "user-superpremium-showcase-001",
  name: "Prof. Lucas Showcase",
  username: "lucas.showcase",
  email: "lucas.showcase@exemplo.com",
  phone: "+55 21 98888-7777",
  bio: "Educador, palestrante e consultor em tecnologia. Ajudo pessoas e empresas a inovar e crescer no mundo digital.",
  category: "Educação & Tecnologia",
  profile_picture_url: "https://randomuser.me/api/portraits/men/35.jpg",
  cover_photo_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
  plan: "premium",
  skills: ["Inovação", "Educação Digital", "Palestras", "Consultoria", "Python", "Liderança"],
  experience: [
    { id: "exp1", title: "Professor Universitário", company: "PUC-Rio", years: "2018-Atual" },
    { id: "exp2", title: "Consultor de Inovação", company: "TechEdu", years: "2015-2018" }
  ],
  education: [
    { degree: "Doutorado em Computação", institution: "PUC-Rio", years: "2014-2018" },
    { degree: "Mestrado em Educação", institution: "UFRJ", years: "2012-2014" }
  ],
  portfolio: [
    { imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400", caption: "Palestra Internacional" },
    { imageUrl: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400", caption: "Workshop de Inovação" }
  ],
  services: [
    { id: "srv1", name: "Mentoria Acadêmica", description: "Orientação para carreira acadêmica e pesquisa.", price: "R$ 800/h" },
    { id: "srv2", name: "Palestras Corporativas", description: "Palestras sobre tecnologia e inovação.", price: "Sob consulta" }
  ],
  socialLinks: [
    { id: "1", platform: "linkedin", url: "https://linkedin.com/in/lucasshowcase" },
    { id: "2", platform: "instagram", url: "https://instagram.com/lucasshowcase" },
    { id: "3", platform: "youtube", url: "https://youtube.com/@lucasshowcase" }
  ],
  location: { city: "Rio de Janeiro", country: "Brasil" },
  stories: [
    { title: "TEDx Speaker", imageUrl: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200" },
    { title: "Evento Global", imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=200" }
  ],
  coupons: [
    { code: "SHOW10", description: "10% de desconto em mentorias" },
    { code: "PALESTRA15", description: "15% off em palestras" }
  ],
  premiumBanner: {
    title: "Mentoria Premium",
    description: "Transforme sua carreira acadêmica com orientação personalizada!",
    imageUrl: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600",
    ctaText: "Agende uma sessão",
    ctaLink: "/contato"
  },
  reviews: [
    { id: "r1", authorName: "Marina Souza", authorAvatarUrl: "https://randomuser.me/api/portraits/women/44.jpg", rating: 5, comment: "Lucas é um mentor incrível!", createdAt: "2024-06-01" },
    { id: "r2", authorName: "João Pedro", authorAvatarUrl: "https://randomuser.me/api/portraits/men/45.jpg", rating: 5, comment: "Aprendi muito sobre inovação.", createdAt: "2024-05-20" }
  ],
  faq: [
    { question: "Como funciona a mentoria?", answer: "Mentoria personalizada, online ou presencial, com foco em resultados." },
    { question: "Atende empresas?", answer: "Sim, ofereço treinamentos e workshops corporativos." }
  ],
  layoutTemplateId: "premiumprofile"
};

// Exemplo de outros usuários mock:
export const basicUser = {
  id: "user-basic-001",
  name: "Ana Básica",
  username: "ana.basica",
  email: "ana.basica@exemplo.com",
  phone: "+55 11 90000-1111",
  bio: "Estudante em busca de oportunidades e novos aprendizados.",
  category: "Estudante",
  profile_picture_url: "https://randomuser.me/api/portraits/women/66.jpg",
  cover_photo_url: "https://picsum.photos/seed/anabasica/400/150",
  plan: "free",
  skills: ["Aprendizagem", "Comunicação"],
  experience: [],
  education: [
    { degree: "Ensino Médio", institution: "Colégio Estadual", years: "2020-2022" }
  ],
  portfolio: [],
  services: [],
  socialLinks: [],
  location: { city: "Belo Horizonte", country: "Brasil" },
  stories: [],
  coupons: [],
  premiumBanner: undefined,
  reviews: [],
  faq: [],
  layoutTemplateId: "basic"
};

export const minimalUser = {
  id: "user-minimal-001",
  name: "Bruno Minimal",
  username: "bruno.minimal",
  email: "bruno.minimal@exemplo.com",
  phone: "+55 21 90000-2222",
  bio: "Desenvolvedor focado em soluções simples e eficientes.",
  category: "Desenvolvedor",
  profile_picture_url: "https://randomuser.me/api/portraits/men/34.jpg",
  cover_photo_url: "https://picsum.photos/seed/brunominimal/400/150",
  plan: "free",
  skills: ["JavaScript", "React"],
  experience: [
    { title: "Desenvolvedor Júnior", company: "DevStart", years: "2023-Atual" }
  ],
  education: [
    { degree: "Tecnólogo em Sistemas", institution: "IFRJ", years: "2021-2023" }
  ],
  portfolio: [],
  services: [],
  socialLinks: [],
  location: { city: "Rio de Janeiro", country: "Brasil" },
  stories: [],
  coupons: [],
  premiumBanner: undefined,
  reviews: [],
  faq: [],
  layoutTemplateId: "minimalist"
};

export const modernUser = {
  id: "user-modern-001",
  name: "Carla Moderna",
  username: "carla.moderna",
  email: "carla.moderna@exemplo.com",
  phone: "+55 41 90000-3333",
  bio: "Web Designer apaixonada por layouts criativos.",
  category: "Web Designer",
  profile_picture_url: "https://randomuser.me/api/portraits/women/69.jpg",
  cover_photo_url: "https://picsum.photos/seed/carlamoderna/400/150",
  plan: "standard",
  skills: ["Design", "Figma", "UX/UI"],
  experience: [
    { title: "Web Designer", company: "Agência Criativa", years: "2022-Atual" }
  ],
  education: [
    { degree: "Design Gráfico", institution: "UFPR", years: "2018-2021" }
  ],
  portfolio: [],
  services: [],
  socialLinks: [],
  location: { city: "Curitiba", country: "Brasil" },
  stories: [],
  coupons: [],
  premiumBanner: undefined,
  reviews: [],
  faq: [],
  layoutTemplateId: "free"
};

export const basicUserSearchCard = {
  id: basicUser.id,
  name: basicUser.name,
  username: basicUser.username,
  profilePictureUrl: basicUser.profile_picture_url,
  bio: basicUser.bio,
  category: basicUser.category,
  plan: basicUser.plan,
  highlight: false,
  badge: "Básico",
};

export const minimalUserSearchCard = {
  id: minimalUser.id,
  name: minimalUser.name,
  username: minimalUser.username,
  profilePictureUrl: minimalUser.profile_picture_url,
  bio: minimalUser.bio,
  category: minimalUser.category,
  plan: minimalUser.plan,
  highlight: false,
  badge: "Minimalista",
};

export const modernUserSearchCard = {
  id: modernUser.id,
  name: modernUser.name,
  username: modernUser.username,
  profilePictureUrl: modernUser.profile_picture_url,
  bio: modernUser.bio,
  category: modernUser.category,
  plan: modernUser.plan,
  highlight: false,
  badge: "Moderno",
}; 