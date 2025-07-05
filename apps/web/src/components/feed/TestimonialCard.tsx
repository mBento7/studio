import React from "react";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  usuario: { nome: string; avatar: string };
  nota: number;
  comentario: string;
  servico: string;
  imagem: string;
}

export function TestimonialCard({ usuario, nota, comentario, servico, imagem }: TestimonialCardProps) {
  return (
    <div className="rounded-xl border shadow bg-gradient-to-br from-yellow-50 via-yellow-100 to-white p-5 flex items-center gap-4">
      <img src={imagem} alt={usuario.nome} className="w-16 h-16 rounded-full border-2 border-yellow-300 shadow" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-lg text-yellow-900">{usuario.nome}</span>
          <span className="flex items-center gap-0.5">
            {[...Array(nota)].map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}
          </span>
        </div>
        <div className="text-xs text-yellow-800 mb-1">{servico}</div>
        <div className="text-gray-700 text-sm">{comentario}</div>
      </div>
    </div>
  );
} 