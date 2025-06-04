
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

interface Shape {
  id: number;
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart';
  color: string;
  x: number;
  y: number;
  sorted: boolean;
}

interface DropZone {
  type: 'circle' | 'square' | 'triangle' | 'rectangle' | 'star' | 'heart';
  color: string;
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

  const shapeTypes = ['circle', 'square', 'triangle', 'rectangle', 'star', 'heart'] as const;
  const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'pink'];

  const generateShapes = () => {
    const shapesPerType = Math.min(2 + Math.floor(level / 2), 4);
    const typesToUse = shapeTypes.slice(0, Math.min(3 + Math.floor(level / 2), 6));
    const newShapes: Shape[] = [];
    const newDropZones: DropZone[] = [];

    typesToUse.forEach((type, typeIndex) => {
      // Create drop zone
      newDropZones.push({
        type,
        color: colors[typeIndex % colors.length]
      });

      // Create shapes
      for (let i = 0; i < shapesPerType; i++) {
        let x, y;
        let attempts = 0;
        
        do {
          x = Math.random() * 70 + 5;
          y = Math.random() * 40 + 5;
          attempts++;
        } while (attempts < 10 && newShapes.some(existing => 
          Math.abs(existing.x - x) < 10 && Math.abs(existing.y - y) < 10
        ));

        newShapes.push({
          id: typeIndex * shapesPerType + i,
          type,
          color: colors[typeIndex % colors.length],
          x,
          y,
          sorted: false
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

  const handleDragStart = (shape: Shape) => {
    setDraggedShape(shape);
  };

  const handleDrop = (dropZone: DropZone) => {
    if (!draggedShape || !gameActive) return;

    if (draggedShape.type === dropZone.type) {
      setShapes(prev => prev.map(s => 
        s.id === draggedShape.id ? { ...s, sorted: true } : s
      ));
      setScore(prev => prev + (level * 10));
      
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
      setScore(prev => Math.max(0, prev - 5));
    }
    
    setDraggedShape(null);
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
    const baseClasses = `w-12 h-12 flex items-center justify-center text-white font-bold text-lg shadow-lg transform transition-all duration-200 ${
      isDragging ? 'scale-110 rotate-6' : 'hover:scale-105'
    }`;

    const style = {
      backgroundColor: shape.color,
      left: `${shape.x}%`,
      top: `${shape.y}%`
    };

    switch (shape.type) {
      case 'circle':
        return <div className={`${baseClasses} rounded-full`} style={style}>●</div>;
      case 'square':
        return <div className={`${baseClasses} rounded-lg`} style={style}>■</div>;
      case 'triangle':
        return <div className={`${baseClasses} rounded-lg`} style={style}>▲</div>;
      case 'rectangle':
        return <div className={`${baseClasses} rounded-lg w-16 h-8`} style={style}>▬</div>;
      case 'star':
        return <div className={`${baseClasses} rounded-lg`} style={style}>★</div>;
      case 'heart':
        return <div className={`${baseClasses} rounded-lg`} style={style}>♥</div>;
      default:
        return <div className={`${baseClasses} rounded-lg`} style={style}>?</div>;
    }
  };

  const getDropZoneShape = (type: string, color: string) => {
    const baseClasses = `w-20 h-20 border-4 border-dashed border-gray-400 rounded-xl flex items-center justify-center text-gray-400 text-2xl font-bold transition-all duration-200 hover:border-gray-600 hover:bg-gray-50`;

    switch (type) {
      case 'circle':
        return <div className={`${baseClasses} rounded-full`}>○</div>;
      case 'square':
        return <div className={baseClasses}>□</div>;
      case 'triangle':
        return <div className={baseClasses}>△</div>;
      case 'rectangle':
        return <div className={`${baseClasses} w-24 h-16`}>▢</div>;
      case 'star':
        return <div className={baseClasses}>☆</div>;
      case 'heart':
        return <div className={baseClasses}>♡</div>;
      default:
        return <div className={baseClasses}>?</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/games')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🔷 Shape Sorter Challenge
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Drag and drop shapes into their matching zones! Learn geometry while having fun!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-indigo-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
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
              className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Sorting
            </Button>
          )}
          
          <Button 
            onClick={resetGame}
            variant="outline"
            className="font-comic font-bold px-8 py-3 rounded-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        {gameActive && (
          <>
            {/* Game Area */}
            <Card className="relative h-80 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg overflow-hidden mb-8">
              <div className="relative w-full h-full">
                {shapes.filter(s => !s.sorted).map((shape) => (
                  <button
                    key={shape.id}
                    className="absolute cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${shape.x}%`,
                      top: `${shape.y}%`
                    }}
                    onMouseDown={() => handleDragStart(shape)}
                    onTouchStart={() => handleDragStart(shape)}
                  >
                    {getShapeElement(shape)}
                  </button>
                ))}
              </div>
            </Card>

            {/* Drop Zones */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg mb-8">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
                Sort the shapes into their matching zones:
              </h3>
              <div className="flex flex-wrap justify-center gap-6">
                {dropZones.map((zone, index) => (
                  <button
                    key={index}
                    className="transition-transform duration-200 hover:scale-105"
                    onClick={() => handleDrop(zone)}
                  >
                    {getDropZoneShape(zone.type, zone.color)}
                    <div className="font-comic text-sm text-gray-600 mt-2 capitalize">
                      {zone.type}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </>
        )}

        {!gameActive && !gameCompleted && (
          <Card className="p-8 bg-white rounded-2xl shadow-lg text-center">
            <div className="text-8xl mb-4">🎯</div>
            <div className="font-fredoka text-3xl text-gray-700 mb-4">Ready to Sort Shapes?</div>
            <div className="font-comic text-gray-600">Drag shapes to their matching zones!</div>
          </Card>
        )}

        {gameCompleted && (
          <Card className="p-8 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl text-center">
            <Trophy className="w-16 h-16 text-blue-600 mx-auto mb-4" />
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
                className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/games')}
                className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                Try Another Game
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ShapeSorter;
