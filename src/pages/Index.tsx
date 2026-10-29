import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ValentineQuestion from "@/components/ValentineQuestion";
import LoveJourney from "@/components/LoveJourney";
import LoveLetter from "@/components/LoveLetter";
import MouseTrail from "@/components/MouseTrail";
import WelcomeScreen from "@/components/WelcomeScreen";

type Page = "welcome" | "question" | "journey" | "letter";

const Index = () => {
  const [page, setPage] = useState<Page>("welcome");
  return (
    <div className="min-h-screen bg-background">
      <MouseTrail />
      <AnimatePresence mode="wait">
        {page === "welcome" && (
          <WelcomeScreen key="welcome" onEnter={() => setPage("question")} />
        )}
        {page === "question" && (
          <ValentineQuestion key="question" onYes={() => setPage("journey")} />
        )}
        {page === "journey" && (
          <LoveJourney
            key="journey"
            onNext={() => setPage("letter")}
            onBack={() => setPage("question")}
          />
        )}
        {page === "letter" && (
          <LoveLetter
            key="letter"
            onBack={() => setPage("journey")}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;