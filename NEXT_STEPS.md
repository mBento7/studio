# Acompanhamento de Progresso e Revisões

> Última revisão: 10/07/2025  
> Responsável: Micael Bento

## Progresso Geral

- Tarefas concluídas: 15/20 (75%)
- Próxima revisão agendada: 20/07/2025

---

## Etapa 1: Estrutura e Base do Projeto
- [x] Migrar para Monorepo
- [x] Refatoração por Features
- [x] Finalizar modularização de componentes por feature (dashboard, colocation)
- [x] Centralizar lógica de dados em serviços (`src/services/`)
- [x] Modularizar utilitários conforme crescerem (`src/lib/utils.ts`)

---

## Etapa 2: Infraestrutura e Deploy
- [ ] Provisionar VPS com Ubuntu 24.04 LTS
- [ ] Atualizar o sistema e instalar dependências básicas
- [ ] Instalar Docker e Docker Compose
- [ ] Instalar e configurar Coolify
- [ ] Configurar domínio, SSL e deploy automatizado (Coolify)
- [ ] Automatizar deploy via Git/Webhook
- [ ] (Opcional) Instalar Supabase CLI
- [ ] Configurar backups e monitoramento (Coolify, Supabase)
- [ ] Garantir gestão de segredos (Coolify/Supabase Vault)
- [ ] Criar scripts de automação para abrir painéis (Coolify, Supabase, etc.)

---

## Etapa 3: Banco de Dados e Segurança
- [x] Versionar todas as migrations (migrar seed.sql para migrations)
- [x] Padronizar nomes de colunas (`profile_id`, etc.)
- [x] Documentar e versionar políticas RLS (db/policies/)
- [x] Garantir ativação de RLS em todas as tabelas sensíveis
- [x] Atualizar código para consumir novas tabelas e políticas
- [x] Checklist de segurança: revisar rotas privadas, variáveis sensíveis, auditoria de políticas, search_path explícito em funções

---

## Etapa 4: Produto, Monetização e Funcionalidades
- [ ] Implementar compra de moedas (integração de pagamentos)
- [ ] Criar e automatizar templates de e-mail (upsell, notificações)
- [ ] Integrar analytics para rastreamento de conversões e uso
- [ ] Integrar novos componentes de anúncio nas páginas correspondentes

---

## Etapa 5: Edge Functions e Escalabilidade
- [x] Criar pasta padrão para Edge Functions (`supabase/functions/`)
- [x] Implementar Edge Functions para chat, notificações, créditos, webhooks (iniciado: update-profile-visibility)
- [x] Versionar e documentar cada função (parâmetros, exemplos, políticas)
- [x] Integrar chamadas às Edge Functions no frontend (Next.js) (iniciado)
- [ ] Adicionar monitoramento/logs das funções
- [ ] Checklist de segurança para Edge Functions

---

## Etapa 6: Documentação e Automação
- [x] Atualizar README principal e READMEs de subpastas
- [x] Manter checklist de produção atualizado
- [ ] Documentar rotas públicas e privadas
- [ ] Documentar scripts de automação e painéis
- [ ] Automatizar checagem e atualização diária da documentação

---

## Etapa 7: Melhoria Contínua e Limpeza
- [ ] Organizar pacotes reutilizáveis em `packages/` (UI kit, types, hooks)
- [ ] Avaliar adoção de gerenciador de estado global (Zustand/Jotai)
- [ ] Limpeza periódica de código e pastas legadas
- [ ] Revisar e expandir automações conforme necessidade do time

---

## Etapa 8: Refatoração de Layouts React/Next.js

> Melhoria contínua para facilitar manutenção, leitura e escalabilidade dos layouts.

- [x] Mapear grandes blocos de JSX em arquivos de layout (ex: index.tsx)
- [x] Extrair blocos em componentes menores e reutilizáveis (ex: ProfileHeader, SocialLinks, ProfileStats)
- [x] Organizar componentes em subpastas específicas por layout ou por domínio
- [x] Substituir renderizações condicionais complexas por funções auxiliares ou componentes
- [x] Usar .map() para listas (skills, links, stats) com componentes pequenos
- [x] Padronizar estilos com Tailwind, CSS Modules ou styled-components
- [x] Comentar blocos complexos e documentar props importantes
- [x] Extrair lógicas de estado/manipulação para hooks customizados (ex: useProfileStats, useProfileQrCode, useProfileTheme)
- [x] Adotar Storybook para desenvolvimento isolado de componentes
- [x] Refatorar continuamente ao adicionar novas features, priorizando blocos reutilizáveis

> Observação: Apenas refinos finais (modais, seções avançadas, animações) permanecem pendentes para etapas futuras.

---

## 📄 Documentação — Feed Moderno com Tabs, Engajamento e Cards Dinâmicos

### Objetivo
Organizar e exibir cards de diferentes tipos (serviços, promoções, depoimentos, eventos, extras, etc.) em um feed moderno, responsivo e fácil de escalar, com foco em experiência do usuário (UX) e interface (UI).

---

### 1. Estrutura do Feed
O feed é composto por:
- **Tabs/Categorias**: Navegação rápida entre tipos de conteúdo.
- **Cards Dinâmicos**: Cada tipo de conteúdo tem seu próprio componente.
- **Engajamento Visível**: Curtidas, comentários, compartilhamentos e visualizações.
- **Animações**: Transições suaves ao exibir cards.
- **Responsividade**: Layout fluido para mobile e desktop.

---

### 2. Tabs/Categorias
Permite ao usuário filtrar o feed por tipo de conteúdo.
```tsx
const tabs = ["Todos", "Serviços", "Promoções", "Depoimentos", "Eventos", "Stories", "Extras"];
const [activeTab, setActiveTab] = useState("Todos");
```
O estado `activeTab` controla qual categoria está ativa. O array `tabs` define as opções disponíveis.

---

### 3. Lista de Itens do Feed
Estruture os dados do feed como um array de objetos, cada um com um tipo e dados específicos:
```tsx
const feedItems = [
  { type: "service", data: {/* ... */} },
  { type: "event", data: {/* ... */} },
  { type: "extra", data: {/* ... */} },
  // ...
];
```
Mantenha os dados de cada card separados para facilitar manutenção e expansão.

---

### 4. Filtragem por Tab
Filtre os itens do feed conforme a tab selecionada:
```tsx
const filteredItems = activeTab === "Todos"
  ? feedItems
  : feedItems.filter(item => item.type === activeTab.toLowerCase());
```

---

### 5. Função de Renderização Dinâmica
Centralize a lógica de qual componente renderizar para cada tipo de card:
```tsx
const renderFeedItem = (item, index) => {
  switch (item.type) {
    case "service": return <ServicePostCard key={index} {...item.data} />;
    case "event": return <EventCard key={index} {...item.data} />;
    // ...outros tipos
    case "extra": return <ShowcaseExtras key={index} />;
    default: return null;
  }
};
```

---

### 6. Engajamento no Rodapé dos Cards
Adicione uma área de engajamento visual em cada card principal:
```tsx
<div className="flex items-center justify-between text-sm text-muted-foreground mt-4">
  <div className="flex gap-3">
    <span className="flex items-center gap-1"><Heart className="w-4 h-4" /> 24</span>
    <span className="flex items-center gap-1"><MessageCircle className="w-4 h-4" /> 8</span>
    <span className="flex items-center gap-1"><Share2 className="w-4 h-4" /> 3</span>
  </div>
  <span className="flex items-center gap-1"><Eye className="w-4 h-4" /> 156</span>
</div>
```

---

### 7. Animações com Framer Motion
Envolva cada card em um `<motion.div>` para animação de entrada:
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
>
  {renderFeedItem(item, idx)}
</motion.div>
```

---

### 8. Layout Responsivo
Garanta que todos os cards usem:
```tsx
<Card className="w-full max-w-xl mx-auto" />
```
Assim, o layout fica centralizado e adaptável a qualquer tela.

---

### 9. Agrupamento Cronológico (Opcional)
Para feeds longos, agrupe por data:
```tsx
<h3 className="text-sm font-medium text-muted-foreground mt-10 mb-4">Hoje</h3>
{cardsDeHoje.map(renderFeedItem)}
```

---

### 10. Inclusão de Cards Extras
Importe e use os cards do `ShowcaseExtras` junto aos demais:
```tsx
import ChecklistCard from "./extras/ChecklistCard";
// ...outros imports

<section>
  <h2 className="font-bold text-lg mb-2">ChecklistCard</h2>
  <ChecklistCard />
</section>
```

---

### 11. Exemplo de Estrutura Completa
```tsx
<div>
  {/* Tabs */}
  <div className="flex gap-2 mb-6">
    {tabs.map(tab => (
      <button
        key={tab}
        className={`px-4 py-2 rounded ${activeTab === tab ? "bg-primary text-white" : "bg-muted"}`}
        onClick={() => setActiveTab(tab)}
      >
        {tab}
      </button>
    ))}
  </div>

  {/* Feed */}
  <div className="space-y-6">
    {filteredItems.map((item, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04, duration: 0.3, ease: "easeOut" }}
      >
        {renderFeedItem(item, idx)}
      </motion.div>
    ))}
  </div>
</div>
```

---

### 12. Boas Práticas
- **Componentize** cada tipo de card.
- **Centralize** a lógica de renderização.
- **Use tipos/TypeScript** para garantir segurança e clareza.
- **Mantenha o layout fluido** para mobile e desktop.
- **Teste** diferentes layouts e agrupamentos para melhor UX.

---

### 13. Expansão
- Adicione novos tipos de cards facilmente, só criando o componente e adicionando no `renderFeedItem`.
- Implemente testes A/B de layout e agrupamento.
- Integre analytics para medir engajamento real dos cards.

---

**Dúvidas ou quer um exemplo aplicado em um arquivo real do seu projeto? Só pedir!**

---

## Checklist de Segurança para APIs e Frontend

- [ ] Nunca exponha segredos, chaves privadas ou tokens sensíveis no frontend (apenas use variáveis NEXT_PUBLIC_ para valores públicos).
- [ ] Toda lógica de permissão, autenticação e regras de negócio sensíveis deve ser feita no backend (API, Edge Function, etc).
- [ ] Proteja rotas sensíveis (dashboard, admin, APIs privadas) com autenticação obrigatória.
- [ ] Implemente checagem de permissões em todas as rotas e APIs.
- [ ] Restrinja CORS nas APIs para domínios confiáveis.
- [ ] Use HTTPS obrigatório em todos os ambientes (Let's Encrypt para SSL grátis).
- [ ] Configure firewall na VPS, liberando apenas portas necessárias (80, 443, 22 restrito).
- [ ] Nunca coloque dados privados em atributos HTML, data-attributes ou variáveis globais do window.
- [ ] Adicione um robots.txt bloqueando indexação em ambientes de staging/homologação.
- [ ] Use autenticação HTTP básica ou middleware temporário para proteger ambientes de staging.
- [ ] Faça backup e monitore logs de acesso e erros.
- [ ] Audite periodicamente o que é exposto no frontend (dados, endpoints, variáveis).
- [ ] Automatize deploys e evite uploads manuais.
- [ ] Documente e revise variáveis de ambiente e segredos em todos os ambientes.

> Última atualização do checklist de segurança: 10/07/2025
