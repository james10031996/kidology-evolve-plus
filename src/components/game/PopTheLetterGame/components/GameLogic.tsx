
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
  isBlinking?: boolean;
  isDisappearing?: boolean;
}

interface PoppedBubble {
  emoji: string;
  name: string;
  information: string;
  letter: string;
  fullName?: string;
}

export const useGameLogic = () => {
  const levelCompleteRef = useRef<boolean>(false);
  const confettiTriggeredRef = useRef<boolean>(false);
  const blinkingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const disappearingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    score: 0,
    lives: 3,
    timeLeft: 120, // 2 minutes
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
  const [isSpeedRound, setIsSpeedRound] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [solveStartTime, setSolveStartTime] = useState<number>(Date.now());
  const [selectedBubble, setSelectedBubble] = useState<LetterBubble | null>(null);
  const [poppedBubbles, setPoppedBubbles] = useState<PoppedBubble[][]>([]);
  const [currentRow, setCurrentRow] = useState<PoppedBubble[]>([]);

  const clearChallengeIntervals = () => {
    if (blinkingIntervalRef.current) {
      clearInterval(blinkingIntervalRef.current);
      blinkingIntervalRef.current = null;
    }
    if (disappearingIntervalRef.current) {
      clearInterval(disappearingIntervalRef.current);
      disappearingIntervalRef.current = null;
    }
  };

  const startChallenges = () => {
    clearChallengeIntervals();
    
    // Start blinking effect for higher levels
    if (gameStats.level >= 3) {
      blinkingIntervalRef.current = setInterval(() => {
        setBubbles(prev => prev.map(bubble => ({
          ...bubble,
          isBlinking: Math.random() < 0.3
        })));
      }, 2000);
    }

    // Start disappearing effect for higher levels
    if (gameStats.level >= 5) {
      disappearingIntervalRef.current = setInterval(() => {
        setBubbles(prev => prev.map(bubble => ({
          ...bubble,
          isDisappearing: !bubble.clicked && Math.random() < 0.2
        })));
        
        setTimeout(() => {
          setBubbles(prev => prev.map(bubble => ({
            ...bubble,
            isDisappearing: false
          })));
        }, 1000);
      }, 4000);
    }
  };

  const generateNewBubbles = useCallback(() => {
    const newBubbles = generateLetterBubbles(gameStats.currentLetter, 5); // 5 target bubbles + 5 random
    setBubbles(newBubbles);
    setSolveStartTime(Date.now());
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    startChallenges();
  }, [gameStats.currentLetter, gameStats.level]);

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
    
    setIsSpeedRound(false);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    setPoppedBubbles([]);
    setCurrentRow([]);
    
    generateNewBubbles();
  };

  const handleBubbleClick = (bubble: LetterBubble) => {
    if (bubble.clicked || levelCompleteRef.current || bubble.isDisappearing) return;

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

      // Add to current row
      const poppedBubble: PoppedBubble = {
        emoji: bubble.emoji,
        name: bubble.name,
        information: bubble.information || `This ${bubble.name} starts with ${bubble.letter}`,
        letter: bubble.letter,
        fullName: bubble.fullName
      };
      
      const newCurrentRow = [...currentRow, poppedBubble];
      setCurrentRow(newCurrentRow);

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
        
        // Move current row to popped bubbles and start new row
        setTimeout(() => {
          setPoppedBubbles(prev => [...prev, newCurrentRow]);
          setCurrentRow([]);
          nextLetter();
        }, 2000);
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
          clearChallengeIntervals();
          setGameState('gameOver');
        }, 1000);
      }
    }
  };

  const nextLetter = () => {
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

    setIsSpeedRound(speedRound);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setSelectedBubble(null);
    
    if (speedRound) {
      setFeedback('🚀 SPEED ROUND! Double points! 🚀');
      setTimeout(() => setFeedback(''), 3000);
    } else {
      setFeedback(`✨ Next Letter: ${nextLetter}! ✨`);
      setTimeout(() => setFeedback(''), 2000);
    }

    generateNewBubbles();
  };

  const updateTimeLeft = (newTime: number) => {
    setGameStats(prev => ({ ...prev, timeLeft: Math.max(0, newTime) }));
  };

  const handleTimeUp = () => {
    clearChallengeIntervals();
    setGameState('gameOver');
  };

  return {
    gameStats,
    bubbles,
    gameState,
    feedback,
    isSpeedRound,
    newBadges,
    selectedBubble,
    poppedBubbles,
    currentRow,
    startGame,
    handleBubbleClick,
    setGameState,
    generateNewBubbles,
    updateTimeLeft,
    handleTimeUp,
    setNewBadges
  };
};
