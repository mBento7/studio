# PremiumProfileLayout

**Plano:** premium

**Gatilho:** `user.plan === 'premium' && (user.layoutTemplateId === 'advanced' || !user.layoutTemplateId)`

## Itens/Seções liberados
- Todas as funcionalidades do plano standard
- Maior quantidade de Serviços e Portfólio
- Integração com YouTube/Vídeos
- Banner personalizado
- Recursos de cupons avançados
- Funcionalidade de Stories

Layout avançado para perfis públicos, com foco em exibir múltiplas seções detalhadas (serviços, portfólio, skills, experiência, etc).

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import PremiumProfileLayout from './PremiumProfileLayout';

<PremiumProfileLayout user={profileData} />
``` 