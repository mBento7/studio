"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Heart, MessageCircle, Share2, MapPin, User, Tag, Hand, Star } from "lucide-react";

// Badge component
const badgeVariants = "inline-flex items-center justify-center rounded-full border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 border-transparent bg-primary text-primary-foreground";
function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(badgeVariants, className)} {...props}>{children}</div>;
}

// Avatar components
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    >
      {children}
    </div>
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<HTMLImageElement, React.ImgHTMLAttributes<HTMLImageElement>>(
  ({ className, ...props }, ref) => (
    <img
      ref={ref}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  )
);
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-secondary text-xs font-medium text-secondary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
AvatarFallback.displayName = "AvatarFallback";

// Button component
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
}>(({ className, variant = "default", size = "default", ...props }, ref) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-11 rounded-md px-8",
    icon: "h-8 w-8"
  };
  return (
    <button
      className={cn(baseClasses, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// FeedCard interface
interface FeedCardProps {
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

// tipoConfig para diferenciar visualmente
const tipoConfig = {
  oferta_servico: {
    bg: "bg-blue-50 dark:bg-blue-900/30",
    badge: "Oferta de Serviço",
    icon: <Tag className="w-4 h-4 mr-1 text-blue-500" />,
  },
  oferta_produto: {
    bg: "bg-green-50 dark:bg-green-900/30",
    badge: "Oferta de Produto",
    icon: <Star className="w-4 h-4 mr-1 text-green-500" />,
  },
  patrocinado: {
    bg: "bg-yellow-50 dark:bg-yellow-900/30",
    badge: "Patrocinado",
    icon: <Star className="w-4 h-4 mr-1 text-yellow-500" />,
  },
  solicitacao_servico: {
    bg: "bg-orange-50 dark:bg-orange-900/30",
    badge: "Solicitação de Serviço",
    icon: <Hand className="w-4 h-4 mr-1 text-orange-500" />,
  },
  solicitacao_produto: {
    bg: "bg-amber-50 dark:bg-amber-900/30",
    badge: "Solicitação de Produto",
    icon: <Hand className="w-4 h-4 mr-1 text-amber-500" />,
  },
};

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
  whatsappUrl = 'https://wa.me/5511999999999',
  urgente = false,
  ...props
}, ref) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(curtidas);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
    onCurtir?.();
  };

  const handleWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };

  const handleLocation = () => {
    // Simular ação de localização
    console.log('Mostrar localização:', localizacao);
  };

  const config = tipoConfig[tipo] || tipoConfig['oferta_produto'];

  return (
    <div
      ref={ref}
      className={cn(
        "w-full max-w-2xl mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-lg overflow-hidden transition-all hover:shadow-xl bg-white dark:bg-zinc-900 flex flex-col",
        config.bg,
        patrocinado && "ring-2 ring-yellow-400 dark:ring-yellow-500",
        urgente && "ring-2 ring-red-400 dark:ring-red-500"
      )}
      style={{ minHeight: 'unset' }}
      {...props}
    >
      {/* Imagem de capa no topo */}
      <div className="relative w-full aspect-[4/2] md:aspect-[3/1] max-h-48 overflow-hidden bg-muted">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover"
          style={{ maxHeight: 192 }}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0Ij5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
      </div>
      {/* Conteúdo mais compacto */}
      <div className="flex-1 flex flex-col justify-between min-w-0 p-3 md:p-4">
        {/* Header com usuário e badges */}
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar>
              <AvatarImage src={usuario.avatar} alt={usuario.nome} />
              <AvatarFallback>
                <User className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground truncate">
                {usuario.nome}
              </p>
              <p className="text-[10px] text-muted-foreground capitalize flex items-center">
                {config.icon}{config.badge}
              </p>
            </div>
          </div>
          <div className="flex gap-1">
            {patrocinado && (
              <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 text-[10px] px-2 py-0.5">
                Patrocinado
              </Badge>
            )}
            {urgente && (
              <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 text-[10px] px-2 py-0.5">
                Urgente
              </Badge>
            )}
          </div>
        </div>
        {/* Título e descrição mais compactos */}
        <div>
          <h3 className="font-bold text-base text-foreground line-clamp-1 mb-0.5 md:text-lg md:mb-1">
            {titulo}
          </h3>
          <p className="text-xs text-muted-foreground line-clamp-2 md:text-sm md:line-clamp-2">
            {descricao}
          </p>
        </div>
        {/* Preço */}
        {preco && (
          <div className="flex items-center justify-between mt-1">
            <span className="text-base font-bold text-green-600 dark:text-green-400">
              {preco}
            </span>
          </div>
        )}
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-[10px] px-2 py-0.5 rounded-full"
              >
                #{tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-[10px] px-2 py-0.5 rounded-full">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        {/* Localização */}
        {localizacao && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span className="truncate">{localizacao}</span>
          </div>
        )}
        {/* Footer com ações mais compacto */}
        <div className="border-t border-border pt-2 mt-2 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={cn(
                "gap-1 text-xs transition-colors py-1 px-2",
                isLiked ? "text-red-500 hover:text-red-600" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
              {likeCount}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onComentar}
              className="gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors py-1 px-2"
            >
              <MessageCircle className="h-4 w-4" />
              {comentarios}
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLocation}
              className="text-muted-foreground hover:text-foreground transition-colors py-1 px-2"
            >
              <MapPin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleWhatsApp}
              className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 transition-colors py-1 px-2"
            >
              <Share2 className="h-4 w-4 mr-1" />
              WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
});

FeedCard.displayName = "FeedCard";

export { FeedCard };
