import { useState } from 'react';
import { Star } from 'lucide-react';

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
    <div className="p-4 border rounded-xl bg-white shadow-lg">
      <h3 className="text-lg font-semibold mb-3">Deixe sua avaliação</h3>
      <div className="flex items-center mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-6 h-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
            onClick={() => setRating(star)}
          />
        ))}
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out resize-y"
        placeholder="Escreva seu comentário aqui..."
        rows={4}
      />
      <button
        onClick={handleSubmit}
        className="mt-3 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
      >
        Enviar Avaliação
      </button>
    </div>
  );
} 