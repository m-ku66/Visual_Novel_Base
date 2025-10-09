import type { CharacterSprite, Live2DSprite } from "../types/vn.ts";

export const aliceLive2D: Live2DSprite = {
  type: "live2d",
  id: "alice",
  name: "Alice",
  scale: 1.0,
  defaultExpression: "neutral",
  parts: [
    // ========================================
    // LAYER 1: BACKGROUND ELEMENTS (z: 10)
    // ========================================
    {
      id: "hair_back",
      image: "/sprites/alice/base/back_hair.png",
      zIndex: 10,
      // Optional: Gentle sway animation
      animation: {
        y: { from: 0, to: 2 },
        duration: 1.5,
        delay: 0,
        repeat: true,
      },
    },

    // ========================================
    // LAYER 2: BODY (z: 11)
    // ========================================
    {
      id: "body",
      image: "/sprites/alice/base/body.png",
      zIndex: 11,
      animation: {
        y: { from: 0, to: 1 },
        duration: 1,
        delay: 0,
        repeat: true,
      },
    },

    // ========================================
    // LAYER 3: NECK (z: 12)
    // ========================================
    {
      id: "neck",
      image: "/sprites/alice/face/neck.png",
      zIndex: 12,
      animation: {
        y: { from: 0, to: 1 },
        duration: 1.2,
        delay: 0,
        repeat: true,
      },
    },

    // ========================================
    // LAYER 4: HEAD BASE (z: 13)
    // ========================================
    {
      id: "head",
      image: "/sprites/alice/face/head_base.png",
      zIndex: 13,
      // Breathing animation - subtle up/down
      animation: {
        y: { from: 0, to: -1 },
        duration: 1.5,
        repeat: true,
      },
    },

    // ========================================
    // LAYER 5: FACIAL FEATURES
    // ========================================

    // Eyes (z: 14) - Multiple variants for expressions
    {
      id: "eyes",
      image: "/sprites/alice/face/eyes_open.png",
      zIndex: 14,
      variants: {
        open: "/sprites/alice/face/eyes_open.png",
        closed: "/sprites/alice/face/eyes_closed.png",
        happy: "/sprites/alice/face/eyes_happy.png",
        surprised: "/sprites/alice/face/eyes_surprised.png",
      },
    },

    // Mouth (z: 15) - Different mouth shapes
    {
      id: "mouth",
      image: "/sprites/alice/face/mouth_neutral.png",
      zIndex: 15,
      variants: {
        neutral: "/sprites/alice/face/mouth_neutral.png",
        surprised: "/sprites/alice/face/mouth_surprised.png",
        frown: "/sprites/alice/face/mouth_frown.png",
        talking: "/sprites/alice/face/mouth_talking.png",
      },
    },

    // Eyebrows (z: 16) - Emotional indicators
    {
      id: "brows",
      image: "/sprites/alice/face/brow_neutral.png",
      zIndex: 16,
      variants: {
        neutral: "/sprites/alice/face/eyebrows_neutral.png",
        pointed: "/sprites/alice/face/eyebrows_pointed.png",
        curved: "/sprites/alice/face/eyebrows_curved.png",
      },
    },

    // ========================================
    // LAYER 6: FRONT HAIR (z: 17)
    // ========================================
    {
      id: "bangs",
      image: "/sprites/alice/hair/bangs.png",
      zIndex: 17,
      // Hair sway animation - slightly delayed from back hair
      animation: {
        y: { from: 0, to: -0.5 },
        duration: 0.5,
        delay: 0.3,
        repeat: true,
      },
    },

    {
      id: "side_hair",
      image: "/sprites/alice/hair/side_hair.png",
      zIndex: 17,
      animation: {
        y: { from: 0, to: -1 },
        duration: 3,
        delay: 0.3,
        repeat: true,
      },
    },
  ],

  // ========================================
  // EXPRESSIONS - Combine multiple parts
  // ========================================
  expressions: {
    neutral: {
      name: "neutral",
      partStates: {
        eyes: "open",
        mouth: "neutral",
        brows: "neutral",
      },
    },

    happy: {
      name: "happy",
      partStates: {
        eyes: "happy",
        mouth: "neutral",
        brows: "neutral",
      },
    },

    sad: {
      name: "sad",
      partStates: {
        eyes: "open",
        mouth: "frown",
        brows: "curved",
      },
    },

    surprised: {
      name: "surprised",
      partStates: {
        eyes: "surprised",
        mouth: "surprised",
        brows: "neutral",
      },
    },

    talking: {
      name: "talking",
      partStates: {
        eyes: "open",
        mouth: "talking",
        brows: "neutral",
      },
    },

    // You can create combo expressions
    happyTalking: {
      name: "happyTalking",
      partStates: {
        eyes: "happy",
        mouth: "talking",
        brows: "neutral",
      },
    },

    sadTalking: {
      name: "sadTalking",
      partStates: {
        eyes: "closed",
        mouth: "talking",
        brows: "curved",
      },
    },

    sly: {
      name: "sly",
      partStates: {
        eyes: "happy",
        mouth: "neutral",
        brows: "pointed",
      },
    },
  },
};

// Export all characters
export const characters: Record<string, CharacterSprite> = {
  alice: aliceLive2D,
  // Add more characters here as needed
};
