import { serve } from "std/server";

serve(async (req) => {
  // Recebe eventos de terceiros (ex: pagamentos, analytics)
  const event = await req.json();

  // Valide e processe o evento conforme necessário
  // Exemplo: atualizar status de pagamento, registrar log, etc.

  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
}); 