interface CompletionScreenProps {
    story: any;
    choicesMade: number;
    endingUnlocked: string[] | undefined;
    debugInfo: any;
    onReset: () => void;
    className?: string;
}

export function CompletionScreen({
    story,
    choicesMade,
    endingUnlocked,
    debugInfo,
    onReset,
    className = ''
}: CompletionScreenProps) {
    return (
        <div className={`fixed inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white font-serif ${className}`}>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-8 shadow-2xl max-w-2xl w-full mx-4">
                    <div className="text-center">
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
                        <div className="bg-gray-900/60 rounded-lg p-4 mb-6 text-left">
                            <h3 className="text-lg font-semibold mb-3 text-center">📊 Final Stats</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                <div>
                                    <h4 className="font-bold text-blue-400 mb-2">Universal Points:</h4>
                                    {Object.entries(debugInfo.points.universal).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type}:</span>
                                            <span className="text-blue-300">{value as number}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-bold text-green-400 mb-2">Route Points:</h4>
                                    {Object.entries(debugInfo.points.route).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type.replace('_', ' ')}:</span>
                                            <span className="text-green-300">{value as number}</span>
                                        </div>
                                    ))}
                                </div>
                                <div>
                                    <h4 className="font-bold text-purple-400 mb-2">Prologue Points:</h4>
                                    {Object.entries(debugInfo.points.prologue).map(([type, value]) => (
                                        <div key={type} className="flex justify-between">
                                            <span className="capitalize">{type.replace('_', ' ')}:</span>
                                            <span className="text-purple-300">{value as number}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={onReset}
                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                        >
                            Play Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}