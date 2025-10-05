interface PhaseIndicatorProps {
    currentPhase: string;
    route?: string;
    ending?: string;
}

export function PhaseIndicator({ currentPhase, route, ending }: PhaseIndicatorProps) {
    return (
        <div className="bg-black/60 backdrop-blur-sm border border-gray-600 rounded-full px-4 py-2 text-sm font-bold text-white">
            {currentPhase === 'prologue' && '📖 Prologue'}
            {currentPhase === 'route' && `🛤️ ${route}`}
            {currentPhase === 'ending' && `🎬 ${ending}`}
        </div>
    );
}