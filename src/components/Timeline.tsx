import { motion } from "framer-motion";
import { Heart, RotateCcw } from "lucide-react";
import TimelineCard from "./TimelineCard";
import FloatingHearts from "./FloatingHearts";
import MusicToggle from "./MusicToggle";
import { timelineEvents } from "@/data/timelineData";

interface TimelineProps {
  onReplay: () => void;
}

const Timeline = ({ onReplay }: TimelineProps) => {
  return (
    <div className="relative min-h-screen bg-background">
      <FloatingHearts />

      {/* Header */}
      <motion.header
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-lg items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart size={20} className="fill-primary text-primary" />
            <span className="font-display text-lg font-semibold text-gradient-rose">Our Story</span>
          </div>
          <MusicToggle />
          <button
            onClick={onReplay}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            <RotateCcw size={14} />
            Replay
          </button>
        </div>
      </motion.header>

      {/* Timeline intro */}
      <motion.div
        className="py-12 text-center px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-rose mb-2">
          Our Love Story
        </h1>
        <p className="text-muted-foreground font-body italic">
          Scroll through our most cherished moments
        </p>
        <div className="mx-auto mt-6 h-16 w-px bg-gradient-to-b from-transparent via-primary/30 to-primary/10" />
      </motion.div>

      {/* Timeline cards */}
      <div className="relative z-10 mx-auto max-w-lg space-y-4 px-4 pb-8">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-primary/10" />

        {timelineEvents.map((event, i) => (
          <TimelineCard key={event.id} event={event} index={i} />
        ))}
      </div>

      {/* Footer */}
      <motion.footer
        className="relative z-10 py-16 text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Heart size={32} className="mx-auto mb-4 fill-primary text-primary" />
        <p className="font-display text-2xl text-gradient-rose font-semibold mb-2">
          And the best is yet to come...
        </p>
        <p className="text-muted-foreground text-sm italic mb-6">
          Happy Valentine's Day, my love ♥
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="rounded-full bg-primary px-6 py-2 text-sm font-display text-primary-foreground shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Back to Top
        </button>
      </motion.footer>
    </div>
  );
};

export default Timeline;
