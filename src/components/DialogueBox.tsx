interface DialogueBoxProps {
    speaker?: string;
    text?: string;
}

export function DialogueBox({ speaker, text }: DialogueBoxProps) {
    return (
        <div className="bg-black/80 backdrop-blur-sm border border-gray-600 rounded-lg p-6 max-w-4xl mx-auto">
            {/* Speaker name */}
            {speaker && (
                <div className="font-bold text-yellow-400 mb-3 text-lg">
                    {speaker}
                </div>
            )}

            {/* Main text */}
            <div className="text-lg leading-relaxed text-white">
                {text}
            </div>
        </div>
    );
}