# 📬 Messenger (Chat) — Planejamento, Arquitetura e Roteiro de Implementação

## Visão Geral
O Messenger do WhosDo é um sistema de mensagens temporárias, voltado para negociações rápidas entre usuários dos planos Standard e Premium. As conversas são efêmeras (expiram em 48h), suportam texto e imagens, e contam com notificações em tempo real. O objetivo é facilitar negociações, não criar um chat social permanente.

---

## Arquitetura Geral
- **Frontend:** Next.js + React, componentes dedicados para chat (ChatFloatingBox, lista de conversas, notificações toast).
- **Backend:** Supabase (PostgreSQL, Auth, Storage, Realtime).
- **Banco de Dados:** Tabelas `conversations`, `messages`, `blocked_users` (opcional).
- **Realtime:** Supabase Channels para mensagens e notificações.
- **Storage:** Supabase Storage para upload de imagens.

---

## Fases e Sprints de Implementação

### Fase 1: MVP Funcional e Seguro

#### Sprint 1: Controle de Acesso e Conversa Temporária
- Adicionar campo `plan` ao perfil do usuário (se necessário).
- Implementar checagem de plano no frontend (bloquear chat para Free, exibir call-to-action para upgrade).
- Adicionar campo `expires_at` na tabela `conversations`.
- Definir `expires_at = now() + 48h` ao criar conversa.
- Criar trigger/função agendada para exclusão automática de conversas/mensagens após 48h.

**Critérios de Aceite:**
- Usuários Free não acessam o chat.
- Conversas expiram e são excluídas após 48h.

#### Sprint 2: Lista de Conversas e Chat de Texto
- Criar página `/dashboard/messages` listando conversas ativas do usuário.
- Exibir avatar, nome, preview da última mensagem, tempo.
- Permitir abrir ChatFloatingBox a partir da lista.
- Ajustar ChatFloatingBox para conversas temporárias (aviso de expiração).
- Garantir realtime (Supabase channel) e notificações toast.

**Critérios de Aceite:**
- Usuário vê conversas ativas, pode abrir e trocar mensagens de texto em tempo real.
- Recebe notificação toast ao receber nova mensagem.

---

### Fase 2: Experiência Visual e Recursos de Negociação

#### Sprint 3: Upload e Exibição de Imagens
- Criar bucket no Supabase Storage para imagens de chat.
- Adicionar campos `type` e `image_url` em `messages`.
- Adicionar botão de upload de imagem no chat.
- Implementar upload e salvar mensagem do tipo `image`.
- Renderizar imagens no chat.

**Critérios de Aceite:**
- Usuário pode enviar e visualizar imagens no chat.

#### Sprint 4: Indicação de Leitura/Entrega (Opcional)
- Adicionar campo `read_at` em `messages`.
- Atualizar `read_at` ao abrir conversa.
- Exibir status de leitura ("visualizada", "enviada").

**Critérios de Aceite:**
- Usuário vê se a mensagem foi lida pelo destinatário.

---

### Fase 3: Segurança, Moderação e Escalabilidade

#### Sprint 5: Bloqueio/Denúncia de Usuários (Opcional)
- Criar tabela `blocked_users`.
- Adicionar botão de bloquear/denunciar no chat.
- Impedir chat entre usuários bloqueados.

**Critérios de Aceite:**
- Usuário pode bloquear/denunciar outro usuário.
- Não recebe mais mensagens de usuários bloqueados.

#### Sprint 6: Notificações Push Mobile (Opcional)
- Integrar FCM ou OneSignal.
- Enviar push notification ao receber nova mensagem.

**Critérios de Aceite:**
- Usuário recebe notificação push em dispositivos móveis.

---

## Checklist Técnico Resumido
- [x] Controle de acesso por plano
- [x] Expiração automática das conversas
- [x] Lista de conversas recentes
- [x] Chat de texto em tempo real
- [x] Upload/exibição de imagens
- [x] Bloqueio/denúncia
- [ ] Indicação de leitura/entrega (opcional)
- [ ] Push mobile (em andamento: integração OneSignal)

> Observação: Push mobile está em fase de integração com OneSignal. Indicação de leitura está planejada para próxima sprint.

---

## Exemplos Técnicos

### Estrutura das Tabelas
```sql
-- conversations
id UUID PRIMARY KEY
user1_id UUID
user2_id UUID
created_at TIMESTAMP
expires_at TIMESTAMP

-- messages
id UUID PRIMARY KEY
conversation_id UUID
sender_id UUID
content TEXT
created_at TIMESTAMP
type TEXT -- 'text' ou 'image'
image_url TEXT
read_at TIMESTAMP

-- blocked_users (opcional)
id UUID PRIMARY KEY
blocker_id UUID
blocked_id UUID
created_at TIMESTAMP
```

### Exemplo de Upload de Imagem (React + Supabase)
```tsx
const handleImageUpload = async (file: File) => {
  const { data, error } = await supabase.storage
    .from('chat-images')
    .upload(`user-${user.id}/${Date.now()}-${file.name}`, file);
  if (!error) {
    const imageUrl = supabase.storage.from('chat-images').getPublicUrl(data.path).publicUrl;
    await supabase.from('messages').insert({
      conversation_id,
      sender_id: user.id,
      type: 'image',
      image_url: imageUrl,
    });
  }
};
```

### Renderização de Mensagem no Chat
```tsx
{msg.type === 'image' ? (
  <img src={msg.image_url} alt="imagem enviada" className="max-w-xs rounded" />
) : (
  <span>{msg.content}</span>
)}
```

### Trigger para Exclusão Automática (Postgres)
```sql
CREATE OR REPLACE FUNCTION delete_expired_conversations() RETURNS void AS $$
BEGIN
  DELETE FROM messages WHERE conversation_id IN (
    SELECT id FROM conversations WHERE expires_at < now()
  );
  DELETE FROM conversations WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;
-- Agendar com pg_cron ou Supabase Edge Function
```

---

## Observações de Negócio
- O chat é exclusivo para planos Standard e Premium.
- Conversas são temporárias (48h) e removidas automaticamente.
- Foco em negociação rápida, não em relacionamento contínuo.
- Imagens são permitidas, com limitação de tamanho e tipo.
- Sistema de bloqueio robusto, com validação de UUIDs para evitar erros de consulta.
- Integração de notificações push via OneSignal em andamento.

---

## Fluxo Resumido do Usuário
1. Usuário (standard/premium) inicia chat com outro usuário elegível.
2. Conversa é criada com `expires_at = now() + 48h`.
3. Mensagens podem ser texto ou imagem.
4. Notificações em tempo real e toast são exibidas.
5. Após 48h, conversa e mensagens são excluídas automaticamente.
6. Usuários free veem call-to-action para upgrade ao tentar acessar o chat.

---

> Para detalhes técnicos adicionais, consulte os READMEs dos componentes e a documentação do app web. 