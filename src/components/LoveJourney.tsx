import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Heart, Volume2, VolumeX, ChevronDown, Music, ArrowLeft } from "lucide-react";

import timeline1 from "@/assets/timeline-1.jpg";
import timeline2 from "@/assets/timeline-2.jpg";
import timeline3 from "@/assets/timeline-3.jpg";
import timeline4 from "@/assets/timeline-4.jpg";
import timeline5 from "@/assets/timeline-5.jpg";
import timeline6 from "@/assets/timeline-6.jpg";

const memories = [
  { image: timeline1, caption: "The day our story began" },
  { image: timeline2, caption: "Our first date together" },
  { image: timeline3, caption: "our first traditional wear" },
  { image: timeline4, caption: "a day of matching matching" },
  { image: timeline5, caption: "The moment I knew forever you are my wife" },
  { image: timeline6, caption: "Our most clarity selfie" },
];

interface LoveJourneyProps {
  onNext: () => void;
  onBack: () => void;
  onToggleMute: () => boolean;
  isMuted: boolean;
  onPauseMusic: () => void;
  onResumeMusic: () => void;
  musicPausedForVideo: boolean;
  preventAutoResume: boolean;
  onToggleAutoResume: () => void;
}

const LoveJourney = ({ 
  onNext,
  onBack, 
  onToggleMute, 
  isMuted, 
  onPauseMusic, 
  onResumeMusic,
  musicPausedForVideo,
  preventAutoResume,
  onToggleAutoResume
}: LoveJourneyProps) => {
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoveredImageIndex, setHoveredImageIndex] = useState<number | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [tiltAngles, setTiltAngles] = useState<{ x: number; y: number }[]>(
    Array(6).fill({ x: 0, y: 0 })
  );
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lastTapRef = useRef<number>(0);

  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent, index: number) => {
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = 'touches' in e ? e.touches[0].clientX - rect.left : (e as React.MouseEvent).clientX - rect.left;
      const y = 'touches' in e ? e.touches[0].clientY - rect.top : (e as React.MouseEvent).clientY - rect.top;
      
      setHearts(prev => [...prev, { id: Date.now(), x, y }]);
      setTimeout(() => {
        setHearts(prev => prev.slice(1));
      }, 1000);
    }
    lastTapRef.current = now;
  };

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    setTiltAngles(prev => {
      const newAngles = [...prev];
      newAngles[index] = { x: y * 10, y: -x * 10 };
      return newAngles;
    });
  };

  const resetTilt = (index: number) => {
    setTiltAngles(prev => {
      const newAngles = [...prev];
      newAngles[index] = { x: 0, y: 0 };
      return newAngles;
    });
  };

  const openGallery = (index: number) => {
    setCurrentImageIndex(index);
    setGalleryOpen(true);
  };

  // Handle video play/pause to control background music
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoOpen) return;

    const handlePlay = () => {
      onPauseMusic();
    };

    const handleEnded = () => {
      onResumeMusic();
    };

    // Pause music immediately when video opens and autoplays
    if (videoOpen) {
      onPauseMusic();
    }

    video.addEventListener("play", handlePlay);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, [onPauseMusic, onResumeMusic, videoOpen]);

  // Resume music when video modal closes
  const handleCloseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onResumeMusic();
    setVideoOpen(false);
  };

  return (
    <motion.div
      className="min-h-screen bg-background relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.header
        className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border/50 px-4 py-3"
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="rounded-full p-2 hover:bg-secondary/50 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft size={20} className="text-primary" />
            </button>
            <Heart size={20} className="fill-primary text-primary" />
            <span className="font-display text-lg font-semibold text-gradient-rose">Our Memories</span>
          </div>
          <div className="flex items-center gap-2">
            {/* Visual Indicator - Music Status */}
            {musicPausedForVideo && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 px-3 py-1.5 text-xs font-medium text-amber-800 dark:text-amber-200"
              >
                <VolumeX size={12} />
                <span>Music paused</span>
              </motion.div>
            )}
            <button
              onClick={() => onToggleMute()}
              className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              {isMuted ? "Unmute" : "Mute"}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Title section */}
      <motion.div
        className="py-12 text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-gradient-rose mb-2">
          Our Love Journey
        </h1>
        <p className="text-muted-foreground font-body italic">
          Every moment with you is a treasure
        </p>
      </motion.div>

      {/* Memory Grid with Hover/Zoom Effect */}
      <div className="mx-auto max-w-2xl px-4 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {memories.map((mem, i) => (
            <motion.div
              key={i}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onHoverStart={() => setHoveredImageIndex(i)}
              onHoverEnd={() => {
                setHoveredImageIndex(null);
                resetTilt(i);
              }}
              onTouchStart={(e) => {
                setHoveredImageIndex(i);
                handleDoubleTap(e, i);
              }}
              onTouchEnd={() => setHoveredImageIndex(null)}
              onMouseMove={(e) => handleMouseMove(e, i)}
              onMouseLeave={() => resetTilt(i)}
              onClick={() => openGallery(i)}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 1.05, zIndex: 10 }}
              style={{
                transform: `perspective(1000px) rotateX(${tiltAngles[i].x}deg) rotateY(${tiltAngles[i].y}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <motion.img
                src={mem.image}
                alt={mem.caption}
                className="aspect-[3/4] w-full object-cover"
                loading="lazy"
                animate={{
                  scale: hoveredImageIndex === i ? 1.1 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
              <motion.p 
                className="absolute bottom-3 left-3 right-3 font-body text-sm text-primary-foreground drop-shadow-md italic"
                animate={{
                  y: hoveredImageIndex === i ? -5 : 0,
                  opacity: hoveredImageIndex === i ? 1 : 0.9,
                }}
                transition={{ duration: 0.3 }}
              >
                {mem.caption}
              </motion.p>
              
              {/* Double-tap hearts */}
              <AnimatePresence>
                {hearts.filter(h => h.id).map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 2, opacity: 0, y: -50 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    style={{
                      position: "absolute",
                      left: heart.x,
                      top: heart.y,
                    }}
                    className="text-4xl pointer-events-none"
                  >
                    ❤️
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Enlarged preview on hover */}
              <AnimatePresence>
                {hoveredImageIndex === i && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="absolute inset-0 bg-primary/20 rounded-2xl" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Play button - center */}
        <motion.div
          className="flex justify-center py-12"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            onClick={() => setVideoOpen(true)}
            className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <Play size={32} className="text-primary-foreground ml-1" />
          </motion.button>
        </motion.div>

        <p className="text-center font-body text-sm text-muted-foreground italic mb-8">
          Tap play to relive our memories ♥
        </p>

        {/* Continue to love letter */}
        <motion.div
          className="flex flex-col items-center gap-2 pb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button
            onClick={onNext}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
          >
            <span className="font-display text-sm">Read my letter to you</span>
            <ChevronDown size={20} className="animate-bounce" />
          </button>
        </motion.div>
      </div>

      {/* Photo Gallery Modal */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setGalleryOpen(false)}
          >
            <button
              onClick={() => setGalleryOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-white/20 p-2 hover:bg-white/30 transition-colors"
            >
              <X size={24} className="text-white" />
            </button>
            
            <div className="relative w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={currentImageIndex}
                src={memories[currentImageIndex].image}
                alt={memories[currentImageIndex].caption}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              />
              
              <p className="text-white text-center mt-4 text-lg font-body italic">
                {memories[currentImageIndex].caption}
              </p>

              {/* Navigation */}
              {currentImageIndex > 0 && (
                <button
                  onClick={() => setCurrentImageIndex(prev => prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white text-2xl"
                >
                  ‹
                </button>
              )}
              
              {currentImageIndex < memories.length - 1 && (
                <button
                  onClick={() => setCurrentImageIndex(prev => prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white text-2xl"
                >
                  ›
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-lg rounded-2xl bg-card overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <button
                onClick={handleCloseVideo}
                className="absolute top-3 right-3 z-10 rounded-full bg-secondary/80 p-2 hover:bg-secondary transition-colors"
              >
                <X size={18} className="text-secondary-foreground" />
              </button>
              
              {/* Prevent Auto-Resume Toggle */}
              <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                <button
                  onClick={onToggleAutoResume}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                    preventAutoResume
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary/80 text-secondary-foreground hover:bg-secondary'
                  }`}
                >
                  {preventAutoResume ? <VolumeX size={12} /> : <Music size={12} />}
                  <span>{preventAutoResume ? 'Keep paused' : 'Auto-resume'}</span>
                </button>
              </div>

              <div className="aspect-video bg-muted flex items-center justify-center">
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  src="/Video/journey.mp4"
                  poster={timeline1}
                >
                  <p className="font-body text-muted-foreground text-center p-8">
                    Replace this with your memory video
                  </p>
                </video>
              </div>
              <div className="p-4 text-center">
                <p className="font-display text-lg text-gradient-rose font-semibold">Our Memories Together</p>
                <p className="font-body text-sm text-muted-foreground italic mt-1">
                  {preventAutoResume 
                    ? "Music will stay paused after video" 
                    : "Music will resume automatically ♥"
                  }
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoveJourney;