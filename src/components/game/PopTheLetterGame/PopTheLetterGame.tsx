import { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import confetti from 'canvas-confetti';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import LevelComplete from './components/LevelComplete';
import GameState from './components/GameState';
import BadgeSystem from './components/BadgeSystem';
import EnhancedBubbleArea from './components/EnhancedBubbleArea';
import FeedbackDisplay from './components/FeedbackDisplay';
import { generateLetterBubbles } from './utils/letterBubbleGenerator';
import { calculateScore, getTimeLimit, checkForBadges, saveGameState, loadGameState } from './utils/gameLogic';

interface LetterBubble {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
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
  currentLetter: string;
  mode: 'series' | 'random';
}

const PopTheLetterGame = () => {
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
    highScore: parseInt(localStorage.getItem('popLetterHighScore') || '0'),
    badges: {},
    currentLetter: 'A',
    mode: 'series'
  });

  const [bubbles, setBubbles] = useState<LetterBubble[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'>('menu');
  const [feedback, setFeedback] = useState<string>('');
  const [levelProgress, setLevelProgress] = useState(0);
  const [isSpeedRound, setIsSpeedRound] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [solveStartTime, setSolveStartTime] = useState<number>(Date.now());
  const [selectedBubble, setSelectedBubble] = useState<LetterBubble | null>(null);
  
  const badgesList = [
    { id: 'streak5', name: 'Letter Streak', description: '5 in a row!', icon: 'zap', earned: gameStats.badges?.streak5 || false, condition: 'Get 5 correct in a row' },
    { id: 'streak10', name: 'Alphabet Ace', description: '10 in a row!', icon: 'crown', earned: gameStats.badges?.streak10 || false, condition: 'Get 10 correct in a row' },
    { id: 'alphabetMaster', name: 'Alphabet Master', description: 'Complete A-Z!', icon: 'trophy', earned: gameStats.badges?.alphabetMaster || false, condition: 'Complete all letters A-Z' },
    { id: 'correct50', name: 'Word Wizard', description: '50 correct bubbles!', icon: 'star', earned: gameStats.badges?.correct50 || false, condition: 'Pop 50 bubbles correctly' },
    { id: 'highScore', name: 'Record Breaker', description: 'New high score!', icon: 'target', earned: gameStats.badges?.highScore || false, condition: 'Beat your high score' }
  ];

  const clearGameTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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
    const newBubbles = generateLetterBubbles(gameStats.currentLetter);
    setBubbles(newBubbles);
    setSolveStartTime(Date.now());
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
  }, [gameStats.currentLetter]);

  const startGame = (mode: 'series' | 'random') => {
    const savedState = loadGameState();
    if (savedState && savedState.mode === mode) {
      setGameStats(savedState);
      setGameState('playing');
    } else {
      setGameStats({
        level: 1,
        score: 0,
        lives: 3,
        timeLeft: getTimeLimit(1, false),
        streak: 0,
        totalCorrect: 0,
        highScore: parseInt(localStorage.getItem('popLetterHighScore') || '0'),
        badges: {},
        currentLetter: mode === 'series' ? 'A' : String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        mode
      });
    }
    
    setLevelProgress(0);
    setIsSpeedRound(false);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    
    generateNewBubbles();
    startTimer();
  };

  const handleBubbleClick = (bubble: LetterBubble) => {
    if (bubble.clicked || levelCompleteRef.current) return;

    const solveTime = (Date.now() - solveStartTime) / 1000;
    const timeBonus = solveTime < 3;

    const newBubbles = bubbles.map(b =>
      b.id === bubble.id ? { ...b, clicked: true } : b
    );
    setBubbles(newBubbles);

    if (bubble.isCorrect) {
      // Show the information for correct bubbles
      setSelectedBubble(bubble);
      
      const scoreGained = calculateScore(gameStats.level, gameStats.streak, timeBonus, isSpeedRound);
      const newStats = {
        ...gameStats,
        score: gameStats.score + scoreGained,
        streak: gameStats.streak + 1,
        totalCorrect: gameStats.totalCorrect + 1
      };

      if (newStats.score > newStats.highScore) {
        newStats.highScore = newStats.score;
        localStorage.setItem('popLetterHighScore', newStats.score.toString());
        if (!confettiTriggeredRef.current) {
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
          confettiTriggeredRef.current = true;
        }
        setFeedback('🏆 NEW HIGH SCORE! 🏆');
      } else {
        const speedText = isSpeedRound ? ' (2x Speed Round!)' : '';
        setFeedback(`Perfect! 🎉 ${timeBonus ? '⚡ Speed Bonus!' : ''} +${scoreGained}${speedText}`);
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

      const allCorrectClicked = newBubbles
        .filter(b => b.isCorrect)
        .every(b => b.clicked);

      if (allCorrectClicked && !levelCompleteRef.current) {
        levelCompleteRef.current = true;
        const correctCount = newBubbles.filter(b => b.isCorrect).length;
        const progressIncrease = correctCount * 20;
        const newProgress = Math.min(100, levelProgress + progressIncrease);
        setLevelProgress(newProgress);
        
        setTimeout(() => {
          if (newProgress >= 100) {
            clearGameTimer();
            setGameState('levelComplete');
          } else {
            generateNewBubbles();
          }
        }, 3000); // Give more time to read the information
      }

      saveGameState(newStats);
    } else {
      const newLives = gameStats.lives - 1;
      setGameStats(prev => ({
        ...prev,
        lives: newLives,
        streak: 0
      }));
      setFeedback('Oops! ❌ Try again!');
      setSelectedBubble(null);

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
    let nextLetter = gameStats.currentLetter;
    
    if (gameStats.mode === 'series') {
      const currentCharCode = gameStats.currentLetter.charCodeAt(0);
      if (currentCharCode < 90) {
        nextLetter = String.fromCharCode(currentCharCode + 1);
      } else {
        nextLetter = 'A';
      }
    } else {
      nextLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }

    const newLevel = gameStats.level + 1;
    const speedRound = newLevel % 5 === 0;
    const newTimeLimit = getTimeLimit(newLevel, speedRound);

    setGameStats(prev => ({
      ...prev,
      level: newLevel,
      timeLeft: newTimeLimit,
      streak: 0,
      lives: Math.min(5, prev.lives + 1),
      currentLetter: nextLetter
    }));

    setLevelProgress(0);
    setIsSpeedRound(speedRound);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    
    if (speedRound) {
      setFeedback('🚀 SPEED ROUND! Double points! 🚀');
      setTimeout(() => setFeedback(''), 3000);
    }

    generateNewBubbles();
    setGameState('playing');
    startTimer();
  };

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

  useEffect(() => {
    if (gameState === 'playing' && gameStats.timeLeft === 0) {
      clearGameTimer();
      setGameState('gameOver');
    }
  }, [gameStats.timeLeft, gameState, clearGameTimer]);

  useEffect(() => {
    if (gameState === 'playing' && bubbles.length === 0) {
      generateNewBubbles();
    }
  }, [generateNewBubbles, gameState, bubbles.length]);

  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => setNewBadges([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [newBadges]);

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
        onRestart={() => startGame(gameStats.mode)}
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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
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
          levelProgress={levelProgress}
          isSpeedRound={isSpeedRound}
        />

        <FeedbackDisplay feedback={feedback} />

        {(newBadges.length > 0 || Object.keys(gameStats.badges).length > 0) && (
          <div className="max-w-4xl mx-auto mb-4">
            <BadgeSystem badges={badgesList} recentBadge={newBadges[0]} />
          </div>
        )}

        <EnhancedBubbleArea 
          bubbles={bubbles} 
          onBubbleClick={handleBubbleClick}
          selectedBubble={selectedBubble}
        />
      </div>
    </div>
  );
};

export default PopTheLetterGame;
