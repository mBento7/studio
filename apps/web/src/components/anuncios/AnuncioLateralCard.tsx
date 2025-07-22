import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface AnuncioLateralCardProps {
  imagem: string;
  titulo: string;
  descricao: string;
  link: string;
}

const AnuncioLateralCard = ({ imagem, titulo, descricao, link }: AnuncioLateralCardProps) => {
  return (
    <Card className="max-w-lg">
      <img src={imagem} alt={titulo} className="w-full h-40 object-cover rounded-t-2xl" />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{titulo}</h3>
        <p className="text-muted-foreground mb-2">{descricao}</p>
        <Button asChild className="w-full mt-2">
          <a href={link}>Ver perfil</a>
        </Button>
      </div>
    </Card>
  );
};

export default AnuncioLateralCard;
