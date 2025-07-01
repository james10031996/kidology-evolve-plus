import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Palette, Brush, Music, Volume2, Book, Type } from 'lucide-react';
import MagicPaintStudio from './MagicPaintStudio';

interface CreativeToolsProps {
  tool: string;
  onClose: () => void;
}

const CreativeTools = ({ tool, onClose }: CreativeToolsProps) => {
  const [selectedColor, setSelectedColor] = useState('#ff0000');
  const [brushSize, setBrushSize] = useState(5);
  const [activeInstrument, setActiveInstrument] = useState('piano');

  const colors = [
    '#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff',
    '#ffa500', '#800080', '#ffc0cb', '#a52a2a', '#808080', '#000000'
  ];

  const instruments = [
    { id: 'piano', name: '🎹 Piano', sound: 'C4' },
    { id: 'guitar', name: '🎸 Guitar', sound: 'G3' },
    { id: 'drums', name: '🥁 Drums', sound: 'kick' },
    { id: 'violin', name: '🎻 Violin', sound: 'A4' }
  ];

  const playSound = (instrument: string) => {
    // Simulate sound playing
    console.log(`Playing ${instrument} sound`);
  };

  if (tool === 'Magic Paint Studio') {
    return (
      <div className="relative">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 p-0"
          variant="outline"
        >
          <X className="w-5 h-5" />
        </Button>
        <MagicPaintStudio />
      </div>
    );
  }

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-fredoka font-bold text-2xl text-gray-800">
          {tool}
        </h2>
        <Button onClick={onClose} variant="outline" className="rounded-full">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {tool === 'Coloring Pages' && (
        <div className="space-y-6">
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <h3 className="font-fredoka font-bold text-lg mb-4">🎨 Choose Your Colors</h3>
            <div className="grid grid-cols-6 gap-3 mb-4">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-full border-4 ${
                    selectedColor === color ? 'border-gray-800' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <span className="font-comic">Brush Size:</span>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="flex-1"
              />
              <span className="font-comic">{brushSize}px</span>
            </div>
          </Card>

          <Card className="p-4 aspect-video bg-white border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
            <div className="text-center">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="font-comic text-gray-600">Click and drag to color!</p>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl hover:bg-gray-50 cursor-pointer">
                  🌸
                </div>
                <div className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl hover:bg-gray-50 cursor-pointer">
                  🦋
                </div>
                <div className="w-20 h-20 border-2 border-gray-300 rounded-lg flex items-center justify-center text-4xl hover:bg-gray-50 cursor-pointer">
                  🏠
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tool === 'Music Maker' && (
        <div className="space-y-6">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <h3 className="font-fredoka font-bold text-lg mb-4">🎵 Choose Your Instrument</h3>
            <div className="grid grid-cols-2 gap-4">
              {instruments.map((instrument) => (
                <Button
                  key={instrument.id}
                  className={`p-4 h-16 text-lg font-comic ${
                    activeInstrument === instrument.id
                      ? 'gradient-purple text-white'
                      : 'bg-white border-2 border-purple-200 text-purple-600 hover:bg-purple-50'
                  }`}
                  onClick={() => setActiveInstrument(instrument.id)}
                >
                  {instrument.name}
                </Button>
              ))}
            </div>
          </Card>

          <Card className="p-6 bg-white">
            <h3 className="font-fredoka font-bold text-lg mb-4">🎹 Play Music</h3>
            <div className="grid grid-cols-7 gap-2 mb-6">
              {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((note) => (
                <Button
                  key={note}
                  className="h-16 bg-white border-2 border-gray-300 text-gray-800 hover:bg-blue-100 font-comic font-bold text-lg"
                  onClick={() => playSound(note)}
                >
                  {note}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button className="gradient-green text-white font-comic">
                <Volume2 className="w-4 h-4 mr-2" />
                Play Recording
              </Button>
              <Button variant="outline" className="font-comic">
                🔴 Record
              </Button>
            </div>
          </Card>
        </div>
      )}

      {tool === 'Story Builder' && (
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
                />
              </div>
              <div>
                <label className="font-comic font-bold text-gray-700 block mb-2">Choose Characters:</label>
                <div className="grid grid-cols-4 gap-3">
                  {['🦸‍♂️', '🧚‍♀️', '🐻', '🦄', '🐸', '👑', '🐱', '🦉'].map((char) => (
                    <button
                      key={char}
                      className="w-16 h-16 border-2 border-purple-200 rounded-xl hover:bg-purple-100 text-3xl"
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
              <Button className="gradient-purple text-white font-comic">
                📖 Preview Story
              </Button>
            </div>
          </Card>
        </div>
      )}

      {tool === 'Paper Crafts' && (
        <div className="space-y-6">
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-red-50">
            <h3 className="font-fredoka font-bold text-lg mb-4">✂️ Virtual Paper Crafts</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: 'Paper Plane', emoji: '✈️', difficulty: 'Easy' },
                { name: 'Origami Crane', emoji: '🕊️', difficulty: 'Medium' },
                { name: 'Paper Flower', emoji: '🌸', difficulty: 'Easy' },
                { name: 'Gift Box', emoji: '🎁', difficulty: 'Hard' },
                { name: 'Paper Hat', emoji: '🎩', difficulty: 'Easy' },
                { name: 'Butterfly', emoji: '🦋', difficulty: 'Medium' }
              ].map((craft) => (
                <Card key={craft.name} className="p-4 hover:shadow-lg cursor-pointer transition-all">
                  <div className="text-4xl text-center mb-2">{craft.emoji}</div>
                  <h4 className="font-comic font-bold text-center">{craft.name}</h4>
                  <p className="text-xs text-center text-gray-600">{craft.difficulty}</p>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tool === 'Sing Along' && (
        <div className="space-y-6">
          <Card className="p-4 bg-gradient-to-br from-pink-50 to-purple-50">
            <h3 className="font-fredoka font-bold text-lg mb-4">🎤 Nursery Rhymes & Songs</h3>
            <div className="space-y-3">
              {[
                { title: 'Twinkle Twinkle Little Star', emoji: '⭐' },
                { title: 'Old MacDonald Had a Farm', emoji: '🚜' },
                { title: 'The Wheels on the Bus', emoji: '🚌' },
                { title: 'Mary Had a Little Lamb', emoji: '🐑' },
                { title: 'Row Row Row Your Boat', emoji: '🚣' }
              ].map((song) => (
                <div key={song.title} className="flex items-center justify-between p-3 bg-white rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{song.emoji}</span>
                    <span className="font-comic font-bold">{song.title}</span>
                  </div>
                  <Button size="sm" className="gradient-pink text-white font-comic">
                    🎵 Play
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CreativeTools;