"use client";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CreditPackagesGrid, CreditPackage } from '@/components/credits/CreditPackagesGrid';

export default function BuyCreditsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Carregando...</div>;
  }

  async function handleBuy(pkg: CreditPackage) {
    setIsLoading(true);
    try {
      const res = await fetch('/api/payments/mercadopago/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: pkg,
        }),
      });
      const data = await res.json();
      if (data.init_point) {
        if (typeof window !== 'undefined') {
          window.location.href = data.init_point;
        }
      } else {
        alert('Erro ao iniciar pagamento.');
      }
    } catch (e) {
      alert('Erro ao conectar com o Mercado Pago.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Comprar Créditos</h1>
      <CreditPackagesGrid onBuy={handleBuy} />
      {isLoading && <p>Redirecionando para o Mercado Pago...</p>}
    </div>
  );
}