import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// TODO: Importar e usar o componente PaymentStatus quando implementado
// import { PaymentStatus } from '@/src/features/credits';

export default function PaymentConfirmationPage() {
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
      {/* <PaymentStatus /> */}
      <h1>Confirmação de Pagamento</h1>
      <p>Status do pagamento e instruções para o usuário.</p>
    </div>
  );
} 