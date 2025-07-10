# Documentação: Portal de Conteúdo

## Visão Geral

Este portal permite a publicação de artigos, banners, anúncios e conteúdos especiais (gamificados ou pay-per-demand). O objetivo é criar uma experiência rica para o usuário, com diferentes formas de engajamento e monetização.

**Acesso:**
- Todo o conteúdo pode ser lido publicamente, sem necessidade de login (free/read-only).
- Para interagir (comentar, curtir, compartilhar, participar de gamificação ou acessar conteúdos pay-per-demand), é necessário estar logado.

**Aperfeiçoamentos e Expansões:**
- O portal pode ser composto por um conjunto de páginas dedicadas, além da home e categorias, como:
  - Página de previsão do tempo (widget integrado ou API externa)
  - Página de notícias rápidas
  - Página de destaques do dia
  - Página de eventos ou agenda
  - Página de autores/usuários (perfil público de quem cria artigos)
- Inclusão de CTAs (Call to Action) para páginas de autores, incentivando o usuário a conhecer outros artigos do mesmo autor ou seguir o autor.
- Possibilidade de widgets especiais (ex: cotação de moedas, previsão do tempo, enquetes, etc).

---

## Estrutura de Pastas

```
src/
  app/
    (public)/
      portal/
        index.tsx                // Página inicial do portal
        [categoria]/index.tsx    // Página de categoria
        artigo/[slug].tsx        // Página de artigo individual
        paywall.tsx              // Componente de pay-per-demand
        gamification.tsx         // Componente de gamificação
        tempo.tsx                // Página dedicada: previsão do tempo
        destaques.tsx            // Página dedicada: destaques do dia
        autores/[username].tsx   // Página de perfil público do autor
  components/
    Banner.tsx
    Anuncio.tsx
    ArticleCard.tsx
    Sidebar.tsx
    GamificationWidget.tsx
    PaywallModal.tsx
    WeatherWidget.tsx
    CTAAuthor.tsx
```

---

## Funcionalidades

### 1. Publicação de Artigos

- **Admin** pode criar, editar e excluir artigos.
- Artigos possuem: título, conteúdo, categoria, tags, imagem, status (público/premium/gamificado).
- Artigos premium ou gamificados exigem ação do usuário para acesso.
- **Leitura:** Qualquer visitante pode ler artigos.
- **Interação:** Apenas usuários logados podem comentar, curtir, compartilhar ou participar de gamificação/pay-per-demand.
- **CTA para autores:** Cada artigo pode exibir um CTA para a página do autor, incentivando o usuário a conhecer outros artigos do mesmo autor.

### 2. Banners e Anúncios

- Banners podem ser cadastrados e posicionados (topo, lateral, entre posts).
- Anúncios podem ser exibidos em locais estratégicos do portal.

### 3. Gamificação

- Usuários acumulam pontos ao interagir (ler artigos, comentar, compartilhar).
- Conteúdos especiais são desbloqueados ao atingir metas (ex: ler 5 artigos).

### 4. Pay-per-demand

- Alguns conteúdos são pagos.
- Usuário realiza pagamento (ex: Stripe) e recebe acesso ao conteúdo.

### 5. Área do Usuário

- Cadastro/login.
- Histórico de leituras, conquistas, conteúdos pagos.
- **Apenas usuários logados podem interagir com o conteúdo.**

### 6. Painel Administrativo

- Gerenciamento de artigos, banners, anúncios, usuários e relatórios.

### 7. Páginas Dedicadas e Widgets Especiais

- O portal pode ter páginas dedicadas para conteúdos especiais, como:
  - Previsão do tempo (WeatherWidget)
  - Destaques do dia
  - Agenda de eventos
  - Perfil público de autores/usuários
- Widgets podem ser integrados na sidebar ou em páginas específicas (ex: cotação de moedas, enquetes, previsão do tempo).

---

## Banco de Dados (Supabase)

### Tabelas Principais

- **articles**:  
  - id, title, content, category, tags, image, is_premium, is_gamified, created_at

- **banners**:  
  - id, image_url, position, link, active

- **ads**:  
  - id, type, content, position, active

- **users**:  
  - id, email, password, points, premium_access

- **payments**:  
  - id, user_id, article_id, amount, status, created_at

---

## Exemplo de Componente: ArticleCard

```tsx
// components/ArticleCard.tsx
import Link from "next/link";

export default function ArticleCard({ article }) {
  return (
    <div className="border rounded p-4">
      <img src={article.image} alt={article.title} className="mb-2" />
      <h2 className="font-bold text-lg">{article.title}</h2>
      <p>{article.summary}</p>
      <Link href={`/portal/artigo/${article.slug}`}>Ler mais</Link>
    </div>
  );
}
```

---

## Exemplo de Componente: PaywallModal

```tsx
// components/PaywallModal.tsx
export default function PaywallModal({ onPay }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded">
        <h2>Conteúdo Premium</h2>
        <p>Faça o pagamento para acessar este artigo.</p>
        <button onClick={onPay} className="bg-blue-500 text-white px-4 py-2 rounded">
          Pagar e acessar
        </button>
      </div>
    </div>
  );
}
```

---

## Exemplo de Componente: WeatherWidget

```tsx
// components/WeatherWidget.tsx
export default function WeatherWidget() {
  // Aqui você pode integrar com uma API de previsão do tempo
  return (
    <div className="bg-blue-100 p-4 rounded mb-4">
      <h3 className="font-bold">Previsão do Tempo</h3>
      <p>São Paulo: 22°C, Sol</p>
    </div>
  );
}
```

---

## Exemplo de Componente: CTAAuthor

```tsx
// components/CTAAuthor.tsx
import Link from "next/link";

export default function CTAAuthor({ author }) {
  return (
    <div className="bg-gray-100 p-4 rounded mt-4">
      <p>Veja mais artigos de <Link href={`/portal/autores/${author.username}`}>{author.name}</Link></p>
    </div>
  );
}
```

---

## Fluxo de Publicação

1. **Admin** acessa o painel e publica um artigo.
2. Artigo aparece na home e na categoria correspondente.
3. Se for premium/gamificado, o usuário precisa pagar ou cumprir ação para acessar.
4. Banners e anúncios são exibidos conforme configuração.
5. Usuário interage, acumula pontos e desbloqueia conteúdos.

---

## Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Pagamentos:** Stripe/MercadoPago (para pay-per-demand)
- **Gamificação:** Sistema de pontos e conquistas

---

## Considerações Finais

- O portal é modular e expansível.
- Permite diferentes estratégias de monetização e engajamento.
- O painel administrativo facilita a gestão de todo o conteúdo.

---

Se precisar de exemplos de código para outras partes (admin, gamificação, integração com pagamentos), é só pedir! 

## Sugestões de Aperfeiçoamento

- Adicionar páginas dedicadas para conteúdos especiais (tempo, agenda, destaques).
- Incluir CTAs para perfis de autores em todos os artigos.
- Integrar widgets úteis na sidebar (tempo, cotação, enquetes).
- Melhorar SEO com páginas de autor e rotas amigáveis.
- Permitir que usuários sigam autores e recebam notificações de novos artigos.
- Adicionar área de comentários e reações por artigo.
- Implementar sistema de recomendações personalizadas. 