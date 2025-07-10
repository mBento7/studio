# Profile Layouts (Layouts de Perfil)

Este diretório centraliza todos os layouts de exibição de perfil disponíveis na plataforma, permitindo escolha dinâmica e escalável conforme o plano do usuário e o status do perfil.

## Arquitetura
- Cada subpasta representa um layout de perfil, com seu componente principal (`index.tsx`), configurações (`config.ts`), e documentação (`README.md`).
- O arquivo `index.ts` registra todos os layouts e exporta um array `profileLayouts` com metadados, componente principal e componente de resultado de busca para cada layout.
- A escolha do layout é feita dinamicamente conforme o plano do usuário e o status do perfil.

## Props padrão dos layouts
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Layouts Disponíveis

### 1. FreeProfileLayout
- **Plano:** free/standard
- **Diferenciais:** Visual moderno, links sociais, seções para serviços, portfólio, experiência e educação. Integração de cupons.

### 2. StandardProfileLayout
- **Plano:** premium
- **Diferenciais:** Todas as funcionalidades do plano standard, maior quantidade de serviços e portfólio, integração com YouTube, banner personalizado, cupons avançados e stories.

### 3. PremiumProfileLayout
- **Plano:** premium
- **Diferenciais:** Layout premium com animações, stories, reviews, cupons, portfólio expandido e visual diferenciado.

### 4. EnhancedProfileLayout
- **Plano:** premium
- **Diferenciais:** Layout moderno, animado e personalizável, com navegação flutuante, métricas animadas e customização de tema.

## Como usar
A escolha do layout é feita dinamicamente pelo array `profileLayouts` exportado em `index.ts`. Cada layout pode receber um objeto de perfil e configurações opcionais.

## Como adicionar um novo layout
1. Crie uma nova pasta com o componente principal (`index.tsx`), `config.ts` e `README.md`.
2. Importe e registre no `index.ts` da raiz.
3. Atualize este README.

## Estrutura recomendada
```
profile-layouts/
  EnhancedProfileLayout/
    index.tsx
    config.ts
    README.md
  FreeProfileLayout/
    index.tsx
    config.ts
    README.md
  PremiumProfileLayout/
    index.tsx
    config.ts
    README.md
  StandardProfileLayout/
    index.tsx
    config.ts
    README.md
  layoutFeatures.ts
  index.ts
  index.tsx
  README.md
```

## Observações
- Consulte o README de cada layout para detalhes e particularidades.
- Utilize os arquivos de configuração para registrar e listar layouts dinamicamente. 