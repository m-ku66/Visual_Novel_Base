interface DebugPanelProps {
    debugInfo: any;
    choicesMade: number;
    onReset: () => void;
}

export function DebugPanel({ debugInfo, choicesMade, onReset }: DebugPanelProps) {
    return (
        <div className="p-4 text-sm text-gray-300 max-h-96 overflow-y-auto">
            <h4 className="font-bold text-white mb-3">🔧 Debug Info</h4>

            <div className="space-y-3">
                {/* Navigation Info */}
                <div>
                    <h5 className="font-semibold text-blue-400 mb-1">📍 Navigation:</h5>
                    <div className="text-xs space-y-1 ml-2">
                        <div>Phase: <span className="text-blue-300">{debugInfo.phase}</span></div>
                        <div>Scene: <span className="text-blue-300">{debugInfo.sceneIndex + 1} of {debugInfo.totalScenes}</span></div>
                        <div>Slide: <span className="text-blue-300">{debugInfo.slideIndex + 1}</span></div>
                        {debugInfo.route && <div>Route: <span className="text-green-300">{debugInfo.route}</span></div>}
                        {debugInfo.ending && <div>Ending: <span className="text-yellow-300">{debugInfo.ending}</span></div>}
                    </div>
                </div>

                {/* Point Details */}
                <div>
                    <h5 className="font-semibold text-green-400 mb-1">📊 Points:</h5>
                    <div className="text-xs ml-2">
                        <div className="mb-1">
                            <span className="text-blue-400">Universal:</span>
                            <div className="ml-2">
                                {Object.entries(debugInfo.points.universal).map(([type, value]) => (
                                    <div key={type}>{type}: {value as number}</div>
                                ))}
                            </div>
                        </div>
                        <div className="mb-1">
                            <span className="text-green-400">Route:</span>
                            <div className="ml-2">
                                {Object.entries(debugInfo.points.route).map(([type, value]) => (
                                    <div key={type}>{type}: {value as number}</div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <span className="text-purple-400">Prologue:</span>
                            <div className="ml-2">
                                {Object.entries(debugInfo.points.prologue).map(([type, value]) => (
                                    <div key={type}>{type}: {value as number}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="border-t border-gray-600 pt-3 flex gap-2">
                    <button
                        onClick={onReset}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded text-xs transition-colors"
                    >
                        Reset
                    </button>
                    <div className="text-xs text-gray-400 flex items-center">
                        Choices: {choicesMade}
                    </div>
                </div>
            </div>
        </div>
    );
}