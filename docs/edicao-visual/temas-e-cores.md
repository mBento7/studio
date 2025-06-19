# Temas e Cores

Este documento explica como modificar temas, cores e variáveis globais do sistema.

## Onde editar
- O arquivo principal de estilos globais é `apps/web/src/app/globals.css`.
- As configurações do Tailwind ficam em `apps/web/tailwind.config.ts`.
- Para temas dinâmicos e cores do usuário, veja `apps/web/src/app/(app)/dashboard/settings/appearance/page.tsx`.

## Exemplos reais
### Variáveis globais (CSS)
Arquivo: `globals.css`
```css
:root {
  --primary: 210 80% 36%; /* azul escuro */
  --accent: 174 100% 28%; /* teal */
  --radius: 0.75rem;
  // ... outras variáveis
}
```
- Altere valores para mudar a cor principal, bordas, etc.

### Tailwind
Arquivo: `tailwind.config.ts`
```ts
extend: {
  colors: {
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))'
    },
    // ...
  },
  borderRadius: {
    lg: 'var(--radius)',
    // ...
  },
}
```
- Adicione/edite cores e utilitários para refletir as variáveis globais.

### Temas dinâmicos
Arquivo: `dashboard/settings/appearance/page.tsx`
```tsx
const accentColors = [
  { name: "Verde Padrão", value: "149 94% 36%", ... },
  { name: "Azul", value: "210 100% 50%", ... },
  // ...
];
// ...
<Select value={selectedAccentColor?.name} ...>
```
- Adicione novas opções de cor para o usuário escolher.

## O que documentar
- Sempre que adicionar ou alterar uma cor, tema ou variável global, registre aqui.
- Explique o impacto visual e onde testar. 