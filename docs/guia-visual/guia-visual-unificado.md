# Guia Visual Unificado

## Índice
1. [Introdução](#introducao)
2. [globals.css (Descrição e tokens)](#globalscss-descricao-e-tokens)
3. [Temas e Cores](#temas-e-cores)
4. [Tipografia](#tipografia)
5. [Grid e Layout](#grid-e-layout)
6. [Componentes Visuais](#componentes-visuais)
7. [Botões](#botoes)
8. [Camadas Visuais](#camadas-visuais)
9. [Boas Práticas](#boas-praticas)
10. [Refatorações e Histórico](#refatoracoes-e-historico)
11. [Páginas e Fluxos](#paginas-e-fluxos)
12. [Referências](#referencias)

---

## 1. Introdução
Este documento centraliza os padrões visuais, tokens, boas práticas e diretrizes de UI/UX do projeto. Serve como referência única para desenvolvedores e designers.

---

## 2. globals.css (Descrição e tokens)
O arquivo `globals.css` centraliza as definições globais de estilos do projeto, incluindo:

- **Importação do Tailwind:** Define as diretivas base, componentes e utilitários do Tailwind CSS.
- **Variáveis CSS:** Define tokens de cor, espaçamento, borda, tipografia e temas (light/dark) usando custom properties.
- **Estilos base:** Aplica estilos globais para elementos HTML, como `body`, `*`, e define o background gradiente padrão.
- **Utilitários customizados:** Inclui utilitários para esconder scrollbars, estilos de botões customizados, glassmorphism, etc.
- **Modo escuro:** Define variáveis e estilos específicos para o tema dark, garantindo contraste e acessibilidade.
- **Padronização:** Garante que todos os componentes e páginas sigam o mesmo padrão visual, facilitando manutenção e evolução do design.

**Exemplo de tokens principais:**
```css
:root {
  --background-start-rgb: 248, 250, 252;
  --foreground: 220 13% 18%;
  --card: 0 0% 100%;
  --primary: 174 80% 40%;
  --border: 210 20% 88%;
  /* ... */
}
.dark {
  --background-start-rgb: 17, 17, 17;
  --foreground: 0 0% 98%;
  --card: 0 0% 10%;
  --primary: 0 0% 90%;
  --border: 0 0% 20%;
  /* ... */
}
```

---

## 2.1. Uso obrigatório dos tokens do globals.css

> **Todos os componentes do projeto devem utilizar os tokens e utilitários definidos em `globals.css` para garantir consistência visual, suporte total ao dark mode e fácil manutenção.**

### Exemplos práticos:

- **Blocos principais:**
  ```jsx
  <div className="bg-card border border-border rounded-xl p-6 text-foreground dark:bg-card dark:text-foreground">
    ...
  </div>
  ```
- **Inputs:**
  ```jsx
  <input className="bg-background border border-border text-foreground rounded focus:ring-primary" />
  ```
- **Botões:**
  ```jsx
  <Button className="bg-primary text-primary-foreground hover:bg-primary/90" />
  ```
- **Estados:**
  ```jsx
  <span className="text-destructive">Erro</span>
  ```

**Evite usar cores fixas ou estilos inline. Prefira sempre as classes utilitárias e tokens definidos no globals.css.**

---

## 3. Temas e Cores
- Paleta principal e secundária definida em tokens CSS.
- Uso consistente de cores para fundo, texto, bordas e destaques.
- [Ver detalhes em temas-e-cores.md]

---

## 4. Tipografia
- Fontes padrão: Geist Sans, Inter, Arial, Helvetica, sans-serif.
- Tamanhos e pesos definidos para títulos, subtítulos e corpo.
- [Adicionar exemplos de uso e tokens se necessário]

---

## 5. Grid e Layout
- Sistema de grid responsivo baseado em Tailwind.
- Espaçamentos e colunas adaptáveis para diferentes breakpoints.
- [Ver layout-e-grid.md para exemplos de código]

---

## 6. Componentes Visuais
- Lista de componentes reutilizáveis: Card, Badge, Button, Avatar, etc.
- Cada componente segue tokens e padrões definidos no globals.css.
- [Ver componentes.md para detalhes e exemplos]

### 6.1. Filtros Visuais (FilterButton)
> **Para todos os filtros de conteúdo, utilize o componente global `FilterButton` localizado em `@/components/ui/filter-button`.**
>
> Este componente garante consistência visual, suporte a modo dark/light, acessibilidade e integração total com o padrão do site.
>
> **Exemplo visual:**
>
> ![Filtro visual padrão - modo claro](./filtro-padrao-claro.png)
> ![Filtro visual padrão - modo escuro](./filtro-padrao-escuro.png)
>
> **Exemplo de uso:**
> ```tsx
> import { FilterButton } from '@/components/ui/filter-button';
>
> <FilterButton
>   icon={SeuIcone}
>   label="Exemplo"
>   isActive={ativo}
>   onClick={() => ...}
>   premium={false}
>   disabled={false}
> />
> ```
>
> - Sempre utilize as variantes e propriedades do FilterButton para estados ativos, premium e desabilitados.
> - Não crie filtros customizados fora desse padrão.

---

## 7. Botões
- Tipos: primário, secundário, ghost, glass, etc.
- Estados: normal, hover, ativo, desabilitado.
- Tokens de cor e borda padronizados.
- [Ver padronizacao-botoes.md para exemplos de código]

### Exemplo de FilterButton (filtro visual padrão):
```tsx
<FilterButton
  icon={SeuIcone}
  label="Todos"
  isActive={activeTab === 'todos'}
  onClick={() => setActiveTab('todos')}
/>
```

---

## 8. Camadas Visuais
- Hierarquia de camadas: fundo, conteúdo, overlays, modais.
- Cada camada tem tokens e cores específicas.
- [Ver padrao-visual-camadas.md para diagramas e explicações]

---

## 9. Boas Práticas
- Uso consistente de tokens e utilitários.
- Acessibilidade: contraste, foco, ARIA.
- [Ver boas-praticas.md para exemplos e recomendações]

---

## 10. Refatorações e Histórico
- Refatoração Turquesa 2024: objetivos, antes/depois, componentes afetados.
- [Ver refatoracao-turquesa-2024.md para detalhes]

---

## 11. Páginas e Fluxos
- Lista de páginas principais e seus componentes.
- Fluxos de navegação e wireframes.
- [Ver paginas.md para detalhes]

---

## 12. Referências
- [Figma do projeto]
- [Storybook de componentes]
- [Tokens no código: apps/web/src/app/globals.css]
- [Documentação Tailwind CSS] 

---

## Referência: Plano de Componentização dos Layouts de Perfil

Para garantir a consistência visual, escalabilidade e facilidade de manutenção dos layouts de perfil, siga o [plano-componentizacao-layouts.md](./plano-componentizacao-layouts.md). Este documento detalha padrões, convenções, exemplos práticos e checklist de refatoração para a componentização dos principais layouts do projeto.

A componentização bem planejada facilita a aplicação dos padrões de UX descritos neste guia, promove reuso e acelera a evolução do frontend. 