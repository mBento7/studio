import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, Percent, Megaphone, Tag, Flame, Plus } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { Card } from '@/components/ui/card';
import { UserAdExample } from '@/components/anuncios/UserAdExample';

// UserAdExample
// export function UserAdExample() {
//   return (
//     <Card className="w-full p-5 shadow-lg shadow-black/5 dark:shadow-black/30 rounded-2xl bg-card/95 border border-white/10 overflow-hidden transition-all hover:shadow-xl hover:shadow-black/10 dark:hover:shadow-black/40">
//       <div className="w-full bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-5 space-y-4 transition-all hover:shadow-lg">
//         <div className="relative">
//           <div className="absolute top-3 right-3 bg-teal-500/90 text-white px-3 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
//             <Tag className="w-3 h-3" />
//             PATROCINADO
//           </div>
//           <div className="relative h-32 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 overflow-hidden">
//             <img 
//               src="https://picsum.photos/seed/useradexample/400/150" 
//               alt="TechSolutions Banner" 
//               className="w-full h-full object-cover opacity-85 user-ad-img transition-all duration-500 group-hover:scale-105" 
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
//           </div>
//           <div className="p-4 space-y-4">
//             <div className="flex items-start gap-4">
//               <img 
//                 src="https://picsum.photos/seed/useradlogo/50/50" 
//                 alt="TechSolutions" 
//                 className="w-14 h-14 rounded-xl object-cover border-2 border-background shadow-lg shadow-black/10 transition-transform hover:scale-105" 
//               />
//               <div className="flex-1">
//                 <h4 className="font-bold text-lg text-foreground">TechSolutions</h4>
//                 <p className="text-sm text-muted-foreground/80">Desenvolvimento de Apps</p>
//                 <div className="flex items-center gap-1 mt-1.5">
//                   <div className="flex text-yellow-400 text-base">{'★'.repeat(5)}</div>
//                   <span className="text-xs text-muted-foreground font-medium">(4.9)</span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-sm text-muted-foreground/90 leading-5">
//               Transforme sua ideia em realidade! Apps iOS e Android com qualidade profissional e suporte completo.
//             </p>
//             <div className="flex items-center gap-2">
//               <span className="text-sm bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
//                 <Percent className="w-4 h-4" />
//                 20% OFF
//               </span>
//               <span className="text-sm text-muted-foreground font-medium">até 31/12</span>
//             </div>
//             <Button 
//               className="w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] night-theme:shadow-black/50"
//             >
//               Ver Oferta Completa
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }

// PremiumAdCard
export function PremiumAdCard() {
  return (
    <div className="w-full bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-5 space-y-4 transition-all hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40">
      <div className="relative p-6">
        <div className="absolute top-3 right-3 bg-yellow-500/90 text-yellow-900 px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Flame className="w-3 h-3" />
          PREMIUM
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-yellow-500" />
            Destaque seu Negócio
          </h3>
          <p className="text-sm text-muted-foreground leading-5">
            Alcance mais clientes com anúncios premium e apareça no topo dos resultados.
          </p>
          <div className="flex items-center gap-2 text-sm bg-muted/50 dark:bg-muted/20 p-2 rounded-lg">
            <span className="text-green-600 font-semibold text-lg">+300%</span>
            <span className="text-muted-foreground">mais visualizações</span>
          </div>
          <Button 
            className="w-full rounded-full bg-primary text-primary-foreground font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] night-theme:shadow-black/50"
          >
            Começar Agora
          </Button>
        </div>
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
    <div className="p-5 bg-card rounded-2xl space-y-4 border border-black/5 dark:border-white/10 shadow-xl shadow-black/20 dark:shadow-black/50 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Flame className="w-5 h-5 text-orange-500" />
        Trending
      </h3>
      <div className="space-y-2">
        {hashtags.map((item, index) => (
          <div 
            key={item.tag} 
            className="flex items-center justify-between p-3 hover:bg-muted/50 rounded-xl cursor-pointer transition-all hover:scale-[1.02] hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-primary">#{item.tag}</span>
              <span className="text-xs text-muted-foreground">{item.posts} posts</span>
            </div>
            <span className="text-xs font-medium text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full">
              #{index + 1}
            </span>
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
    <div className="p-5 bg-card rounded-2xl space-y-4 border border-black/5 dark:border-white/10 shadow-xl shadow-black/20 dark:shadow-black/50 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold">Sugestões para Você</h3>
      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center gap-4 p-2 hover:bg-muted/50 rounded-xl transition-all">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-transparent hover:ring-primary/30 transition-all" 
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate text-foreground">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.category} • {user.followers} seguidores</p>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-full flex items-center gap-1 transition-all hover:scale-105"
            >
              <Plus className="w-3 h-3" />
              Seguir
            </Button>
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
    <div className="p-5 bg-card rounded-2xl space-y-4 border border-black/5 dark:border-white/10 shadow-xl shadow-black/20 dark:shadow-black/50 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Megaphone className="w-5 h-5 text-blue-500" />
        Anúncios em Alta
      </h3>
      {ads.map((ad) => (
        <div key={ad.id} className="relative h-28 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-md transition-all">
          <img 
            src={ad.img} 
            alt={ad.title} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-300" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
          <div className="absolute bottom-0 left-0 right-0 p-3">
            <p className="text-sm text-white font-medium">{ad.title}</p>
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
    <div className="p-5 bg-card rounded-2xl space-y-4 border border-black/5 dark:border-white/10 shadow-xl shadow-black/20 dark:shadow-black/50 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Tag className="w-5 h-5 text-pink-500" />
        Cupons Ativos
      </h3>
      {coupons.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-4 bg-muted/80 dark:bg-muted/30 rounded-xl hover:bg-muted/90 transition-all">
          <div className="space-y-1">
            <p className="font-semibold text-primary text-lg">{c.code}</p>
            <p className="text-xs text-muted-foreground">{c.desc}</p>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-full flex items-center gap-1 transition-all hover:scale-105"
          >
            Copiar
          </Button>
        </div>
      ))}
    </div>
  );
}

export function RightWidgetsColumn({ onCouponClick }: { onCouponClick?: () => void }) {
  console.log('RightWidgetsColumn RENDERIZADO');
  return (
    <div className="flex flex-col gap-4 max-w-[280px] xl:max-w-[320px] 2xl:max-w-[350px] w-full">
      <UserAdExample />
      <PremiumAdCard />
      {/* <QuickActions onCouponClick={onCouponClick || (() => {})} /> Removido pois está na left-profile-sidebar */}
      {/* <ActivityStats /> Removido pois está na left-profile-sidebar */}
      <TrendingHashtags />
      <UserSuggestions />
      <TrendingAds />
      <CouponsWidget />
    </div>
  );
} 