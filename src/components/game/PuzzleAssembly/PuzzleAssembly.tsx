
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Puzzle, RotateCcw, CheckCircle, ArrowLeft, Trophy, Star, Timer } from 'lucide-react';
import Header from '@/components/home/Header';
import { useNavigate } from 'react-router-dom';
import { puzzleData } from './puzzleData';

interface PuzzlePiece {
  id: string;
  name: string;
  emoji: string;
  color: string;
  hint?: string;
}

interface PuzzleData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  pieces: PuzzlePiece[];
  slots: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit?: number;
  validPieceIds?: any;
  incorrectIds?: any;
  hints: string[];
}

const PuzzleAssembly = () => {
  const navigate = useNavigate();
  const [completedPuzzles, setCompletedPuzzles] = useState(new Set<string>());
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [placedPieces, setPlacedPieces] = useState<Record<string, Record<string, PuzzlePiece>>>({});
  const [showCelebration, setShowCelebration] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [errorSlots, setErrorSlots] = useState<Set<string>>(new Set());
  const [wrongDrop, setWrongDrop] = useState<string | null>(null);

  const [currentPuzzle, setCurrentPuzzle] = useState('usa');
  const currentPuzzleData = puzzleData.find(p => p.id === currentPuzzle);


  const handleDragStart = (piece: PuzzlePiece) => {
    setDraggedPiece(piece);
  };


  const triggerError = (slotId: string) => {
    setErrorSlots(prev => {
      const updated = new Set(prev);
      updated.add(slotId);
      return updated;
    });

    setTimeout(() => {
      setErrorSlots(prev => {
        const updated = new Set(prev);
        updated.delete(slotId);
        return updated;
      });
    }, 1500);
  };

  const handleDrop = (slotId: string) => {
    if (!draggedPiece || !currentPuzzleData) return;

    const correctPieceIds = currentPuzzleData.pieces
      .filter(p => !currentPuzzleData.incorrectIds.includes(p.id.toLowerCase()))
      .map(p => p.id);

    // This slot already has a piece
    if (placedPieces[currentPuzzle]?.[slotId]) return;

    // Check if piece is valid (not mumbai, or your chosen invalid pieces)
    if (!correctPieceIds.includes(draggedPiece.id)) {
      // Show animated error at this slot
      triggerError(slotId);
      setDraggedPiece(null); // reset dragged piece
      return;
    }

    // Place piece
    const updated = {
      ...placedPieces[currentPuzzle],
      [slotId]: draggedPiece,
    };
    setPlacedPieces(prev => ({
      ...prev,
      [currentPuzzle]: updated,
    }));
    setDraggedPiece(null);
    setScore(prev => prev + 100);

    if (Object.keys(updated).length === currentPuzzleData.slots) {
      setCompletedPuzzles(prev => new Set([...prev, currentPuzzle]));
      triggerCelebration();
      setScore(prev => prev + 500);
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
    setScore(prev => Math.max(0, prev - 200)); // Penalty for reset
  };

  const showNextHint = () => {
    if (currentPuzzleData) {
      setCurrentHintIndex(prev => (prev + 1) % currentPuzzleData.hints.length);
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
    }
  };

  const changePuzzle = (puzzleId: string) => {
    setCurrentPuzzle(puzzleId);
    setCurrentHintIndex(0);
    setShowHint(false);
  };

  const currentPlacedPieces = placedPieces[currentPuzzle] || {};
  const availablePieces = currentPuzzleData?.pieces.filter(
    piece => !Object.values(currentPlacedPieces).find(p => p.id === piece.id)
  ) || [];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />

      <Card className="p-6 mb-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-0 shadow-lg">
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

        <div className="text-center mb-6">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Puzzle className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🧩 Puzzle Assembly Lab
          </h2>
          <p className="font-comic text-gray-600">
            Choose a puzzle and drag pieces to complete amazing creations!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <Select value={currentPuzzle} onValueChange={changePuzzle}>
              <SelectTrigger className="w-64 bg-white border-purple-300">
                <SelectValue placeholder="Choose a puzzle" />
              </SelectTrigger>
              <SelectContent className="bg-white border-purple-300 z-50">
                {puzzleData.map((puzzle) => (
                  <SelectItem key={puzzle.id} value={puzzle.id} className="hover:bg-purple-50">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{puzzle.emoji}</span>
                      <span className="font-comic">{puzzle.name}</span>
                      <Badge className={`text-xs ${getDifficultyColor(puzzle.difficulty)}`}>
                        {puzzle.difficulty}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-purple-100 text-purple-800 font-comic font-bold px-3 py-1">
              <Star className="w-4 h-4 mr-1" />
              Score: {score}
            </Badge>
            {currentPuzzleData?.timeLimit && (
              <Badge className="bg-orange-100 text-orange-800 font-comic font-bold px-3 py-1">
                <Timer className="w-4 h-4 mr-1" />
                {currentPuzzleData.timeLimit}s
              </Badge>
            )}
            <Button
              onClick={showNextHint}
              size="sm"
              variant="outline"
              className="border-blue-300 text-blue-600 font-comic"
            >
              💡 Hint
            </Button>
          </div>
        </div>

        {/* Current Puzzle Info */}
        <div className="mt-4 p-4 bg-white rounded-xl border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-fredoka font-bold text-lg text-gray-800">
                {currentPuzzleData?.emoji} {currentPuzzleData?.name}
              </h3>
              <p className="font-comic text-gray-600 text-sm">
                {currentPuzzleData?.description}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge className={getDifficultyColor(currentPuzzleData?.difficulty || 'Easy')}>
                {currentPuzzleData?.difficulty}
              </Badge>
              {completedPuzzles.has(currentPuzzle) && (
                <Badge className="bg-green-100 text-green-700 font-comic">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Complete!
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Hint Display */}
        {showHint && currentPuzzleData && (
          <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded-xl animate-fade-in">
            <div className="flex items-center space-x-2">
              <span className="text-lg">💡</span>
              <span className="font-comic font-bold text-yellow-800">
                Hint: {currentPuzzleData.hints[currentHintIndex]}
              </span>
            </div>
          </div>
        )}
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Assembly Area */}
        <div className="lg:col-span-2">
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
              {/* Drop Zones */}
              <div className="grid grid-cols-2 gap-3 min-h-64">
                {Array.from({ length: currentPuzzleData?.slots || 0 }).map((_, index) => {
                  const slotId = `slot-${index}`;
                  const placedPiece = currentPlacedPieces[slotId];

                  return (
                    <div
                      key={slotId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(slotId)}
                      className={`relative border-2 rounded-xl p-4 min-h-20 flex items-center justify-center transition-all duration-300 ${errorSlots.has(slotId)
                        ? 'border-red-500 animate-shake bg-red-50'
                        : placedPiece
                          ? `${placedPiece.color} border-green-400 shadow-md`
                          : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50'
                        }`}
                    >
                      {placedPiece ? (
                        <div className="text-center animate-scale-in">
                          <div className="text-3xl mb-1">{placedPiece.emoji}</div>
                          <div className="font-comic text-xs font-bold text-gray-700">
                            {placedPiece.name}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 font-comic text-sm text-center">
                          Drop piece here
                        </div>
                      )}

                      {/* ❌ Wrong Piece Animation */}
                      {errorSlots.has(slotId) && (
                        <div className="absolute inset-0 flex items-center justify-center animate-fade-in-out pointer-events-none">
                          <div className="bg-red-100 text-red-800 px-2 py-1 rounded font-comic text-sm shadow-md">
                            ❌ Wrong Piece!
                          </div>
                        </div>
                      )}
                    </div>

                  );

                })}
              </div>

              {/* Celebration Overlay */}
              {showCelebration === currentPuzzle && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 rounded-xl animate-scale-in">
                  <div className="text-6xl mb-4 animate-bounce">🎉</div>
                  <div className="bg-green-100 text-green-800 px-6 py-3 rounded-full font-comic font-bold text-xl shadow-lg">
                    <Trophy className="w-6 h-6 inline mr-2" />
                    Puzzle Complete!
                  </div>
                  <div className="mt-2 font-comic text-green-700 text-lg">
                    Amazing job! You earned 500 bonus points! 🌟
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(Object.keys(currentPlacedPieces).length / (currentPuzzleData?.slots || 1)) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-comic text-sm text-gray-600">
                Progress: {Object.keys(currentPlacedPieces).length}/{currentPuzzleData?.slots} pieces placed
              </span>
            </div>
          </Card>
        </div>

        {/* Pieces Box */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🧩 Puzzle Pieces
          </h3>

          <div className="space-y-3 max-h-96 overflow-y-auto">
            {availablePieces.map((piece) => (
              <div
                key={piece.id}
                draggable
                onDragStart={() => handleDragStart(piece)}
                className={`${piece.color} p-3 rounded-xl cursor-move hover:shadow-lg transition-all transform hover:scale-105 border-2 border-gray-200 hover:border-purple-300`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{piece.emoji}</div>
                  <div>
                    <div className="font-comic font-bold text-gray-800">
                      {piece.name}
                    </div>
                    {piece.hint && (
                      <div className="font-comic text-xs text-gray-600 italic">
                        💡 {piece.hint}
                      </div>
                    )}
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
              <li>1. Choose a puzzle from dropdown</li>
              <li>2. Drag pieces from here</li>
              <li>3. Drop into assembly area</li>
              <li>4. Use hints if you need help</li>
              <li>5. Complete puzzle for bonus! 🎉</li>
            </ol>
          </div>

          {/* Progress Summary */}
          <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <h4 className="font-comic font-bold text-purple-800 mb-2">🏆 Your Progress</h4>
            <div className="text-center">
              <div className="text-2xl font-fredoka font-bold text-purple-700">
                {completedPuzzles.size}/{puzzleData.length}
              </div>
              <div className="font-comic text-sm text-purple-600">
                Puzzles Completed
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedPuzzles.size / puzzleData.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PuzzleAssembly;