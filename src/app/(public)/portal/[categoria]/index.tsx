import React from 'react';

export default function CategoriaPage({ params }: { params: { categoria: string } }) {
  return (
    <div>
      <h1>Categoria: {params.categoria}</h1>
      <p>Conteúdo da categoria {params.categoria}.</p>
    </div>
  );
} 