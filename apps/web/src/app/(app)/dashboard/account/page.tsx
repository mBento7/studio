"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/hooks/use-auth';
import { Shield, Trash2, LogOut } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BillingSettings } from '@/features/dashboard/billing-settings';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from '@/hooks/use-toast';
import { updateUserProfileInMockData } from '@/lib/mock-data';

export default function AccountPage() {
  const { signOutUser, currentUserProfile, updateUserProfile } = useAuth();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'standard' | 'premium'>(currentUserProfile?.plan || 'free');
  const [saving, setSaving] = useState(false);

  const handleLogout = async () => {
    await signOutUser();
  };

  const handlePlanChange = (newPlan: 'free' | 'standard' | 'premium') => {
    setSelectedPlan(newPlan);
  };

  const handleSavePlan = async () => {
    if (!currentUserProfile) return;
    setSaving(true);
    try {
      const response = await fetch('/api/update-user-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: currentUserProfile.id,
          plan: selectedPlan,
        }),
      });
      if (!response.ok) throw new Error('Erro ao salvar plano');
      updateUserProfile({ ...currentUserProfile, plan: selectedPlan });
      toast({
        title: 'Plano Atualizado',
        description: `Seu plano foi alterado para "${selectedPlan}" e salvo com sucesso!`,
      });
    } catch (err) {
      toast({
        title: 'Erro ao salvar plano',
        description: 'Tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Container do plano atual do usuário */}
      {currentUserProfile && (
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#14b8a6]/10 to-[#0e9094]/10 border border-[#0e9094]/30 shadow flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-4">
            <span className="inline-block px-4 py-2 rounded-full font-bold text-lg bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white shadow">
              {currentUserProfile.plan === 'premium' ? 'Premium' : currentUserProfile.plan === 'standard' ? 'Standard' : 'Free'}
            </span>
            <span className="text-lg font-medium text-[#0e9094]">Olá, {currentUserProfile.name}!</span>
          </div>
          <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-8 items-center justify-end">
            <div className="text-sm text-muted-foreground">
              <div><b>Email:</b> {currentUserProfile.email}</div>
              <div><b>Usuário:</b> @{currentUserProfile.username}</div>
              <div><b>Plano:</b> {currentUserProfile.plan ? currentUserProfile.plan.charAt(0).toUpperCase() + currentUserProfile.plan.slice(1) : 'Free'}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#0e9094]">Quer mudar de plano?</span>
              <a href="/planos" className="text-sm font-semibold underline text-[#0e9094] hover:text-[#14b8a6]">Ver opções</a>
            </div>
          </div>
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Conta e Cobrança</h1>
        <p className="text-muted-foreground">
          Gerencie seu plano, moedas, segurança e outras configurações da sua conta.
        </p>
      </div>

      <Separator />

      {/* Seção de Cobrança (Planos e Moedas) */}
      <BillingSettings />

      {/* Seção de Segurança */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6" />
            <CardTitle>Segurança</CardTitle>
          </div>
          <CardDescription>
            Gerencie as configurações de segurança da sua conta, como sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="current-password">Senha Atual</Label>
            <Input id="current-password" type="password" />
          </div>
          <div>
            <Label htmlFor="new-password">Nova Senha</Label>
            <Input id="new-password" type="password" />
          </div>
          <div>
            <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button>Alterar Senha</Button>
        </CardContent>
      </Card>

      {/* Seção de Configurações de Desenvolvedor (apenas em DEV) */}
      {process.env.NODE_ENV === 'development' && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <CardTitle>Configurações de Desenvolvedor</CardTitle>
            </div>
            <CardDescription>
              Altere seu plano para fins de teste. Visível apenas em desenvolvimento.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="plan-select">Plano Atual</Label>
              <Select onValueChange={handlePlanChange} value={selectedPlan}>
                <SelectTrigger id="plan-select" className="w-[180px]">
                  <SelectValue placeholder="Selecione um plano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Básico (Free)</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleSavePlan} disabled={saving || selectedPlan === currentUserProfile?.plan}>
              {saving ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Seção de Excluir Conta */}
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Trash2 className="w-6 h-6 text-destructive" />
            <CardTitle className="text-destructive">Excluir Conta</CardTitle>
          </div>
          <CardDescription>
            Esta ação é permanente e não pode ser desfeita.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Excluir minha conta</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza absoluta?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta
                  e removerá seus dados de nossos servidores.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-destructive hover:bg-destructive/90"
                  onClick={() => console.log("Account deletion initiated")}
                >
                  Sim, excluir conta
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Botão de Logout */}
      <div className="flex justify-start">
            <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair da Conta
            </Button>
        </div>
    </div>
  );
}
