# Padronização de Botões: Navegação e Abas

## Objetivo
Padronizar os botões de navegação (navbar/menu) e abas (tabs) do feed para garantir uma experiência consistente e profissional, mantendo flexibilidade para botões de cards e outros elementos.

---

## 1. Botões de Navegação (Navbar/Menu)

- **Formato:** Arredondado, com destaque de cor.
- **Ícone + Texto:** Ícones alinhados à esquerda do texto.
- **Hover:** Cor de fundo mais escura ou leve sombra.
- **Ativo:** Cor mais forte ou borda para indicar a página atual.
- **Acessibilidade:** `focus:ring` para navegação por teclado.

### Exemplo (Tailwind CSS)
```jsx
<button
  className="
    flex items-center gap-2
    px-4 py-2
    rounded-xl
    bg-teal-500 text-white
    font-semibold
    shadow
    transition-colors duration-150
    hover:bg-teal-600
    focus:outline-none focus:ring-2 focus:ring-teal-300
    active:bg-teal-700
  "
>
  <HomeIcon />
  Home
</button>
```

---

## 2. Botões de Abas (Tabs)

- **Formato:** Levemente arredondado, menor que o botão de navegação.
- **Cor:** Fundo mais claro, texto colorido.
- **Hover:** Fundo levemente mais escuro.
- **Ativo:** Fundo colorido, texto branco ou destacado.
- **Transição:** Suave para hover/ativo.

### Exemplo (Tailwind CSS)
```jsx
<button
  className="
    px-3 py-1.5
    rounded-full
    bg-blue-700 text-white
    font-medium
    transition-colors duration-150
    hover:bg-blue-800
    focus:outline-none focus:ring-2 focus:ring-blue-300
    active:bg-blue-900
  "
>
  Em Alta
</button>
```

---

## 3. Botões de Cards e Outros Elementos

- Podem variar conforme o contexto, mas recomenda-se manter tokens de cor, radius e fonte para harmonia visual.

---

## Resumo das Recomendações
- **Padronize:** radius, fonte, transições e tokens de cor.
- **Destaque o ativo:** cor de fundo/texto diferente.
- **Use transições suaves** para hover/ativo.
- **Mantenha ícones alinhados** nos botões de navegação.
- **Documente as variantes** para facilitar o uso por outros devs.

---

## Próximos Passos Sugeridos
1. Criar um componente único de botão (`Button.tsx`) em `src/components/ui/`.
2. Definir as variantes e tamanhos via props.
3. Substituir todos os botões do projeto pelo componente padronizado.
4. Documentar o uso no README do componente. 