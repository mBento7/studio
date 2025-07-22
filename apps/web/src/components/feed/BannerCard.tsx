import React from 'react';
import { Card } from '../ui/card';

interface BannerCardProps {
  imagem: string;
  texto: string;
  link: string;
}

const BannerCard = ({ imagem, texto, link }: BannerCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 p-4 overflow-hidden">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={imagem} alt={texto} className="w-full h-32 object-cover" />
        <div className="p-4 text-center">
          <span className="text-lg font-bold text-foreground">{texto}</span>
        </div>
      </a>
    </Card>
  );
};

export default BannerCard;
