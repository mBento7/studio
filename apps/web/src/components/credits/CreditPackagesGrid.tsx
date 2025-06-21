import React from "react";

export type CreditPackage = {
  name: string;
  credits: number;
  price: number;
  bonus: number;
  bestValue?: boolean;
};

interface CreditPackagesGridProps {
  onBuy: (pkg: CreditPackage) => void;
}

export function CreditPackagesGrid({ onBuy }: CreditPackagesGridProps) {
  const packages: CreditPackage[] = [
    { name: "Pacote Básico", credits: 100, price: 19.9, bonus: 0 },
    { name: "Pacote Pro", credits: 250, price: 49.9, bonus: 10, bestValue: true },
    { name: "Pacote Business", credits: 500, price: 89.9, bonus: 20 },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
      {packages.map((pkg) => (
        <div
          key={pkg.name}
          className={`flex flex-col border rounded-lg p-6 shadow ${pkg.bestValue ? "border-blue-500" : ""}`}
        >
          {pkg.bestValue && (
            <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded mb-2 self-center">Melhor Custo-Benefício</span>
          )}
          <h2 className="text-xl font-bold mb-2">{pkg.name}</h2>
          <p className="text-4xl font-bold mb-1">{pkg.credits} <span className="text-base font-normal">créditos</span></p>
          {pkg.bonus > 0 && <p className="text-green-600 font-semibold mb-2">+ {pkg.bonus}% de bônus!</p>}
          <p className="mb-4 text-gray-400">Ideal para começar a impulsionar seu perfil.</p>
          <p className="text-2xl font-bold mb-4">R$ {pkg.price.toFixed(2)}</p>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded font-bold hover:bg-blue-700 transition"
            onClick={() => onBuy(pkg)}
          >
            Comprar
          </button>
        </div>
      ))}
    </div>
  );
} 