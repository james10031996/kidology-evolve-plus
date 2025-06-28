
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Palette, Download, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const MagicPaintStudio = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(10);
  const [currentColor, setCurrentColor] = useState('#FF6B6B');
  const [brushType, setBrushType] = useState<'normal' | 'sparkle' | 'glow' | 'magic'>('normal');
  const [magicMode, setMagicMode] = useState(false);

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
    '#DDA0DD', '#FFB6C1', '#FFA07A', '#98FB98', '#F0E68C',
    '#FF69B4', '#20B2AA', '#9370DB', '#32CD32', '#FF4500'
  ];

  const brushTypes = [
    { type: 'normal', name: 'Normal', icon: '🖌️' },
    { type: 'sparkle', name: 'Sparkle', icon: '✨' },
    { type: 'glow', name: 'Glow', icon: '🌟' },
    { type: 'magic', name: 'Magic', icon: '🎭' }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Set background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set initial drawing settings
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    draw(x, y, true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const drawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    draw(x, y, false);
  };

  const draw = (x: number, y: number, isStart: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (isStart) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }

    // Apply brush effects based on type
    switch (brushType) {
      case 'normal':
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();
        break;

      case 'sparkle':
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize;
        ctx.stroke();
        // Add sparkle effect
        for (let i = 0; i < 5; i++) {
          const sparkleX = x + (Math.random() - 0.5) * brushSize * 2;
          const sparkleY = y + (Math.random() - 0.5) * brushSize * 2;
          ctx.fillStyle = '#FFD700';
          ctx.beginPath();
          ctx.arc(sparkleX, sparkleY, 2, 0, Math.PI * 2);
          ctx.fill();
        }
        break;

      case 'glow':
        ctx.shadowColor = currentColor;
        ctx.shadowBlur = brushSize;
        ctx.strokeStyle = currentColor;
        ctx.lineWidth = brushSize / 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
        break;

      case 'magic':
        // Rainbow effect
        const rainbowColors = ['#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF'];
        const colorIndex = Math.floor(Math.random() * rainbowColors.length);
        ctx.strokeStyle = rainbowColors[colorIndex];
        ctx.lineWidth = brushSize;
        ctx.stroke();
        break;
    }
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadArtwork = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `magic-artwork-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();

    updateStars(50);
  };

  const activateMagicMode = () => {
    setMagicMode(true);
    setBrushType('magic');
    setTimeout(() => setMagicMode(false), 10000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/activities')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Activities
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🎨 Magic Paint Studio
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Create beautiful artwork with magical brushes and special effects!
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <Card className="p-6 bg-white rounded-2xl shadow-lg">
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">🛠️ Tools</h3>
            
            {/* Brush Types */}
            <div className="mb-6">
              <Label className="font-comic font-bold text-sm text-gray-700 mb-2 block">Brush Type</Label>
              <div className="grid grid-cols-2 gap-2">
                {brushTypes.map((brush) => (
                  <button
                    key={brush.type}
                    onClick={() => setBrushType(brush.type as any)}
                    className={`p-3 rounded-lg border-2 font-comic text-sm transition-all ${
                      brushType === brush.type
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-lg mb-1">{brush.icon}</div>
                    {brush.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div className="mb-6">
              <Label className="font-comic font-bold text-sm text-gray-700 mb-2 block">
                Brush Size: {brushSize}px
              </Label>
              <input
                type="range"
                min="2"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Color Palette */}
            <div className="mb-6">
              <Label className="font-comic font-bold text-sm text-gray-700 mb-2 block">Colors</Label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      currentColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => setCurrentColor(e.target.value)}
                className="w-full mt-2 h-8 rounded-lg border border-gray-300"
              />
            </div>

            {/* Magic Features */}
            <div className="space-y-3">
              <Button
                onClick={activateMagicMode}
                disabled={magicMode}
                className="w-full gradient-purple text-white font-comic font-bold"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {magicMode ? 'Magic Active!' : 'Activate Magic'}
              </Button>
              
              <Button
                onClick={clearCanvas}
                variant="outline"
                className="w-full font-comic font-bold"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Canvas
              </Button>
              
              <Button
                onClick={downloadArtwork}
                className="w-full gradient-green text-white font-comic font-bold"
              >
                <Download className="w-4 h-4 mr-2" />
                Save Artwork
              </Button>
            </div>

            {magicMode && (
              <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg text-center">
                <Sparkles className="w-6 h-6 text-purple-600 mx-auto mb-2 animate-spin" />
                <p className="font-comic text-sm text-purple-700 font-bold">
                  Magic Mode Active!
                </p>
                <p className="font-comic text-xs text-purple-600">
                  Your brush now paints rainbows!
                </p>
              </div>
            )}
          </Card>

          {/* Canvas Area */}
          <div className="lg:col-span-3">
            <Card className="p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-fredoka font-bold text-xl text-gray-800">🖼️ Your Canvas</h3>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-purple-100 text-purple-700 font-comic">
                    <Palette className="w-3 h-3 mr-1" />
                    {brushType.charAt(0).toUpperCase() + brushType.slice(1)}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 font-comic">
                    {brushSize}px
                  </Badge>
                </div>
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
                <canvas
                  ref={canvasRef}
                  onMouseDown={startDrawing}
                  onMouseMove={drawing}
                  onMouseUp={stopDrawing}
                  onMouseLeave={stopDrawing}
                  className="border border-gray-300 rounded-lg bg-white cursor-crosshair max-w-full h-auto"
                  style={{ width: '100%', maxHeight: '600px' }}
                />
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
                  <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="font-comic font-bold text-gray-800">Creative Points</div>
                  <div className="font-fredoka text-lg text-yellow-600">+50</div>
                  <div className="font-comic text-xs text-gray-600">For each saved artwork</div>
                </Card>
                
                <Card className="p-4 text-center bg-gradient-to-br from-purple-50 to-pink-50">
                  <Sparkles className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="font-comic font-bold text-gray-800">Magic Brushes</div>
                  <div className="font-fredoka text-lg text-purple-600">4</div>
                  <div className="font-comic text-xs text-gray-600">Special effects available</div>
                </Card>
                
                <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                  <Palette className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <div className="font-comic font-bold text-gray-800">Color Palette</div>
                  <div className="font-fredoka text-lg text-blue-600">∞</div>
                  <div className="font-comic text-xs text-gray-600">Unlimited colors</div>
                </Card>
              </div>
            </Card>
          </div>
        </div>

        {/* Tips */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">🎨 Artist Tips</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">✨ Special Brushes:</h4>
              <ul className="font-comic text-sm text-gray-600 space-y-1">
                <li>• <strong>Sparkle:</strong> Adds glittery effects to your strokes</li>
                <li>• <strong>Glow:</strong> Creates a beautiful glowing effect</li>
                <li>• <strong>Magic:</strong> Paints with rainbow colors automatically</li>
              </ul>
            </div>
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">🎯 Pro Tips:</h4>
              <ul className="font-comic text-sm text-gray-600 space-y-1">
                <li>• Use larger brushes for backgrounds</li>
                <li>• Try different brush types for variety</li>
                <li>• Save your artwork to earn stars!</li>
                <li>• Activate Magic Mode for extra fun</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const Label = ({ children, className, ...props }: any) => (
  <label className={className} {...props}>{children}</label>
);

export default MagicPaintStudio;
