import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ProfileBasicTabV2Props {
  data: any;
  onChange: (data: any) => void;
}

export function ProfileBasicTabV2({ data, onChange }: ProfileBasicTabV2Props) {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card className="p-6 space-y-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Informações Básicas</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Nome Completo</Label>
            <Input
              id="full_name"
              value={data.full_name ?? ""}
              onChange={e => onChange({ ...data, full_name: e.target.value })}
              placeholder="Digite seu nome completo"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input
              id="username"
              value={data.username ?? ""}
              onChange={e => onChange({ ...data, username: e.target.value })}
              placeholder="Escolha um nome de usuário"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={data.bio ?? ""}
              onChange={e => onChange({ ...data, bio: e.target.value })}
              placeholder="Fale um pouco sobre você"
              className="mt-1"
              rows={4}
            />
          </div>
        </div>
      </Card>
    </div>
  );
} 