
import { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, RotateCcw, Trophy, Star, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'diamond' | 'hexagon' | 'oval' | 'pentagon';
  color: string;
  x: number;
  y: number;
  sorted: boolean;
  size: 'small' | 'medium' | 'large';
}

interface DropZone {
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart' | 'diamond' | 'hexagon' | 'oval' | 'pentagon';
  color: string;
  id: string;
}

const ShapeSorter = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [dropZones, setDropZones] = useState<DropZone[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameActive, setGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [draggedShape, setDraggedShape] = useState<Shape | null>(null);
  const [timeLeft, setTimeLeft] = useState(180);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const shapeTypes = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart', 'diamond', 'hexagon', 'oval', 'pentagon'] as const;
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'teal', 'indigo', 'cyan'];
  const sizes = ['small', 'medium', 'large'] as const;

  const generateShapes = () => {
    const shapesPerType = Math.min(2 + Math.floor(level / 2), 4);
    const typesToUse = shapeTypes.slice(0, Math.min(4 + Math.floor(level / 2), 10));
    const newShapes: Shape[] = [];
    const newDropZones: DropZone[] = [];

    typesToUse.forEach((type, typeIndex) => {
      // Create drop zone
      newDropZones.push({
        type,
        color: colors[typeIndex % colors.length],
        id: `zone-${type}`
      });

      // Create shapes
      for (let i = 0; i < shapesPerType; i++) {
        let x, y;
        let attempts = 0;
        const minDistance = 15;
        
        do {
          x = Math.random() * 65 + 10;
          y = Math.random() * 35 + 10;
          attempts++;
        } while (attempts < 20 && newShapes.some(existing => {
          const distance = Math.sqrt(Math.pow(existing.x - x, 2) + Math.pow(existing.y - y, 2));
          return distance < minDistance;
        }));

        newShapes.push({
          id: typeIndex * shapesPerType + i,
          type,
          color: colors[typeIndex % colors.length],
          x,
          y,
          sorted: false,
          size: sizes[Math.floor(Math.random() * sizes.length)]
        });
      }
    });

    setShapes(newShapes);
    setDropZones(newDropZones);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(180);
    setGameCompleted(false);
    generateShapes();
  };

  const handleMouseDown = (e: React.MouseEvent, shape: Shape) => {
    e.preventDefault();
    setDraggedShape(shape);
    
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const shapeRect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - shapeRect.left - shapeRect.width / 2,
        y: e.clientY - shapeRect.top - shapeRect.height / 2
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedShape || !gameAreaRef.current) return;
    
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((e.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    
    setShapes(prev => prev.map(s => 
      s.id === draggedShape.id 
        ? { ...s, x: Math.max(5, Math.min(90, x)), y: Math.max(5, Math.min(85, y)) }
        : s
    ));
  };

  const handleMouseUp = () => {
    setDraggedShape(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent, shape: Shape) => {
    e.preventDefault();
    const touch = e.touches[0];
    setDraggedShape(shape);
    
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const shapeRect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: touch.clientX - shapeRect.left - shapeRect.width / 2,
        y: touch.clientY - shapeRect.top - shapeRect.height / 2
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedShape || !gameAreaRef.current) return;
    
    const touch = e.touches[0];
    const rect = gameAreaRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left - dragOffset.x) / rect.width) * 100;
    const y = ((touch.clientY - rect.top - dragOffset.y) / rect.height) * 100;
    
    setShapes(prev => prev.map(s => 
      s.id === draggedShape.id 
        ? { ...s, x: Math.max(5, Math.min(90, x)), y: Math.max(5, Math.min(85, y)) }
        : s
    ));
  };

  const handleDropZoneClick = (dropZone: DropZone) => {
    if (!draggedShape || !gameActive) return;

    if (draggedShape.type === dropZone.type) {
      setShapes(prev => prev.map(s => 
        s.id === draggedShape.id ? { ...s, sorted: true } : s
      ));
      setScore(prev => prev + (level * 15));
      
      // Check if all shapes are sorted
      const updatedShapes = shapes.map(s => 
        s.id === draggedShape.id ? { ...s, sorted: true } : s
      );
      
      if (updatedShapes.every(s => s.sorted)) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 60);
        setTimeout(() => generateShapes(), 1500);
      }
    } else {
      setScore(prev => Math.max(0, prev - 8));
    }
    
    setDraggedShape(null);
    setDragOffset({ x: 0, y: 0 });
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(180);
    setShapes([]);
    setDropZones([]);
    setGameCompleted(false);
    setDraggedShape(null);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setGameCompleted(true);
      if (score > 100) {
        updateStars(Math.floor(score / 10));
      }
    }
  }, [gameActive, timeLeft, score, updateStars]);

  const getShapeElement = (shape: Shape, isDragging = false) => {
    const sizeClasses = {
      small: 'w-10 h-10 text-sm',
      medium: 'w-12 h-12 text-lg',
      large: 'w-16 h-16 text-xl'
    };

    const baseClasses = `${sizeClasses[shape.size]} flex items-center justify-center text-white font-bold shadow-xl transform transition-all duration-200 cursor-grab active:cursor-grabbing ${
      isDragging ? 'scale-110 rotate-6 z-50' : 'hover:scale-105 z-10'
    }`;

    const style = {
      backgroundColor: shape.color,
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      transform: 'translate(-50%, -50%)',
      filter: isDragging ? 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' : 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))'
    };

    const shapeSymbols = {
      circle: '●',
      square: '■',
      triangle: '▲',
      rectangle: '▬',
      star: '★',
      heart: '♥',
      diamond: '♦',
      hexagon: '⬢',
      oval: '⬭',
      pentagon: '⬟'
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-lg',
      triangle: 'rounded-lg',
      rectangle: 'rounded-lg',
      star: 'rounded-lg',
      heart: 'rounded-lg',
      diamond: 'rounded-lg rotate-45',
      hexagon: 'rounded-lg',
      oval: 'rounded-full',
      pentagon: 'rounded-lg'
    };

    return (
      <div 
        className={`${baseClasses} ${shapeClasses[shape.type]} absolute`} 
        style={style}
      >
        {shapeSymbols[shape.type]}
      </div>
    );
  };

  const getDropZoneShape = (type: string, color: string, id: string) => {
    const baseClasses = `w-20 h-20 border-4 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-400 text-2xl font-bold transition-all duration-300 hover:border-gray-600 hover:bg-gray-50 hover:scale-105 cursor-pointer`;

    const shapeSymbols = {
      circle: '○',
      square: '□',
      triangle: '△',
      rectangle: '▢',
      star: '☆',
      heart: '♡',
      diamond: '♢',
      hexagon: '⬡',
      oval: '⬯',
      pentagon: '⬠'
    };

    const shapeClasses = {
      circle: 'rounded-full',
      square: 'rounded-xl',
      triangle: 'rounded-xl',
      rectangle: 'rounded-xl',
      star: 'rounded-xl',
      heart: 'rounded-xl',
      diamond: 'rounded-xl rotate-45',
      hexagon: 'rounded-xl',
      oval: 'rounded-full',
      pentagon: 'rounded-xl'
    };

    return (
      <div className={`${baseClasses} ${shapeClasses[type]}`} onClick={() => handleDropZoneClick({ type: type as any, color, id })}>
        {shapeSymbols[type as keyof typeof shapeSymbols]}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/games')}
            className="mr-4 font-comic hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4 animate-bounce">
            🔷 Shape Sorter Challenge
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop shapes into their matching zones! Learn geometry while having fun with advanced drag & drop!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-indigo-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in hover:shadow-xl transition-shadow">
            <div className="font-comic text-sm text-gray-600">Shapes Left</div>
            <div className="font-fredoka text-2xl font-bold text-purple-600">
              {shapes.filter(s => !s.sorted).length}
            </div>
          </Card>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {!gameActive && !gameCompleted && (
            <Button 
              onClick={startGame}
              className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Sorting
            </Button>
          )}
          
          <Button 
            onClick={resetGame}
            variant="outline"
            className="font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-all duration-300"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {gameActive && (
          <>
            {/* Game Area */}
            <Card className="relative h-80 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg overflow-hidden mb-8">
              <div 
                ref={gameAreaRef}
                className="relative w-full h-full select-none"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                {shapes.filter(s => !s.sorted).map((shape) => (
                  <div
                    key={shape.id}
                    onMouseDown={(e) => handleMouseDown(e, shape)}
                    onTouchStart={(e) => handleTouchStart(e, shape)}
                    className="absolute"
                    style={{
                      left: `${shape.x}%`,
                      top: `${shape.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {getShapeElement(shape, draggedShape?.id === shape.id)}
                  </div>
                ))}
                
                {/* Drag indicator */}
                {draggedShape && (
                  <div className="absolute top-4 left-4 text-sm font-comic text-gray-600 bg-white px-3 py-1 rounded-full shadow-lg animate-pulse">
                    <Sparkles className="w-4 h-4 inline mr-1" />
                    Drag to matching zone!
                  </div>
                )}
              </div>
            </Card>

            {/* Drop Zones */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg mb-8">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center animate-fade-in">
                🎯 Drop the shapes into their matching zones:
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {dropZones.map((zone, index) => (
                  <div 
                    key={zone.id}
                    className="transition-transform duration-200 hover:scale-105 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {getDropZoneShape(zone.type, zone.color, zone.id)}
                    <div className="font-comic text-sm text-gray-600 mt-2 capitalize text-center">
                      {zone.type}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </>
        )}

        {!gameActive && !gameCompleted && (
          <Card className="p-8 bg-white rounded-2xl shadow-lg text-center">
            <div className="text-8xl mb-4 animate-bounce">🎯</div>
            <div className="font-fredoka text-3xl text-gray-700 mb-4">Ready to Sort Shapes?</div>
            <div className="font-comic text-gray-600 mb-4">
              Drag shapes to their matching zones with advanced drag & drop controls!
            </div>
            <div className="text-sm text-gray-500 font-comic">
              💡 Tip: Click and drag on desktop, touch and drag on mobile!
            </div>
          </Card>
        )}

        {gameCompleted && (
          <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl text-center animate-scale-in">
            <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-bounce" />
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              🎉 Geometry Master! 🎉
            </h2>
            <p className="font-comic text-lg text-gray-700 mb-4">
              Final Score: <span className="font-bold text-blue-600">{score}</span>
            </p>
            <p className="font-comic text-lg text-gray-700 mb-6">
              You completed {level - 1} levels and earned {Math.floor(score / 10)} stars!
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={startGame}
                className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/games')}
                className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                Try Another Game
              </Button>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">🎮 How to Play:</h3>
          <ul className="font-comic text-gray-600 space-y-2">
            <li>• Drag shapes from the game area to their matching drop zones</li>
            <li>• Each correct match earns you 15 × level points</li>
            <li>• Wrong matches reduce your score by 8 points</li>
            <li>• Complete all shapes to advance to the next level</li>
            <li>• Higher levels have more shape types and better rewards</li>
            <li>• Try different sizes: small, medium, and large shapes!</li>
            <li>• Master all 10 different shape types: circles, squares, triangles, rectangles, stars, hearts, diamonds, hexagons, ovals, and pentagons!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default ShapeSorter;
