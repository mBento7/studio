'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase/client';
import { UserProfile } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  expires_at: string;
  messages: { content: string; created_at: string; type: string }[];
  profiles: UserProfile[]; // Para buscar os dados do outro usuário
  otherUser: UserProfile; // Adicionado para a informação do outro usuário
}

const MessagesPage = () => {
  const { currentUserProfile, loading: authLoading, user: authUser } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConversations = async () => {
      if (!authUser?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          user1_id,
          user2_id,
          created_at,
          expires_at,
          messages(content, created_at, type),
          profiles:user1_id(id, full_name, username, profile_picture_url),
          other_profiles:user2_id(id, full_name, username, profile_picture_url)
        `)
        .or(`user1_id.eq.${authUser.id},user2_id.eq.${authUser.id}`)
        .order('created_at', { ascending: false }); // Ordenar pela última mensagem ou criação

      if (error) {
        console.error('Erro ao buscar conversas:', error);
      } else {
        const processedConversations = data
          .map((conv: any) => {
            const otherUser =
              conv.user1_id === authUser.id ? conv.other_profiles : conv.profiles;
            return {
              ...conv,
              otherUser: otherUser,
              messages: conv.messages.length > 0 ? [conv.messages[0]] : [] // Pegar apenas a última mensagem para preview
            };
          })
          .filter((conv: any) => new Date(conv.expires_at) > new Date()); // Filtrar conversas não expiradas

        setConversations(processedConversations as Conversation[]);
      }
      setLoading(false);
    };

    if (!authLoading) {
      fetchConversations();
    }

    // Realtime para novas conversas ou atualizações (opcional, pode ser adicionado depois)
    const channel = supabase
      .channel('conversations-list')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          // Simplificação: apenas refetch para ver atualizações no momento
          fetchConversations();
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [authUser?.id, authLoading, supabase]);

  if (loading || authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-muted-foreground">
        <Loader2 className="h-10 w-10 animate-spin mr-3" />
        Carregando conversas...
      </div>
    );
  }

  if (!currentUserProfile || (currentUserProfile.plan !== 'standard' && currentUserProfile.plan !== 'premium')) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <MessageSquare className="w-16 h-16 text-primary mb-4" />
        <h2 className="text-2xl font-bold mb-2">Funcionalidade Premium</h2>
        <p className="text-muted-foreground mb-4">
          O Messenger está disponível apenas para usuários dos planos Standard e Premium. Faça upgrade para ter acesso ilimitado às conversas e negociações!
        </p>
        <Link href="/planos">
          <Button>Ver Planos e Fazer Upgrade</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-6 h-6" /> Suas Conversas
          </CardTitle>
        </CardHeader>
        <CardContent>
          {conversations.length === 0 ? (
            <p className="text-muted-foreground text-center">Nenhuma conversa ativa no momento.</p>
          ) : (
            <div className="space-y-4">
              {conversations.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/${conv.otherUser.username}?openChat=true`} // Abre o chat na página de perfil
                  onClick={() => {
                    // Dispara evento para abrir o chat flutuante na ProfileClientPage
                    window.dispatchEvent(
                      new CustomEvent('open-chat', {
                        detail: { user: conv.otherUser }
                      })
                    );
                  }}
                >
                  <div className="flex items-center gap-4 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conv.otherUser.profile_picture_url || '/avatar-default.png'} />
                      <AvatarFallback>{conv.otherUser.name?.[0] || '?'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium">{conv.otherUser.name || conv.otherUser.username}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {conv.messages.length > 0
                          ? conv.messages[0].type === 'image'
                            ? '[Imagem]'
                            : conv.messages[0].content
                          : 'Nenhuma mensagem.'}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {conv.messages.length > 0
                        ? new Date(conv.messages[0].created_at).toLocaleDateString('pt-BR')
                        : ''}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesPage;
