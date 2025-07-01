'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { PublicHeader } from '@/features/landing/header';

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
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

export default function MessagesPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  // Função para buscar perfil mini do outro usuário
  const fetchUserProfileMini = useCallback(async (userId: string): Promise<UserProfileMini | null> => {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, username, full_name, profile_picture_url')
      .eq('id', userId)
      .single();
    if (error || !data) return null;
    return {
      id: data.id,
      username: data.username,
      name: data.full_name || 'Usuário',
      profile_picture_url: data.profile_picture_url || '',
    };
  }, [supabase]);

  // Estado para perfis mini
  const [userProfilesMini, setUserProfilesMini] = useState<Record<string, UserProfileMini>>({});

  // Buscar perfis mini ao carregar conversas
  useEffect(() => {
    const fetchAll = async () => {
      const ids = conversations.map(conv => conv.user1_id === user?.id ? conv.user2_id : conv.user1_id);
      const uniqueIds = Array.from(new Set(ids));
      const profiles: Record<string, UserProfileMini> = { ...userProfilesMini };
      for (const id of uniqueIds) {
        if (!profiles[id]) {
          const profile = await fetchUserProfileMini(id);
          if (profile) profiles[id] = profile;
        }
      }
      setUserProfilesMini(profiles);
    };
    if (conversations.length > 0) fetchAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations]);

  // Buscar conversas do usuário
  useEffect(() => {
    if (!user?.id) return;
    const fetchConvs = async () => {
      let { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order('created_at', { ascending: false });
      if (!error && data) setConversations(data as Conversation[]);
    };
    fetchConvs();
  }, [user?.id]);

  // Buscar mensagens da conversa selecionada
  useEffect(() => {
    if (!selectedConv) return;
    const fetchMsgs = async () => {
      let { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', selectedConv.id)
        .order('created_at', { ascending: true });
      if (!error && data) setMessages(data as Message[]);
    };
    fetchMsgs();
  }, [selectedConv]);

  // Realtime: escutar novas mensagens
  useEffect(() => {
    if (!selectedConv) return;
    const channel = supabase.channel('messages-realtime')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `conversation_id=eq.${selectedConv.id}`
      }, (payload) => {
        setMessages((msgs) => [...msgs, payload.new as Message]);
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [selectedConv, supabase]);

  // Marcar mensagens como lidas ao abrir conversa
  useEffect(() => {
    if (!selectedConv || !user?.id) return;
    const markAsRead = async () => {
      await supabase
        .from('messages')
        .update({ read_by: supabase.fn.array_append('read_by', user.id) })
        .eq('conversation_id', selectedConv.id)
        .neq('sender_id', user.id)
        .or(`read_by.is.null,not.read_by.cs.{${user.id}}`);
    };
    markAsRead();
  }, [selectedConv, user?.id]);

  // Enviar mensagem
  const sendMessage = async () => {
    if (!input.trim() || !selectedConv || !user?.id) return;
    setLoading(true);
    await supabase
      .from('messages')
      .insert({
        conversation_id: selectedConv.id,
        sender_id: user.id,
        content: input.trim(),
      });
    setInput('');
    // Atualiza mensagens
    let { data: newMessages } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', selectedConv.id)
      .order('created_at', { ascending: true });
    setMessages(newMessages as Message[]);
    setLoading(false);
  };

  return (
    <>
      <PublicHeader />
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Lista de conversas */}
        <div className="w-full md:w-1/3 space-y-2">
          <h2 className="text-lg font-bold mb-2">Suas conversas</h2>
          {conversations.length === 0 && <div>Nenhuma conversa encontrada.</div>}
          {conversations.map(conv => {
            const otherId = conv.user1_id === user?.id ? conv.user2_id : conv.user1_id;
            const otherProfile = userProfilesMini[otherId];
            return (
              <Card key={conv.id} className="cursor-pointer hover:bg-muted" onClick={() => { setSelectedConv(conv); setOpen(true); }}>
                <CardContent className="p-3 flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={otherProfile?.profile_picture_url} />
                    <AvatarFallback>{otherProfile?.name?.[0] || '?'}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium">{otherProfile ? otherProfile.name : 'Usuário'}</span>
                    <span className="text-xs text-muted-foreground">@{otherProfile ? otherProfile.username : otherId}</span>
                    <span className="text-xs text-muted-foreground">Iniciada em {new Date(conv.created_at).toLocaleDateString('pt-BR')}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
        {/* Chat drawer */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-full max-w-md flex flex-col h-full">
            {selectedConv && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}>
                      <div className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${msg.sender_id === user?.id ? 'bg-primary text-white' : 'bg-muted'}`}>
                        {msg.content}
                        <div className="text-xs text-muted-foreground mt-1 text-right">
                          {new Date(msg.created_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <form className="flex gap-2 p-2 border-t bg-background" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
                  <Input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    disabled={loading}
                    className="flex-1"
                    autoFocus
                  />
                  <Button type="submit" disabled={loading || !input.trim()}>Enviar</Button>
                </form>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
} 