"use client";

import { ReferralProgram } from '@/features/dashboard/referral-program';

export default function ReferralsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Programa de Indicações</h1>
        <p className="text-muted-foreground">
          Convide seus amigos e colegas para o WhosDo e ganhe recompensas por cada novo membro que se juntar.
        </p>
      </div>
      <ReferralProgram />
    </div>
  );
}
