import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface Faq {
  question: string;
  answer: string;
}

interface FaqSectionProps {
  faqs: Faq[];
  canAdd?: boolean;
  onAddFaq?: () => void;
  expandedFaq?: number | null;
  setExpandedFaq?: (idx: number | null) => void;
  maxFaqs?: number;
}

export function FaqSection({ faqs, canAdd, onAddFaq, expandedFaq: expanded, setExpandedFaq, maxFaqs }: FaqSectionProps) {
  const [expandedFaq, setExpandedFaqLocal] = useState<number | null>(null);
  const isControlled = typeof expanded === "number" && typeof setExpandedFaq === "function";
  const expandedIdx = isControlled ? expanded : expandedFaq;
  const setExpanded = isControlled ? setExpandedFaq! : setExpandedFaqLocal;

  return (
    <section className="py-16 px-4 max-w-5xl mx-auto">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900 dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
        <Sparkles className="w-5 h-5 text-blue-500" /> Perguntas Frequentes
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <Card key={faq.question + idx} className="p-0 bg-white/80 dark:bg-slate-800/80 rounded-lg overflow-hidden">
            <button
              className="w-full flex justify-between items-center px-4 py-4 focus:outline-none focus:ring-2 focus:ring-blue-400 text-left"
              onClick={() => setExpanded(expandedIdx === idx ? null : idx)}
              aria-expanded={expandedIdx === idx}
            >
              <span className="font-semibold text-blue-800 dark:text-blue-300">{faq.question}</span>
              <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${expandedIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence initial={false}>
              {expandedIdx === idx && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-4 pb-4 text-slate-700 dark:text-slate-300"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </Card>
        ))}
      </div>
      {canAdd && onAddFaq && (
        <Button
          onClick={onAddFaq}
          disabled={typeof maxFaqs === 'number' && faqs.length >= maxFaqs}
          className="mb-4 mt-6"
        >
          Adicionar Pergunta
        </Button>
      )}
    </section>
  );
} 