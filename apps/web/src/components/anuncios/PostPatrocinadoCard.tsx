import React from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface PostPatrocinadoCardProps {
  usuario: string;
  conteudo: string;
  imagem: string;
  link: string;
}

const PostPatrocinadoCard = ({ usuario, conteudo, imagem, link }: PostPatrocinadoCardProps) => {
  return (
    <Card className="max-w-lg">
      <div className="flex items-center gap-3 p-4">
        <Avatar>
          <AvatarImage src={imagem} alt={usuario} />
          <AvatarFallback>{usuario[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-foreground">{usuario}</h3>
          <span className="text-xs text-muted-foreground">Patrocinado</span>
        </div>
      </div>
      <div className="px-4 pb-4">
        <p className="mb-3 text-muted-foreground">{conteudo}</p>
        <Button asChild className="w-full">
          <a href={link}>Saiba mais</a>
        </Button>
      </div>
    </Card>
  );
};

export default PostPatrocinadoCard;
