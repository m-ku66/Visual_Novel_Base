import type { ReactNode } from "react";

interface GameHeaderProps {
    currentPhase: string;
    debugInfo: any;
}

export function GameHeader({ currentPhase, debugInfo }: GameHeaderProps) {
    return (
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
                            {Object.values(debugInfo.points.universal).reduce((a, b) => (a as number) + (b as number), 0) as ReactNode}
                        </span>
                    </div>
                )}
                {Object.entries(debugInfo.points.route).length > 0 && (
                    <div className="bg-green-600 px-2 py-1 rounded">
                        <span className="text-green-200">Route: </span>
                        <span className="text-white">
                            {Object.values(debugInfo.points.route).reduce((a, b) => (a as number) + (b as number), 0) as ReactNode}
                        </span>
                    </div>
                )}
                {Object.entries(debugInfo.points.prologue).length > 0 && (
                    <div className="bg-purple-600 px-2 py-1 rounded">
                        <span className="text-purple-200">Prologue: </span>
                        <span className="text-white">
                            {Object.values(debugInfo.points.prologue).reduce((a, b) => (a as number) + (b as number), 0) as ReactNode}
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}