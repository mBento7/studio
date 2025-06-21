import React from "react";

interface BannerBuscaTopoProps {
  imagem: string;
  titulo: string;
  link: string;
}

export const BannerBuscaTopo: React.FC<BannerBuscaTopoProps> = ({ imagem, titulo, link }) => (
  <div className="banner-busca-topo w-full h-40 flex items-center justify-center bg-gray-100 mb-4">
    <a href={link} target="_blank" rel="noopener noreferrer" className="w-full h-full flex items-center justify-center">
      <img src={imagem} alt={titulo} className="object-cover w-full h-full rounded" />
      <span className="sr-only">{titulo}</span>
    </a>
  </div>
); 