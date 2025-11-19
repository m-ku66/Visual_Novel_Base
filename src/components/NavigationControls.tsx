interface NavigationControlsProps {
    onBack?: () => void;
    onSettings?: () => void;
    onToggleDebug?: () => void;
    isMuted?: boolean;
    onToggleMute?: () => void;
}

export function NavigationControls({
    onBack,
    onSettings,
    onToggleDebug,
    isMuted,
    onToggleMute
}: NavigationControlsProps) {
    return (
        <div className="flex gap-2">
            {onBack && (
                <button
                    onClick={onBack}
                    className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
                >
                    ← Back
                </button>
            )}
            {/* Mute Button - Always visible and prominent */}
            {onToggleMute && (
                <button
                    onClick={onToggleMute}
                    className={`
                        backdrop-blur-sm border text-white px-3 py-2 rounded-lg text-sm transition-all duration-200
                        ${isMuted
                            ? 'bg-red-600/70 hover:bg-red-600/90 border-red-500'
                            : 'bg-black/60 hover:bg-black/80 border-gray-600'
                        }
                    `}
                    title={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                    {isMuted ? '🔇' : '🔊'}
                </button>
            )}
            {onSettings && (
                <button
                    onClick={onSettings}
                    className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
                >
                    ⚙️
                </button>
            )}
            {onToggleDebug && (
                <button
                    onClick={onToggleDebug}
                    className="bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-gray-600 text-white px-3 py-2 rounded-lg text-sm transition-all duration-200"
                >
                    🔧
                </button>
            )}
        </div>
    );
}