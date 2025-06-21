# Guia de Padronização de Botões

Este documento define os padrões para os botões usados em toda a plataforma, garantindo consistência visual e uma experiência de usuário previsível. A base do nosso sistema de botões é uma versão do componente `Button` do `shadcn/ui`, que utiliza `class-variance-authority` (CVA) para gerenciar variantes.

## 1. Implementação Base (CVA)

O componente `Button` (`/components/ui/button.tsx`) foi refatorado para usar `Slot` do Radix UI e CVA. Isso significa que ele agora aceita a propriedade `asChild` para compor com outros componentes (como `Link` do Next.js) e possui variantes de estilo pré-definidas.

### 1.1. Variantes Padrão

O componente oferece as seguintes variantes (`variant`):
- `default`: Fundo primário, para ações neutras.
- `destructive`: Fundo vermelho, para ações perigosas (ex: deletar).
- `outline`: Fundo transparente com borda.
- `secondary`: Fundo cinza sutil.
- `ghost`: Totalmente transparente, revela a cor apenas no `hover`.
- `link`: Aparência de um link de texto.

E tamanhos (`size`): `default`, `sm`, `lg`, `icon`.

## 2. Botão Primário (Ação Principal)

Usado para a ação mais importante em uma tela (ex: "Entrar em Contato", "Salvar"). Este não é uma variante, mas sim uma **combinação de classes customizadas** aplicadas ao componente `Button`.

### 2.1. Estilo Visual
- **Fundo:** Gradiente linear da cor turquesa (`#14b8a6`) para um tom mais escuro (`#0e9094`).
- **Hover:** Aumento de brilho (`hover:brightness-110`).
- **Outros:** Texto branco, `font-semibold`, sombra `shadow-md`.

### 2.2. Exemplo de Código (TSX)

Para usar, não especificamos uma `variant` e passamos as classes diretamente através de `className`.

```tsx
<Button asChild className="bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md">
  <Link href="/contato">Ação Principal</Link>
</Button>
```

---

## 3. Botão Secundário

Usado para ações secundárias (ex: "Editar Perfil", "Ver Detalhes"). Este estilo é uma **extensão da variante `outline`**.

### 3.1. Estilo Visual
- **Base:** Variante `outline`.
- **Customização:** A cor da borda e do texto é definida para nosso tom de turquesa, com um fundo sutil no `hover`.

### 3.2. Exemplo de Código (TSX)

```tsx
<Button asChild variant="outline" className="border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094]">
  <Link href="/dashboard">Ação Secundária</Link>
</Button>
```

---

## 4. Botão de Filtro / Toggle

Usado em grupos onde o usuário seleciona uma opção de várias, como na barra de filtros do feed. Este é um **componente customizado** que não utiliza o nosso `<Button>`, mas sim um `<button>` nativo com lógica de estado própria para alternar entre os estilos "ativo" e "inativo".

### 4.1. Estilo Visual e Estados

-   **Estado Ativo:** Utiliza o mesmo estilo do **Botão Primário** (gradiente turquesa).
-   **Estado Inativo:** Utiliza o mesmo estilo do **Botão Secundário** (outline turquesa).

O código para este componente pode ser encontrado em `apps/web/src/app/(app)/dashboard/feed/page.tsx`. 