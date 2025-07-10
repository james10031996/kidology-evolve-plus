
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, Home, Star } from 'lucide-react';

interface GameOverProps {
  gameStats: {
    level: number;
    score: number;
    totalCorrect: number;
    highScore: number;
    badges: { [key: string]: boolean };
  };
  onRestart: () => void;
  onMenu: () => void;
}

const GameOver = ({ gameStats, onRestart, onMenu }: GameOverProps) => {
  const badgeCount = Object.keys(gameStats.badges).length;
  const stars = Math.floor(gameStats.score / 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-6 flex items-center justify-center">
      <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl max-w-md w-full text-center">
        <div className="mb-6">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-2">
            Game Over!
          </h2>
          <p className="font-comic text-lg text-gray-600">
            Great typing adventure! 🌟
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4">
            <div className="font-comic text-sm text-gray-600">Final Score</div>
            <div className="font-fredoka text-3xl font-bold text-purple-600">{gameStats.score}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="font-comic text-xs text-gray-600">Level Reached</div>
              <div className="font-bold text-xl text-blue-600">{gameStats.level}</div>
            </div>
            <div className="bg-green-50 rounded-xl p-3">
              <div className="font-comic text-xs text-gray-600">Words Typed</div>
              <div className="font-bold text-xl text-green-600">{gameStats.totalCorrect}</div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-3">
            <div className="font-comic text-xs text-gray-600">Badges Earned</div>
            <div className="font-bold text-xl text-yellow-600">{badgeCount}</div>
          </div>

          {gameStats.score === gameStats.highScore && (
            <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-3 animate-pulse">
              <div className="flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-comic font-bold text-yellow-700">New High Score!</span>
                <Star className="w-5 h-5 text-yellow-500 ml-2" />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <Button
            onClick={onRestart}
            className="w-full gradient-green text-white font-comic font-bold py-3"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Type Again
          </Button>
          
          <Button
            onClick={onMenu}
            variant="outline"
            className="w-full font-comic font-bold py-3"
          >
            <Home className="w-5 h-5 mr-2" />
            Main Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default GameOver;
