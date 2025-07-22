import React from 'react';
import { Button } from '@/components/ui/button';

export function PlanGate({ required, plan, children }: { required: string; plan: string; children: React.ReactNode }) {
  if (plan === 'premium' || plan === required || required === 'free') return <>{children}</>;
  return (
    <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center z-10 rounded shadow-lg p-6">
      <h4 className="text-lg font-bold mb-2 text-primary">Disponível apenas no plano {required}</h4>
      <Button onClick={() => alert('Faça upgrade para acessar este recurso!')}>Fazer upgrade</Button>
    </div>
  );
}
