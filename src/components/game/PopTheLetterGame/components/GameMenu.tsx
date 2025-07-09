
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

interface GameMenuProps {
  onStartGame: (mode: 'series' | 'random') => void;
}

const GameMenu = ({ onStartGame }: GameMenuProps) => {
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
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
              🔤 Pop the Letter!
            </h1>
            <p className="font-comic text-xl text-gray-700">
              Pop all the bubbles that start with the target letter!
            </p>
          </div>

          <Card className="p-8 bg-white/80 backdrop-blur-sm">
            <h2 className="font-fredoka text-2xl font-bold mb-4">Game Features:</h2>
            <div className="space-y-3 text-left font-comic">
              <div className="flex items-center space-x-3">
                <span>🎯</span>
                <span>Two game modes: Series (A-Z) and Random letters</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🎈</span>
                <span>Animated bubbles with emojis and words</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>⚡</span>
                <span>Speed bonus for quick pops</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🏅</span>
                <span>Achievement badges and streaks</span>
              </div>
              <div className="flex items-center space-x-3">
                <span>🚀</span>
                <span>Speed rounds every 5 levels</span>
              </div>
            </div>
          </Card>

          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => onStartGame('series')}
              size="lg"
              className="font-fredoka text-xl px-8 py-4 gradient-purple text-white hover:scale-105 transition-transform"
            >
              🔤 Series Mode (A-Z)
            </Button>
            <Button
              onClick={() => onStartGame('random')}
              size="lg"
              className="font-fredoka text-xl px-8 py-4 gradient-blue text-white hover:scale-105 transition-transform"
            >
              🎲 Random Mode
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
