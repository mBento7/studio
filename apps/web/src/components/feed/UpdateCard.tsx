import React from "react";
import { Card } from '../ui/card';
import { Sparkles } from "lucide-react";

interface UpdateCardProps {
  titulo: string;
  descricao: string;
  data: string;
}

const UpdateCard = ({ titulo, descricao, data }: UpdateCardProps) => {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-4 p-4 
      bg-gradient-to-br from-blue-50 via-blue-100 to-white 
      dark:from-slate-800/50 dark:via-slate-700/30 dark:to-slate-800/20
      border border-border/50 dark:border-slate-600/30
      shadow-lg dark:shadow-2xl dark:shadow-black/20
      backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Sparkles className="w-8 h-8 text-blue-500 dark:text-blue-400" />
        </div>
        <div>
          <div className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-1">{titulo}</div>
          <div className="text-gray-700 dark:text-gray-300 mb-2">{descricao}</div>
          <div className="text-xs text-blue-700 dark:text-blue-400 font-semibold">{data}</div>
        </div>
      </div>
    </Card>
  );
};

export default UpdateCard;