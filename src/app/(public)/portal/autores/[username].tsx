import React from 'react';

export default function AutorPage({ params }: { params: { username: string } }) {
  return (
    <div>
      <h1>Perfil do Autor: {params.username}</h1>
      <p>Informações do autor {params.username}.</p>
    </div>
  );
} 