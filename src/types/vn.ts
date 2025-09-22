/**
 * Visual Novel Core Types
 * Simple structure: Prologue → Routes → Endings
 */

// Basic choice that can trigger route changes or point accumulation
export type Choice = {
  text: string;
  routeId?: string; // If present, switches to this route
  points?: Record<string, number>; // Future: point accumulation within routes
};

// Individual dialogue slide within a scene
export type Slide = {
  speaker?: string; // Character name, undefined for narration
  text: string;
  choices?: Choice[]; // Player choices (only on final slide of scene usually)
};

// A scene is a sequence of slides
export type Scene = {
  id: string;
  title: string;
  characters?: string[]; // Characters present (for UI)
  slides: Slide[];
};

// A route ending (can have multiple per route)
export type RouteEnding = {
  id: string;
  name: string;
  scenes: Scene[];
  requiredPoints?: Record<string, number>; // Future: points needed to access this ending
};

// A complete story route
export type Route = {
  id: string;
  name: string;
  scenes: Scene[]; // Main route scenes
  endings: RouteEnding[]; // Possible endings for this route
};

// The complete game structure
export type GameStory = {
  prologue: Scene[];
  routes: Record<string, Route>;
};

// Current game state
export type GameState = {
  // Navigation state
  currentPhase: "prologue" | "route" | "ending" | "complete";
  currentRouteId?: string;
  currentEndingId?: string;

  // Progress tracking
  currentSceneIndex: number;
  currentSlideIndex: number;

  // Future: point accumulation per route
  routePoints: Record<string, Record<string, number>>; // routeId -> pointType -> value

  // Player info
  playerName?: string;
  choicesMade: number;
};

// Story content interface for easy swapping
export interface StoryContent {
  getStory(): GameStory;
}
