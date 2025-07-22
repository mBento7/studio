'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Share2, MapPin, User, Tag, Hand, Star } from 'lucide-react';
import { tipoConfig } from '@/config/feed';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

// FeedCard interface
export interface FeedCardProps {
  tipo: 'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto' | 'patrocinado';
  titulo: string;
  descricao: string;
  imagem: string;
  preco?: string;
  localizacao?: string;
  patrocinado?: boolean;
  usuario: { nome: string; avatar: string };
  curtidas: number;
  comentarios: number;
  tags?: string[];
  onCurtir?: () => void;
  onComentar?: () => void;
  whatsappUrl?: string;
  urgente?: boolean;
}

const FeedCard = React.forwardRef<HTMLDivElement, FeedCardProps>(({
  tipo = 'oferta_produto',
  titulo = 'Produto Incrível',
  descricao = 'Descrição detalhada do produto ou serviço oferecido com todas as características importantes.',
  imagem = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
  preco = 'R$ 99,90',
  localizacao = 'São Paulo, SP',
  patrocinado = false,
  usuario = { nome: 'João Silva', avatar: 'https://github.com/shadcn.png' },
  curtidas = 24,
  comentarios = 8,
  tags = ['qualidade', 'promoção'],
  onCurtir,
  onComentar,
  whatsappUrl = 'https://wa.me/5511999999',
  urgente = false,
  ...props
}, ref) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(curtidas);
  const router = useRouter();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onCurtir?.();
  };

  const handleContato = () => {
    const username = usuario.nome?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    router.push(`/${username}`);
  };

  const config = tipoConfig[tipo] || tipoConfig['oferta_produto'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto mb-4"
      ref={ref}
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-800/50">
        {/* Imagem de capa */}
        <div className="relative group">
          <img
            src={imagem}
            alt={titulo}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0Ij5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
            }}
          />
          {/* Overlay para efeito visual */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {/* Avatar sobreposto */}
          <div className="absolute -bottom-6 left-6 z-10">
            <Avatar className="w-14 h-14 border-4 border-white shadow-lg">
              <AvatarImage src={usuario.avatar} alt={usuario.nome} />
              <AvatarFallback>{usuario.nome[0]}</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="px-6 pt-8 pb-4">
          {/* Título e badge */}
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-bold text-foreground leading-tight flex-1">{titulo}</h2>
            {patrocinado && (
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white flex items-center gap-1">
                <Star className="w-3 h-3 mr-1" /> Destaque
              </Badge>
            )}
          </div>
          {/* Nome e localização */}
          <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
            <span className="font-medium">{usuario.nome}</span>
            <span>·</span>
            <MapPin className="w-4 h-4" />
            <span>{localizacao}</span>
          </div>
          {/* Preço */}
          <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            {preco}
          </div>
          {/* Descrição */}
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{descricao}</p>
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag, i) => (
                <Badge key={i} variant="secondary" className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">#{tag}</Badge>
              ))}
            </div>
          )}
          {/* Barra de engajamento */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-4">
              <Button
                onClick={handleLike}
                variant={isLiked ? 'default' : 'ghost'}
                size="sm"
                aria-label={isLiked ? 'Descurtir' : 'Curtir'}
                className={cn(isLiked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500')}
              >
                <Heart className={cn('w-4 h-4', isLiked && 'fill-current animate-pulse')}/>
                <span>{likeCount}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Comentar"
                className="text-muted-foreground hover:text-sky-500"
                onClick={onComentar}
              >
                <MessageCircle className="w-4 h-4" />
                <span>{comentarios}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                aria-label="Compartilhar"
                className="text-muted-foreground hover:text-emerald-500"
                onClick={() => {}}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            {/* Botão de contato em destaque */}
            <Button
              onClick={handleContato}
              className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            >
              Contato
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
});

FeedCard.displayName = 'FeedCard';

export { FeedCard };
