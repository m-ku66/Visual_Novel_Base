import { useEffect } from 'react';
import { useVNStore } from '../stores/vnStore';
import type { GameStory } from '../types/vn';

interface VisualNovelProps {
    story: GameStory;
    className?: string;
}

export function VisualNovel({ story, className = '' }: VisualNovelProps) {
    const {
        loadStory,
        getCurrentSlide,
        advanceSlide,
        makeChoice,
        reset,
        currentPhase,
        getDebugInfo,
        choicesMade
    } = useVNStore();

    // Load story on mount
    useEffect(() => {
        loadStory(story);
    }, [story, loadStory]);

    const currentSlide = getCurrentSlide();
    const debugInfo = getDebugInfo();

    // Handle game completion
    if (currentPhase === 'complete') {
        return (
            <div className={`max-w-4xl mx-auto p-5 font-serif bg-gray-900 text-white min-h-screen ${className}`}>
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="text-center py-10">
                        <h2 className="text-4xl font-bold mb-5">🎉 Story Complete!</h2>
                        <p className="text-xl mb-4">Thank you for playing!</p>
                        <p className="text-gray-300 mb-8">Choices made: {choicesMade}</p>
                        <button
                            onClick={reset}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state
    if (!currentSlide) {
        return (
            <div className={`max-w-4xl mx-auto p-5 font-serif bg-gray-900 text-white min-h-screen ${className}`}>
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="text-center py-10">
                        <p className="text-xl">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`max-w-4xl mx-auto p-5 font-serif bg-gray-900 text-white min-h-screen ${className}`}>
            <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                {/* Current Phase Indicator */}
                <div className="text-center mb-6">
                    <span className="inline-block bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {currentPhase === 'prologue' && '📖 Prologue'}
                        {currentPhase === 'route' && `🛤️ ${debugInfo.route}`}
                        {currentPhase === 'ending' && `🎬 ${debugInfo.ending}`}
                    </span>
                </div>

                {/* Main Content Area */}
                <div className="min-h-[300px] flex flex-col justify-between">
                    {/* Speaker name */}
                    {currentSlide.speaker && (
                        <div className="font-bold text-yellow-400 mb-3 text-lg">
                            {currentSlide.speaker}
                        </div>
                    )}

                    {/* Main text */}
                    <div className="text-lg leading-relaxed mb-8 flex-grow">
                        {currentSlide.text}
                    </div>

                    {/* Choices or Continue */}
                    <div className="mt-auto">
                        {currentSlide.choices ? (
                            // Show choices
                            <div className="flex flex-col gap-3">
                                {currentSlide.choices.map((choice, index) => (
                                    <button
                                        key={index}
                                        onClick={() => makeChoice(index)}
                                        className="bg-gray-600 hover:bg-gray-500 text-white text-left p-4 rounded-lg transition-colors"
                                    >
                                        {choice.text}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            // Show continue button
                            <div className="text-center">
                                <button
                                    onClick={advanceSlide}
                                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Continue →
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Debug Info (optional) */}
                <details className="mt-8 text-sm text-gray-400">
                    <summary className="cursor-pointer hover:text-white font-medium">
                        Debug Info
                    </summary>
                    <div className="mt-3 bg-gray-900 rounded-lg p-4">
                        <pre className="text-xs overflow-x-auto">
                            {JSON.stringify(debugInfo, null, 2)}
                        </pre>
                        <button
                            onClick={reset}
                            className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                        >
                            Reset Game
                        </button>
                    </div>
                </details>
            </div>
        </div>
    );
}