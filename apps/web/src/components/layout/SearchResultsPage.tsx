import React from "react";
import { AppContainer } from "./app-container";
import ModernSearchResultCard from "../profile-layouts/ModernProfileLayout/SearchResultCard";

const users = [
  {
    id: "u1",
    username: "mariasilva",
    name: "Maria Silva",
    email: "maria.silva@email.com",
    bio: "Designer criativa com foco em identidade visual e branding.",
    profile_picture_url: "/avatar-default.png",
    cover_photo_url: "/capa-exemplo.png",
    socialLinks: [
      { id: "1", platform: "instagram", url: "https://instagram.com/mariasilva" },
      { id: "2", platform: "behance", url: "https://behance.net/mariasilva" }
    ],
    location: { city: "São Paulo", state: "SP", country: "Brasil" },
    services: [
      { id: "s1", name: "Criação de Logotipo", description: "Desenvolvimento de identidade visual profissional." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio1.png", caption: "Identidade Visual" }
    ],
    skills: ["Photoshop", "Illustrator"],
    experience: [],
    education: [],
    category: "Designer Gráfico",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u2",
    username: "joaosouza",
    name: "João Souza",
    email: "joao.souza@email.com",
    bio: "Full stack developer apaixonado por tecnologia e inovação.",
    profile_picture_url: "/avatar-joao.png",
    cover_photo_url: "/capa-joao.png",
    socialLinks: [
      { id: "1", platform: "github", url: "https://github.com/joaosouza" },
      { id: "2", platform: "linkedin", url: "https://linkedin.com/in/joaosouza" }
    ],
    location: { city: "Rio de Janeiro", state: "RJ", country: "Brasil" },
    services: [
      { id: "s1", name: "Desenvolvimento Web", description: "Sites, sistemas e plataformas sob medida." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-joao1.png", caption: "Dashboard de Analytics" }
    ],
    skills: ["JavaScript", "React"],
    experience: [],
    education: [],
    category: "Desenvolvedor Full Stack",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u3",
    username: "moco",
    name: "Moco Silva",
    email: "moco.silva@email.com",
    bio: "Fotógrafo profissional especializado em ensaios e eventos.",
    profile_picture_url: "/avatar-moco.png",
    cover_photo_url: "/capa-moco.png",
    socialLinks: [
      { id: "1", platform: "instagram", url: "https://instagram.com/mocofoto" }
    ],
    location: { city: "Belo Horizonte", state: "MG", country: "Brasil" },
    services: [
      { id: "s1", name: "Ensaios Fotográficos", description: "Ensaios em estúdio e externos." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-moco1.png", caption: "Ensaio Urbano" }
    ],
    skills: ["Fotografia", "Edição"],
    experience: [],
    education: [],
    category: "Fotógrafo Profissional",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u4",
    username: "felipealves",
    name: "Felipe Alves",
    email: "felipe.alves@email.com",
    bio: "Consultor de marketing digital com foco em campanhas de performance.",
    profile_picture_url: "/avatar-felipe.png",
    cover_photo_url: "/capa-felipe.png",
    socialLinks: [
      { id: "1", platform: "linkedin", url: "https://linkedin.com/in/felipealves" }
    ],
    location: { city: "Curitiba", state: "PR", country: "Brasil" },
    services: [
      { id: "s1", name: "Planejamento de Campanhas", description: "Estratégias para redes sociais e Google Ads." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-felipe1.png", caption: "Campanha Google Ads" }
    ],
    skills: ["Marketing", "Google Ads"],
    experience: [],
    education: [],
    category: "Consultor de Marketing",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u5",
    username: "anapereira",
    name: "Ana Pereira",
    email: "ana.pereira@email.com",
    bio: "Arquiteta apaixonada por projetos residenciais e interiores.",
    profile_picture_url: "/avatar-ana.png",
    cover_photo_url: "/capa-ana.png",
    socialLinks: [
      { id: "1", platform: "instagram", url: "https://instagram.com/anapereira" }
    ],
    location: { city: "Porto Alegre", state: "RS", country: "Brasil" },
    services: [
      { id: "s1", name: "Projetos Residenciais", description: "Plantas, 3D e acompanhamento de obra." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-ana1.png", caption: "Casa Moderna" }
    ],
    skills: ["AutoCAD", "SketchUp"],
    experience: [],
    education: [],
    category: "Arquiteta",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u6",
    username: "brunoribeiro",
    name: "Bruno Ribeiro",
    email: "bruno.ribeiro@email.com",
    bio: "Personal trainer dedicado a transformar vidas com treinos funcionais.",
    profile_picture_url: "/avatar-bruno.png",
    cover_photo_url: "/capa-bruno.png",
    socialLinks: [
      { id: "1", platform: "instagram", url: "https://instagram.com/brunotreina" }
    ],
    location: { city: "Salvador", state: "BA", country: "Brasil" },
    services: [
      { id: "s1", name: "Treinamento Funcional", description: "Aulas presenciais e online." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-bruno1.png", caption: "Treino Funcional" }
    ],
    skills: ["Treinamento", "Nutrição"],
    experience: [],
    education: [],
    category: "Personal Trainer",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  },
  {
    id: "u7",
    username: "carlamartins",
    name: "Carla Martins",
    email: "carla.martins@email.com",
    bio: "Advogada trabalhista com experiência em consultoria para empresas.",
    profile_picture_url: "/avatar-carla.png",
    cover_photo_url: "/capa-carla.png",
    socialLinks: [
      { id: "1", platform: "linkedin", url: "https://linkedin.com/in/carlamartins" }
    ],
    location: { city: "Recife", state: "PE", country: "Brasil" },
    services: [
      { id: "s1", name: "Consultoria Jurídica", description: "Atendimento para empresas e trabalhadores." }
    ],
    portfolio: [
      { id: "p1", imageUrl: "/portfolio-carla1.png", caption: "Caso de Sucesso" }
    ],
    skills: ["Direito", "Consultoria"],
    experience: [],
    education: [],
    category: "Advogada Trabalhista",
    layoutTemplateId: "modern",
    plan: 'standard',
    isAvailable: true,
    isProfileComplete: true
  }
];

const SearchResultsPage = () => (
  <>
    <h1 className="text-2xl font-bold mb-6">Resultados da Pesquisa</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <ModernSearchResultCard key={user.username} user={user} />
      ))}
    </div>
  </>
);

export default SearchResultsPage; 