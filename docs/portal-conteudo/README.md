# Portal de Conteúdo - MAGMA

Um portal de notícias e conteúdo moderno e responsivo construído com Next.js e React.

## 📋 Visão Geral

O Portal MAGMA é uma plataforma de conteúdo digital que oferece uma experiência rica e interativa para leitura de notícias, artigos e conteúdo diversificado. O portal apresenta um design moderno com animações suaves, interface responsiva e funcionalidades avançadas de interação.

**Acesso:**
- Todo o conteúdo pode ser lido publicamente, sem necessidade de login (free/read-only)
- Para interagir (comentar, curtir, compartilhar, participar de gamificação ou acessar conteúdos pay-per-demand), é necessário estar logado

## 🚀 Funcionalidades Implementadas

### Interface Principal
- **Design Responsivo**: Adaptável para desktop, tablet e mobile
- **Animações Fluidas**: Transições suaves e efeitos visuais modernos
- **Barra de Progresso de Leitura**: Indicador visual do progresso de scroll
- **Loading States**: Estados de carregamento com animações
- **Scroll to Top**: Botão flutuante para voltar ao topo

### Navegação e Busca
- **Header Fixo**: Navegação sempre acessível com efeito parallax
- **Busca Integrada**: Campo de pesquisa responsivo
- **Menu Mobile**: Navegação otimizada para dispositivos móveis
- **Categorias**: Organização por temas (Tecnologia, Negócios, Esportes, etc.)
- **Top Bar**: Barra superior com data e links de login/registro

### Conteúdo
- **Artigo em Destaque**: Seção principal com artigo destacado e overlay interativo
- **Grid de Artigos**: Layout em grade responsivo para artigos recentes
- **Tabs Dinâmicas**: Navegação entre Trending, Latest e Popular
- **Cards Interativos**: Hover effects, animações e ações flutuantes
- **Badges de Categoria**: Identificação visual das categorias
- **Tempo de Leitura**: Cálculo automático baseado no conteúdo

### Interatividade
- **Sistema de Likes**: Funcionalidade completa de curtir artigos com estado persistente
- **Compartilhamento**: Botões de compartilhamento social
- **Bookmarks**: Sistema de favoritos (interface implementada)
- **Comentários**: Interface para interação (base implementada)
- **Floating Actions**: Botões de ação que aparecem no hover

### Sidebar Avançada
- **Quick Updates**: Atualizações rápidas com notificações
- **Newsletter**: Formulário de inscrição estilizado com validação visual
- **Categorias Populares**: Lista dinâmica com contadores de posts
- **Redes Sociais**: Grid de links para plataformas sociais
- **Widgets Especiais**: Suporte para widgets customizados

## 🛠️ Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **React 18**: Biblioteca principal para UI com hooks modernos
- **TypeScript**: Tipagem estática (preparado para implementação)
- **Tailwind CSS**: Framework de CSS utilitário
- **Lucide React**: Biblioteca de ícones moderna
- **CSS Animations**: Animações customizadas avançadas
- **Unsplash API**: Imagens de alta qualidade para demonstração

## 📁 Estrutura de Arquivos

```
src/
├── app/
│   ├── (public)/
│   │   └── portal/
│   │       └── page.tsx          # Portal principal (versão simples)
│   └── portal/
│       └── page.tsx              # Portal avançado (versão completa)
├── apps/web/src/app/
│   └── portal/
│       └── page.tsx              # Implementação principal do portal
├── components/
│   ├── ArticleCard.tsx           # Componente de cartão de artigo
│   ├── WeatherWidget.tsx         # Widget de clima
│   ├── CTAAuthor.tsx            # Call-to-action para autores
│   ├── PaywallModal.tsx         # Modal de paywall
│   └── GamificationWidget.tsx   # Widget de gamificação
```

## 🎨 Design e UX

### Paleta de Cores
- **Primária**: Vermelho (#DC2626 - red-600)
- **Secundária**: Cinza (#374151 - gray-700)
- **Fundo**: Cinza claro (#F9FAFB - gray-50)
- **Texto**: Cinza escuro (#111827 - gray-900)
- **Overlay**: Gradientes com transparência

### Tipografia
- **Títulos**: Font-weight bold (700)
- **Corpo**: Font-weight normal (400)
- **Destaques**: Font-weight medium (500)
- **Hierarquia**: Tamanhos responsivos (text-xl a text-3xl)

### Animações Implementadas
- **fadeInUp**: Entrada suave de elementos com delay escalonado
- **slideInRight**: Deslizamento lateral para sidebar
- **Hover Effects**: Transformações em hover (scale, translate)
- **Loading States**: Spinner e pulse animations
- **Parallax**: Efeito parallax no hero e header
- **Backdrop Blur**: Efeitos de vidro fosco

## 📱 Responsividade

### Breakpoints
- **Mobile**: < 768px (layout em coluna única)
- **Tablet**: 768px - 1024px (layout híbrido)
- **Desktop**: > 1024px (layout completo com sidebar)

### Adaptações Implementadas
- Grid responsivo (1 coluna mobile, 2-3 colunas desktop)
- Menu hamburger funcional para mobile
- Sidebar colapsável em dispositivos menores
- Imagens responsivas com object-cover
- Texto com line-clamp para truncamento

## 🔧 Componentes Principais

### MagmaPortal (Componente Principal)
```typescript
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [activeTab, setActiveTab] = useState('trending');
const [scrollY, setScrollY] = useState(0);
const [showScrollTop, setShowScrollTop] = useState(false);
const [isLoading, setIsLoading] = useState(true);
const [likedPosts, setLikedPosts] = useState(new Set());
const [readingProgress, setReadingProgress] = useState(0);
```

### Funcionalidades Implementadas
- **Estado de Loading**: Tela de carregamento com spinner animado
- **Gerenciamento de Likes**: Sistema completo com estado local
- **Controle de Tabs**: Navegação dinâmica entre seções
- **Scroll Tracking**: Monitoramento de scroll para efeitos
- **Menu Mobile**: Toggle funcional para navegação mobile
- **Reading Progress**: Barra de progresso de leitura

## 📊 Dados Mock Implementados

### Estrutura de Artigo
```typescript
interface Article {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  likes: number;
  views: string;
}
```

### Categorias Disponíveis
- **Tecnologia**: AI, Desenvolvimento, Inovação
- **Negócios**: Finanças, Mercado, Empreendedorismo
- **Esportes**: Notícias esportivas e eventos
- **Entretenimento**: Cultura e entretenimento
- **Saúde**: Medicina e bem-estar
- **Ciência**: Pesquisas e descobertas
- **Educação**: Ensino e aprendizagem
- **Meio Ambiente**: Sustentabilidade e conservação

### Dados de Demonstração
- **Featured Posts**: 3 artigos em destaque
- **Trending Posts**: Organizados por trending, latest, popular
- **Sidebar Posts**: Quick updates com timestamps
- **Banners**: Sistema de banners posicionais

## 🚀 Como Executar

1. **Instalação das dependências**:
```bash
npm install
# ou
yarn install
```

2. **Executar em desenvolvimento**:
```bash
npm run dev
# ou
yarn dev
```

3. **Acessar o portal**:
- Portal simples: `http://localhost:3000/portal`
- Portal avançado: `http://localhost:3000/portal` (apps/web)

## 🎯 Performance e Otimizações

### Implementadas
- **Componentes React Otimizados**: Uso eficiente de hooks
- **CSS-in-JS com Tailwind**: Classes utilitárias otimizadas
- **Imagens Responsivas**: Unsplash com parâmetros de otimização
- **Lazy Loading**: Animações com delay para performance
- **Event Listeners Otimizados**: Cleanup adequado de eventos

### Métricas Alvo
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔮 Funcionalidades Futuras

### Planejadas para Implementação
- [ ] **Sistema de Autenticação**: Login/registro completo
- [ ] **Comentários Reais**: Sistema de comentários com banco de dados
- [ ] **Sistema de Notificações**: Push notifications
- [ ] **PWA**: Progressive Web App com offline support
- [ ] **Integração com CMS**: Headless CMS para conteúdo
- [ ] **Analytics**: Google Analytics e métricas customizadas
- [ ] **SEO Otimizado**: Meta tags dinâmicas e structured data

### Melhorias de UX
- [ ] **Lazy Loading de Imagens**: Intersection Observer
- [ ] **Infinite Scroll**: Carregamento progressivo
- [ ] **Filtros Avançados**: Busca por categoria, data, autor
- [ ] **Busca com Autocomplete**: Sugestões em tempo real
- [ ] **Personalização de Feed**: Algoritmo de recomendação
- [ ] **Modo Leitura**: Interface limpa para leitura
- [ ] **Dark Mode**: Tema escuro completo

### Funcionalidades Avançadas
- [ ] **Gamificação**: Sistema de pontos e conquistas
- [ ] **Pay-per-demand**: Conteúdo premium com pagamento
- [ ] **Paywall Modal**: Sistema de assinatura
- [ ] **Weather Widget**: Integração com API de clima
- [ ] **Social Sharing**: Compartilhamento real nas redes
- [ ] **Bookmark System**: Favoritos persistentes

## 🔒 Segurança

### Implementações Necessárias
- Sanitização de dados de entrada
- Validação de formulários
- Headers de segurança (CSP, HSTS)
- HTTPS obrigatório em produção
- Rate limiting para APIs

## 📈 Analytics e Monitoramento

### Eventos para Tracking
- Cliques em artigos
- Likes e shares
- Tempo de permanência
- Scroll depth
- Interações com formulários
- Navegação entre tabs

## 🗄️ Banco de Dados (Supabase)

### Tabelas Principais
```sql
-- Artigos
CREATE TABLE articles (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  tags TEXT[],
  image_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_gamified BOOLEAN DEFAULT false,
  author_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Usuários
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  points INTEGER DEFAULT 0,
  premium_access BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Banners
CREATE TABLE banners (
  id UUID PRIMARY KEY,
  title TEXT,
  image_url TEXT NOT NULL,
  link_url TEXT,
  position TEXT, -- 'top', 'sidebar', 'middle'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Interações
CREATE TABLE article_interactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  article_id UUID REFERENCES articles(id),
  interaction_type TEXT, -- 'like', 'share', 'bookmark'
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

### Padrões de Código
- Use TypeScript para tipagem
- Siga as convenções do Prettier
- Componentes funcionais com hooks
- Nomes descritivos para variáveis e funções
- Comentários em português para documentação

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👥 Equipe

- **Desenvolvimento**: Equipe MAGMA
- **Design**: UI/UX Team
- **Conteúdo**: Editorial Team
- **DevOps**: Infrastructure Team

## 📞 Suporte

Para suporte técnico ou dúvidas:
- **Email**: dev@magmaportal.com
- **Issues**: GitHub Issues
- **Documentação**: [Link para docs]
- **Discord**: [Link para servidor]

---

**MAGMA Portal** - Transformando a experiência de consumo de conteúdo digital com tecnologia moderna e design inovador.

*Última atualização: Dezembro 2024*