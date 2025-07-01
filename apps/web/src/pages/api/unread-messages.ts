import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'userId obrigatório' });
  }
  const supabase = createClient();
  // Busca todas as conversas do usuário
  const { data: conversations, error: convError } = await supabase
    .from('conversations')
    .select('id, user1_id, user2_id');
  if (convError) return res.status(500).json({ error: convError.message });
  // Para cada conversa, verifica se há mensagens não lidas
  let count = 0;
  for (const conv of conversations) {
    const { data: msgs, error: msgError } = await supabase
      .from('messages')
      .select('id, sender_id, read_by')
      .eq('conversation_id', conv.id)
      .neq('sender_id', userId)
      .or(`read_by.is.null,not.read_by.cs.{${userId}}`);
    if (msgError) continue;
    if (msgs && msgs.length > 0) count++;
  }
  return res.status(200).json({ count });
} 