import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import type { UserProfile } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DialogTitle } from '@/components/ui/dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface ChatFloatingBoxProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  otherUser: UserProfile;
}

interface Message {
  id: string;
  sender_id: string;
  content: string;
  created_at: string;
}

interface UserProfileMini {
  id: string;
  username: string;
  name: string;
  profile_picture_url: string;
}

export const ChatFloatingBox: React.FC<ChatFloatingBoxProps> = ({ open, onOpenChange, otherUser }) => {
  const { user } = useAuth();
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [otherProfile, setOtherProfile] = useState<UserProfileMini | null>(null);

  // Buscar ou criar conversa ao abrir
  useEffect(() => {
    if (!user?.id || !otherUser?.id || !open) return;
    const fetchOrCreateConversation = async () => {
      setLoading(true);
      // Buscar conversa existente
      let { data: conv } = await supabase
        .from('conversations')
        .select('id')
        .or(`and(user1_id.eq.${user.id},user2_id.eq.${otherUser.id}),and(user1_id.eq.${otherUser.id},user2_id.eq.${user.id})`)
        .maybeSingle();
      // Se não existe, criar
      if (!conv) {
        const { data: newConv } = await supabase
          .from('conversations')
          .insert({ user1_id: user.id, user2_id: otherUser.id })
          .select('id')
          .single();
        setConversationId(newConv?.id);
      } else {
        setConversationId(conv.id);
      }
      setLoading(false);
    };
    fetchOrCreateConversation();
  }, [user?.id, otherUser?.id, open]);

  // Buscar mensagens
  useEffect(() => {
    if (!conversationId) return;
    const fetchMessages = async () => {
      let { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data as Message[]);
    };
    fetchMessages();
    // Opcional: subscribe realtime aqui depois
  }, [conversationId, open]);

  // Scroll automático
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Enviar mensagem
  const sendMessage = async () => {
    if (!input.trim() || !conversationId || !user?.id) return;
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content: input.trim(),
      });
    if (!error) {
      setInput('');
      // Atualiza mensagens
      let { data: newMessages } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      setMessages(newMessages as Message[]);
    }
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full max-w-sm flex flex-col h-full">
        {/* Título acessível para screen readers */}
        <DialogTitle asChild>
          <VisuallyHidden>Chat com {otherProfile?.name || otherUser.username}</VisuallyHidden>
        </DialogTitle>
        {/* Topo com avatar e nome */}
        <div className="flex items-center gap-3 border-b p-4">
          <Avatar>
            <AvatarImage src={otherProfile?.profile_picture_url} />
            <AvatarFallback>{otherProfile?.name?.[0] || '?'}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{otherProfile ? otherProfile.name : 'Usuário'}</span>
            <span className="text-xs text-muted-foreground">@{otherProfile ? otherProfile.username : otherUser.username}</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.sender_id === user?.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                {msg.content}
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
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
            disabled={loading || !conversationId}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" disabled={loading || !conversationId || !input.trim()}>
            Enviar
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}; 