"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  TrendingUp,
  CheckCircle,
  CalendarClock,
  Users,
  Video,
  Gift,
  ThumbsUp,
  Star,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { LayoutDecider } from "@/components/layout/layout-decider";

// ✅ ChecklistCard
const ChecklistCard = () => {
  const tasks = [
    { label: "Briefing recebido", done: true },
    { label: "Rascunho entregue", done: false },
    { label: "Aprovação pendente", done: false },
  ];

  return (
    <Card className="p-5 space-y-4 max-w-lg mx-auto">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <CheckCircle className="text-green-500" /> Progresso do Projeto
      </h3>
      <ul className="space-y-2">
        {tasks.map((task, i) => (
          <li
            key={i}
            className={`flex items-center gap-2 ${
              task.done ? "text-green-600" : "text-muted-foreground"
            }`}
          >
            <CheckCircle
              className={task.done ? "text-green-500" : "text-gray-300"}
              size={18}
            />
            {task.label}
          </li>
        ))}
      </ul>
    </Card>
  );
};

// 📆 AgendaCard
const AgendaCard = () => {
  return (
    <Card className="p-5 space-y-3 max-w-lg mx-auto">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <CalendarClock className="text-blue-600" />
        Próxima Sessão
      </h3>
      <p className="text-muted-foreground">Quarta-feira, 18h - Online (Zoom)</p>
      <Button className="mt-2">Ver Detalhes</Button>
    </Card>
  );
};

// 🔥 TrendingCard
const TrendingCard = () => {
  return (
    <Card className="p-5 space-y-3 max-w-lg mx-auto border-orange-500">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold flex items-center gap-2 text-orange-500">
          <TrendingUp /> Post em Alta
        </h3>
        <Badge className="bg-orange-100 text-orange-700 text-xs">+1.2K views</Badge>
      </div>
      <p className="text-muted-foreground">
        Meu novo logo para a marca FitHealth! O que acham?
      </p>
      <div className="text-sm text-gray-500">Ana Paula • 2h atrás</div>
    </Card>
  );
};

// 🌟 UserSpotlightCard
const UserSpotlightCard = () => {
  return (
    <Card className="p-5 space-y-4 max-w-lg mx-auto">
      <h3 className="font-bold text-lg flex items-center gap-2">
        <Star className="text-yellow-500" />
        Destaque da Comunidade
      </h3>
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://i.pravatar.cc/100?img=12" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">João Silva</p>
          <p className="text-xs text-muted-foreground">
            “Incrível trabalho de redesign no app da minha startup!”
          </p>
        </div>
      </div>
    </Card>
  );
};

// 🎥 ReelCard
const ReelCard = () => {
  return (
    <Card className="p-0 overflow-hidden max-w-sm mx-auto shadow-lg">
      <video
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        autoPlay
        muted
        loop
        className="w-full h-64 object-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="https://i.pravatar.cc/100?img=14" />
            <AvatarFallback>MP</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-bold text-sm">Marcela Pro</p>
            <p className="text-xs text-muted-foreground">@marcela.pro</p>
          </div>
        </div>
        <p className="text-sm">Preview do projeto de animação 3D 😍</p>
      </div>
    </Card>
  );
};

// 🎁 SorteioCard
const SorteioCard = () => {
  return (
    <Card className="p-5 max-w-lg mx-auto space-y-3 border-pink-500">
      <h3 className="text-lg font-bold flex items-center gap-2 text-pink-600">
        <Gift /> Sorteio no Ar!
      </h3>
      <p className="text-muted-foreground">
        Participe e concorra a uma mentoria gratuita de 1h com Lucas UX!
      </p>
      <Button variant="outline" className="text-pink-600 border-pink-500">
        Participar Agora
      </Button>
    </Card>
  );
};

const ShowcaseExtras = () => {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold">Extras do Feed</h1>
          <p className="text-muted-foreground">
            Componentes avançados para engajar e informar no feed
          </p>
        </div>

        {/* Cards personalizados */}
        <section>
          <h2 className="font-bold text-lg mb-3">ChecklistCard</h2>
          <ChecklistCard />
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">AgendaCard</h2>
          <AgendaCard />
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">TrendingCard</h2>
          <TrendingCard />
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">UserSpotlightCard</h2>
          <UserSpotlightCard />
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">ReelCard</h2>
          <ReelCard />
        </section>

        <section>
          <h2 className="font-bold text-lg mb-3">SorteioCard</h2>
          <SorteioCard />
        </section>
      </div>
    </div>
  );
};

export default function ShowcaseExtrasPage() {
  return (
    <LayoutDecider>
      <ShowcaseExtras />
    </LayoutDecider>
  );
} 