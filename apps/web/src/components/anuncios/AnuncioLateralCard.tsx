import React from "react";

interface AnuncioLateralCardProps {
  imagem: string;
  titulo: string;
  link: string;
  descricao?: string;
}

export const AnuncioLateralCard: React.FC<AnuncioLateralCardProps> = ({ imagem, titulo, link, descricao }) => (
  <div className="anuncio-lateral-card advertisement-shadow border rounded p-4 flex flex-col items-center bg-white shadow">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imagem} alt={titulo} className="w-32 h-32 object-cover mb-2 rounded" />
      <h3 className="font-bold text-lg text-center mb-1">{titulo}</h3>
      {descricao && <p className="text-sm text-gray-600 text-center">{descricao}</p>}
    </a>
  </div>
); 