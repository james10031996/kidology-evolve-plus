
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Palette, Brush, Image, Sparkles, Download, Undo2 } from 'lucide-react';

const CreativeArtStudio = () => {
  const [currentTool, setCurrentTool] = useState('brush');
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [isDrawing, setIsDrawing] = useState(false);

  const colors = [
    '#FF6B35', '#2196F3', '#8BC34A', '#9C27B0', 
    '#FF5722', '#FFC107', '#E91E63', '#00BCD4'
  ];

  const artActivities = [
    {
      id: 1,
      title: 'Digital Painting',
      description: 'Create beautiful digital artwork with brushes and colors',
      icon: '🎨',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Pattern Designer',
      description: 'Design repeating patterns and shapes',
      icon: '🔸',
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: 'Story Illustration',
      description: 'Draw pictures to go with your favorite stories',
      icon: '📚',
      difficulty: 'Easy'
    },
    {
      id: 4,
      title: 'Pixel Art Creator',
      description: 'Make retro-style pixel art masterpieces',
      icon: '🎮',
      difficulty: 'Hard'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Art Canvas */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-fredoka font-bold text-xl text-gray-800">
            🎨 Art Canvas
          </h3>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="rounded-full">
              <Undo2 className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="outline" className="rounded-full">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Drawing Canvas Area */}
        <div className="bg-white rounded-xl p-4 mb-4 shadow-inner">
          <div className="w-full h-64 bg-white border-2 border-dashed border-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <Brush className="w-12 h-12 mx-auto mb-2" />
              <p className="font-comic">Start creating your masterpiece!</p>
            </div>
          </div>
        </div>

        {/* Tools */}
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {['brush', 'eraser', 'fill'].map((tool) => (
              <Button
                key={tool}
                size="sm"
                variant={currentTool === tool ? "default" : "outline"}
                onClick={() => setCurrentTool(tool)}
                className="rounded-full"
              >
                {tool === 'brush' && <Brush className="w-4 h-4" />}
                {tool === 'eraser' && '🧽'}
                {tool === 'fill' && '🪣'}
              </Button>
            ))}
          </div>

          {/* Color Palette */}
          <div className="flex space-x-1">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`w-8 h-8 rounded-full border-2 ${
                  currentColor === color ? 'border-gray-800' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Art Activities */}
      <div className="grid md:grid-cols-2 gap-4">
        {artActivities.map((activity) => (
          <Card key={activity.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <h4 className="font-fredoka font-bold text-gray-800">{activity.title}</h4>
            </div>
            <p className="font-comic text-sm text-gray-600 mb-3 text-center">
              {activity.description}
            </p>
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="font-comic text-xs">
                {activity.difficulty}
              </Badge>
              <Button size="sm" className="gradient-purple text-white font-comic font-bold rounded-full">
                Start
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreativeArtStudio;
