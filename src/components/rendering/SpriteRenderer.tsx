import { motion } from "framer-motion";
import type { CharacterSprite, SpritePart, Live2DSprite } from "../../types/vn";
import { isSimpleSprite, isLive2DSprite } from "../../types/vn";

interface SpriteDisplayConfig {
    characterId: string;
    expression?: string;
    position?: "left" | "center" | "right" | "custom";
    customPosition?: { x: number; y: number };
    transition?: "fadeIn" | "slideIn" | "none";
    scale?: number;
    flip?: boolean;
    layer?: number;
    opacity?: number;
    partOverrides?: Record<string, string>;
}

interface SpriteRendererProps {
    sprite: CharacterSprite;
    config: SpriteDisplayConfig;
}

// Position helpers
const POSITION_MAP = {
    left: { x: "20%", y: "0%" },
    center: { x: "50%", y: "0%" },
    right: { x: "80%", y: "0%" }
} as const;

const getPositionStyle = (config: SpriteDisplayConfig) => {
    if (config.position === "custom" && config.customPosition) {
        return {
            left: `${config.customPosition.x}%`,
            bottom: `${config.customPosition.y}%`
        };
    }

    const pos = (config.position || "center") as keyof typeof POSITION_MAP;
    return {
        left: POSITION_MAP[pos].x,
        bottom: POSITION_MAP[pos].y,
        transform: "translateX(-50%)" // Center on the x position
    };
};

// Transition variants
const getTransitionVariants = (transition?: string) => {
    switch (transition) {
        case "fadeIn":
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 }
            };
        case "slideIn":
            return {
                initial: { opacity: 0, x: -100 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: 100 }
            };
        case "none":
        default:
            return {
                initial: {},
                animate: {},
                exit: {}
            };
    }
};

// Simple sprite renderer
function SimpleSpriteRenderer({ sprite, config }: { sprite: Extract<CharacterSprite, { type: "simple" }>, config: SpriteDisplayConfig }) {
    const expression = config.expression || sprite.defaultExpression || "base";
    const imageSrc = sprite.expressions?.[expression] || sprite.baseImage;
    const scale = config.scale || sprite.scale || 1.0;
    const opacity = config.opacity ?? 1.0;
    const flip = config.flip || false;

    const variants = getTransitionVariants(config.transition);

    return (
        <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.3 }}
            style={{
                ...getPositionStyle(config),
                transform: `translateX(-50%) scaleX(${flip ? -1 : 1})`,
                opacity,
                zIndex: config.layer || 10,
            }}
            className="absolute"
        >
            <motion.img
                src={imageSrc}
                alt={sprite.name}
                style={{
                    width: "auto",
                    height: `${scale * 500}px`, // Base height, adjustable
                    objectFit: "contain",
                }}
                className="pointer-events-none select-none"
            />
        </motion.div>
    );
}

// Live2D sprite part renderer
function Live2DPartRenderer({
    part,
    variant
}: {
    part: SpritePart;
    variant?: string;
}) {
    const imageSrc = variant && part.variants?.[variant]
        ? part.variants[variant]
        : part.image;

    // Animation configuration
    const hasAnimation = part.animation !== undefined;
    const animationConfig = part.animation || {};

    return (
        <motion.div
            animate={hasAnimation ? {
                x: animationConfig.x ? [animationConfig.x.from, animationConfig.x.to] : undefined,
                y: animationConfig.y ? [animationConfig.y.from, animationConfig.y.to] : undefined,
            } : undefined}
            transition={hasAnimation ? {
                duration: animationConfig.duration || 2,
                delay: animationConfig.delay || 0,
                repeat: animationConfig.repeat ? Infinity : 0,
                repeatType: "reverse",
                ease: "easeInOut"
            } : undefined}
            style={{
                zIndex: part.zIndex,
            }}
            className="absolute inset-0"
        >
            <img
                src={imageSrc}
                alt={part.id}
                style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                }}
                className="pointer-events-none select-none"
            />
        </motion.div>
    );
}

// Live2D sprite renderer
function Live2DSpriteRenderer({ sprite, config }: { sprite: Live2DSprite, config: SpriteDisplayConfig }) {
    const scale = config.scale || sprite.scale || 1.0;
    const opacity = config.opacity ?? 1.0;
    const flip = config.flip || false;

    // Determine which variants to use for each part
    const expressionName = config.expression || sprite.defaultExpression;
    const expression = expressionName ? sprite.expressions?.[expressionName] : undefined;

    // Merge expression states with part overrides
    const partStates = {
        ...expression?.partStates,
        ...config.partOverrides
    };

    const variants = getTransitionVariants(config.transition);

    return (
        <motion.div
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: 0.3 }}
            style={{
                ...getPositionStyle(config),
                transform: `translateX(-50%) scaleX(${flip ? -1 : 1})`,
                opacity,
                zIndex: config.layer || 10,
            }}
            className="absolute"
        >
            <motion.div
                style={{
                    width: `${scale * 400}px`,
                    height: `${scale * 400}px`,
                    position: "relative",
                }}
            >
                {/* Render all parts in order */}
                {sprite.parts
                    .sort((a: SpritePart, b: SpritePart) => a.zIndex - b.zIndex)
                    .map((part: SpritePart) => (
                        <Live2DPartRenderer
                            key={part.id}
                            part={part}
                            variant={partStates[part.id]}
                        />
                    ))}
            </motion.div>
        </motion.div>
    );
}

// Main sprite renderer (handles both types)
export function SpriteRenderer({ sprite, config }: SpriteRendererProps) {
    if (isSimpleSprite(sprite)) {
        return <SimpleSpriteRenderer sprite={sprite} config={config} />;
    }

    if (isLive2DSprite(sprite)) {
        return <Live2DSpriteRenderer sprite={sprite} config={config} />;
    }

    return null;
}

// =============================================
// EXAMPLE USAGE
// =============================================

// Example 1: Simple Sprite Character
// const aliceSimple: CharacterSprite = {
//     type: "simple",
//     id: "alice",
//     name: "Alice",
//     baseImage: "/sprites/alice-neutral.png",
//     expressions: {
//         happy: "/sprites/alice-happy.png",
//         sad: "/sprites/alice-sad.png",
//         surprised: "/sprites/alice-surprised.png"
//     },
//     defaultExpression: "happy",
//     scale: 1.0
// };

// Example 2: Live2D Layered Character
// const protagonistLive2D: Live2DSprite = {
//     type: "live2d",
//     id: "protagonist",
//     name: "Hero",
//     scale: 1.0,
//     defaultExpression: "neutral",
//     parts: [
//         // Background layer - hair back
//         {
//             id: "hair_back",
//             image: "/character/back_hair.png",
//             zIndex: 10
//         },
//         // Body
//         {
//             id: "body",
//             image: "/character/body.png",
//             zIndex: 11
//         },
//         // Neck
//         {
//             id: "neck",
//             image: "/character/neck.png",
//             zIndex: 12
//         },
//         // Head with breathing animation
//         {
//             id: "head",
//             image: "/character/head.png",
//             zIndex: 14,
//             animation: {
//                 y: { from: 0, to: -1 },
//                 duration: 2,
//                 repeat: true
//             }
//         },
//         // Eyes with variants
//         {
//             id: "eyes",
//             image: "/character/eyes_open.png",
//             zIndex: 15,
//             variants: {
//                 open: "/character/eyes_open.png",
//                 closed: "/character/eyes_closed.png",
//                 happy: "/character/eyes_happy.png"
//             }
//         },
//         // Mouth with variants
//         {
//             id: "mouth",
//             image: "/character/mouth_1.png",
//             zIndex: 18,
//             variants: {
//                 neutral: "/character/mouth_1.png",
//                 surprised: "/character/mouth_2.png",
//                 sad: "/character/mouth_3.png"
//             }
//         },
//         // Eyebrows
//         {
//             id: "brows",
//             image: "/character/brow_neutral.png",
//             zIndex: 18,
//             variants: {
//                 neutral: "/character/brow_neutral.png",
//                 raised: "/character/brow_raised.png",
//                 furrowed: "/character/brow_furrowed.png"
//             }
//         },
//         // Front hair with animation
//         {
//             id: "bangs",
//             image: "/character/bangs.png",
//             zIndex: 17,
//             animation: {
//                 y: { from: 0, to: -1 },
//                 duration: 2,
//                 delay: 0.2,
//                 repeat: true
//             }
//         }
//     ],
//     expressions: {
//         neutral: {
//             name: "neutral",
//             partStates: {
//                 eyes: "open",
//                 mouth: "neutral",
//                 brows: "neutral"
//             }
//         },
//         happy: {
//             name: "happy",
//             partStates: {
//                 eyes: "happy",
//                 mouth: "neutral",
//                 brows: "raised"
//             }
//         },
//         surprised: {
//             name: "surprised",
//             partStates: {
//                 eyes: "open",
//                 mouth: "surprised",
//                 brows: "raised"
//             }
//         },
//         sad: {
//             name: "sad",
//             partStates: {
//                 eyes: "open",
//                 mouth: "sad",
//                 brows: "furrowed"
//             }
//         }
//     }
// };

// Example 3: Using in GameStory
// const exampleStory = {
//     title: "My Visual Novel",
//     characters: {
//         alice: aliceSimple,
//         protagonist: protagonistLive2D
//     },
//     prologue: [
//         {
//             id: "intro",
//             title: "Opening",
//             slides: [
//                 {
//                     id: "slide1",
//                     speaker: "Alice",
//                     text: "Hello there!",
//                     sprites: [
//                         {
//                             characterId: "alice",
//                             expression: "happy",
//                             position: "left",
//                             transition: "fadeIn"
//                         }
//                     ]
//                 },
//                 {
//                     id: "slide2",
//                     speaker: "Hero",
//                     text: "Nice to meet you!",
//                     sprites: [
//                         {
//                             characterId: "alice",
//                             expression: "happy",
//                             position: "left"
//                         },
//                         {
//                             characterId: "protagonist",
//                             expression: "happy",
//                             position: "right",
//                             transition: "slideIn"
//                         }
//                     ]
//                 },
//                 {
//                     id: "slide3",
//                     speaker: "Hero",
//                     text: "Wait, something's wrong...",
//                     sprites: [
//                         {
//                             characterId: "alice",
//                             expression: "happy",
//                             position: "left"
//                         },
//                         {
//                             characterId: "protagonist",
//                             expression: "surprised", // Change expression
//                             position: "right",
//                             // Override just the mouth for this slide
//                             partOverrides: {
//                                 mouth: "surprised",
//                                 brows: "raised"
//                             }
//                         }
//                     ]
//                 }
//             ]
//         }
//     ],
//     routes: {}
// };

// Example 4: Rendering sprites in GameWorldLayer
/*
import { SpriteRenderer } from './SpriteRenderer';

function GameWorldLayer({ currentSlide, story }) {
  return (
    <div className="fixed inset-0">
      {currentSlide.sprites?.map((spriteConfig, index) => {
        const character = story.characters?.[spriteConfig.characterId];
        if (!character) return null;
        
        return (
          <SpriteRenderer
            key={`${spriteConfig.characterId}-${index}`}
            sprite={character}
            config={spriteConfig}
          />
        );
      })}
    </div>
  );
}
*/