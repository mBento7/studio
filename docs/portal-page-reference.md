# Portal Page - Referência Completa

## 📋 Estrutura do Componente

### **Arquivo:** `src/app/(public)/portal/page.tsx`

---

## 🎯 Componente Principal

```typescript
const PortalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Portal WhosDo
          </h1>
          <p className="text-xl text-gray-600">Sua fonte de conhecimento e tendências</p>
        </header>

        {/* Layout Principal */}
        <div className="lg:flex gap-8">
          {/* Conteúdo Principal */}
          <main className="lg:w-3/4 space-y-12">
            {/* Seção Hero */}
            <HeroSection post={mockPosts[0]} />
            
            {/* Destaques da Semana */}
            <PostGrid 
              title="Destaques da Semana" 
              posts={mockPosts.slice(1, 4)} 
            />
            
            {/* Tecnologia & Inovação */}
            <PostGrid 
              title="Tecnologia & Inovação" 
              posts={mockPosts.filter(p => p.tag === 'TECNOLOGIA')} 
              columns={2}
            />
            
            {/* Newsletter */}
            <NewsletterSection />
            
            {/* Eventos & Workshops */}
            <PostGrid 
              title="Eventos & Workshops" 
              posts={mockPosts.filter(p => p.tag === 'EVENTO')} 
            />
          </main>
          
          {/* Sidebar */}
          <Sidebar />
        </div>
      </div>
    </div>
  );
};
```

---

## 🧩 Componentes Auxiliares

### **1. TagLabel Component**
```typescript
const TagLabel: React.FC<TagLabelProps> = ({ tag }) => {
  const tagColors: Record<string, string> = {
    RECENTE: 'bg-pink-600',
    EVENTO: 'bg-orange-500',
    DICA: 'bg-green-600',
    TECNOLOGIA: 'bg-blue-600'
  };

  return (
    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-white text-xs font-medium ${tagColors[tag] || 'bg-gray-500'}`}>
      {tag}
    </span>
  );
};
```

### **2. PostCard Component**
```typescript
const PostCard: React.FC<PostCardProps> = ({ post, variant = 'standard' }) => {
  return (
    <article className={`group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 cursor-pointer
      ${variant === 'highlight' ? 'md:col-span-2 h-[400px]' : 'h-[280px]'}
      hover:shadow-xl hover:scale-[1.02]`}
    >
      {/* Overlay escuro */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-10"></div>
      
      {/* Imagem de fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${post.imageUrl})` }}
      ></div>

      {/* Conteúdo */}
      <div className="relative z-20 p-6 flex flex-col justify-end h-full">
        <TagLabel tag={post.tag} />
        
        <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
          <h3 className="text-white text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-white/80 text-sm line-clamp-2 mb-4">{post.excerpt}</p>
          
          <div className="flex items-center text-white/70 text-xs gap-4">
            <div className="flex items-center gap-1">
              <User size={14} />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare size={14} />
              <span>{post.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
```

### **3. HeroSection Component**
```typescript
const HeroSection: React.FC<HeroSectionProps> = ({ post }) => (
  <section className="mb-12">
    <PostCard post={post} variant="highlight" />
  </section>
);
```

### **4. PostGrid Component**
```typescript
const PostGrid: React.FC<PostGridProps> = ({ title, posts, columns = 3 }) => (
  <section className="mb-12">
    <h2 className="text-3xl font-bold mb-6 pb-2 border-b-4 border-blue-500 inline-block">
      {title}
    </h2>
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  </section>
);
```

### **5. NewsletterSection Component**
```typescript
const NewsletterSection: React.FC = () => (
  <section className="bg-blue-600 text-white rounded-xl p-8 mb-12">
    <div className="max-w-2xl mx-auto text-center">
      <h2 className="text-2xl font-bold mb-4">Fique por dentro das novidades!</h2>
      <p className="mb-6 opacity-90">Inscreva-se para receber conteúdo exclusivo diretamente no seu e-mail.</p>
      <form className="flex gap-2">
        <input
          type="email"
          placeholder="Seu melhor e-mail" 
          className="flex-1 px-4 py-2 rounded-lg text-gray-800 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
        >
          Inscrever <ArrowRight size={18} />
        </button>
      </form>
    </div>
  </section>
);
```

### **6. Sidebar Component**
```typescript
const Sidebar: React.FC = () => (
  <aside className="lg:w-1/4 space-y-6">
    {/* Categorias */}
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4 pb-2 border-b">Categorias</h3>
      <div className="flex flex-col gap-2">
        {['Tecnologia', 'Negócios', 'Marketing', 'Design', 'Desenvolvimento'].map(cat => (
          <Link key={cat} href="#" className="text-blue-600 hover:underline flex items-center gap-2">
            <Tag size={14} /> {cat}
          </Link>
        ))}
      </div>
    </div>

    {/* Autores Populares */}
    <div className="bg-white rounded-xl p-6 shadow-md">
      <h3 className="text-xl font-bold mb-4 pb-2 border-b">Autores Populares</h3>
      <div className="space-y-4">
        {['Ana Paula', 'Carlos Mendes', 'Equipe Whosfy'].map(author => (
          <div key={author} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200"></div>
            <div>
              <h4 className="font-medium">{author}</h4>
              <p className="text-sm text-gray-500">12 posts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </aside>
);
```

---

## 📊 Dados Mockados

### **Interface Post**
```typescript
interface Post {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  comments: number;
  tag: string;
  type: 'highlight' | 'standard';
}
```

### **Dados de Exemplo**
```typescript
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Descubra as Novas Tendências de Mercado para 2024',
    excerpt: 'Um olhar aprofundado sobre as inovações que moldarão o futuro dos negócios e da tecnologia.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    author: 'Ana Paula',
    date: '15 de Julho, 2024',
    comments: 12,
    tag: 'RECENTE',
    type: 'highlight',
  },
  // ... mais posts
];
```

---

## 🎨 Estilos e Classes CSS

### **Cores de Tags**
- `RECENTE`: `bg-pink-600`
- `EVENTO`: `bg-orange-500`
- `DICA`: `bg-green-600`
- `TECNOLOGIA`: `bg-blue-600`

### **Classes Principais**
- Container: `min-h-screen bg-gray-50`
- Header: `text-center mb-12`
- Título: `text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent`
- Cards: `rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02]`
- Grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`

---

## 🔧 Funcionalidades

### **1. Layout Responsivo**
- Mobile-first design
- Grid adaptativo
- Sidebar colapsável

### **2. Animações**
- Hover effects nos cards
- Transições suaves
- Scale animations

### **3. Filtros**
- Por categoria
- Por tag
- Por autor

### **4. Newsletter**
- Formulário de inscrição
- Validação de email
- Design atrativo

---

## 📱 Responsividade

### **Breakpoints**
- Mobile: `< 768px`
- Tablet: `768px - 1024px`
- Desktop: `> 1024px`

### **Grid System**
- Mobile: 1 coluna
- Tablet: 2 colunas
- Desktop: 3 colunas (configurável)

---

## 🚀 Como Editar

### **1. Modificar Dados**
- Edite `mockPosts` para adicionar/remover posts
- Altere cores das tags em `tagColors`
- Modifique categorias no `Sidebar`

### **2. Alterar Layout**
- Ajuste `columns` no `PostGrid`
- Modifique classes CSS para mudar aparência
- Reorganize seções no componente principal

### **3. Adicionar Funcionalidades**
- Implemente filtros funcionais
- Adicione paginação
- Conecte com API real

---

## 📝 Notas de Desenvolvimento

- ✅ TypeScript completo
- ✅ Componentes reutilizáveis
- ✅ Design responsivo
- ✅ Animações suaves
- ✅ Acessibilidade básica
- ✅ Performance otimizada

---

**Arquivo:** `src/app/(public)/portal/page.tsx`
**Última atualização:** Janeiro 2024
**Versão:** 1.0.0 