'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const referralData = {
  referralLink: 'https://whosdo.com/join?ref=user12345',
  referrals: [
    { id: 1, email: 'amigo1@example.com', status: 'Inscrito', reward: '50 moedas' },
    { id: 2, email: 'amigo2@example.com', status: 'Convidado', reward: '-' },
    { id: 3, email: 'amigo3@example.com', status: 'Inscrito', reward: '50 moedas' }
  ],
  totalRewards: '100 moedas'
};

export function ReferralProgram() {
  const { toast } = useToast();

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    toast({
      title: 'Link Copiado!',
      description: 'Seu link de convite foi copiado para a área de transferência.'
    });
  };

  return (
    <div className="space-y-8">
      {/* Referral Link Section */}
      <Card className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gift className="w-8 h-8 text-primary" />
            <div>
              <CardTitle>Indique um Amigo, Ganhe Recompensas</CardTitle>
              <CardDescription>Ganhe 50 moedas para cada novo usuário que se inscrever com seu link.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <Label htmlFor="referral-link">Seu Link de Convite Exclusivo</Label>
          <div className="flex gap-2">
            <Input id="referral-link" value={referralData.referralLink} readOnly />
            <Button onClick={handleCopyLink} variant="outline" size="icon">
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copiar link</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referrals Tracking Section */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Convites</CardTitle>
          <CardDescription>Acompanhe o status dos seus convites e as recompensas ganhas.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted rounded-lg">
              <span className="font-semibold">Total de Recompensas Ganhas:</span>
              <span className="font-bold text-primary text-lg">{referralData.totalRewards}</span>
            </div>
            <div className="border rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-semibold">Email do Convidado</th>
                    <th className="text-left p-3 font-semibold">Status</th>
                    <th className="text-left p-3 font-semibold">Recompensa</th>
                  </tr>
                </thead>
                <tbody>
                  {referralData.referrals.map((ref) => (
                    <tr key={ref.id} className="border-b last:border-0">
                      <td className="p-3">{ref.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${ref.status === 'Inscrito' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {ref.status}
                        </span>
                      </td>
                      <td className="p-3">{ref.reward}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
