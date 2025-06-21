import React from "react";

interface ResultadoPromovidoCardProps {
  avatar: string;
  nome: string;
  linkPerfil: string;
  destaque?: boolean;
}

export const ResultadoPromovidoCard: React.FC<ResultadoPromovidoCardProps> = ({ avatar, nome, linkPerfil, destaque }) => (
  <div className={`resultado-promovido-card border rounded p-4 flex items-center bg-white shadow ${destaque ? 'border-yellow-400' : ''}`}>
    <img src={avatar} alt={nome} className="w-12 h-12 rounded-full mr-4" />
    <div className="flex-1">
      <a href={linkPerfil} target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600">{nome}</a>
      {destaque && <span className="ml-2 px-2 py-1 bg-yellow-200 text-yellow-800 text-xs rounded">Promovido</span>}
    </div>
  </div>
); 