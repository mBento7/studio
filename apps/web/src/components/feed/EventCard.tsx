import React from "react";
import { Calendar } from "lucide-react";

interface EventCardProps {
  nome: string;
  data: string;
  local: string;
  imagem: string;
  link: string;
}

export function EventCard({ nome, data, local, imagem, link }: EventCardProps) {
  return (
    <a href={link} className="block rounded-xl border shadow-lg bg-gradient-to-br from-orange-50 via-orange-100 to-white p-0 overflow-hidden group">
      <div className="relative h-40 md:h-56 w-full">
        <img src={imagem} alt={nome} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-orange-900/80 via-orange-700/30 to-transparent p-4">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-5 h-5 text-white" />
            <span className="text-white font-bold text-lg drop-shadow">{nome}</span>
          </div>
          <div className="text-orange-100 text-sm font-semibold">{data} - {local}</div>
          <span className="inline-block mt-2 px-4 py-2 bg-orange-500 text-white rounded-full font-semibold shadow hover:bg-orange-600 transition">Ver evento</span>
        </div>
      </div>
    </a>
  );
} 