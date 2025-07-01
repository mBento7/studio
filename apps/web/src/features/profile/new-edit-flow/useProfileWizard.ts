import { useState } from "react";

export function useProfileWizard(steps: any[]) {
  const [step, setStep] = useState(0);
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;
  const goNext = () => { if (!isLast) setStep(s => s + 1); };
  const goPrev = () => { if (!isFirst) setStep(s => s - 1); };
  return { step, setStep, isFirst, isLast, goNext, goPrev };
} 