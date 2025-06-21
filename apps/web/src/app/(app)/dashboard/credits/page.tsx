'use client';
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreditPackagesGrid, CreditPackage } from '@/components/credits/CreditPackagesGrid';
import { Coins, ArrowUpRight, Gift, History, Info } from 'lucide-react';

// TODO: Importar e usar os componentes reais quando implementados
// import { CreditDashboardCard, CreditHistoryTable, CreditPackageCard, BuyCreditsModal, DailyBonusButton, PremiumShortcuts } from '@/src/features/credits';

const userCredits = 1000000; // mock
const transactions = [
  { date: '2024-06-10', type: 'Compra', amount: '+250', desc: 'Pacote Pro' },
  { date: '2024-06-12', type: 'Promoção', amount: '-50', desc: 'Banner na Busca' },
  { date: '2024-06-13', type: 'Bônus', amount: '+10', desc: 'Bônus diário' },
];

export default function CreditsDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Carregando...</div>;
  }

  const handleBuy = (pkg: CreditPackage) => {
    alert(`Comprar: ${pkg.name} - R$ ${pkg.price}`);
    // Aqui você pode abrir um modal, iniciar pagamento, etc.
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2">Painel de Créditos</h1>
      {/* Card de saldo com gradiente e ícone */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 rounded-lg p-6 text-center mb-6 flex flex-col items-center shadow">
        <Coins className="w-10 h-10 text-blue-500 mb-2" />
        <h2 className="text-xl font-bold mb-2">Seu saldo</h2>
        <p className="text-4xl font-bold text-blue-600">{userCredits} créditos</p>
      </div>
      {/* Grid de pacotes de créditos */}
      <div className="my-10">
        <CreditPackagesGrid onBuy={handleBuy} />
      </div>
      {/* Atalhos rápidos com botões padronizados e ícones */}
      <div className="flex gap-4 justify-center my-8">
        <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl font-semibold shadow hover:bg-green-700 transition"><ArrowUpRight className="w-5 h-5" />Promover anúncio</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-xl font-semibold shadow hover:bg-purple-700 transition"><Gift className="w-5 h-5" />Ver bônus</button>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl font-semibold shadow hover:bg-gray-700 transition"><History className="w-5 h-5" />Histórico</button>
      </div>
      {/* Tabela real de histórico de transações (mock) */}
      <div className="bg-white/5 rounded-lg p-6 border border-gray-700 my-8 overflow-x-auto">
        <p className="text-lg font-semibold mb-2">Histórico de Créditos</p>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Data</th><th>Tipo</th><th>Valor</th><th>Descrição</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td>{t.date}</td>
                <td>{t.type}</td>
                <td className={t.amount.startsWith('+') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{t.amount}</td>
                <td>{t.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Banner de dica */}
      <div className="flex items-center gap-3 bg-teal-50 border-l-4 border-teal-400 p-4 rounded my-6">
        <Info className="w-6 h-6 text-teal-600" />
        <span className="text-teal-800 font-medium">Dica: use créditos para impulsionar seu perfil e alcançar mais pessoas!</span>
      </div>
    </div>
  );
} 