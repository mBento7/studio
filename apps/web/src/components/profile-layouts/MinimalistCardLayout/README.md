# MinimalistCardLayout

**Plano:** free (usuário com perfil completo)

**Gatilho:** `user.plan === 'free' && user.isProfileComplete`

## Itens/Seções liberados
- Foto de perfil e capa em destaque
- Nome, cargo/bio proeminentes
- Botões de contato claros
- Breve introdução ou resumo
- Links sociais limitados
- QR Code do perfil
- Portfólio (apenas visualização rápida, limitado)

**Não exibe:** experiência, educação, serviços detalhados

## Props principais
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import MinimalistCardLayout from './MinimalistCardLayout';

<MinimalistCardLayout profile={profileData} />
``` 