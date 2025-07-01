# ProProfileLayout

**Plano:** premium

**Gatilho:** `user.plan === 'premium' && user.layoutTemplateId === 'pro-profile'`

## Itens/Seções liberados
- Todas as funcionalidades do AdvancedProfileLayout
- Testemunhos/Depoimentos em destaque
- Integração com calendários/agendamento
- Recursos avançados de SEO

Layout premium para perfis públicos, com recursos avançados e visual sofisticado para usuários de planos superiores.

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import ProProfileLayout from './ProProfileLayout';

<ProProfileLayout user={profileData} />
``` 