
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Palette, Brush, Undo2, RotateCcw, Sparkles, Play } from 'lucide-react';

const Paint = () => {
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [brushSize, setBrushSize] = useState([8]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentObject, setCurrentObject] = useState('horse');
  const [coloredObjects, setColoredObjects] = useState(new Set());
  const [showAnimation, setShowAnimation] = useState('');
  const [coloringProgress, setColoringProgress] = useState({});
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    '#FF6B35', '#2196F3', '#8BC34A', '#9C27B0', 
    '#FF5722', '#FFC107', '#E91E63', '#00BCD4',
    '#795548', '#607D8B', '#FF9800', '#4CAF50',
    '#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD'
  ];

  const objects = [
    {
      id: 'horse',
      name: 'Horse',
      emoji: '🐎',
      action: 'gallop around the meadow',
      sound: 'Neigh! 🎵',
      animation: 'animate-bounce-gentle'
    },
    {
      id: 'butterfly',
      name: 'Butterfly',
      emoji: '🦋',
      action: 'flutter its colorful wings',
      sound: 'Flutter flutter! ✨',
      animation: 'animate-float'
    },
    {
      id: 'flower',
      name: 'Flower',
      emoji: '🌸',
      action: 'bloom and sparkle in the sun',
      sound: 'Bloom! 🌺',
      animation: 'animate-pulse-soft'
    },
    {
      id: 'car',
      name: 'Car',
      emoji: '🚗',
      action: 'honk and drive away',
      sound: 'Beep beep! 🚗',
      animation: 'animate-bounce-gentle'
    },
    {
      id: 'cat',
      name: 'Cat',
      emoji: '🐱',
      action: 'purr and play with yarn',
      sound: 'Meow! 😻',
      animation: 'animate-bounce-gentle'
    },
    {
      id: 'tree',
      name: 'Tree',
      emoji: '🌳',
      action: 'sway in the gentle breeze',
      sound: 'Whoosh! 🍃',
      animation: 'animate-float'
    },
    {
      id: 'fish',
      name: 'Fish',
      emoji: '🐠',
      action: 'swim happily in the ocean',
      sound: 'Blub blub! 🌊',
      animation: 'animate-float'
    },
    {
      id: 'sun',
      name: 'Sun',
      emoji: '☀️',
      action: 'shine bright and warm',
      sound: 'Shine shine! ✨',
      animation: 'animate-pulse-soft'
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize[0];
    context.globalCompositeOperation = 'source-over';
    contextRef.current = context;
  }, [currentColor, brushSize]);

  const getMousePos = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(event);
    if (!contextRef.current) return;

    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
    
    // Simulate coloring progress
    const currentProgress = coloringProgress[currentObject] || 0;
    const newProgress = Math.min(currentProgress + 10, 100);
    
    setColoringProgress(prev => ({
      ...prev,
      [currentObject]: newProgress
    }));

    if (newProgress >= 50 && !coloredObjects.has(currentObject)) {
      setColoredObjects(prev => new Set([...prev, currentObject]));
      triggerAnimation();
    }
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    
    const pos = getMousePos(event);
    contextRef.current.lineTo(pos.x, pos.y);
    contextRef.current.stroke();
  };

  const triggerAnimation = () => {
    setShowAnimation(currentObject);
    setTimeout(() => {
      setShowAnimation('');
    }, 4000);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context) return;

    context.clearRect(0, 0, canvas.width, canvas.height);
    setColoringProgress(prev => ({
      ...prev,
      [currentObject]: 0
    }));
    setColoredObjects(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentObject);
      return newSet;
    });
  };

  const playAction = () => {
    if (coloredObjects.has(currentObject)) {
      triggerAnimation();
    }
  };

  const currentObjectData = objects.find(obj => obj.id === currentObject);
  const currentProgress = coloringProgress[currentObject] || 0;

  return (
    <div className="space-y-6">
      {/* Paint Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-pink rounded-full mx-auto mb-3 flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🎨 Paint & Play Studio
          </h2>
          <p className="font-comic text-gray-600">
            Color the objects and watch them come to life with amazing animations!
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Coloring Canvas */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-fredoka font-bold text-lg text-gray-800">
                Color the {currentObjectData?.name} {currentObjectData?.emoji}
              </h3>
              <div className="flex space-x-2">
                {coloredObjects.has(currentObject) && (
                  <Button size="sm" onClick={playAction} className="rounded-full gradient-green text-white">
                    <Play className="w-4 h-4 mr-1" />
                    Play
                  </Button>
                )}
                <Button size="sm" variant="outline" onClick={clearCanvas} className="rounded-full">
                  <Undo2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-purple-400 to-pink-400 h-full transition-all duration-500 rounded-full"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
            <p className="font-comic text-sm text-gray-600 text-center">
              {currentProgress < 50 ? 'Keep coloring!' : 'Great job! Your object is ready to play!'}
            </p>

            {/* Enhanced Canvas Area */}
            <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-dashed border-purple-200">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                className="w-full h-80 cursor-crosshair border-2 border-white rounded-lg shadow-inner bg-white"
                style={{ maxWidth: '100%', height: '300px' }}
              />

              {/* Animation Overlay */}
              {showAnimation === currentObject && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${currentObjectData?.animation} z-10`}>
                  <div className="text-8xl mb-4">
                    {currentObjectData?.emoji}
                  </div>
                  <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-comic font-bold text-lg shadow-lg">
                    <Sparkles className="w-5 h-5 inline mr-2" />
                    {currentObjectData?.sound}
                  </div>
                  <div className="mt-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-comic text-sm">
                    I {currentObjectData?.action}!
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Brush Controls */}
            <div className="space-y-4 bg-gray-50 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Brush className="w-5 h-5 text-purple-600" />
                <span className="font-comic font-bold text-purple-800">Brush Size:</span>
                <div className="flex-1 max-w-32">
                  <Slider
                    value={brushSize}
                    onValueChange={setBrushSize}
                    max={25}
                    min={3}
                    step={1}
                    className="w-full"
                  />
                </div>
                <span className="font-comic text-sm text-purple-600 font-bold">{brushSize[0]}px</span>
              </div>

              {/* Enhanced Color Palette */}
              <div className="space-y-2">
                <span className="font-comic font-bold text-purple-800">Choose Colors:</span>
                <div className="grid grid-cols-8 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setCurrentColor(color)}
                      className={`w-10 h-10 rounded-full border-3 transition-all transform hover:scale-110 ${
                        currentColor === color ? 'border-purple-600 scale-110 shadow-lg' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Object Selection */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🎭 Choose Your Character
          </h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {objects.map((object) => (
              <Card
                key={object.id}
                className={`p-4 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                  currentObject === object.id 
                    ? 'border-purple-400 bg-purple-50 shadow-lg' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => setCurrentObject(object.id)}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">{object.emoji}</div>
                  <h4 className="font-comic font-bold text-gray-800">{object.name}</h4>
                  {coloredObjects.has(object.id) && (
                    <Badge className="bg-green-100 text-green-700 font-comic text-xs">
                      ✨ Ready to Play!
                    </Badge>
                  )}
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-pink-400 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${coloringProgress[object.id] || 0}%` }}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Enhanced Instructions */}
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
              <h4 className="font-comic font-bold text-blue-800 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 mr-2" />
                How to Play:
              </h4>
              <ol className="font-comic text-sm text-blue-700 space-y-1">
                <li>🎯 Choose your favorite character</li>
                <li>🎨 Pick beautiful colors from the palette</li>
                <li>✏️ Draw and color on the white canvas</li>
                <li>🎪 Watch it come alive with sounds and actions!</li>
              </ol>
            </div>

            {/* Achievement Progress */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <span className="font-comic font-bold text-purple-800 flex items-center">
                  🏆 Your Progress
                </span>
                <span className="font-comic text-sm text-purple-600 font-bold">
                  {coloredObjects.size}/{objects.length} completed
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${(coloredObjects.size / objects.length) * 100}%` }}
                />
              </div>
              {coloredObjects.size === objects.length && (
                <p className="font-comic text-purple-700 text-center mt-2 font-bold">
                  🎉 Amazing! You colored all the characters!
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Paint;
