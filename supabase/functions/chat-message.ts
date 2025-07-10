import { serve } from "std/server";

serve(async (req) => {
  const { sender_id, receiver_id, message } = await req.json();

  // Aqui você pode validar, salvar no banco, acionar notificações, etc.
  // Exemplo: salvar mensagem em uma tabela 'messages'
  // (Use o client do Supabase com a Service Role Key)

  // Retorne resposta de sucesso
  return new Response(JSON.stringify({ status: "ok", message: "Mensagem enviada!" }), {
    headers: { "Content-Type": "application/json" },
  });
}); 