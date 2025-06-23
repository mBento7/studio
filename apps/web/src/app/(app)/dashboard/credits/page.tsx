'use client';
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { CreditPackagesGrid, CreditPackage } from '@/components/credits/CreditPackagesGrid';
import { Coins, ArrowUpRight, Gift, History, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
      <h1 className="text-3xl font-bold mb-2 text-foreground dark:text-white">Painel de Créditos</h1>
      {/* Card de saldo com gradiente e ícone */}
      <Card className="mb-6 bg-card border border-black/5 shadow-xl rounded-lg flex flex-col items-center">
        <CardContent className="p-6 text-center">
          <Coins className="w-10 h-10 text-primary mb-2" />
          <h2 className="text-xl font-bold mb-2 text-foreground dark:text-white">Seu saldo</h2>
          <p className="text-4xl font-bold text-primary">{userCredits} créditos</p>
        </CardContent>
      </Card>
      {/* Grid de pacotes de créditos */}
      <div className="my-10">
        <CreditPackagesGrid onBuy={handleBuy} />
      </div>
      {/* Atalhos rápidos com botões padronizados e ícones */}
      <div className="flex gap-4 justify-center my-8">
        <Button className="flex items-center gap-2 bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white rounded-lg font-semibold shadow-md hover:brightness-110 transition px-6 py-2">
          <ArrowUpRight className="w-5 h-5" />Promover anúncio
        </Button>
        <Button className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-semibold shadow-md hover:brightness-110 transition px-6 py-2">
          <Gift className="w-5 h-5" />Ver bônus
        </Button>
        <Button className="flex items-center gap-2 bg-muted text-foreground rounded-lg font-semibold shadow-md hover:bg-muted/80 transition px-6 py-2">
          <History className="w-5 h-5" />Histórico
        </Button>
      </div>
      {/* Tabela real de histórico de transações (mock) */}
      <Card className="my-8 bg-card border border-black/5 shadow-xl rounded-lg overflow-x-auto">
        <CardContent className="p-6">
          <p className="text-lg font-semibold mb-2 text-foreground dark:text-white">Histórico de Créditos</p>
          <table className="w-full border border-border dark:border-slate-700 text-foreground dark:text-white">
            <thead>
              <tr className="bg-muted dark:bg-slate-800">
                <th>Data</th><th>Tipo</th><th>Valor</th><th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className={i % 2 === 0 ? 'bg-background dark:bg-slate-900' : 'bg-muted dark:bg-slate-800'}>
                  <td>{t.date}</td>
                  <td>{t.type}</td>
                  <td className={t.amount.startsWith('+') ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>{t.amount}</td>
                  <td>{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
      {/* Banner de dica */}
      <div className="flex items-center gap-3 bg-accent border-l-4 border-primary text-accent-foreground p-4 rounded-lg my-6 shadow">
        <Info className="w-6 h-6 text-primary" />
        <span className="font-medium">Dica: use créditos para impulsionar seu perfil e alcançar mais pessoas!</span>
      </div>
    </div>
  );
} 