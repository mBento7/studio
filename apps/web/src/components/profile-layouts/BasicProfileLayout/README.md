# BasicProfileLayout

**Plano:** free (usuário com perfil incompleto)

**Gatilho:** `user.plan === 'free' && !user.isProfileComplete`

## Itens/Seções liberados
- Informações de contato básicas (e-mail, telefone, localização)
- Nome, foto de perfil (se houver)
- Links sociais limitados (1-2)
- Placeholders incentivando o preenchimento do perfil

**Não exibe:** portfólio, serviços, experiência, educação (ou apenas placeholders)

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import BasicProfileLayout from './BasicProfileLayout';

<BasicProfileLayout user={profileData} />
``` 