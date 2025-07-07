import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image as ImageIcon } from "lucide-react";
import { Instagram, Linkedin, Facebook, Globe, Github, MessageCircle, Trash2, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ProfileBasicTabV2Props {
  data: any;
  onChange: (data: any) => void;
}

// Função utilitária para montar a URL completa do perfil social
function getFullSocialUrl(type: string, value: string) {
  if (!value) return '';
  if (value.startsWith('http')) return value;
  switch (type) {
    case 'instagram':
      if (value.startsWith('instagram.com')) return `https://${value}`;
      return `https://instagram.com/${value.replace(/^@/, '')}`;
    case 'twitter':
      if (value.startsWith('twitter.com')) return `https://${value}`;
      return `https://twitter.com/${value.replace(/^@/, '')}`;
    case 'linkedin':
      if (value.startsWith('linkedin.com')) return `https://${value}`;
      return `https://linkedin.com/in/${value.replace(/^@/, '')}`;
    case 'facebook':
      if (value.startsWith('facebook.com')) return `https://${value}`;
      return `https://facebook.com/${value.replace(/^@/, '')}`;
    case 'youtube':
      if (value.startsWith('youtube.com')) return `https://${value}`;
      return `https://youtube.com/${value.replace(/^@/, '')}`;
    case 'github':
      if (value.startsWith('github.com')) return `https://${value}`;
      return `https://github.com/${value.replace(/^@/, '')}`;
    case 'site':
    case 'website':
    case 'portfolio':
      return value.startsWith('http') ? value : `https://${value}`;
    case 'whatsapp':
      return `https://wa.me/${value.replace(/\D/g, '')}`;
    default:
      return value;
  }
}

export function ProfileBasicTabV2({ data, onChange }: ProfileBasicTabV2Props) {
  // Função de upload local (mock) para foto de perfil e capa
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        if (type === 'avatar') {
          onChange({ ...data, profile_picture_url: url });
        } else {
          onChange({ ...data, cover_photo_url: url });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Redes sociais disponíveis
  const socialOptions = [
    { type: "website", label: "Website", icon: Globe },
    { type: "linkedin", label: "LinkedIn", icon: Linkedin },
    { type: "instagram", label: "Instagram", icon: Instagram },
    { type: "facebook", label: "Facebook", icon: Facebook },
    { type: "tiktok", label: "TikTok", icon: Globe },
    { type: "github", label: "GitHub", icon: Github },
    { type: "whatsapp", label: "WhatsApp", icon: MessageCircle },
  ];
  const [selectedSocial, setSelectedSocial] = React.useState(socialOptions[0]);
  const [socialUrl, setSocialUrl] = React.useState("");

  const handleAddSocial = () => {
    if (!socialUrl) return;
    let newLinks = [];
    if (Array.isArray(data.sociallinks)) {
      newLinks = [...data.sociallinks];
    } else if (typeof data.sociallinks === 'string') {
      try { newLinks = JSON.parse(data.sociallinks); } catch { newLinks = []; }
    }
    if (!Array.isArray(newLinks)) newLinks = [];
    const url = getFullSocialUrl(selectedSocial.type, socialUrl);
    if (selectedSocial.type && url) {
      newLinks.push({ type: selectedSocial.type, url });
      onChange({ ...data, sociallinks: newLinks });
      setSocialUrl("");
    }
  };
  const handleRemoveSocial = (idx: number) => {
    let arr = [];
    if (Array.isArray(data.sociallinks)) {
      arr = [...data.sociallinks];
    } else if (typeof data.sociallinks === 'string') {
      try { arr = JSON.parse(data.sociallinks); } catch { arr = []; }
    }
    if (!Array.isArray(arr)) arr = [];
    arr.splice(idx, 1);
    onChange({ ...data, sociallinks: arr });
  };

  // Normalização robusta do campo sociallinks
  let socialLinksArr: any[] = [];
  if (typeof data.sociallinks === 'string') {
    try {
      socialLinksArr = JSON.parse(data.sociallinks);
      if (!Array.isArray(socialLinksArr)) socialLinksArr = [];
    } catch {
      socialLinksArr = [];
    }
  } else if (Array.isArray(data.sociallinks)) {
    socialLinksArr = data.sociallinks;
  } else if (data.sociallinks == null) {
    socialLinksArr = [];
  }

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
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <Label className="font-semibold flex items-center gap-1"><ImageIcon className="w-5 h-5 text-primary" /> Foto de Perfil (Avatar)</Label>
            <input type="file" accept="image/*" className="hidden" id="avatar-upload" onChange={e => handleUpload(e, 'avatar')} />
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {data.profile_picture_url ? (
                <img src={data.profile_picture_url} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow" />
              ) : (
                <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-primary text-primary">
                  <Camera className="w-8 h-8" />
                </div>
              )}
            </label>
            <span className="text-xs text-muted-foreground">Clique para enviar sua foto</span>
          </div>
          {/* Capa */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <Label className="font-semibold flex items-center gap-1"><ImageIcon className="w-5 h-5 text-primary" /> Imagem de Capa</Label>
            <input type="file" accept="image/*" className="hidden" id="cover-upload" onChange={e => handleUpload(e, 'cover')} />
            <label htmlFor="cover-upload" className="cursor-pointer">
              {data.cover_photo_url ? (
                <img src={data.cover_photo_url} alt="Capa" className="w-full max-w-lg h-28 object-cover rounded-lg border-2 border-primary shadow" />
              ) : (
                <div className="w-full max-w-lg h-28 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-primary text-primary">
                  <ImageIcon className="w-8 h-8" />
                </div>
              )}
            </label>
            <span className="text-xs text-muted-foreground">Clique para enviar sua capa</span>
          </div>
          {/* Email e Telefone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label>Email</Label>
              <Input type="email" placeholder="Seu e-mail" value={data.email ?? ""} onChange={e => onChange({ ...data, email: e.target.value })} />
            </div>
            <div>
              <Label>Telefone</Label>
              <Input type="tel" placeholder="Seu telefone" value={data.phone ?? ""} onChange={e => onChange({ ...data, phone: e.target.value })} />
            </div>
          </div>
          {/* Links e Redes Sociais */}
          <div className="space-y-2 mt-6">
            <h3 className="text-lg font-semibold mb-2">Links e Redes Sociais</h3>
            <div className="flex flex-col md:flex-row gap-2 items-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button type="button" variant="outline" className="flex items-center gap-2 border rounded px-3 py-2 bg-muted hover:bg-accent">
                    {selectedSocial.icon && <selectedSocial.icon className="w-5 h-5" />} {selectedSocial.label}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {socialOptions.map(opt => (
                    <DropdownMenuItem key={opt.type} onClick={() => setSelectedSocial(opt)}>
                      {opt.icon && <opt.icon className="w-4 h-4 mr-2" />} {opt.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                className="flex-1"
                type={selectedSocial.type === 'whatsapp' ? 'tel' : 'url'}
                placeholder={selectedSocial.type === 'whatsapp' ? 'Ex: 5511999999999' : 'Cole o link aqui'}
                value={socialUrl}
                onChange={e => setSocialUrl(e.target.value)}
              />
              <Button type="button" variant="default" className="ml-2 px-3 py-2 flex items-center gap-1" onClick={handleAddSocial}>
                <Plus className="w-4 h-4" /> Adicionar
              </Button>
            </div>
            <span className="text-xs text-muted-foreground">Selecione a rede, cole o link e clique em adicionar. Para WhatsApp, informe o número com DDD e país. Exemplo: 5511999999999.</span>
            <div className="mt-2 space-y-1">
              {socialLinksArr.map((item: any, idx: number) => {
                const opt = socialOptions.find(o => o.type === item.type);
                return (
                  <div key={idx} className="flex items-center gap-2 border rounded px-3 py-1 bg-muted">
                    {opt?.icon && <opt.icon className="w-4 h-4" />} <span className="font-medium">{opt?.label || item.type}</span>
                    <a href={item.type === 'whatsapp' ? `https://wa.me/${item.url}` : item.url} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all ml-2 flex-1">{item.type === 'whatsapp' ? `https://wa.me/${item.url}` : item.url}</a>
                    <Button type="button" variant="ghost" className="ml-2 text-destructive hover:text-red-700 p-1" onClick={() => handleRemoveSocial(idx)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
} 