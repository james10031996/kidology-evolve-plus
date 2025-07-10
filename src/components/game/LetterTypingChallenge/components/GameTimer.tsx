
import { useEffect, useRef } from 'react';

interface GameTimerProps {
  timeLeft: number;
  gameState: string;
  onTimeUpdate: (newTime: number | ((prev: number) => number)) => void;
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

  useEffect(() => {
    if (gameState === 'playing' && timeLeft > 0) {
      clearGameTimer();
      timerRef.current = setInterval(() => {
        onTimeUpdate((prev: number) => {
          const newTime = prev - 1;
          if (newTime <= 0) {
            clearGameTimer();
            onTimeUp();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearGameTimer();
    }

    return () => {
      clearGameTimer();
    };
  }, [gameState, onTimeUpdate, onTimeUp]);

  useEffect(() => {
    if (timeLeft === 0 && gameState === 'playing') {
      clearGameTimer();
      onTimeUp();
    }
  }, [timeLeft, gameState, onTimeUp]);

  useEffect(() => {
    return () => {
      clearGameTimer();
    };
  }, []);

  return null; // This is a logic-only component
};

export default GameTimer;
