# Visual Novel System Base

A lightweight, exportable visual novel system for React + Zustand with a sophisticated hybrid point system for complex branching narratives.

## ✨ Features Overview

- **Hybrid Point System**: Universal, route-specific, and prologue points
- **Conditional Content**: Choices and scenes that appear based on player progression
- **Smart Ending Selection**: Priority-based ending determination with multiple requirements
- **Secret Content**: Hidden routes and endings unlocked through specific choices
- **Achievement System**: Track player accomplishments and unlocked endings
- **Real-time Point Visualization**: See point gains and current totals
- **Modular Architecture**: Easy to extend and customize

## 📖 Story Structure

```
Prologue (shared) ──┐
                    ├── Route A ──┬── Ending A1 (friendship)
                    │             ├── Ending A2 (romance)
                    │             └── Ending A3 (secret/sage)
                    ├── Route B ──┬── Ending B1 (scholar)
                    │             ├── Ending B2 (mage)
                    │             └── Ending B3 (secret/archmage)
                    └── Unity Route ──── Ending U1 (secret/leader)
                                     (requires prologue leadership)
```

## 🎯 Point System Architecture

### Three Point Types Working Together:

1. **Universal Points** - Carry across all routes

   - `courage`, `kindness`, `wisdom`, `magic`
   - Affect route access and ending requirements
   - Display in blue in the UI

2. **Prologue Points** - Early choices that matter

   - `dragon_encounter`, `leadership`
   - Determine which routes become available
   - Display in purple in the UI

3. **Route Points** - Relationship and skill progression
   - `alice_bond`, `bob_trust`, `survival_skills`
   - Specific to each route's narrative
   - Display in green in the UI

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install zustand react react-dom
```

### 2. Copy Files

Copy these files into your React project:

- `types/vn.ts` - Types with point system
- `stores/vnStore.ts` - Main game store with point logic
- `components/VisualNovel.tsx` - UI component
- `content/exampleStory.ts` - Complete example story

### 3. Use in Your App

```tsx
import { VisualNovel } from "./components/VisualNovel";
import { exampleStory } from "./content/exampleStory";

function App() {
  return <VisualNovel story={exampleStory} />;
}
```

## 🏗️ Creating Your Story

### Object-Based Story Structure

```typescript
import { GameStory } from "./types/vn";

export const myStory: GameStory = {
  title: "My Epic Adventure",
  description: "A tale of courage and friendship",

  // Define your point types (optional but recommended)
  pointTypes: {
    universal: {
      courage: "Courage",
      wisdom: "Wisdom",
    },
    prologue: {
      first_choice: "First Impression",
    },
    route: {
      character_bond: "Character Bond",
    },
  },

  prologue: [
    {
      id: "intro",
      title: "Beginning",
      slides: [
        {
          id: "opening",
          text: "Your story starts here...",
          choices: [
            {
              text: "Be brave",
              universalPoints: { courage: 2 },
              prologuePoints: { first_choice: 1 },
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
    hero_route: {
      id: "hero_route",
      name: "Hero's Path",
      // Route only accessible with courage
      requires: { universal: { courage: 2 } },
      scenes: [
        /* your scenes */
      ],
      endings: [
        {
          id: "true_hero",
          name: "True Hero",
          priority: 3, // Higher priority = preferred ending
          requires: {
            universal: { courage: 5 },
            route: { character_bond: 3 },
          },
          scenes: [
            /* ending scenes */
          ],
        },
      ],
    },
  },
};
```

### Adding Conditional Content

```typescript
// Choices that only appear with certain points
{
  id: "magic_choice",
  text: "Use your magical knowledge",
  choices: [
    {
      text: "Cast a healing spell",
      requires: { universal: { magic: 3 } }, // Only shows if player has 3+ magic
      universalPoints: { magic: 1, kindness: 2 },
      routePoints: { character_bond: 3 }
    }
  ]
}

// Scenes that require specific progression
{
  id: "secret_scene",
  title: "Hidden Knowledge",
  requires: {
    universal: { wisdom: 4 },
    prologue: { scholar_path: 1 }
  },
  slides: [/* secret content */]
}
```

### Creating Secret Endings

```typescript
{
  id: "secret_master",
  name: "Secret Master Ending",
  isSecretEnding: true,
  achievementName: "Master of All Arts",
  priority: 10, // Highest priority
  requires: {
    universal: { courage: 5, wisdom: 5, magic: 5 },
    route: { perfect_bond: 5 }
  },
  scenes: [/* epic secret ending */]
}
```

## 💡 Advanced Features

### ✅ Currently Implemented

- **Hybrid Point System**: Universal, route, and prologue points
- **Conditional Choices**: Options that appear based on player progression
- **Smart Ending Selection**: Priority-based with multiple requirements
- **Secret Content**: Hidden routes and endings
- **Real-time UI**: Point tracking with hover previews
- **Achievement System**: Track unlocked endings
- **Enhanced Debug Tools**: Comprehensive progression tracking
- **Point Visualization**: Color-coded point types in UI
- **Requirement Filtering**: Automatic choice/scene filtering

### 🚧 Future Enhancements (Easy to Add)

- **Character Sprite Suite**: Visual character representations
- **Background Image Suite**: Scene-specific backgrounds
- **Sound Effect Suite**: Audio feedback for choices
- **Save/Load System**: Player progress persistence
- **Multiple Save Slots**: Different playthroughs
- **Gallery Mode**: View unlocked scenes/endings
- **Point History**: Track how points were earned

## 📂 File Structure

```
src/
├── types/
│   └── vn.ts           # Enhanced types with point system
├── stores/
│   └── vnStore.ts      # Zustand store with point logic
├── components/
│   └── VisualNovel.tsx # Enhanced UI with point display
├── content/
│   └── exampleStory.ts # Full-featured example story
└── App.tsx             # Usage example
```

## 🎨 Customization

### Point System Configuration

```typescript
// Customize point types for your story
pointTypes: {
  universal: {
    strength: "Physical Strength",
    intelligence: "Intelligence",
    charisma: "Charisma"
  },
  prologue: {
    background: "Character Background",
    motivation: "Core Motivation"
  },
  route: {
    trust_alice: "Trust with Alice",
    magic_mastery: "Magical Mastery"
  }
}
```

### UI Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Override the main container
<VisualNovel story={myStory} className="my-custom-styles" />

// The component includes:
// - Point indicators (blue/green/purple)
// - Hover effects showing point gains
// - Responsive design
// - Dark theme by default
```

### Story Content Organization

```typescript
// Organize large stories across multiple files
import { prologueScenes } from "./prologue";
import { aliceRoute } from "./routes/alice";
import { bobRoute } from "./routes/bob";

export const myStory: GameStory = {
  prologue: prologueScenes,
  routes: {
    alice: aliceRoute,
    bob: bobRoute,
  },
};
```

## 🔧 Integration Examples

### Next.js with TypeScript

```typescript
// pages/visual-novel.tsx
import { VisualNovel } from "../components/VisualNovel";
import { myStory } from "../content/myStory";

export default function VNPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <VisualNovel story={myStory} />
    </div>
  );
}
```

### Vite + React

```typescript
// src/pages/Game.tsx
import { VisualNovel } from "../components/VisualNovel";
import { adventureStory } from "../content/adventure";

export function GamePage() {
  return <VisualNovel story={adventureStory} />;
}
```

### Electron Desktop App

Works seamlessly - just include in your React renderer process.

## 📊 Example Point Flow

```
Player starts with 0 points
├── Prologue Choice 1: "Save the child"
│   └── Gains: +3 courage, +2 kindness, +2 dragon_encounter
├── Prologue Choice 2: "Sense magic"
│   └── Gains: +2 magic, +1 wisdom (requires 1 wisdom)
└── Route Selection: Alice Route unlocked
    ├── Route Choice 1: "Share herb knowledge"
    │   └── Gains: +1 wisdom, +2 alice_bond (requires 2 wisdom)
    └── Ending: "Forest Sage" unlocked
        └── Requires: 4 magic, 4 wisdom, 3 alice_bond ✓
```

## 🏆 Best Practices

1. **Start Simple**: Begin with 2-3 universal points and basic routes
2. **Test Requirements**: Use debug mode to verify point requirements
3. **Balance Progression**: Ensure multiple paths to important content
4. **Clear Feedback**: Use descriptive point names and choice descriptions
5. **Secret Content**: Hide special endings behind meaningful achievements
6. **Modular Design**: Keep routes and scenes in separate functions/files

## 🎮 Player Experience Features

- **Point Transparency**: Hover over choices to see point gains
- **Progress Tracking**: Real-time point totals in the header
- **Achievement System**: Visual feedback for unlocked endings
- **Smart Filtering**: Impossible choices are hidden, not grayed out
- **Rich Completion**: Final stats screen with all earned points
- **Replay Value**: Different choices lead to genuinely different experiences

## 📄 License

MIT - Use freely in any project! Perfect for game jams, portfolio projects, or commercial visual novels.

---

**Ready to create your epic visual novel?** Start with the example story and customize from there!
