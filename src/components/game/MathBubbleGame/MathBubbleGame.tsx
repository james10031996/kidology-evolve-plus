
import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import confetti from 'canvas-confetti';
import GameState from './components/GameState';
import BadgeSystem from './components/BadgeSystem';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import LevelComplete from './components/LevelComplete';
import BubbleArea from './components/BubbleArea';
import FeedbackDisplay from './components/FeedbackDisplay';
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const levelCompleteRef = useRef<boolean>(false);
  const confettiTriggeredRef = useRef<boolean>(false);
  
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

  // Clear timer function
  const clearGameTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start stable timer
  const startTimer = useCallback(() => {
    clearGameTimer();
    timerRef.current = setInterval(() => {
      setGameStats(prev => {
        const newTime = prev.timeLeft - 1;
        if (newTime <= 0) {
          return { ...prev, timeLeft: 0 };
        }
        return { ...prev, timeLeft: newTime };
      });
    }, 1000);
  }, [clearGameTimer]);

  const generateNewBubbles = useCallback(() => {
    const newExpressions = generateBubbles(targetNumber, gameStats.level);
    setExpressions(newExpressions);
    setSolveStartTime(Date.now());
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
  }, [targetNumber, gameStats.level]);

  const startGame = () => {
    const savedState = loadGameState();
    if (savedState) {
      setGameStats(savedState);
      setGameState('playing');
      setTargetNumber(Math.floor(Math.random() * (10 + savedState.level * 3)) + 5);
    } else {
      setGameStats({
        level: 1,
        score: 0,
        lives: 3,
        timeLeft: getTimeLimit(1, false),
        streak: 0,
        totalCorrect: 0,
        highScore: parseInt(localStorage.getItem('mathBubbleHighScore') || '0'),
        badges: {}
      });
      setTargetNumber(Math.floor(Math.random() * 15) + 5);
    }
    
    setLevelProgress(0);
    setIsSpeedRound(false);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    
    generateNewBubbles();
    startTimer();
  };

  const handleBubbleClick = (bubble: MathExpression) => {
    if (bubble.clicked || levelCompleteRef.current) return;

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

      if (newStats.score > newStats.highScore) {
        newStats.highScore = newStats.score;
        localStorage.setItem('mathBubbleHighScore', newStats.score.toString());
        if (!confettiTriggeredRef.current) {
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
          confettiTriggeredRef.current = true;
        }
        setFeedback('🏆 NEW HIGH SCORE! 🏆');
      } else {
        const speedText = isSpeedRound ? ' (2x Speed Round!)' : '';
        setFeedback(`Correct! ✨ ${timeBonus ? '⚡ Speed Bonus!' : ''} +${scoreGained}${speedText}`);
      }

      setGameStats(newStats);

      const earnedBadges = checkForBadges(newStats);
      if (earnedBadges.length > 0) {
        setNewBadges(earnedBadges.map(b => b.name));
        setGameStats(prev => ({
          ...prev,
          badges: { ...prev.badges, ...Object.fromEntries(earnedBadges.map(b => [b.id, true])) }
        }));
      }

      setTimeout(() => setFeedback(''), 2000);

      const allCorrectClicked = newExpressions
        .filter(exp => exp.isCorrect)
        .every(exp => exp.clicked);

      if (allCorrectClicked && !levelCompleteRef.current) {
        levelCompleteRef.current = true;
        const correctCount = newExpressions.filter(exp => exp.isCorrect).length;
        const progressIncrease = correctCount * 25;
        const newProgress = Math.min(100, levelProgress + progressIncrease);
        setLevelProgress(newProgress);
        
        setTimeout(() => {
          if (newProgress >= 100) {
            clearGameTimer();
            setGameState('levelComplete');
          } else {
            generateNewBubbles();
          }
        }, 1000);
      }

      saveGameState(newStats);
    } else {
      const newLives = gameStats.lives - 1;
      setGameStats(prev => ({
        ...prev,
        lives: newLives,
        streak: 0
      }));
      setFeedback('Wrong! ❌ Try again!');

      setTimeout(() => setFeedback(''), 1500);

      if (newLives <= 0) {
        clearGameTimer();
        setTimeout(() => {
          setGameState('gameOver');
        }, 1000);
      }
    }
  };

  const nextLevel = () => {
    const newLevel = gameStats.level + 1;
    const speedRound = newLevel % 5 === 0;
    const newTimeLimit = getTimeLimit(newLevel, speedRound);

    setGameStats(prev => ({
      ...prev,
      level: newLevel,
      timeLeft: newTimeLimit,
      streak: 0,
      lives: Math.min(5, prev.lives + 1)
    }));

    setTargetNumber(Math.floor(Math.random() * (10 + newLevel * 3)) + 5);
    setLevelProgress(0);
    setIsSpeedRound(speedRound);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    
    if (speedRound) {
      setFeedback('🚀 SPEED ROUND! Double points! 🚀');
      setTimeout(() => setFeedback(''), 3000);
    }

    generateNewBubbles();
    setGameState('playing');
    startTimer();
  };

  // Timer effect with proper cleanup
  useEffect(() => {
    if (gameState === 'playing') {
      startTimer();
    } else {
      clearGameTimer();
    }

    return () => {
      clearGameTimer();
    };
  }, [gameState, startTimer, clearGameTimer]);

  // Game over check effect
  useEffect(() => {
    if (gameState === 'playing' && gameStats.timeLeft === 0) {
      clearGameTimer();
      setGameState('gameOver');
    }
  }, [gameStats.timeLeft, gameState, clearGameTimer]);

  // Generate new bubbles when needed
  useEffect(() => {
    if (gameState === 'playing' && expressions.length === 0) {
      generateNewBubbles();
    }
  }, [generateNewBubbles, gameState, expressions.length]);

  // Clear new badges notification
  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => setNewBadges([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [newBadges]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearGameTimer();
    };
  }, [clearGameTimer]);

  if (gameState === 'menu') {
    return <GameMenu onStartGame={startGame} />;
  }

  if (gameState === 'gameOver') {
    return (
      <GameOver 
        gameStats={gameStats}
        onRestart={startGame}
        onMenu={() => setGameState('menu')}
      />
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <LevelComplete 
        gameStats={gameStats}
        isSpeedRound={isSpeedRound}
        onNextLevel={nextLevel}
      />
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

        <FeedbackDisplay feedback={feedback} />

        {(newBadges.length > 0 || Object.keys(gameStats.badges).length > 0) && (
          <div className="max-w-4xl mx-auto mb-4">
            <BadgeSystem badges={badgesList} recentBadge={newBadges[0]} />
          </div>
        )}

        <BubbleArea expressions={expressions} onBubbleClick={handleBubbleClick} />
      </div>
    </div>
  );
};

export default MathBubbleGame;
