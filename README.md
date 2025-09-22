# Simple Visual Novel System

A lightweight, exportable visual novel system for React + Zustand projects.

## Structure

```
Prologue (shared)
├── Route A → Ending A1
├── Route B → Ending B1 / B2
└── Route C → Ending C1
```

## Quick Start

### 1. Install Dependencies

```bash
npm install zustand react
```

### 2. Copy Files

Copy these files into your React project:

- `types/vn.ts` - Core types
- `stores/vnStore.ts` - Main game store
- `components/VisualNovel.tsx` - UI component
- `content/exampleStory.ts` - Example story

### 3. Use in Your App

```tsx
import { VisualNovel } from "./components/VisualNovel";
import { exampleStory } from "./content/exampleStory";

function App() {
  return <VisualNovel story={exampleStory} />;
}
```

## Creating Your Story

### Basic Structure

```typescript
import { GameStory } from "./types/vn";

export const myStory: GameStory = {
  prologue: [
    {
      id: "intro",
      title: "Beginning",
      slides: [
        {
          text: "Your story starts here...",
          choices: [
            { text: "Choice A", routeId: "route_a" },
            { text: "Choice B", routeId: "route_b" },
          ],
        },
      ],
    },
  ],

  routes: {
    route_a: {
      id: "route_a",
      name: "Route A",
      scenes: [
        /* your scenes */
      ],
      endings: [
        /* your endings */
      ],
    },
  },
};
```

### Adding Scenes

```typescript
{
  id: 'scene1',
  title: 'Scene Title',
  characters: ['Alice', 'Bob'], // optional
  slides: [
    {
      speaker: 'Alice', // optional
      text: "Hello, world!"
    },
    {
      text: "Narration text here...",
      choices: [
        { text: "Continue to next scene" },
        { text: "Go to Route B", routeId: "route_b" }
      ]
    }
  ]
}
```

## Features

### ✅ Currently Implemented

- Prologue → Route branching
- Multiple routes with different scenes
- Route-specific endings
- Simple UI with continue/choice buttons
- Game completion detection
- Debug information

### 🚧 Future Features (Easy to Add)

- Point accumulation within routes
- Point-based ending selection
- Character sprites/images
- Sound effects
- Save/load system
- More UI customization

## File Structure

```
src/
├── types/
│   └── vn.ts           # Core VN types
├── stores/
│   └── vnStore.ts      # Zustand store
├── components/
│   └── VisualNovel.tsx # Main UI component
├── content/
│   └── exampleStory.ts # Story content
└── App.tsx             # Usage example
```

## Customization

### Styling

The `VisualNovel` component includes basic CSS-in-JS styles. You can:

- Override styles via the `className` prop
- Modify the built-in styles in the component
- Replace with your preferred styling solution

### Story Content

- Create new story files in `content/`
- Implement the `GameStory` interface
- Pass to `<VisualNovel story={yourStory} />`

### Adding Features

The system is designed to be easily extensible:

- Add new slide types in `types/vn.ts`
- Extend the store in `vnStore.ts`
- Modify the UI in `VisualNovel.tsx`

## Integration Examples

### Next.js

```typescript
// pages/vn.tsx
import { VisualNovel } from "../components/VisualNovel";
import { myStory } from "../content/myStory";

export default function VNPage() {
  return <VisualNovel story={myStory} />;
}
```

### Electron

Works out of the box - just include in your React app.

### Existing React App

Copy the files and import where needed. No global setup required!

## Tips

1. **Start Simple**: Begin with prologue + 1-2 basic routes
2. **Test Early**: Use the debug info to verify story flow
3. **Incremental**: Add point systems and complex branching later
4. **Modular**: Keep story content in separate files

## License

MIT - Use freely in any project!
