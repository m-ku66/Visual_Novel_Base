/**
 * Visual Novel Core Types - Enhanced with Hybrid Point System
 * Structure: Prologue → Routes → Endings
 * Points: Universal (carry across routes) + Route-specific + Prologue
 */

// Point requirements for conditional content
export type PointRequirements = {
  universal?: Record<string, number>;
  route?: Record<string, number>;
  prologue?: Record<string, number>;
};

// Enhanced choice with hybrid point system
export type Choice = {
  text: string;
  routeId?: string; // If present, switches to this route

  // Point allocation
  universalPoints?: Record<string, number>; // Points that carry across all routes
  routePoints?: Record<string, number>; // Points specific to current route
  prologuePoints?: Record<string, number>; // Early game points (for route access)

  // Conditional display (choice only shows if requirements met)
  requires?: PointRequirements;

  // Metadata
  description?: string; // Tooltip or additional info
};

type CharacterSprite = {
  id: string;
  name: string;
  baseImage: string;
  expressions?: Record<string, string>; // "happy" -> "/sprites/alice-happy.png"
  positions?: Record<string, { x: number; y: number }>;
};

// Individual dialogue slide within a scene
export type Slide = {
  id: string;
  speaker?: string; // Character name, undefined for narration
  text: string;
  choices?: Choice[]; // Player choices

  // Conditional content
  requires?: PointRequirements; // Slide only shows if requirements met

  // Visual enhancements
  background?: string; // Future: background image
  mood?: "happy" | "sad" | "tense" | "romantic" | "mysterious"; // Future: UI theming

  sprites?: {
    characterId: CharacterSprite["id"];
    expression?: CharacterSprite["expressions"] extends Record<string, string>
      ? keyof CharacterSprite["expressions"]
      : string;
    position?: "left" | "center" | "right" | "custom";
    customPosition?: { x: number; y: number };
    transition?: "fadeIn" | "slideIn" | "none";
  }[];
};

// A scene is a sequence of slides
export type Scene = {
  id: string;
  title: string;
  characters?: string[]; // Characters present (for UI)
  slides: Slide[];

  // Scene requirements
  requires?: PointRequirements; // Scene only accessible if requirements met
};

// Enhanced route ending with hybrid requirements
export type RouteEnding = {
  id: string;
  name: string;
  description?: string; // What this ending represents
  scenes: Scene[];

  // Hybrid point requirements
  requires?: PointRequirements;

  // Priority for ending selection (higher = preferred if multiple qualify)
  priority?: number;

  // Metadata
  isSecretEnding?: boolean; // Hidden from player until unlocked
  achievementName?: string; // Future: achievement system
};

// A complete story route
export type Route = {
  id: string;
  name: string;
  description?: string;
  scenes: Scene[]; // Main route scenes
  endings: RouteEnding[]; // Possible endings for this route

  // Route access requirements
  requires?: PointRequirements; // Points needed to access this route

  // Route metadata
  difficulty?: "easy" | "medium" | "hard";
  estimatedLength?: number; // Estimated scenes
};

// The complete game structure
export type GameStory = {
  // Story metadata
  title?: string;
  description?: string;

  // Story content
  prologue: Scene[];
  routes: Record<string, Route>;

  // Global settings
  pointTypes?: {
    universal: Record<string, string>; // pointId -> display name
    route: Record<string, string>;
    prologue: Record<string, string>;
  };
};

// Enhanced game state with hybrid points
export type GameState = {
  // Navigation state
  currentPhase: "prologue" | "route" | "ending" | "complete";
  currentRouteId?: string;
  currentEndingId?: string;

  // Progress tracking
  currentSceneIndex: number;
  currentSlideIndex: number;

  // Hybrid point system
  universalPoints: Record<string, number>; // Points that carry across all routes
  routePoints: Record<string, Record<string, number>>; // routeId -> pointType -> value
  prologuePoints: Record<string, number>; // Early game points for route access

  // Player info
  playerName?: string;
  choicesMade: number;

  // Session tracking
  startTime?: number;
  endingUnlocked?: string[]; // Endings the player has seen
};

// Utility types for point checking
export type PointCheck = {
  hasRequirements: boolean;
  missingPoints: {
    universal: Record<string, number>;
    route: Record<string, number>;
    prologue: Record<string, number>;
  };
  totalPointsNeeded: number;
};

// Story content interface for easy swapping
export interface StoryContent {
  getStory(): GameStory;
  validateStory?(story: GameStory): boolean; // Future: story validation
}
