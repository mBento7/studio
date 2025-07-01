import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockV2Props {
  faqs: FAQItem[];
  onChange: (faqs: FAQItem[]) => void;
}

export function FAQBlockV2({ faqs, onChange }: FAQBlockV2Props) {
  const safeFaqs = faqs ?? [];
  const [touched, setTouched] = useState(false);
  const addFaq = () => {
    onChange([...safeFaqs, { question: "", answer: "" }]);
    setTouched(true);
  };
  const removeFaq = (idx: number) => {
    onChange(safeFaqs.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateFaq = (idx: number, field: "question" | "answer", value: string) => {
    const newFaqs = [...safeFaqs];
    newFaqs[idx] = { ...newFaqs[idx], [field]: value };
    onChange(newFaqs);
  };
  const hasError = touched && safeFaqs.length === 0;
  return (
    <div className="space-y-6">
      {safeFaqs.map((faq, idx) => (
        <div key={idx} className="flex flex-col gap-2 border-b pb-4 mb-4">
          <div className="flex gap-2 items-center">
            <Label htmlFor={`faq-question-${idx}`} className="sr-only">Pergunta</Label>
            <Input
              id={`faq-question-${idx}`}
              value={faq.question}
              onChange={e => updateFaq(idx, "question", e.target.value)}
              placeholder="Digite a pergunta..."
              className="flex-1"
              autoComplete="off"
            />
            <Button onClick={() => removeFaq(idx)} variant="ghost" size="icon" aria-label="Remover pergunta">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <Input
            id={`faq-answer-${idx}`}
            value={faq.answer}
            onChange={e => updateFaq(idx, "answer", e.target.value)}
            placeholder="Digite a resposta..."
            className="flex-1"
            autoComplete="off"
          />
        </div>
      ))}
      <Button onClick={addFaq} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Pergunta
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos uma pergunta.</div>}
    </div>
  );
} 