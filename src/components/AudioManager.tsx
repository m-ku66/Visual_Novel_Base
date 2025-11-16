import { useEffect, useRef } from "react";
import { useAudioStore } from "../stores/audioStore";
import type { Slide } from "../types/vn";

// =============================================
// AUDIO MANAGER COMPONENT
// Handles automatic BGM/SFX playback based on current slide
// =============================================

interface AudioManagerProps {
    currentSlide: Slide | null;
    onChoiceMade?: () => void; // Optional callback when choice is made
}

export function AudioManager({ currentSlide, onChoiceMade }: AudioManagerProps) {
    const { playBGM, stopBGM, playSFX } = useAudioStore();
    const previousSlideId = useRef<string | null>(null);
    const onLoadSFXPlayed = useRef<Set<string>>(new Set());

    // Handle slide changes
    useEffect(() => {
        if (!currentSlide) return;

        // Only process if slide changed
        if (previousSlideId.current === currentSlide.id) return;

        console.log(`🎬 Slide changed: ${currentSlide.id}`);

        const audioConfig = currentSlide.audio;

        if (!audioConfig) {
            previousSlideId.current = currentSlide.id;
            return;
        }

        // Handle BGM
        if (audioConfig.bgm) {
            playBGM(audioConfig.bgm);
        } else if (audioConfig.stopPreviousBGM) {
            // Stop BGM if explicitly requested
            stopBGM({
                duration: 1.5,
                easing: "ease-out",
            });
        }

        // Handle onLoad SFX
        if (audioConfig.sfx) {
            audioConfig.sfx.forEach((sfxConfig) => {
                if (sfxConfig.trigger === "onLoad" || !sfxConfig.trigger) {
                    const sfxKey = `${currentSlide.id}-${sfxConfig.src}`;
                    // Prevent duplicate plays of the same SFX on same slide
                    if (!onLoadSFXPlayed.current.has(sfxKey)) {
                        playSFX(sfxConfig);
                        onLoadSFXPlayed.current.add(sfxKey);
                    }
                }
            });
        }

        // Clean up onLoad SFX tracking when slide changes
        onLoadSFXPlayed.current.clear();
        previousSlideId.current = currentSlide.id;
    }, [currentSlide, playBGM, stopBGM, playSFX]);

    // Handle choice SFX
    useEffect(() => {
        if (!currentSlide?.audio?.sfx || !onChoiceMade) return;

        const choiceSFX = currentSlide.audio.sfx.filter(
            (sfx) => sfx.trigger === "onChoice"
        );

        if (choiceSFX.length > 0) {
            // This will be called externally when a choice is made
            // For now, we'll set up the handler
        }
    }, [currentSlide, onChoiceMade]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            // Don't stop BGM on unmount - let it continue between scenes
            console.log("🎵 AudioManager unmounted");
        };
    }, []);

    // This component doesn't render anything
    return null;
}

// =============================================
// HOOK FOR MANUAL CONTROL
// Use this if you need more control over audio in components
// =============================================

export function useAudio() {
    const store = useAudioStore();

    const playChoiceSFX = (slide: Slide | null) => {
        if (!slide?.audio?.sfx) return;

        const choiceSFX = slide.audio.sfx.filter((sfx) => sfx.trigger === "onChoice");
        choiceSFX.forEach((sfx) => store.playSFX(sfx));
    };

    const playClickSFX = (slide: Slide | null) => {
        if (!slide?.audio?.sfx) return;

        const clickSFX = slide.audio.sfx.filter((sfx) => sfx.trigger === "onClick");
        clickSFX.forEach((sfx) => store.playSFX(sfx));
    };

    return {
        ...store,
        playChoiceSFX,
        playClickSFX,
    };
}

// =============================================
// AUDIO CONTROLS UI COMPONENT (Optional)
// Add this to your UI for player volume control
// =============================================

export function AudioControls() {
    const { bgmVolume, sfxVolume, isMuted, setBGMVolume, setSFXVolume, setMuted } =
        useAudioStore();

    return (
        <div className="bg-gray-800 rounded-lg p-4 space-y-3">
            <h3 className="text-white font-semibold mb-2">🔊 Audio Settings</h3>

            {/* Mute Toggle */}
            <div className="flex items-center justify-between">
                <span className="text-gray-300 text-sm">Mute All</span>
                <button
                    onClick={() => setMuted(!isMuted)}
                    className={`px-3 py-1 rounded ${isMuted
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                        } text-white text-sm transition-colors`}
                >
                    {isMuted ? "🔇 Muted" : "🔊 On"}
                </button>
            </div>

            {/* BGM Volume */}
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Music Volume</span>
                    <span className="text-gray-400 text-xs">{Math.round(bgmVolume * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={bgmVolume * 100}
                    onChange={(e) => setBGMVolume(parseInt(e.target.value) / 100)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
            </div>

            {/* SFX Volume */}
            <div className="space-y-1">
                <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Sound Effects Volume</span>
                    <span className="text-gray-400 text-xs">{Math.round(sfxVolume * 100)}%</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={sfxVolume * 100}
                    onChange={(e) => setSFXVolume(parseInt(e.target.value) / 100)}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                />
            </div>
        </div>
    );
}