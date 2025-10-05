interface NavigationControlsProps {
    onBack?: () => void;
    onSettings?: () => void;
    onToggleDebug?: () => void;
}

export function NavigationControls({ onBack, onSettings, onToggleDebug }: NavigationControlsProps) {
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