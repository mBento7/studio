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
- **Avaliações (reviews) de clientes**
- **Cupons exclusivos e promoções**
- **Personalização de cores primária/secundária e fonte**
- **Contato facilitado via QR Code**
- **Prova social (social proof) com avatares e estrelas**
- **Navegação por abas entre seções (Home, Portfólio, Serviços, Contato)**
- **Animações visuais e partículas de fundo**
- **Skills em destaque com chips**
- **Seção de experiência e educação detalhadas**
- **Botões de ação aprimorados (chat, compartilhar, etc.)**
- **Stories visuais e banner premium**

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