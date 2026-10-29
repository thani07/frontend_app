import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import PhotoSlideshow from "./PhotoSlideshow";

interface WelcomeScreenProps {
  onEnter: () => void;
}

const WelcomeScreen = ({ onEnter }: WelcomeScreenProps) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <PhotoSlideshow />
      <FloatingHearts />

      <motion.div
        className="relative z-10 flex flex-col items-center gap-6 px-8 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.5 }}
        >
          <Heart size={64} className="fill-primary text-primary" />
        </motion.div>

        <motion.h1
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gradient-rose leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Happy Valentine's Day
        </motion.h1>

        <motion.p
          className="font-body text-lg sm:text-xl text-muted-foreground max-w-md italic"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          A journey through our most beautiful moments together
        </motion.p>

        <motion.button
          onClick={onEnter}
          className="mt-6 rounded-full bg-primary px-8 py-3 font-display text-lg text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Open Our Story
        </motion.button>

        <motion.p
          className="text-sm text-muted-foreground/60 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Tap to begin ♥
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;