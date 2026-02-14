import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const MusicVisualizer = () => {
  const [bars, setBars] = useState<number[]>(Array(30).fill(0.1));
  const animationRef = useRef<number>();

  useEffect(() => {
    const animate = () => {
      setBars(prev => 
        prev.map(() => Math.random() * 0.7 + 0.3)
      );
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-end justify-center gap-1 h-16 px-4 pb-4 z-10">
      {bars.map((height, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-primary/60 to-primary/30 rounded-full"
          animate={{ height: `${height * 100}%` }}
          transition={{ duration: 0.15, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

export default MusicVisualizer;
