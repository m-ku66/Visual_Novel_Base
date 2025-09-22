import { VisualNovel } from './components/VisualNovel';
import { exampleStory } from './content/exampleStory';

function App() {
  return (
    <div className="App">
      <header style={{ textAlign: 'center', padding: '20px', background: '#1a1a1a' }}>
        <h1 style={{ color: 'white', margin: 0 }}>Visual Novel Demo</h1>
        <p style={{ color: '#888', margin: '5px 0 0 0' }}>
          Simple VN system for React + Zustand
        </p>
      </header>

      <VisualNovel story={exampleStory} />
    </div>
  );
}

export default App;