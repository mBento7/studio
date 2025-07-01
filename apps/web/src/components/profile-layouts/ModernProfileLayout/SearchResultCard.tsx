import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ModernSearchResultCardProps {
  user: UserProfile;
}

const ModernSearchResultCard: React.FC<ModernSearchResultCardProps> = ({ user }) => {
  const backgroundStyle = user.cover_photo_url
    ? { backgroundImage: `linear-gradient(rgba(40,40,60,0.45),rgba(40,40,60,0.6)), url('${user.cover_photo_url}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(135deg, #6366f1 60%, #a1a1aa 100%)' };

  return (
    <Link href={`/profile/${user.username}`} className="block h-full group">
      <Card
        className="flex flex-col items-center justify-center h-full w-full p-6 rounded-2xl shadow-md transition-all duration-200 hover:shadow-2xl cursor-pointer relative overflow-hidden border-2 border-gray-400 hover:scale-105 transition-transform"
        style={backgroundStyle}
      >
        <div className="z-10 w-full flex flex-col items-center">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg -mt-8">
            <AvatarImage src={user.profile_picture_url || '/avatar-default.png'} alt={user.name} />
            <AvatarFallback className="text-xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="mt-2 font-bold text-lg text-center text-white drop-shadow">{user.name}</h3>
          <p className="text-sm text-indigo-100 text-center drop-shadow">{user.category}</p>
          {user.location?.city && (
            <p className="text-xs text-indigo-100 flex items-center gap-1 mt-1 drop-shadow">
              <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-4 0-7 2.239-7 5v2h14v-2c0-2.761-3-5-7-5z" /></svg>
              {user.location.city}{user.location.state ? `, ${user.location.state}` : ''}
            </p>
          )}
          {user.services && user.services.length > 0 && (
            <div className="mt-2 text-xs text-center text-white font-semibold bg-indigo-600/80 px-2 py-1 rounded-full drop-shadow">
              {user.services[0].name}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ModernSearchResultCard;

// Exemplo de uso para exibir múltiplos usuários nos resultados de pesquisa:
/*
import ModernSearchResultCard from "./SearchResultCard";

const users = [
  {
    username: "mariasilva",
    name: "Maria Silva",
    profilePictureUrl: "/avatar-default.png",
    coverPhotoUrl: "/capa-exemplo.png",
    category: "Designer Gráfico",
    location: { city: "São Paulo", state: "SP", country: "Brasil" },
    services: [
      { name: "Criação de Logotipo", description: "Desenvolvimento de identidade visual profissional." }
    ]
  },
  {
    username: "joaosouza",
    name: "João Souza",
    profilePictureUrl: "/avatar-joao.png",
    coverPhotoUrl: "/capa-joao.png",
    category: "Desenvolvedor Full Stack",
    location: { city: "Rio de Janeiro", state: "RJ", country: "Brasil" },
    services: [
      { name: "Desenvolvimento Web", description: "Sites, sistemas e plataformas sob medida." }
    ]
  },
  {
    username: "moco",
    name: "Moco Silva",
    profilePictureUrl: "/avatar-moco.png",
    coverPhotoUrl: "/capa-moco.png",
    category: "Fotógrafo Profissional",
    location: { city: "Belo Horizonte", state: "MG", country: "Brasil" },
    services: [
      { name: "Ensaios Fotográficos", description: "Ensaios em estúdio e externos." }
    ]
  },
  {
    username: "felipealves",
    name: "Felipe Alves",
    profilePictureUrl: "/avatar-felipe.png",
    coverPhotoUrl: "/capa-felipe.png",
    category: "Consultor de Marketing",
    location: { city: "Curitiba", state: "PR", country: "Brasil" },
    services: [
      { name: "Planejamento de Campanhas", description: "Estratégias para redes sociais e Google Ads." }
    ]
  },
  {
    username: "anapereira",
    name: "Ana Pereira",
    profilePictureUrl: "/avatar-ana.png",
    coverPhotoUrl: "/capa-ana.png",
    category: "Arquiteta",
    location: { city: "Porto Alegre", state: "RS", country: "Brasil" },
    services: [
      { name: "Projetos Residenciais", description: "Plantas, 3D e acompanhamento de obra." }
    ]
  },
  {
    username: "brunoribeiro",
    name: "Bruno Ribeiro",
    profilePictureUrl: "/avatar-bruno.png",
    coverPhotoUrl: "/capa-bruno.png",
    category: "Personal Trainer",
    location: { city: "Salvador", state: "BA", country: "Brasil" },
    services: [
      { name: "Treinamento Funcional", description: "Aulas presenciais e online." }
    ]
  },
  {
    username: "carlamartins",
    name: "Carla Martins",
    profilePictureUrl: "/avatar-carla.png",
    coverPhotoUrl: "/capa-carla.png",
    category: "Advogada Trabalhista",
    location: { city: "Recife", state: "PE", country: "Brasil" },
    services: [
      { name: "Consultoria Jurídica", description: "Atendimento para empresas e trabalhadores." }
    ]
  }
];

export default function SearchResults() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users.map((user) => (
        <ModernSearchResultCard key={user.username} user={user} />
      ))}
    </div>
  );
}
*/ 