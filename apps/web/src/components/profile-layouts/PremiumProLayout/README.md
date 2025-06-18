# PremiumProLayout

**Plano:** premium

**Gatilho:** `user.plan === 'premium' && user.layoutTemplateId === 'premium-pro'`

## Itens/Seções liberados
- Todas as funcionalidades do AdvancedProfileLayout
- Testemunhos/Depoimentos em destaque
- Integração com calendários/agendamento
- Recursos avançados de SEO

Layout premium para perfis públicos, com recursos avançados e visual sofisticado para usuários de planos superiores.

## Props principais
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import PremiumProLayout from './PremiumProLayout';

<PremiumProLayout profile={profileData} />
``` 