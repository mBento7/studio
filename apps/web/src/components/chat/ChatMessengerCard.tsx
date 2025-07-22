import React, { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { IoChatbubbleEllipsesOutline, IoChevronDown, IoOpenOutline, IoChevronUp, IoSearch, IoList, IoMailOutline } from 'react-icons/io5';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface ChatMessengerCardProps {
  onOpenMessages?: () => void;
  minimized?: boolean;
  onMinimize?: () => void;
}

interface Conversation {
  id: string;
  user1_id: string;
  user2_id: string;
  created_at: string;
  last_message?: string;
  last_message_at?: string;
  otherUser?: {
    id: string;
    name: string;
    username: string;
    profile_picture_url: string;
  };
}

export const ChatMessengerCard: React.FC<ChatMessengerCardProps> = ({ onOpenMessages }) => {
  const { currentUserProfile } = useAuth();
  const [expanded, setExpanded] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<'prioritarias' | 'outras'>('prioritarias');
  const router = useRouter();

  useEffect(() => {
    if (!currentUserProfile?.id || !expanded) return;
    const fetchConvs = async () => {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${currentUserProfile.id},user2_id.eq.${currentUserProfile.id}`)
        .order('created_at', { ascending: false });
      if (!error && data) {
        // Buscar dados do outro usuário e última mensagem
        const convs = await Promise.all(data.map(async (conv: any) => {
          const otherId = conv.user1_id === currentUserProfile.id ? conv.user2_id : conv.user1_id;
          const { data: user } = await supabase
            .from('profiles')
            .select('id, username, full_name, profile_picture_url')
            .eq('id', otherId)
            .single();
          const { data: lastMsg } = await supabase
            .from('messages')
            .select('content, created_at')
            .eq('conversation_id', conv.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
          return {
            ...conv,
            otherUser: user ? {
              id: user.id,
              name: user.full_name,
              username: user.username,
              profile_picture_url: user.profile_picture_url
            } : undefined,
            last_message: lastMsg?.content || '',
            last_message_at: lastMsg?.created_at || conv.created_at
          };
        }));
        setConversations(convs);
      }
    };
    fetchConvs();
  }, [currentUserProfile?.id, expanded]);

  if (!currentUserProfile) return null;

  // Filtro de busca
  const filteredConvs = conversations.filter(conv =>
    conv.otherUser?.name?.toLowerCase().includes(search.toLowerCase()) ||
    conv.otherUser?.username?.toLowerCase().includes(search.toLowerCase())
  );

  return expanded ? (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-2xl rounded-xl border border-border min-w-[320px] max-w-[360px] w-full max-h-[80vh] flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b">
        <Avatar className="h-8 w-8">
          <AvatarImage src={currentUserProfile.profile_picture_url} />
          <AvatarFallback>{currentUserProfile.name?.[0] || '?'}</AvatarFallback>
        </Avatar>
        <span className="font-semibold text-base flex-1">Mensagens <span className="ml-1 w-2 h-2 rounded-full bg-green-500 inline-block" title="Online" /></span>
        <button onClick={() => router.push('/dashboard/messages')} title="Ir para caixa de mensagens" className="p-1 hover:bg-muted rounded">
          <IoMailOutline className="w-5 h-5" />
        </button>
        <button onClick={() => setExpanded(false)} title="Minimizar" className="p-1 hover:bg-muted rounded">
          <IoChevronDown className="w-5 h-5" />
        </button>
      </div>
      <div className="p-2 flex items-center gap-2 border-b">
        <div className="relative flex-1">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar mensagens"
            className="w-full rounded-md border px-3 py-1 text-sm focus:outline-none"
          />
          <IoSearch className="absolute right-2 top-2 text-muted-foreground w-4 h-4" />
        </div>
        <button className="p-1 hover:bg-muted rounded" title="Listar">
          <IoList className="w-5 h-5" />
        </button>
      </div>
      <div className="flex border-b">
        <button
          className={`flex-1 py-2 text-sm font-semibold border-b-2 ${tab === 'prioritarias' ? 'border-green-600 text-green-700' : 'border-transparent text-muted-foreground'}`}
          onClick={() => setTab('prioritarias')}
        >
          Prioritárias
        </button>
        <button
          className={`flex-1 py-2 text-sm font-semibold border-b-2 ${tab === 'outras' ? 'border-green-600 text-green-700' : 'border-transparent text-muted-foreground'}`}
          onClick={() => setTab('outras')}
        >
          Outras
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConvs.length === 0 && (
          <div className="p-4 text-center text-muted-foreground text-sm">Nenhuma conversa encontrada.</div>
        )}
        {filteredConvs.map(conv => (
          <button
            key={conv.id}
            className="w-full flex items-center gap-3 px-4 py-3 border-b hover:bg-muted transition text-left"
            onClick={() => {
              // Abrir chat flutuante com o outro usuário
              if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('open-chat', { detail: { user: conv.otherUser } }));
              }
              setExpanded(false);
            }}
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={conv.otherUser?.profile_picture_url} />
              <AvatarFallback>{conv.otherUser?.name?.[0] || '?'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{conv.otherUser?.name}</div>
              <div className="text-xs text-muted-foreground truncate">{conv.last_message}</div>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
              {conv.last_message_at ? new Date(conv.last_message_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }) : ''}
            </div>
          </button>
        ))}
      </div>
    </div>
  ) : (
    <div className="fixed bottom-4 right-4 z-50 bg-white shadow-xl rounded-xl flex items-center gap-3 px-4 py-2 border border-border min-w-[220px] max-w-xs">
      <Avatar className="h-10 w-10">
        <AvatarImage src={currentUserProfile.profile_picture_url} />
        <AvatarFallback>{currentUserProfile.name?.[0] || '?'}</AvatarFallback>
      </Avatar>
      <div className="flex-1 flex flex-col">
        <span className="font-semibold text-base flex items-center gap-2">
          Mensagens
          <span className="ml-1 w-2 h-2 rounded-full bg-green-500 inline-block" title="Online" />
        </span>
      </div>
      <button onClick={() => setExpanded(true)} title="Expandir" className="p-1 hover:bg-muted rounded">
        <IoChevronUp className="w-5 h-5" />
      </button>
    </div>
  );
};
