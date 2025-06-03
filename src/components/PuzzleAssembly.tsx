
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Puzzle, RotateCcw, CheckCircle, Sparkles, Trophy } from 'lucide-react';

const PuzzleAssembly = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState('usa');
  const [completedPuzzles, setCompletedPuzzles] = useState(new Set());
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [placedPieces, setPlacedPieces] = useState({});
  const [showCelebration, setShowCelebration] = useState('');

  const puzzles = [
    {
      id: 'usa',
      name: 'United States',
      emoji: '🇺🇸',
      description: 'Build the United States by placing states!',
      pieces: [
        { id: 'california', name: 'California', emoji: '🏖️', color: 'bg-blue-200' },
        { id: 'texas', name: 'Texas', emoji: '🤠', color: 'bg-red-200' },
        { id: 'florida', name: 'Florida', emoji: '🏝️', color: 'bg-green-200' },
        { id: 'newyork', name: 'New York', emoji: '🗽', color: 'bg-purple-200' },
        { id: 'alaska', name: 'Alaska', emoji: '🐻', color: 'bg-cyan-200' }
      ],
      slots: 5
    },
    {
      id: 'world',
      name: 'World Map',
      emoji: '🌍',
      description: 'Connect continents to complete the world!',
      pieces: [
        { id: 'northamerica', name: 'North America', emoji: '🦅', color: 'bg-blue-200' },
        { id: 'southamerica', name: 'South America', emoji: '🦙', color: 'bg-green-200' },
        { id: 'europe', name: 'Europe', emoji: '🏰', color: 'bg-purple-200' },
        { id: 'africa', name: 'Africa', emoji: '🦁', color: 'bg-orange-200' },
        { id: 'asia', name: 'Asia', emoji: '🐼', color: 'bg-red-200' },
        { id: 'australia', name: 'Australia', emoji: '🦘', color: 'bg-yellow-200' }
      ],
      slots: 6
    },
    {
      id: 'body',
      name: 'Human Body',
      emoji: '👤',
      description: 'Assemble the human body parts!',
      pieces: [
        { id: 'head', name: 'Head', emoji: '🧠', color: 'bg-pink-200' },
        { id: 'torso', name: 'Torso', emoji: '🫁', color: 'bg-blue-200' },
        { id: 'leftarm', name: 'Left Arm', emoji: '💪', color: 'bg-green-200' },
        { id: 'rightarm', name: 'Right Arm', emoji: '💪', color: 'bg-green-200' },
        { id: 'leftleg', name: 'Left Leg', emoji: '🦵', color: 'bg-yellow-200' },
        { id: 'rightleg', name: 'Right Leg', emoji: '🦵', color: 'bg-yellow-200' }
      ],
      slots: 6
    },
    {
      id: 'car',
      name: 'Car Parts',
      emoji: '🚗',
      description: 'Build a complete car!',
      pieces: [
        { id: 'engine', name: 'Engine', emoji: '⚙️', color: 'bg-gray-200' },
        { id: 'wheels', name: 'Wheels', emoji: '🛞', color: 'bg-black' },
        { id: 'body', name: 'Body', emoji: '🚙', color: 'bg-red-200' },
        { id: 'windows', name: 'Windows', emoji: '🪟', color: 'bg-blue-200' }
      ],
      slots: 4
    }
  ];

  const currentPuzzleData = puzzles.find(p => p.id === currentPuzzle);

  const handleDragStart = (piece) => {
    setDraggedPiece(piece);
  };

  const handleDrop = (slotId) => {
    if (draggedPiece) {
      setPlacedPieces(prev => ({
        ...prev,
        [currentPuzzle]: {
          ...prev[currentPuzzle],
          [slotId]: draggedPiece
        }
      }));
      setDraggedPiece(null);
      
      // Check if puzzle is complete
      const currentPieces = {
        ...placedPieces[currentPuzzle],
        [slotId]: draggedPiece
      };
      
      if (Object.keys(currentPieces).length === currentPuzzleData?.slots) {
        setCompletedPuzzles(prev => new Set([...prev, currentPuzzle]));
        triggerCelebration();
      }
    }
  };

  const triggerCelebration = () => {
    setShowCelebration(currentPuzzle);
    setTimeout(() => {
      setShowCelebration('');
    }, 3000);
  };

  const resetPuzzle = () => {
    setPlacedPieces(prev => ({
      ...prev,
      [currentPuzzle]: {}
    }));
    setCompletedPuzzles(prev => {
      const newSet = new Set(prev);
      newSet.delete(currentPuzzle);
      return newSet;
    });
  };

  const currentPlacedPieces = placedPieces[currentPuzzle] || {};
  const availablePieces = currentPuzzleData?.pieces.filter(
    piece => !Object.values(currentPlacedPieces).find(p => p.id === piece.id)
  ) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Puzzle className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🧩 Puzzle Assembly Lab
          </h2>
          <p className="font-comic text-gray-600">
            Drag and drop pieces to complete amazing puzzles!
          </p>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Puzzle Selection */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🎯 Choose Puzzle
          </h3>
          
          <div className="space-y-3">
            {puzzles.map((puzzle) => (
              <Card
                key={puzzle.id}
                className={`p-4 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                  currentPuzzle === puzzle.id 
                    ? 'border-blue-400 bg-blue-50 shadow-lg' 
                    : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setCurrentPuzzle(puzzle.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{puzzle.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-comic font-bold text-gray-800">{puzzle.name}</h4>
                    <p className="font-comic text-xs text-gray-600">{puzzle.description}</p>
                    {completedPuzzles.has(puzzle.id) && (
                      <Badge className="bg-green-100 text-green-700 font-comic text-xs mt-1">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Complete!
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Progress */}
          <div className="mt-6 bg-purple-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-purple-800">🏆 Progress</span>
              <span className="font-comic text-sm text-purple-600">
                {completedPuzzles.size}/{puzzles.length}
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-2">
              <div 
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedPuzzles.size / puzzles.length) * 100}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Assembly Area */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-fredoka font-bold text-lg text-gray-800">
              🔧 Assembly Area
            </h3>
            <Button size="sm" variant="outline" onClick={resetPuzzle} className="rounded-full">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          <div className="relative">
            <h4 className="font-comic font-bold text-center mb-4 text-blue-800">
              {currentPuzzleData?.name} {currentPuzzleData?.emoji}
            </h4>
            
            {/* Drop Zones */}
            <div className="grid grid-cols-2 gap-3 min-h-64">
              {Array.from({ length: currentPuzzleData?.slots || 0 }).map((_, index) => {
                const slotId = `slot-${index}`;
                const placedPiece = currentPlacedPieces[slotId];
                
                return (
                  <div
                    key={slotId}
                    className={`border-2 border-dashed rounded-xl p-4 min-h-20 flex items-center justify-center transition-all ${
                      placedPiece 
                        ? `${placedPiece.color} border-green-400` 
                        : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(slotId)}
                  >
                    {placedPiece ? (
                      <div className="text-center">
                        <div className="text-2xl mb-1">{placedPiece.emoji}</div>
                        <div className="font-comic text-xs font-bold text-gray-700">
                          {placedPiece.name}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-400 font-comic text-sm text-center">
                        Drop piece here
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Celebration Overlay */}
            {showCelebration === currentPuzzle && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-xl animate-pulse-soft">
                <div className="text-6xl mb-2">🎉</div>
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-comic font-bold">
                  <Trophy className="w-5 h-5 inline mr-2" />
                  Puzzle Complete!
                </div>
                <div className="mt-2 font-comic text-green-700">
                  Amazing job! 🌟
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Pieces Box */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🧩 Puzzle Pieces
          </h3>
          
          <div className="space-y-3">
            {availablePieces.map((piece) => (
              <div
                key={piece.id}
                draggable
                onDragStart={() => handleDragStart(piece)}
                className={`${piece.color} p-3 rounded-xl cursor-move hover:shadow-lg transition-all transform hover:scale-105 border-2 border-gray-200`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{piece.emoji}</div>
                  <div className="font-comic font-bold text-gray-800">
                    {piece.name}
                  </div>
                </div>
              </div>
            ))}
            
            {availablePieces.length === 0 && currentPlacedPieces && Object.keys(currentPlacedPieces).length > 0 && (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">✨</div>
                <p className="font-comic text-gray-600">All pieces placed!</p>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="mt-6 bg-blue-50 rounded-xl p-4">
            <h4 className="font-comic font-bold text-blue-800 mb-2">📝 How to Play:</h4>
            <ol className="font-comic text-sm text-blue-700 space-y-1">
              <li>1. Pick a puzzle to solve</li>
              <li>2. Drag pieces from here</li>
              <li>3. Drop into assembly area</li>
              <li>4. Complete the puzzle! 🎉</li>
            </ol>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PuzzleAssembly;
