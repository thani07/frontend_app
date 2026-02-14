import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Volume2, VolumeX, ArrowLeft } from "lucide-react";

const LETTER_TEXT = `My Dearest Ishaa,

Thank you for choosing me, even on the days when we don't understand each other, even through our little fights and misunderstandings. Somehow, every storm between us only brings our hearts closer, stronger than before. What we have is not fragile — it is growing, deepening, becoming something beautiful with time.

Never think you are alone, not even for a moment. I am always here, beside you, with you, and for you. Through your smiles, your worries, your silence, and your dreams — I am yours.

Ishaa, you are not just a part of my life, you are my life's peace, my comfort, my home. I am not here for a moment or a season — I am here to stay, permanently, faithfully, and completely.

So don't overthink, don't carry fears in your heart. Whatever comes, we will face it together. Your happiness is my strength, your tears are my pain, and your love is my greatest blessing.

Forever Yours ♥`;

interface LoveLetterProps {
  onBack: () => void;
  onToggleMute: () => boolean;
  isMuted: boolean;
}

const LoveLetter = ({ onBack, onToggleMute, isMuted }: LoveLetterProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const speed = 30;
    const timer = setInterval(() => {
      if (index < LETTER_TEXT.length) {
        setDisplayedText(LETTER_TEXT.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, hsl(30 30% 96%) 0%, hsl(350 40% 90%) 50%, hsl(30 25% 93%) 100%)
        `,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-30 bg-background/60 backdrop-blur-md border-b border-border/30 px-4 py-3"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded-full p-2 hover:bg-secondary/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <Heart size={20} className="fill-primary text-primary" />
            <span className="font-display text-lg font-semibold text-gradient-rose">My Letter</span>
          </div>
          <button
            onClick={() => onToggleMute()}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            {isMuted ? "Unmute" : "Mute"}
          </button>
        </div>
      </motion.header>

      {/* Letter */}
      <div className="mx-auto max-w-lg px-6 py-12">
        <motion.div
          className="relative rounded-lg p-8 sm:p-12 shadow-2xl"
          style={{
            background: "linear-gradient(170deg, hsl(38 45% 95%) 0%, hsl(30 30% 92%) 100%)",
            boxShadow: "0 20px 60px -15px hsl(350 25% 20% / 0.15), inset 0 1px 0 hsl(38 55% 90%)",
          }}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {/* Decorative corner */}
          <div className="absolute top-4 left-4 opacity-20">
            <Heart size={24} className="fill-primary text-primary" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-20">
            <Heart size={24} className="fill-primary text-primary" />
          </div>

          {/* Letter lines background */}
          <div
            className="absolute inset-x-8 top-12 bottom-8 pointer-events-none opacity-[0.08]"
            style={{
              backgroundImage: "repeating-linear-gradient(transparent, transparent 31px, hsl(345 40% 42%) 31px, hsl(345 40% 42%) 32px)",
            }}
          />

          <div className="relative z-10">
            <p
              className="font-handwritten text-lg sm:text-xl leading-[2] text-foreground/85 whitespace-pre-line"
            >
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 animate-pulse" />
              )}
            </p>
          </div>
        </motion.div>

        {/* Bottom message */}
        <motion.div
          className="flex flex-col items-center gap-3 pt-12 pb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <Heart size={28} className="fill-primary text-primary" />
          <p className="font-display text-xl text-gradient-rose font-semibold text-center">
            Happy Valentine's Day, my love
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 rounded-full bg-primary px-6 py-2 text-sm font-display text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Back to Top
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoveLetter;