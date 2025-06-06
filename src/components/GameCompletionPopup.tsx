
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star, Sparkles, PartyPopper, Gift } from 'lucide-react';

interface GameCompletionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  stars: number;
  gameName: string;
}

const GameCompletionPopup = ({ isOpen, onClose, score, stars, gameName }: GameCompletionPopupProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[200] p-4">
      <Card className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border-0 relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-gradient-to-r ${
                  i % 4 === 0 ? 'from-yellow-400 to-orange-400' :
                  i % 4 === 1 ? 'from-pink-400 to-purple-400' :
                  i % 4 === 2 ? 'from-blue-400 to-cyan-400' :
                  'from-green-400 to-emerald-400'
                } rounded animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Main Content */}
        <div className="text-center relative z-10">
          {/* Trophy Animation */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce shadow-lg">
              <Trophy className="w-12 h-12 text-white animate-pulse" />
            </div>
            <div className="flex justify-center space-x-2">
              <PartyPopper className="w-6 h-6 text-pink-500 animate-spin" />
              <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
              <Gift className="w-6 h-6 text-blue-500 animate-bounce" />
            </div>
          </div>

          {/* Congratulations Text */}
          <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-2">
            🎉 Congratulations!
          </h2>
          <p className="font-comic text-lg text-gray-600 mb-6">
            You completed {gameName}!
          </p>

          {/* Score and Stars */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-blue-600 mb-1">
                  {score}
                </div>
                <div className="font-comic text-sm text-gray-600">Final Score</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center mb-1">
                  <Star className="w-6 h-6 text-yellow-500 fill-current mr-1" />
                  <span className="text-3xl font-fredoka font-bold text-yellow-600">
                    {stars}
                  </span>
                </div>
                <div className="font-comic text-sm text-gray-600">Stars Earned</div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          <div className="flex justify-center space-x-2 mb-6">
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
              <span className="font-comic text-xs text-purple-700 font-bold">
                🏆 Game Master
              </span>
            </div>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-full">
              <span className="font-comic text-xs text-green-700 font-bold">
                ⭐ Star Collector
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 font-comic font-bold border-2 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full"
            >
              Play Again
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default GameCompletionPopup;
