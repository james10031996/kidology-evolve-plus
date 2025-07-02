
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Clock, Zap, Target, Trophy, Heart } from 'lucide-react';

interface MathExpression {
  id: number;
  expression: string;
  value: number;
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
}

interface GameStats {
  level: number;
  score: number;
  lives: number;
  timeLeft: number;
  streak: number;
  totalCorrect: number;
}

const MathBubbleGame = () => {
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    score: 0,
    lives: 3,
    timeLeft: 30,
    streak: 0,
    totalCorrect: 0
  });
  
  const [targetNumber, setTargetNumber] = useState(6);
  const [expressions, setExpressions] = useState<MathExpression[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'>('menu');
  const [feedback, setFeedback] = useState<string>('');
  const [powerUps, setPowerUps] = useState({
    timeFreeze: 1,
    hint: 1,
    extraLife: 0
  });

  const bubbleColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const generateExpression = useCallback((target: number, shouldBeCorrect: boolean, level: number) => {
    const operations = ['+', '-', '×', '÷'];
    let expression = '';
    let value = 0;
    
    if (shouldBeCorrect) {
      // Generate correct expressions
      const op = operations[Math.floor(Math.random() * Math.min(operations.length, level === 1 ? 2 : level === 2 ? 3 : 4))];
      
      switch (op) {
        case '+':
          const add1 = Math.floor(Math.random() * target) + 1;
          const add2 = target - add1;
          expression = `${add1} + ${add2}`;
          value = add1 + add2;
          break;
        case '-':
          const sub1 = target + Math.floor(Math.random() * 10) + 1;
          const sub2 = sub1 - target;
          expression = `${sub1} - ${sub2}`;
          value = sub1 - sub2;
          break;
        case '×':
          const factors = [];
          for (let i = 1; i <= target; i++) {
            if (target % i === 0) factors.push(i);
          }
          if (factors.length > 1) {
            const factor = factors[Math.floor(Math.random() * factors.length)];
            expression = `${factor} × ${target / factor}`;
            value = factor * (target / factor);
          } else {
            expression = `${target} × 1`;
            value = target;
          }
          break;
        case '÷':
          const mult = Math.floor(Math.random() * 5) + 2;
          expression = `${target * mult} ÷ ${mult}`;
          value = (target * mult) / mult;
          break;
        default:
          expression = `${target}`;
          value = target;
      }
    } else {
      // Generate incorrect expressions
      const op = operations[Math.floor(Math.random() * Math.min(operations.length, level === 1 ? 2 : level === 2 ? 3 : 4))];
      let result = target;
      
      while (result === target) {
        switch (op) {
          case '+':
            const a1 = Math.floor(Math.random() * 10) + 1;
            const a2 = Math.floor(Math.random() * 10) + 1;
            expression = `${a1} + ${a2}`;
            result = a1 + a2;
            break;
          case '-':
            const s1 = Math.floor(Math.random() * 15) + target;
            const s2 = Math.floor(Math.random() * 10) + 1;
            expression = `${s1} - ${s2}`;
            result = s1 - s2;
            break;
          case '×':
            const m1 = Math.floor(Math.random() * 8) + 1;
            const m2 = Math.floor(Math.random() * 8) + 1;
            expression = `${m1} × ${m2}`;
            result = m1 * m2;
            break;
          case '÷':
            const d1 = Math.floor(Math.random() * 50) + 10;
            const d2 = Math.floor(Math.random() * 5) + 2;
            if (d1 % d2 === 0) {
              expression = `${d1} ÷ ${d2}`;
              result = d1 / d2;
            } else {
              expression = `${d1 - (d1 % d2)} ÷ ${d2}`;
              result = (d1 - (d1 % d2)) / d2;
            }
            break;
        }
      }
      value = result;
    }
    
    return { expression, value };
  }, []);

  const generateBubbles = useCallback(() => {
    const level = gameStats.level;
    const bubbleCount = Math.min(6 + level, 12);
    const correctCount = Math.max(2, Math.floor(bubbleCount / 3));
    
    const newExpressions: MathExpression[] = [];
    
    // Generate correct expressions
    for (let i = 0; i < correctCount; i++) {
      const { expression, value } = generateExpression(targetNumber, true, level);
      newExpressions.push({
        id: i,
        expression,
        value,
        isCorrect: true,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        clicked: false,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
      });
    }
    
    // Generate incorrect expressions
    for (let i = correctCount; i < bubbleCount; i++) {
      const { expression, value } = generateExpression(targetNumber, false, level);
      newExpressions.push({
        id: i,
        expression,
        value,
        isCorrect: false,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        clicked: false,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)]
      });
    }
    
    setExpressions(newExpressions);
  }, [targetNumber, gameStats.level, generateExpression]);

  const startGame = () => {
    setGameState('playing');
    setGameStats({
      level: 1,
      score: 0,
      lives: 3,
      timeLeft: 30,
      streak: 0,
      totalCorrect: 0
    });
    setTargetNumber(Math.floor(Math.random() * 15) + 5);
    generateBubbles();
  };

  const handleBubbleClick = (bubble: MathExpression) => {
    if (bubble.clicked) return;
    
    const newExpressions = expressions.map(exp => 
      exp.id === bubble.id ? { ...exp, clicked: true } : exp
    );
    setExpressions(newExpressions);
    
    if (bubble.isCorrect) {
      setGameStats(prev => ({
        ...prev,
        score: prev.score + (10 * (prev.level + prev.streak)),
        streak: prev.streak + 1,
        totalCorrect: prev.totalCorrect + 1
      }));
      setFeedback('Correct! ✨');
      
      setTimeout(() => setFeedback(''), 1000);
      
      // Check if all correct bubbles are clicked
      const allCorrectClicked = newExpressions
        .filter(exp => exp.isCorrect)
        .every(exp => exp.clicked);
      
      if (allCorrectClicked) {
        setTimeout(() => {
          setGameState('levelComplete');
        }, 500);
      }
    } else {
      setGameStats(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0
      }));
      setFeedback('Wrong! ❌');
      
      setTimeout(() => setFeedback(''), 1000);
      
      if (gameStats.lives <= 1) {
        setTimeout(() => {
          setGameState('gameOver');
        }, 1000);
      }
    }
  };

  const nextLevel = () => {
    const newLevel = gameStats.level + 1;
    const newTimeLimit = Math.max(15, 35 - newLevel * 2);
    
    setGameStats(prev => ({
      ...prev,
      level: newLevel,
      timeLeft: newTimeLimit,
      streak: 0
    }));
    
    setTargetNumber(Math.floor(Math.random() * (10 + newLevel * 3)) + 5);
    generateBubbles();
    setGameState('playing');
  };

  const usePowerUp = (type: 'timeFreeze' | 'hint' | 'extraLife') => {
    if (powerUps[type] <= 0) return;
    
    setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));
    
    switch (type) {
      case 'timeFreeze':
        // Freeze time for 5 seconds (implemented in timer effect)
        setFeedback('Time Frozen! ❄️');
        setTimeout(() => setFeedback(''), 2000);
        break;
      case 'hint':
        // Highlight one correct answer
        const correctBubble = expressions.find(exp => exp.isCorrect && !exp.clicked);
        if (correctBubble) {
          setFeedback(`Hint: ${correctBubble.expression} = ${correctBubble.value}`);
          setTimeout(() => setFeedback(''), 3000);
        }
        break;
      case 'extraLife':
        setGameStats(prev => ({ ...prev, lives: prev.lives + 1 }));
        setFeedback('Extra Life! ❤️');
        setTimeout(() => setFeedback(''), 2000);
        break;
    }
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && gameStats.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameStats(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && gameStats.timeLeft === 0) {
      setGameState('gameOver');
    }
  }, [gameState, gameStats.timeLeft]);

  // Generate new bubbles when target changes
  useEffect(() => {
    if (gameState === 'playing') {
      generateBubbles();
    }
  }, [generateBubbles, gameState]);

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-6">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-fredoka text-6xl font-bold gradient-text animate-bounce">
              🧮 Math Bubble Pop!
            </h1>
            <p className="font-comic text-xl text-gray-700">
              Pop all the bubbles with expressions that equal the target number!
            </p>
          </div>
          
          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="font-fredoka text-2xl font-bold mb-4">How to Play:</h2>
            <div className="space-y-3 text-left font-comic">
              <div className="flex items-center space-x-3">
                <Target className="w-6 h-6 text-blue-500" />
                <span>Find the target number at the top</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-500" />
                <span>Pop bubbles with expressions that equal the target</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-red-500" />
                <span>Beat the clock to advance levels</span>
              </div>
              <div className="flex items-center space-x-3">
                <Star className="w-6 h-6 text-purple-500" />
                <span>Build streaks for bonus points</span>
              </div>
            </div>
          </Card>
          
          <Button 
            onClick={startGame}
            size="lg"
            className="font-fredoka text-xl px-8 py-4 gradient-purple text-white hover:scale-105 transition-transform"
          >
            🚀 Start Playing!
          </Button>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-6 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
          <h2 className="font-fredoka text-4xl font-bold text-red-600 mb-4">Game Over!</h2>
          <div className="space-y-3 font-comic text-lg">
            <p>Final Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
            <p>Level Reached: <span className="font-bold text-blue-600">{gameStats.level}</span></p>
            <p>Correct Answers: <span className="font-bold text-green-600">{gameStats.totalCorrect}</span></p>
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <Button onClick={startGame} className="gradient-green text-white font-comic">
              🔄 Play Again
            </Button>
            <Button onClick={() => setGameState('menu')} variant="outline" className="font-comic">
              🏠 Menu
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="font-fredoka text-4xl font-bold text-green-600 mb-4">Level Complete!</h2>
          <div className="space-y-2 font-comic text-lg mb-6">
            <p>Level {gameStats.level} completed! 🎉</p>
            <p>Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
            {gameStats.streak > 3 && <p>Amazing streak! 🔥</p>}
          </div>
          <Button onClick={nextLevel} className="gradient-blue text-white font-comic text-lg px-6">
            ➡️ Next Level
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
      {/* Game Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="font-fredoka text-sm text-gray-600">Level</div>
              <div className="font-bold text-2xl text-blue-600">{gameStats.level}</div>
            </div>
            <div className="text-center">
              <div className="font-fredoka text-sm text-gray-600">Score</div>
              <div className="font-bold text-2xl text-purple-600">{gameStats.score}</div>
            </div>
            <div className="text-center">
              <div className="font-fredoka text-sm text-gray-600">Streak</div>
              <div className="font-bold text-2xl text-orange-600">{gameStats.streak}</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="font-fredoka text-6xl font-bold text-gray-800 mb-2">
              Target: <span className="gradient-text">{targetNumber}</span>
            </div>
            <div className="font-comic text-lg text-gray-600">Find expressions that equal this number!</div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: gameStats.lives }).map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
              ))}
            </div>
            <div className="text-center">
              <Clock className="w-6 h-6 text-red-500 mx-auto" />
              <div className="font-bold text-xl text-red-600">{gameStats.timeLeft}s</div>
            </div>
          </div>
        </div>

        {/* Power-ups */}
        <div className="flex justify-center space-x-3 mb-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => usePowerUp('timeFreeze')}
            disabled={powerUps.timeFreeze === 0}
            className="font-comic"
          >
            ❄️ Freeze ({powerUps.timeFreeze})
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => usePowerUp('hint')}
            disabled={powerUps.hint === 0}
            className="font-comic"
          >
            💡 Hint ({powerUps.hint})
          </Button>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-comic text-lg font-bold animate-bounce">
              {feedback}
            </div>
          </div>
        )}

        {/* Game Area */}
        <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
          {expressions.map((bubble) => (
            <button
              key={bubble.id}
              onClick={() => handleBubbleClick(bubble)}
              disabled={bubble.clicked}
              className={`
                absolute w-20 h-20 rounded-full flex items-center justify-center
                font-comic font-bold text-white text-sm shadow-lg
                transition-all duration-300 hover:scale-110
                ${bubble.clicked 
                  ? 'opacity-50 scale-90' 
                  : `bg-gradient-to-br ${bubble.color} animate-float hover:shadow-2xl`
                }
              `}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                animationDelay: `${bubble.id * 0.2}s`
              }}
            >
              {bubble.expression}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathBubbleGame;
