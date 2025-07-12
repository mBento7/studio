# Plano de Componentização dos Layouts de Perfil

## Objetivo
Facilitar a manutenção, leitura e evolução dos layouts de perfil, seguindo as melhores práticas de React/Next.js.

## Padrões Gerais
- [x] Componentes pequenos, reutilizáveis e bem documentados
- [x] Organização em subpastas por layout (ex: `/PremiumProfileLayout/components/`)
- [x] Hooks customizados para lógica de estado e manipulação (`useProfileQrCode`, `useProfileTheme`, etc)
- [x] Uso de Storybook para desenvolvimento e visualização isolada
- [x] Padronização de nomes e convenções de props
- [x] Comentários explicativos em blocos complexos
- [x] Containers de Card padronizados e documentados

---

## FreeProfileLayout
**Componentes extraídos e padronizados:**
- [x] ProfileHeader (reutilizar o componente genérico de navegação entre seções)
- [x] ProfileCardHeader (header visual: avatar, nome, bio, etc)
- [x] SocialLinks
- [x] SkillsList
- [x] PortfolioGrid
- [x] ServicesList
- [x] ExperienceList
- [x] EducationList
- [x] ReviewList
- [x] ProfileActions (botões de compartilhar, editar, etc)
- [x] LocationInfo
- [x] Tags

> Todos os componentes acima já estão extraídos, padronizados e documentados, com exemplos reais no código.

---

## StandardProfileLayout
**Componentes extraídos e padronizados:**
- [x] SocialLinks
- [x] SkillsList
- [x] PortfolioGrid
- [x] ServicesList
- [x] ExperienceList
- [x] EducationList
- [x] ProfileHeader (reutilizar o genérico)
- [x] ProfileCardHeader
- [x] ReviewList
- [x] FaqSection
- [x] ProfileActions
- [ ] Modais de Edição (ex: EditServiceModal, EditPortfolioModal) — pendente/refino

> Observação: A seção de cupons (CouponsSection) é exclusiva do PremiumProfileLayout.

---

## PremiumProfileLayout
**Componentes extraídos e padronizados:**
- [x] SocialLinks
- [x] SkillsList
- [x] PortfolioGrid
- [x] ServicesList
- [x] ExperienceList
- [x] EducationList
- [x] ProfileHeader (reutilizar o genérico)
- [x] ProfileCardHeader
- [x] HeroSection
- [x] BannerPremiumSection
- [x] YoutubeSection
- [x] FaqSection
- [ ] ReviewsSection — pendente/refino
- [ ] CouponsSection — pendente/refino
- [ ] ContactSection — pendente/refino
- [ ] FooterSection — pendente/refino
- [ ] ThemeCustomizer — pendente/refino
- [ ] ProfileCard — pendente/refino
- [ ] Particles/BackgroundAnimation — pendente/refino

> Observação: Os principais blocos visuais e funcionais já foram extraídos e padronizados. Faltam apenas seções avançadas e modais/refinos finais.

---

## Convenções de Nomes e Pastas
- [x] Cada layout possui subpasta `components/` para seus subcomponentes.
- [x] Componentes nomeados de acordo com sua função (ex: `ProfileHeader.tsx`, `FaqSection.tsx`).
- [x] Hooks customizados em `hooks/` ou junto do layout se forem específicos.
- [x] Props exportadas para facilitar reuso e documentação.

## Convenções de Props
- [x] Todos os componentes de layout recebem pelo menos:
  - `user`
  - `isCurrentUserProfile` (quando aplicável)
  - Props específicas para cada bloco (ex: `skills`, `faqs`, `education`, etc)

---

## Observações Finais
- [x] Storybook já integrado para desenvolvimento isolado dos componentes principais.
- [x] Documentação dos componentes e exemplos de uso atualizados.
- [x] Containers e hooks padronizados e documentados.
- [ ] Refino final de modais, seções avançadas e animações.

---

> Checklist revisado e atualizado automaticamente em 10/07/2025. 

---

## Diretrizes para ProfileClientPage

O `ProfileClientPage` é responsável por:
- Centralizar a escolha e renderização dos layouts de perfil (Free, Standard, Premium).
- Gerenciar estado, interatividade e hooks relacionados ao perfil.
- Garantir que todos os layouts recebam props padronizadas (user, isCurrentUserProfile, primaryColorHex, etc).
- Utilizar hooks customizados para lógica de QR Code, tema e permissões.
- Extrair componentes auxiliares (ex: botão de chat/upgrade, modal de portfólio) para facilitar reuso e manutenção.
- Documentar regras de fallback e decisões de layout.
- Garantir acessibilidade dos botões e modais.

### Checklist de melhorias sugeridas
- [ ] Extrair lógica de QR Code para hook customizado (`useProfileQrCode`)
- [ ] Extrair lógica de tema para hook customizado (`useProfileTheme`)
- [ ] Criar componente para botão de ação flutuante (`ProfileActionButton`)
- [ ] Padronizar interface de props dos layouts
- [ ] Documentar regras de fallback e decisões de layout
- [ ] Garantir acessibilidade dos botões e modais
- [ ] Remover código morto ou não utilizado
- [ ] Centralizar lógica de permissões e ações em hook/helper

> Consulte esta seção sempre que for evoluir ou refatorar o `ProfileClientPage` para manter o padrão e facilitar a manutenção do projeto. 

### Exemplo real de ProfileActions extraído
```tsx
import { ProfileActions } from "@/components/profile-layouts/ProfileActions";
// ...
<ProfileActions user={user} isCurrentUserProfile={isCurrentUserProfile} />
``` 

---

## Uso de Hooks Customizados nos Layouts de Perfil

Para centralizar lógicas recorrentes e facilitar a manutenção, utilize os hooks customizados:

- `useProfileQrCode(profileUrl: string)`: gera e gerencia a URL do QR Code do perfil.
- `useProfileTheme(initialTheme?)`: gerencia o tema do perfil (cores primária/secundária e modo claro/escuro).

**Exemplo de uso:**
```tsx
import { useProfileQrCode } from "@/components/profile-layouts/useProfileQrCode";
const { qrCodeUrl, isLoading } = useProfileQrCode(user.profileUrl || "");
```

```tsx
import { useProfileTheme } from "@/components/profile-layouts/useProfileTheme";
const { theme, setPrimaryColor, setSecondaryColor, toggleMode } = useProfileTheme();
```

> Sempre prefira hooks para lógica de QR Code, tema e outras regras de negócio compartilhadas entre layouts. 

---

## Observação sobre uso compartilhado do ProfileCardHeader

Agora, cada layout pode ter seu header visual próprio:

- `FreeProfileCardHeader.tsx`: exclusivo para o layout/plano Free.
- `ProfileCardHeaderStandardPremium.tsx`: usado para os planos Standard e Premium.
- O import default de `ProfileCardHeader` faz o roteamento automático conforme o prop `variant`.

**Como usar:**
```tsx
import ProfileCardHeader from "@/components/profile-layouts/ProfileCardHeader";

// O componente correto será renderizado automaticamente:
<ProfileCardHeader user={user} isCurrentUserProfile={isCurrentUserProfile} variant={variant} />
```

- **Toda lógica de limites, visual ou regras específicas de plano deve ser SEMPRE condicionada ao prop `variant`** (`free`, `standard`, `premium`) ou isolada no header específico.
- Alterações feitas para o Free **não afetam** Standard/Premium, pois cada um tem seu próprio componente.
- Para comportamentos ou visuais muito diferentes, basta editar o header correspondente ao plano.

### Exemplo de uso correto para social links no Free:
```tsx
// Limitar social links só no Free
let displayedSocialLinks = user.socialLinks || [];
if (variant === "free" && displayedSocialLinks.length > 0) {
  displayedSocialLinks = [
    ...displayedSocialLinks.filter(link => link.platform === 'whatsapp'),
    ...displayedSocialLinks.filter(link => link.platform !== 'whatsapp'),
  ].slice(0, 3);
}
```

- **Nunca limite ou altere visual para todos os planos sem condicionar ao `variant` ou isolar no header correto.**
- O padrão do projeto é reutilizar o máximo possível, mas respeitando as diferenças de cada plano via props/config ou componentes separados.

--- 
