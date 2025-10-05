import { DialogueBox } from "./DialogueBox";

interface GameStageProps {
    currentSlide: any;
}

export function GameStage({ currentSlide }: GameStageProps) {
    return (
        <div className="min-h-screen flex flex-col justify-between relative">
            {/* Future: Sprite Display Area */}
            <div className="h-[100vh] mb-6 relative bg-gray-900 rounded-lg overflow-hidden">
                {/* Placeholder for character sprites */}
                <div className="absolute inset-0 flex items-end justify-center">
                    <div className="text-gray-600 text-sm">
                        Character sprites will appear here
                    </div>
                </div>
            </div>

            {/* Dialogue Box */}
            <DialogueBox
                speaker={currentSlide.speaker}
                text={currentSlide.text}
            />
        </div>
    );
}
