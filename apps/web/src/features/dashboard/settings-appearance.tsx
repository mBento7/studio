
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Palette, LayoutGrid, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AccentColor, LayoutTemplate } from "@/lib/types";

interface AppearanceSettingsProps {
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  selectedAccentColor: AccentColor;
  setSelectedAccentColor: (color: AccentColor) => void;
  accentColors: AccentColor[];
  isFreeUser: boolean;
  userPlan: 'free' | 'standard' | 'premium';
  layoutTemplates: LayoutTemplate[];
  selectedLayoutTemplate: string;
  setSelectedLayoutTemplate: (id: string) => void;
  onSaveAndContinue: () => void;
}

export function AppearanceSettings({
  theme,
  setTheme,
  selectedAccentColor,
  setSelectedAccentColor,
  accentColors,
  isFreeUser,
  userPlan,
  layoutTemplates,
  selectedLayoutTemplate,
  setSelectedLayoutTemplate,
  onSaveAndContinue,
}: AppearanceSettingsProps) {

  const handleLayoutTemplateChange = (layoutId: string) => {
    const template = layoutTemplates.find(lt => lt.id === layoutId);
    if (!template) return;
    const isSelectable = userPlan === 'premium' || (userPlan === 'standard' && template.availableFor.includes('standard')) || (userPlan === 'free' && template.availableFor.length === 0);
    if (!isSelectable) {
      // Idealmente, o toast seria gerenciado pela página pai
      alert(`O layout '${template.name}' requer um plano superior.`);
      return;
    }
    setSelectedLayoutTemplate(layoutId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Palette /> Tema & Aparência</CardTitle>
        <CardDescription>Personalize o visual do seu perfil público.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="flex items-center space-x-2">
          <Switch id="darkMode" checked={theme === "dark"} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
          <Label htmlFor="darkMode">Modo Escuro (Interface)</Label>
        </div>
        <div className="space-y-2">
          <Label htmlFor="accentColor">Cor de Destaque</Label>
          <Select value={selectedAccentColor?.name} onValueChange={(name) => setSelectedAccentColor(accentColors.find(c => c.name === name) || accentColors[0])} disabled={isFreeUser}>
            <SelectTrigger id="accentColor" className="w-full md:w-1/2"><SelectValue placeholder="Selecione uma cor..." /></SelectTrigger>
            <SelectContent><SelectGroup><SelectLabel>Cores</SelectLabel>{accentColors.map(color => <SelectItem key={color.name} value={color.name}><div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full" style={{ backgroundColor: `hsl(${color.value})` }}></span>{color.name}</div></SelectItem>)}</SelectGroup></SelectContent>
          </Select>
          {isFreeUser && <p className="text-xs text-muted-foreground">Personalização de cor disponível nos planos Padrão e Premium.</p>}
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
        <Button onClick={onSaveAndContinue}>
          Salvar Aparência e Continuar <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
