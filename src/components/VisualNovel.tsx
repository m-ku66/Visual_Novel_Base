import { useEffect, useState } from 'react';
import { useVNStore } from '../stores/vnStore';
import type { GameStory } from '../types/vn';
import { UIGridOverlay } from './UIGridOverlay';
import { UIElement } from './UIElement';
import { GameWorldLayer } from './GameWorldLayer';
import { DialogueBox } from './DialogueBox';
import { ChoiceModal } from './ChoiceModal';
import { PhaseIndicator } from './PhaseIndicator';
import { PointDisplay } from './PointDisplay';
import { ContinueButton } from './ContinueButton';
import { NavigationControls } from './NavigationControls';
import { CompletionScreen } from './CompletionScreen';
import { LoadingScreen } from './LoadingScreen';
import { DebugPanel } from './DebugPanel';

interface VisualNovelProps {
    story: GameStory;
    className?: string;
}

export function VisualNovel({ story, className = '' }: VisualNovelProps) {
    const {
        loadStory,
        getCurrentSlide,
        getFilteredChoices,
        advanceSlide,
        makeChoice,
        reset,
        currentPhase,
        getDebugInfo,
        choicesMade,
        endingUnlocked
    } = useVNStore();

    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [showDebug, setShowDebug] = useState(false);

    // Load story on mount
    useEffect(() => {
        loadStory(story);
    }, [story, loadStory]);

    const currentSlide = getCurrentSlide();
    const filteredChoices = getFilteredChoices();
    const debugInfo = getDebugInfo();


    // 🔑 ESC toggle for choice modal
    useEffect(() => {
        const handleGlobalKeyPress = (e: KeyboardEvent) => {
            // Only handle ESC for choice modal toggle
            if (e.key === 'Escape') {
                e.preventDefault();

                // If choices are available, toggle the modal
                if (filteredChoices.length > 0) {
                    setShowChoiceModal(prev => !prev);
                }
            }

            // Handle continue actions when modal is closed and no choices
            else if ((e.key === 'Enter' || e.key === ' ') &&
                !showChoiceModal &&
                filteredChoices.length === 0 &&
                !currentSlide?.choices) {
                e.preventDefault();
                advanceSlide();
            }
        };

        window.addEventListener('keydown', handleGlobalKeyPress);
        return () => window.removeEventListener('keydown', handleGlobalKeyPress);
    }, [filteredChoices.length, showChoiceModal, currentSlide, advanceSlide]);

    // 🔑 Auto-show choice modal when choices first become available
    // (but allow manual control after that)
    useEffect(() => {
        if (filteredChoices.length > 0 && !showChoiceModal) {
            // Only auto-show if this is a new set of choices
            setShowChoiceModal(true);
        } else if (filteredChoices.length === 0) {
            // Hide modal when no choices available
            setShowChoiceModal(false);
        }
    }, [filteredChoices.length]); // Removed showChoiceModal dependency to prevent loops


    // Handle choice selection
    const handleMakeChoice = (index: number) => {
        makeChoice(index);
        setShowChoiceModal(false);
    };

    // Handle manual modal close (from modal's close button/backdrop)
    const handleCloseModal = () => {
        setShowChoiceModal(false);
    };

    // Handle keyboard navigation for continue
    useEffect(() => {
        if (currentSlide && filteredChoices.length === 0 && !currentSlide.choices) {
            const handleKeyPress = (e: KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    advanceSlide();
                }
            };

            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }
    }, [currentSlide, filteredChoices.length, advanceSlide]);

    // Handle game completion
    if (currentPhase === 'complete') {
        return (
            <CompletionScreen
                story={story}
                choicesMade={choicesMade}
                endingUnlocked={endingUnlocked}
                debugInfo={debugInfo}
                onReset={reset}
                className={className}
            />
        );
    }

    // Loading state
    if (!currentSlide) {
        return <LoadingScreen className={className} />;
    }

    return (
        <div className={`font-serif text-white min-h-screen overflow-hidden ${className}`}>
            {/* Full-screen game world */}
            <GameWorldLayer currentSlide={currentSlide} story={story} />

            {/* UI Overlay */}
            <UIGridOverlay debug={showDebug}>
                {/* Top Left - Phase Indicator */}
                <UIElement zone="top-left" layer="navigation" className="p-4">
                    <PhaseIndicator
                        currentPhase={currentPhase}
                        route={debugInfo.route}
                        ending={debugInfo.ending}
                    />
                </UIElement>

                {/* Top Right - Navigation Controls */}
                <UIElement zone="top-right" layer="navigation" className="p-4">
                    <NavigationControls
                        onToggleDebug={() => setShowDebug(!showDebug)}
                    />
                </UIElement>

                {/* Center Right - Point Display */}
                <UIElement zone="center-right" layer="content" className="p-4">
                    <PointDisplay points={debugInfo.points} />
                </UIElement>

                {/* Bottom Center - Dialogue Box */}
                <UIElement zone="bottom-center" layer="content" className="p-4 w-full max-w-4xl">
                    <DialogueBox
                        speaker={currentSlide.speaker}
                        text={currentSlide.text}
                    />
                </UIElement>

                {/* Bottom Right - Continue Button (when no choices) */}
                {filteredChoices.length === 0 && !currentSlide.choices && (
                    <UIElement zone="bottom-right" layer="content" className="p-4">
                        <ContinueButton onContinue={advanceSlide} />
                    </UIElement>
                )}

                {/* Bottom Right - Choice Hint (when choices available but modal closed) */}
                {filteredChoices.length > 0 && !showChoiceModal && (
                    <UIElement zone="bottom-right" layer="content" className="p-4">
                        <div className="bg-blue-600/80 backdrop-blur-sm border border-blue-500 text-white px-4 py-2 rounded-lg text-sm animate-pulse">
                            Press ESC to open choices
                        </div>
                    </UIElement>
                )}

                {/* Debug Panel */}
                {showDebug && (
                    <UIElement zone="bottom-left" layer="overlay" className="p-4 max-w-md">
                        <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg">
                            <DebugPanel
                                debugInfo={debugInfo}
                                choicesMade={choicesMade}
                                onReset={reset}
                            />
                        </div>
                    </UIElement>
                )}
            </UIGridOverlay>

            {/* Choice Modal */}
            <ChoiceModal
                isOpen={showChoiceModal}
                choices={filteredChoices}
                currentPhase={currentPhase}
                onMakeChoice={handleMakeChoice}
                onClose={handleCloseModal}
            />
        </div>
    );
}