"use client";
import { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';

export const MessageRealtimeToastListener = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!user?.id) return;
    const channel = supabase.channel('messages-toast-global')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `sender_id=neq.${user.id}`
      }, async (payload) => {
        const msg = payload.new;
        // Não mostrar toast se já estiver na conversa aberta
        if (pathname.includes('/dashboard/messages')) return;
        // Buscar dados do remetente
        const { data: sender } = await supabase
          .from('profiles')
          .select('id, full_name, profile_picture_url, username')
          .eq('id', msg.sender_id)
          .single();
        toast({
          title: `Nova mensagem de ${sender?.full_name || 'Usuário'}`,
          description: msg.content,
          action: {
            label: 'Abrir',
            onClick: () => router.push('/dashboard/messages'),
          },
          avatar: sender?.profile_picture_url,
        });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [user?.id, pathname, router, supabase, toast]);
  return null;
}; 