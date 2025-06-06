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
  const [sortedNumbers, setSortedNumbers] = useState<number[]>([]);

  const colors = ['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-pink-400', 'bg-yellow-400', 'bg-red-400', 'bg-indigo-400', 'bg-teal-400'];

  const generateBubbles = () => {
    const newBubbles: Bubble[] = [];
    
    // Generate 10 random numbers between 1 and 100
    const randomNumbers = [];
    while (randomNumbers.length < 10) {
      const num = Math.floor(Math.random() * 100) + 1;
      if (!randomNumbers.includes(num)) {
        randomNumbers.push(num);
      }
    }
    
    // Sort numbers for gameplay logic
    const sorted = [...randomNumbers].sort((a, b) => a - b);
    setSortedNumbers(sorted);
    setTargetNumber(sorted[0]);
    
    // Create bubbles with better spacing using grid layout
    for (let i = 0; i < 10; i++) {
      const cols = 5; // 5 columns
      const rows = 2; // 2 rows
      const row = Math.floor(i / cols);
      const col = i % cols;
      
      // Calculate position with padding
      const x = (col + 1) * (80 / (cols + 1)) + 10;
      const y = (row + 1) * (70 / (rows + 1)) + 15;
      
      newBubbles.push({
        id: i,
        number: randomNumbers[i],
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
      
      // Find next number in sequence
      const currentIndex = sortedNumbers.findIndex(num => num === targetNumber);
      const nextNumber = sortedNumbers[currentIndex + 1];
      
      if (nextNumber) {
        setTargetNumber(nextNumber);
      } else {
        // All numbers found - level complete
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 30);
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
    setSortedNumbers([]);
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

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4 animate-bounce">
            🫧 Number Bubble Pop
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Pop 10 random bubbles in numerical order from smallest to largest! Find number {targetNumber} next!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-purple-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg animate-fade-in">
            <div className="font-comic text-sm text-gray-600">Find Number</div>
            <div className="font-fredoka text-2xl font-bold text-green-600">{targetNumber}</div>
          </Card>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {!gameActive && !gameCompleted && (
            <Button 
              onClick={startGame}
              className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Game
            </Button>
          )}
          
          {gameActive && (
            <Button 
              onClick={() => setGameActive(false)}
              className="gradient-orange text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={resetGame}
            variant="outline"
            className="font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <Card className="relative h-96 bg-gradient-to-br from-cyan-100 to-blue-200 rounded-2xl shadow-lg overflow-hidden mb-8">
          {gameActive && (
            <div className="relative w-full h-full">
              {bubbles.map((bubble) => (
                <button
                  key={bubble.id}
                  onClick={() => popBubble(bubble)}
                  className={`absolute w-16 h-16 ${bubble.color} rounded-full flex items-center justify-center font-fredoka font-bold text-white text-xl shadow-lg transform transition-all duration-300 hover:scale-110 z-10 ${
                    bubble.popped ? 'opacity-30 scale-50 pointer-events-none' : 'animate-pulse hover:animate-none'
                  }`}
                  style={{
                    left: `${bubble.x}%`,
                    top: `${bubble.y}%`,
                    animationDelay: `${bubble.id * 0.1}s`,
                    transform: `translate(-50%, -50%) ${bubble.popped ? 'scale(0.5)' : 'scale(1)'}`
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
              <div className="text-center animate-fade-in">
                <div className="text-8xl mb-4 animate-bounce">🫧</div>
                <div className="font-fredoka text-3xl text-gray-700 mb-4">Ready to Pop Bubbles?</div>
                <div className="font-comic text-gray-600">Click the numbers in order from smallest to largest!</div>
              </div>
            </div>
          )}
        </Card>

        {gameActive && sortedNumbers.length > 0 && (
          <Card className="p-4 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Number Sequence (Smallest to Largest):</h3>
            <div className="flex flex-wrap gap-2">
              {sortedNumbers.map((number) => {
                const bubble = bubbles.find(b => b.number === number);
                const isPopped = bubble?.popped;
                const isTarget = number === targetNumber;
                
                return (
                  <Badge 
                    key={number} 
                    className={`font-comic ${
                      isPopped 
                        ? 'bg-green-500 text-white' 
                        : isTarget 
                          ? 'bg-orange-500 text-white animate-pulse' 
                          : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {number}
                  </Badge>
                );
              })}
            </div>
          </Card>
        )}

        {gameCompleted && (
          <Card className="p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl text-center animate-scale-in">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4 animate-bounce" />
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
                className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/games')}
                className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
              >
                Try Another Game
              </Button>
            </div>
          </Card>
        )}

        <Card className="p-6 bg-white rounded-2xl shadow-lg">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">How to Play:</h3>
          <ul className="font-comic text-gray-600 space-y-2">
            <li>• Click bubbles with 10 random numbers from 1-100 in numerical order (smallest to largest)</li>
            <li>• Each level generates a new set of 10 random numbers</li>
            <li>• Each correct click earns you points (more points at higher levels)</li>
            <li>• Wrong clicks reduce your score by 5 points</li>
            <li>• Complete all 10 numbers to advance levels and get more time</li>
            <li>• Try to get the highest score before time runs out!</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default NumberBubblePop;
