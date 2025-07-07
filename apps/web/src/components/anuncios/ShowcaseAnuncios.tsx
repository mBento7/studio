"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import AnuncioLateralCard from './AnuncioLateralCard';
import PostPatrocinadoCard from './PostPatrocinadoCard';
import ResultadoPromovidoCard from './ResultadoPromovidoCard';
import NotificacaoPatrocinada from './NotificacaoPatrocinada';
import { CarrosselAnuncios } from './CarrosselAnuncios';
import { StoryPatrocinado } from './StoryPatrocinado';
import VideoAnuncioCard from './VideoAnuncioCard';
import { BannerBuscaTopo } from './BannerBuscaTopo';
import { UserAdExample } from './UserAdExample';

const ShowcaseAnuncios = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Vitrine de Anúncios
          </h1>
          <p className="text-muted-foreground">
            Exemplo de todos os componentes do diretório <code>anuncios</code>
          </p>
        </div>
        <div className="space-y-10">
          {/* AnuncioLateralCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">AnuncioLateralCard</h2>
            <AnuncioLateralCard
              imagem="https://picsum.photos/seed/lateral/400/150"
              titulo="Transforme Seu Negócio com Sites Profissionais!"
              descricao="Especialista em sites modernos. Solicite um orçamento!"
              link="#"
            />
          </section>
          {/* PostPatrocinadoCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">PostPatrocinadoCard</h2>
            <PostPatrocinadoCard
              usuario="Lucas.showcase"
              conteudo="Crie seu site profissional e conquiste mais clientes! Atendimento rápido e design exclusivo."
              imagem="https://picsum.photos/seed/postpatrocinado/100/100"
              link="#"
            />
          </section>
          {/* ResultadoPromovidoCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">ResultadoPromovidoCard</h2>
            <ResultadoPromovidoCard
              avatar="https://picsum.photos/seed/promovido/100/100"
              nome="Lucas.showcase"
              linkPerfil="#"
              destaque={true}
            />
          </section>
          {/* NotificacaoPatrocinada */}
          <section>
            <h2 className="font-bold text-lg mb-2">NotificacaoPatrocinada</h2>
            <NotificacaoPatrocinada
              mensagem="Lucas.showcase está oferecendo desconto especial em sites profissionais. Confira!"
              link="#"
            />
          </section>
          {/* CarrosselAnuncios */}
          <section>
            <h2 className="font-bold text-lg mb-2">CarrosselAnuncios</h2>
            <CarrosselAnuncios
              anuncios={[
                {
                  imagem: 'https://picsum.photos/seed/carrossel1/200/100',
                  titulo: 'Sites Profissionais',
                  link: '#'
                },
                {
                  imagem: 'https://picsum.photos/seed/carrossel2/200/100',
                  titulo: 'Landing Pages',
                  link: '#'
                },
                {
                  imagem: 'https://picsum.photos/seed/carrossel3/200/100',
                  titulo: 'E-commerce',
                  link: '#'
                }
              ]}
            />
          </section>
          {/* StoryPatrocinado */}
          <section>
            <h2 className="font-bold text-lg mb-2">StoryPatrocinado</h2>
            <StoryPatrocinado
              imagem="https://picsum.photos/seed/storypatrocinado/400/700"
              link="#"
              titulo="Lucas.showcase"
            />
          </section>
          {/* VideoAnuncioCard */}
          <section>
            <h2 className="font-bold text-lg mb-2">VideoAnuncioCard</h2>
            <VideoAnuncioCard
              videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
              titulo="Lucas.showcase: Sites Profissionais"
              descricao="Veja como um site pode transformar seu negócio!"
              link="#"
            />
          </section>
          {/* BannerBuscaTopo */}
          <section>
            <h2 className="font-bold text-lg mb-2">BannerBuscaTopo</h2>
            <BannerBuscaTopo
              imagem="https://picsum.photos/seed/bannerbusca/600/120"
              titulo="Banner Busca Topo"
              link="#"
            />
          </section>
          {/* UserAdExample */}
          <section>
            <h2 className="font-bold text-lg mb-2">UserAdExample</h2>
            <UserAdExample />
          </section>
        </div>
        <div className="mt-12 text-center">
          <Button variant="outline" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            Carregar mais anúncios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShowcaseAnuncios; 