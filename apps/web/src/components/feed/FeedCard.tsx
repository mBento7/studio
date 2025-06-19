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
        "w-full mx-auto rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow-xl overflow-hidden transition-all hover:shadow-2xl bg-white dark:bg-zinc-900 flex flex-row items-center gap-8 mb-8 p-8",
        config.bg,
        patrocinado && "ring-2 ring-yellow-400 dark:ring-yellow-500",
        urgente && "ring-2 ring-red-400 dark:ring-red-500"
      )}
      style={{ minHeight: 'unset' }}
      {...props}
    >
      {/* Imagem lateral esquerda ainda maior */}
      <div className="flex-shrink-0 w-44 h-44 rounded-2xl overflow-hidden bg-muted">
        <img
          src={imagem}
          alt={titulo}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjOUNBM0FGIiBmb250LXNpemU9IjE0Ij5JbWFnZW0gbsOjbyBlbmNvbnRyYWRhPC90ZXh0Pgo8L3N2Zz4K';
          }}
        />
      </div>
      {/* Conteúdo à direita */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        {/* Título no topo */}
        <span className="font-bold text-xl text-foreground truncate block mb-1">{titulo}</span>
        {/* Imagem de perfil, ícone e badge do tipo de post */}
        <div className="mb-3 flex items-center gap-3">
          {/* Imagem de perfil quadrada com cantos arredondados */}
          <img src={usuario.avatar} alt={usuario.nome} className="w-12 h-12 object-cover rounded-lg border border-border" />
          <span className="flex-shrink-0 flex items-center gap-1">
            {config.icon}
            <span className="uppercase text-xs font-semibold text-muted-foreground tracking-wide">{config.badge}</span>
          </span>
        </div>
        <p className="text-base text-muted-foreground truncate block">{descricao}</p>
        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-3 mb-3">
            {tags.map((tag, i) => (
              <Badge key={i} className="bg-primary/10 text-primary border-primary/20 text-sm">#{tag}</Badge>
            ))}
          </div>
        )}
        {/* Ações */}
        <div className="flex items-center gap-4 mt-3 mb-2">
          <button
            onClick={handleLike}
            className={cn(
              "flex items-center gap-2 text-base transition-colors",
              isLiked
                ? "text-rose-600"
                : "text-muted-foreground hover:text-rose-600"
            )}
          >
            <Heart className={cn("w-5 h-5", isLiked && "fill-current")} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center gap-2 text-base text-muted-foreground hover:text-blue-500 transition-colors">
            <MessageCircle className="w-5 h-5" />
            <span>{comentarios}</span>
          </button>
          {/* CTA: Entrar em contato */}
          <button className="flex items-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm shadow hover:scale-105 transition-transform">
            Entrar em contato
          </button>
        </div>
      </div>
    </div>
  );
});

FeedCard.displayName = "FeedCard";

export { FeedCard };
