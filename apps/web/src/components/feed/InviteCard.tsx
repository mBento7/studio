import React from "react";
import { Share2 } from "lucide-react";

interface InviteCardProps {
  texto: string;
  bonus: string;
  link: string;
}

export function InviteCard({ texto, bonus, link }: InviteCardProps) {
  return (
    <div className="rounded-xl border-2 border-purple-400 p-5 bg-gradient-to-br from-purple-50 via-purple-100 to-white shadow-lg flex flex-col items-center gap-2">
      <Share2 className="w-8 h-8 text-purple-600 mb-2" />
      <div className="font-bold text-lg text-purple-900 text-center">{texto}</div>
      <div className="text-purple-700 font-semibold text-xl">{bonus}</div>
      <a href={link} className="mt-2 px-6 py-2 bg-purple-600 text-white rounded-full font-semibold shadow hover:bg-purple-700 transition">Indicar agora</a>
    </div>
  );
} 