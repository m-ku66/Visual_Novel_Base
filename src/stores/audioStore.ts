import { create } from "zustand";
import type { BGMConfig, SFXConfig, AudioFade } from "../types/vn";

// =============================================
// AUDIO STORE - Manages BGM and SFX playback
// =============================================

interface AudioState {
  // Current state
  currentBGM: HTMLAudioElement | null;
  currentBGMSrc: string | null;
  bgmVolume: number;
  sfxVolume: number;
  isMuted: boolean;

  // BGM Controls
  playBGM: (config: BGMConfig) => void;
  stopBGM: (fade?: AudioFade) => void;
  pauseBGM: () => void;
  resumeBGM: () => void;

  // SFX Controls
  playSFX: (config: SFXConfig) => void;

  // Volume Controls
  setBGMVolume: (volume: number) => void;
  setSFXVolume: (volume: number) => void;
  setMuted: (muted: boolean) => void;

  // Cleanup
  cleanup: () => void;
}

// Helper: Linear interpolation for smooth fades
const lerp = (start: number, end: number, t: number) => {
  return start + (end - start) * t;
};

// Helper: Easing functions
const easingFunctions = {
  linear: (t: number) => t,
  "ease-in": (t: number) => t * t,
  "ease-out": (t: number) => t * (2 - t),
  "ease-in-out": (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
};

// Helper: Fade audio element
const fadeAudio = (
  audio: HTMLAudioElement,
  targetVolume: number,
  fade: AudioFade,
  onComplete?: () => void
) => {
  const startVolume = audio.volume;
  const startTime = Date.now();
  const duration = fade.duration * 1000; // Convert to ms
  const easing = easingFunctions[fade.easing || "linear"];

  const fadeInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easing(progress);

    audio.volume = lerp(startVolume, targetVolume, easedProgress);

    if (progress >= 1) {
      clearInterval(fadeInterval);
      if (onComplete) onComplete();
    }
  }, 16); // ~60fps
};

export const useAudioStore = create<AudioState>((set, get) => ({
  // Initial state
  currentBGM: null,
  currentBGMSrc: null,
  bgmVolume: 1.0,
  sfxVolume: 1.0,
  isMuted: false,

  // Play or crossfade to new BGM
  playBGM: (config: BGMConfig) => {
    const { currentBGM, currentBGMSrc, bgmVolume, isMuted } = get();

    // If same track is already playing, do nothing
    if (currentBGMSrc === config.src && currentBGM) {
      console.log(`🎵 BGM already playing: ${config.src}`);
      return;
    }

    // Stop previous BGM if exists
    if (currentBGM) {
      console.log(`🔇 Stopping previous BGM: ${currentBGMSrc}`);
      if (config.fadeOut) {
        fadeAudio(currentBGM, 0, config.fadeOut, () => {
          currentBGM.pause();
          currentBGM.src = "";
        });
      } else {
        currentBGM.pause();
        currentBGM.src = "";
      }
    }

    // Create new audio element
    const audio = new Audio(config.src);
    audio.loop = config.loop ?? true;
    audio.volume = isMuted ? 0 : 0; // Start at 0 for fade in

    // Set up event listeners
    audio.addEventListener("canplaythrough", () => {
      audio.play().catch((error) => {
        console.error("🚫 Failed to play BGM:", error);
      });

      // Fade in if configured
      const targetVolume = isMuted ? 0 : (config.volume ?? 1.0) * bgmVolume;
      if (config.fadeIn) {
        fadeAudio(audio, targetVolume, config.fadeIn);
      } else {
        audio.volume = targetVolume;
      }
    });

    audio.addEventListener("error", (e) => {
      console.error("🚫 BGM load error:", config.src, e);
    });

    // Load and update state
    audio.load();
    set({
      currentBGM: audio,
      currentBGMSrc: config.src,
    });

    console.log(`🎵 Playing BGM: ${config.src}`);
  },

  // Stop current BGM
  stopBGM: (fade?: AudioFade) => {
    const { currentBGM } = get();

    if (!currentBGM) return;

    console.log(`🔇 Stopping BGM`);

    if (fade) {
      fadeAudio(currentBGM, 0, fade, () => {
        currentBGM.pause();
        currentBGM.src = "";
        set({ currentBGM: null, currentBGMSrc: null });
      });
    } else {
      currentBGM.pause();
      currentBGM.src = "";
      set({ currentBGM: null, currentBGMSrc: null });
    }
  },

  // Pause BGM
  pauseBGM: () => {
    const { currentBGM } = get();
    if (currentBGM) {
      currentBGM.pause();
      console.log("⏸️ BGM paused");
    }
  },

  // Resume BGM
  resumeBGM: () => {
    const { currentBGM } = get();
    if (currentBGM) {
      currentBGM.play().catch((error) => {
        console.error("🚫 Failed to resume BGM:", error);
      });
      console.log("▶️ BGM resumed");
    }
  },

  // Play a sound effect
  playSFX: (config: SFXConfig) => {
    const { sfxVolume, isMuted } = get();

    const sfx = new Audio(config.src);
    sfx.volume = isMuted ? 0 : (config.volume ?? 1.0) * sfxVolume;
    sfx.loop = config.loop ?? false;

    const playWithDelay = () => {
      const delay = (config.delay ?? 0) * 1000;
      setTimeout(() => {
        sfx.play().catch((error) => {
          console.error("🚫 Failed to play SFX:", error);
        });
      }, delay);
    };

    sfx.addEventListener("canplaythrough", playWithDelay);
    sfx.addEventListener("error", (e) => {
      console.error("🚫 SFX load error:", config.src, e);
    });

    sfx.load();
    console.log(`🔊 Playing SFX: ${config.src}`);
  },

  // Set BGM master volume
  setBGMVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    const { currentBGM, isMuted } = get();

    if (currentBGM && !isMuted) {
      currentBGM.volume = clampedVolume;
    }

    set({ bgmVolume: clampedVolume });
    console.log(`🔊 BGM volume: ${clampedVolume}`);
  },

  // Set SFX master volume
  setSFXVolume: (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    set({ sfxVolume: clampedVolume });
    console.log(`🔊 SFX volume: ${clampedVolume}`);
  },

  // Mute/unmute all audio
  setMuted: (muted: boolean) => {
    const { currentBGM, bgmVolume } = get();

    if (currentBGM) {
      currentBGM.volume = muted ? 0 : bgmVolume;
    }

    set({ isMuted: muted });
    console.log(muted ? "🔇 Audio muted" : "🔊 Audio unmuted");
  },

  // Cleanup - call when unmounting
  cleanup: () => {
    const { currentBGM } = get();

    if (currentBGM) {
      currentBGM.pause();
      currentBGM.src = "";
    }

    set({
      currentBGM: null,
      currentBGMSrc: null,
    });

    console.log("🧹 Audio store cleaned up");
  },
}));
