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
    <Card className="w-full max-w-2xl mx-auto mb-4 p-4 bg-gradient-to-br from-blue-50 via-blue-100 to-white dark:from-blue-900 dark:via-blue-950 dark:to-background">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Sparkles className="w-8 h-8 text-blue-500" />
        </div>
        <div>
          <div className="font-bold text-lg text-blue-900 dark:text-blue-200 mb-1">{titulo}</div>
          <div className="text-gray-700 dark:text-gray-200 mb-2">{descricao}</div>
          <div className="text-xs text-blue-700 dark:text-blue-300 font-semibold">{data}</div>
        </div>
      </div>
    </Card>
  );
};

export default UpdateCard; 