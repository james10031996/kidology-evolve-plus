
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brush, Sparkles, Palette, Eraser, Undo2, Redo2 } from 'lucide-react';

interface DigitalDrawingToolProps {
  onClose: () => void;
}

const DigitalDrawingTool = ({ onClose }: DigitalDrawingToolProps) => {
  const [activeColor, setActiveColor] = useState('#FF6B9D');
  const [brushSize, setBrushSize] = useState(5);
  const [drawingMode, setDrawingMode] = useState<'brush' | 'eraser'>('brush');

  const colors = [
    '#FF6B9D', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
  ];

  const brushSizes = [2, 5, 10, 15, 20];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-2xl text-purple-700">🎨 Digital Drawing Studio</h3>
        <div className="flex items-center space-x-4">
          <Button
            onClick={() => setDrawingMode(drawingMode === 'brush' ? 'eraser' : 'brush')}
            variant="outline"
            className="font-comic"
          >
            {drawingMode === 'brush' ? <Eraser className="w-4 h-4" /> : <Brush className="w-4 h-4" />}
          </Button>
          <Button variant="outline" className="font-comic">
            <Undo2 className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="font-comic">
            <Redo2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Color Palette */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <h4 className="font-comic font-bold text-gray-800 mb-3">🎨 Color Palette</h4>
        <div className="flex justify-center space-x-2 mb-4">
          {colors.map((color, index) => (
            <button
              key={index}
              className={`w-10 h-10 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
                activeColor === color ? 'border-gray-800 shadow-lg' : 'border-gray-300'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setActiveColor(color)}
            />
          ))}
        </div>
        
        {/* Brush Size Selector */}
        <div className="flex items-center justify-center space-x-4">
          <span className="font-comic text-sm text-gray-600">Brush Size:</span>
          {brushSizes.map((size) => (
            <button
              key={size}
              onClick={() => setBrushSize(size)}
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                brushSize === size ? 'border-purple-500 bg-purple-100' : 'border-gray-300'
              }`}
            >
              <div 
                className="rounded-full bg-gray-700"
                style={{ width: Math.min(size, 20), height: Math.min(size, 20) }}
              />
            </button>
          ))}
        </div>
      </Card>
      
      {/* Drawing Canvas */}
      <Card className="p-6 bg-white shadow-lg border-4 border-purple-200">
        <div className="w-full h-96 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/20 to-pink-100/20"></div>
          <div className="text-center z-10">
            <Brush className="w-16 h-16 text-gray-400 mx-auto mb-4 animate-bounce" />
            <p className="font-comic text-gray-500 text-lg">Click and drag to draw!</p>
            <p className="font-comic text-sm text-gray-400 mt-2">Use the colors and brush sizes above</p>
          </div>
        </div>
      </Card>
      
      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button className="gradient-purple text-white font-comic animate-pulse">
          <Sparkles className="w-4 h-4 mr-2" />
          Add Magic Effect
        </Button>
        <Button variant="outline" className="font-comic border-purple-300 hover:bg-purple-50">
          <Palette className="w-4 h-4 mr-2" />
          Save Artwork
        </Button>
        <Button variant="outline" className="font-comic" onClick={onClose}>
          Close Studio
        </Button>
      </div>
    </div>
  );
};

export default DigitalDrawingTool;
