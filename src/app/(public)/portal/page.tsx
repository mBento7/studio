'use client';

import React from 'react';
import Link from 'next/link';
import ArticleCard from '@/components/ArticleCard';
import WeatherWidget from '@/components/WeatherWidget';
import CTAAuthor from '@/components/CTAAuthor';
// Importe PaywallModal se for usá-lo diretamente aqui, ou em artigos individuais.

// Dados Mock para simular o conteúdo
const mockArticles = [
  {
    id: '1',
    title: 'Guia Completo para Iniciantes em Desenvolvimento Web',
    summary: 'Descubra os primeiros passos no mundo do desenvolvimento web e construa seu futuro digital.',
    image: 'https://via.placeholder.com/600x400?text=Desenvolvimento+Web',
    slug: 'guia-desenvolvimento-web',
    author: { name: 'Maria Silva', username: 'mariasilva' },
    readTime: '5 min',
    isPremium: false,
  },
  {
    id: '2',
    title: 'As 10 Tendências de Moda para o Verão 2024',
    summary: 'Fique por dentro do que há de mais quente nas passarelas e nas ruas nesta estação.',
    image: 'https://via.placeholder.com/600x400?text=Moda+Verão',
    slug: 'tendencias-moda-verao-2024',
    author: { name: 'Ana Carolina', username: 'anacarolina' },
    readTime: '7 min',
    isPremium: true,
  },
  {
    id: '3',
    title: 'Receitas Saudáveis e Rápidas para o Dia a Dia',
    summary: 'Prepare refeições deliciosas e nutritivas em pouco tempo, sem abrir mão do sabor.',
    image: 'https://via.placeholder.com/600x400?text=Receitas+Saudáveis',
    slug: 'receitas-saudaveis-rapidas',
    author: { name: 'Carlos Souza', username: 'carlossouza' },
    readTime: '4 min',
    isPremium: false,
  },
  {
    id: '4',
    title: 'Transforme Seu Jardim: Dicas de Paisagismo para Pequenos Espaços',
    summary: 'Mesmo com pouco espaço, é possível criar um oásis verde em sua casa.',
    image: 'https://via.placeholder.com/600x400?text=Paisagismo',
    slug: 'paisagismo-pequenos-espacos',
    author: { name: 'Juliana Mendes', username: 'julianamendes' },
    readTime: '6 min',
    isPremium: false,
  },
];

const mockBanners = [
  {
    id: 'banner-topo-1',
    image: 'https://via.placeholder.com/970x250?text=Banner+Principal',
    link: '#',
    position: 'top',
  },
  {
    id: 'banner-lateral-1',
    image: 'https://via.placeholder.com/300x250?text=Anuncio+Lateral',
    link: '#',
    position: 'sidebar',
  },
  {
    id: 'banner-lateral-2',
    image: 'https://via.placeholder.com/300x600?text=Anuncio+Vertical',
    link: '#',
    position: 'sidebar',
  },
];

export default function PortalPage() {
  const featuredArticle = mockArticles[0];
  const recentArticles = mockArticles.slice(1, 4);
  const sidebarAuthor = mockArticles[0].author; // Usando o autor do primeiro artigo como exemplo

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Banner Principal no Topo */}
        {mockBanners.find(b => b.position === 'top') && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <Link href={mockBanners.find(b => b.position === 'top')?.link || '#'}>
              <img
                src={mockBanners.find(b => b.position === 'top')?.image}
                alt="Banner Principal"
                className="w-full h-auto object-cover"
              />
            </Link>
          </div>
        )}

        <h1 className="text-4xl font-bold text-center mb-8">Portal de Conteúdo WhosDo</h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-400 mb-12">
          Descubra os melhores artigos, notícias e guias em diversas categorias.
        </p>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Conteúdo Principal */}
          <main className="lg:w-3/4">
            {/* Seção de Destaque */}
            {featuredArticle && (
              <section className="mb-10">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary pb-2">Destaque do Dia</h2>
                <ArticleCard article={featuredArticle} />
              </section>
            )}

            {/* Seção de Artigos Recentes */}
            <section className="mb-10">
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary pb-2">Artigos Recentes</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recentArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

            {/* Espaço para mais banners ou anúncios no meio do conteúdo */}
            <div className="my-10 text-center">
              <img
                src="https://via.placeholder.com/728x90?text=Anuncio+Meio+Conteudo"
                alt="Anúncio"
                className="mx-auto rounded-lg shadow-md"
              />
            </div>

            {/* Seção de Categorias ou Mais Artigos (pode ser paginada) */}
            <section>
              <h2 className="text-3xl font-bold mb-6 border-b-2 border-primary pb-2">Mais Conteúdos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 transform hover:scale-105"
                >
                  Ver todos os artigos
                </Link>
              </div>
            </section>
          </main>

          {/* Barra Lateral (Sidebar) */}
          <aside className="lg:w-1/4 lg:sticky lg:top-24 h-fit">
            {/* Widget de Previsão do Tempo */}
            <WeatherWidget />

            {/* Anúncio Lateral */}
            {mockBanners.find(b => b.position === 'sidebar') && (
              <div className="mb-6 rounded-lg overflow-hidden shadow-md">
                <Link href={mockBanners.find(b => b.position === 'sidebar')?.link || '#'}>
                  <img
                    src={mockBanners.find(b => b.position === 'sidebar')?.image}
                    alt="Anúncio Lateral"
                    className="w-full h-auto object-cover"
                  />
                </Link>
              </div>
            )}

            {/* CTA para Autor */}
            <CTAAuthor author={sidebarAuthor} />

            {/* Outro Anúncio Lateral */}
            {mockBanners.find(b => b.id === 'banner-lateral-2') && (
              <div className="mt-6 rounded-lg overflow-hidden shadow-md">
                <Link href={mockBanners.find(b => b.id === 'banner-lateral-2')?.link || '#'}>
                  <img
                    src={mockBanners.find(b => b.id === 'banner-lateral-2')?.image}
                    alt="Anúncio Vertical"
                    className="w-full h-auto object-cover"
                  />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
} 