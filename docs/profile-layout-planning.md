# Documento de Estratégia: Layouts de Perfil, Planos e Recursos Futuros

### 1. Introdução

Este documento descreve a estratégia para a organização dos layouts de perfil de usuário na plataforma, vinculando-os diretamente aos planos de assinatura (`free`, `standard`, `premium`) e delineando os recursos associados a cada um. Também exploramos "extras futuros" potenciais para cada plano, visando a expansão da plataforma.

### 2. Visão Geral dos Layouts Atuais e Proposta de Reorganização

Atualmente, dispomos dos layouts: `BasicProfileLayout`, `ModernProfileLayout` e `AdvancedProfileLayout`. A proposta é reorganizá-los e introduzir novos layouts para se adequarem melhor aos planos e à complexidade das informações do perfil.

#### 2.1. Plano Básico (`free`)

O plano `free` terá dois layouts condicionados à completude das informações do usuário.

*   **`BasicProfileLayout` (para Perfis Incompletos)**
    *   **Descrição:** Layout simples, focado em informações essenciais. Será exibido automaticamente para usuários do plano `free` que ainda não preencheram um conjunto mínimo de informações no perfil (ex: foto de perfil, foto de capa, bio, etc.).
    *   **Recursos:**
        *   Informações de contato básicas (e-mail, telefone, localização).
        *   Links sociais limitados (ex: 1-2).
        *   Sem seções de portfólio, serviços, experiência ou educação visíveis (ou com placeholders incentivando o preenchimento).
    *   **Gatilho:** `user.plan === 'free'` E `!user.isProfileComplete` (necessário definir `isProfileComplete` com base em critérios internos).

*   **`MinimalistCardLayout` (o "Template da Maria Standard" para Perfis Completos)**
    *   **Descrição:** Um layout mais visual e limpo para usuários `free` que preencheram suas informações. Foca na apresentação de uma "entrada" elegante para o perfil.
    *   **Recursos:**
        *   Foto de perfil e capa em destaque.
        *   Nome, cargo/bio proeminentes.
        *   Botões de contato claros.
        *   Pode incluir uma breve introdução ou resumo.
        *   Pode ter um link direto para o perfil completo (mesmo que com layout básico, se o plano free não permitir mais).
    *   **Gatilho:** `user.plan === 'free'` E `user.isProfileComplete`
    *   **Notas:** Este layout seria o atual `MinimalistCardLayout`.

#### 2.2. Plano Standard (`standard`)

O plano `standard` oferecerá **dois layouts distintos**, permitindo que o usuário escolha o que melhor se adapta às suas necessidades.

*   **`ModernProfileLayout` (Layout Padrão 1)**
    *   **Descrição:** Layout limpo e moderno, ideal para profissionais que buscam apresentar serviços e um portfólio de tamanho médio.
    *   **Recursos:**
        *   Todas as funcionalidades do plano `free` (`MinimalistCardLayout`).
        *   Seções dedicadas para **Serviços (quantia limitada)** e **Portfólio (quantia limitada)**.
        *   Seções de Experiência e Educação.
        *   Integração de cupons (para ofertas de serviços).
        *   Mais opções de links sociais.
    *   **Gatilho:** `user.plan === 'standard'` E `user.layoutTemplateId === 'modern'` (ou default para standard se não especificado)

*   **`PortfolioFocusLayout` (Layout Padrão 2)**
    *   **Descrição:** Um layout projetado para destacar visualmente o portfólio do usuário, ideal para criativos, designers e artistas.
    *   **Recursos:**
        *   Similar ao `ModernProfileLayout`, mas com uma ênfase visual maior nas galerias de portfólio.
        *   Funcionalidades de cupons.
        *   Maior quantidade de itens de portfólio e serviços.
    *   **Gatilho:** `user.plan === 'standard'` E `user.layoutTemplateId === 'portfolio-focus'`
    *   **Notas:** Este layout corresponde ao `PortfolioFocusLayout`.

#### 2.3. Plano Premium (`premium`)

O plano `premium` oferecerá **dois layouts avançados**, com a gama completa de recursos para profissionais que desejam a máxima personalização e destaque.

*   **`AdvancedProfileLayout` (Layout Premium 1)**
    *   **Descrição:** Um layout robusto e abrangente, ideal para profissionais com vasta experiência, muitos serviços e portfólio extenso.
    *   **Recursos:**
        *   Todas as funcionalidades do plano `standard`.
        *   **Maior quantidade de Serviços e Portfólio**.
        *   Integração com **YouTube/Vídeos** (para apresentação de conteúdo multimídia).
        *   Espaço para **Banner Personalizado** (promoções, anúncios).
        *   Recursos de **Cupons Avançados**.
        *   Funcionalidade de **Stories** (pequenas atualizações visuais/vídeos temporários no perfil).
    *   **Gatilho:** `user.plan === 'premium'` E `user.layoutTemplateId === 'advanced'` (ou default para premium se não especificado)

*   **`PremiumProLayout` (Layout Premium 2)**
    *   **Descrição:** Um layout de nível profissional, com foco em otimização para negócios e maior controle sobre a apresentação do conteúdo.
    *   **Recursos:**
        *   Todas as funcionalidades do `AdvancedProfileLayout`.
        *   Pode incluir opções de **Testemunhos/Depoimentos** em destaque.
        *   Integração com calendários ou ferramentas de agendamento (ex: Calendly).
        *   Recursos avançados de SEO na página do perfil.
    *   **Gatilho:** `user.plan === 'premium'` E `user.layoutTemplateId === 'premium-pro'`
    *   **Notas:** Este layout corresponde ao `PremiumProLayout`.

### 3. Possíveis "Extras Futuros" por Plano

Esta seção sugere recursos adicionais que poderiam ser implementados no futuro para diferenciar ainda mais os planos e agregar valor aos usuários.

#### 3.1. Extras Futuros para o Plano Básico (`free`)

*   **Links Sociais Otimizados:** Mais opções de plataformas sociais pré-definidas.
*   **Analytics Básicos:** Contagem de visualizações do perfil.
*   **QR Code Personalizável:** Permite escolher cores e incluir logo básico.
*   **"Mini-Blog" Simples:** Seção para poucas postagens curtas.

#### 3.2. Extras Futuros para o Plano Standard (`standard`)

*   **Templates de Cupons Avançados:** Mais modelos e opções de personalização para cupons.
*   **Integração com Google Analytics:** Para dados de tráfego mais detalhados.
*   **Agendamento de Serviços:** Ferramenta integrada para agendamento de reuniões/serviços.
*   **Formulário de Contato Personalizado:** Permite criar campos personalizados no formulário de contato do perfil.
*   **Versão Imprimível do Cartão de Visitas Digital:** Opções de design para um cartão de visitas físico gerado a partir do perfil.

#### 3.3. Extras Futuros para o Plano Premium (`premium`)

*   **Domínio Personalizado:** Possibilidade de usar um domínio próprio (ex: `seunome.com`) para o perfil.
*   **SEO Avançado:** Controles de meta-descrição, palavras-chave, etc., para cada seção do perfil.
*   **Integração com E-commerce (Lite):** Venda de produtos ou serviços diretamente do perfil (via Stripe, por exemplo).
*   **Chat ao Vivo (Lite):** Integração com plataformas de chat para comunicação direta com visitantes.
*   **A/B Testing de Layouts:** Capacidade de testar diferentes layouts para otimizar conversões.
*   **Análise de Desempenho de Portfólio:** Métricas de engajamento para itens do portfólio.
*   **Integração com Ferramentas de Marketing por E-mail:** Captura de leads diretamente do perfil.
*   **Suporte Prioritário:** Acesso rápido à equipe de suporte.

### 4. Próximos Passos (Implementação)

1.  **Atualizar `mock-data.ts`**: **(Concluído)**
    > As propriedades `layoutTemplateId` e `isProfileComplete` já estão definidas nos usuários mock em `apps/web/src/lib/mock-data.ts` para refletir os mapeamentos dos layouts e planos.

2.  **Ajustar `ProfileClientPage.tsx`**: **(Concluído)**
    > A lógica de `switch` em `apps/web/src/app/(public)/profile/[username]/ProfileClientPage.tsx` foi ajustada para incorporar os novos `layoutTemplateId` e as condições (`isProfileComplete`) para os diferentes planos, especialmente o `free`.

3.  **Criar/Atualizar Componentes de Layout**: **(Concluído)**
    > Todos os componentes de layout (`BasicProfileLayout.tsx`, `ModernProfileLayout.tsx`, `AdvancedProfileLayout.tsx`, `MinimalistCardLayout.tsx`, `PortfolioFocusLayout.tsx`, `PremiumProLayout.tsx`) foram criados ou atualizados para estarem em conformidade com as novas definições de props (`user` em vez de `userProfile`) e estrutura.

4.  **Definir `isProfileComplete`**: Implementar uma função ou lógica para determinar se um perfil `free` está "completo" o suficiente para ativar o `MinimalistCardLayout`. Isso pode envolver verificar a presença de `profilePictureUrl`, `coverPhotoUrl`, `bio`, etc.

5.  **Refatorar Funções Legadas (se aplicável)**: **(Concluído - Nenhuma ação necessária)**
    > A função `updateMockUserLayout` (se ainda existisse) não é mais relevante, pois a seleção do layout agora é intrinsecamente ligada ao plano e à completude do perfil, e não a uma função de atualização direta de layout via mock.

---

## ✅ Conclusão

Este documento foi atualizado para refletir o progresso da reestruturação da organização dos layouts de perfil. A nova estrutura é mais robusta e modular.

---

## Editar e Personalizar Layouts de Perfil

### Melhores Práticas

1. **Componentização**  
   Separe partes reutilizáveis dos layouts em componentes menores (ex: Avatar, Card, Lista de Skills, etc).

2. **Uso de Props e Configurações**  
   Permita que os layouts recebam props/configurações para customizar cores, fontes, exibição de seções, etc.

3. **Slots/Children**  
   Utilize `children` ou slots para permitir inserção de conteúdo customizado em pontos estratégicos do layout.

4. **CSS Isolado**  
   Use módulos CSS, Tailwind ou styled-components para garantir que estilos de um layout não afetem outros.

5. **Hooks e Utilitários**  
   Crie hooks para lógica compartilhada (ex: formatação de dados, manipulação de preferências do usuário).

6. **Storybook e Documentação**  
   Utilize Storybook para visualizar e documentar variações dos layouts, facilitando testes e customizações.

7. **Tipagem e Validação**  
   Defina tipos claros para as props dos layouts, garantindo robustez e facilitando manutenção.

8. **Fallbacks Seguros**  
   Sempre trate campos opcionais ou ausentes (ex: arrays vazios, objetos undefined) para evitar erros de runtime.

9. **Persistência de Preferências**  
   Salve as escolhas de layout/configuração do usuário no banco de dados ou localStorage para personalização persistente.

### Recomendações Gerais
- Mantenha os layouts desacoplados da lógica de dados sempre que possível.
- Documente claramente quais props/configurações cada layout aceita.
- Permita fácil adição de novos layouts seguindo o padrão estabelecido.
- Considere internacionalização (i18n) para textos e labels dos layouts.

---

Essas práticas garantem flexibilidade, escalabilidade e facilidade de manutenção na personalização dos layouts de perfil.

---

> Criado por Micael Bento | Estrutura recomendada por ChatGPT (OpenAI) 