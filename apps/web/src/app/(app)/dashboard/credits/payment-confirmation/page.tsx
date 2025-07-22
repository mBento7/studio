'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// TODO: Importar e usar o componente PaymentStatus quando implementado
// import { PaymentStatus } from '@/src/features/credits';

export default function PaymentConfirmationPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected' | 'error' | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Lê os parâmetros do Mercado Pago
    if (!searchParams) {
      setStatus('error');
      setMessage('Parâmetros de pagamento não encontrados.');
      return;
    }
    const paymentId = searchParams.get('payment_id');
    const statusParam = searchParams.get('status');
    if (!paymentId) {
      setStatus('error');
      setMessage('Pagamento não encontrado.');
      return;
    }
    // Chama a API para validar e creditar
    fetch(`/api/payments/mercadopago/validate?payment_id=${paymentId}`)
      .then(res => res.json())
      .then(data => {
        setStatus(data.status);
        setMessage(data.message);
      })
      .catch(() => {
        setStatus('error');
        setMessage('Erro ao validar pagamento.');
      });
  }, [searchParams]);

  if (loading || !user) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      {/* <PaymentStatus /> */}
      <h1>Confirmação de Pagamento</h1>
      {status === 'approved' && <p className="text-green-600 font-bold">Pagamento aprovado! Créditos adicionados à sua conta.</p>}
      {status === 'pending' && <p className="text-yellow-600 font-bold">Pagamento pendente. Aguarde a confirmação.</p>}
      {status === 'rejected' && <p className="text-red-600 font-bold">Pagamento rejeitado. Tente novamente.</p>}
      {status === 'error' && <p className="text-red-600 font-bold">{message}</p>}
      {!status && <p>Verificando pagamento...</p>}
      <p>{message}</p>
      <button onClick={() => router.push('/dashboard/credits')}>Voltar ao painel de créditos</button>
    </div>
  );
}
