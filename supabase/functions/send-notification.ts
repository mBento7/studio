import { serve } from "std/server";

serve(async (req) => {
  const { user_id, title, body } = await req.json();

  // Integre com serviço de push (ex: Firebase, OneSignal, ou Web Push API)
  // Exemplo fictício:
  // await sendPushNotification(user_id, title, body);

  return new Response(JSON.stringify({ status: "ok", message: "Notificação enviada!" }), {
    headers: { "Content-Type": "application/json" },
  });
}); 