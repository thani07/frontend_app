import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  "Love is not about how many days, months, or years you have been together. It's all about how much you love each other every single day.",
  "You are my sun, my moon, and all my stars.",
  "In your smile, I see something more beautiful than the stars.",
  "I have found the one whom my soul loves.",
];

const LoveQuotesRotation = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-10 max-w-md px-4">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm text-muted-foreground/60 italic font-body"
        >
          {QUOTES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default LoveQuotesRotation;
