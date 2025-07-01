
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scissors, Clock, Users, Star, Video, Book } from 'lucide-react';

interface PaperCraftsToolProps {
  onClose: () => void;
}

const PaperCraftsTool = ({ onClose }: PaperCraftsToolProps) => {
  const [selectedCraft, setSelectedCraft] = useState<number | null>(null);
  const [completedCrafts, setCompletedCrafts] = useState<number[]>([]);

  const crafts = [
    { 
      title: '🎭 Paper Masks', 
      materials: ['Paper', 'Scissors', 'Crayons', 'String'], 
      time: '15 min',
      difficulty: 'Easy',
      steps: 5,
      category: 'Wearable'
    },
    { 
      title: '🌟 Paper Stars', 
      materials: ['Colored Paper', 'Glue', 'Glitter'], 
      time: '10 min',
      difficulty: 'Easy',
      steps: 4,
      category: 'Decoration'
    },
    { 
      title: '🦜 Origami Animals', 
      materials: ['Origami Paper', 'Instructions'], 
      time: '20 min',
      difficulty: 'Medium',
      steps: 8,
      category: 'Animals'
    },
    { 
      title: '🏠 Paper Houses', 
      materials: ['Cardboard', 'Paint', 'Glue', 'Scissors'], 
      time: '30 min',
      difficulty: 'Hard',
      steps: 10,
      category: 'Buildings'
    },
    { 
      title: '🌺 Paper Flowers', 
      materials: ['Tissue Paper', 'Wire', 'Green Tape'], 
      time: '25 min',
      difficulty: 'Medium',
      steps: 6,
      category: 'Nature'
    },
    { 
      title: '📚 Mini Books', 
      materials: ['Paper', 'Stapler', 'Markers'], 
      time: '20 min',
      difficulty: 'Easy',
      steps: 7,
      category: 'Educational'
    }
  ];

  const categories = ['All', 'Wearable', 'Decoration', 'Animals', 'Buildings', 'Nature', 'Educational'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredCrafts = crafts.filter(craft => 
    activeCategory === 'All' || craft.category === activeCategory
  );

  const startCraft = (index: number) => {
    setSelectedCraft(index);
    if (!completedCrafts.includes(index)) {
      setCompletedCrafts([...completedCrafts, index]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="font-fredoka text-3xl text-orange-700 mb-2">✂️ Paper Crafts Workshop</h3>
        <p className="font-comic text-gray-600">Create amazing crafts with simple materials!</p>
      </div>

      {/* Category Filter */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50">
        <div className="flex justify-center space-x-2 flex-wrap">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setActiveCategory(category)}
              variant={activeCategory === category ? "default" : "outline"}
              className={`font-comic mb-2 ${
                activeCategory === category 
                  ? 'gradient-orange text-white' 
                  : 'border-orange-300 hover:bg-orange-50'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCrafts.map((craft, index) => (
          <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-orange-200 bg-gradient-to-br from-white to-orange-50">
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 mb-4 text-center border-2 border-dashed border-orange-300 relative">
              <div className="text-6xl mb-2 animate-bounce">{craft.title.split(' ')[0]}</div>
              <p className="font-comic text-gray-600">Let's create together!</p>
              {completedCrafts.includes(index) && (
                <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                  Completed!
                </Badge>
              )}
            </div>
            
            <h4 className="font-fredoka text-lg font-bold text-gray-800 mb-3">{craft.title}</h4>
            
            <div className="space-y-2 text-sm mb-4">
              <div className="flex items-center justify-between">
                <span className="font-comic text-gray-600">Difficulty:</span>
                <Badge className={`font-comic ${
                  craft.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  craft.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {craft.difficulty}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-comic text-gray-600">Time:</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-gray-800">{craft.time}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-comic text-gray-600">Steps:</span>
                <span className="font-comic text-gray-800">{craft.steps} steps</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <h5 className="font-comic font-bold text-gray-800 mb-2">Materials needed:</h5>
              <div className="flex flex-wrap gap-1">
                {craft.materials.map((material, i) => (
                  <Badge key={i} variant="outline" className="font-comic text-xs">
                    {material}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                className="w-full gradient-orange text-white font-comic hover:scale-105 transition-transform"
                onClick={() => startCraft(index)}
              >
                <Scissors className="w-4 h-4 mr-2" />
                Start Crafting
              </Button>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1 font-comic">
                  <Video className="w-3 h-3 mr-1" />
                  Tutorial
                </Button>
                <Button size="sm" variant="outline" className="flex-1 font-comic">
                  <Book className="w-3 h-3 mr-1" />
                  Guide
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" className="font-comic" onClick={onClose}>
          Back to Creative Studio
        </Button>
      </div>
    </div>
  );
};

export default PaperCraftsTool;
