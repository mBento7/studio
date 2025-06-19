# Boas Práticas de Design Visual

- Use componentes reutilizáveis sempre que possível.
- Siga o padrão de cores e espaçamentos definidos no tema.
- Documente mudanças visuais importantes nesta pasta.
- Teste sempre em diferentes navegadores e dispositivos.
- Prefira classes utilitárias do Tailwind para garantir consistência.
- Consulte o time de design antes de grandes alterações visuais.

## Exemplos reais do projeto
- **Botões**: Sempre utilize o componente `Button` de `ui/button.tsx` para garantir padronização.
- **Cards**: Use o componente `Card` de `ui/card.tsx` para blocos de conteúdo.
- **Grid**: Utilize o `MainGridLayout` para páginas com sidebars.
- **Cores**: Defina e altere cores apenas via variáveis em `globals.css` e `tailwind.config.ts`.
- **Responsividade**: Use as classes do Tailwind (`md:`, `lg:`, etc) para garantir que o layout funcione em todos os dispositivos.
- **Feedback visual**: Utilize o componente `Toast` para mensagens ao usuário. 