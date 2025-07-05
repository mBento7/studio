import React from "react";
import { Star, Megaphone } from "lucide-react";

interface SponsoredAdCardProps {
  titulo: string;
  descricao: string;
  imagem: string;
  link: string;
  usuarioId?: string;
}

export function SponsoredAdCard({ titulo, descricao, imagem, link, usuarioId }: SponsoredAdCardProps) {
  const user = usuarioId ? mockUserProfiles.find(u => u.id === usuarioId) : undefined;

  return (
    <div className="rounded-xl border shadow-lg bg-gradient-to-br from-yellow-50 via-yellow-100 to-white p-4 flex flex-col md:flex-row items-center gap-4 hover:scale-[1.01] transition-transform">
      <img src={imagem} alt={titulo} className="w-24 h-24 object-cover rounded-lg shadow-md border border-yellow-200" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Megaphone className="text-yellow-500 w-5 h-5" />
          <span className="font-bold text-lg text-yellow-900">{titulo}</span>
          <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-0.5 rounded">Patrocinado</span>
        </div>
        <p className="text-gray-700 mb-2">{descricao}</p>
        {user && (
          <div className="flex items-center gap-2 mb-2">
            <img src={user.profile_picture_url} alt={user.name} className="w-8 h-8 rounded-full border-2 border-yellow-300" />
            <span className="text-sm font-medium text-yellow-900">{user.name}</span>
            <Star className="w-4 h-4 text-yellow-400" />
          </div>
        )}
        <a href={link} className="inline-block mt-2 px-4 py-2 bg-yellow-500 text-white rounded-full font-semibold shadow hover:bg-yellow-600 transition">Saiba mais</a>
      </div>
    </div>
  );
} 