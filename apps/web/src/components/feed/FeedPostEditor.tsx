import React, { useRef, useState } from "react";
import { Image, MapPin, Smile, User, Tag, DollarSign, Zap, Star, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface FeedPostEditorProps {
  onPost?: (data: {
    texto: string;
    imagem?: string | null;
    preco?: string;
    localizacao?: string;
    tags?: string[];
    urgente?: boolean;
    patrocinado?: boolean;
    whatsappUrl?: string;
  }) => void;
}

export function FeedPostEditor({ onPost }: FeedPostEditorProps) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showPreco, setShowPreco] = useState(false);
  const [showLocalizacao, setShowLocalizacao] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [showUrgente, setShowUrgente] = useState(false);
  const [showPatrocinado, setShowPatrocinado] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [preco, setPreco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [urgente, setUrgente] = useState(false);
  const [patrocinado, setPatrocinado] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // [FUTURO] Aqui pode ser feita a integração para upload da imagem para o backend ou storage (ex: S3, Supabase Storage, etc.)
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const handlePost = () => {
    // [FUTURO] Aqui será feita a integração para salvar a postagem no banco de dados via API/Backend
    if (onPost) {
      onPost({
        texto: postText,
        imagem: image,
        preco: showPreco ? preco : undefined,
        localizacao: showLocalizacao ? localizacao : undefined,
        tags: showTags ? tags : undefined,
        urgente: showUrgente ? urgente : undefined,
        patrocinado: showPatrocinado ? patrocinado : undefined,
        whatsappUrl: showWhatsapp ? whatsappUrl : undefined,
      });
    }
    setPostText("");
    setImage(null);
    setPreco("");
    setLocalizacao("");
    setTags([]);
    setTagInput("");
    setUrgente(false);
    setPatrocinado(false);
    setWhatsappUrl("");
    setShowPreco(false);
    setShowLocalizacao(false);
    setShowTags(false);
    setShowUrgente(false);
    setShowPatrocinado(false);
    setShowWhatsapp(false);
    toast({
      title: "Post publicado!",
      description: "Sua postagem foi enviada com sucesso.",
      variant: "default",
    });
  };

  return (
    <div className="w-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-700 shadow p-6 flex flex-col gap-4 mb-8">
      <div className="flex items-start gap-4">
        {/* Avatar do usuário */}
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-muted flex items-center justify-center border border-border">
          <User className="w-7 h-7 text-muted-foreground" />
        </div>
        {/* Campo de texto */}
        <textarea
          className="flex-1 resize-none border-none outline-none bg-transparent text-base text-foreground placeholder:text-muted-foreground min-h-[48px] max-h-32"
          placeholder="Escreva uma nova postagem..."
          value={postText}
          onChange={e => setPostText(e.target.value)}
          rows={2}
        />
      </div>
      {/* Preview da imagem */}
      {image && (
        <div className="flex items-center gap-2">
          <img src={image} alt="Preview" className="max-h-32 rounded-lg border" />
          <button onClick={() => setImage(null)} className="text-xs text-red-500 ml-2">Remover</button>
        </div>
      )}
      {/* Campos extras dinâmicos */}
      <div className="flex flex-wrap gap-3">
        {showPreco && (
          <div className="flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Preço"
              value={preco}
              onChange={e => setPreco(e.target.value)}
            />
            <button className="text-xs text-red-500" onClick={() => setShowPreco(false)}>Remover</button>
          </div>
        )}
        {showLocalizacao && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-600" />
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Localização"
              value={localizacao}
              onChange={e => setLocalizacao(e.target.value)}
            />
            <button className="text-xs text-red-500" onClick={() => setShowLocalizacao(false)}>Remover</button>
          </div>
        )}
        {showTags && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-4 h-4 text-purple-600" />
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Adicionar tag"
              value={tagInput}
              onChange={e => setTagInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddTag(); } }}
            />
            <button className="text-xs text-green-600" onClick={handleAddTag}>Adicionar</button>
            {tags.map(tag => (
              <span key={tag} className="bg-primary/10 text-primary border-primary/20 text-xs rounded px-2 py-0.5 ml-1 flex items-center gap-1">
                #{tag}
                <button className="ml-1 text-red-500" onClick={() => handleRemoveTag(tag)}>x</button>
              </span>
            ))}
            <button className="text-xs text-red-500 ml-2" onClick={() => setShowTags(false)}>Remover</button>
          </div>
        )}
        {showUrgente && (
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-600" />
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={urgente} onChange={e => setUrgente(e.target.checked)} /> Urgente
            </label>
            <button className="text-xs text-red-500" onClick={() => setShowUrgente(false)}>Remover</button>
          </div>
        )}
        {showPatrocinado && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <label className="flex items-center gap-1 text-sm">
              <input type="checkbox" checked={patrocinado} onChange={e => setPatrocinado(e.target.checked)} /> Patrocinado
            </label>
            <button className="text-xs text-red-500" onClick={() => setShowPatrocinado(false)}>Remover</button>
          </div>
        )}
        {showWhatsapp && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-green-600" />
            <input
              type="text"
              className="border rounded px-2 py-1 text-sm"
              placeholder="Link WhatsApp"
              value={whatsappUrl}
              onChange={e => setWhatsappUrl(e.target.value)}
            />
            <button className="text-xs text-red-500" onClick={() => setShowWhatsapp(false)}>Remover</button>
          </div>
        )}
      </div>
      {/* Barra de ícones de ação */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Botão de imagem */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
            title="Adicionar imagem"
          >
            <Image className="w-5 h-5" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
          </button>
          {/* Botão de GIF (apenas visual, sem funcionalidade real) */}
          <button
            type="button"
            className="p-2 rounded-full hover:bg-primary/10 text-primary transition-colors"
            title="Adicionar GIF"
          >
            <Smile className="w-5 h-5" />
          </button>
          {/* Botão de localização */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showLocalizacao ? "bg-blue-100 text-blue-600" : "hover:bg-primary/10 text-primary")}
            title="Adicionar localização"
            onClick={() => setShowLocalizacao(v => !v)}
          >
            <MapPin className="w-5 h-5" />
          </button>
          {/* Botão de preço */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showPreco ? "bg-green-100 text-green-600" : "hover:bg-primary/10 text-primary")}
            title="Adicionar preço"
            onClick={() => setShowPreco(v => !v)}
          >
            <DollarSign className="w-5 h-5" />
          </button>
          {/* Botão de tags */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showTags ? "bg-purple-100 text-purple-600" : "hover:bg-primary/10 text-primary")}
            title="Adicionar tags"
            onClick={() => setShowTags(v => !v)}
          >
            <Tag className="w-5 h-5" />
          </button>
          {/* Botão de urgente */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showUrgente ? "bg-red-100 text-red-600" : "hover:bg-primary/10 text-primary")}
            title="Marcar como urgente"
            onClick={() => setShowUrgente(v => !v)}
          >
            <Zap className="w-5 h-5" />
          </button>
          {/* Botão de patrocinado */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showPatrocinado ? "bg-yellow-100 text-yellow-600" : "hover:bg-primary/10 text-primary")}
            title="Marcar como patrocinado"
            onClick={() => setShowPatrocinado(v => !v)}
          >
            <Star className="w-5 h-5" />
          </button>
          {/* Botão de WhatsApp */}
          <button
            type="button"
            className={cn("p-2 rounded-full transition-colors", showWhatsapp ? "bg-green-100 text-green-600" : "hover:bg-primary/10 text-primary")}
            title="Adicionar WhatsApp"
            onClick={() => setShowWhatsapp(v => !v)}
          >
            <Phone className="w-5 h-5" />
          </button>
        </div>
        <button
          className={cn(
            "px-6 py-2 rounded-full bg-primary text-white font-semibold text-base shadow hover:bg-primary/90 transition-all",
            !postText && "opacity-60 cursor-not-allowed"
          )}
          disabled={!postText}
          onClick={handlePost}
        >
          Postar
        </button>
      </div>
    </div>
  );
} 