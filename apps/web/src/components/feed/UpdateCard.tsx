import React from "react";
import { Sparkles } from "lucide-react";

interface UpdateCardProps {
  titulo: string;
  descricao: string;
  data: string;
}

export function UpdateCard({ titulo, descricao, data }: UpdateCardProps) {
  return (
    <div className="rounded-xl border shadow bg-gradient-to-br from-blue-50 via-blue-100 to-white p-5 flex items-start gap-4">
      <div className="flex-shrink-0">
        <Sparkles className="w-8 h-8 text-blue-500" />
      </div>
      <div>
        <div className="font-bold text-lg text-blue-900 mb-1">{titulo}</div>
        <div className="text-gray-700 mb-2">{descricao}</div>
        <div className="text-xs text-blue-700 font-semibold">{data}</div>
      </div>
    </div>
  );
} 