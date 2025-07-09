
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import confetti from 'canvas-confetti';
import GameState from './components/GameState';
import BadgeSystem from './components/BadgeSystem';
import { generateBubbles } from './utils/expressionGenerator';
import { calculateScore, getTimeLimit, checkForBadges, saveGameState, loadGameState } from './utils/gameLogic';

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
  highScore: number;
  badges: { [key: string]: boolean };
}

const MathBubbleGame = () => {
  const navigate = useNavigate();
  
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    score: 0,
    lives: 3,
    timeLeft: 45,
    streak: 0,
    totalCorrect: 0,
    highScore: parseInt(localStorage.getItem('mathBubbleHighScore') || '0'),
    badges: {}
  });

  const [targetNumber, setTargetNumber] = useState(6);
  const [expressions, setExpressions] = useState<MathExpression[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'>('menu');
  const [feedback, setFeedback] = useState<string>('');
  const [levelProgress, setLevelProgress] = useState(0);
  const [isSpeedRound, setIsSpeedRound] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [solveStartTime, setSolveStartTime] = useState<number>(Date.now());
  
  const badgesList = [
    { id: 'streak5', name: 'Streak Master', description: '5 in a row!', icon: 'zap', earned: gameStats.badges?.streak5 || false, condition: 'Get 5 correct in a row' },
    { id: 'streak10', name: 'Unstoppable', description: '10 in a row!', icon: 'crown', earned: gameStats.badges?.streak10 || false, condition: 'Get 10 correct in a row' },
    { id: 'level10', name: 'Champion', description: 'Reached level 10!', icon: 'trophy', earned: gameStats.badges?.level10 || false, condition: 'Reach level 10' },
    { id: 'correct50', name: 'Math Wizard', description: '50 correct answers!', icon: 'star', earned: gameStats.badges?.correct50 || false, condition: 'Answer 50 questions correctly' },
    { id: 'highScore', name: 'Record Breaker', description: 'New high score!', icon: 'target', earned: gameStats.badges?.highScore || false, condition: 'Beat your high score' }
  ];

  const generateNewBubbles = useCallback(() => {
    const newExpressions = generateBubbles(targetNumber, gameStats.level);
    setExpressions(newExpressions);
    setSolveStartTime(Date.now());
  }, [targetNumber, gameStats.level]);

  const startGame = () => {
    // Try to load saved state
    const savedState = loadGameState();
    if (savedState) {
      setGameStats(savedState);
      setGameState('playing');
      setTargetNumber(Math.floor(Math.random() * (10 + savedState.level * 3)) + 5);
    } else {
      setGameState('playing');
      setGameStats({
        level: 1,
        score: 0,
        lives: 3,
        timeLeft: 45,
        streak: 0,
        totalCorrect: 0,
        highScore: parseInt(localStorage.getItem('mathBubbleHighScore') || '0'),
        badges: {}
      });
      setTargetNumber(Math.floor(Math.random() * 15) + 5);
    }
    setIsSpeedRound(false);
    generateNewBubbles();
  };

  const handleBubbleClick = (bubble: MathExpression) => {
    if (bubble.clicked) return;

    const solveTime = (Date.now() - solveStartTime) / 1000;
    const timeBonus = solveTime < 5;

    const newExpressions = expressions.map(exp =>
      exp.id === bubble.id ? { ...exp, clicked: true } : exp
    );
    setExpressions(newExpressions);

    if (bubble.isCorrect) {
      const scoreGained = calculateScore(gameStats.level, gameStats.streak, timeBonus, isSpeedRound);
      const newStats = {
        ...gameStats,
        score: gameStats.score + scoreGained,
        streak: gameStats.streak + 1,
        totalCorrect: gameStats.totalCorrect + 1
      };

      // Check for new high score
      if (newStats.score > newStats.highScore) {
        newStats.highScore = newStats.score;
        localStorage.setItem('mathBubbleHighScore', newStats.score.toString());
        confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
        setFeedback('🏆 NEW HIGH SCORE! 🏆');
      } else {
        setFeedback(`Correct! ✨ ${timeBonus ? '⚡ Speed Bonus!' : ''} +${scoreGained}`);
      }

      setGameStats(newStats);

      // Check for badges
      const earnedBadges = checkForBadges(newStats);
      if (earnedBadges.length > 0) {
        setNewBadges(earnedBadges.map(b => b.name));
        setGameStats(prev => ({
          ...prev,
          badges: { ...prev.badges, ...Object.fromEntries(earnedBadges.map(b => [b.id, true])) }
        }));
      }

      setTimeout(() => setFeedback(''), 2000);

      // Check if all correct bubbles are clicked
      const allCorrectClicked = newExpressions
        .filter(exp => exp.isCorrect)
        .every(exp => exp.clicked);

      if (allCorrectClicked) {
        const correctCount = newExpressions.filter(exp => exp.isCorrect).length;
        setLevelProgress(prev => Math.min(100, prev + (correctCount * 25)));
        
        setTimeout(() => {
          if (levelProgress >= 100) {
            setGameState('levelComplete');
          } else {
            generateNewBubbles();
          }
        }, 1000);
      }

      // Auto-save progress
      saveGameState(newStats);
    } else {
      setGameStats(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0
      }));
      setFeedback('Wrong! ❌ Try again!');

      setTimeout(() => setFeedback(''), 1500);

      if (gameStats.lives <= 1) {
        setTimeout(() => {
          setGameState('gameOver');
        }, 1000);
      }
    }
  };

  const nextLevel = () => {
    const newLevel = gameStats.level + 1;
    const newTimeLimit = getTimeLimit(newLevel, false);
    const speedRound = newLevel % 5 === 0; // Every 5th level is a speed round

    setGameStats(prev => ({
      ...prev,
      level: newLevel,
      timeLeft: newTimeLimit,
      streak: 0,
      lives: Math.min(5, prev.lives + 1) // Bonus life each level, max 5
    }));

    setTargetNumber(Math.floor(Math.random() * (10 + newLevel * 3)) + 5);
    setLevelProgress(0);
    setIsSpeedRound(speedRound);
    
    if (speedRound) {
      setFeedback('🚀 SPEED ROUND! Double points! 🚀');
      setTimeout(() => setFeedback(''), 3000);
    }

    generateNewBubbles();
    setGameState('playing');
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

  // Generate new bubbles when needed
  useEffect(() => {
    if (gameState === 'playing') {
      generateNewBubbles();
    }
  }, [generateNewBubbles, gameState]);

  // Clear new badges notification
  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => setNewBadges([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [newBadges]);

  if (gameState === 'menu') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-6">
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
              <h2 className="font-fredoka text-2xl font-bold mb-4">Enhanced Features:</h2>
              <div className="space-y-3 text-left font-comic">
                <div className="flex items-center space-x-3">
                  <span>🔢</span>
                  <span>Complex expressions with up to 5 numbers</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>⚡</span>
                  <span>Speed bonus for solving in under 5 seconds</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🏅</span>
                  <span>Achievement badges for milestones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>🚀</span>
                  <span>Speed rounds every 5 levels with double points</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span>💾</span>
                  <span>Auto-save progress with crash protection</span>
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
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-6 flex items-center justify-center">
          <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
            <h2 className="font-fredoka text-4xl font-bold text-red-600 mb-4">Game Over!</h2>
            <div className="space-y-3 font-comic text-lg">
              <p>Final Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
              <p>Level Reached: <span className="font-bold text-blue-600">{gameStats.level}</span></p>
              <p>Correct Answers: <span className="font-bold text-green-600">{gameStats.totalCorrect}</span></p>
              <p>High Score: <span className="font-bold text-yellow-600">{gameStats.highScore}</span></p>
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
      </div>
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6 flex items-center justify-center">
          <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="font-fredoka text-4xl font-bold text-green-600 mb-4">Level Complete!</h2>
            <div className="space-y-2 font-comic text-lg mb-6">
              <p>Level {gameStats.level} completed! 🎉</p>
              <p>Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
              {gameStats.streak > 5 && <p>Amazing streak! 🔥</p>}
              {isSpeedRound && <p>Speed Round Bonus! ⚡</p>}
            </div>
            <Button onClick={nextLevel} className="gradient-blue text-white font-comic text-lg px-6">
              ➡️ Next Level
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-6">
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

        <GameState 
          gameStats={gameStats}
          targetNumber={targetNumber}
          levelProgress={levelProgress}
          isSpeedRound={isSpeedRound}
        />

        {/* Feedback */}
        {feedback && (
          <div className="text-center mb-4">
            <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-comic text-lg font-bold animate-bounce">
              {feedback}
            </div>
          </div>
        )}

        {/* Badge System */}
        {(newBadges.length > 0 || Object.keys(gameStats.badges).length > 0) && (
          <div className="max-w-4xl mx-auto mb-4">
            <BadgeSystem badges={badgesList} recentBadge={newBadges[0]} />
          </div>
        )}

        {/* Game Area */}
        <div className="max-w-6xl mx-auto">
          <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
            {expressions.map((bubble) => (
              <button
                key={bubble.id}
                onClick={() => handleBubbleClick(bubble)}
                disabled={bubble.clicked}
                className={`
                  absolute w-20 h-20 rounded-full flex items-center justify-center
                  font-comic font-bold text-white text-xs shadow-lg
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
    </div>
  );
};

export default MathBubbleGame;
