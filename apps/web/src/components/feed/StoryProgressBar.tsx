import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  duration?: number; // em segundos
  onComplete?: () => void;
}

export const StoryProgressBar: React.FC<ProgressBarProps> = ({ duration = 6, onComplete }) => {
  const progress = useMotionValue(0); // 0 a 100
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  useAnimationFrame((t) => {
    if (isPaused) return;
    if (completedRef.current) return;
    if (startTimeRef.current === null) {
      startTimeRef.current = t;
    }
    const elapsed = (t - startTimeRef.current) / 1000;
    const percentage = Math.min((elapsed / duration) * 100, 100);
    progress.set(percentage);
    if (percentage >= 100 && onComplete && !completedRef.current) {
      completedRef.current = true;
      onComplete();
    }
  });

  // Reset progress when duration changes
  useEffect(() => {
    progress.set(0);
    startTimeRef.current = null;
    completedRef.current = false;
  }, [duration, progress]);

  const handlePause = () => setIsPaused(true);
  const handleResume = () => setIsPaused(false);

  return (
    <div
      className="absolute top-0 left-0 w-full h-1 bg-black/30 z-30"
      onMouseDown={handlePause}
      onMouseUp={handleResume}
      onTouchStart={handlePause}
      onTouchEnd={handleResume}
    >
      <motion.div
        className="h-full bg-white"
        style={{ width: progress.get() + "%" }}
      />
    </div>
  );
}; 