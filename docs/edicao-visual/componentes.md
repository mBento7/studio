# Componentes Visuais

Este documento orienta sobre a edição de componentes reutilizáveis do sistema.

## Onde encontrar
- Os componentes ficam em `apps/web/src/components/`.
- Componentes de UI base: `apps/web/src/components/ui/` (botão, card, input, etc).
- Componentes de layout: `apps/web/src/components/layout/` (sidebars, containers, etc).
- Componentes de perfil: `apps/web/src/components/profile-layouts/`.

## Exemplos reais
### Botão
Arquivo: `ui/button.tsx`
```tsx
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'default', size = 'md', ... }, ref) => {
    return (
      <button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          ...
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
```
- Para criar um novo estilo, adicione em `variantStyles`.

### Card
Arquivo: `ui/card.tsx`
```tsx
const Card = React.forwardRef<...>(...)
// Usa classes como "rounded-lg border bg-card ..."
```
- Altere as classes para mudar o visual global dos cards.

### Avatar
Arquivo: `ui/avatar.tsx`
```tsx
const Avatar = React.forwardRef<...>(...)
// Usa "rounded-full" para avatar circular
```

### Badge
Arquivo: `ui/badge.tsx`
```tsx
const badgeVariants = cva(
  "inline-flex items-center rounded-full border ...",
  { variants: { ... } }
)
```
- Adicione variantes para novos estilos de destaque.

### Toast
Arquivo: `ui/toast.tsx`
```tsx
const Toast = React.forwardRef<...>(...)
// Usa classes para cor, borda e animação do toast
```

## Como editar
- Para alterar o visual de um botão, edite `button.tsx`.
- Para cards, edite `card.tsx`.
- Sempre que alterar um componente base, registre aqui o que foi feito e o impacto visual.

> **Importante:** Mudanças em componentes base afetam todo o sistema. Teste em diferentes páginas! 