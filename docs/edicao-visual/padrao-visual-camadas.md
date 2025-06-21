# Padrão Visual "Camada"

Este documento descreve o padrão de design "Camada", um estilo de contêiner usado para criar profundidade, sofisticação e uma clara hierarquia visual para os principais widgets e cards da plataforma.

## 1. Conceito Principal

O padrão "Camada" baseia-se na ideia de um "card-dentro-de-um-card". Ele consiste em duas partes distintas:

1.  **A Moldura (Card Externo):** Um contêiner maior (`<Card>`) que serve como uma "moldura". Ele não tem um fundo sólido, mas sim um leve `backdrop-blur` ou uma cor semi-transparente, e seu principal objetivo é fornecer espaçamento (`padding`) e uma sombra base sutil.
2.  **O Conteúdo (Card Interno):** O `div` ou componente que contém a informação real. Este card tem um fundo sólido (`bg-card`), suas próprias bordas e uma sombra mais pronunciada, fazendo-o parecer que está "flutuando" sobre a moldura.

## 2. Implementação e Sombra Dinâmica

A característica principal deste padrão é o uso de **sombras dinâmicas** que se adaptam ao tema da interface (claro ou escuro).

-   **Modo Claro:** A sombra é preta e sutil (`shadow-black/10`), para manter uma aparência limpa.
-   **Modo Escuro:** A sombra se torna colorida (`dark:shadow-teal-500/10`, `dark:shadow-green-500/10`, etc.), criando um efeito de "brilho" (glow) que destaca o card contra o fundo escuro.

### Estrutura de Exemplo (TSX)

```tsx
// 1. A Moldura (Card Externo) com uma sombra base.
<Card className="w-full p-3 shadow-lg shadow-black/5 dark:shadow-black/20 rounded-xl bg-card/90 border-0">
  
  {/* 2. O Conteúdo (Card Interno) com a sombra dinâmica. */}
  <div className="w-full bg-card rounded-md shadow-xl shadow-black/10 dark:shadow-teal-500/10 overflow-hidden border border-black/5 dark:border-white/10">
    
    {/* ... Todo o conteúdo do widget vai aqui ... */}
    
  </div>

</Card>
```

### Classes Essenciais

-   **Card Externo (A Moldura):**
    -   `p-3`: Fornece o espaçamento que cria o efeito de moldura.
    -   `rounded-xl`: Define o arredondamento externo.
    -   `bg-card/90`: Fundo semi-transparente que permite o `backdrop-blur` funcionar.
    -   `shadow-lg shadow-black/5 dark:shadow-black/20`: Uma sombra base que se adapta ao tema.

-   **Div Interna (O Conteúdo):**
    -   `bg-card`: Fundo sólido para garantir a legibilidade do conteúdo.
    -   `rounded-md`: Arredondamento que se alinha à moldura.
    -   `shadow-xl shadow-black/10 dark:shadow-teal-500/10`: A sombra principal, que é preta no modo claro e colorida no modo escuro.
    -   `border border-black/5 dark:border-white/10`: Uma borda sutil para definir claramente os limites do card de conteúdo.

## 3. Aplicação

Este padrão foi aplicado de forma consistente nos seguintes componentes:
- `LeftProfileSidebar`
- `RightWidgetsColumn`
- `FeedCard`
- `FeedPostEditor` e barra de filtros do Feed.

Para mais detalhes sobre botões, consulte o [Guia de Padronização de Botões](./padronizacao-botoes.md).

## 4. Próximos Passos e Aprimoramentos

Esta é a versão base do Padrão Camada. A partir daqui, podemos explorar aprimoramentos, como:
- Variações de sombra e profundidade.
- Animações sutis em hover.
- Variações de cor e transparência para diferentes contextos. 