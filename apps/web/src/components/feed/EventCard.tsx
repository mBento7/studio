'use client';
import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, MapPin, Users, Heart, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import Link from 'next/link';

interface EventCardProps {
  id: string;
  name: string;
  date: string;
  location: string;
  image: string;
  attendees?: number;
  price?: string;
  description?: string;
}

const EventCard = ({
  id,
  name,
  date,
  location,
  image,
  attendees = 0,
  price = '',
  description = 'Participe deste evento incrível com especialistas da área!'
}: EventCardProps) => {
  const [isInterested, setIsInterested] = useState(false);
  const eventDate = new Date(date);
  const isFree = price.trim().toLowerCase() === 'grátis' || price.trim() === '0' || price.trim() === 'R$ 0,00';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      <Card className="w-full h-full flex flex-col overflow-hidden bg-background border border-border shadow-lg hover:shadow-xl transition-all duration-300">
        {/* Imagem do evento */}
        <div className="relative overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute top-4 left-4">
            <Badge className="bg-muted text-foreground flex items-center gap-1 px-2 py-1 text-xs font-semibold shadow">
              <Calendar className="w-3 h-3 mr-1" /> Evento
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Badge
              className={cn(
                'px-2 py-1 text-xs font-semibold shadow',
                isFree ? 'bg-green-500 text-white' : 'bg-white/90 text-black'
              )}
            >
              {isFree ? 'Grátis' : price}
            </Badge>
          </div>
        </div>
        {/* Conteúdo */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-foreground line-clamp-2">{name}</h3>
            <motion.button
              onClick={() => setIsInterested(!isInterested)}
              className={cn(
                'p-2 rounded-lg transition-colors ml-2',
                isInterested ? 'text-red-500 bg-red-50' : 'text-muted-foreground hover:text-foreground'
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Marcar como interessado"
            >
              <Heart className={cn('w-5 h-5', isInterested && 'fill-current')} />
            </motion.button>
          </div>
          <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
          {/* Detalhes do evento */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="font-medium">
                {eventDate.toLocaleDateString('pt-BR', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span>{location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-primary" />
              <span>{attendees} pessoas interessadas</span>
            </div>
          </div>
          {/* Botões de ação */}
          <div className="flex gap-2 mt-auto">
            <Link href={`/events/${id}`} className="flex-1">
              <Button className="w-full" variant="default">
                <Calendar className="w-4 h-4 mr-2" />
                Participar
              </Button>
            </Link>
            <Button variant="outline" size="icon" aria-label="Compartilhar evento">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default EventCard;
