import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import ValentineQuestion from "@/components/ValentineQuestion";
import LoveJourney from "@/components/LoveJourney";
import LoveLetter from "@/components/LoveLetter";
import MouseTrail from "@/components/MouseTrail";
import WelcomeScreen from "@/components/WelcomeScreen";
import { useAudioManager } from "@/hooks/useAudioManager";

type Page = "welcome" | "question" | "journey" | "letter";

const Index = () => {
  const [page, setPage] = useState<Page>("welcome");
  const [muted, setMuted] = useState(false);
  const [musicPausedForVideo, setMusicPausedForVideo] = useState(false);
  const [preventAutoResume, setPreventAutoResume] = useState(false);
  const { startMusic, toggleMute, pauseMusic, resumeMusic } = useAudioManager();

  const handleYes = useCallback(() => {
    startMusic();
    setPage("journey");
  }, [startMusic]);

  const handleToggleMute = useCallback(() => {
    const newMuted = toggleMute();
    setMuted(newMuted);
    return newMuted;
  }, [toggleMute]);

  const handlePauseMusic = useCallback(() => {
    pauseMusic();
    setMusicPausedForVideo(true);
  }, [pauseMusic]);

  const handleResumeMusic = useCallback(() => {
    if (!preventAutoResume) {
      resumeMusic();
      setMusicPausedForVideo(false);
    }
  }, [resumeMusic, preventAutoResume]);

  const handleToggleAutoResume = useCallback(() => {
    setPreventAutoResume((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MouseTrail />
      <AnimatePresence mode="wait">
        {page === "welcome" && (
          <WelcomeScreen key="welcome" onEnter={() => setPage("question")} />
        )}
        {page === "question" && (
          <ValentineQuestion key="question" onYes={handleYes} />
        )}
        {page === "journey" && (
          <LoveJourney
            key="journey"
            onNext={() => setPage("letter")}
            onBack={() => setPage("question")}
            onToggleMute={handleToggleMute}
            isMuted={muted}
            onPauseMusic={handlePauseMusic}
            onResumeMusic={handleResumeMusic}
            musicPausedForVideo={musicPausedForVideo}
            preventAutoResume={preventAutoResume}
            onToggleAutoResume={handleToggleAutoResume}
          />
        )}
        {page === "letter" && (
          <LoveLetter
            key="letter"
            onBack={() => setPage("journey")}
            onToggleMute={handleToggleMute}
            isMuted={muted}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;