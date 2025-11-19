import { create } from "zustand";
import type {
  GameState,
  GameStory,
  Scene,
  Choice,
  RouteEnding,
  PointRequirements,
  PointCheck,
  Slide,
} from "../types/vn";
import { useAudioStore } from "./audioStore";

interface VNStore extends GameState {
  // Story content
  story: GameStory | null;

  // Core actions
  loadStory: (story: GameStory) => void;

  // Navigation actions
  getCurrentScene: () => Scene | null;
  getCurrentSlide: () => Slide | null;

  // Progression actions
  advanceSlide: () => void;
  makeChoice: (choiceIndex: number) => void;

  // Route management
  selectRoute: (routeId: string) => void;
  selectEnding: (endingId: string) => void;

  // Point system utilities
  checkPointRequirements: (requirements: PointRequirements) => PointCheck;
  getFilteredChoices: () => Choice[];
  addUniversalPoints: (points: Record<string, number>) => void;
  addRoutePoints: (points: Record<string, number>) => void;
  addProloguePoints: (points: Record<string, number>) => void;

  // Internal helpers
  advanceToNextScene: () => void;
  determineEnding: () => void;
  findBestEnding: (endings: RouteEnding[]) => RouteEnding | null;

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
    points: {
      universal: Record<string, number>;
      route: Record<string, number>;
      prologue: Record<string, number>;
    };
  };
}

export const useVNStore = create<VNStore>((set, get) => ({
  // Initial state
  story: null,
  currentPhase: "prologue",
  currentSceneIndex: 0,
  currentSlideIndex: 0,
  universalPoints: {},
  routePoints: {},
  prologuePoints: {},
  choicesMade: 0,
  endingUnlocked: [],

  // Load story content
  loadStory: (story: GameStory) => {
    set({
      story,
      currentPhase: "prologue",
      currentSceneIndex: 0,
      currentSlideIndex: 0,
      currentRouteId: undefined,
      currentEndingId: undefined,
      universalPoints: {},
      routePoints: {},
      prologuePoints: {},
      choicesMade: 0,
      endingUnlocked: [],
      startTime: Date.now(),
    });
  },

  // Point requirement checking
  checkPointRequirements: (requirements: PointRequirements): PointCheck => {
    const { universalPoints, routePoints, prologuePoints, currentRouteId } =
      get();

    const missingPoints = {
      universal: {} as Record<string, number>,
      route: {} as Record<string, number>,
      prologue: {} as Record<string, number>,
    };

    let hasRequirements = true;
    let totalPointsNeeded = 0;

    // Check universal requirements
    if (requirements.universal) {
      Object.entries(requirements.universal).forEach(([pointType, needed]) => {
        const current = universalPoints[pointType] || 0;
        if (current < needed) {
          missingPoints.universal[pointType] = needed - current;
          hasRequirements = false;
          totalPointsNeeded += needed - current;
        }
      });
    }

    // Check route requirements
    if (requirements.route && currentRouteId) {
      const currentRoutePoints = routePoints[currentRouteId] || {};
      Object.entries(requirements.route).forEach(([pointType, needed]) => {
        const current = currentRoutePoints[pointType] || 0;
        if (current < needed) {
          missingPoints.route[pointType] = needed - current;
          hasRequirements = false;
          totalPointsNeeded += needed - current;
        }
      });
    }

    // Check prologue requirements
    if (requirements.prologue) {
      Object.entries(requirements.prologue).forEach(([pointType, needed]) => {
        const current = prologuePoints[pointType] || 0;
        if (current < needed) {
          missingPoints.prologue[pointType] = needed - current;
          hasRequirements = false;
          totalPointsNeeded += needed - current;
        }
      });
    }

    return {
      hasRequirements,
      missingPoints,
      totalPointsNeeded,
    };
  },

  // Get current scene based on phase with requirement checking
  getCurrentScene: (): Scene | null => {
    const {
      story,
      currentPhase,
      currentSceneIndex,
      currentRouteId,
      currentEndingId,
      checkPointRequirements,
    } = get();

    if (!story) return null;

    let scene: Scene | null = null;

    switch (currentPhase) {
      case "prologue":
        scene = story.prologue[currentSceneIndex] || null;
        break;

      case "route":
        if (!currentRouteId) return null;
        const route = story.routes[currentRouteId];
        scene = route?.scenes[currentSceneIndex] || null;
        break;

      case "ending":
        if (!currentRouteId || !currentEndingId) return null;
        const endingRoute = story.routes[currentRouteId];
        const ending = endingRoute?.endings.find(
          (e) => e.id === currentEndingId
        );
        scene = ending?.scenes[currentSceneIndex] || null;
        break;

      default:
        return null;
    }

    // Check if scene meets requirements
    if (scene?.requires) {
      const check = checkPointRequirements(scene.requires);
      if (!check.hasRequirements) {
        return null; // Scene not accessible
      }
    }

    return scene;
  },

  // Get current slide with requirement checking
  getCurrentSlide: (): Slide | null => {
    const scene = get().getCurrentScene();
    if (!scene) {
      console.log("❌ No scene found");
      return null;
    }
    const { currentSlideIndex, checkPointRequirements } = get();

    if (!scene || !scene.slides[currentSlideIndex]) return null;

    const slide = scene.slides[currentSlideIndex];
    console.log(`📍 Checking slide ${get().currentSlideIndex}:`, slide?.id);

    // Check if slide meets requirements
    if (slide?.requires) {
      const check = checkPointRequirements(slide.requires);
      console.log("🔍 Requirements check:", check);
      if (!check.hasRequirements) {
        console.log("❌ Slide requirements not met");
        return null; // Slide not accessible
      }
    }

    // Return the FULL slide object, not just a subset
    return slide;
  },

  // Get filtered choices based on requirements
  getFilteredChoices: (): Choice[] => {
    const slide = get().getCurrentSlide();
    const { checkPointRequirements } = get();

    if (!slide?.choices) return [];

    return slide.choices.filter((choice) => {
      if (!choice.requires) return true;
      return checkPointRequirements(choice.requires).hasRequirements;
    });
  },

  // Point management methods
  addUniversalPoints: (points: Record<string, number>) => {
    const { universalPoints } = get();
    const newPoints = { ...universalPoints };

    Object.entries(points).forEach(([pointType, value]) => {
      newPoints[pointType] = (newPoints[pointType] || 0) + value;
    });

    set({ universalPoints: newPoints });
  },

  addRoutePoints: (points: Record<string, number>) => {
    const { routePoints, currentRouteId } = get();
    if (!currentRouteId) return;

    const currentPoints = routePoints[currentRouteId] || {};
    const newPoints = { ...currentPoints };

    Object.entries(points).forEach(([pointType, value]) => {
      newPoints[pointType] = (newPoints[pointType] || 0) + value;
    });

    set({
      routePoints: {
        ...routePoints,
        [currentRouteId]: newPoints,
      },
    });
  },

  addProloguePoints: (points: Record<string, number>) => {
    const { prologuePoints } = get();
    const newPoints = { ...prologuePoints };

    Object.entries(points).forEach(([pointType, value]) => {
      newPoints[pointType] = (newPoints[pointType] || 0) + value;
    });

    set({ prologuePoints: newPoints });
  },

  // Advance to next slide in current scene, skipping unreachable slides/scenes
  advanceSlide: () => {
    const scene = get().getCurrentScene();
    const { currentSlideIndex, checkPointRequirements } = get();

    if (!scene) return;

    let nextSlideIndex = currentSlideIndex + 1;

    // Keep looking for a valid slide
    while (nextSlideIndex < scene.slides.length) {
      const nextSlide = scene.slides[nextSlideIndex];

      // If slide has no requirements, use it
      if (!nextSlide.requires) {
        set({ currentSlideIndex: nextSlideIndex });
        return;
      }

      // Check if requirements are met
      const check = checkPointRequirements(nextSlide.requires);
      if (check.hasRequirements) {
        set({ currentSlideIndex: nextSlideIndex });
        return;
      }

      // Requirements not met, try next slide
      console.log(
        `⏭️ Skipping slide ${nextSlideIndex}: ${nextSlide.id} (requirements not met)`
      );
      nextSlideIndex++;
    }

    // No valid slides left in this scene, advance to next scene
    console.log("📘 No more valid slides in scene, advancing to next scene");
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
        if (nextSceneIndex < story.prologue.length) {
          set({
            currentSceneIndex: nextSceneIndex,
            currentSlideIndex: 0,
          });
        } else {
          console.log("Prologue complete - route selection needed");
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
          // Mark ending as unlocked and complete story
          const { endingUnlocked } = get();
          if (currentEndingId && !endingUnlocked!.includes(currentEndingId)) {
            set({
              endingUnlocked: [...endingUnlocked!, currentEndingId],
              currentPhase: "complete",
            });
          } else {
            set({ currentPhase: "complete" });
          }
          console.log("Story complete!");
        }
        break;
    }
  },

  // Enhanced choice handling with hybrid points
  makeChoice: (choiceIndex: number) => {
    const slide = get().getCurrentSlide();
    const filteredChoices = get().getFilteredChoices();

    if (!filteredChoices[choiceIndex]) return;

    const choice = filteredChoices[choiceIndex];

    // Increment choice counter
    set({ choicesMade: get().choicesMade + 1 });

    // Add points based on current phase
    const { currentPhase } = get();

    if (choice.universalPoints) {
      get().addUniversalPoints(choice.universalPoints);
    }

    if (choice.routePoints && currentPhase === "route") {
      get().addRoutePoints(choice.routePoints);
    }

    if (choice.prologuePoints && currentPhase === "prologue") {
      get().addProloguePoints(choice.prologuePoints);
    }

    // If choice specifies a route, switch to it
    if (choice.routeId) {
      get().selectRoute(choice.routeId);
      return;
    }

    // Continue to next slide/scene
    get().advanceSlide();
  },

  // Select a specific route with requirement checking
  selectRoute: (routeId: string) => {
    const { story, checkPointRequirements } = get();
    if (!story || !story.routes[routeId]) {
      console.error(`Route ${routeId} not found`);
      return;
    }

    const route = story.routes[routeId];

    // Check if route requirements are met
    if (route.requires) {
      const check = checkPointRequirements(route.requires);
      if (!check.hasRequirements) {
        console.error(
          `Route ${routeId} requirements not met`,
          check.missingPoints
        );
        return;
      }
    }

    set({
      currentPhase: "route",
      currentRouteId: routeId,
      currentSceneIndex: 0,
      currentSlideIndex: 0,
    });

    console.log(`Entered route: ${routeId}`);
  },

  // Enhanced ending determination with hybrid points
  findBestEnding: (endings: RouteEnding[]): RouteEnding | null => {
    const { checkPointRequirements } = get();

    // Filter endings by requirements
    const availableEndings = endings.filter((ending) => {
      if (!ending.requires) return true;
      return checkPointRequirements(ending.requires).hasRequirements;
    });

    if (availableEndings.length === 0) {
      return endings[0] || null; // Fallback to first ending
    }

    // Sort by priority (higher first), then by order in array
    availableEndings.sort((a, b) => {
      const priorityA = a.priority || 0;
      const priorityB = b.priority || 0;
      return priorityB - priorityA;
    });

    return availableEndings[0];
  },

  determineEnding: () => {
    const { story, currentRouteId } = get();
    if (!story || !currentRouteId) return;

    const route = story.routes[currentRouteId];
    const selectedEnding = get().findBestEnding(route.endings);

    if (selectedEnding) {
      get().selectEnding(selectedEnding.id);
    } else {
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

    console.log(`Entered ending: ${endingId} - ${ending.name}`);
  },

  // Reset to beginning
  reset: () => {
    // ✅ Clean up audio before resetting game state
    useAudioStore.getState().cleanup();

    set({
      currentPhase: "prologue",
      currentSceneIndex: 0,
      currentSlideIndex: 0,
      currentRouteId: undefined,
      currentEndingId: undefined,
      universalPoints: {},
      routePoints: {},
      prologuePoints: {},
      choicesMade: 0,
      endingUnlocked: [],
      startTime: Date.now(),
    });

    console.log("🎮 Game reset - audio cleaned up");
  },

  // Enhanced debug information
  getDebugInfo: () => {
    const {
      currentPhase,
      currentRouteId,
      currentEndingId,
      currentSceneIndex,
      currentSlideIndex,
      story,
      universalPoints,
      routePoints,
      prologuePoints,
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
      points: {
        universal: universalPoints,
        route: currentRouteId ? routePoints[currentRouteId] || {} : {},
        prologue: prologuePoints,
      },
    };
  },
}));
