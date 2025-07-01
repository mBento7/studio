# SuperPremiumProfileLayout

**Plano:** super-premium

**Gatilho:** `user.plan === 'super-premium' && (user.layoutTemplateId === 'super-premium' || !user.layoutTemplateId)`

## Itens/Seções liberados
- Todas as funcionalidades do plano premium
- Maior quantidade de Serviços e Portfólio
- Integração com YouTube/Vídeos
- Banner personalizado
- Recursos de cupons avançados
- Funcionalidade de Stories

Layout super premium para perfis públicos, com foco em exibir múltiplas seções detalhadas (serviços, portfólio, skills, experiência, etc) e hero section especial.

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import SuperPremiumProfileLayout from './SuperPremiumProfileLayout';

<SuperPremiumProfileLayout user={profileData} />
``` 