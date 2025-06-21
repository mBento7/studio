"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Heart, MessageCircle, Share2, MapPin, User, Tag, Hand, Star } from "lucide-react";
import { tipoConfig } from "@/config/feed";

// Badge component
const badgeVariants = "inline-flex items-center justify-center border px-1.5 text-xs font-medium leading-normal transition-colors outline-offset-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 border-transparent bg-primary text-primary-foreground";
function Badge({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(badgeVariants, className)} {...props}>{children}</div>;
}

// Avatar components
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("relative flex h-8 w-8 shrink-0 overflow-hidden", className)}
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
        "flex h-full w-full items-center justify-center bg-secondary text-xs font-medium text-secondary-foreground",
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
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-11 px-8",
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
    <Card
      ref={ref}
      className={cn(
        "w-full mx-auto p-3 shadow-lg rounded-md bg-card/90 border-0 mb-6 hover:shadow-xl transition-all"
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full bg-card rounded-md shadow-xl overflow-hidden border border-black/5 dark:border-white/10",
          "flex flex-row items-start gap-5 p-5",
          config.shadow,
          patrocinado && "bg-gradient-to-tr from-yellow-50/50 via-orange-50/50 to-red-50/50 dark:from-yellow-900/10 dark:via-orange-900/10 dark:to-red-900/10"
        )}
      >
        {/* Imagem lateral pequena */}
        <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-muted">
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
        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
          <div className="flex flex-col">
            <div className="flex items-start justify-between">
               <span className="font-bold text-lg text-foreground truncate block">{titulo}</span>
               <span className={cn(
                "flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full",
                config.bg,
                config.text,
                config.border,
              )}>
                {React.cloneElement(config.icon, { className: "w-4 h-4" })}
                {config.badge}
              </span>
            </div>

            <div className="mt-2 mb-3 flex items-center gap-2">
              <img src={usuario.avatar} alt={usuario.nome} className="w-8 h-8 object-cover rounded-md border border-border" />
              <span className="text-sm font-medium text-muted-foreground">{usuario.nome}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-3">{descricao}</p>
          
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, i) => (
                  <Badge key={i} className="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/50 text-xs">#{tag}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={cn(
                  "flex items-center gap-1.5 text-sm transition-colors",
                  isLiked
                    ? "text-red-500"
                    : "text-muted-foreground hover:text-red-500"
                )}
              >
                <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
                <span>{likeCount}</span>
              </button>
              <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-sky-500 transition-colors">
                <MessageCircle className="w-4 h-4" />
                <span>{comentarios}</span>
              </button>
            </div>
            
            <button 
              onClick={handleWhatsApp}
              className="flex items-center gap-2 py-2 px-4 bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white font-semibold text-sm rounded-lg shadow-md hover:shadow-lg hover:brightness-110 transition-all"
            >
              Entrar em contato
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
});

FeedCard.displayName = "FeedCard";

export { FeedCard };
