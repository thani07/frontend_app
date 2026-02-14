import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Piece {
  id: number;
  x: number;
  y: number;
  color: string;
  rotation: number;
}

const Confetti = ({ active }: { active: boolean }) => {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (!active) return;

    const colors = ["#ff6b9d", "#c9184a", "#ff8fab", "#ffc2d1", "#ffafcc"];
    const newPieces: Piece[] = [];

    for (let i = 0; i < 50; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -20,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      });
    }

    setPieces(newPieces);

    const timer = setTimeout(() => {
      setPieces([]);
    }, 3000);

    return () => clearTimeout(timer);
  }, [active]);

  if (!active || pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          initial={{
            x: piece.x,
            y: piece.y,
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: window.innerHeight + 20,
            rotate: piece.rotation + 360,
            opacity: 0,
          }}
          transition={{
            duration: 2 + Math.random() * 1,
            ease: "easeIn",
          }}
          style={{
            position: "absolute",
            width: "10px",
            height: "10px",
            backgroundColor: piece.color,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
