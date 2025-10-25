import { SpriteRenderer } from "./rendering/SpriteRenderer";
import { BackgroundRenderer } from "./rendering/BackgroundRenderer";
import type { Slide, GameStory } from "../types/vn";

interface GameWorldLayerProps {
    currentSlide: Slide;
    story: GameStory;
}

export function GameWorldLayer({ currentSlide, story }: GameWorldLayerProps) {
    return (
        <div className="fixed inset-0 bg-gradient-to-b from-gray-800 via-gray-900 to-black">
            {/* Enhanced Background System */}
            <div className="absolute inset-0 bg-gray-900">
                <BackgroundRenderer
                    background={currentSlide.background}
                />

                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            </div>

            {/* Character Sprite Area */}
            <div className="absolute inset-0">
                {currentSlide.sprites?.map((spriteConfig, index) => {
                    const character = story.characters?.[spriteConfig.characterId];

                    if (!character) {
                        console.warn(`Character "${spriteConfig.characterId}" not found in story`);
                        return null;
                    }

                    return (
                        <SpriteRenderer
                            key={`${spriteConfig.characterId}-${index}`}
                            sprite={character}
                            config={spriteConfig}
                        />
                    );
                })}
            </div>
        </div>
    );
}