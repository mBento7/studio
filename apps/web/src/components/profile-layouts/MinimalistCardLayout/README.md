# MinimalistCardLayout

**Plano:** free (usuário com perfil completo)

**Gatilho:** `user.plan === 'free' && user.isProfileComplete`

## Itens/Seções liberados
- Foto de perfil em destaque
- Nome, cargo/bio proeminentes
- Botões de contato claros
- Breve introdução ou resumo
- Links sociais (2)
- QR Code do perfil
- Portfólio (2)
- Serviços (1)
- Experiência (não)
- Educação (não)

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import MinimalistCardLayout from './MinimalistCardLayout';

<MinimalistCardLayout user={profileData} />
``` 