'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: Importar e usar o componente CreditHistoryTable quando implementado
// import { CreditHistoryTable } from '@/src/features/credits';

export default function CreditsHistoryPage() {
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

  return (
    <div>
      {/* <CreditHistoryTable filters /> */}
      <h1>Histórico de Créditos</h1>
      <p>Veja todas as transações de créditos do usuário.</p>
    </div>
  );
}
