# Plano de Componentização dos Layouts de Perfil

## Objetivo
Facilitar a manutenção, leitura e evolução dos layouts de perfil, seguindo as melhores práticas de React/Next.js.

## Padrões Gerais
- Componentes pequenos, reutilizáveis e bem documentados
- Organização em subpastas por layout (ex: `/PremiumProfileLayout/components/`)
- Hooks customizados para lógica de estado e manipulação
- Uso de Storybook para desenvolvimento e visualização isolada
- Padronização de nomes e convenções de props
- Comentários explicativos em blocos complexos

---

## FreeProfileLayout
**Componentes sugeridos para extração:**
- [ ] ProfileHeader
- [ ] SocialLinks
- [ ] SkillsList
- [ ] PortfolioGrid
- [ ] ServicesList
- [ ] ExperienceList
- [ ] EducationList
- [ ] ReviewList
- [ ] ProfileActions (botões de compartilhar, editar, etc)
- [ ] LocationInfo

---

## StandardProfileLayout
**Componentes sugeridos para extração:**
- [ ] ProfileHeader
- [ ] SocialLinks
- [ ] SkillsList
- [ ] PortfolioGrid
- [ ] ServicesList
- [ ] ExperienceList
- [ ] EducationList
- [ ] ReviewList
- [ ] FaqSection
- [ ] CouponsSection
- [ ] ProfileActions
- [ ] Modais de Edição (ex: EditServiceModal, EditPortfolioModal)

---

## PremiumProfileLayout
**Componentes sugeridos para extração:**
- [ ] HeroSection
- [ ] BannerPremiumSection
- [ ] ServicesSection
- [ ] PortfolioSection
- [ ] YoutubeSection
- [ ] ExperienceSection
- [ ] EducationSection
- [ ] FaqSection
- [ ] ReviewsSection
- [ ] CouponsSection
- [ ] ContactSection
- [ ] FooterSection
- [ ] ThemeCustomizer
- [ ] SocialLinks
- [ ] SkillsList
- [ ] ProfileCard
- [ ] Particles/BackgroundAnimation

---

## Convenções de Nomes e Pastas
- Cada layout deve ter uma subpasta `components/` para seus subcomponentes.
- Nomeie componentes de acordo com sua função (ex: `ProfileHeader.tsx`, `FaqSection.tsx`).
- Hooks customizados devem ficar em `hooks/` ou junto do layout se forem específicos.
- Exporte sempre as props dos componentes para facilitar reuso e documentação.

---

## Exemplos Práticos

### Exemplo de Extração de SocialLinks
```tsx
// Antes (inline no layout)
<div className="flex gap-3">
  {socialLinks.map(link => <a href={link.url}>{link.platform}</a>)}
</div>

// Depois (componente extraído)
<SocialLinks links={socialLinks} />
```

### Exemplo de Organização de Pastas
```
/PremiumProfileLayout/
  index.tsx
  components/
    HeroSection.tsx
    ServicesSection.tsx
    ...
```

---

## Checklist de Refatoração
- [ ] Mapear grandes blocos de JSX em cada layout
- [ ] Extrair componentes menores e reutilizáveis
- [ ] Organizar componentes em subpastas
- [ ] Substituir renderizações condicionais complexas por funções auxiliares ou componentes
- [ ] Usar .map() para listas com componentes pequenos
- [ ] Padronizar estilos
- [ ] Comentar blocos complexos
- [ ] Extrair lógicas para hooks customizados
- [ ] Adotar Storybook
- [ ] Refatorar continuamente ao adicionar novas features

---

> Atualize este documento conforme avançar na componentização. Consulte o `NEXT_STEPS.md` para acompanhamento do progresso geral. 

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