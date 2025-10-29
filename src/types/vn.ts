/**
 * Visual Novel Core Types - Hybrid Point System, Multiple Routes, Live2D Support
 * Structure: Prologue → Routes → Endings
 * Points: Universal (carry across routes) + Route-specific + Prologue
 */

// Point requirements (unchanged)
export type PointRequirements = {
  universal?: Record<string, number>;
  route?: Record<string, number>;
  prologue?: Record<string, number>;
};

export type Choice = {
  text: string;
  routeId?: string;
  universalPoints?: Record<string, number>;
  routePoints?: Record<string, number>;
  prologuePoints?: Record<string, number>;
  requires?: PointRequirements;
  description?: string;
};

// --- SPRITE SYSTEM ---

// Simple sprite (single image per expression)
export type SimpleSprite = {
  type: "simple";
  id: string;
  name: string;
  baseImage: string;
  expressions?: Record<string, string>; // "happy" -> "/sprites/alice-happy.png"
  defaultExpression?: string;
  scale?: number;
};

// Live2D layered sprite part
export type SpritePart = {
  id: string; // "mouth", "eyes", "hair_front"
  image: string; // Path to the image
  zIndex: number; // Layer order
  variants?: Record<string, string>; // "happy" -> "/char/mouth_happy.png"
  // Optional animation offsets
  animation?: {
    x?: { from: number; to: number }; // Horizontal movement
    y?: { from: number; to: number }; // Vertical movement
    duration?: number; // Animation duration in seconds
    delay?: number; // Animation delay
    repeat?: boolean; // Loop animation
  };
};

// Live2D expression (affects multiple parts)
export type Live2DExpression = {
  name: string; // "happy", "surprised", "sad"
  partStates: Record<string, string>; // partId -> variantId
  // Example: { mouth: "happy", eyes: "closed", brows: "raised" }
};

// Live2D layered sprite
export type Live2DSprite = {
  type: "live2d";
  id: string;
  name: string;
  parts: SpritePart[]; // All the layers that make up this character
  expressions?: Record<string, Live2DExpression>; // Named expressions
  defaultExpression?: string;
  scale?: number;
};

// Union type for flexibility
export type CharacterSprite = SimpleSprite | Live2DSprite;

// Helper type guards
// Export type guards
export function isSimpleSprite(
  sprite: CharacterSprite
): sprite is SimpleSprite {
  return sprite.type === "simple";
}

export function isLive2DSprite(
  sprite: CharacterSprite
): sprite is Live2DSprite {
  return sprite.type === "live2d";
}

// --- BACKGROUND SYSTEM ---

export type BackgroundEffect = {
  // Color grading effects (existing)
  brightness?: number; // 0.0 to 2.0 (default: 1.0)
  contrast?: number; // 0.0 to 2.0 (default: 1.0)
  saturation?: number; // 0.0 to 2.0 (default: 1.0)
  hue?: number; // -180 to 180 degrees (default: 0)

  // Simple overlay effects (existing)
  overlay?: {
    color: string; // CSS color: "#ff0000", "rgba(255,0,0,0.3)"
    blendMode?: "multiply" | "overlay" | "screen" | "soft-light";
  };

  // Transition when changing backgrounds (existing)
  transition?: {
    duration?: number; // seconds (default: 0.5)
    easing?: "ease" | "ease-in" | "ease-out" | "ease-in-out";
  };

  // 🆕 NEW: Ken Burns zoom animation
  zoom?: {
    enabled: boolean; // Enable zoom animation
    startScale?: number; // Starting zoom (default: 1.0)
    endScale?: number; // Maximum zoom (default: 1.1, max: 1.2)
    duration?: number; // Animation duration in seconds (default: 8)
    direction?: "in" | "out" | "in-out"; // Zoom direction (default: "in-out")
    easing?: "linear" | "ease-in-out" | "ease-in" | "ease-out";
    delay?: number; // Delay before starting (default: 0)
    loop?: boolean; // Loop the animation (default: true)
  };
};

// Helper function to validate zoom constraints
export function validateZoomScale(scale: number): number {
  // Ensure zoom doesn't go below 1.0 or above 1.2 for safety
  return Math.max(1.0, Math.min(1.2, scale));
}

// Helper to create safe zoom configs
export function createZoomConfig(config: {
  startScale?: number;
  endScale?: number;
  duration?: number;
  direction?: "in" | "out" | "in-out";
}): Required<NonNullable<BackgroundEffect["zoom"]>> {
  return {
    enabled: true,
    startScale: validateZoomScale(config.startScale ?? 1.0),
    endScale: validateZoomScale(config.endScale ?? 1.1),
    duration: config.duration ?? 8,
    direction: config.direction ?? "in-out",
    easing: "ease-in-out",
    delay: 0,
    loop: true,
  };
}

export type BackgroundConfig = {
  image: string; // Path to background image
  effects?: BackgroundEffect; // Optional effects to apply
  alt?: string; // Alt text for accessibility
};

// Union type for backward compatibility
export type Background = string | BackgroundConfig;

// Type guard helpers
export function isBackgroundConfig(bg: Background): bg is BackgroundConfig {
  return typeof bg === "object" && bg !== null && "image" in bg;
}

export function isBackgroundString(bg: Background): bg is string {
  return typeof bg === "string";
}

// Helper to normalize background to config format
export function normalizeBackground(bg: Background): BackgroundConfig {
  if (isBackgroundString(bg)) {
    return { image: bg };
  }
  return bg;
}

// Example usage:
/*
// Simple string (backward compatible)
const slide1: Slide = {
  id: "scene1",
  text: "A normal day...",
  background: "/backgrounds/park.jpg"
};

// Enhanced background with effects
const slide2: Slide = {
  id: "scene2", 
  text: "The mood darkens...",
  background: {
    image: "/backgrounds/park.jpg",
    effects: {
      brightness: 0.6,
      saturation: 0.8,
      overlay: {
        color: "rgba(0, 0, 100, 0.3)",
        blendMode: "multiply"
      },
      transition: {
        duration: 1.0,
        easing: "ease-in-out"
      }
    }
  }
};
*/

/**
 * // USAGE EXAMPLES - Ken Burns Zoom Effects

// Basic Ken Burns zoom (zoom in slowly then back out)
const dramaticSlide = {
  id: "dramatic_moment",
  speaker: "Alice",
  text: "This forest holds ancient secrets...",
  background: {
    image: "https://images.unsplash.com/your-forest-image",
    effects: {
      brightness: 0.8,
      saturation: 1.1,
      zoom: {
        enabled: true,
        startScale: 1.0,      // Start at normal size
        endScale: 1.15,       // Zoom to 115%
        duration: 10,         // 10 second cycle
        direction: "in-out",  // Zoom in, then back out
        easing: "ease-in-out"
      }
    }
  }
};

// Slow zoom in for tension
const tensionSlide = {
  id: "building_tension", 
  speaker: "Narrator",
  text: "Something was watching from the shadows...",
  background: {
    image: "https://images.unsplash.com/dark-forest",
    effects: {
      brightness: 0.6,
      contrast: 1.2,
      overlay: {
        color: "rgba(0, 0, 0, 0.3)",
        blendMode: "multiply"
      },
      zoom: {
        enabled: true,
        startScale: 1.0,
        endScale: 1.1,
        duration: 15,        // Very slow 15 second zoom
        direction: "in",     // Only zoom in, don't zoom back
        easing: "ease-in",
        loop: false          // Don't loop, just zoom once
      }
    }
  }
};

// Quick zoom for action
const actionSlide = {
  id: "action_scene",
  speaker: "Alice", 
  text: "Look out!",
  background: {
    image: "https://images.unsplash.com/action-scene",
    effects: {
      brightness: 1.1,
      saturation: 1.3,
      zoom: {
        enabled: true,
        startScale: 1.05,    // Start slightly zoomed
        endScale: 1.15,      // Quick zoom in
        duration: 3,         // Fast 3 second cycle
        direction: "in-out",
        easing: "ease-out"
      }
    }
  }
};

// Using the helper function for safety
const safeSlide = {
  id: "safe_example",
  text: "Helper function ensures safe zoom levels",
  background: {
    image: "/backgrounds/scene.jpg",
    effects: {
      // This helper prevents zoom levels that are too extreme
      zoom: createZoomConfig({
        startScale: 0.8,     // Too low - will be clamped to 1.0
        endScale: 1.5,       // Too high - will be clamped to 1.2
        duration: 6,
        direction: "in-out"
      })
    }
  }
};

export const zoomExamples = [
  dramaticSlide, 
  tensionSlide, 
  actionSlide, 
  safeSlide
];
 */

// --- SLIDE TYPES ---

export type Slide = {
  id: string;
  speaker?: string;
  text?: string;
  choices?: Choice[];
  requires?: PointRequirements;
  background?: Background;
  mood?: "happy" | "sad" | "tense" | "romantic" | "mysterious";

  sprites?: {
    characterId: string; // References sprite in GameStory.characters
    expression?: string; // Expression name
    position?: "left" | "center" | "right" | "custom";
    customPosition?: { x: number; y: number };
    transition?: "fadeIn" | "slideIn" | "none";
    scale?: number;
    flip?: boolean;
    layer?: number;
    opacity?: number;

    // Live2D specific overrides
    partOverrides?: Record<string, string>; // Override specific parts
    // Example: { mouth: "smile", eyes: "wink" } overrides just those parts
  }[];
};

export type Scene = {
  id: string;
  title: string;
  characters?: string[];
  slides: Slide[];
  requires?: PointRequirements;
};

export type RouteEnding = {
  id: string;
  name: string;
  description?: string;
  scenes: Scene[];
  requires?: PointRequirements;
  priority?: number;
  isSecretEnding?: boolean;
  achievementName?: string;
};

export type Route = {
  id: string;
  name: string;
  description?: string;
  scenes: Scene[];
  endings: RouteEnding[];
  requires?: PointRequirements;
  difficulty?: "easy" | "medium" | "hard";
  estimatedLength?: number;
};

export type GameStory = {
  title?: string;
  description?: string;
  prologue: Scene[];
  routes: Record<string, Route>;
  characters?: Record<string, CharacterSprite>; // Can be simple OR live2d
  pointTypes?: {
    universal: Record<string, string>;
    route: Record<string, string>;
    prologue: Record<string, string>;
  };
};

export type GameState = {
  currentPhase: "prologue" | "route" | "ending" | "complete";
  currentRouteId?: string;
  currentEndingId?: string;
  currentSceneIndex: number;
  currentSlideIndex: number;
  universalPoints: Record<string, number>;
  routePoints: Record<string, Record<string, number>>;
  prologuePoints: Record<string, number>;
  playerName?: string;
  choicesMade: number;
  startTime?: number;
  endingUnlocked?: string[];
};

export type PointCheck = {
  hasRequirements: boolean;
  missingPoints: {
    universal: Record<string, number>;
    route: Record<string, number>;
    prologue: Record<string, number>;
  };
  totalPointsNeeded: number;
};

export interface StoryContent {
  getStory(): GameStory;
  validateStory?(story: GameStory): boolean;
}
