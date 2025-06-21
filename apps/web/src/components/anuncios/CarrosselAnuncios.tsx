import React from "react";

interface CarrosselAnunciosProps {
  anuncios: { imagem: string; titulo: string; link: string }[];
}

export const CarrosselAnuncios: React.FC<CarrosselAnunciosProps> = ({ anuncios }) => (
  <div className="carrossel-anuncios flex space-x-4 overflow-x-auto py-2">
    {anuncios.map((anuncio, idx) => (
      <a
        key={idx}
        href={anuncio.link}
        target="_blank"
        rel="noopener noreferrer"
        className="min-w-[200px] max-w-[200px] bg-white rounded shadow p-2 flex flex-col items-center"
      >
        <img src={anuncio.imagem} alt={anuncio.titulo} className="w-full h-24 object-cover rounded mb-2" />
        <span className="font-bold text-sm text-center">{anuncio.titulo}</span>
      </a>
    ))}
  </div>
); 