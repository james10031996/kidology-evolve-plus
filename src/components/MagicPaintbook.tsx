
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Eraser, Sparkles, RotateCcw, Download } from 'lucide-react';

const MagicPaintbook = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#ff6b6b');
  const [brushSize, setBrushSize] = useState(5);
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush');
  const [animations, setAnimations] = useState<any[]>([]);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#2ed573', '#ffa502', '#ff6348', '#747d8c', '#2f3542'
  ];

  const magicDrawings = {
    bird: {
      trigger: 'oval-line',
      animation: '🐦 flies across screen',
      sound: 'Tweet tweet!'
    },
    car: {
      trigger: 'rectangle-circles',
      animation: '🚗 drives across',
      sound: 'Vroom vroom!'
    },
    butterfly: {
      trigger: 'butterfly-shape',
      animation: '🦋 flutters around',
      sound: 'Flutter flutter!'
    },
    flower: {
      trigger: 'circle-lines',
      animation: '🌸 grows and blooms',
      sound: 'Bloom!'
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.globalCompositeOperation = currentTool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    // Check for magic patterns and trigger animations
    setTimeout(() => {
      triggerMagicAnimation();
    }, 500);
  };

  const triggerMagicAnimation = () => {
    const randomMagic = Object.entries(magicDrawings)[Math.floor(Math.random() * Object.entries(magicDrawings).length)];
    const [name, data] = randomMagic;
    
    setAnimations(prev => [...prev, {
      id: Date.now(),
      name,
      animation: data.animation,
      sound: data.sound
    }]);

    // Play sound
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(data.sound);
      utterance.rate = 1.2;
      utterance.pitch = 1.5;
      window.speechSynthesis.speak(utterance);
    }

    // Remove animation after 3 seconds
    setTimeout(() => {
      setAnimations(prev => prev.filter(anim => anim.id !== Date.now()));
    }, 3000);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    setAnimations([]);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'my-magic-painting.png';
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-pink rounded-full mx-auto mb-3 flex items-center justify-center">
            <Palette className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            ✨ Magic Paintbook
          </h2>
          <p className="font-comic text-gray-600">
            Draw amazing pictures and watch them come to life with magic!
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🎨 Art Tools
          </h3>

          {/* Tool Selection */}
          <div className="space-y-4">
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">Tools</h4>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  onClick={() => setCurrentTool('brush')}
                  className={`rounded-full ${currentTool === 'brush' ? 'gradient-purple text-white' : 'bg-gray-100'}`}
                >
                  <Palette className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setCurrentTool('eraser')}
                  className={`rounded-full ${currentTool === 'eraser' ? 'gradient-purple text-white' : 'bg-gray-100'}`}
                >
                  <Eraser className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Brush Size */}
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">
                Brush Size: {brushSize}px
              </h4>
              <input
                type="range"
                min="1"
                max="20"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Colors */}
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">Colors</h4>
              <div className="grid grid-cols-3 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setCurrentColor(color)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                      currentColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button onClick={clearCanvas} variant="outline" className="w-full rounded-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Canvas
              </Button>
              <Button onClick={downloadDrawing} className="w-full rounded-full gradient-blue text-white">
                <Download className="w-4 h-4 mr-2" />
                Save Art
              </Button>
            </div>
          </div>
        </Card>

        {/* Canvas */}
        <div className="lg:col-span-2">
          <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={600}
                height={400}
                className="border-2 border-dashed border-gray-300 rounded-xl cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />

              {/* Animations Overlay */}
              {animations.map((anim) => (
                <div
                  key={anim.id}
                  className="absolute top-4 left-4 animate-bounce text-4xl"
                  style={{
                    animation: 'bounce 1s infinite, fade-in 0.5s ease-out'
                  }}
                >
                  {anim.animation}
                </div>
              ))}

              {/* Magic Sparkles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <Sparkles
                    key={i}
                    className={`absolute text-yellow-400 animate-pulse`}
                    style={{
                      top: `${Math.random() * 80 + 10}%`,
                      left: `${Math.random() * 80 + 10}%`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Magic Guide */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            ✨ Magic Hints
          </h3>

          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-purple-800 mb-2">🐦 Flying Bird</h4>
              <p className="font-comic text-xs text-purple-600">
                Draw circles and lines to make birds fly!
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-blue-800 mb-2">🚗 Racing Car</h4>
              <p className="font-comic text-xs text-blue-600">
                Draw rectangles and circles for cars!
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-pink-800 mb-2">🦋 Butterfly</h4>
              <p className="font-comic text-xs text-pink-600">
                Draw wing shapes to see butterflies!
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-green-800 mb-2">🌸 Blooming Flower</h4>
              <p className="font-comic text-xs text-green-600">
                Draw circles with lines for flowers!
              </p>
            </div>
          </div>

          <div className="mt-4 bg-yellow-50 rounded-xl p-3">
            <h4 className="font-comic font-bold text-yellow-800 mb-2">💡 Pro Tips</h4>
            <ul className="font-comic text-xs text-yellow-700 space-y-1">
              <li>• Use different colors for magic effects</li>
              <li>• Draw slowly for better recognition</li>
              <li>• Try mixing shapes together</li>
              <li>• Each drawing is unique and magical!</li>
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MagicPaintbook;
