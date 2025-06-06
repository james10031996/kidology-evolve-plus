
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Star, Target, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import GameCompletionPopup from '@/components/GameCompletionPopup';

const NumberBubblePop = () => {
  const navigate = useNavigate();
  const [numbers, setNumbers] = useState<{ value: number; x: number; y: number; id: string; popped: boolean }[]>([]);
  const [currentTarget, setCurrentTarget] = useState(1);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showCompletionPopup, setShowCompletionPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const generateRandomNumbers = () => {
    const newNumbers: { value: number; x: number; y: number; id: string; popped: boolean }[] = [];
    const usedNumbers = new Set<number>();
    
    while (newNumbers.length < 10) {
      const value = Math.floor(Math.random() * 100) + 1;
      if (!usedNumbers.has(value)) {
        usedNumbers.add(value);
        
        let x, y;
        let attempts = 0;
        
        do {
          x = Math.random() * 70 + 5; // 5% to 75% from left
          y = Math.random() * 60 + 10; // 10% to 70% from top
          attempts++;
        } while (attempts < 50 && newNumbers.some(num => 
          Math.abs(num.x - x) < 12 || Math.abs(num.y - y) < 15
        ));

        newNumbers.push({
          value,
          x,
          y,
          id: `bubble-${value}`,
          popped: false
        });
      }
    }
    
    return newNumbers.sort((a, b) => a.value - b.value);
  };

  useEffect(() => {
    if (gameStarted && !gameCompleted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameCompleted(true);
            setShowCompletionPopup(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameStarted, gameCompleted]);

  const startGame = () => {
    setNumbers(generateRandomNumbers());
    setCurrentTarget(1);
    setScore(0);
    setGameStarted(true);
    setGameCompleted(false);
    setTimeLeft(60);
  };

  const popBubble = (bubble: { value: number; id: string }) => {
    if (gameCompleted) return;

    const sortedNumbers = numbers.filter(n => !n.popped).sort((a, b) => a.value - b.value);
    const nextTarget = sortedNumbers[0]?.value;

    if (bubble.value === nextTarget) {
      setNumbers(prev => prev.map(num => 
        num.id === bubble.id ? { ...num, popped: true } : num
      ));
      setScore(prev => prev + 100);
      
      // Check if all bubbles are popped
      const remainingBubbles = numbers.filter(n => !n.popped && n.id !== bubble.id);
      if (remainingBubbles.length === 0) {
        setGameCompleted(true);
        setShowCompletionPopup(true);
      }
    } else {
      setScore(prev => Math.max(0, prev - 20));
    }
  };

  const resetGame = () => {
    setNumbers([]);
    setCurrentTarget(1);
    setScore(0);
    setGameStarted(false);
    setGameCompleted(false);
    setTimeLeft(60);
  };

  const activeBubbles = numbers.filter(n => !n.popped);
  const nextTarget = activeBubbles.sort((a, b) => a.value - b.value)[0]?.value;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-teal-100">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🫧 Number Bubble Pop
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Pop the bubbles in numerical order from smallest to largest!
          </p>
        </div>

        {/* Game Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 bg-white rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="font-comic font-bold text-gray-700">Score</span>
            </div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{score}</div>
          </Card>
          
          <Card className="p-4 bg-white rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Target className="w-5 h-5 text-green-500 mr-2" />
              <span className="font-comic font-bold text-gray-700">Next Target</span>
            </div>
            <div className="font-fredoka text-2xl font-bold text-green-600">
              {gameStarted ? (nextTarget || 'Complete!') : '-'}
            </div>
          </Card>
          
          <Card className="p-4 bg-white rounded-xl shadow-lg text-center">
            <div className="flex items-center justify-center mb-2">
              <Timer className="w-5 h-5 text-orange-500 mr-2" />
              <span className="font-comic font-bold text-gray-700">Time Left</span>
            </div>
            <div className="font-fredoka text-2xl font-bold text-orange-600">{timeLeft}s</div>
          </Card>
          
          <Card className="p-4 bg-white rounded-xl shadow-lg text-center">
            <div className="font-comic font-bold text-gray-700 mb-2">Bubbles Left</div>
            <div className="font-fredoka text-2xl font-bold text-purple-600">{activeBubbles.length}</div>
          </Card>
        </div>

        {/* Game Area */}
        <Card className="relative h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg overflow-hidden mb-6">
          {!gameStarted ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">🫧</div>
                <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
                  Ready to Pop Some Bubbles?
                </h3>
                <Button 
                  onClick={startGame}
                  className="gradient-blue text-white font-comic font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
                >
                  Start Game
                </Button>
              </div>
            </div>
          ) : (
            <>
              {numbers.map((bubble) => (
                <div
                  key={bubble.id}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    bubble.popped ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                  }`}
                  style={{ 
                    left: `${bubble.x}%`, 
                    top: `${bubble.y}%`,
                  }}
                >
                  <div
                    onClick={() => popBubble(bubble)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center cursor-pointer transform transition-all duration-200 hover:scale-110 shadow-lg font-fredoka font-bold text-white ${
                      bubble.value === nextTarget 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse ring-4 ring-green-300' 
                        : 'bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600'
                    }`}
                  >
                    {bubble.value}
                  </div>
                </div>
              ))}
            </>
          )}
        </Card>

        {/* Controls */}
        <div className="text-center">
          {gameStarted && !gameCompleted && (
            <Button 
              onClick={resetGame}
              variant="outline"
              className="mr-4 font-comic font-bold border-2 border-red-300 text-red-600 hover:bg-red-50"
            >
              Reset Game
            </Button>
          )}
          
          {gameCompleted && (
            <Button 
              onClick={startGame}
              className="gradient-green text-white font-comic font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Play Again
            </Button>
          )}
        </div>

        {/* Game Instructions */}
        <Card className="mt-8 p-6 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
            🎯 How to Play
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">👀</div>
              <p className="font-comic text-gray-700">Look for the next smallest number</p>
            </div>
            <div>
              <div className="text-3xl mb-2">👆</div>
              <p className="font-comic text-gray-700">Click on the correct bubble</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🏆</div>
              <p className="font-comic text-gray-700">Pop all bubbles to win!</p>
            </div>
          </div>
        </Card>
      </div>

      <GameCompletionPopup
        isOpen={showCompletionPopup}
        onClose={() => setShowCompletionPopup(false)}
        score={score}
        stars={Math.floor(score / 100)}
        gameName="Number Bubble Pop"
      />
    </div>
  );
};

export default NumberBubblePop;
