import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase/client';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { AlertCircle, ImageIcon, Ban } from 'lucide-react';
import { isValidUUID } from "@/lib/validation";

interface ChatFloatingBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  otherUser: UserProfile;
}

interface Message {
  id: string;
  sender_id: string;
  content: string | null;
  image_url?: string;
  type: 'text' | 'image';
  created_at: string;
  read_at?: string;
}

interface UserProfileMini {
  id: string;
  username: string;
  name: string;
  profile_picture_url: string;
}

export const ChatFloatingBox: React.FC<ChatFloatingBoxProps> = ({ open, onOpenChange, otherUser }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [otherProfile, setOtherProfile] = useState<UserProfileMini | null>(null);
  const [expiresAt, setExpiresAt] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockedByMe, setBlockedByMe] = useState(false);

  // Função para verificar se o usuário atual bloqueou o outro ou foi bloqueado pelo outro
  const checkIfBlocked = useCallback(async () => {
    if (!user?.id || !otherUser?.id) return;

    // Validação de UUID
    if (!isValidUUID(user.id) || !isValidUUID(otherUser.id)) {
      setIsBlocked(false);
      setBlockedByMe(false);
      return;
    }

    // Verificar se o usuário atual bloqueou o outro
    const { data: blockedByMeData, error: blockedByMeError } = await supabase
      .from('blocked_users')
      .select('id')
      .eq('blocker_id', user.id)
      .eq('blocked_id', otherUser.id);

    // Verificar se o outro usuário bloqueou o usuário atual
    const { data: blockedByOther, error: blockedByOtherError } = await supabase
      .from('blocked_users')
      .select('id')
      .eq('blocker_id', otherUser.id)
      .eq('blocked_id', user.id);

    if ((blockedByMeError && blockedByMeError.message) || (blockedByOtherError && blockedByOtherError.message)) {
      console.error('Erro ao verificar bloqueio:', blockedByMeError?.message || blockedByOtherError?.message);
      return;
    }

    setBlockedByMe(!!blockedByMeData && blockedByMeData.length > 0);
    setIsBlocked((!!blockedByMeData && blockedByMeData.length > 0) || (!!blockedByOther && blockedByOther.length > 0));
  }, [user?.id, otherUser?.id, supabase]);

  // Efeito para verificar o status de bloqueio ao abrir ou mudar de usuário
  useEffect(() => {
    if (open && user?.id && otherUser?.id) {
      checkIfBlocked();
    }
  }, [open, user?.id, otherUser?.id, checkIfBlocked]);

  // Função para bloquear/desbloquear o outro usuário
  const toggleBlock = async () => {
    if (!user?.id || !otherUser?.id) return;

    setLoading(true);
    if (isBlocked) {
      // Desbloquear
      const { error } = await supabase
        .from('blocked_users')
        .delete()
        .eq('blocker_id', user.id)
        .eq('blocked_id', otherUser.id);

      if (error) console.error('Erro ao desbloquear:', error);
    } else {
      // Bloquear
      const { error } = await supabase
        .from('blocked_users')
        .insert({
          blocker_id: user.id,
          blocked_id: otherUser.id,
        });

      if (error) console.error('Erro ao bloquear:', error);
    }
    await checkIfBlocked(); // Atualiza o status de bloqueio após a operação
    setLoading(false);
  };

  // Buscar ou criar conversa ao abrir
  useEffect(() => {
    if (!user?.id || !otherUser?.id || !open) return;
    const fetchOrCreateConversation = async () => {
      setLoading(true);
      // Buscar conversa existente
      let { data: conv } = await supabase
        .from('conversations')
        .select('id, expires_at')
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${otherUser.id}),and(user1_id.eq.${otherUser.id},user2_id.eq.${user.id})`)
        .maybeSingle();
      // Se não existe, criar
      if (!conv) {
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({
            user1_id: user.id,
            user2_id: otherUser.id,
            expires_at: new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString(), // 48 horas no futuro
          })
          .select('id, expires_at')
          .single();
        setConversationId(newConv?.id);
        setExpiresAt(newConv?.expires_at || null);
        // Marcar mensagens como lidas ao abrir uma conversa existente
        if (newConv?.id && user?.id) {
          markMessagesAsRead(newConv.id, user.id);
        }
      } else {
        setConversationId(conv.id);
        setExpiresAt(conv.expires_at || null);
        // Marcar mensagens como lidas ao abrir uma conversa existente
        if (conv.id && user?.id) {
          markMessagesAsRead(conv.id, user.id);
        }
      }
      setLoading(false);
    };
    fetchOrCreateConversation();
  }, [user?.id, otherUser?.id, open, supabase]);

  // Função para marcar mensagens como lidas
  const markMessagesAsRead = async (convId: string, currentUserId: string) => {
    await supabase
      .from('messages')
      .update({ read_at: new Date().toISOString() })
      .eq('conversation_id', convId)
      .neq('sender_id', currentUserId) // Apenas mensagens recebidas
      .is('read_at', null); // Apenas mensagens ainda não lidas
  };

  // Buscar mensagens
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      let { data, error } = await supabase
        .from('messages')
        .select('*, read_at') // Buscar read_at também
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data as Message[]);
    };
    fetchMessages();
    // Marcar mensagens como lidas após carregá-las se o chat estiver aberto
    if (open && conversationId && user?.id) {
      markMessagesAsRead(conversationId, user.id);
    }
  }, [conversationId, open, user?.id]); // Adicionar user?.id como dependência

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enviar mensagem
  const sendMessage = async () => {
    if ((!input.trim() && !fileInputRef.current?.files?.[0]) || !conversationId || !user?.id || Boolean(expiresAt && new Date(expiresAt) < new Date()) || isBlocked) return;

    setLoading(true);
    let messageContent: string | null = input.trim();
    let messageType: 'text' | 'image' = 'text';
    let imageUrl: string | undefined;

    if (fileInputRef.current?.files?.[0]) {
      const file = fileInputRef.current.files[0];
      const filePath = `chat_images/${user.id}/${conversationId}/${Date.now()}_${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('chat-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        console.error('Erro ao fazer upload da imagem:', uploadError);
        setLoading(false);
        return;
      }
      imageUrl = supabase.storage.from('chat-images').getPublicUrl(filePath).data.publicUrl;
      messageType = 'image';
      messageContent = null;
    }

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: messageContent,
        type: messageType,
        image_url: imageUrl,
      });

    if (!error) {
      setInput('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      // Atualiza mensagens
      let { data: newMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      setMessages(newMessages as Message[]);
    }
    setLoading(false);
  };

  // Buscar perfil mini do outro usuário
  const fetchOtherProfile = useCallback(async () => {
    if (!otherUser?.id) return;
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, profile_picture_url')
      .eq('id', otherUser.id)
      .single();
    if (!error && data) {
      setOtherProfile({
        id: data.id,
        username: data.username,
        name: data.full_name || 'Usuário',
        profile_picture_url: data.profile_picture_url || '',
      });
    }
  }, [otherUser?.id, supabase]);
  useEffect(() => { fetchOtherProfile(); }, [fetchOtherProfile]);

  // Realtime: escutar novas mensagens
  useEffect(() => {
    if (!conversationId) return;
    const channel = supabase.channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${conversationId}`
      }, (payload) => {
        setMessages((msgs) => [...msgs, payload.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [conversationId, supabase]);

  const isChatDisabled = Boolean(expiresAt && new Date(expiresAt) < new Date()) || isBlocked;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-sm flex flex-col h-full">
        {/* Título acessível para screen readers */}
        <DialogTitle asChild>
          <VisuallyHidden>Chat com {otherProfile?.name || otherUser.username}</VisuallyHidden>
        </DialogTitle>
        {/* Topo com avatar e nome */}
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={otherProfile?.profile_picture_url} />
              <AvatarFallback>{otherProfile?.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{otherProfile ? otherProfile.name : 'Usuário'}</span>
              <span className="text-xs text-muted-foreground">@{otherProfile ? otherProfile.username : otherUser.username}</span>
            </div>
          </div>
          {user?.id !== otherUser.id && ( // Não mostrar o botão de bloquear para si mesmo
            <Button
              variant="outline"
              size="sm"
              onClick={toggleBlock}
              disabled={loading}
              className="flex items-center gap-1"
            >
              <Ban className="w-4 h-4" />
              {isBlocked ? 'Desbloquear' : 'Bloquear'}
            </Button>
          )}
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {/* Mensagem de expiração da conversa */}
          {expiresAt && new Date(expiresAt) < new Date() && (
            <div className="bg-yellow-100 text-yellow-800 p-2 rounded flex items-center justify-center text-sm">
              <AlertCircle className="w-4 h-4 mr-2" />
              Esta conversa expirou e não pode mais receber novas mensagens.
            </div>
          )}
          {/* Mensagem de bloqueio */}
          {isBlocked && (
            <div className="bg-red-100 text-red-800 p-2 rounded flex items-center justify-center text-sm">
              <Ban className="w-4 h-4 mr-2" />
              {blockedByMe ? 'Você bloqueou este usuário.' : 'Este usuário te bloqueou.'}
              A troca de mensagens está desabilitada.
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.sender_id === user?.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                {msg.type === 'image' ? (
                  <img src={msg.image_url} alt="Imagem enviada" className="max-w-40 h-auto object-contain rounded-md" />
                ) : (
                  msg.content
                )}
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                  {msg.sender_id === user?.id && msg.read_at && (
                    <span className="ml-1 text-blue-500">✔</span> // Indicador de lido
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form
          className="flex gap-2 p-2 border-t bg-background"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua mensagem..."
            disabled={loading || !conversationId || isChatDisabled}
            className="flex-1"
            autoFocus
          />
          <label htmlFor="image-upload" className="cursor-pointer p-2 rounded-md hover:bg-muted transition-colors flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-muted-foreground" />
            <VisuallyHidden>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={() => setInput('')}
                disabled={loading || !conversationId || isChatDisabled}
              />
            </VisuallyHidden>
          </label>
          <Button type="submit" disabled={loading || !conversationId || (!input.trim() && !fileInputRef.current?.files?.[0]) || isChatDisabled}>
            Enviar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};