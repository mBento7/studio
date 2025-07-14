'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { DashboardCard } from '@/components/ui/dashboard-card';
// import { ChartContainer } from '@/components/ui/chart'; // Descomente quando for usar gráficos

// Definição do tipo para os itens do histórico
interface ActivityHistoryItem {
  date: string;
  views: number;
  followers: number;
  engagement: number;
}

export default function ActivityPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Placeholders para dados
  const [activity, setActivity] = useState<{
    viewsToday: number;
    newFollowers: number;
    engagement: number;
    history: ActivityHistoryItem[];
  }>({
    viewsToday: 0,
    newFollowers: 0,
    engagement: 0,
    history: [],
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    // Aqui você pode buscar os dados reais da API/Supabase
    // setActivity(...)
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Sua Atividade</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <DashboardCard
          icon={() => <span>👁️</span>}
          title="Visualizações hoje"
          description="Total de visualizações do seu perfil nas últimas 24h."
          colorClass="bg-blue-100 text-blue-700"
        >
          <div className="text-2xl font-bold">{activity.viewsToday}</div>
        </DashboardCard>
        <DashboardCard
          icon={() => <span>👤</span>}
          title="Novos seguidores"
          description="Novos seguidores conquistados hoje."
          colorClass="bg-green-100 text-green-700"
        >
          <div className="text-2xl font-bold">{activity.newFollowers > 0 ? `+${activity.newFollowers}` : activity.newFollowers}</div>
        </DashboardCard>
        <DashboardCard
          icon={() => <span>📈</span>}
          title="Engajamento"
          description="Taxa de engajamento do seu perfil."
          colorClass="bg-purple-100 text-purple-700"
        >
          <div className="text-2xl font-bold">{activity.engagement}%</div>
        </DashboardCard>
      </div>

      {/* Placeholder para gráfico de atividade */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Evolução da Atividade</h2>
        <div className="h-64 flex items-center justify-center text-muted-foreground">
          {/* <ChartContainer ... /> */}
          <span>Gráfico de visualizações, seguidores e engajamento (em breve)</span>
        </div>
      </div>

      {/* Placeholder para histórico detalhado */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Histórico detalhado</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Data</th>
                <th className="px-4 py-2 text-left">Visualizações</th>
                <th className="px-4 py-2 text-left">Novos seguidores</th>
                <th className="px-4 py-2 text-left">Engajamento (%)</th>
              </tr>
            </thead>
            <tbody>
              {activity.history.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-muted-foreground">Nenhum dado disponível ainda.</td>
                </tr>
              ) : (
                activity.history.map((item, idx) => (
                  <tr key={idx}>
                    <td className="px-4 py-2">{item.date}</td>
                    <td className="px-4 py-2">{item.views}</td>
                    <td className="px-4 py-2">{item.followers > 0 ? `+${item.followers}` : item.followers}</td>
                    <td className="px-4 py-2">{item.engagement}%</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}