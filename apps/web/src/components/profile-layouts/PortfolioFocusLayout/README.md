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
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import PortfolioFocusLayout from './PortfolioFocusLayout';

<PortfolioFocusLayout profile={profileData} />
``` 