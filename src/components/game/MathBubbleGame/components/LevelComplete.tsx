
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/home/Header';

interface LevelCompleteProps {
  gameStats: {
    level: number;
    score: number;
    streak: number;
  };
  isSpeedRound: boolean;
  onNextLevel: () => void;
}

const LevelComplete = ({ gameStats, isSpeedRound, onNextLevel }: LevelCompleteProps) => {
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
          <Button onClick={onNextLevel} className="gradient-blue text-white font-comic text-lg px-6">
            ➡️ Next Level
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default LevelComplete;
