'use client';
import { useParams } from 'next/navigation';
import EventCard from '@/components/feed/EventCard';
import Link from 'next/link';
import React from 'react';

// Mock de eventos (poderia ser importado de um arquivo ou contexto)
const eventos = [
  {
    id: 'coordenacao-producao-2025',
    name: 'Coordenação da Produção: Desenvolvendo Pessoas e Resultados',
    date: '2025-07-10T19:00:00',
    location: 'Online - Produttare Digital',
    image: '/banners/institucional1.png',
    attendees: 1007,
    price: 'Grátis',
    description: 'Masterclass para profissionais de produção, coordenação industrial e áreas correlatas. Aprimore suas habilidades na coordenação estratégica da produção!'
  },
  {
    id: 'fellowship-aesthetic-medicine',
    name: 'Fellowship in Aesthetic Medicine',
    date: '2025-07-11T18:00:00',
    location: 'PSP MED',
    image: '/banners/oferta1.png',
    attendees: 350,
    price: 'R$ 120,00',
    description: 'Evento exclusivo para profissionais da área de estética. Aprenda com especialistas renomados.'
  },
  {
    id: 'annual-william-bill',
    name: '12th Annual William “Bill”...',
    date: '2025-07-12T09:00:00',
    location: 'Martindale Bri...',
    image: '/banners/patrocinado1.png',
    attendees: 200,
    price: 'Grátis',
    description: 'Torne-se parte de um dos maiores eventos de networking e aprendizado do setor.'
  },
  {
    id: 'design-conference-2024',
    name: 'Design Conference 2024',
    date: '2025-07-11T10:00:00',
    location: 'São Paulo, SP',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    attendees: 120,
    price: 'R$ 150,00',
    description: 'Participe deste evento incrível com especialistas da área!'
  }
];

export default function EventDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;

  // Busca o evento atual
  const evento = eventos.find(e => e.id === id);
  // Sugestões: outros eventos
  const sugestoes = eventos.filter(e => e.id !== id).slice(0, 3);

  if (!evento) {
    return (
      <div className="max-w-2xl mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
        <Link href="/events" className="text-primary underline">Voltar para eventos</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-10 px-4">
      {/* Coluna principal */}
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-extrabold mb-4 text-primary">Ambiente de Teste de Evento</h1>
        <EventCard {...evento} />
        {/* Detalhes extras do evento podem ser adicionados aqui */}
        <div className="mt-8 p-6 bg-card rounded-xl border border-border">
          <h2 className="text-lg font-semibold mb-2">Sobre o evento</h2>
          <p className="text-muted-foreground mb-2">{evento.description}</p>
          <hr className="my-4 border-dashed" />
          <p className="text-sm text-muted-foreground">Local: {evento.location}</p>
          <p className="text-sm text-muted-foreground">Data: {new Date(evento.date).toLocaleString('pt-BR', { dateStyle: 'full', timeStyle: 'short' })}</p>
          <div className="mt-6 flex gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Testar ação</button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition">Outro botão</button>
          </div>
          <div className="mt-8">
            <h3 className="font-bold mb-2">Texto fictício para visualização:</h3>
            <p className="text-xs text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc, eget aliquam massa nisl quis neque. Proin ac facilisis nulla. Integer euismod, urna eu tincidunt consectetur, nisi nisl aliquam nunc.</p>
          </div>
        </div>
      </div>
      {/* Coluna direita: sugestões */}
      <aside className="w-full md:w-80 flex-shrink-0">
        <div className="bg-card rounded-xl border border-border p-4 mb-4">
          <h3 className="text-base font-bold mb-4">Outros eventos para você</h3>
          <div className="flex flex-col gap-4">
            {sugestoes.map(sugestao => (
              <Link key={sugestao.id} href={`/events/${sugestao.id}`} className="hover:opacity-90 transition">
                <div className="flex gap-3 items-center">
                  <img src={sugestao.image} alt={sugestao.name} className="w-16 h-16 object-cover rounded-md border" />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm line-clamp-2">{sugestao.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{new Date(sugestao.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="bg-muted rounded-xl border border-border p-4 text-center">
          <span className="block text-xs text-muted-foreground mb-2">Espaço para banners ou anúncios de teste</span>
          <div className="h-16 bg-gray-200 rounded" />
        </div>
      </aside>
    </div>
  );
}
