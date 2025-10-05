interface InteractionAreaProps {
    filteredChoices: any[];
    currentSlide: any;
    currentPhase: string;
    onMakeChoice: (index: number) => void;
    onAdvanceSlide: () => void;
}

export function InteractionArea({
    filteredChoices,
    currentSlide,
    currentPhase,
    onMakeChoice,
    onAdvanceSlide
}: InteractionAreaProps) {
    return (
        <div className="mt-6">
            {filteredChoices.length > 0 ? (
                // Show choices
                <div className="flex flex-col gap-3">
                    {filteredChoices.map((choice, index) => {
                        // Calculate point gains for display
                        const pointGains: string[] = [];
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
                                onClick={() => onMakeChoice(index)}
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
                        onClick={onAdvanceSlide}
                        className="bg-gray-500 hover:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Continue →
                    </button>
                </div>
            ) : (
                // Show continue button
                <div className="text-center">
                    <button
                        onClick={onAdvanceSlide}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                    >
                        Continue →
                    </button>
                </div>
            )}
        </div>
    );
}