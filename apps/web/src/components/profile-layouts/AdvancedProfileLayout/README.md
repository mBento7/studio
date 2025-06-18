# AdvancedProfileLayout

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
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import AdvancedProfileLayout from './AdvancedProfileLayout';

<AdvancedProfileLayout profile={profileData} />
``` 