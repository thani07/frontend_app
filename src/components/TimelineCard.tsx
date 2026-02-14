import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";
import type { TimelineEvent } from "@/data/timelineData";

interface TimelineCardProps {
  event: TimelineEvent;
  index: number;
}

const TimelineCard = ({ event, index }: TimelineCardProps) => {
  return (
    <motion.div
      className="flex flex-col items-center gap-6 px-4 pb-16"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: 0.1 }}
    >
      {/* Connector dot */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-display text-sm font-semibold text-gold uppercase tracking-widest">
          Chapter {index + 1}
        </span>
        <div className="h-8 w-px bg-primary/20" />
        <div className="h-3 w-3 rounded-full bg-primary shadow-md" />
      </div>

      {/* Image */}
      <motion.div
        className="relative w-full max-w-sm overflow-hidden rounded-2xl shadow-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img
          src={event.image}
          alt={event.title}
          className="aspect-[3/4] w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h2 className="font-display text-2xl font-bold text-primary-foreground drop-shadow-lg">
            {event.title}
          </h2>
        </div>
      </motion.div>

      {/* Details */}
      <div className="w-full max-w-sm space-y-3 text-center">
        <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar size={14} className="text-primary" />
            {event.date}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={14} className="text-primary" />
            {event.location}
          </span>
        </div>
        <p className="font-body text-base leading-relaxed text-foreground/80 italic">
          "{event.description}"
        </p>
      </div>
    </motion.div>
  );
};

export default TimelineCard;
