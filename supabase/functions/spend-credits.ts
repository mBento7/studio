import { serve } from "std/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
);

serve(async (req) => {
  const { user_id, cost, description } = await req.json();

  // Verifique saldo, debite créditos, registre transação
  const { data: user, error } = await supabase
    .from("profiles")
    .select("credit_balance")
    .eq("id", user_id)
    .single();

  if (error || !user || user.credit_balance < cost) {
    return new Response(JSON.stringify({ error: "Créditos insuficientes" }), { status: 400 });
  }

  // Debite créditos
  await supabase
    .from("profiles")
    .update({ credit_balance: user.credit_balance - cost })
    .eq("id", user_id);

  // Registre transação
  await supabase
    .from("transactions")
    .insert({ profile_id: user_id, type: "spend", amount: cost, description });

  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "Content-Type": "application/json" },
  });
}); 