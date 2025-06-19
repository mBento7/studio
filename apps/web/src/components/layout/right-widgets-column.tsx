import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Percent, Megaphone } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// UserAdExample
export function UserAdExample() {
  return (
    <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl shadow-lg border border-blue-500/20 overflow-hidden">
      <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">PATROCINADO</div>
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <img src="https://picsum.photos/seed/useradexample/400/150" alt="TechSolutions Banner" className="w-full h-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <img src="https://picsum.photos/seed/useradlogo/50/50" alt="TechSolutions" className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-md" />
          <div className="flex-1">
            <h4 className="font-bold text-base">TechSolutions</h4>
            <p className="text-sm text-muted-foreground">Desenvolvimento de Apps</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex text-yellow-400">{'★'.repeat(5)}</div>
              <span className="text-xs text-muted-foreground">(4.9)</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">Transforme sua ideia em realidade! Apps iOS e Android com qualidade profissional e suporte completo.</p>
        <div className="flex items-center gap-2">
          <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">20% OFF</span>
          <span className="text-sm text-muted-foreground">até 31/12</span>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">Ver Oferta Completa</Button>
      </div>
    </div>
  );
}

// PremiumAdCard
export function PremiumAdCard() {
  return (
    <div className="relative p-6 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-500/30 overflow-hidden">
      <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">PREMIUM</div>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Destaque seu Negócio</h3>
        <p className="text-sm text-muted-foreground">Alcance mais clientes com anúncios premium e apareça no topo dos resultados.</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-600 font-semibold">+300%</span>
          <span className="text-muted-foreground">mais visualizações</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg">Começar Agora</Button>
      </div>
    </div>
  );
}

// QuickActions
// export function QuickActions({ onCouponClick }: { onCouponClick: () => void }) {
//   ...
// }

// export function ActivityStats() {
//   ...
// }

export function TrendingHashtags() {
  const hashtags = [
    { tag: "#limpeza", posts: 1234 },
    { tag: "#marketing", posts: 987 },
    { tag: "#design", posts: 756 },
    { tag: "#consultoria", posts: 543 },
    { tag: "#fitness", posts: 432 },
  ];
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Trending</h3>
      <div className="space-y-2">
        {hashtags.map((item, index) => (
          <div key={item.tag} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-primary">{item.tag}</p>
              <p className="text-xs text-muted-foreground">{item.posts} posts</p>
            </div>
            <span className="text-xs text-muted-foreground">#{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function UserSuggestions() {
  const suggestions = [
    { id: 1, name: "TechSolutions", category: "Tecnologia", followers: "2.3k", avatar: "https://picsum.photos/seed/suggest1/40/40" },
    { id: 2, name: "CleanPro", category: "Limpeza", followers: "1.8k", avatar: "https://picsum.photos/seed/suggest2/40/40" },
    { id: 3, name: "DesignStudio", category: "Design", followers: "3.1k", avatar: "https://picsum.photos/seed/suggest3/40/40" },
  ];
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Sugestões para Você</h3>
      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.category} • {user.followers} seguidores</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs">Seguir</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TrendingAds() {
  const ads = [
    { id: 1, title: "Promoção Limpeza Pro", img: "https://picsum.photos/seed/ad1/200/80" },
    { id: 2, title: "Desconto Marketing", img: "https://picsum.photos/seed/ad2/200/80" },
    { id: 3, title: "Design em Alta", img: "https://picsum.photos/seed/ad3/200/80" },
  ];
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Anúncios em Alta</h3>
      {ads.map((ad) => (
        <div key={ad.id} className="relative h-24 rounded-lg overflow-hidden group cursor-pointer">
          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
            <p className="text-sm text-white">{ad.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function CouponsWidget() {
  const coupons = [
    { id: 1, code: "BEMVINDO20", desc: "20% OFF na primeira compra" },
    { id: 2, code: "FRETEGRATIS", desc: "Frete grátis acima de R$100" },
  ];
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Cupons Ativos</h3>
      {coupons.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
          <div>
            <p className="font-semibold text-primary">{c.code}</p>
            <p className="text-xs text-muted-foreground">{c.desc}</p>
          </div>
          <Button size="sm" variant="outline" className="shadow-sm">Copiar</Button>
        </div>
      ))}
    </div>
  );
}

export function RightWidgetsColumn({ onCouponClick }: { onCouponClick?: () => void }) {
  return (
    <div className="flex flex-col gap-3 max-w-[350px] w-full">
      <PremiumAdCard />
      <UserAdExample />
      {/* <QuickActions onCouponClick={onCouponClick || (() => {})} /> Removido pois está na left-profile-sidebar */}
      {/* <ActivityStats /> Removido pois está na left-profile-sidebar */}
      <TrendingHashtags />
      <UserSuggestions />
      <TrendingAds />
      <CouponsWidget />
    </div>
  );
} 