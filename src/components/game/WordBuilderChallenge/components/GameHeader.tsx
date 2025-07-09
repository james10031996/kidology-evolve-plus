
import { Card } from '@/components/ui/card';
import { Trophy, Star, Zap } from 'lucide-react';

interface GameHeaderProps {
  score: number;
  currentLevel: number;
  totalLevels: number;
  timeLeft: number;
}

const GameHeader = ({ score, currentLevel, totalLevels, timeLeft }: GameHeaderProps) => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 bg-blue-100 border-2 border-blue-300">
        <Trophy className="w-8 h-8 mx-auto text-yellow-600" />
        <p className="font-fredoka text-lg">Score</p>
        <p className="text-3xl">{score}</p>
      </Card>
      <Card className="p-6 bg-green-100 border-2 border-green-300">
        <Zap className="w-8 h-8 mx-auto text-orange-600" />
        <p className="font-fredoka text-lg">Level</p>
        <p className="text-3xl">{currentLevel + 1}/{totalLevels}</p>
      </Card>
      <Card className="p-6 bg-red-100 border-2 border-red-300">
        <Star className="w-8 h-8 mx-auto text-red-600" />
        <p className="font-fredoka text-lg">Time</p>
        <p className="text-3xl">{timeLeft}s</p>
      </Card>
    </div>
  );
};

export default GameHeader;
