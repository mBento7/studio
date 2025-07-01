# PortfolioFocusLayout

**Plano:** standard

**Gatilho:** `user.plan === 'standard' && user.layoutTemplateId === 'portfolio-focus'`

## Itens/Seções liberados
- Todas as funcionalidades do ModernProfileLayout
- Ênfase visual maior nas galerias de portfólio
- Mais itens de portfólio e serviços
- Funcionalidades de cupons

Layout focado em portfólio, ideal para profissionais criativos que desejam destacar seus trabalhos.

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import PortfolioFocusLayout from './PortfolioFocusLayout';

<PortfolioFocusLayout user={profileData} />
``` 