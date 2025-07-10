# Checklist — Edição de Perfil via Modais (Centralizada, Inline e Coluna Lateral)

Siga cada passo, marque como feito (✔️) ao concluir, e atualize conforme necessário.

---

## 1. Estrutura Inicial
- [✔️] Padronizar a edição de todas as seções do perfil via modais, acessíveis a partir de um botão 'Editar Perfil'.
- [✔️] Criar/ajustar um botão global "Editar Perfil" (visível apenas para o próprio usuário).

## 2. Edição Centralizada
- [ ] Implementar painel/modal central de edição com todas as seções (avatar, capa, bio, serviços, portfólio, experiência, FAQ, cupons), reutilizando componentes já existentes.
- [ ] Encapsular o fluxo de edição já existente (`ProfileEditPageV2`) em um modal centralizado.
- [ ] Permitir abrir o modal centralizado tanto pelo botão global quanto por ícones inline.

## 3. Edição Inline (Direto pelo Perfil)
- [✔️] Adicionar ícones/botões de edição em seções importantes (avatar, capa, bio, serviços, portfólio, etc.), visíveis apenas para o próprio usuário.
- [✔️] Permitir abrir o mesmo modal de edição ao clicar nesses ícones/botões.

## 4. Coluna Lateral Direita (Configurações rápidas)
- [ ] Implementar componente de coluna lateral direita (`ProfileSidebarSettings`) para configurações rápidas do perfil.
- [ ] Integrar o componente `ProfileVisibilitySettings` para controle de visibilidade pública e seções exibidas.
- [ ] Adicionar opções como: alterar URL personalizada, exibir/ocultar foto de perfil, imagem de fundo, título, selo de perfil público, etc.
- [ ] Garantir responsividade e integração com o layout existente.

## 5. Componentização e Consistência
- [✔️] Reutilizar os mesmos componentes/modais de edição tanto no painel centralizado quanto na edição inline.
- [ ] Garantir sincronização de estado entre edições feitas pelo painel central, pelas seções inline e pela coluna lateral (usar contexto global ou state management).

## 6. Limites e Validações
- [✔️] Garantir que todos os modais respeitem os limites do plano do usuário (`PLAN_LIMITS`).
- [✔️] Adicionar validações e feedbacks visuais para erros e limites.

## 7. Testes e Experiência
- [ ] Testar toda a experiência de edição (centralizada, inline e coluna lateral).
- [✔️] Garantir que apenas o próprio usuário veja e acesse o painel de edição, os modais e a coluna lateral.
- [ ] Verificar se alterações feitas em um modo refletem nos outros instantaneamente.
- [ ] Coletar feedback de usuários (opcional).

---

> Use comentários, commits descritivos e atualize este checklist conforme o progresso do projeto! 