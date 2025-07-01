
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Type } from 'lucide-react';

const StoryBuilderTool = () => {
  const [storyTitle, setStoryTitle] = useState('');
  const [storyContent, setStoryContent] = useState('');
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([]);

  const characters = ['🦸‍♂️', '🧚‍♀️', '🐻', '🦄', '🐸', '👑', '🐱', '🦉'];

  const toggleCharacter = (char: string) => {
    setSelectedCharacters(prev => 
      prev.includes(char) 
        ? prev.filter(c => c !== char)
        : [...prev, char]
    );
  };

  const previewStory = () => {
    if (!storyTitle || !storyContent) {
      alert('Please add a title and story content first!');
      return;
    }
    
    console.log('Previewing story:', { title: storyTitle, content: storyContent, characters: selectedCharacters });
    alert(`📖 Preview: "${storyTitle}"\n\nCharacters: ${selectedCharacters.join(' ')}\n\nStory: ${storyContent.substring(0, 100)}...`);
  };

  return (
    <div className="space-y-6">
      <Card className="p-4 bg-gradient-to-br from-green-50 to-blue-50">
        <h3 className="font-fredoka font-bold text-lg mb-4">📚 Create Your Story</h3>
        <div className="space-y-4">
          <div>
            <label className="font-comic font-bold text-gray-700 block mb-2">Story Title:</label>
            <input
              type="text"
              placeholder="Enter your story title..."
              className="w-full p-3 border-2 border-purple-200 rounded-xl font-comic"
              value={storyTitle}
              onChange={(e) => setStoryTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="font-comic font-bold text-gray-700 block mb-2">Choose Characters:</label>
            <div className="grid grid-cols-4 gap-3">
              {characters.map((char) => (
                <button
                  key={char}
                  onClick={() => toggleCharacter(char)}
                  className={`w-16 h-16 border-2 rounded-xl text-3xl transition-all ${
                    selectedCharacters.includes(char)
                      ? 'border-purple-500 bg-purple-100'
                      : 'border-purple-200 hover:bg-purple-100'
                  }`}
                >
                  {char}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-white">
        <h3 className="font-fredoka font-bold text-lg mb-4">✍️ Write Your Story</h3>
        <textarea
          placeholder="Once upon a time..."
          rows={8}
          className="w-full p-4 border-2 border-gray-300 rounded-xl font-comic text-lg resize-none"
          value={storyContent}
          onChange={(e) => setStoryContent(e.target.value)}
        />
        <div className="flex justify-between items-center mt-4">
          <div className="flex space-x-2">
            <Button variant="outline" className="font-comic">
              <Book className="w-4 h-4 mr-2" />
              Add Page
            </Button>
            <Button variant="outline" className="font-comic">
              <Type className="w-4 h-4 mr-2" />
              Format Text
            </Button>
          </div>
          <Button 
            className="gradient-purple text-white font-comic"
            onClick={previewStory}
          >
            📖 Preview Story
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default StoryBuilderTool;
