
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RotateCcw, Download, Palette, Star } from 'lucide-react';

const MandalaMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#ff6b6b');
  const [symmetryMode, setSymmetryMode] = useState(8);
  const [brushSize, setBrushSize] = useState(3);
  const [selectedShape, setSelectedShape] = useState<'circle' | 'line' | 'dot' | 'star'>('circle');
  const [completedMandalas, setCompletedMandalas] = useState(0);

  const colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#2ed573', '#ffa502', '#ff6348', '#747d8c', '#2f3542'
  ];

  const shapes = [
    { id: 'circle', icon: '⭕', name: 'Circle' },
    { id: 'line', icon: '➖', name: 'Line' },
    { id: 'dot', icon: '⚪', name: 'Dot' },
    { id: 'star', icon: '⭐', name: 'Star' }
  ];

  const symmetryOptions = [4, 6, 8, 12, 16];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw center guide
        drawCenterGuide(ctx, canvas.width / 2, canvas.height / 2);
      }
    }
  }, [symmetryMode]);

  const drawCenterGuide = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
    ctx.save();
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    
    // Draw symmetry lines
    for (let i = 0; i < symmetryMode; i++) {
      const angle = (2 * Math.PI * i) / symmetryMode;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * 150,
        centerY + Math.sin(angle) * 150
      );
      ctx.stroke();
    }
    
    // Draw center circles
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 100, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.restore();
  };

  const getSymmetricPoints = (x: number, y: number, centerX: number, centerY: number) => {
    const points = [];
    const radius = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
    const baseAngle = Math.atan2(y - centerY, x - centerX);
    
    for (let i = 0; i < symmetryMode; i++) {
      const angle = baseAngle + (2 * Math.PI * i) / symmetryMode;
      points.push({
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      });
    }
    
    return points;
  };

  const drawShape = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.fillStyle = currentColor;
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    
    switch (selectedShape) {
      case 'circle':
        ctx.beginPath();
        ctx.arc(x, y, brushSize * 2, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'line':
        ctx.beginPath();
        ctx.moveTo(x - brushSize * 2, y);
        ctx.lineTo(x + brushSize * 2, y);
        ctx.stroke();
        break;
      case 'dot':
        ctx.beginPath();
        ctx.arc(x, y, brushSize, 0, 2 * Math.PI);
        ctx.fill();
        break;
      case 'star':
        drawStar(ctx, x, y, brushSize * 2, 5);
        break;
    }
  };

  const drawStar = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, points: number) => {
    const step = (Math.PI * 2) / points;
    const halfStep = step / 2;
    
    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    
    for (let i = 1; i <= points * 2; i++) {
      const currentRadius = i % 2 === 0 ? radius : radius * 0.5;
      const currentAngle = i * halfStep - Math.PI / 2;
      ctx.lineTo(
        x + Math.cos(currentAngle) * currentRadius,
        y + Math.sin(currentAngle) * currentRadius
      );
    }
    
    ctx.closePath();
    ctx.fill();
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Get symmetric points
    const points = getSymmetricPoints(x, y, centerX, centerY);
    
    // Draw at all symmetric points
    points.forEach(point => {
      drawShape(ctx, point.x, point.y);
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawCenterGuide(ctx, canvas.width / 2, canvas.height / 2);
    }
  };

  const saveMandalad = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      // Create a clean version without guides
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      
      if (tempCtx) {
        tempCtx.fillStyle = 'white';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(canvas, 0, 0);
        
        const link = document.createElement('a');
        link.download = `mandala-${Date.now()}.png`;
        link.href = tempCanvas.toDataURL();
        link.click();
        
        setCompletedMandalas(prev => prev + 1);
        
        if (window.speechSynthesis) {
          const utterance = new SpeechSynthesisUtterance('Beautiful mandala saved! Keep creating amazing art!');
          window.speechSynthesis.speak(utterance);
        }
      }
    }
  };

  const generateRandomMandala = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    clearCanvas();
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Generate random mandala pattern
    for (let ring = 1; ring <= 5; ring++) {
      const radius = ring * 30;
      const color = colors[Math.floor(Math.random() * colors.length)];
      ctx.fillStyle = color;
      
      for (let i = 0; i < symmetryMode * ring; i++) {
        const angle = (2 * Math.PI * i) / (symmetryMode * ring);
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const originalShape = selectedShape;
        setSelectedShape(shape.id as any);
        drawShape(ctx, x, y);
        setSelectedShape(originalShape);
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🌸 Mandala Maker
          </h2>
          <p className="font-comic text-gray-600">
            Create beautiful symmetric patterns and peaceful mandalas!
          </p>
          <div className="mt-3">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold inline-block">
              <Star className="w-4 h-4 inline mr-1" />
              Mandalas Created: {completedMandalas}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Tools Panel */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🎨 Mandala Tools
          </h3>

          <div className="space-y-4">
            {/* Symmetry Mode */}
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">
                Symmetry: {symmetryMode} sides
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {symmetryOptions.map((option) => (
                  <Button
                    key={option}
                    size="sm"
                    onClick={() => setSymmetryMode(option)}
                    className={`rounded-full ${symmetryMode === option ? 'gradient-purple text-white' : 'bg-gray-100'}`}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Shapes */}
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">Shapes</h4>
              <div className="grid grid-cols-2 gap-2">
                {shapes.map((shape) => (
                  <Button
                    key={shape.id}
                    size="sm"
                    onClick={() => setSelectedShape(shape.id as any)}
                    className={`rounded-full ${selectedShape === shape.id ? 'gradient-blue text-white' : 'bg-gray-100'}`}
                  >
                    <span className="mr-1">{shape.icon}</span>
                    {shape.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Brush Size */}
            <div>
              <h4 className="font-comic font-bold text-gray-700 mb-2">
                Size: {brushSize}px
              </h4>
              <input
                type="range"
                min="1"
                max="10"
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

            {/* Actions */}
            <div className="space-y-2">
              <Button onClick={generateRandomMandala} className="w-full rounded-full gradient-pink text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Random Pattern
              </Button>
              <Button onClick={clearCanvas} variant="outline" className="w-full rounded-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear Canvas
              </Button>
              <Button onClick={saveMandalad} className="w-full rounded-full gradient-purple text-white">
                <Download className="w-4 h-4 mr-2" />
                Save Mandala
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
                width={500}
                height={500}
                className="border-2 border-dashed border-gray-300 rounded-xl cursor-crosshair w-full"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
              />
              
              {/* Center indicator */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-400 rounded-full pointer-events-none opacity-50" />
            </div>
          </Card>
        </div>

        {/* Guide Panel */}
        <Card className="p-4 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🧘 Mandala Guide
          </h3>

          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-blue-800 mb-2">🎯 What is a Mandala?</h4>
              <p className="font-comic text-xs text-blue-600">
                Mandalas are beautiful circular patterns that help you relax and focus!
              </p>
            </div>

            <div className="bg-purple-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-purple-800 mb-2">✨ Tips for Creating</h4>
              <ul className="font-comic text-xs text-purple-600 space-y-1">
                <li>• Start from the center and work outward</li>
                <li>• Use repeating patterns</li>
                <li>• Try different symmetry modes</li>
                <li>• Choose harmonious colors</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-green-800 mb-2">🌈 Color Harmony</h4>
              <p className="font-comic text-xs text-green-600">
                Try using colors that are next to each other on the rainbow for peaceful mandalas!
              </p>
            </div>

            <div className="bg-pink-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-pink-800 mb-2">🧘 Mindful Creating</h4>
              <p className="font-comic text-xs text-pink-600">
                Take your time and enjoy the peaceful process of creating symmetrical art!
              </p>
            </div>

            <div className="bg-yellow-50 rounded-xl p-3">
              <h4 className="font-comic font-bold text-yellow-800 mb-2">🎨 Practice Ideas</h4>
              <ul className="font-comic text-xs text-yellow-700 space-y-1">
                <li>• Create flower-like patterns</li>
                <li>• Make geometric designs</li>
                <li>• Try nature-inspired shapes</li>
                <li>• Experiment with different sizes</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MandalaMaker;
