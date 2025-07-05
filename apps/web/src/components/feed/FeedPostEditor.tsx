import React, { useEffect, useRef, useState } from "react";
import { Image, MapPin, Smile, User, DollarSign, Zap, Phone, X, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { tipoConfig } from "@/config/feed";
import { WhosdoIcon } from "@/components/icons/whosdo-icon";

interface FeedPostEditorProps {
  onPost?: (data: {
    texto: string;
    imagem?: string | null;
    preco?: string;
    localizacao?: string;
    tipo: 'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto';
    urgente?: boolean;
    whatsappUrl?: string;
    tags: string[];
  }) => void;
}

export function FeedPostEditor({ onPost }: FeedPostEditorProps) {
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [showPreco, setShowPreco] = useState(false);
  const [showLocalizacao, setShowLocalizacao] = useState(false);
  const [preco, setPreco] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [tipoPost, setTipoPost] = useState<'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto'>('oferta_servico');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [showTagInput, setShowTagInput] = useState(false);
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const { scrollHeight } = textarea;
      textarea.style.height = `${scrollHeight}px`;
    }
  }, [postText]);

  const postTypes = (Object.keys(tipoConfig) as Array<keyof typeof tipoConfig>).filter(key => key !== 'patrocinado');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
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

    if (onPost) {
      onPost({
        texto: postText,
        imagem: image,
        preco: showPreco ? preco : undefined,
        localizacao: showLocalizacao ? localizacao : undefined,
        tipo: tipoPost,
        tags,
      });
    }
    
    setPostText("");
    setImage(null);
    setPreco("");
    setLocalizacao("");
    setTipoPost('oferta_servico');
    setTags([]);
    setTagInput("");
    
    toast({
      title: "Post publicado!",
      description: "Sua postagem foi enviada com sucesso.",
      variant: "default",
    });
  };

  const toggleOption = (option: string) => {
    switch (option) {
      case 'preco': setShowPreco(!showPreco); break;
      case 'localizacao': setShowLocalizacao(!showLocalizacao); break;
      case 'tag': setShowTagInput(!showTagInput); break;
    }
  };

  const activeOptions = [
    showPreco && 'preco',
    showLocalizacao && 'localizacao',
  ].filter(Boolean);

  // Função para formatar valor como moeda brasileira
  function formatarMoeda(valor: string) {
    // Remove tudo que não for número
    let v = valor.replace(/\D/g, "");
    if (!v) return "";
    v = (parseInt(v, 10)).toString();
    // Adiciona zeros à esquerda se necessário
    while (v.length < 3) v = "0" + v;
    // Formata para 0.000,00
    v = v.replace(/(\d+)(\d{2})$/, "$1,$2");
    v = v.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    return v;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="w-full bg-card rounded-[var(--radius)] shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-6 space-y-6">
        <div className="relative">
          <Textarea
            ref={textRef}
            rows={2}
            className="resize-none overflow-hidden border bg-background/50 focus-visible:ring-1 focus-visible:ring-primary/50 text-base placeholder:text-muted-foreground/60 p-4"
            placeholder="O que você gostaria de compartilhar hoje?"
            value={postText}
            onChange={e => setPostText(e.target.value)}
            maxLength={500}
          />
          <div className="absolute bottom-2 right-3 flex justify-end">
            <span className={cn(
              "text-xs transition-colors",
              postText.length > 500 ? "text-destructive" : "text-muted-foreground"
            )}>
              {postText.length}/500
            </span>
          </div>
        </div>

        {/* Tipo de postagem */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Tipo de postagem</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {postTypes.map(typeKey => {
              const config = tipoConfig[typeKey];
              const isActive = tipoPost === typeKey;
              return (
                <motion.button
                  key={typeKey}
                  onClick={() => setTipoPost(typeKey)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-2 text-sm px-3 py-2 border rounded-lg transition-all font-medium text-left",
                    isActive
                      ? "bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white font-semibold shadow-md border-transparent"
                      : "bg-transparent border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10"
                  )}
                >
                  {React.cloneElement(config.icon, { 
                    className: cn("w-4 h-4", isActive ? "text-white" : "text-[#0e9094]") 
                  })}
                  <span className="flex-1">{config.badge}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {image && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="relative rounded-xl overflow-hidden border bg-muted/20"
            >
              <img src={image} alt="Preview" className="w-full h-auto max-h-72 object-cover" />
              <Button
                variant="destructive"
                size="icon"
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 h-8 w-8 rounded-full shadow-lg"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {activeOptions.length > 0 || showTagInput || tags.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 bg-muted/20 rounded-xl border"
            >
              {showPreco && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">$</span>
                    <input
                      type="text"
                      className="pl-7 pr-2 bg-background border border-border rounded-lg py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-full"
                      placeholder="Preço (ex: $ 200,00)"
                      value={preco}
                      onChange={e => {
                        const raw = e.target.value;
                        setPreco(formatarMoeda(raw));
                      }}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setShowPreco(false)}><X className="w-4 h-4" /></Button>
                </motion.div>
              )}
              {showLocalizacao && (
                <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <input type="text" className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Localização" value={localizacao} onChange={e => setLocalizacao(e.target.value)} />
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => setShowLocalizacao(false)}><X className="w-4 h-4" /></Button>
                </motion.div>
              )}
              {(tags.length > 0 || showTagInput) && (
                <div className="flex flex-col gap-2 w-full">
                  {tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {tags.map((tag, idx) => (
                        <span key={idx} className="bg-teal-100 text-teal-800 dark:bg-teal-900/50 dark:text-teal-300 border border-teal-200/50 dark:border-teal-800/50 text-xs rounded px-2 py-0.5 flex items-center gap-1">
                          #{tag}
                          <button type="button" className="ml-1 text-xs" onClick={() => setTags(tags.filter((_, i) => i !== idx))}>×</button>
                        </span>
                      ))}
                    </div>
                  )}
                  {showTagInput && (
                    <input
                      type="text"
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                      placeholder="Digite uma tag e pressione Enter"
                      value={tagInput}
                      onChange={e => {
                        let value = e.target.value;
                        if (!value.startsWith('#')) value = '#' + value.replace(/[^0-ÿ0-9 ]/gi, '');
                        else value = '#' + value.slice(1).replace(/[^0-ÿ0-9 ]/gi, '');
                        setTagInput(value);
                      }}
                      onKeyDown={e => {
                        if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
                          e.preventDefault();
                          const cleanTag = tagInput.replace(/^#+/, '').trim();
                          if (cleanTag && !tags.includes(cleanTag)) {
                            setTags([...tags, cleanTag]);
                          }
                          setTagInput("");
                        }
                      }}
                    />
                  )}
                </div>
              )}
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Botões de opções na parte inferior */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          <div className="flex items-center gap-0.5">
            <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()} className="text-muted-foreground hover:text-primary"><Image className="w-5 h-5" /></Button>
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleImageChange} />

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary"><Smile className="w-5 h-5" /></Button>
              </PopoverTrigger>
              <PopoverContent className="p-0 border-none w-auto">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </PopoverContent>
            </Popover>

            <div className="h-6 w-px bg-border/50 mx-2"></div>

            {[{ key: 'preco', icon: DollarSign, active: showPreco }, { key: 'localizacao', icon: MapPin, active: showLocalizacao }].map(({ key, icon: Icon, active }) => (
              <Button
                key={key}
                variant="ghost"
                size="icon"
                onClick={() => toggleOption(key)}
                className={cn("transition-colors", active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary")}
              >
                <Icon className="w-5 h-5" />
              </Button>
            ))}
            {/* Botão para tag com funcionalidade de inserir '#' */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toggleOption('tag');
                setTagInput((prev) => prev.startsWith('#') ? prev : '#' + prev);
              }}
              className={cn("transition-colors", showTagInput ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary")}
            >
              <Tag className="w-5 h-5" />
            </Button>
          </div>

          <Button 
            onClick={handlePost} 
            disabled={!postText.trim()} 
            className="px-8 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md"
          >
            Publicar
          </Button>
        </div>
      </div>
    </motion.div>
  );
} 