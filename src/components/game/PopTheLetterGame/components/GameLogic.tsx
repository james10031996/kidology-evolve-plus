
import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { generateLetterBubbles } from '../utils/letterBubbleGenerator';
import { calculateScore, getTimeLimit, checkForBadges, saveGameState, loadGameState } from '../utils/gameLogic';

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

export const useGameLogic = () => {
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
      setGameState('playing');
    }
    
    setLevelProgress(0);
    setIsSpeedRound(false);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    
    generateNewBubbles();
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
            setGameState('levelComplete');
          } else {
            generateNewBubbles();
          }
        }, 3000);
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
  };

  const updateTimeLeft = (newTime: number) => {
    setGameStats(prev => ({ ...prev, timeLeft: Math.max(0, newTime) }));
  };

  const handleTimeUp = () => {
    setGameState('gameOver');
  };

  return {
    gameStats,
    bubbles,
    gameState,
    feedback,
    levelProgress,
    isSpeedRound,
    newBadges,
    selectedBubble,
    startGame,
    handleBubbleClick,
    nextLevel,
    setGameState,
    generateNewBubbles,
    updateTimeLeft,
    handleTimeUp,
    setNewBadges
  };
};
