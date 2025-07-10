import React from 'react';

export default function ArtigoPage({ params }: { params: { slug: string } }) {
  return (
    <div>
      <h1>Artigo: {params.slug}</h1>
      <p>Conteúdo do artigo {params.slug}.</p>
    </div>
  );
} 