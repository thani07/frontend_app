import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const hearts = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 4,
  duration: 4 + Math.random() * 4,
  size: 12 + Math.random() * 20,
  opacity: 0.15 + Math.random() * 0.25,
}));

const FloatingHearts = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
    {hearts.map((h) => (
      <motion.div
        key={h.id}
        className="absolute"
        style={{ left: `${h.x}%`, bottom: -40 }}
        animate={{ y: [0, -window.innerHeight - 100], opacity: [0, h.opacity, 0] }}
        transition={{ duration: h.duration, delay: h.delay, repeat: Infinity, ease: "easeOut" }}
      >
        <Heart
          size={h.size}
          className="fill-primary/30 text-primary/40"
        />
      </motion.div>
    ))}
  </div>
);

export default FloatingHearts;
