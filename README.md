# Visual Novel Engine

A complete, production-ready visual novel framework built with React, TypeScript, and Zustand. Features a sophisticated hybrid point system, dynamic branching narratives, sprite rendering, audio system, and polished UI animations.

**Built for portability** - Works in any React environment: Vite, Next.js, Electron, and more.

---

## ✨ Features

### Core Systems

- **🎯 Hybrid Point System** - Universal, route-specific, and prologue points for complex branching
- **🌿 Dynamic Branching** - Multiple routes with conditional content based on player choices
- **🎭 Character Sprites** - Support for both simple sprites and layered Live2D-style characters
- **🖼️ Enhanced Backgrounds** - Color grading, overlays, and Ken Burns zoom effects
- **🎵 Full Audio System** - BGM with crossfading, SFX triggers, and volume controls
- **📝 Typewriter Dialogue** - Classic VN-style text animation with skip functionality
- **✨ Polished UI** - Smooth Motion animations throughout

### Player Experience

- **📊 Real-time Point Tracking** - See your progression with color-coded point displays
- **🎮 Smart Choice System** - Conditional choices that appear based on requirements
- **🏆 Achievement System** - Track unlocked endings and secret content
- **🔇 Audio Controls** - Prominent mute button + adjustable volume settings
- **⌨️ Keyboard Navigation** - Full keyboard support for choices and progression
- **🎨 Professional Presentation** - Fixed-size dialogue boxes, smooth transitions, responsive design

---

## 📖 Story Structure

This engine follows the classic visual novel structure:

```
Prologue (shared)
    ↓
┌───┴───┬───────┬───────┐
│       │       │       │
Route A Route B Route C ...
│       │       │
├─┬─┬─┐ ├─┬─┬─┐ ├─┬─┬─┐
│ │ │ │ │ │ │ │ │ │ │ │
Endings Endings Endings
```

**Example Flow:**

```
Prologue → Route Selection → Character Route → Ending Determination → Completion
```

---

## 🎯 Point System

### Three Point Types Working Together

1. **Universal Points** (Blue)

   - Carry across all routes
   - Examples: `courage`, `kindness`, `wisdom`, `magic`
   - Affect route access and ending requirements

2. **Prologue Points** (Purple)

   - Earned during the shared prologue
   - Examples: `dragon_encounter`, `leadership`
   - Determine which routes unlock

3. **Route Points** (Green)
   - Specific to each character route
   - Examples: `alice_bond`, `bob_trust`
   - Determine which ending you get

---

## 🚀 Quick Start

### For a New Project

```bash
# 1. Create new Vite + React + TypeScript project
npm create vite@latest my-vn-game -- --template react-ts
cd my-vn-game

# 2. Install dependencies
npm install zustand motion

# 3. Install dev dependencies (if not already included)
npm install -D tailwindcss autoprefixer postcss
npx tailwindcss init -p

# 4. Copy the VN engine files (see structure below)

# 5. Run
npm run dev
```

### For an Existing Project

**Step 1: Install Dependencies**

```bash
npm install zustand motion
# If you don't have Tailwind CSS:
npm install -D tailwindcss autoprefixer postcss
npx tailwindcss init -p
```

**Step 2: Copy Engine Files**

Copy the entire VN engine into your project:

```
your-project/
└── src/
    ├── vn-engine/              ← Copy everything here
    │   ├── components/
    │   │   ├── VisualNovel.tsx
    │   │   ├── DialogueBox.tsx
    │   │   ├── ChoiceModal.tsx
    │   │   ├── AudioManager.tsx
    │   │   ├── GameWorldLayer.tsx
    │   │   ├── SpriteRenderer.tsx
    │   │   ├── BackgroundRenderer.tsx
    │   │   └── ... (all UI components)
    │   ├── stores/
    │   │   ├── vnStore.ts
    │   │   └── audioStore.ts
    │   ├── types/
    │   │   ├── vn.ts
    │   │   └── ui.ts
    │   └── content/
    │       └── exampleStory.ts
    └── App.tsx
```

**Step 3: Configure Tailwind** (if needed)

Update your `tailwind.config.js`:

```javascript
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

**Step 4: Add Assets**

Create directories for your game assets:

```
public/
├── audio/
│   ├── bgm/
│   │   ├── theme.mp3
│   │   └── tension.mp3
│   └── sfx/
│       ├── click.wav
│       └── choice.wav
├── sprites/
│   ├── alice/
│   └── bob/
└── backgrounds/
    ├── forest.jpg
    └── village.jpg
```

**Step 5: Create Your Story**

```typescript
// src/content/myStory.ts
import type { GameStory } from "../vn-engine/types/vn";

export const myStory: GameStory = {
  title: "My Visual Novel",
  description: "An epic adventure",

  // Define your characters
  characters: {
    alice: {
      type: "simple",
      id: "alice",
      name: "Alice",
      baseImage: "/sprites/alice-neutral.png",
      expressions: {
        happy: "/sprites/alice-happy.png",
        sad: "/sprites/alice-sad.png",
      },
      defaultExpression: "happy",
    },
  },

  prologue: [
    {
      id: "intro",
      title: "Beginning",
      slides: [
        {
          id: "opening",
          speaker: "Narrator",
          text: "Your adventure begins...",
          background: {
            image: "/backgrounds/village.jpg",
          },
          audio: {
            bgm: {
              src: "/audio/bgm/theme.mp3",
              loop: true,
              volume: 0.7,
              fadeIn: { duration: 2, easing: "ease-in" },
            },
          },
          choices: [
            {
              text: "Be brave",
              universalPoints: { courage: 2 },
            },
            {
              text: "Be cautious",
              universalPoints: { wisdom: 2 },
            },
          ],
        },
      ],
    },
  ],

  routes: {
    // Your character routes here
  },
};
```

**Step 6: Use in Your App**

```typescript
// src/App.tsx
import { VisualNovel } from "./vn-engine/components/VisualNovel";
import { myStory } from "./content/myStory";

function App() {
  return <VisualNovel story={myStory} />;
}

export default App;
```

**That's it!** Your VN engine is now integrated. 🎉

---

## 🎮 Platform Support

| Platform             | Support    | Notes                                  |
| -------------------- | ---------- | -------------------------------------- |
| **Vite + React**     | ✅ Full    | Built with this                        |
| **Electron**         | ✅ Full    | Works seamlessly (Electron = Chromium) |
| **Next.js**          | ✅ Full    | Standard React components              |
| **Create React App** | ✅ Full    | Drop-in compatible                     |
| **React Native**     | ⚠️ Partial | Needs styling adjustments              |

**Why it's portable:** This engine uses standard React patterns with no environment-specific dependencies. It works anywhere React works!

---

## 📂 Project Structure

```
src/
├── vn-engine/
│   ├── components/
│   │   ├── VisualNovel.tsx          # Main component
│   │   ├── DialogueBox.tsx          # Typewriter dialogue
│   │   ├── ChoiceModal.tsx          # Animated choice selection
│   │   ├── AudioManager.tsx         # BGM/SFX controller
│   │   ├── GameWorldLayer.tsx       # Background + sprites
│   │   ├── SpriteRenderer.tsx       # Character rendering
│   │   ├── BackgroundRenderer.tsx   # Background effects
│   │   ├── UIGridOverlay.tsx        # UI positioning system
│   │   ├── PhaseIndicator.tsx       # Route progress
│   │   ├── PointDisplay.tsx         # Point tracking UI
│   │   ├── NavigationControls.tsx   # Mute/debug buttons
│   │   ├── ChoiceModal.tsx          # Choice selection UI
│   │   ├── CompletionScreen.tsx     # Ending screen
│   │   └── ... (other UI components)
│   │
│   ├── stores/
│   │   ├── vnStore.ts               # Game state management
│   │   └── audioStore.ts            # Audio state management
│   │
│   ├── types/
│   │   ├── vn.ts                    # Core type definitions
│   │   └── ui.ts                    # UI type definitions
│   │
│   └── content/
│       └── exampleStory.ts          # Example game story
│
└── App.tsx                           # Your app entry point
```

---

## 🎨 Feature Details

### Audio System 🎵

Full-featured audio with crossfading and volume control:

```typescript
{
  id: "dramatic_scene",
  text: "Something feels wrong...",
  audio: {
    bgm: {
      src: "/audio/bgm/tension.mp3",
      loop: true,
      volume: 0.8,
      fadeIn: { duration: 2, easing: "ease-in" },
      fadeOut: { duration: 1.5, easing: "ease-out" }
    },
    sfx: [
      {
        src: "/audio/sfx/thunder.wav",
        trigger: "onLoad",
        volume: 0.6
      }
    ]
  }
}
```

Features:

- ✅ BGM with smooth crossfading
- ✅ Multiple SFX triggers (onLoad, onClick, onChoice)
- ✅ Volume controls per track
- ✅ Prominent mute button
- ✅ Automatic cleanup on game reset

### Sprite System 🎭

Support for both simple and layered sprites:

**Simple Sprites:**

```typescript
{
  type: "simple",
  id: "alice",
  name: "Alice",
  baseImage: "/sprites/alice-neutral.png",
  expressions: {
    happy: "/sprites/alice-happy.png",
    sad: "/sprites/alice-sad.png"
  }
}
```

**Live2D-Style Layered Sprites:**

```typescript
{
  type: "live2d",
  id: "protagonist",
  name: "Hero",
  parts: [
    {
      id: "body",
      image: "/sprites/hero/body.png",
      zIndex: 1
    },
    {
      id: "mouth",
      image: "/sprites/hero/mouth-neutral.png",
      zIndex: 3,
      variants: {
        happy: "/sprites/hero/mouth-happy.png",
        sad: "/sprites/hero/mouth-sad.png"
      }
    },
    // ... more parts
  ],
  expressions: {
    happy: {
      name: "happy",
      partStates: { mouth: "happy", eyes: "open" }
    }
  }
}
```

### Background Effects 🖼️

Advanced background rendering with effects:

```typescript
{
  background: {
    image: "/backgrounds/forest.jpg",
    effects: {
      // Color grading
      brightness: 0.8,
      contrast: 1.2,
      saturation: 1.3,
      hue: 10,

      // Overlay
      overlay: {
        color: "rgba(0, 50, 100, 0.3)",
        blendMode: "multiply"
      },

      // Ken Burns zoom effect
      zoom: {
        enabled: true,
        startScale: 1.0,
        endScale: 1.1,
        duration: 8,
        direction: "in",
        easing: "ease-in-out"
      }
    }
  }
}
```

### Animated UI ✨

Smooth Motion animations throughout:

- **DialogueBox**: Typewriter effect with blinking cursor
- **ChoiceModal**: Staggered button animations with bounce effect
- **Sprites**: Fade/slide transitions
- **Backgrounds**: Smooth crossfading between scenes

---

## 🎯 Creating Content

### Basic Scene Structure

```typescript
{
  id: "forest_entrance",
  title: "Forest Path",
  slides: [
    {
      id: "slide_1",
      speaker: "Alice",
      text: "This forest gives me the creeps...",
      background: {
        image: "/backgrounds/forest.jpg"
      },
      sprites: [
        {
          characterId: "alice",
          expression: "worried",
          position: "center"
        }
      ],
      choices: [
        {
          text: "Press forward bravely",
          universalPoints: { courage: 2 },
          routePoints: { alice_bond: 1 }
        },
        {
          text: "Suggest turning back",
          universalPoints: { wisdom: 1 }
        }
      ]
    }
  ]
}
```

### Conditional Content

Show choices only when requirements are met:

```typescript
{
  text: "Use your magic to light the way",
  requires: { universal: { magic: 3 } },
  universalPoints: { magic: 1 },
  routePoints: { alice_bond: 2 }
}
```

### Secret Endings

High-priority endings with strict requirements:

```typescript
{
  id: "true_ending",
  name: "True Ending",
  isSecretEnding: true,
  priority: 10,
  requires: {
    universal: { courage: 5, wisdom: 5, magic: 5 },
    route: { alice_bond: 10 }
  },
  scenes: [/* epic conclusion */]
}
```

---

## 🎮 Controls

### Keyboard

- **Space / Enter** - Advance dialogue (when text is complete)
- **ESC** - Open/close choice modal
- **↑/↓** - Navigate choices
- **Enter** - Select choice

### Mouse

- **Click dialogue box** - Advance or complete text
- **Click choice** - Make selection
- **Click backdrop** - Close modal

---

## 🔧 Customization

### Typing Speed

```typescript
// In DialogueBox.tsx
const TYPING_SPEED = 50; // Characters per second
// 30 = slow/dramatic
// 50 = normal
// 80 = fast
```

### UI Colors

All UI uses Tailwind classes - customize in your tailwind.config:

```javascript
theme: {
  extend: {
    colors: {
      // Override default colors
    }
  }
}
```

### Animation Timing

All animations use Motion - adjust durations in component files:

```typescript
transition={{ duration: 0.3 }} // Make faster/slower
```

---

## 🏗️ Architecture

### State Management (Zustand)

- **vnStore** - Game progression, points, scenes
- **audioStore** - BGM, SFX, volume controls

### Modular Components

Each component handles one responsibility:

- `VisualNovel` - Main orchestrator
- `GameWorldLayer` - Visual rendering
- `DialogueBox` - Text presentation
- `ChoiceModal` - Player input
- `AudioManager` - Sound playback

### Environment Agnostic

- ✅ No localStorage (host app handles saves)
- ✅ No browser-specific APIs
- ✅ Works in Electron, web, anywhere React runs

---

## 📊 Example Flow

```
Player starts → Prologue begins
    ↓
Choice 1: "Be brave"
    → +2 courage
    ↓
Choice 2: "Help the stranger"
    → +1 kindness, +1 leadership
    ↓
Prologue ends → Route selection
    ↓
"Alice's Route" (requires 2+ kindness) ✅ Unlocked
    ↓
Route progresses...
    → Multiple choices build alice_bond
    ↓
Ending determined by total points
    → "Best Friends Ending" (requires 5+ alice_bond) ✅
    ↓
Completion screen shows all earned points
```

---

## 🚧 Future Enhancements

Potential additions (not yet implemented):

- **Gallery System** - CG/artwork collection
- **Skip System** - Skip seen dialogue
- **Auto-mode** - Automatic text advancement
- **Text History** - Review past dialogue

---

## 🛠️ Dependencies

**Runtime:**

```json
{
  "react": "^18.0.0 || ^19.0.0",
  "react-dom": "^18.0.0 || ^19.0.0",
  "zustand": "^5.0.0",
  "motion": "^12.0.0"
}
```

**Dev (for TypeScript):**

```json
{
  "@types/react": "^19.0.0",
  "@types/react-dom": "^19.0.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "autoprefixer": "^10.4.0",
  "postcss": "^8.4.0"
}
```

---

## 📄 License

MIT - Use freely in any project!

Perfect for:

- 🎮 Game jams
- 💼 Portfolio projects
- 🎓 Learning projects
- 💰 Commercial visual novels
- 🎨 Interactive stories

---

## 🙏 Credits

Built with React, TypeScript, Zustand, and Motion (formerly Framer Motion).

Designed for maximum portability and ease of use.

---

**Ready to create your visual novel?**

Start by copying the engine files, creating your story content, and running your project. The example story provides a complete template to build from!

🎮 Happy storytelling! ✨
