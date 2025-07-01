import React from "react";

interface BannerCardProps {
  imagem: string;
  texto: string;
  link: string;
}

export function BannerCard({ imagem, texto, link }: BannerCardProps) {
  return (
    <a href={link} className="block my-4 relative rounded-xl overflow-hidden shadow-lg group">
      <img src={imagem} alt={texto} className="w-full h-40 md:h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-white text-xl md:text-2xl font-bold drop-shadow-lg">{texto}</span>
        <div>
          <span className="inline-block mt-2 px-4 py-2 bg-primary text-white rounded-full font-semibold shadow hover:bg-primary/80 transition">Ver detalhes</span>
        </div>
      </div>
    </a>
  );
} 