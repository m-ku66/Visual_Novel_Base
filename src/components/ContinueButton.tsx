interface ContinueButtonProps {
    onContinue: () => void;
}

export function ContinueButton({ onContinue }: ContinueButtonProps) {
    return (
        <button
            onClick={onContinue}
            className="bg-green-600/80 hover:bg-green-500 backdrop-blur-sm border border-green-500 hover:border-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg"
        >
            Continue →
        </button>
    );
}