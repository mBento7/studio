"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2 } from "lucide-react";

const subscriptionPlans = [
  {
    name: "Free",
    price: "R$0",
    priceDetails: "",
    features: ["Perfil básico", "Até 5 Stories (24h)", "Feed “Novos” & “Trending”"],
    cta: "Plano Atual",
    isCurrent: true,
  },
  {
    name: "Standard",
    price: "R$29,90",
    priceDetails: "/mês",
    annualPrice: "R$279,90 (-20%)",
    features: ["StoriesCarousel ilimitado", "Feed “Recomendados”", "QuickActions", "Suporte Prioritário"],
    cta: "Fazer Upgrade",
  },
  {
    name: "Premium",
    price: "R$59,90",
    priceDetails: "/mês",
    annualPrice: "R$559,90 (-20%)",
    features: ["TrendingAds", "CouponsWidget", "Boost de anúncios", "API Premium", "Analytics Avançado"],
    cta: "Fazer Upgrade",
  },
];

const coinPackages = [
    { name: "100 moedas", price: "R$9,90", discount: "" },
    { name: "250 moedas", price: "R$19,90", discount: "+10% Bônus" },
    { name: "500 moedas", price: "R$34,90", discount: "+20% Bônus" },
];

export function BillingSettings() {
  return (
    <div className="space-y-8">
      {/* Subscription Plans */}
      <Card>
        <CardHeader>
          <CardTitle>Planos de Assinatura</CardTitle>
          <CardDescription>Escolha o plano que melhor se adapta às suas necessidades.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-6">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.name} className={`flex flex-col ${plan.isCurrent ? 'border-primary' : ''}`}>
              <CardHeader className="flex-1">
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    {plan.isCurrent && <Badge variant="secondary">Atual</Badge>}
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold">{plan.price}</span>
                    {plan.priceDetails && <span className="text-sm text-muted-foreground">{plan.priceDetails}</span>}
                </div>
                 {plan.annualPrice && <p className="text-xs text-muted-foreground">{plan.annualPrice} no plano anual</p>}
              </CardHeader>
              <CardContent className="flex-1 space-y-3">
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button className="w-full" disabled={plan.isCurrent}>{plan.cta}</Button>
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
      
      {/* Coin System */}
      <Card>
        <CardHeader>
          <CardTitle>Moedas (Micro-transações)</CardTitle>
          <CardDescription>Compre moedas para impulsionar seus anúncios e publicações.</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {coinPackages.map((pkg) => (
                <div key={pkg.name} className="p-4 border rounded-lg flex justify-between items-center">
                    <div>
                        <p className="font-semibold">{pkg.name}</p>
                        <p className="text-sm text-primary font-bold">{pkg.price} {pkg.discount && <span className="text-xs text-green-600 font-normal">{pkg.discount}</span>}</p>
                    </div>
                    <Button>Comprar</Button>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
