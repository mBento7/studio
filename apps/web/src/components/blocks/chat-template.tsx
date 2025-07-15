"use client";

import React, { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarInset,
} from "@/components/ui/sidebar";

// Hook simples para controle da sidebar
const useSidebar = () => {
  const [isOpen, setIsOpen] = React.useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);
  return { isOpen, toggleSidebar };
};
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Brush,
  Camera,
  ChartBarIncreasing,
  ChevronUp,
  CircleFadingPlus,
  CircleOff,
  CircleUserRound,
  File,
  Image,
  ListFilter,
  Menu,
  MessageCircle,
  MessageSquareDashed,
  MessageSquareDot,
  Mic,
  Paperclip,
  Phone,
  Search,
  Send,
  Settings,
  Smile,
  SquarePen,
  Star,
  User,
  User2,
  UserRound,
  Users,
  Video,
} from "lucide-react";

type Message = {
  from: string;
  text: string;
  created_at: string;
};

type ExampleMessages = Record<string, Message[]>;

// Lista de contatos (mock)
const contactList = [
  {
    name: "Manoj Rayi",
    message: "Vamos revisar o projeto amanhã?",
    image: "https://github.com/rayimanoj8.png",
  },
  {
    name: "Anjali Kumar",
    message: "Recebeu os arquivos?",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    name: "Ravi Teja",
    message: "Ótimo trabalho na apresentação!",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    name: "Sneha Reddy",
    message: "Pode me ligar quando estiver livre?",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
];

// Mensagens de exemplo para cada contato
const exampleMessages: ExampleMessages = {
  "Manoj Rayi": [
    { from: "Manoj Rayi", text: "Oi! Como está?", created_at: "09:00" },
    { from: "me", text: "Olá Manoj! Estou bem, e você?", created_at: "09:01" },
    { from: "Manoj Rayi", text: "Tudo ótimo. Vamos revisar o projeto amanhã?", created_at: "09:02" },
    { from: "me", text: "Claro! Qual horário prefere?", created_at: "09:03" },
  ],
  "Anjali Kumar": [
    { from: "me", text: "Bom dia, Anjali! Envie os arquivos, por favor.", created_at: "08:30" },
    { from: "Anjali Kumar", text: "Bom dia! Acabei de enviar para seu e-mail.", created_at: "08:31" },
    { from: "me", text: "Recebido, obrigado!", created_at: "08:32" },
    { from: "Anjali Kumar", text: "Qualquer dúvida, me avise.", created_at: "08:33" },
  ],
  "Ravi Teja": [
    { from: "Ravi Teja", text: "Ótimo trabalho na apresentação!", created_at: "10:00" },
    { from: "me", text: "Obrigado, Ravi! Fico feliz que gostou.", created_at: "10:01" },
    { from: "Ravi Teja", text: "Vamos marcar uma call para alinhar os próximos passos?", created_at: "10:02" },
    { from: "me", text: "Sim, pode ser hoje à tarde?", created_at: "10:03" },
  ],
  "Sneha Reddy": [
    { from: "Sneha Reddy", text: "Pode me ligar quando estiver livre?", created_at: "11:00" },
    { from: "me", text: "Posso sim, te ligo em 10 minutos!", created_at: "11:01" },
    { from: "Sneha Reddy", text: "Perfeito, obrigada!", created_at: "11:02" },
  ],
};

const menuItems = [
  { title: "Messages", url: "#", icon: MessageCircle },
  { title: "Phone", url: "#", icon: Phone },
  { title: "Status", url: "#", icon: CircleFadingPlus },
];

export const Home = () => {
  const { toggleSidebar } = useSidebar();
  const [currentChat, setCurrentChat] = useState(contactList[0]);
  // Estado de mensagens por contato (mock)
  // TODO: Quando integrar com Supabase, buscar mensagens do contato selecionado
  const [messages, setMessages] = useState<Record<string, Message[]>>(() =>
    Object.fromEntries(
      contactList.map((c) => [c.name, exampleMessages[c.name] || []])
    )
  );
  const [input, setInput] = useState("");

  // Envio de mensagem
  const handleSend = () => {
    if (!input.trim()) return;
    // TODO: Quando integrar com Supabase, enviar mensagem para o backend
    setMessages((prev) => ({
      ...prev,
      [currentChat.name]: [
        ...(prev[currentChat.name] || []),
        { from: "me", text: input, created_at: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ],
    }));
    setInput("");
  };

  // Gera iniciais para o AvatarFallback
  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <>
      {/* Sidebar */}
      <Sidebar variant="floating" collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Navegar</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton onClick={toggleSidebar} asChild>
                    <span>
                      <Menu />
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} aria-label={item.title}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Settings /> Configurações
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton>
                    <User2 /> Manoj Rayi
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <a href="https://github.com/rayimanoj8/">Conta</a>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Backup</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      {/* Conteúdo principal */}
      <SidebarInset>
        <ResizablePanelGroup direction="horizontal" className="h-screen">
          {/* Painel esquerdo - Lista de chats */}
          <ResizablePanel defaultSize={25} minSize={20} className="flex-grow">
            <div className="flex flex-col h-screen border ml-1">
              <div className="h-10 px-2 py-4 flex items-center">
                <p className="ml-1">Chats</p>
                <div className="flex justify-end w-full">
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon" aria-label="Novo contato ou grupo">
                        <SquarePen />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <User /> Novo Contato
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users /> Novo Grupo
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" aria-label="Filtrar chats">
                        <ListFilter />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>Filtrar chats por</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <MessageSquareDot /> Não lidos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Star /> Favoritos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleUserRound /> Contatos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CircleOff /> Não contatos
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <Users /> Grupos
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquareDashed /> Rascunhos
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Barra de busca */}
              <div className="relative px-2 py-4">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" />
                <Input
                  placeholder="Buscar ou iniciar novo chat"
                  className="pl-10"
                  aria-label="Buscar chats"
                />
              </div>
              {/* Lista de contatos */}
              <ScrollArea className="flex-grow">
                {contactList.map((contact, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentChat(contact)}
                    className={`px-4 w-full py-2 hover:bg-secondary cursor-pointer text-left ${currentChat.name === contact.name ? "bg-accent/30" : ""}`}
                    aria-label={`Abrir chat com ${contact.name}`}
                  >
                    <div className="flex flex-row gap-2">
                      <Avatar className="size-12">
                        <AvatarImage src={contact.image} />
                        <AvatarFallback>{getInitials(contact.name)}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <CardTitle>{contact.name}</CardTitle>
                        <CardDescription>{contact.message}</CardDescription>
                      </div>
                    </div>
                  </button>
                ))}
              </ScrollArea>
            </div>
          </ResizablePanel>
          <ResizableHandle />
          {/* Painel direito - Janela do chat */}
          <ResizablePanel defaultSize={75} minSize={40}>
            <div className="flex flex-col justify-between h-screen ml-1 pb-2 bg-background">
              {/* Cabeçalho do chat */}
              <div className="h-16 border-b flex items-center px-3 bg-card/80 backdrop-blur-md">
                <Avatar className="size-12">
                  <AvatarImage src={currentChat?.image} />
                  <AvatarFallback>{getInitials(currentChat?.name || "")}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 ml-2">
                  <CardTitle>{currentChat?.name}</CardTitle>
                  <CardDescription>Contato</CardDescription>
                </div>
                <div className="flex-grow flex justify-end gap-2">
                  <Button variant="ghost" size="icon" aria-label="Chamada de vídeo">
                    <Video />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Chamada de voz">
                    <Phone />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Buscar no chat">
                    <Search />
                  </Button>
                </div>
              </div>
              {/* Histórico de mensagens - visual aprimorado */}
              <ScrollArea className="flex-grow px-4 py-4 bg-gradient-to-b from-background to-muted/40">
                <div className="flex flex-col gap-2">
                  {(messages[currentChat.name] || []).map((msg: Message, idx: number) => {
                    const isMe = msg.from === "me";
                    return (
                      <div
                        key={idx}
                        className={`flex items-end ${isMe ? "justify-end" : "justify-start"}`}
                      >
                        {!isMe && (
                          <Avatar className="size-8 mr-2">
                            <AvatarImage src={currentChat.image} />
                            <AvatarFallback>{getInitials(currentChat.name)}</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={`max-w-[70%] rounded-2xl px-4 py-2 shadow-md text-sm relative
                            ${isMe ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-white text-black dark:bg-muted dark:text-white rounded-bl-sm"}
                          `}
                        >
                          {msg.text}
                          <span className="block text-xs text-muted-foreground mt-1 text-right">
                            {msg.created_at || ""}
                          </span>
                        </div>
                        {isMe && (
                          <Avatar className="size-8 ml-2">
                            <AvatarImage src="/avatar-default.png" />
                            <AvatarFallback>EU</AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
              {/* Input de mensagem */}
              <div className="flex h-12 pt-2 border-t bg-card/80 backdrop-blur-md px-2 gap-2 items-center">
                <Button variant="ghost" size="icon" aria-label="Emoji">
                  <Smile />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost" size="icon" aria-label="Anexar arquivo">
                      <Paperclip />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Image /> Fotos & Vídeos
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Camera /> Câmera
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <File /> Documento
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <UserRound /> Contato
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <ChartBarIncreasing /> Enquete
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Brush /> Desenho
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSend()}
                  className="flex-grow border-0 bg-background rounded-full px-4"
                  placeholder="Digite uma mensagem"
                  aria-label="Digite uma mensagem"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={handleSend} aria-label="Enviar mensagem">
                  <Send />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Gravar áudio">
                  <Mic />
                </Button>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </SidebarInset>
    </>
  );
};

// Exportação padrão para facilitar importação
export default Home;