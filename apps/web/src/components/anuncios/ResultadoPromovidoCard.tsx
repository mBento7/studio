import React from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';

interface ResultadoPromovidoCardProps {
  avatar: string;
  nome: string;
  linkPerfil: string;
  destaque?: boolean;
}

const ResultadoPromovidoCard = ({ avatar, nome, linkPerfil, destaque }: ResultadoPromovidoCardProps) => {
  return (
    <Card className={cn("max-w-lg flex items-center gap-4 p-4", destaque && "border-2 border-yellow-400")}> 
      <Avatar>
        <AvatarImage src={avatar} alt={nome} />
        <AvatarFallback>{nome[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="font-bold text-foreground">{nome}</h3>
        {destaque && <Badge variant="secondary">Destaque</Badge>}
        <a href={linkPerfil} className="block text-blue-600 hover:underline text-sm mt-1">Ver perfil</a>
      </div>
    </Card>
  );
};

export default ResultadoPromovidoCard; 