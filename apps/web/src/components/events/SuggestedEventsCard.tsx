import React from 'react';
import Link from 'next/link';

interface SuggestedEvent {
  id: string;
  name: string;
  date: string;
  image: string;
}

interface SuggestedEventsCardProps {
  sugestoes: SuggestedEvent[];
}

export function SuggestedEventsCard({ sugestoes }: SuggestedEventsCardProps) {
  return (
    <div className="bg-card rounded-xl border border-border p-6 mb-4">
      <h3 className="text-xl font-bold mb-4">Outros eventos para você</h3>
      <div className="flex flex-col gap-4">
        {sugestoes.map(sugestao => (
          <Link key={sugestao.id} href={`/events/${sugestao.id}`} className="hover:opacity-90 transition">
            <div className="flex gap-4 items-center">
              <img src={sugestao.image} alt={sugestao.name} className="w-14 h-14 object-cover rounded-lg border" />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm line-clamp-2">{sugestao.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{new Date(sugestao.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}