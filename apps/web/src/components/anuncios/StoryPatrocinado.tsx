import React from "react";

interface StoryPatrocinadoProps {
  imagem: string;
  link: string;
  titulo?: string;
}

export const StoryPatrocinado: React.FC<StoryPatrocinadoProps> = ({ imagem, link, titulo }) => (
  <div className="story-patrocinado w-24 h-40 rounded-lg overflow-hidden shadow relative">
    <a href={link} target="_blank" rel="noopener noreferrer">
      <img src={imagem} alt={titulo || "Story patrocinado"} className="w-full h-full object-cover" />
      {titulo && <span className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">{titulo}</span>}
    </a>
  </div>
); 