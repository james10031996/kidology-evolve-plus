
import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import { generateTypingItems } from '../utils/typingItemGenerator';
import { calculateScore, getTimeLimit, checkForBadges, saveGameState, loadGameState } from '../utils/typingGameLogic';

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

interface TypingItem {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  x: number;
  y: number;
  found: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
  pulsing?: boolean;
  fading?: boolean;
}

interface FoundItem {
  emoji: string;
  name: string;
  information: string;
  letter: string;
  fullName?: string;
}

export const useTypingGameLogic = () => {
  const levelCompleteRef = useRef<boolean>(false);
  const confettiTriggeredRef = useRef<boolean>(false);
  const challengeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  const [gameStats, setGameStats] = useState<GameStats>({
    level: 1,
    score: 0,
    lives: 3,
    timeLeft: 150, // 2.5 minutes
    streak: 0,
    totalCorrect: 0,
    highScore: parseInt(localStorage.getItem('typingChallengeHighScore') || '0'),
    badges: {},
    currentLetter: 'A',
    mode: 'series'
  });

  const [bubbles, setBubbles] = useState<TypingItem[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'levelComplete'>('menu');
  const [feedback, setFeedback] = useState<string>('');
  const [isSpeedRound, setIsSpeedRound] = useState(false);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [foundItems, setFoundItems] = useState<FoundItem[]>([]);
  const [completedRows, setCompletedRows] = useState<FoundItem[][]>([]);
  const [targetItems, setTargetItems] = useState<TypingItem[]>([]);

  const clearChallengeIntervals = () => {
    if (challengeIntervalRef.current) {
      clearInterval(challengeIntervalRef.current);
      challengeIntervalRef.current = null;
    }
  };

  const startChallenges = () => {
    clearChallengeIntervals();
    
    // Start pulsing and fading effects for higher levels
    if (gameStats.level >= 3) {
      challengeIntervalRef.current = setInterval(() => {
        setBubbles(prev => prev.map(bubble => ({
          ...bubble,
          pulsing: Math.random() < 0.4,
          fading: gameStats.level >= 7 && Math.random() < 0.2
        })));
      }, 2500);
    }
  };

  const generateNewItems = useCallback(() => {
    const newItems = generateTypingItems(gameStats.currentLetter, 10);
    setBubbles(newItems);
    setTargetItems(newItems.filter(item => item.letter === gameStats.currentLetter));
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setCurrentInput('');
    setFoundItems([]);
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
        highScore: parseInt(localStorage.getItem('typingChallengeHighScore') || '0'),
        badges: {},
        currentLetter: mode === 'series' ? 'A' : String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        mode
      });
      setGameState('playing');
    }
    
    setIsSpeedRound(false);
    levelCompleteRef.current = false;
    confettiTriggeredRef.current = false;
    setCompletedRows([]);
    setFoundItems([]);
    
    generateNewItems();
  };

  const handleInputChange = (value: string) => {
    setCurrentInput(value);
  };

  const handleSubmit = () => {
    const inputLower = currentInput.toLowerCase().trim();
    if (!inputLower) return;

    const matchingItem = bubbles.find(item => 
      item.name.toLowerCase() === inputLower && 
      item.letter === gameStats.currentLetter &&
      !item.found
    );

    if (matchingItem) {
      // Correct answer
      setBubbles(prev => prev.map(item =>
        item.id === matchingItem.id ? { ...item, found: true } : item
      ));

      const scoreGained = calculateScore(gameStats.level, gameStats.streak, true, isSpeedRound);
      const newStats = {
        ...gameStats,
        score: gameStats.score + scoreGained,
        streak: gameStats.streak + 1,
        totalCorrect: gameStats.totalCorrect + 1
      };

      const foundItem: FoundItem = {
        emoji: matchingItem.emoji,
        name: matchingItem.name,
        information: matchingItem.information || `This ${matchingItem.name} starts with ${matchingItem.letter}`,
        letter: matchingItem.letter,
        fullName: matchingItem.fullName
      };
      
      const newFoundItems = [...foundItems, foundItem];
      setFoundItems(newFoundItems);

      if (newStats.score > newStats.highScore) {
        newStats.highScore = newStats.score;
        localStorage.setItem('typingChallengeHighScore', newStats.score.toString());
        if (!confettiTriggeredRef.current) {
          confetti({ particleCount: 200, spread: 80, origin: { y: 0.6 } });
          confettiTriggeredRef.current = true;
        }
        setFeedback('🏆 NEW HIGH SCORE! 🏆');
      } else {
        const speedText = isSpeedRound ? ' (2x Speed Round!)' : '';
        setFeedback(`Perfect! 🎉 +${scoreGained}${speedText}`);
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

      // Check if all target items are found
      const allTargetFound = targetItems.every(target => 
        target.id === matchingItem.id || 
        bubbles.some(b => b.id === target.id && b.found) ||
        newFoundItems.some(f => f.name === target.name)
      );

      if (allTargetFound && !levelCompleteRef.current) {
        levelCompleteRef.current = true;
        setTimeout(() => {
          setCompletedRows(prev => [...prev, newFoundItems]);
          setFoundItems([]);
          nextLetter();
        }, 2000);
      }

      setCurrentInput('');
      setTimeout(() => setFeedback(''), 2000);
      saveGameState(newStats);
    } else {
      // Wrong answer
      const newLives = gameStats.lives - 1;
      setGameStats(prev => ({
        ...prev,
        lives: newLives,
        streak: 0
      }));
      setFeedback('Try again! 🔤 Check the spelling!');
      setCurrentInput('');

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
    const speedRound = newLevel % 4 === 0;
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
    
    if (speedRound) {
      setFeedback('🚀 SPEED TYPING! Double points! 🚀');
      setTimeout(() => setFeedback(''), 3000);
    } else {
      setFeedback(`✨ Next Letter: ${nextLetter}! ✨`);
      setTimeout(() => setFeedback(''), 2000);
    }

    generateNewItems();
  };

  const updateTimeLeft = useCallback((newTimeOrUpdater: number | ((prev: number) => number)) => {
    if (typeof newTimeOrUpdater === 'function') {
      setGameStats(prev => ({
        ...prev,
        timeLeft: Math.max(0, newTimeOrUpdater(prev.timeLeft))
      }));
    } else {
      setGameStats(prev => ({
        ...prev,
        timeLeft: Math.max(0, newTimeOrUpdater)
      }));
    }
  }, []);

  const handleTimeUp = useCallback(() => {
    clearChallengeIntervals();
    setGameState('gameOver');
  }, []);

  return {
    gameStats,
    bubbles,
    gameState,
    feedback,
    isSpeedRound,
    newBadges,
    currentInput,
    foundItems,
    completedRows,
    targetItems,
    startGame,
    handleInputChange,
    handleSubmit,
    setGameState,
    generateNewItems,
    updateTimeLeft,
    handleTimeUp,
    setNewBadges
  };
};
