import React, { useRef, useState } from "react";
import { Image, MapPin, Smile, User, Tag, DollarSign, Zap, Star, Phone, X } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { tipoConfig } from "@/config/feed";

interface FeedPostEditorProps {
  onPost?: (data: {
    texto: string;
    imagem?: string | null;
    preco?: string;
    localizacao?: string;
    tipo: 'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto';
    urgente?: boolean;
    whatsappUrl?: string;
  }) => void;
}

export function FeedPostEditor({ onPost }: FeedPostEditorProps) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showPreco, setShowPreco] = useState(false);
  const [showLocalizacao, setShowLocalizacao] = useState(false);
  const [showUrgente, setShowUrgente] = useState(false);
  const [showWhatsapp, setShowWhatsapp] = useState(false);
  const [preco, setPreco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tipoPost, setTipoPost] = useState<'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto'>('oferta_servico');
  const [urgente, setUrgente] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const postTypes = (Object.keys(tipoConfig) as Array<keyof typeof tipoConfig>)
    .filter(key => key !== 'patrocinado'); // Excluir patrocinado das opções

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // [FUTURO] Aqui pode ser feita a integração para upload da imagem para o backend ou storage (ex: S3, Supabase Storage, etc.)
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    if (!textRef.current) return;
    
    const { selectionStart, selectionEnd } = textRef.current;
    const newText = 
      postText.substring(0, selectionStart) + 
      emojiData.emoji + 
      postText.substring(selectionEnd);
      
    setPostText(newText);
    
    // Move o cursor para depois do emoji inserido
    setTimeout(() => {
      if (textRef.current) {
        textRef.current.selectionStart = textRef.current.selectionEnd = selectionStart + emojiData.emoji.length;
        textRef.current.focus();
      }
    }, 0);
  };

  const handlePost = () => {
    if (!postText.trim()) {
      toast({ title: "Oops!", description: "A postagem não pode estar vazia.", variant: "destructive" });
      return;
    }

    let finalWhatsappUrl = "";
    if (showWhatsapp && whatsappUrl.trim()) {
      const cleanedNumber = whatsappUrl.replace(/[\s-()]/g, '');
      if (/^\+?\d{10,}$/.test(cleanedNumber)) {
        const digitsOnly = cleanedNumber.replace('+', '');
        finalWhatsappUrl = `https://wa.me/${digitsOnly}`;
      } else {
        finalWhatsappUrl = whatsappUrl;
      }
    }

    if (onPost) {
      onPost({
        texto: postText,
        imagem: image,
        preco: showPreco ? preco : undefined,
        localizacao: showLocalizacao ? localizacao : undefined,
        tipo: tipoPost,
        urgente: urgente,
        whatsappUrl: finalWhatsappUrl || undefined,
      });
    }
    setPostText("");
    setImage(null);
    setPreco("");
    setLocalizacao("");
    setTipoPost('oferta_servico');
    setUrgente(false);
    setWhatsappUrl("");
    setShowPreco(false);
    setShowLocalizacao(false);
    setShowUrgente(false);
    setShowWhatsapp(false);
    toast({
      title: "Post publicado!",
      description: "Sua postagem foi enviada com sucesso.",
      variant: "default",
    });
  };

  return (
    <Card className="w-full p-3 shadow-lg rounded-md bg-card/90 border-0 mb-8">
      <div className="w-full bg-card rounded-md shadow-lg overflow-hidden border border-black/5 dark:border-white/10 p-6 flex flex-col gap-4">
        <div className="flex items-start gap-4">
          {/* Avatar e pré-visualização da imagem (se houver) */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-muted flex items-center justify-center border border-border">
              <User className="w-7 h-7 text-muted-foreground" />
            </div>
            {/* Preview da imagem */}
            {image && (
              <div className="relative w-24 h-24 border overflow-hidden">
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                <button
                  onClick={() => setImage(null)}
                  className="absolute top-1 right-1 bg-black bg-opacity-50 text-white p-1 hover:bg-opacity-75 transition-colors"
                  aria-label="Remover imagem"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>
          
          {/* Campo de texto principal */}
          <div className="flex-1 flex flex-col">
            <textarea
              ref={textRef}
              className="w-full resize-none border-none outline-none bg-transparent text-base text-foreground placeholder:text-muted-foreground min-h-[48px] flex-grow"
              placeholder="Escreva uma nova postagem..."
              value={postText}
              onChange={e => setPostText(e.target.value)}
              rows={image ? 5 : 2} // Aumenta a altura quando a imagem está presente
            />
          </div>
        </div>
        {/* Seletor de Tipo de Post */}
        <div className="flex flex-col gap-3 border-t pt-4 mt-2">
          <span className="text-sm font-medium text-muted-foreground">Qual o tipo da sua postagem?</span>
          <div className="flex flex-wrap gap-3 items-center">
            {postTypes.map(typeKey => {
              const config = tipoConfig[typeKey];
              return (
                <button
                  key={typeKey}
                  onClick={() => setTipoPost(typeKey)}
                  className={cn(
                    "flex items-center gap-2 text-xs px-3 py-1.5 border transition-colors font-semibold",
                    tipoPost === typeKey
                      ? `${config.bg} ${config.text} ${config.border}`
                      : "bg-transparent hover:bg-muted"
                  )}
                >
                  {React.cloneElement(config.icon, { className: "w-4 h-4" })}
                  {config.badge}
                </button>
              )
            })}
          </div>
        </div>
        {/* Campos extras dinâmicos */}
        {(showPreco || showLocalizacao || showWhatsapp || urgente) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 pt-4 border-t">
            {showPreco && (
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-b outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Preço (ex: 200,00)"
                  value={preco}
                  onChange={e => setPreco(e.target.value)}
                />
                <button className="text-xs text-red-500 hover:underline" onClick={() => setShowPreco(false)}>Remover</button>
              </div>
            )}
            {showLocalizacao && (
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-b outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Localização"
                  value={localizacao}
                  onChange={e => setLocalizacao(e.target.value)}
                />
                <button className="text-xs text-red-500 hover:underline" onClick={() => setShowLocalizacao(false)}>Remover</button>
              </div>
            )}
            {showWhatsapp && (
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  className="flex-1 bg-transparent border-b outline-none focus:border-primary transition-colors text-sm"
                  placeholder="Link ou número de WhatsApp"
                  value={whatsappUrl}
                  onChange={e => setWhatsappUrl(e.target.value)}
                />
                <button className="text-xs text-red-500 hover:underline" onClick={() => setShowWhatsapp(false)}>Remover</button>
              </div>
            )}
            {urgente && (
              <div className="flex items-center gap-2 text-red-600">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-semibold">Marcado como Urgente</span>
                <button className="text-xs text-red-500 hover:underline ml-auto" onClick={() => setUrgente(false)}>Remover</button>
              </div>
            )}
          </div>
        )}
        {/* Barra de ícones de ação */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
            <ActionButton
              icon={Image}
              label="Imagem"
              onClick={() => fileInputRef.current?.click()}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}
            />
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2"
                  aria-label="Emoji"
                >
                  <Smile className="w-5 h-5" />
                  <span className="hidden sm:inline">Emoji</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-none">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </PopoverContent>
            </Popover>
            <ActionButton
              icon={DollarSign}
              label="Preço"
              isActive={showPreco}
              onClick={() => setShowPreco(!showPreco)}
            />
            <ActionButton
              icon={MapPin}
              label="Local"
              isActive={showLocalizacao}
              onClick={() => setShowLocalizacao(!showLocalizacao)}
            />
            <ActionButton
              icon={Phone}
              label="Contato"
              isActive={showWhatsapp}
              onClick={() => setShowWhatsapp(!showWhatsapp)}
            />
            <ActionButton
              icon={Zap}
              label="Urgente"
              isActive={urgente}
              onClick={() => setUrgente(!urgente)}
            />
          </div>
          <button
            onClick={handlePost}
            className="px-6 py-2 text-sm font-semibold text-white bg-gradient-to-r from-[#14b8a6] to-[#0e9094] rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!postText.trim()}
          >
            Postar
          </button>
        </div>
      </div>
    </Card>
  );
}

interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

function ActionButton({ icon: Icon, label, isActive, onClick }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors p-2",
        isActive && "text-primary"
      )}
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
} 