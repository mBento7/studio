'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: Importar e usar os componentes ClaimBonusButton, ReferralCodeBox, BonusProgress quando implementados
// import { ClaimBonusButton, ReferralCodeBox, BonusProgress } from '@/src/features/credits';

export default function CreditsBonusPage() {
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
      {/* <ClaimBonusButton /> */}
      {/* <ReferralCodeBox /> */}
      {/* <BonusProgress /> */}
      <h1>Bônus e Gamificação</h1>
      <p>Reivindique bônus diários e acompanhe seu progresso.</p>
    </div>
  );
}
