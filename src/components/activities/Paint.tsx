
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Palette, Brush, Undo2, RotateCcw, Sparkles, Play, Save, Download } from 'lucide-react';

const Paint = () => {
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [brushSize, setBrushSize] = useState([8]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentObject, setCurrentObject] = useState('horse');
  const [coloredObjects, setColoredObjects] = useState(new Set());
  const [showAnimation, setShowAnimation] = useState('');
  const [coloringProgress, setColoringProgress] = useState({});
  const [savedArtworks, setSavedArtworks] = useState([]);
  const [brushStyle, setBrushStyle] = useState('round');
  const [paintMode, setPaintMode] = useState('brush'); // brush, pattern, sticker
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);

  const colors = [
    '#FF6B35', '#2196F3', '#8BC34A', '#9C27B0', 
    '#FF5722', '#FFC107', '#E91E63', '#00BCD4',
    '#795548', '#607D8B', '#FF9800', '#4CAF50',
    '#FFB6C1', '#98FB98', '#87CEEB', '#DDA0DD',
    '#FF69B4', '#40E0D0', '#FFD700', '#FF1493',
    '#7FFF00', '#FF4500', '#DA70D6', '#00FFFF'
  ];

  const patterns = ['dots', 'stripes', 'stars', 'hearts'];
  const stickers = ['🌟', '❤️', '🎈', '🦋', '🌺', '🎭', '🎪', '🎨'];

  const objects = [
    {
      id: 'horse',
      name: 'Horse',
      emoji: '🐎',
      action: 'gallop around the meadow and neigh happily',
      sound: 'Neigh neigh! I love my new colors! 🎵',
      animation: 'animate-bounce-gentle',
      requiredProgress: 40
    },
    {
      id: 'butterfly',
      name: 'Butterfly',
      emoji: '🦋',
      action: 'flutter its colorful wings and dance in the air',
      sound: 'Flutter flutter! My wings are so beautiful! ✨',
      animation: 'animate-float',
      requiredProgress: 30
    },
    {
      id: 'flower',
      name: 'Flower',
      emoji: '🌸',
      action: 'bloom magnificently and sparkle in the sunlight',
      sound: 'Bloom! I am the most beautiful flower! 🌺',
      animation: 'animate-pulse-soft',
      requiredProgress: 35
    },
    {
      id: 'car',
      name: 'Car',
      emoji: '🚗',
      action: 'honk its horn and drive around the track',
      sound: 'Beep beep! Vroom vroom! Look at my colors! 🚗',
      animation: 'animate-bounce-gentle',
      requiredProgress: 45
    },
    {
      id: 'cat',
      name: 'Cat',
      emoji: '🐱',
      action: 'purr loudly and play with a colorful yarn ball',
      sound: 'Meow! Purr purr! I feel so pretty! 😻',
      animation: 'animate-bounce-gentle',
      requiredProgress: 40
    },
    {
      id: 'tree',
      name: 'Tree',
      emoji: '🌳',
      action: 'sway gently and drop colorful leaves',
      sound: 'Whoosh! My leaves are dancing! 🍃',
      animation: 'animate-float',
      requiredProgress: 50
    },
    {
      id: 'fish',
      name: 'Fish',
      emoji: '🐠',
      action: 'swim in beautiful circles and blow bubbles',
      sound: 'Blub blub! Swimming in rainbow colors! 🌊',
      animation: 'animate-float',
      requiredProgress: 35
    },
    {
      id: 'sun',
      name: 'Sun',
      emoji: '☀️',
      action: 'shine brightly and warm everyone with joy',
      sound: 'Shine shine! Spreading colorful warmth! ✨',
      animation: 'animate-pulse-soft',
      requiredProgress: 30
    },
    {
      id: 'rainbow',
      name: 'Rainbow',
      emoji: '🌈',
      action: 'arch across the sky with magnificent colors',
      sound: 'Look at my beautiful colors across the sky! 🌈',
      animation: 'animate-pulse-soft',
      requiredProgress: 60
    },
    {
      id: 'castle',
      name: 'Castle',
      emoji: '🏰',
      action: 'shine majestically and wave magical flags',
      sound: 'Welcome to my colorful castle! ✨',
      animation: 'animate-pulse-soft',
      requiredProgress: 70
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = 400;
    canvas.height = 400;
    const context = canvas.getContext('2d');
    if (!context) return;

    context.lineCap = brushStyle === 'round' ? 'round' : 'square';
    context.lineJoin = 'round';
    context.strokeStyle = currentColor;
    context.lineWidth = brushSize[0];
    context.globalCompositeOperation = 'source-over';
    contextRef.current = context;
  }, [currentColor, brushSize, brushStyle]);

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

    if (paintMode === 'sticker') {
      // Add sticker at position (simplified for demo)
      contextRef.current.font = '30px Arial';
      contextRef.current.fillText('🌟', pos.x, pos.y);
      updateProgress(15);
      return;
    }

    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    if (!contextRef.current) return;
    
    contextRef.current.closePath();
    setIsDrawing(false);
    updateProgress(10);
  };

  const draw = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;
    if (paintMode === 'sticker') return;
    
    const pos = getMousePos(event);
    
    if (paintMode === 'pattern') {
      // Add pattern brush effect
      for (let i = 0; i < 3; i++) {
        contextRef.current.beginPath();
        contextRef.current.arc(
          pos.x + (Math.random() - 0.5) * 10, 
          pos.y + (Math.random() - 0.5) * 10, 
          2, 0, 2 * Math.PI
        );
        contextRef.current.fill();
      }
    } else {
      contextRef.current.lineTo(pos.x, pos.y);
      contextRef.current.stroke();
    }
  };

  const updateProgress = (increment: number) => {
    const currentProgress = coloringProgress[currentObject] || 0;
    const currentObjectData = objects.find(obj => obj.id === currentObject);
    const requiredProgress = currentObjectData?.requiredProgress || 50;
    const newProgress = Math.min(currentProgress + increment, 100);
    
    setColoringProgress(prev => ({
      ...prev,
      [currentObject]: newProgress
    }));

    if (newProgress >= requiredProgress && !coloredObjects.has(currentObject)) {
      setColoredObjects(prev => new Set([...prev, currentObject]));
      triggerAnimation();
      playSound(`Congratulations! You've brought the ${currentObjectData?.name} to life!`);
    }
  };

  const triggerAnimation = () => {
    setShowAnimation(currentObject);
    setTimeout(() => {
      setShowAnimation('');
    }, 5000);
  };

  const playSound = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
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

  const saveArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const currentObjectData = objects.find(obj => obj.id === currentObject);
    const artwork = {
      id: Date.now(),
      objectName: currentObjectData?.name || 'Unknown',
      objectEmoji: currentObjectData?.emoji || '🎨',
      dataUrl: canvas.toDataURL(),
      timestamp: new Date().toLocaleString()
    };

    setSavedArtworks(prev => [artwork, ...prev].slice(0, 6)); // Keep last 6 artworks
    playSound('Artwork saved successfully!');
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `${objects.find(obj => obj.id === currentObject)?.name || 'artwork'}-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const playAction = () => {
    if (coloredObjects.has(currentObject)) {
      triggerAnimation();
      const currentObjectData = objects.find(obj => obj.id === currentObject);
      if (currentObjectData) {
        playSound(currentObjectData.sound);
      }
    }
  };

  const currentObjectData = objects.find(obj => obj.id === currentObject);
  const currentProgress = coloringProgress[currentObject] || 0;
  const requiredProgress = currentObjectData?.requiredProgress || 50;

  return (
    <div className="space-y-6">
      {/* Enhanced Paint Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-20 h-20 gradient-pink rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Palette className="w-10 h-10 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-3">
            🎨 Magic Paint Studio
          </h2>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Paint magical objects and watch them come alive with amazing animations, sounds, and special actions!
          </p>
          <div className="mt-4 flex items-center justify-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-comic font-bold">
              🎯 Completed: {coloredObjects.size}/{objects.length}
            </div>
            <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full font-comic font-bold">
              🖼️ Saved: {savedArtworks.length}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Enhanced Canvas Area */}
        <Card className="lg:col-span-2 p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-fredoka font-bold text-xl text-gray-800">
                Paint the {currentObjectData?.name} {currentObjectData?.emoji}
              </h3>
              <div className="flex space-x-2">
                {coloredObjects.has(currentObject) && (
                  <Button size="sm" onClick={playAction} className="rounded-full gradient-green text-white">
                    <Play className="w-4 h-4 mr-1" />
                    Animate!
                  </Button>
                )}
                <Button size="sm" onClick={saveArtwork} variant="outline" className="rounded-full">
                  <Save className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" onClick={downloadArtwork} variant="outline" className="rounded-full">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <Button size="sm" variant="outline" onClick={clearCanvas} className="rounded-full">
                  <Undo2 className="w-4 h-4 mr-1" />
                  Clear
                </Button>
              </div>
            </div>

            {/* Enhanced Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-comic text-sm font-bold text-gray-700">
                  Progress: {Math.round(currentProgress)}% 
                </span>
                <span className="font-comic text-xs text-gray-500">
                  Need {requiredProgress}% to animate
                </span>
              </div>
              <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className={`h-full transition-all duration-500 rounded-full ${
                    currentProgress >= requiredProgress 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                      : 'bg-gradient-to-r from-purple-400 to-pink-400'
                  }`}
                  style={{ width: `${Math.min(currentProgress, 100)}%` }}
                />
              </div>
              <p className="font-comic text-sm text-center text-gray-600">
                {currentProgress < requiredProgress 
                  ? `Keep painting! ${requiredProgress - Math.round(currentProgress)}% more to go!` 
                  : '🎉 Ready to animate! Click the Animate button!'
                }
              </p>
            </div>

            {/* Enhanced Canvas Area */}
            <div className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 border-4 border-dashed border-purple-200">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                className="w-full h-96 cursor-crosshair border-4 border-white rounded-xl shadow-inner bg-white"
                style={{ maxWidth: '100%', height: '400px' }}
              />

              {/* Enhanced Animation Overlay */}
              {showAnimation === currentObject && (
                <div className={`absolute inset-0 flex flex-col items-center justify-center ${currentObjectData?.animation} z-20 bg-white bg-opacity-90 rounded-2xl`}>
                  <div className="text-9xl mb-4 drop-shadow-lg">
                    {currentObjectData?.emoji}
                  </div>
                  <div className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-6 py-3 rounded-full font-comic font-bold text-lg shadow-lg border-2 border-orange-200">
                    <Sparkles className="w-6 h-6 inline mr-2" />
                    {currentObjectData?.sound}
                  </div>
                  <div className="mt-4 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 px-4 py-2 rounded-full font-comic text-base shadow-md border-2 border-purple-200">
                    ✨ I {currentObjectData?.action}! ✨
                  </div>
                </div>
              )}

              {/* Canvas Instructions Overlay */}
              {currentProgress === 0 && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white bg-opacity-90 rounded-xl p-4 text-center shadow-lg border-2 border-purple-200">
                    <div className="text-4xl mb-2">{currentObjectData?.emoji}</div>
                    <p className="font-comic text-gray-700 font-bold">
                      Click and drag to start painting!
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Paint Tools */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Brush Controls */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-comic font-bold text-purple-800 flex items-center">
                  <Brush className="w-4 h-4 mr-2" />
                  Brush Settings
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-comic text-sm font-bold">Size:</span>
                    <Slider
                      value={brushSize}
                      onValueChange={setBrushSize}
                      max={30}
                      min={3}
                      step={1}
                      className="flex-1"
                    />
                    <span className="font-comic text-sm text-purple-600 font-bold w-8">{brushSize[0]}</span>
                  </div>
                  <div className="flex space-x-2">
                    {['round', 'square'].map((style) => (
                      <Button
                        key={style}
                        size="sm"
                        variant={brushStyle === style ? "default" : "outline"}
                        onClick={() => setBrushStyle(style)}
                        className="rounded-full text-xs"
                      >
                        {style}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Paint Mode */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-comic font-bold text-purple-800">🎨 Paint Mode</h4>
                <div className="grid grid-cols-3 gap-1">
                  {[
                    { mode: 'brush', icon: '🖌️', name: 'Brush' },
                    { mode: 'pattern', icon: '✨', name: 'Pattern' },
                    { mode: 'sticker', icon: '🌟', name: 'Sticker' }
                  ].map((tool) => (
                    <Button
                      key={tool.mode}
                      size="sm"
                      variant={paintMode === tool.mode ? "default" : "outline"}
                      onClick={() => setPaintMode(tool.mode)}
                      className="rounded-lg text-xs h-12 flex flex-col"
                    >
                      <span className="text-lg">{tool.icon}</span>
                      <span>{tool.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <h4 className="font-comic font-bold text-purple-800">⚡ Quick Actions</h4>
                <div className="space-y-2">
                  <Button size="sm" onClick={clearCanvas} variant="outline" className="w-full rounded-lg">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Reset Canvas
                  </Button>
                  <Button size="sm" onClick={() => updateProgress(20)} variant="outline" className="w-full rounded-lg">
                    🎯 Add Progress
                  </Button>
                </div>
              </div>
            </div>

            {/* Enhanced Color Palette */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-100">
              <h4 className="font-comic font-bold text-purple-800 mb-3 flex items-center">
                <Palette className="w-4 h-4 mr-2" />
                Magic Color Palette
              </h4>
              <div className="grid grid-cols-12 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-3 transition-all transform hover:scale-110 ${
                      currentColor === color ? 'border-purple-600 scale-110 shadow-lg ring-2 ring-purple-300' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              {paintMode === 'sticker' && (
                <div className="mt-3">
                  <p className="font-comic text-sm font-bold text-purple-700 mb-2">Choose Sticker:</p>
                  <div className="flex space-x-2">
                    {stickers.map((sticker) => (
                      <button
                        key={sticker}
                        className="text-2xl hover:scale-110 transition-transform p-1 rounded"
                        onClick={() => setCurrentColor(sticker)}
                      >
                        {sticker}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Enhanced Object Selection & Gallery */}
        <div className="space-y-6">
          {/* Object Selection */}
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
              🎭 Choose Your Character
            </h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              {objects.map((object) => (
                <Card
                  key={object.id}
                  className={`p-3 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                    currentObject === object.id 
                      ? 'border-purple-400 bg-purple-50 shadow-lg ring-2 ring-purple-200' 
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                  onClick={() => setCurrentObject(object.id)}
                >
                  <div className="text-center space-y-2">
                    <div className="text-3xl">{object.emoji}</div>
                    <h4 className="font-comic font-bold text-xs text-gray-800">{object.name}</h4>
                    {coloredObjects.has(object.id) && (
                      <Badge className="bg-green-100 text-green-700 font-comic text-xs">
                        ✨ Alive!
                      </Badge>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full transition-all duration-300"
                        style={{ width: `${coloringProgress[object.id] || 0}%` }}
                      />
                    </div>
                    <span className="font-comic text-xs text-gray-500">
                      {Math.round(coloringProgress[object.id] || 0)}% / {object.requiredProgress}%
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          {/* Saved Artworks Gallery */}
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
              🖼️ Your Art Gallery
            </h3>
            
            {savedArtworks.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {savedArtworks.map((artwork) => (
                  <div key={artwork.id} className="bg-gray-50 rounded-lg p-3 text-center">
                    <img 
                      src={artwork.dataUrl} 
                      alt={artwork.objectName}
                      className="w-full h-16 object-cover rounded border-2 border-gray-200"
                    />
                    <div className="mt-2">
                      <span className="text-lg">{artwork.objectEmoji}</span>
                      <p className="font-comic text-xs font-bold text-gray-700">{artwork.objectName}</p>
                      <p className="font-comic text-xs text-gray-500">{artwork.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">🎨</div>
                <p className="font-comic text-gray-600">
                  Create and save your first masterpiece!
                </p>
              </div>
            )}
          </Card>

          {/* Enhanced Instructions & Achievements */}
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-comic font-bold text-blue-800 mb-2 flex items-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  How to Paint Magic:
                </h4>
                <ol className="font-comic text-sm text-blue-700 space-y-1">
                  <li>🎯 Choose your favorite character to paint</li>
                  <li>🎨 Pick beautiful colors and brush settings</li>
                  <li>✏️ Draw and paint on the white canvas</li>
                  <li>📊 Fill the progress bar to the required level</li>
                  <li>🎪 Watch your creation come alive with magic!</li>
                  <li>💾 Save and download your masterpieces</li>
                </ol>
              </div>

              {/* Achievements */}
              <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-comic font-bold text-purple-800 flex items-center">
                    🏆 Achievements
                  </span>
                  <span className="font-comic text-sm text-purple-600 font-bold">
                    {coloredObjects.size}/{objects.length}
                  </span>
                </div>
                <div className="w-full bg-purple-200 rounded-full h-3 mb-3">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(coloredObjects.size / objects.length) * 100}%` }}
                  />
                </div>
                <div className="space-y-1">
                  {coloredObjects.size >= 1 && (
                    <Badge className="bg-yellow-100 text-yellow-800 font-comic text-xs mr-1">
                      🌟 First Creation!
                    </Badge>
                  )}
                  {coloredObjects.size >= 3 && (
                    <Badge className="bg-orange-100 text-orange-800 font-comic text-xs mr-1">
                      🎨 Artist in Training!
                    </Badge>
                  )}
                  {coloredObjects.size >= 5 && (
                    <Badge className="bg-purple-100 text-purple-800 font-comic text-xs mr-1">
                      👑 Master Painter!
                    </Badge>
                  )}
                  {coloredObjects.size === objects.length && (
                    <Badge className="bg-rainbow-100 text-rainbow-800 font-comic text-xs">
                      🌈 Magic Paint Wizard!
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Paint;
