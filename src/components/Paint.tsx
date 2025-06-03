
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Palette, Brush, Undo2, RotateCcw, Sparkles } from 'lucide-react';

const Paint = () => {
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [brushSize, setBrushSize] = useState([5]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentObject, setCurrentObject] = useState('horse');
  const [coloredObjects, setColoredObjects] = useState(new Set());
  const [showAnimation, setShowAnimation] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    '#FF6B35', '#2196F3', '#8BC34A', '#9C27B0', 
    '#FF5722', '#FFC107', '#E91E63', '#00BCD4',
    '#795548', '#607D8B', '#FF9800', '#4CAF50'
  ];

  const objects = [
    {
      id: 'horse',
      name: 'Horse',
      emoji: '🐎',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M50 150 Q60 120 80 100 Q100 80 120 90 Q140 100 150 120 L170 140 Q160 160 140 170 L120 180 Q100 170 80 160 Q60 155 50 150 Z"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="colorable-area"
          />
          <circle cx="110" cy="110" r="3" fill="#333" />
          <path d="M105 115 Q110 120 115 115" stroke="#333" strokeWidth="2" fill="none" />
        </svg>
      ),
      action: 'smile and gallop away',
      animation: 'animate-bounce-gentle'
    },
    {
      id: 'butterfly',
      name: 'Butterfly',
      emoji: '🦋',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M100 100 Q80 80 70 60 Q75 40 90 50 Q100 60 100 80"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="colorable-area"
          />
          <path
            d="M100 100 Q120 80 130 60 Q125 40 110 50 Q100 60 100 80"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="colorable-area"
          />
          <path
            d="M100 100 Q80 120 70 140 Q75 160 90 150 Q100 140 100 120"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="colorable-area"
          />
          <path
            d="M100 100 Q120 120 130 140 Q125 160 110 150 Q100 140 100 120"
            fill="white"
            stroke="#333"
            strokeWidth="2"
            className="colorable-area"
          />
          <line x1="100" y1="80" x2="100" y2="120" stroke="#333" strokeWidth="3" />
        </svg>
      ),
      action: 'flutter its wings and fly',
      animation: 'animate-float'
    },
    {
      id: 'flower',
      name: 'Flower',
      emoji: '🌸',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <circle cx="100" cy="100" r="15" fill="#FFD700" />
          <ellipse cx="100" cy="70" rx="12" ry="20" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <ellipse cx="130" cy="100" rx="20" ry="12" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <ellipse cx="100" cy="130" rx="12" ry="20" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <ellipse cx="70" cy="100" rx="20" ry="12" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <line x1="100" y1="130" x2="100" y2="170" stroke="#4CAF50" strokeWidth="4" />
        </svg>
      ),
      action: 'bloom and sparkle',
      animation: 'animate-pulse-soft'
    },
    {
      id: 'car',
      name: 'Car',
      emoji: '🚗',
      svg: (
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <rect x="50" y="110" width="100" height="40" rx="10" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <rect x="70" y="90" width="60" height="30" rx="8" fill="white" stroke="#333" strokeWidth="2" className="colorable-area" />
          <circle cx="75" cy="160" r="12" fill="#333" />
          <circle cx="125" cy="160" r="12" fill="#333" />
          <rect x="80" y="95" width="15" height="15" fill="#87CEEB" />
          <rect x="105" y="95" width="15" height="15" fill="#87CEEB" />
        </svg>
      ),
      action: 'honk and drive away',
      animation: 'animate-bounce-gentle'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 300;
    canvas.height = 300;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize[0];
    contextRef.current = context;
  }, [currentColor, brushSize]);

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!contextRef.current) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
    
    // Check if enough coloring has been done (simplified check)
    if (!coloredObjects.has(currentObject)) {
      setColoredObjects(prev => new Set([...prev, currentObject]));
      triggerAnimation();
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const { offsetX, offsetY } = event.nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  const triggerAnimation = () => {
    const currentObj = objects.find(obj => obj.id === currentObject);
    if (currentObj) {
      setShowAnimation(currentObject);
      setTimeout(() => {
        setShowAnimation('');
      }, 3000);
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setColoredObjects(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentObject);
      return newSet;
    });
  };

  const resetAll = () => {
    clearCanvas();
    setColoredObjects(new Set());
    setShowAnimation('');
  };

  const currentObjectData = objects.find(obj => obj.id === currentObject);

  return (
    <div className="space-y-6">
      {/* Paint Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-pink rounded-full mx-auto mb-3 flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🎨 Paint & Play
          </h2>
          <p className="font-comic text-gray-600">
            Color the objects and watch them come to life!
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Coloring Canvas */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fredoka font-bold text-lg text-gray-800">
                Color the {currentObjectData?.name} {currentObjectData?.emoji}
              </h3>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" onClick={clearCanvas} className="rounded-full">
                  <Undo2 className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={resetAll} className="rounded-full">
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Object Display with Canvas Overlay */}
            <div className="relative bg-gray-50 rounded-xl p-4">
              <div className="w-full h-72 relative">
                {/* Background Object */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48">
                    {currentObjectData?.svg}
                  </div>
                </div>
                
                {/* Drawing Canvas */}
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseUp={finishDrawing}
                  onMouseMove={draw}
                  className="absolute inset-0 cursor-pointer"
                  style={{ mixBlendMode: 'multiply' }}
                />
              </div>

              {/* Animation Overlay */}
              {showAnimation === currentObject && (
                <div className={`absolute inset-0 flex items-center justify-center ${currentObjectData?.animation}`}>
                  <div className="text-6xl">
                    {currentObjectData?.emoji}
                  </div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic text-sm">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    {currentObjectData?.action}!
                  </div>
                </div>
              )}
            </div>

            {/* Brush Controls */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Brush className="w-4 h-4 text-gray-600" />
                <span className="font-comic text-sm text-gray-700">Brush Size:</span>
                <div className="flex-1 max-w-32">
                  <Slider
                    value={brushSize}
                    onValueChange={setBrushSize}
                    max={20}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="font-comic text-sm text-gray-600">{brushSize[0]}px</span>
              </div>

              {/* Color Palette */}
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      currentColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Object Selection */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            Choose an Object to Color
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            {objects.map((object) => (
              <Card
                key={object.id}
                className={`p-4 cursor-pointer transition-all hover:scale-105 border-2 ${
                  currentObject === object.id 
                    ? 'border-purple-300 bg-purple-50' 
                    : 'border-gray-200 hover:border-purple-200'
                }`}
                onClick={() => setCurrentObject(object.id)}
              >
                <div className="text-center space-y-2">
                  <div className="text-3xl">{object.emoji}</div>
                  <h4 className="font-comic font-bold text-gray-800">{object.name}</h4>
                  {coloredObjects.has(object.id) && (
                    <Badge className="bg-green-100 text-green-700 font-comic text-xs">
                      Colored! ✨
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h4 className="font-comic font-bold text-blue-800 mb-2">How to Play:</h4>
            <ol className="font-comic text-sm text-blue-700 space-y-1">
              <li>1. Choose an object to color</li>
              <li>2. Pick your favorite colors</li>
              <li>3. Draw on the object to color it</li>
              <li>4. Watch it come to life! ✨</li>
            </ol>
          </div>

          {/* Progress */}
          <div className="mt-4 bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-purple-800">Progress</span>
              <span className="font-comic text-sm text-purple-600">
                {coloredObjects.size}/{objects.length} colored
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(coloredObjects.size / objects.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Paint;
