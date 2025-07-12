import React from 'react';
import EventCard from '@/components/feed/EventCard';

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

export default function EventsPage() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-foreground">Eventos</h1>
      <p className="text-muted-foreground mb-8">Confira os próximos eventos, participe e desenvolva sua carreira!</p>
      <div className="grid gap-8">
        {eventos.map((evento) => (
          <EventCard key={evento.id} {...evento} />
        ))}
      </div>
    </div>
  );
} 