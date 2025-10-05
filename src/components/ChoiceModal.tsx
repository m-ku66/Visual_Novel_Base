import { useState, useEffect } from 'react';

interface ChoiceModalProps {
    isOpen: boolean;
    choices: any[];
    currentPhase: string;
    onMakeChoice: (index: number) => void;
    onClose: () => void;
}

export function ChoiceModal({ isOpen, choices, currentPhase, onMakeChoice, onClose }: ChoiceModalProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    // Reset selection when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedIndex(0);
        }
    }, [isOpen]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyPress = (e: KeyboardEvent) => {
            switch (e.key) {
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => prev > 0 ? prev - 1 : choices.length - 1);
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => prev < choices.length - 1 ? prev + 1 : 0);
                    break;
                case 'Enter':
                case ' ':
                    e.preventDefault();
                    onMakeChoice(selectedIndex);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isOpen, choices.length, selectedIndex, onMakeChoice, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-gray-800 border border-gray-600 rounded-lg shadow-2xl max-w-2xl w-full mx-4 max-h-[70vh] overflow-y-auto">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Choose your action:</h3>
                    <div className="space-y-3">
                        {choices.map((choice, index) => {
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
                                    onMouseEnter={() => setSelectedIndex(index)}
                                    className={`
                                        w-full text-left p-4 rounded-lg transition-all duration-200 group
                                        ${selectedIndex === index
                                            ? 'bg-blue-600 text-white border-blue-400'
                                            : 'bg-gray-700 hover:bg-gray-600 text-gray-100 border-gray-600'
                                        }
                                        border-2
                                    `}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="flex-grow text-lg">{choice.text}</span>
                                        {pointGains.length > 0 && (
                                            <div className="flex flex-wrap gap-1 ml-3">
                                                {pointGains.map((gain, gainIndex) => (
                                                    <span
                                                        key={gainIndex}
                                                        className="text-xs bg-black/30 text-green-300 px-2 py-1 rounded"
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

                    <div className="mt-6 text-sm text-gray-400 text-center">
                        Use ↑↓ arrow keys to navigate, Enter to select, Esc to close
                    </div>
                </div>
            </div>
        </div>
    );
}