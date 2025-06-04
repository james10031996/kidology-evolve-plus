
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Pause, RotateCcw, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

interface Bubble {
  id: number;
  number: number;
  x: number;
  y: number;
  color: string;
  popped: boolean;
}

const NumberBubblePop = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [targetNumber, setTargetNumber] = useState(1);
  const [gameCompleted, setGameCompleted] = useState(false);

  const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400', 'bg-red-400'];

  const generateBubbles = () => {
    const newBubbles: Bubble[] = [];
    const numbersToShow = Math.min(15, level + 8);
    const maxNumber = Math.max(10, level * 3);
    
    // Create array of unique numbers
    const availableNumbers = Array.from({ length: maxNumber }, (_, i) => i + 1);
    const shuffledNumbers = availableNumbers.sort(() => Math.random() - 0.5);
    const selectedNumbers = shuffledNumbers.slice(0, numbersToShow);
    
    for (let i = 0; i < numbersToShow; i++) {
      let x, y;
      let attempts = 0;
      
      // Ensure bubbles don't overlap
      do {
        x = Math.random() * 75 + 5;
        y = Math.random() * 65 + 10;
        attempts++;
      } while (attempts < 10 && newBubbles.some(bubble => 
        Math.abs(bubble.x - x) < 15 && Math.abs(bubble.y - y) < 15
      ));
      
      newBubbles.push({
        id: i,
        number: selectedNumbers[i],
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        popped: false
      });
    }
    setBubbles(newBubbles);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setTargetNumber(1);
    setGameCompleted(false);
    generateBubbles();
  };

  const popBubble = (bubble: Bubble) => {
    if (!gameActive || bubble.popped) return;

    if (bubble.number === targetNumber) {
      setBubbles(prev => prev.map(b => 
        b.id === bubble.id ? { ...b, popped: true } : b
      ));
      setScore(prev => prev + (level * 10));
      setTargetNumber(prev => prev + 1);
      
      // Check if all sequential numbers up to 10 are found
      const maxTarget = Math.min(10, Math.max(...bubbles.map(b => b.number)));
      if (targetNumber >= maxTarget) {
        setLevel(prev => prev + 1);
        setTargetNumber(1);
        setTimeLeft(prev => prev + 20);
        setTimeout(() => generateBubbles(), 1000);
      }
    } else {
      setScore(prev => Math.max(0, prev - 5));
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(60);
    setTargetNumber(1);
    setBubbles([]);
    setGameCompleted(false);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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

        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🫧 Number Bubble Pop
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Pop the bubbles in order from {targetNumber} onwards! Be quick and accurate to earn more points!
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-purple-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Find Number</div>
            <div className="font-fredoka text-2xl font-bold text-green-600">{targetNumber}</div>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center space-x-4 mb-8">
          {!gameActive && !gameCompleted && (
            <Button 
              onClick={startGame}
              className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          )}
          
          {gameActive && (
            <Button 
              onClick={() => setGameActive(false)}
              className="gradient-orange text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
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

        {/* Game Area */}
        <Card className="relative h-96 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg overflow-hidden mb-8">
          {gameActive && (
            <div className="relative w-full h-full">
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => popBubble(bubble)}
                  className={`absolute w-16 h-16 ${bubble.color} rounded-full flex items-center justify-center font-fredoka font-bold text-white text-xl shadow-lg transform transition-all duration-200 hover:scale-110 ${
                    bubble.popped ? 'opacity-30 scale-50' : 'animate-bounce'
                  }`}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    animationDelay: `${bubble.id * 0.1}s`
                  }}
                  disabled={bubble.popped}
                >
                  {bubble.number}
                </button>
              ))}
              
              {!gameActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-2xl">
                  <div className="text-center text-white">
                    <div className="text-6xl mb-4">⏸️</div>
                    <div className="font-fredoka text-2xl">Game Paused</div>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {!gameActive && !gameCompleted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🫧</div>
                <div className="font-fredoka text-3xl text-gray-700 mb-4">Ready to Pop Some Bubbles?</div>
                <div className="font-comic text-gray-600">Click the numbers in order starting from 1!</div>
              </div>
            </div>
          )}
        </Card>

        {/* Game Completed */}
        {gameCompleted && (
          <Card className="p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl text-center">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              🎉 Game Complete! 🎉
            </h2>
            <p className="font-comic text-lg text-gray-700 mb-4">
              Final Score: <span className="font-bold text-blue-600">{score}</span>
            </p>
            <p className="font-comic text-lg text-gray-700 mb-6">
              You reached Level {level} and earned {Math.floor(score / 10)} stars!
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
                className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                Try Another Game
              </Button>
            </div>
          </Card>
        )}

        {/* Instructions */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">How to Play:</h3>
          <ul className="font-comic text-gray-600 space-y-2">
            <li>• Click the bubbles in numerical order starting from 1</li>
            <li>• Each correct click earns you points (more points at higher levels)</li>
            <li>• Wrong clicks reduce your score by 5 points</li>
            <li>• Complete sequences to advance levels</li>
            <li>• Higher levels have more bubbles and give more points</li>
            <li>• Try to get the highest score before time runs out!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default NumberBubblePop;
