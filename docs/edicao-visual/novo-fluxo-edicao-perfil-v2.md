# Novo Fluxo de Edição de Perfil — V2

## Visão Geral
O novo fluxo de edição de perfil foi projetado para maximizar a experiência do usuário, incentivar upgrades de plano e garantir escalabilidade e clareza.

---

## Etapas do Wizard
1. **Básico:** Nome, usuário, bio
2. **Imagens:** Upload de avatar e banner/capa, contato principal
3. **Escolha de Layout:** Cards visuais, badges de plano, preview, call to action para upgrade
4. **Conteúdo:**
   - Serviços (overlay de upgrade, benefícios)
   - Links/redes sociais (overlay de upgrade, benefícios)
   - Banner personalizado (overlay de upgrade, benefícios)
   - YouTube/vídeos (overlay de upgrade, benefícios)
   - Portfólio (overlay de upgrade, benefícios)
   - FAQ (overlay de upgrade, benefícios)
   - Depoimentos (overlay de upgrade, benefícios)
   - Conquistas/certificados (overlay de upgrade, benefícios)
5. **Preview:** Visualização final do perfil

---

## UX e Estratégia de Conversão
- **Cards sempre visíveis:** Blocos aparecem mesmo bloqueados, com overlay e call to action para upgrade.
- **Benefícios claros:** Cada bloco destaca vantagens reais de desbloquear o recurso.
- **Barra de progresso visual:** Ícones e nomes das etapas, etapa atual destacada.
- **Upload de imagens com preview:** Incentivo visual e frases motivacionais.
- **Responsividade e acessibilidade:** Layout adaptado para mobile e navegação por teclado.
- **Microanimações:** Transições suaves e feedback visual ao avançar/salvar.

---

## Diferenciais por Plano
- **Free:** Básico, minimalista, upload de imagens, contato principal.
- **Standard:** Layouts modernos, links/redes sociais, banner, portfólio, serviços.
- **Premium:** YouTube/vídeos, FAQ, depoimentos, conquistas/certificados, layouts avançados.

---

## Exemplo Visual
```
[Ícone]  Nome da Etapa
────────────────────────────
[Card de conteúdo ou layout]
- Benefício 1
- Benefício 2
[Badge de plano] [Botão de upgrade]
────────────────────────────
Barra de progresso: [ícone][nome] ...
```

---

## Orientações para Expansão
- Novos blocos devem seguir o padrão: card visível, overlay de upgrade, benefícios e call to action.
- Atualizar permissões em `useFeatureAccess.ts` e `layoutFeatures.ts`.
- Usar frases motivacionais e ícones para aumentar conversão.

---

## Integração
- Pronto para integração real com Supabase.
- Upload de imagens pode ser conectado ao storage do Supabase.
- Todos os dados do perfil são salvos e carregados dinamicamente.

---

## Observações Finais
- O fluxo foi validado com foco em UX, conversão e escalabilidade.
- Pronto para expansão e personalização futura.

## Objetivo
Descrever a estrutura, nomenclaturas, rotas e componentes do novo fluxo de edição de perfil, visando padronização, clareza e escalabilidade.

---

## 1. Nomenclaturas

- **ProfileEditPageV2**: Componente principal do novo fluxo.
- **ProfileBasicTabV2**: Aba de informações básicas.
- **ProfileAppearanceTabV2**: Aba de aparência.
- **ProfileContentTabV2**: Aba de conteúdo.
- **ProfilePreviewV2**: Componente de preview dinâmico do perfil.
- **useFeatureAccess**: Hook/helper para lógica de permissão por plano/layout.
- **Blocos de conteúdo**:  
  - ServicesBlockV2  
  - PortfolioBlockV2  
  - ExperienceBlockV2  
  - SkillsBlockV2  
  - TestimonialsBlockV2  
  - etc.

---

## 2. Rotas

- **Nova rota principal:**  
  `/dashboard/profile-edit-v2`  
  (Apenas para testes e validação inicial. Depois substituirá a rota padrão `/dashboard` ou `/dashboard/profile-edit`)

- **Rotas internas (se necessário):**  
  - `/dashboard/profile-edit-v2/basic`
  - `/dashboard/profile-edit-v2/appearance`
  - `/dashboard/profile-edit-v2/content`

  *(Ou navegação controlada por estado/tab, sem alterar a URL)*

---

## 3. Estrutura de Pastas e Arquivos

```
/features/profile/new-edit-flow/
  ProfileEditPageV2.tsx
  ProfileBasicTabV2.tsx
  ProfileAppearanceTabV2.tsx
  ProfileContentTabV2.tsx
  ProfilePreviewV2.tsx
  useFeatureAccess.ts
  blocks/
    ServicesBlockV2.tsx
    PortfolioBlockV2.tsx
    ExperienceBlockV2.tsx
    SkillsBlockV2.tsx
    TestimonialsBlockV2.tsx
    // ...outros blocos
  README.md
```

---

## 4. Componentes e Responsabilidades

- **ProfileEditPageV2**  
  Controla o estado geral do perfil, navegação entre abas, integração com backend.
- **Tabs (ProfileBasicTabV2, etc.)**  
  Cada aba é responsável apenas pelo seu formulário e lógica local.
- **Blocos**  
  Cada bloco é um formulário modular (serviços, portfólio, etc), recebendo dados e função de atualização por props. Permite adicionar, remover e editar itens.
- **ProfilePreviewV2**  
  Mostra em tempo real como o perfil ficará, de acordo com as escolhas do usuário.
- **useFeatureAccess**  
  Centraliza a lógica de permissões por plano/layout. Deve ser usado em cada bloco/aba para exibir/ocultar recursos.

---

## 5. Permissões e Planos

- **Planos:**  
  - Free  
  - Standard  
  - Premium

- **Layouts:**  
  - Minimalista  
  - Moderno  
  - Portfólio  
  - Pro  
  - etc.

- **Regras:**  
  Cada plano/layout libera ou restringe certos blocos, campos e opções de aparência. Use o hook `useFeatureAccess` para centralizar e consultar permissões.

**Exemplo de uso:**
```tsx
const { canAccess } = useFeatureAccess(plan, layout);
if (!canAccess("testimonials")) {
  return <div>Recurso disponível apenas para planos pagos.</div>;
}
```

---

## 6. Integração com Backend

- **Carregar dados do perfil:**
  - Use um `useEffect` no componente principal para buscar os dados do perfil ao montar a página.
  - Exemplo:
    ```tsx
    useEffect(() => {
      async function fetchProfile() {
        const data = await getUserProfile();
        setProfile(data);
        setPlan(data.plan);
        setLayout(data.layout);
      }
      fetchProfile();
    }, []);
    ```
- **Salvar dados do perfil:**
  - Adicione um botão "Salvar" que chama a função de salvar no backend.
    ```tsx
    const handleSave = async () => {
      await saveUserProfile(profile);
      // Exibir feedback de sucesso/erro
    };
    ```
- **Serviço de API:**
  - Implemente funções como `getUserProfile` e `saveUserProfile` para integração real com API/Supabase.

---

## 7. Exemplos de Blocos Modulares

**ServicesBlockV2:**
```tsx
export function ServicesBlockV2({ services, onChange }) {
  const addService = () => onChange([...services, { name: "" }]);
  const removeService = idx => onChange(services.filter((_, i) => i !== idx));
  const updateService = (idx, value) => {
    const newServices = [...services];
    newServices[idx] = { ...newServices[idx], name: value };
    onChange(newServices);
  };
  return (
    <div>
      <h4>Serviços</h4>
      {services.map((service, idx) => (
        <div key={idx}>
          <input
            type="text"
            value={service.name}
            onChange={e => updateService(idx, e.target.value)}
            placeholder="Nome do serviço"
          />
          <button onClick={() => removeService(idx)}>Remover</button>
        </div>
      ))}
      <button onClick={addService}>Adicionar Serviço</button>
    </div>
  );
}
```

**Para outros blocos** (Portfólio, Experiência, etc), siga o mesmo padrão: receber lista de itens e função de atualização, permitir adicionar/remover/editar itens, e adicionar campos extras conforme a necessidade do bloco.

---

## 8. Observações

- O novo fluxo será acessível apenas por rota separada até estar estável.
- Após validação, substituirá o fluxo antigo.
- Toda nomenclatura de componente deve usar o sufixo `V2` para evitar conflitos durante a transição.

---

## 9. Próximos Passos

1. Validar esta documentação com o time.
2. Completar os campos e lógica de cada aba/bloco conforme a necessidade do projeto.
3. Integrar com backend real para carregar/salvar dados.
4. Expandir os blocos modulares (experiência, habilidades, depoimentos, etc).
5. Refinar o preview dinâmico para refletir fielmente o layout/plano. 