"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { Palette, LayoutGrid, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockCurrentUser, updateMockCurrentUser } from "@/lib/mock-data";
import type { UserProfile, AccentColor, LayoutTemplate } from "@/lib/types";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

// Constantes de configuração
const accentColors: AccentColor[] = [
  { name: "Verde Padrão", value: "149 94% 36%", foreground: "0 0% 98%", accent: "149 90% 40%" },
  { name: "Azul Whosdo", value: "217 91% 60%", foreground: "0 0% 98%", accent: "217 91% 65%" },
  { name: "Azul", value: "210 100% 50%", foreground: "0 0% 98%", accent: "210 100% 55%" },
  { name: "Roxo", value: "270 70% 55%", foreground: "0 0% 98%", accent: "270 70% 60%" },
  { name: "Laranja", value: "25 95% 53%", foreground: "0 0% 15%", accent: "25 95% 58%" },
];

const layoutTemplates: LayoutTemplate[] = [
  { id: 'minimalist-card', name: 'Cartão Minimalista', description: 'Layout elegante e direto. Ideal para começar.', imageUrl: 'https://picsum.photos/seed/layout-minimalist/300/200', dataAiHint: "minimalist design", availableFor: [] },
  { id: 'default', name: 'Perfil Padrão', description: 'Um layout clássico e completo para um perfil profissional.', imageUrl: 'https://picsum.photos/seed/layout-default/300/200', dataAiHint: "profile layout", availableFor: ['standard', 'premium'] },
  { id: 'commercial-web', name: 'Site Comercial', description: 'Aparência de mini-site para apresentar seu negócio.', imageUrl: 'https://picsum.photos/seed/layout-commercial/300/200', dataAiHint: "website template", availableFor: ['premium'] },
  { id: 'premium-pro', name: 'Premium Pro', description: 'Layout avançado para máximo impacto profissional.', imageUrl: 'https://picsum.photos/seed/layout-premiumpro/300/200', dataAiHint: "professional profile", availableFor: ['premium'] },
];

export default function AppearanceSettingsPage() {
    const { toast } = useToast();
    const { currentUserProfile, updateUserProfile, user, loading } = useAuth();
    const router = useRouter();
    
    const [isLoading, setIsLoading] = useState(true);
    const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);

    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [selectedAccentColor, setSelectedAccentColor] = useState<AccentColor>(accentColors[0]);
    const [userPlan, setUserPlan] = useState<'free' | 'standard' | 'premium'>('free');
    const [selectedLayoutTemplate, setSelectedLayoutTemplate] = useState<string>('default');

    useEffect(() => {
        if (!loading && !user) {
            router.replace('/login');
        }
    }, [user, loading, router]);

    useEffect(() => {
        const profileToLoad = currentUserProfile || mockCurrentUser;
        if (profileToLoad) {
            setActiveProfile(profileToLoad);
            setUserPlan(profileToLoad.plan || 'free');
            setSelectedLayoutTemplate(profileToLoad.layoutTemplateId || 'default');
            
            const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
            setTheme(storedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light'));
            
            const defaultAccent = accentColors[0];
            const storedAccentColorName = localStorage.getItem("accentColor");
            const foundColor = accentColors.find(c => c.name === storedAccentColorName);
            setSelectedAccentColor(foundColor || defaultAccent);
            
            setIsLoading(false);
        }
    }, [currentUserProfile]);

    useEffect(() => {
        if (!isLoading) {
            document.documentElement.classList.toggle("dark", theme === 'dark');
            applyAccentColor(selectedAccentColor);
        }
    }, [theme, selectedAccentColor, isLoading]);

    const applyAccentColor = useCallback((color: AccentColor) => {
        if (typeof window !== 'undefined' && color) {
            document.documentElement.style.setProperty('--primary', color.value);
            document.documentElement.style.setProperty('--primary-foreground', color.foreground);
        }
    }, []);

    const handleLayoutTemplateChange = (layoutId: string) => {
        const template = layoutTemplates.find(lt => lt.id === layoutId);
        if (!template) return;
        const isSelectable = userPlan === 'premium' || (userPlan === 'standard' && template.availableFor.includes('standard')) || (userPlan === 'free' && template.availableFor.length === 0);
        if (!isSelectable) {
             toast({ title: "Upgrade Necessário", description: `O layout '${template.name}' requer um plano superior.`, variant: "destructive" });
             return;
        }
        setSelectedLayoutTemplate(layoutId);
    };

    const handleSaveAppearance = () => {
        if (!activeProfile) return;
        const updatedProfile = { ...activeProfile, layoutTemplateId: selectedLayoutTemplate };
        updateUserProfile(updatedProfile);
        localStorage.setItem("accentColor", selectedAccentColor.name);
        localStorage.setItem("theme", theme);
        applyAccentColor(selectedAccentColor);
        toast({ title: "Aparência salva com sucesso!" });
    };

    if (loading || !user) {
        return null;
    }

    if (isLoading) {
        return <div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Aparência do Perfil</CardTitle>
                    <CardDescription>Personalize o tema, cores e layout do seu perfil público.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="flex items-center space-x-2">
                        <Switch id="darkMode" checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
                        <Label htmlFor="darkMode">Modo Escuro</Label>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="accentColor">Cor de Destaque</Label>
                        <Select value={selectedAccentColor?.name} onValueChange={(name) => setSelectedAccentColor(accentColors.find(c => c.name === name) || accentColors[0])} disabled={userPlan === 'free'}>
                            <SelectTrigger id="accentColor" className="w-full md:w-1/2"><SelectValue /></SelectTrigger>
                            <SelectContent><SelectGroup><SelectLabel>Cores</SelectLabel>{accentColors.map(color => <SelectItem key={color.name} value={color.name}><div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${color.value})` }}></span>{color.name}</div></SelectItem>)}</SelectGroup></SelectContent>
                        </Select>
                        {userPlan === 'free' && <p className="text-xs text-muted-foreground">Personalização de cor disponível nos planos Padrão e Premium.</p>}
                    </div>
                    <div className="space-y-4 pt-6 border-t">
                        <Label className="text-base font-medium">Template de Layout</Label>
                        <RadioGroup value={selectedLayoutTemplate} onValueChange={handleLayoutTemplateChange} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {(layoutTemplates || []).map((template) => {
                                if (!template) return null;
                                const isSelectable = userPlan === 'premium' || (userPlan === 'standard' && template.availableFor.includes('standard')) || (userPlan === 'free' && template.availableFor.length === 0);
                                return (
                                    <Label key={template.id} htmlFor={`layout-${template.id}`} className={cn("border-2 rounded-lg p-4 flex flex-col cursor-pointer transition-all", selectedLayoutTemplate === template.id && "border-primary ring-2 ring-primary/50", !isSelectable && "opacity-50 cursor-not-allowed")}>
                                        <div className="flex items-center justify-between w-full mb-3">
                                            <div className="flex items-center gap-3"><RadioGroupItem value={template.id} id={`layout-${template.id}`} disabled={!isSelectable} /><span className="font-semibold">{template.name}</span></div>
                                        </div>
                                        <div className="w-full h-32 relative bg-muted rounded-md border"><Image src={template.imageUrl} alt={template.name} fill style={{objectFit: "cover"}} className="rounded-md"/></div>
                                        <p className="text-xs mt-2 text-muted-foreground">{template.description}</p>
                                        {!isSelectable && <p className="text-xs mt-1 font-semibold text-amber-600">Requer plano {template.availableFor[0] || 'superior'}</p>}
                                    </Label>
                                );
                            })}
                        </RadioGroup>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleSaveAppearance}>Salvar Alterações</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
