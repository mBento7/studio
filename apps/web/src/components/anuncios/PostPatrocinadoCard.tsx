import React from "react";

interface PostPatrocinadoCardProps {
  usuario: string;
  conteudo: string;
  imagem?: string;
  link?: string;
}

export const PostPatrocinadoCard: React.FC<PostPatrocinadoCardProps> = ({ usuario, conteudo, imagem, link }) => (
  <div className="post-patrocinado-card border rounded p-4 bg-white shadow mb-4">
    <div className="flex items-center mb-2">
      <span className="font-bold mr-2">{usuario}</span>
      <span className="px-2 py-1 bg-green-200 text-green-800 text-xs rounded">Patrocinado</span>
    </div>
    <p className="mb-2">{conteudo}</p>
    {imagem && <img src={imagem} alt="imagem do post" className="w-full h-40 object-cover rounded mb-2" />}
    {link && <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Saiba mais</a>}
  </div>
); 