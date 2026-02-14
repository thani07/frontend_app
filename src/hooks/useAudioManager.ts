import { useRef, useCallback } from "react";

const AUDIO1_URL = "/audio/Neeyum-Naanum-Anbe-MassTamilan.com.mp3";
const AUDIO2_URL = "https://cdn.pixabay.com/audio/2024/02/14/audio_8e153fe404.mp3";

export const useAudioManager = () => {
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);
  const isMutedRef = useRef(false);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const originalVolumeRef = useRef(0.35);

  const startMusic = useCallback(() => {
    if (audio1Ref.current) return; // already started

    const audio1 = new Audio(AUDIO1_URL);
    const audio2 = new Audio(AUDIO2_URL);
    audio1.volume = 0.35;
    audio2.volume = 0.35;
    originalVolumeRef.current = 0.35;
    audio2.loop = true;

    audio1.addEventListener("ended", () => {
      if (!isMutedRef.current) {
        audio2.play().catch(() => {});
      }
    });

    audio1Ref.current = audio1;
    audio2Ref.current = audio2;

    audio1.play().catch(() => {});
  }, []);

  const toggleMute = useCallback(() => {
    isMutedRef.current = !isMutedRef.current;
    const muted = isMutedRef.current;
    if (audio1Ref.current) audio1Ref.current.muted = muted;
    if (audio2Ref.current) audio2Ref.current.muted = muted;
    return muted;
  }, []);

  const isMuted = useCallback(() => isMutedRef.current, []);

  // Fade out music smoothly
  const pauseMusic = useCallback(() => {
    // Clear any existing fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const currentAudio = audio1Ref.current?.paused === false 
      ? audio1Ref.current 
      : audio2Ref.current;

    if (!currentAudio || currentAudio.paused) return;

    // Store original volume
    const targetVolume = 0;
    const fadeStep = 0.05;
    const fadeInterval = 50; // milliseconds

    fadeIntervalRef.current = setInterval(() => {
      if (!currentAudio) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        return;
      }

      if (currentAudio.volume > targetVolume + fadeStep) {
        currentAudio.volume = Math.max(targetVolume, currentAudio.volume - fadeStep);
      } else {
        currentAudio.volume = targetVolume;
        currentAudio.pause();
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
      }
    }, fadeInterval);
  }, []);

  // Fade in music smoothly
  const resumeMusic = useCallback(() => {
    // Clear any existing fade interval
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    if (!isMutedRef.current) {
      const currentAudio = audio1Ref.current?.ended === false
        ? audio1Ref.current
        : audio2Ref.current;

      if (!currentAudio) return;

      // Start from low volume
      currentAudio.volume = 0;
      currentAudio.play().catch(() => {});

      // Fade in to original volume
      const targetVolume = originalVolumeRef.current;
      const fadeStep = 0.05;
      const fadeInterval = 50;

      fadeIntervalRef.current = setInterval(() => {
        if (!currentAudio) {
          if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
          return;
        }

        if (currentAudio.volume < targetVolume - fadeStep) {
          currentAudio.volume = Math.min(targetVolume, currentAudio.volume + fadeStep);
        } else {
          currentAudio.volume = targetVolume;
          if (fadeIntervalRef.current) {
            clearInterval(fadeIntervalRef.current);
            fadeIntervalRef.current = null;
          }
        }
      }, fadeInterval);
    }
  }, []);

  return { startMusic, toggleMute, isMuted, pauseMusic, resumeMusic };
};