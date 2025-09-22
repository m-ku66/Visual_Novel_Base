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
        getFilteredChoices,
        advanceSlide,
        makeChoice,
        reset,
        currentPhase,
        getDebugInfo,
        choicesMade,
        endingUnlocked
    } = useVNStore();

    // Load story on mount
    useEffect(() => {
        loadStory(story);
    }, [story, loadStory]);

    const currentSlide = getCurrentSlide();
    const filteredChoices = getFilteredChoices();
    const debugInfo = getDebugInfo();

    // Handle game completion
    if (currentPhase === 'complete') {
        return (
            <div className={`max-w-4xl mx-auto p-5 font-serif bg-gray-900 text-white min-h-screen ${className}`}>
                <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
                    <div className="text-center py-10">
                        <h2 className="text-4xl font-bold mb-5">🎉 Story Complete!</h2>
                        <p className="text-xl mb-4">Thank you for playing "{story.title}"!</p>
                        <p className="text-gray-300 mb-4">Choices made: {choicesMade}</p>

                        {/* Show unlocked endings */}
                        {endingUnlocked && endingUnlocked.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold mb-2">🏆 Endings Unlocked:</h3>
                                <div className="flex flex-wrap justify-center gap-2">
                                    {endingUnlocked.map((endingId) => (
                                        <span
                                            key={endingId}
                                            className="bg-yellow-600 text-yellow-100 px-3 py-1 rounded-full text-sm"
                                        >
                                            {endingId}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Final point summary */}
                        <div className="bg-gray-700 rounded-lg p-4 mb-6 text-left">
                            <h3 className="text-lg font-semibold mb-3 text-center">📊 Final Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <h4 className="font-bold text-blue-400 mb-2">Universal Points:</h4>
                                    {Object.entries(debugInfo.points.universal).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type}:</span>
                                            <span className="text-blue-300">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-400 mb-2">Route Points:</h4>
                                    {Object.entries(debugInfo.points.route).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type.replace('_', ' ')}:</span>
                                            <span className="text-green-300">{value}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Prologue Points:</h4>
                                    {Object.entries(debugInfo.points.prologue).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type.replace('_', ' ')}:</span>
                                            <span className="text-purple-300">{value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

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
                {/* Header with phase and point indicators */}
                <div className="flex justify-between items-center mb-6">
                    {/* Current Phase Indicator */}
                    <span className="inline-block bg-gray-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                        {currentPhase === 'prologue' && '📖 Prologue'}
                        {currentPhase === 'route' && `🛤️ ${debugInfo.route}`}
                        {currentPhase === 'ending' && `🎬 ${debugInfo.ending}`}
                    </span>

                    {/* Quick point display */}
                    <div className="flex gap-4 text-xs">
                        {Object.entries(debugInfo.points.universal).length > 0 && (
                            <div className="bg-blue-600 px-2 py-1 rounded">
                                <span className="text-blue-200">Universal: </span>
                                <span className="text-white">
                                    {Object.values(debugInfo.points.universal).reduce((a, b) => a + b, 0)}
                                </span>
                            </div>
                        )}
                        {Object.entries(debugInfo.points.route).length > 0 && (
                            <div className="bg-green-600 px-2 py-1 rounded">
                                <span className="text-green-200">Route: </span>
                                <span className="text-white">
                                    {Object.values(debugInfo.points.route).reduce((a, b) => a + b, 0)}
                                </span>
                            </div>
                        )}
                        {Object.entries(debugInfo.points.prologue).length > 0 && (
                            <div className="bg-purple-600 px-2 py-1 rounded">
                                <span className="text-purple-200">Prologue: </span>
                                <span className="text-white">
                                    {Object.values(debugInfo.points.prologue).reduce((a, b) => a + b, 0)}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="min-h-[350px] flex flex-col justify-between">
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
                        {filteredChoices.length > 0 ? (
                            // Show choices
                            <div className="flex flex-col gap-3">
                                {filteredChoices.map((choice, index) => {
                                    // Calculate point gains for display
                                    const pointGains: any[] = [];
                                    if (choice.universalPoints) {
                                        Object.entries(choice.universalPoints).forEach(([type, value]) => {
                                            pointGains.push(`+${value} ${type}`);
                                        });
                                    }
                                    if (choice.routePoints && currentPhase === 'route') {
                                        Object.entries(choice.routePoints).forEach(([type, value]) => {
                                            pointGains.push(`+${value} ${type.replace('_', ' ')}`);
                                        });
                                    }
                                    if (choice.prologuePoints && currentPhase === 'prologue') {
                                        Object.entries(choice.prologuePoints).forEach(([type, value]) => {
                                            pointGains.push(`+${value} ${type.replace('_', ' ')}`);
                                        });
                                    }

                                    return (
                                        <button
                                            key={index}
                                            onClick={() => makeChoice(index)}
                                            className="bg-gray-600 hover:bg-gray-500 text-white text-left p-4 rounded-lg transition-colors group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <span className="flex-grow">{choice.text}</span>
                                                {pointGains.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 ml-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        {pointGains.map((gain, gainIndex) => (
                                                            <span
                                                                key={gainIndex}
                                                                className="text-xs bg-gray-700 text-green-300 px-2 py-1 rounded"
                                                            >
                                                                {gain}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            {choice.description && (
                                                <div className="text-sm text-gray-300 mt-2 italic">
                                                    {choice.description}
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        ) : currentSlide.choices ? (
                            // Show message if no choices are available due to requirements
                            <div className="text-center text-gray-400">
                                <p className="mb-4">No available choices at your current progression level.</p>
                                <button
                                    onClick={advanceSlide}
                                    className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                                >
                                    Continue →
                                </button>
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

                {/* Enhanced Debug Info */}
                <details className="mt-8 text-sm text-gray-400">
                    <summary className="cursor-pointer hover:text-white font-medium">
                        🔧 Debug Info & Stats
                    </summary>
                    <div className="mt-3 bg-gray-900 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            {/* Navigation Info */}
                            <div>
                                <h4 className="font-bold text-white mb-2">📍 Navigation:</h4>
                                <div className="text-xs space-y-1">
                                    <div>Phase: <span className="text-blue-300">{debugInfo.phase}</span></div>
                                    <div>Scene: <span className="text-blue-300">{debugInfo.sceneIndex + 1} of {debugInfo.totalScenes}</span></div>
                                    <div>Slide: <span className="text-blue-300">{debugInfo.slideIndex + 1}</span></div>
                                    {debugInfo.route && <div>Route: <span className="text-green-300">{debugInfo.route}</span></div>}
                                    {debugInfo.ending && <div>Ending: <span className="text-yellow-300">{debugInfo.ending}</span></div>}
                                </div>
                            </div>

                            {/* Point Details */}
                            <div>
                                <h4 className="font-bold text-white mb-2">📊 Detailed Points:</h4>
                                <div className="text-xs">
                                    <div className="mb-2">
                                        <span className="text-blue-400 font-semibold">Universal:</span>
                                        <div className="ml-2">
                                            {Object.entries(debugInfo.points.universal).map(([type, value]) => (
                                                <div key={type}>{type}: {value}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span className="text-green-400 font-semibold">Route:</span>
                                        <div className="ml-2">
                                            {Object.entries(debugInfo.points.route).map(([type, value]) => (
                                                <div key={type}>{type}: {value}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-purple-400 font-semibold">Prologue:</span>
                                        <div className="ml-2">
                                            {Object.entries(debugInfo.points.prologue).map(([type, value]) => (
                                                <div key={type}>{type}: {value}</div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="border-t border-gray-700 pt-3 flex gap-3">
                            <button
                                onClick={reset}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors text-xs"
                            >
                                Reset Game
                            </button>
                            <div className="text-xs text-gray-500 flex items-center">
                                Choices made: {choicesMade}
                            </div>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    );
}