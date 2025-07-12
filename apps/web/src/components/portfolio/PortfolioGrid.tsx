import React, { useState } from "react";

/**
 * Props para o componente PortfolioGrid
 * @param items Array de itens do portfólio (id, caption, imageUrl)
 * @param maxToShow Número máximo de itens a exibir (default: 6)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param onItemClick Callback ao clicar em um item
 */
export interface PortfolioItem {
  id: string;
  caption: string;
  imageUrl: string;
}

export interface PortfolioGridProps {
  items: PortfolioItem[];
  maxToShow?: number;
  variant?: "free" | "standard" | "premium";
  onItemClick?: (item: PortfolioItem) => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  items = [],
  maxToShow = 6,
  variant = "free",
  onItemClick,
}) => {
  console.log("[PortfolioGrid] items recebidos:", items);
  const displayed = items.slice(0, maxToShow);

  return (
    <div>
      <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-primary drop-shadow-sm">Meu Portfólio</h2>
      <p className="text-center text-muted-foreground mb-8 text-base md:text-lg">Veja alguns dos meus trabalhos recentes e projetos criativos.</p>
      <div
        className={
          (variant === "premium"
            ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            : variant === "standard"
            ? "grid grid-cols-2 md:grid-cols-3 gap-6"
            : "grid grid-cols-2 gap-4") +
          " w-full max-w-6xl mx-auto px-4 bg-transparent"
        }
      >
        {displayed.map((item) => {
          const imageUrlToUse =
            item.imageUrl && item.imageUrl.trim() !== ""
              ? item.imageUrl
              : "/avatar-default.png";

          const [imageLoaded, setImageLoaded] = useState(false);

          return (
            <div
              key={item.id}
              className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer transition-transform hover:scale-105 border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 aspect-[4/3]"
              onClick={() => onItemClick?.(item)}
              tabIndex={0}
              role="button"
              aria-label={item.caption}
            >
              {/* Skeleton Loader */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse w-full h-full aspect-[4/3]" />
              )}
              <img
                src={imageUrlToUse}
                alt={item.caption || "Imagem do portfólio"}
                className={`w-full h-full object-cover aspect-[4/3] transition-opacity duration-300 rounded-2xl ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
              {/* Caption com gradiente escuro ao hover */}
              <div className="absolute inset-0 flex items-end">
                <div className="w-full p-0">
                  <div className="bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl w-full flex items-end min-h-[40%]">
                    {item.caption && (
                      <p className="text-white text-base font-semibold px-4 pb-3 truncate w-full drop-shadow-md" style={{textShadow: '0 2px 8px #0008'}}>
                        {item.caption}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 