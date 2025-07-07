import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NotificacaoPatrocinadaProps {
  mensagem: string;
  link: string;
}

const NotificacaoPatrocinada = ({ mensagem, link }: NotificacaoPatrocinadaProps) => {
  return (
    <Card className="max-w-lg flex items-center gap-4 p-4">
      <div className="p-2 rounded-full bg-green-500 text-white">
        <Bell className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <span className="block text-foreground mb-1">{mensagem}</span>
        <a href={link} className="text-blue-600 hover:underline text-sm">Ver oferta</a>
      </div>
    </Card>
  );
};

export default NotificacaoPatrocinada; 