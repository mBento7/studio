# StandardProfileLayout

**Plano:** standard

**Gatilho:** `user.plan === 'standard' && (user.layoutTemplateId === 'advanced' || !user.layoutTemplateId)`

## Itens/Seções liberados
- Serviços
- Portfólio
- Habilidades
- Experiência
- Formação Acadêmica
- FAQ
- Avaliações de clientes

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
import StandardProfileLayout from './StandardProfileLayout';

<StandardProfileLayout user={profileData} />
``` 