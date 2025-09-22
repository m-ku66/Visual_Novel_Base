import { create } from "zustand";
import type {
  GameState,
  GameStory,
  Scene,
  Choice,
  RouteEnding,
} from "../types/vn";

interface VNStore extends GameState {
  // Story content
  story: GameStory | null;

  // Core actions
  loadStory: (story: GameStory) => void;

  // Navigation actions
  getCurrentScene: () => Scene | null;
  getCurrentSlide: () => {
    speaker?: string;
    text: string;
    choices?: Choice[];
  } | null;

  // Progression actions
  advanceSlide: () => void;
  makeChoice: (choiceIndex: number) => void;

  // Route management
  selectRoute: (routeId: string) => void;
  selectEnding: (endingId: string) => void;

  // Internal helpers (added to fix TypeScript errors)
  advanceToNextScene: () => void;
  determineEnding: () => void;

  // Utility actions
  reset: () => void;

  // Debug helpers
  getDebugInfo: () => {
    phase: string;
    route?: string;
    ending?: string;
    sceneIndex: number;
    slideIndex: number;
    totalScenes: number;
  };
}

export const useVNStore = create<VNStore>((set, get) => ({
  // Initial state
  story: null,
  currentPhase: "prologue",
  currentSceneIndex: 0,
  currentSlideIndex: 0,
  routePoints: {},
  choicesMade: 0,

  // Load story content
  loadStory: (story: GameStory) => {
    set({
      story,
      currentPhase: "prologue",
      currentSceneIndex: 0,
      currentSlideIndex: 0,
      currentRouteId: undefined,
      currentEndingId: undefined,
      routePoints: {},
      choicesMade: 0,
    });
  },

  // Get current scene based on phase
  getCurrentScene: (): Scene | null => {
    const {
      story,
      currentPhase,
      currentSceneIndex,
      currentRouteId,
      currentEndingId,
    } = get();
    if (!story) return null;

    switch (currentPhase) {
      case "prologue":
        return story.prologue[currentSceneIndex] || null;

      case "route":
        if (!currentRouteId) return null;
        const route = story.routes[currentRouteId];
        return route?.scenes[currentSceneIndex] || null;

      case "ending":
        if (!currentRouteId || !currentEndingId) return null;
        const endingRoute = story.routes[currentRouteId];
        const ending = endingRoute?.endings.find(
          (e) => e.id === currentEndingId
        );
        return ending?.scenes[currentSceneIndex] || null;

      default:
        return null;
    }
  },

  // Get current slide within the scene
  getCurrentSlide: () => {
    const scene = get().getCurrentScene();
    const { currentSlideIndex } = get();

    if (!scene || !scene.slides[currentSlideIndex]) return null;

    return scene.slides[currentSlideIndex];
  },

  // Advance to next slide in current scene
  advanceSlide: () => {
    const scene = get().getCurrentScene();
    const { currentSlideIndex } = get();

    if (!scene) return;

    // If we can advance within the current scene
    if (currentSlideIndex < scene.slides.length - 1) {
      set({ currentSlideIndex: currentSlideIndex + 1 });
      return;
    }

    // Otherwise, advance to next scene
    get().advanceToNextScene();
  },

  // Internal helper: advance to next scene
  advanceToNextScene: () => {
    const {
      story,
      currentPhase,
      currentSceneIndex,
      currentRouteId,
      currentEndingId,
    } = get();

    if (!story) return;

    const nextSceneIndex = currentSceneIndex + 1;

    switch (currentPhase) {
      case "prologue":
        // Check if there are more prologue scenes
        if (nextSceneIndex < story.prologue.length) {
          set({
            currentSceneIndex: nextSceneIndex,
            currentSlideIndex: 0,
          });
        } else {
          // Prologue complete - need to select route
          console.log("Prologue complete - route selection needed");
          // Note: Route selection happens via makeChoice() or selectRoute()
        }
        break;

      case "route":
        if (!currentRouteId) return;
        const route = story.routes[currentRouteId];

        if (nextSceneIndex < route.scenes.length) {
          set({
            currentSceneIndex: nextSceneIndex,
            currentSlideIndex: 0,
          });
        } else {
          // Route complete - determine ending
          get().determineEnding();
        }
        break;

      case "ending":
        if (!currentRouteId || !currentEndingId) return;
        const endingRoute = story.routes[currentRouteId];
        const ending = endingRoute?.endings.find(
          (e) => e.id === currentEndingId
        );

        if (ending && nextSceneIndex < ending.scenes.length) {
          set({
            currentSceneIndex: nextSceneIndex,
            currentSlideIndex: 0,
          });
        } else {
          // Story complete
          set({ currentPhase: "complete" });
          console.log("Story complete!");
        }
        break;
    }
  },

  // Handle player choice
  makeChoice: (choiceIndex: number) => {
    const slide = get().getCurrentSlide();
    if (!slide?.choices || !slide.choices[choiceIndex]) return;

    const choice = slide.choices[choiceIndex];

    // Increment choice counter
    set({ choicesMade: get().choicesMade + 1 });

    // If choice specifies a route, switch to it
    if (choice.routeId) {
      get().selectRoute(choice.routeId);
      return;
    }

    // If choice has points, accumulate them (future feature)
    if (choice.points) {
      const { routePoints, currentRouteId } = get();
      if (currentRouteId) {
        const currentPoints = routePoints[currentRouteId] || {};
        const newPoints = { ...currentPoints };

        Object.entries(choice.points).forEach(([pointType, value]) => {
          newPoints[pointType] = (newPoints[pointType] || 0) + value;
        });

        set({
          routePoints: {
            ...routePoints,
            [currentRouteId]: newPoints,
          },
        });
      }
    }

    // Continue to next slide/scene
    get().advanceSlide();
  },

  // Select a specific route
  selectRoute: (routeId: string) => {
    const { story } = get();
    if (!story || !story.routes[routeId]) {
      console.error(`Route ${routeId} not found`);
      return;
    }

    set({
      currentPhase: "route",
      currentRouteId: routeId,
      currentSceneIndex: 0,
      currentSlideIndex: 0,
    });

    console.log(`Entered route: ${routeId}`);
  },

  // Determine which ending to use based on points (simple version for now)
  determineEnding: () => {
    const { story, currentRouteId, routePoints } = get();
    if (!story || !currentRouteId) return;

    const route = story.routes[currentRouteId];
    const currentPoints = routePoints[currentRouteId] || {};

    // Simple logic: use first ending for now
    // Future: implement point-based ending selection
    const selectedEnding = route.endings[0];

    if (selectedEnding) {
      get().selectEnding(selectedEnding.id);
    } else {
      // No endings defined, mark as complete
      set({ currentPhase: "complete" });
    }
  },

  // Select a specific ending
  selectEnding: (endingId: string) => {
    const { story, currentRouteId } = get();
    if (!story || !currentRouteId) return;

    const route = story.routes[currentRouteId];
    const ending = route.endings.find((e) => e.id === endingId);

    if (!ending) {
      console.error(`Ending ${endingId} not found in route ${currentRouteId}`);
      return;
    }

    set({
      currentPhase: "ending",
      currentEndingId: endingId,
      currentSceneIndex: 0,
      currentSlideIndex: 0,
    });

    console.log(`Entered ending: ${endingId}`);
  },

  // Reset to beginning
  reset: () => {
    set({
      currentPhase: "prologue",
      currentSceneIndex: 0,
      currentSlideIndex: 0,
      currentRouteId: undefined,
      currentEndingId: undefined,
      routePoints: {},
      choicesMade: 0,
    });
  },

  // Debug information
  getDebugInfo: () => {
    const {
      currentPhase,
      currentRouteId,
      currentEndingId,
      currentSceneIndex,
      currentSlideIndex,
      story,
    } = get();

    let totalScenes = 0;
    if (story) {
      switch (currentPhase) {
        case "prologue":
          totalScenes = story.prologue.length;
          break;
        case "route":
          if (currentRouteId) {
            totalScenes = story.routes[currentRouteId]?.scenes.length || 0;
          }
          break;
        case "ending":
          if (currentRouteId && currentEndingId) {
            const route = story.routes[currentRouteId];
            const ending = route?.endings.find((e) => e.id === currentEndingId);
            totalScenes = ending?.scenes.length || 0;
          }
          break;
      }
    }

    return {
      phase: currentPhase,
      route: currentRouteId,
      ending: currentEndingId,
      sceneIndex: currentSceneIndex,
      slideIndex: currentSlideIndex,
      totalScenes,
    };
  },
}));
