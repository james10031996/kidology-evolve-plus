
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

const GameMenu = ({ onStartGame }: { onStartGame: () => void }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-6">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="font-fredoka text-6xl font-bold gradient-text animate-bounce">
              🧮 Math Bubble Pop!
            </h1>
            <p className="font-comic text-xl text-gray-700">
              Pop all the bubbles with expressions that equal the target number!
            </p>
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="font-fredoka text-2xl font-bold mb-4">Enhanced Features:</h2>
            <div className="space-y-3 text-left font-comic">
              <div className="flex items-center space-x-3">
                <span>🔢</span>
                <span>Complex expressions with up to 5 numbers</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>⚡</span>
                <span>Speed bonus for solving in under 5 seconds</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🏅</span>
                <span>Achievement badges for milestones</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🚀</span>
                <span>Speed rounds every 5 levels with double points</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>💾</span>
                <span>Auto-save progress with crash protection</span>
              </div>
            </div>
          </Card>

          <Button
            onClick={onStartGame}
            size="lg"
            className="font-fredoka text-xl px-8 py-4 gradient-purple text-white hover:scale-105 transition-transform"
          >
            🚀 Start Playing!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
