'use client';
import ShowcaseLucas from '@/components/anuncios/ShowcaseLucas';
import { BannerBuscaTopo } from '@/components/anuncios/BannerBuscaTopo';

export default function ShowcaseLucasPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 500, margin: '0 auto', padding: 24 }}>
      <h1 style={{ fontWeight: 700, fontSize: 28, marginBottom: 16 }}>Showcase de Anúncios - Todos os Componentes</h1>
      <section>
        <h2 style={{ fontWeight: 600, fontSize: 20, marginBottom: 8 }}>BannerBuscaTopo</h2>
        <BannerBuscaTopo
          imagem="https://picsum.photos/seed/lucasbanner/600/180"
          titulo="Banner de Busca - Lucas.showcase"
          link="/profile/lucas.showcase"
        />
      </section>
      <section>
        <ShowcaseLucas />
      </section>
    </div>
  );
} 