
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Puzzle, RotateCcw, CheckCircle, Sparkles, Trophy, Star, Timer } from 'lucide-react';

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
  hints: string[];
}

const PuzzleAssembly = () => {
  const [currentPuzzle, setCurrentPuzzle] = useState('usa');
  const [completedPuzzles, setCompletedPuzzles] = useState(new Set<string>());
  const [draggedPiece, setDraggedPiece] = useState<PuzzlePiece | null>(null);
  const [placedPieces, setPlacedPieces] = useState<Record<string, Record<string, PuzzlePiece>>>({});
  const [showCelebration, setShowCelebration] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const puzzles: PuzzleData[] = [
    {
      id: 'usa',
      name: 'United States Map',
      emoji: '🇺🇸',
      description: 'Build the United States by placing states correctly!',
      difficulty: 'Easy',
      pieces: [
        { id: 'california', name: 'California', emoji: '🏖️', color: 'bg-blue-200', hint: 'West coast, golden beaches' },
        { id: 'texas', name: 'Texas', emoji: '🤠', color: 'bg-red-200', hint: 'Everything is bigger here!' },
        { id: 'florida', name: 'Florida', emoji: '🏝️', color: 'bg-green-200', hint: 'Sunshine State with palm trees' },
        { id: 'newyork', name: 'New York', emoji: '🗽', color: 'bg-purple-200', hint: 'Home of the Statue of Liberty' },
        { id: 'alaska', name: 'Alaska', emoji: '🐻', color: 'bg-cyan-200', hint: 'Coldest state with polar bears' }
      ],
      slots: 5,
      hints: ['Look for coastal states first', 'Think about weather patterns', 'Remember state symbols']
    },
    {
      id: 'world',
      name: 'World Continents',
      emoji: '🌍',
      description: 'Connect all continents to complete our beautiful world!',
      difficulty: 'Medium',
      pieces: [
        { id: 'northamerica', name: 'North America', emoji: '🦅', color: 'bg-blue-200', hint: 'Eagles soar here' },
        { id: 'southamerica', name: 'South America', emoji: '🦙', color: 'bg-green-200', hint: 'Llamas live here' },
        { id: 'europe', name: 'Europe', emoji: '🏰', color: 'bg-purple-200', hint: 'Medieval castles' },
        { id: 'africa', name: 'Africa', emoji: '🦁', color: 'bg-orange-200', hint: 'Lions roam freely' },
        { id: 'asia', name: 'Asia', emoji: '🐼', color: 'bg-red-200', hint: 'Giant pandas live here' },
        { id: 'australia', name: 'Australia', emoji: '🦘', color: 'bg-yellow-200', hint: 'Kangaroos hop around' }
      ],
      slots: 6,
      hints: ['Start with the largest continent', 'Think about animals from each place', 'Remember continental shapes']
    },
    {
      id: 'body',
      name: 'Human Body',
      emoji: '👤',
      description: 'Assemble the human body parts in the right places!',
      difficulty: 'Easy',
      pieces: [
        { id: 'head', name: 'Head', emoji: '🧠', color: 'bg-pink-200', hint: 'Houses the brain' },
        { id: 'torso', name: 'Torso', emoji: '🫁', color: 'bg-blue-200', hint: 'Contains lungs and heart' },
        { id: 'leftarm', name: 'Left Arm', emoji: '💪', color: 'bg-green-200', hint: 'Left side strength' },
        { id: 'rightarm', name: 'Right Arm', emoji: '💪', color: 'bg-green-200', hint: 'Right side strength' },
        { id: 'leftleg', name: 'Left Leg', emoji: '🦵', color: 'bg-yellow-200', hint: 'Left leg for walking' },
        { id: 'rightleg', name: 'Right Leg', emoji: '🦵', color: 'bg-yellow-200', hint: 'Right leg for walking' }
      ],
      slots: 6,
      hints: ['Head goes at the top', 'Arms connect to shoulders', 'Legs support the body']
    },
    {
      id: 'car',
      name: 'Build a Car',
      emoji: '🚗',
      description: 'Assemble all car parts to build a complete vehicle!',
      difficulty: 'Easy',
      pieces: [
        { id: 'engine', name: 'Engine', emoji: '⚙️', color: 'bg-gray-200', hint: 'Powers the car' },
        { id: 'wheels', name: 'Wheels', emoji: '🛞', color: 'bg-black', hint: 'Round and help car move' },
        { id: 'body', name: 'Body', emoji: '🚙', color: 'bg-red-200', hint: 'Main frame of car' },
        { id: 'windows', name: 'Windows', emoji: '🪟', color: 'bg-blue-200', hint: 'Clear to see through' }
      ],
      slots: 4,
      hints: ['Start with the main body', 'Wheels go at the bottom', 'Windows let light in']
    },
    {
      id: 'animals',
      name: 'Animal Kingdom',
      emoji: '🦁',
      description: 'Place animals in their natural habitat groups!',
      difficulty: 'Medium',
      timeLimit: 120,
      pieces: [
        { id: 'lion', name: 'Lion', emoji: '🦁', color: 'bg-yellow-200', hint: 'King of the jungle' },
        { id: 'elephant', name: 'Elephant', emoji: '🐘', color: 'bg-gray-200', hint: 'Largest land animal' },
        { id: 'penguin', name: 'Penguin', emoji: '🐧', color: 'bg-blue-200', hint: 'Lives in cold places' },
        { id: 'monkey', name: 'Monkey', emoji: '🐵', color: 'bg-brown-200', hint: 'Swings on trees' },
        { id: 'fish', name: 'Fish', emoji: '🐠', color: 'bg-cyan-200', hint: 'Lives underwater' },
        { id: 'bird', name: 'Bird', emoji: '🐦', color: 'bg-green-200', hint: 'Flies in the sky' }
      ],
      slots: 6,
      hints: ['Think about where each animal lives', 'Land, sea, or air?', 'Hot or cold climates?']
    },
    {
      id: 'solar',
      name: 'Solar System',
      emoji: '🪐',
      description: 'Arrange planets in order from the Sun!',
      difficulty: 'Hard',
      timeLimit: 180,
      pieces: [
        { id: 'mercury', name: 'Mercury', emoji: '☿️', color: 'bg-gray-300', hint: 'Closest to Sun' },
        { id: 'venus', name: 'Venus', emoji: '♀️', color: 'bg-yellow-300', hint: 'Hottest planet' },
        { id: 'earth', name: 'Earth', emoji: '🌍', color: 'bg-blue-300', hint: 'Our home planet' },
        { id: 'mars', name: 'Mars', emoji: '♂️', color: 'bg-red-300', hint: 'The red planet' },
        { id: 'jupiter', name: 'Jupiter', emoji: '♃', color: 'bg-orange-300', hint: 'Largest planet' },
        { id: 'saturn', name: 'Saturn', emoji: '♄', color: 'bg-yellow-200', hint: 'Has beautiful rings' }
      ],
      slots: 6,
      hints: ['Mercury is first', 'Remember: My Very Educated Mother...', 'Earth is third from Sun']
    },
    {
      id: 'food',
      name: 'Healthy Meal',
      emoji: '🍽️',
      description: 'Create a balanced, nutritious meal!',
      difficulty: 'Easy',
      pieces: [
        { id: 'vegetables', name: 'Vegetables', emoji: '🥕', color: 'bg-green-200', hint: 'Good for your health' },
        { id: 'fruits', name: 'Fruits', emoji: '🍎', color: 'bg-red-200', hint: 'Sweet and nutritious' },
        { id: 'grains', name: 'Grains', emoji: '🍞', color: 'bg-brown-200', hint: 'Energy food' },
        { id: 'protein', name: 'Protein', emoji: '🥩', color: 'bg-pink-200', hint: 'Builds strong muscles' },
        { id: 'dairy', name: 'Dairy', emoji: '🥛', color: 'bg-white', hint: 'Good for bones' }
      ],
      slots: 5,
      hints: ['Think about food groups', 'Balance is key', 'All colors of the rainbow']
    },
    {
      id: 'house',
      name: 'Dream House',
      emoji: '🏠',
      description: 'Build your perfect house with all the parts!',
      difficulty: 'Medium',
      pieces: [
        { id: 'foundation', name: 'Foundation', emoji: '🟫', color: 'bg-brown-300', hint: 'Strong base of house' },
        { id: 'walls', name: 'Walls', emoji: '🧱', color: 'bg-red-200', hint: 'Keep the house together' },
        { id: 'roof', name: 'Roof', emoji: '🔺', color: 'bg-blue-200', hint: 'Protects from rain' },
        { id: 'door', name: 'Door', emoji: '🚪', color: 'bg-brown-200', hint: 'Way to enter house' },
        { id: 'windows', name: 'Windows', emoji: '🪟', color: 'bg-cyan-200', hint: 'Let light inside' },
        { id: 'chimney', name: 'Chimney', emoji: '🏠', color: 'bg-gray-200', hint: 'Smoke goes up here' }
      ],
      slots: 6,
      hints: ['Foundation goes first', 'Roof goes on top', 'Windows and doors in walls']
    }
  ];

  const currentPuzzleData = puzzles.find(p => p.id === currentPuzzle);

  const handleDragStart = (piece: PuzzlePiece) => {
    setDraggedPiece(piece);
  };

  const handleDrop = (slotId: string) => {
    if (draggedPiece) {
      setPlacedPieces(prev => ({
        ...prev,
        [currentPuzzle]: {
          ...prev[currentPuzzle],
          [slotId]: draggedPiece
        }
      }));
      setDraggedPiece(null);
      
      // Add score for correct placement
      setScore(prev => prev + 100);
      
      // Check if puzzle is complete
      const currentPieces = {
        ...placedPieces[currentPuzzle],
        [slotId]: draggedPiece
      };
      
      if (Object.keys(currentPieces).length === currentPuzzleData?.slots) {
        setCompletedPuzzles(prev => new Set([...prev, currentPuzzle]));
        triggerCelebration();
        setScore(prev => prev + 500); // Bonus for completion
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
    <div className="space-y-6">
      {/* Header with Puzzle Selection */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border-0 shadow-lg">
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
                {puzzles.map((puzzle) => (
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
                      className={`border-2 border-dashed rounded-xl p-4 min-h-20 flex items-center justify-center transition-all ${
                        placedPiece 
                          ? `${placedPiece.color} border-green-400 shadow-md` 
                          : 'border-gray-300 hover:border-blue-400 bg-gray-50 hover:bg-blue-50'
                      }`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(slotId)}
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
                {completedPuzzles.size}/{puzzles.length}
              </div>
              <div className="font-comic text-sm text-purple-600">
                Puzzles Completed
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(completedPuzzles.size / puzzles.length) * 100}%` }}
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