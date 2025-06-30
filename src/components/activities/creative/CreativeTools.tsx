
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Palette, Brush, Scissors, PenTool, Music, Camera, Sparkles } from 'lucide-react';

interface CreativeToolsProps {
  tool: string;
  onClose: () => void;
}

const CreativeTools = ({ tool, onClose }: CreativeToolsProps) => {
  const [activeColor, setActiveColor] = useState('#FF6B9D');
  const [brushSize, setBrushSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const colors = [
    '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  const renderDigitalDrawing = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-2xl text-purple-700">🎨 Digital Drawing Studio</h3>
        <div className="flex space-x-2">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-8 h-8 rounded-full border-2 ${activeColor === color ? 'border-gray-800' : 'border-gray-300'}`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-2xl p-6 shadow-lg border-4 border-purple-200">
        <div className="w-full h-80 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center">
          <div className="text-center">
            <Brush className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="font-comic text-gray-500">Click and drag to draw!</p>
            <p className="font-comic text-sm text-gray-400 mt-2">Use the colors above to paint</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <Button className="gradient-purple text-white font-comic">
          <Sparkles className="w-4 h-4 mr-2" />
          Add Magic Effect
        </Button>
        <Button variant="outline" className="font-comic">
          Save Artwork
        </Button>
      </div>
    </div>
  );

  const renderColoringPages = () => {
    const coloringPages = [
      { title: '🦋 Beautiful Butterfly', difficulty: 'Easy' },
      { title: '🌸 Flower Garden', difficulty: 'Medium' },
      { title: '🏰 Magic Castle', difficulty: 'Hard' },
      { title: '🐾 Cute Animals', difficulty: 'Easy' }
    ];

    return (
      <div className="space-y-6">
        <h3 className="font-fredoka text-2xl text-center text-pink-700">🖍️ Coloring Pages</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {coloringPages.map((page, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-pink-200">
              <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl mb-4 flex items-center justify-center border-2 border-dashed border-pink-300">
                <div className="text-center">
                  <div className="text-6xl mb-2">{page.title.split(' ')[0]}</div>
                  <p className="font-comic text-gray-600">Ready to color!</p>
                </div>
              </div>
              <h4 className="font-fredoka text-lg font-bold text-gray-800 mb-2">{page.title}</h4>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                  page.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  page.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {page.difficulty}
                </span>
                <Button size="sm" className="gradient-pink text-white font-comic">
                  <Palette className="w-4 h-4 mr-1" />
                  Color It!
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderPaperCrafts = () => {
    const crafts = [
      { title: '🎭 Paper Masks', materials: 'Paper, Scissors, Crayons', time: '15 min' },
      { title: '🌟 Paper Stars', materials: 'Colored Paper, Glue', time: '10 min' },
      { title: '🦜 Origami Animals', materials: 'Origami Paper', time: '20 min' },
      { title: '🏠 Paper Houses', materials: 'Cardboard, Paint', time: '30 min' }
    ];

    return (
      <div className="space-y-6">
        <h3 className="font-fredoka text-2xl text-center text-orange-700">✂️ Paper Crafts Workshop</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {crafts.map((craft, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 border-2 border-orange-200">
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 mb-4 text-center border-2 border-dashed border-orange-300">
                <div className="text-6xl mb-2">{craft.title.split(' ')[0]}</div>
                <p className="font-comic text-gray-600">Let's create together!</p>
              </div>
              <h4 className="font-fredoka text-lg font-bold text-gray-800 mb-2">{craft.title}</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="font-comic text-gray-600">Materials:</span>
                  <span className="font-comic ml-2 text-gray-800">{craft.materials}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-comic text-gray-600">Time:</span>
                  <span className="font-comic ml-2 text-gray-800">{craft.time}</span>
                </div>
              </div>
              <Button className="w-full mt-4 gradient-orange text-white font-comic">
                <Scissors className="w-4 h-4 mr-2" />
                Start Crafting
              </Button>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderMusicMaker = () => {
    const instruments = ['🎹', '🥁', '🎸', '🎺', '🎻', '🪘'];
    const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'];

    return (
      <div className="space-y-6">
        <h3 className="font-fredoka text-2xl text-center text-blue-700">🎵 Music Maker Studio</h3>
        
        <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200">
          <div className="text-center mb-6">
            <h4 className="font-fredoka text-xl text-blue-800 mb-4">Virtual Instruments</h4>
            <div className="flex justify-center space-x-4 mb-6">
              {instruments.map((instrument, index) => (
                <button
                  key={index}
                  className="text-5xl hover:scale-110 transition-transform duration-200 p-2 rounded-xl hover:bg-white/50"
                  onClick={() => console.log(`Playing ${instrument}`)}
                >
                  {instrument}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-6">
            {notes.map((note, index) => (
              <button
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-blue-50 border-2 border-blue-200"
                onClick={() => console.log(`Playing note ${note}`)}
              >
                <div className="font-fredoka text-lg text-blue-700">{note}</div>
              </button>
            ))}
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button className="gradient-blue text-white font-comic">
              <Music className="w-4 h-4 mr-2" />
              Record Song
            </Button>
            <Button variant="outline" className="font-comic">
              Play Back
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  const getToolContent = () => {
    switch (tool) {
      case 'Digital Drawing':
        return renderDigitalDrawing();
      case 'Coloring Pages':
        return renderColoringPages();
      case 'Paper Crafts':
        return renderPaperCrafts();
      case 'Rhythm Maker':
        return renderMusicMaker();
      default:
        return <div>Tool not found</div>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="font-fredoka text-3xl gradient-purple bg-clip-text text-transparent">
              🎨 Creative Studio
            </h2>
            <Button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          {getToolContent()}
        </div>
      </div>
    </div>
  );
};

export default CreativeTools;
