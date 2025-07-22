import React from 'react';

// TODO: Importar e usar o componente PackageEditor quando implementado
// import { PackageEditor } from '@/src/features/credits';

// Força a página a ser dinâmica para evitar prerender
export const dynamic = 'force-dynamic';

export default function AdminCreditPackagesPage() {
  return (
    <div>
      {/* <PackageEditor /> */}
      <h1>Administração de Pacotes de Créditos</h1>
      <p>Gerencie pacotes de créditos disponíveis para venda.</p>
    </div>
  );
}
