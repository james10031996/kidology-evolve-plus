
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Header from '@/components/home/Header';

interface GameOverProps {
  gameStats: {
    score: number;
    level: number;
    totalCorrect: number;
    highScore: number;
    mode: 'series' | 'random';
  };
  onRestart: () => void;
  onMenu: () => void;
}

const GameOver = ({ gameStats, onRestart, onMenu }: GameOverProps) => {
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-6 flex items-center justify-center">
        <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
          <h2 className="font-fredoka text-4xl font-bold text-red-600 mb-4">Game Over!</h2>
          <div className="space-y-3 font-comic text-lg">
            <p>Mode: <span className="font-bold text-purple-600 capitalize">{gameStats.mode}</span></p>
            <p>Final Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
            <p>Level Reached: <span className="font-bold text-blue-600">{gameStats.level}</span></p>
            <p>Letters Popped: <span className="font-bold text-green-600">{gameStats.totalCorrect}</span></p>
            <p>High Score: <span className="font-bold text-yellow-600">{gameStats.highScore}</span></p>
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <Button onClick={onRestart} className="gradient-green text-white font-comic">
              🔄 Play Again
            </Button>
            <Button onClick={onMenu} variant="outline" className="font-comic">
              🏠 Menu
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GameOver;
