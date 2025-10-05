import { VisualNovel } from './components/VisualNovel';
import { exampleStory } from './content/exampleStory';

function App() {
  return (
    <div className="App">
      <VisualNovel story={exampleStory} className='w-full h-full' />
    </div>
  );
}

export default App;