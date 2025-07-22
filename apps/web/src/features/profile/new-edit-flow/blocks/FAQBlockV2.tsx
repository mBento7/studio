import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
import { PLAN_LIMITS, PlanType } from '../layoutFeatures';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockV2Props {
  faqs: FAQItem[];
  onChange: (faqs: FAQItem[]) => void;
  plan?: PlanType;
}

export function FAQBlockV2({ faqs, onChange, plan = PlanType.FREE }: FAQBlockV2Props) {
  const safeFaqs = faqs ?? [];
  const limit = PLAN_LIMITS[plan as keyof typeof PLAN_LIMITS]?.faq ?? 0;
  const [touched, setTouched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<FAQItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenModalForAdd = () => {
    setCurrentItem({ question: '', answer: '' });
    setEditingIndex(null);
    setIsModalOpen(true);
  };
  const handleOpenModalForEdit = (idx: number) => {
    setCurrentItem(safeFaqs[idx]);
    setEditingIndex(idx);
    setIsModalOpen(true);
  };
  const handleSave = () => {
    const newFaqs = [...safeFaqs];
    if (editingIndex !== null) {
      newFaqs[editingIndex] = currentItem;
    } else {
      newFaqs.push(currentItem);
    }
    onChange(newFaqs);
    setIsModalOpen(false);
  };

  const removeFaq = (idx: number) => {
    onChange(safeFaqs.filter((_, i) => i !== idx));
    setTouched(true);
  };

  const hasError = touched && safeFaqs.length === 0;

  return (
    <div className="space-y-6">
      {safeFaqs.map((item, idx) => (
        <div key={idx} className="flex flex-col gap-2 border-b pb-4 mb-4 cursor-pointer" onClick={() => handleOpenModalForEdit(idx)}>
          <div className="flex gap-2 items-center">
            <Label htmlFor={`faq-question-${idx}`} className="sr-only">Pergunta</Label>
            <Input
              id={`faq-question-${idx}`}
              value={item.question}
              placeholder="Digite a pergunta..."
              className="flex-1 pointer-events-none"
              autoComplete="off"
              readOnly
            />
            <Button onClick={(e) => { e.stopPropagation(); removeFaq(idx); }} variant="ghost" size="icon" aria-label="Remover pergunta">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <Textarea
            id={`faq-answer-${idx}`}
            value={item.answer}
            placeholder="Digite a resposta..."
            className="flex-1 pointer-events-none"
            autoComplete="off"
            readOnly
            rows={2}
          />
        </div>
      ))}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpenModalForAdd}
            disabled={safeFaqs.length >= limit}
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" /> Adicionar Pergunta
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Editar Pergunta' : 'Adicionar Pergunta'}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null ? 'Edite a pergunta e a resposta.' : 'Adicione uma nova pergunta e resposta frequente.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faqQuestion" className="text-right">
                Pergunta
              </Label>
              <Input
                id="faqQuestion"
                value={currentItem?.question || ''}
                onChange={e => setCurrentItem({ ...currentItem, question: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="faqAnswer" className="text-right">
                Resposta
              </Label>
              <Textarea
                id="faqAnswer"
                value={currentItem?.answer || ''}
                onChange={e => setCurrentItem({ ...currentItem, answer: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleSave}>Salvar Pergunta</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {safeFaqs.length >= limit && <div className="text-warning text-xs mt-1">Limite de {limit} perguntas atingido para seu plano.</div>}
      {limit === 0 && <div className="text-warning text-xs mt-1">Recurso disponível apenas para planos superiores.</div>}
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos uma pergunta.</div>}
    </div>
  );
}
