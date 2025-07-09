
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Heart, Trophy, Zap } from 'lucide-react';

interface GameStateProps {
  gameStats: {
    level: number;
    score: number;
    lives: number;
    timeLeft: number;
    streak: number;
    totalCorrect: number;
    highScore: number;
  };
  targetNumber: number;
  levelProgress: number;
  isSpeedRound: boolean;
}

const GameState = ({ gameStats, targetNumber, levelProgress, isSpeedRound }: GameStateProps) => {
  return (
    <>
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
            <div className="text-center">
              <div className="font-fredoka text-sm text-gray-600">High Score</div>
              <div className="font-bold text-xl text-green-600">{gameStats.highScore}</div>
            </div>
          </div>

          <div className="text-center">
            <div className="font-fredoka text-6xl font-bold text-gray-800 mb-2">
              Target: <span className="gradient-text">{targetNumber}</span>
            </div>
            <div className="font-comic text-lg text-gray-600">
              {isSpeedRound ? '⚡ SPEED ROUND! ⚡' : 'Find expressions that equal this number!'}
            </div>
            {/* Level Progress Bar */}
            <div className="mt-2">
              <div className="flex items-center space-x-2 mb-1">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className="font-comic text-sm">Level Progress</span>
              </div>
              <Progress value={levelProgress} className="h-2 w-32" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {Array.from({ length: gameStats.lives }).map((_, i) => (
                <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
              ))}
            </div>
            <div className="text-center">
              <Clock className={`w-6 h-6 mx-auto ${gameStats.timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-red-500'}`} />
              <div className={`font-bold text-xl ${gameStats.timeLeft <= 10 ? 'text-red-600 animate-pulse' : 'text-red-600'}`}>
                {gameStats.timeLeft}s
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameState;
