# Edição Visual de Páginas

Este documento explica como modificar a aparência das páginas principais do sistema.

## Dashboard
- O arquivo principal é `apps/web/src/app/(app)/dashboard/page.tsx`.
- Nele você pode alterar a estrutura, adicionar/remover cards, painéis e componentes.
- Exemplo de cards customizáveis:
  ```tsx
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="rounded-xl border bg-white p-4 shadow">
      <h3 className="font-bold mb-2">Serviços</h3>
      <p className="text-sm text-muted-foreground">Gerencie seus serviços oferecidos.</p>
    </div>
    <!-- Outros cards -->
  </div>
  ```
- Para temas, cores e layout do dashboard, edite também `apps/web/src/app/(app)/dashboard/settings/appearance/page.tsx`.
- Sempre que alterar a estrutura visual do dashboard, registre aqui o que foi feito.

## Outras Páginas
- Home: `apps/web/src/app/(public)/home/page.tsx`
- Perfil: `apps/web/src/app/(public)/profile/[username]/page.tsx`

> **Dica:** Consulte também os arquivos de layout global em `apps/web/src/app/layout.tsx` e `apps/web/src/app/(app)/layout.tsx` para mudanças que afetam todas as páginas.

## Exemplo de alteração
Para adicionar um novo painel ao dashboard:
1. Abra `dashboard/page.tsx`.
2. Adicione um novo `<div className="rounded-xl border ...">` dentro do grid de cards.
3. Personalize o conteúdo e o estilo conforme necessário. 