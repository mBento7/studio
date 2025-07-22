'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Calendar,
  MapPin,
  Star,
  Gift,
  Users,
  Megaphone,
  Bell,
  ChevronLeft,
  ChevronRight,
  Eye,
  TrendingUp
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { FeedCard } from './FeedCard';
import EventCard from './EventCard';
import CouponCard from './CouponCard';
import InviteCard from './InviteCard';
import BannerCard from './BannerCard';
import TestimonialCard from './TestimonialCard';
import UpdateCard from './UpdateCard';
import StoryModal from './StoryModal';
import { FeedPostEditor } from './FeedPostEditor';
import { SponsoredAdCard } from './SponsoredAdCard';
import StoryHeader from './StoryHeader';
import StoryActions from './StoryActions';
import StoryOptionsMenu from './StoryOptionsMenu';
import CuponFeedCard from './CuponFeedCard';

// Exemplo de dados do feed
const feedData = [
  {
    type: 'service',
    data: {
      user: {
        name: 'Maria Silva',
        avatar: 'https://i.pravatar.cc/100?img=1',
        username: 'maria.design'
      },
      title: 'Design de Identidade Visual Completa',
      description: 'Criação de logotipo, cartão de visita, papel timbrado e manual da marca. Trabalho profissional com entrega rápida.',
      image: 'https://picsum.photos/seed/design1/600/300',
      price: 'R$ 850,00',
      location: 'São Paulo, SP',
      tags: ['design', 'branding', 'logo'],
      engagement: {
        likes: 24,
        comments: 8,
        shares: 5,
        views: 156
      }
    }
  }
  // ... (demais itens do feed)
];

// Exemplo de card de serviço
const ServicePostCard = ({ user, title, description, image, price, location, tags, engagement, timeAgo = '2h' }: any) => {
  return (
    <Card className="max-w-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground">{user.name}</h3>
            <p className="text-sm text-muted-foreground">@{user.username || user.name.toLowerCase()} · {timeAgo}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>
      <div className="px-4 pb-4">
        <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-3">{description}</p>
        {image && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img src={image} alt={title} className="w-full h-48 object-cover" />
          </div>
        )}
        <div className="flex items-center justify-between mb-3">
          <div className="text-2xl font-bold text-green-600">{price}</div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{location}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              #{tag}
            </Badge>
          ))}
        </div>
      </div>
      {/* Aqui pode-se adicionar uma barra de engajamento moderna, se necessário */}
    </Card>
  );
};

const renderFeedItem = (item: any, index: number) => {
  switch (item.type) {
    case 'service':
      return <ServicePostCard key={index} {...item.data} />;
    // Adicione outros tipos de cards modernos aqui
    default:
      return null;
  }
};

const ShowcaseFeed = () => {
  // Para StoryModal
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  // Para StoryOptionsMenu
  const [storyMenuOpen, setStoryMenuOpen] = useState(false);

  // Dados de exemplo
  const exampleStory = {
    id: '1',
    user: {
      name: 'Lucas Story',
      avatarUrl: 'https://i.pravatar.cc/100?img=3',
      username: 'lucas.story'
    },
    mediaUrl: 'https://picsum.photos/seed/story/400/300',
    type: 'image',
    timeLeft: 80,
    liked: false,
    description: 'Exemplo de story com imagem.',
    time: 'há 2h'
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Vitrine de Cards do Feed
          </h1>
          <p className="text-muted-foreground">
            Exemplo de todos os cards do diretório <code>feed</code>
          </p>
        </div>
        <div className="space-y-10">
          {/* FeedCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">FeedCard</h2>
            <FeedCard
              tipo="oferta_servico"
              titulo="Serviço de Design Gráfico"
              descricao="Criação de identidade visual completa para sua marca."
              imagem="https://picsum.photos/seed/feedcard/400/300"
              preco="R$ 500,00"
              localizacao="Belo Horizonte, MG"
              usuario={{ nome: 'Ana Paula', avatar: 'https://i.pravatar.cc/100?img=5' }}
              curtidas={12}
              comentarios={3}
              tags={['design', 'branding']}
            />
          </section>
          {/* InviteCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">InviteCard</h2>
            <InviteCard
              texto="Convide amigos e ganhe bônus!"
              bonus="+10 créditos por convite"
              link="#"
            />
          </section>
          {/* CouponCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">CouponCard</h2>
            <CouponCard
              user={{
                name: 'Maria Souza',
                username: 'maria.souza',
                avatarUrl: 'https://i.pravatar.cc/100?img=8'
              }}
              publishedAt={new Date().toISOString()}
              code="PROMO10"
              discount="10% OFF"
              description="Desconto especial para novos usuários."
              validUntil={new Date(Date.now() + 86400000).toISOString()}
              brand="Whosdo"
            />
          </section>
          {/* CuponFeedCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">CuponFeedCard (Atualização no Feed)</h2>
            <CuponFeedCard
              user={{
                name: 'Maria Souza',
                username: 'maria.souza',
                avatarUrl: 'https://i.pravatar.cc/100?img=8'
              }}
              benefit="10% OFF em qualquer serviço!"
              description="Aproveite 10% de desconto em todos os serviços do perfil da Maria. Visite o perfil e copie o código do cupom!"
              publishedAt={new Date().toISOString()}
            />
          </section>
          {/* BannerCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">BannerCard</h2>
            <BannerCard
              imagem="https://picsum.photos/seed/banner/600/120"
              texto="Banner Promocional"
              link="#"
            />
          </section>
          {/* EventCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">EventCard</h2>
            <EventCard
              id="design-conference-2024"
              name="Workshop de UX/UI"
              date={new Date().toISOString()}
              location="Online"
              image="https://picsum.photos/seed/event/600/300"
              attendees={42}
              price="Grátis"
            />
          </section>
          {/* UpdateCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">UpdateCard</h2>
            <UpdateCard
              titulo="Nova funcionalidade lançada!"
              descricao="Agora você pode personalizar ainda mais seu perfil."
              data={new Date().toLocaleDateString('pt-BR')}
            />
          </section>
          {/* TestimonialCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">TestimonialCard</h2>
            <TestimonialCard
              post={{
                id: '1',
                type: 'testimonial',
                user: { name: 'Carlos Souza', avatar: 'https://i.pravatar.cc/100?img=7' },
                rating: 5,
                comment: 'Excelente serviço, recomendo muito!',
                service: 'Design Gráfico',
                serviceProvider: { name: 'Ana Paula', avatar: 'https://i.pravatar.cc/100?img=5' },
                engagement: { likes: 10, comments: 2, shares: 1 },
                timeAgo: '2h'
              }}
            />
          </section>
          {/* SponsoredAdCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">SponsoredAdCard</h2>
            <SponsoredAdCard
              titulo="Anúncio Patrocinado"
              descricao="Destaque seu serviço para mais pessoas!"
              imagem="https://picsum.photos/seed/sponsored/200/200"
              link="#"
            />
          </section>
          {/* StoriesMobile */}
          {/*
          <h2 className="font-bold text-lg mb-2">StoriesMobile</h2>
          <StoriesMobile
            stories={[
              { avatar: 'https://i.pravatar.cc/100?img=8', name: 'Maria' },
              { avatar: 'https://i.pravatar.cc/100?img=9', name: 'João' },
              { avatar: 'https://i.pravatar.cc/100?img=10', name: 'Clara' },
            ]}
          />
          */}
          {/* FeedPostEditor */}
          <section>
            <h2 className="font-bold text-lg mb-2">FeedPostEditor</h2>
            <FeedPostEditor onPost={() => alert('Post enviado!')} />
          </section>
          {/* StoryModal */}
          <section>
            <h2 className="font-bold text-lg mb-2">StoryModal</h2>
            <Button onClick={() => setStoryModalOpen(true)} className="mb-2">Abrir StoryModal</Button>
            {storyModalOpen && (
              <StoryModal
                open={storyModalOpen}
                onClose={() => setStoryModalOpen(false)}
                story={{
                  id: exampleStory.id,
                  user: {
                    name: exampleStory.user.name,
                    username: exampleStory.user.username,
                    avatarUrl: exampleStory.user.avatarUrl
                  },
                  mediaUrl: exampleStory.mediaUrl,
                  description: exampleStory.description,
                  type: exampleStory.type === 'image' || exampleStory.type === 'video' ? exampleStory.type : 'image',
                  time: exampleStory.time,
                  liked: exampleStory.liked,
                  timeLeft: exampleStory.timeLeft
                }}
                onPrev={() => alert('Anterior')}
                onNext={() => alert('Próximo')}
              />
            )}
          </section>
          {/* StoryHeader */}
          <section>
            <h2 className="font-bold text-lg mb-2">StoryHeader</h2>
            <StoryHeader
              story={{
                user: exampleStory.user,
                timeLeft: 60
              }}
              onClose={() => alert('Fechar')}
              progress={80}
            />
          </section>
          {/* StoryActions */}
          <section>
            <h2 className="font-bold text-lg mb-2">StoryActions</h2>
            <StoryActions
              story={{
                user: { username: 'lucas.story' },
                liked: false
              }}
            />
          </section>
          {/* StoryOptionsMenu */}
          <section className="relative">
            <h2 className="font-bold text-lg mb-2">StoryOptionsMenu</h2>
            <Button onClick={() => setStoryMenuOpen(!storyMenuOpen)} className="mb-2">Abrir Menu de Opções</Button>
            {storyMenuOpen && (
              <StoryOptionsMenu onClose={() => setStoryMenuOpen(false)} />
            )}
          </section>
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Carregar mais posts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseFeed;
