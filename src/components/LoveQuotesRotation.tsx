import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = ["Quote placeholder"];

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
