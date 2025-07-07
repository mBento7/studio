import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Gift } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InviteCardProps {
  texto: string;
  bonus: string;
  link: string;
}

const InviteCard = ({ texto, bonus, link }: InviteCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 p-4">
      <div className="p-4 flex flex-col items-center text-center">
        <Gift className="w-8 h-8 text-yellow-400 mb-2" />
        <span className="font-bold text-lg mb-1">{texto}</span>
        <span className="text-green-600 font-semibold mb-2">{bonus}</span>
        <Button asChild variant="outline">
          <a href={link}>Convidar amigos</a>
        </Button>
      </div>
    </Card>
  );
};

export default InviteCard; 