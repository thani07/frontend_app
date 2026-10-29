import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const LOVE_QUOTES = ["Quote placeholder"];

const ShakeForQuote = () => {
  const [quote, setQuote] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let lastShake = 0;
    let lastX = 0, lastY = 0, lastZ = 0;

    const handleMotion = (e: DeviceMotionEvent) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc || !acc.x || !acc.y || !acc.z) return;

      const deltaX = Math.abs(acc.x - lastX);
      const deltaY = Math.abs(acc.y - lastY);
      const deltaZ = Math.abs(acc.z - lastZ);

      if (deltaX + deltaY + deltaZ > 30) {
        const now = Date.now();
        if (now - lastShake > 1000) {
          const randomQuote = LOVE_QUOTES[Math.floor(Math.random() * LOVE_QUOTES.length)];
          setQuote(randomQuote);
          setShow(true);
          setTimeout(() => setShow(false), 3000);
          lastShake = now;
        }
      }

      lastX = acc.x;
      lastY = acc.y;
      lastZ = acc.z;
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 -translate-x-1/2 z-50 max-w-sm"
        >
          <div className="bg-primary/90 backdrop-blur-sm text-primary-foreground px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3">
            <Heart size={20} className="fill-current flex-shrink-0" />
            <p className="font-body text-sm italic">{quote}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShakeForQuote;
