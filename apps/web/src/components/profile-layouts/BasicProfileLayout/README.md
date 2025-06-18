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
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import BasicProfileLayout from './BasicProfileLayout';

<BasicProfileLayout profile={profileData} />
``` 