import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import Confetti from "./Confetti";

interface ValentineQuestionProps {
  onYes: () => void;
}

const ValentineQuestion = ({ onYes }: ValentineQuestionProps) => {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [noMoved, setNoMoved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYes = () => {
    setShowConfetti(true);
    setTimeout(() => onYes(), 1000);
  };

  const dodgeNo = useCallback(() => {
    const range = 200;
    const x = (Math.random() - 0.5) * range * 2;
    const y = (Math.random() - 0.5) * range * 2;
    setNoPos({ x, y });
    setNoMoved(true);
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      <FloatingHearts />
      <Confetti active={showConfetti} />

      <div className="relative z-10 flex flex-col items-center gap-8 px-8 text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
        >
          <Heart size={72} className="fill-primary text-primary" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-rose leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Will you be my
          <br />
          Valentine?
        </motion.h1>

        <motion.div
          className="flex items-center gap-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Yes button */}
          <motion.button
            onClick={handleYes}
            className="rounded-full bg-primary px-10 py-4 font-display text-xl text-primary-foreground shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Yes! 💕
          </motion.button>

          {/* No button - dodges cursor */}
          <motion.button
            onMouseEnter={dodgeNo}
            onTouchStart={dodgeNo}
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="rounded-full bg-secondary px-10 py-4 font-display text-xl text-secondary-foreground shadow-md"
          >
            {noMoved ? "Can't catch me! 😜" : "No"}
          </motion.button>
        </motion.div>

        <motion.p
          className="text-sm text-muted-foreground/60 mt-4 italic font-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          There's only one right answer ♥
        </motion.p>
      </div>
    </motion.div>
  );
};

export default ValentineQuestion;