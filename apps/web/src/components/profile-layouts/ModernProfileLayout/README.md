# ModernProfileLayout

**Plano:** standard

**Gatilho:** `user.plan === 'standard' && (user.layoutTemplateId === 'modern' || !user.layoutTemplateId)`

## Itens/Seções liberados
- Todas as funcionalidades do plano free
- Seções dedicadas para Serviços (quantidade limitada)
- Seções de Portfólio (quantidade limitada)
- Seções de Experiência e Educação
- Integração de cupons (para ofertas de serviços)
- Mais opções de links sociais

Layout moderno para perfis públicos, com visual atualizado e destaque para portfólio e redes sociais.

## Props principais
- `profile`: Objeto de perfil do usuário
- `config?`: Configurações opcionais de exibição

## Exemplo de uso
```tsx
import ModernProfileLayout from './ModernProfileLayout';

<ModernProfileLayout profile={profileData} />
``` 