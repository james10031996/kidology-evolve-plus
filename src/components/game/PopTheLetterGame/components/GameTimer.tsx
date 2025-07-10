
import { useEffect, useRef } from 'react';

interface GameTimerProps {
  timeLeft: number;
  gameState: string;
  onTimeUpdate: (newTime: number) => void;
  onTimeUp: () => void;
}

const GameTimer = ({ timeLeft, gameState, onTimeUpdate, onTimeUp }: GameTimerProps) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearGameTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    clearGameTimer();
    timerRef.current = setInterval(() => {
      onTimeUpdate(timeLeft - 1);
    }, 1000);
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
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && timeLeft === 0) {
      clearGameTimer();
      onTimeUp();
    }
  }, [timeLeft, gameState]);

  useEffect(() => {
    return () => {
      clearGameTimer();
    };
  }, []);

  return null; // This is a logic-only component
};

export default GameTimer;
