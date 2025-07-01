import React from 'react';
import { AnuncioLateralCard } from './AnuncioLateralCard';
import { PostPatrocinadoCard } from './PostPatrocinadoCard';
import { ResultadoPromovidoCard } from './ResultadoPromovidoCard';
import { NotificacaoPatrocinada } from './NotificacaoPatrocinada';
import { CarrosselAnuncios } from './CarrosselAnuncios';
import { StoryPatrocinado } from './StoryPatrocinado';
import { VideoAnuncioCard } from './VideoAnuncioCard';

export default function ShowcaseLucas() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400, margin: '0 auto', padding: 24 }}>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Showcase: Anúncios de Lucas.showcase</h2>
      <AnuncioLateralCard
        imagem="https://picsum.photos/seed/lucas/400/150"
        titulo="Transforme Seu Negócio com Sites Profissionais!"
        link="/profile/lucas.showcase"
        descricao="Olá! Eu sou o Lucas.showcase, especialista em sites modernos. Solicite um orçamento!"
      />
      <PostPatrocinadoCard
        usuario="Lucas.showcase"
        conteudo="Crie seu site profissional e conquiste mais clientes! Atendimento rápido e design exclusivo."
        imagem="https://picsum.photos/seed/lucas/400/150"
        link="/profile/lucas.showcase"
      />
      <ResultadoPromovidoCard
        avatar="https://picsum.photos/seed/lucas/100/100"
        nome="Lucas.showcase"
        linkPerfil="/profile/lucas.showcase"
        destaque={true}
      />
      <NotificacaoPatrocinada
        mensagem="Lucas.showcase está oferecendo desconto especial em sites profissionais. Confira!"
        link="/profile/lucas.showcase"
      />
      <CarrosselAnuncios
        anuncios={[
          {
            imagem: "https://picsum.photos/seed/lucas/400/150",
            titulo: "Sites Profissionais com Lucas.showcase",
            link: "/profile/lucas.showcase"
          }
        ]}
      />
      <StoryPatrocinado
        imagem="https://picsum.photos/seed/lucas/400/700"
        link="/profile/lucas.showcase"
        titulo="Lucas.showcase"
      />
      <VideoAnuncioCard
        videoUrl="https://www.w3schools.com/html/mov_bbb.mp4"
        titulo="Lucas.showcase: Sites Profissionais"
        link="/profile/lucas.showcase"
        descricao="Veja como um site pode transformar seu negócio!"
      />
    </div>
  );
} 