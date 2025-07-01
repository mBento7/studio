import React from "react";
import { Percent } from "lucide-react";

interface CouponCardProps {
  codigo: string;
  desconto: string;
  validade: string;
  descricao: string;
}

export function CouponCard({ codigo, desconto, validade, descricao }: CouponCardProps) {
  return (
    <div className="rounded-xl border-2 border-green-400 p-5 bg-gradient-to-br from-green-50 via-green-100 to-white shadow-lg flex flex-col items-center gap-2">
      <div className="flex items-center gap-2 mb-2">
        <Percent className="w-6 h-6 text-green-600" />
        <span className="font-bold text-2xl text-green-800">{desconto} OFF</span>
      </div>
      <div className="font-mono text-lg bg-green-200 text-green-900 px-4 py-1 rounded-lg tracking-widest shadow">{codigo}</div>
      <div className="text-xs text-gray-500 mb-2">Válido até {validade}</div>
      <div className="text-sm text-center text-green-900">{descricao}</div>
      <button className="mt-2 px-6 py-2 bg-green-600 text-white rounded-full font-semibold shadow hover:bg-green-700 transition">Resgatar</button>
    </div>
  );
} 