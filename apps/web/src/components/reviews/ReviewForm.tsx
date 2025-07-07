import { useState } from 'react';
import { Star } from 'lucide-react';
import { Card } from "@/components/ui/card";

interface ReviewFormProps {
  onSubmit: (data: { rating: number; comment: string }) => void;
}

export function ReviewForm({ onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Por favor, selecione uma avaliação de estrela.");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0); // Resetar após o envio
    setComment(""); // Resetar após o envio
  };

  return (
    <Card className="p-4 md:p-6 shadow-md dark:bg-slate-800/80 mt-4">
      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Deixe sua avaliação</h3>
      <div className="flex items-center mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 cursor-pointer ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300 dark:text-gray-600"}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500"
        placeholder="Escreva seu comentário aqui..."
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out w-full"
      >
        Enviar Avaliação
      </button>
    </Card>
  );
} 