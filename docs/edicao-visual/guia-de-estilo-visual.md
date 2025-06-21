# Guia de Estilo Visual - WhosDo

Este documento serve como guia para o padrão visual da interface, garantindo consistência, modernidade e uma experiência de usuário profissional em toda a plataforma.

## 1. Cores

A paleta é baseada em um gradiente vibrante de turquesa, complementado por cores neutras e funcionais.

### 1.1. Gradiente Principal

Usado em elementos de destaque e botões de ação primária (Call-to-Action).

- **CSS:** `bg-gradient-to-r from-[#14b8a6] to-[#0e9094]`
- **Hover:** `hover:brightness-110`

### 1.2. Cores de Destaque

- **Cor Primária (Turquesa):** `#0e9094` (usada em textos, bordas e hovers)
- **Sucesso/Positivo:** `text-green-600`
- **Informação:** `text-blue-600` ou `text-sky-600`
- **Alerta/Urgente:** `text-red-600`

### 1.3. Cores Neutras

- **Fundo do Card:** `bg-card` (varia entre light/dark mode)
- **Texto Principal:** `text-foreground`
- **Texto Secundário/Mudo:** `text-muted-foreground`
- **Borda Sutil:** `border-black/5 dark:border-white/10`

## 2. Tipografia

A tipografia deve ser clara e legível, com uma hierarquia bem definida.

- **Títulos de Card/Widget:** `text-lg font-semibold`
- **Títulos de Post (Feed):** `font-bold text-lg`
- **Texto Padrão/Descrição:** `text-sm` ou `text-base`
- **Texto Pequeno/Metadados:** `text-xs`

## 3. Sombras e Bordas

- **Sombra Padrão:** `shadow-lg`
- **Sombra de Destaque (efeito camada):** `shadow-xl`
- **Sombra Colorida Dinâmica:** `shadow-blue-500/20`, `shadow-green-500/20`, etc. (Veja `config/feed.tsx`)
- **Raio de Borda:** `rounded-md`

## 4. Componentes

### 4.1. Botões

A especificação detalhada dos botões foi movida para seu próprio documento para melhor organização.

**Consulte:** [Guia de Padronização de Botões](./padronizacao-botoes.md)

### 4.2. Cards

#### Padrão Visual "Camada"

Este é o padrão para **todos os principais contêineres**, como o `FeedCard`, `FeedPostEditor` e os widgets das sidebars. O efeito é criado por um `Card` externo que funciona como uma moldura e um `div` interno que contém o conteúdo real, criando profundidade.

**Estrutura de Exemplo:**

```tsx
// Card externo que define a moldura e o espaçamento.
<Card className="w-full p-3 shadow-lg rounded-md bg-card/90 border-0">
  
  {/* Conteúdo interno, que tem seu próprio fundo, borda e sombra de destaque. */}
  <div className="w-full bg-card rounded-md shadow-xl overflow-hidden border border-black/5 dark:border-white/10">
    {/* ... conteúdo do card (ex: post, editor, etc.) ... */}
  </div>

</Card>
```
**Consulte:** [Padrão Visual "Camada"](./padrao-visual-camadas.md) para mais detalhes.

### 4.3. Tags e Badges

Usam um fundo semi-transparente para se integrar melhor ao card. A cor base é o turquesa.

```tsx
<Badge className="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border-teal-200/50 dark:border-teal-800/50 text-xs">
  #tag
</Badge>
``` 