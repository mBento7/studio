import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Image as ImageIcon, MapPin, CheckCircle, XCircle } from "lucide-react";
import { Instagram, Linkedin, Facebook, Globe, Github, MessageCircle, Trash2, Plus } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageCropper from "@/components/ImageCropper";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase/client";

interface ProfileBasicTabV2Props {
  data: any;
  onChange: (data: any) => void;
}

// Definir as categorias disponíveis, similar à página de busca
const categories = ["Serviços", "Produtos", "Lojas e Estabelecimentos"];
const ALL_VALUE = "all"; // Usado para valor padrão, se necessário

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

// Função utilitária para converter base64 ou blob URL para File
async function urlToFile(url: string, filename: string, mimeType: string): Promise<File> {
  if (url.startsWith('blob:')) {
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  } else if (url.startsWith('data:')) {
    // base64
    const arr = url.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  } else {
    // url normal
    const res = await fetch(url);
    const blob = await res.blob();
    return new File([blob], filename, { type: mimeType });
  }
}

export function ProfileBasicTabV2({ data, onChange }: ProfileBasicTabV2Props) {
  // Função de upload local (mock) para foto de perfil e capa
  const [showCropper, setShowCropper] = React.useState(false);
  const [tempCover, setTempCover] = React.useState<string | null>(null);
  const [showAvatarCropper, setShowAvatarCropper] = React.useState(false);
  const [tempAvatar, setTempAvatar] = React.useState<string | null>(null);
  const [initialProfilePicture, setInitialProfilePicture] = useState<string | null>(null);

  // Buscar imagem do banco pelo username ao montar
  useEffect(() => {
    async function fetchProfilePicture() {
      if (data.username && !data.profile_picture_url) {
        const { data: result, error } = await supabase
          .from('profiles')
          .select('profile_picture_url')
          .eq('username', data.username)
          .single();
        if (result && result.profile_picture_url) {
          setInitialProfilePicture(result.profile_picture_url);
        }
      } else if (data.profile_picture_url) {
        setInitialProfilePicture(data.profile_picture_url);
      }
    }
    fetchProfilePicture();
  }, [data.username, data.profile_picture_url]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        if (type === 'avatar') {
          setTempAvatar(url);
          setShowAvatarCropper(true);
        } else {
          setTempCover(url);
          setShowCropper(true);
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
      // Corrigir aqui: salvar como 'platform' e não 'type'
      newLinks.push({ platform: selectedSocial.type, url });
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

  // Validação de username estilo Instagram
  function isValidInstagramUsername(username: string): boolean {
    // Regex: começa e termina com letra/número, pode conter . e _, sem duplos, min 1, max 30
    return /^[a-z0-9](?!.*[._]{2})[a-z0-9._]{0,28}[a-z0-9]$/.test(username);
  }
  const [usernameError, setUsernameError] = useState<string>("");
  const [usernameAvailable, setUsernameAvailable] = useState<null | boolean>(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  // Supabase client para checagem
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  async function handleCheckUsername() {
    setUsernameAvailable(null);
    setUsernameError("");
    if (!data.username) {
      setUsernameError("Digite um nome de usuário.");
      return;
    }
    if (!isValidInstagramUsername(data.username)) {
      setUsernameError("Nome de usuário inválido. Use apenas letras minúsculas, números, ponto e sublinhado, sem iniciar/terminar com ponto ou sublinhado, nem duplos.");
      return;
    }
    setCheckingUsername(true);
    const { data: existing, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('username', data.username)
      .neq('id', data.id)
      .maybeSingle();
    setCheckingUsername(false);
    if (error) {
      setUsernameError("Erro ao verificar disponibilidade. Tente novamente.");
      setUsernameAvailable(null);
      return;
    }
    if (existing) {
      setUsernameError("Este nome de usuário já está em uso.");
      setUsernameAvailable(false);
    } else {
      setUsernameError("");
      setUsernameAvailable(true);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      {showAvatarCropper && tempAvatar && (
        <ImageCropper
          image={tempAvatar}
          aspect={1}
          onCropComplete={async (croppedImage) => {
            // Fazer upload para Supabase Storage
            try {
              const userId = data.id || 'user';
              const file = await urlToFile(croppedImage, `${userId}_avatar.jpg`, 'image/jpeg');
              const filePath = `profile/${userId}_${Date.now()}.jpg`;
              const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file, { upsert: true });
              if (uploadError) throw uploadError;
              const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
              if (!publicUrlData?.publicUrl) throw new Error('Erro ao obter URL pública da imagem');
              onChange({ ...data, profile_picture_url: publicUrlData.publicUrl });
            } catch (err) {
              alert('Erro ao fazer upload do avatar: ' + (err as any).message);
            }
            setShowAvatarCropper(false);
            setTempAvatar(null);
          }}
          onCancel={() => {
            setShowAvatarCropper(false);
            setTempAvatar(null);
          }}
        />
      )}
      {showCropper && tempCover && (
        <ImageCropper
          image={tempCover}
          aspect={3.5}
          onCropComplete={async (croppedImage) => {
            // Fazer upload para Supabase Storage (bucket covers)
            try {
              const userId = data.id || 'user';
              const file = await urlToFile(croppedImage, `${userId}_cover.jpg`, 'image/jpeg');
              const filePath = `cover/${userId}_${Date.now()}.jpg`;
              const { error: uploadError } = await supabase.storage.from('covers').upload(filePath, file, { upsert: true });
              if (uploadError) throw uploadError;
              const { data: publicUrlData } = supabase.storage.from('covers').getPublicUrl(filePath);
              if (!publicUrlData?.publicUrl) throw new Error('Erro ao obter URL pública da imagem');
              onChange({ ...data, cover_photo_url: publicUrlData.publicUrl });
            } catch (err) {
              alert('Erro ao fazer upload da capa: ' + (err as any).message);
            }
            setShowCropper(false);
            setTempCover(null);
          }}
          onCancel={() => {
            setShowCropper(false);
            setTempCover(null);
          }}
        />
      )}
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
              onChange={e => {
                const value = e.target.value;
                onChange({ ...data, username: value });
                setUsernameAvailable(null); // resetar status ao digitar
                if (!value) {
                  setUsernameError("");
                } else if (!isValidInstagramUsername(value)) {
                  setUsernameError("Nome de usuário inválido. Use apenas letras minúsculas, números, ponto e sublinhado, sem iniciar/terminar com ponto ou sublinhado, nem duplos.");
                } else {
                  setUsernameError("");
                }
              }}
              placeholder="Escolha um nome de usuário"
              className="mt-1"
            />
            {usernameError && (
              <span className="text-xs text-red-600 mt-1 block">{usernameError}</span>
            )}
            <div className="flex items-center gap-2 mt-2">
              <button
                type="button"
                className="px-3 py-2 rounded bg-primary text-white text-sm font-medium hover:bg-primary/90 disabled:opacity-60"
                onClick={handleCheckUsername}
                disabled={checkingUsername || !data.username}
              >
                {checkingUsername ? "Verificando..." : "Verificar"}
              </button>
              {usernameAvailable === true && !usernameError && (
                <span className="flex items-center gap-1 text-green-600 text-sm"><CheckCircle className="w-5 h-5" /> Disponível</span>
              )}
              {usernameAvailable === false && !checkingUsername && (
                <span className="flex items-center gap-1 text-red-600 text-sm"><XCircle className="w-5 h-5" /> Indisponível</span>
              )}
              {(!checkingUsername && !usernameAvailable && !usernameError && data.username) && (
                <span className="text-xs text-muted-foreground">Clique para verificar disponibilidade</span>
              )}
            </div>
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

          {/* Nova Seção para Categoria */}
          <div>
            <Label htmlFor="category">Categoria Principal do Perfil</Label>
            <Select
              value={categories.includes(data.category) ? data.category : undefined}
              onValueChange={value => onChange({ ...data, category: value })}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder="Não especificado" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Avatar */}
          <div className="flex flex-col items-center gap-2 mt-4">
            <Label className="font-semibold flex items-center gap-1"><ImageIcon className="w-5 h-5 text-primary" /> Foto de Perfil (Avatar)</Label>
            <input type="file" accept="image/*" className="hidden" id="avatar-upload" onChange={e => handleUpload(e, 'avatar')} />
            <label htmlFor="avatar-upload" className="cursor-pointer">
              {(data.profile_picture_url || initialProfilePicture) ? (
                <img src={String(data.profile_picture_url || initialProfilePicture || '')} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow" />
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
            <label htmlFor="cover-upload" className="cursor-pointer w-full">
              {data.cover_photo_url ? (
                <img src={data.cover_photo_url} alt="Capa" className="w-full h-40 object-cover rounded-lg border-2 border-primary shadow" />
              ) : (
                <div className="w-full h-40 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-primary text-primary">
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
          {/* Endereço por extenso */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label htmlFor="endereco_rua">Rua</Label>
              <Input
                id="endereco_rua"
                value={data.endereco_rua ?? ""}
                onChange={e => onChange({ ...data, endereco_rua: e.target.value })}
                placeholder="Ex: Av. Paulista"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endereco_numero">Número</Label>
              <Input
                id="endereco_numero"
                value={data.endereco_numero ?? ""}
                onChange={e => onChange({ ...data, endereco_numero: e.target.value })}
                placeholder="Ex: 1000"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endereco_complemento">Complemento</Label>
              <Input
                id="endereco_complemento"
                value={data.endereco_complemento ?? ""}
                onChange={e => onChange({ ...data, endereco_complemento: e.target.value })}
                placeholder="Ex: Sala 101"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label htmlFor="endereco_bairro">Bairro</Label>
              <Input
                id="endereco_bairro"
                value={data.endereco_bairro ?? ""}
                onChange={e => onChange({ ...data, endereco_bairro: e.target.value })}
                placeholder="Ex: Bela Vista"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endereco_cidade">Cidade</Label>
              <Input
                id="endereco_cidade"
                value={data.endereco_cidade ?? ""}
                onChange={e => onChange({ ...data, endereco_cidade: e.target.value })}
                placeholder="Ex: São Paulo"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="endereco_estado">Estado</Label>
              <Input
                id="endereco_estado"
                value={data.endereco_estado ?? ""}
                onChange={e => onChange({ ...data, endereco_estado: e.target.value })}
                placeholder="Ex: SP"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div>
              <Label htmlFor="endereco_cep">CEP</Label>
              <Input
                id="endereco_cep"
                value={data.endereco_cep ?? ""}
                onChange={e => onChange({ ...data, endereco_cep: e.target.value })}
                placeholder="Ex: 01310-100"
                className="mt-1"
              />
            </div>
          </div>
          {/* Link do Google Maps com ícone de pino */}
          <div className="flex items-center gap-2 mt-4">
            <Label htmlFor="maps_link" className="flex items-center gap-1">
              Link do Google Maps
              {/* Ícone de pino clicável */}
              {data.maps_link && (
                <a
                  href={data.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-primary hover:text-blue-700"
                  title="Abrir no Google Maps"
                >
                  {/* Importar MapPin do lucide-react no topo do arquivo */}
                  <MapPin className="w-5 h-5 inline" />
                </a>
              )}
            </Label>
            <Input
              id="maps_link"
              type="url"
              placeholder="Cole aqui o link do Google Maps"
              value={data.maps_link ?? ""}
              onChange={e => onChange({ ...data, maps_link: e.target.value })}
              className="mt-1 flex-1"
            />
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
                const platform = item.platform || item.type; // fallback para compatibilidade
                const opt = socialOptions.find(o => o.type === platform);
                return (
                  <div key={idx} className="flex items-center gap-2 border rounded px-3 py-1 bg-muted">
                    {opt?.icon && <opt.icon className="w-4 h-4" />} <span className="font-medium">{opt?.label || platform}</span>
                    <a href={platform === 'whatsapp' ? `https://wa.me/${item.url}` : item.url} target="_blank" rel="noopener noreferrer" className="text-primary underline break-all ml-2 flex-1">{platform === 'whatsapp' ? `https://wa.me/${item.url}` : item.url}</a>
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