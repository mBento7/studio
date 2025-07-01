# Profile Layouts (Layouts de Perfil)

Este diretório centraliza todos os layouts de exibição de perfil disponíveis na plataforma, permitindo escolha dinâmica e escalável conforme o plano do usuário e o status do perfil.

## Arquitetura
- Cada subpasta representa um layout de perfil, com seu componente principal, configurações (`config.ts`), e documentação (`README.md`).
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

### 1. MinimalistCardLayout
- **Plano:** free (usuário com perfil completo)
- **Gatilho:** `user.plan === 'free' && user.isProfileComplete`
- **Diferenciais:** Visual limpo, destaque para foto, nome, bio, QR Code e portfólio limitado. Não exibe experiência, educação ou serviços detalhados.

### 2. BasicProfileLayout
- **Plano:** free (perfil incompleto)
- **Gatilho:** `user.plan === 'free' && !user.isProfileComplete`
- **Diferenciais:** Mostra apenas informações básicas e incentiva o preenchimento do perfil. Não exibe portfólio, serviços, experiência ou educação.

### 3. ModernProfileLayout
- **Plano:** standard
- **Gatilho:** `user.plan === 'standard' && (user.layoutTemplateId === 'modern' || !user.layoutTemplateId)`
- **Diferenciais:** Visual moderno, mais opções de links sociais, seções para serviços, portfólio, experiência e educação (quantidade limitada). Integração de cupons.

### 4. PortfolioFocusLayout
- **Plano:** standard
- **Gatilho:** `user.plan === 'standard' && user.layoutTemplateId === 'portfolio-focus'`
- **Diferenciais:** Ênfase visual em galerias de portfólio, mais itens de portfólio e serviços, ideal para profissionais criativos.

### 5. AdvancedProfileLayout
- **Plano:** premium
- **Gatilho:** `user.plan === 'premium' && (user.layoutTemplateId === 'advanced' || !user.layoutTemplateId)`
- **Diferenciais:** Todas as funcionalidades do plano standard, maior quantidade de serviços e portfólio, integração com YouTube, banner personalizado, cupons avançados e stories.

### 6. ProProfileLayout
- **Plano:** premium
- **Gatilho:** `user.plan === 'premium' && user.layoutTemplateId === 'pro-profile'`
- **Diferenciais:** Todas as funcionalidades do Advanced, mais depoimentos, integração com calendários, recursos avançados de SEO e visual sofisticado.

## Como usar
A escolha do layout é feita dinamicamente pelo array `profileLayouts` exportado em `index.ts`. Cada layout pode receber um objeto de perfil e configurações opcionais.

## Extensibilidade
Para adicionar um novo layout:
1. Crie uma nova pasta com o componente, config e README.
2. Importe e registre no `index.ts`.
3. Atualize este README. 