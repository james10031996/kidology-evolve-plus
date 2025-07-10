
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Trophy, Target, Clock } from 'lucide-react';

interface GameMenuProps {
  onStartGame: (mode: 'series' | 'random') => void;
}

const GameMenu = ({ onStartGame }: GameMenuProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-6">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-8">
          <h1 className="font-fredoka font-bold text-6xl text-gray-800 mb-4 animate-bounce">
            🔤 Word Safari Challenge
          </h1>
          <p className="font-comic text-xl text-gray-700 max-w-2xl mx-auto">
            Type the names of amazing items! Look at the bubbles and type their exact names to collect them. 
            Complete the alphabet journey one letter at a time!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🔤</div>
              <h3 className="font-fredoka font-bold text-xl text-gray-800">Alphabet Series</h3>
            </div>
            <p className="font-comic text-gray-600 mb-4">
              Journey through the alphabet from A to Z. Complete all items for each letter to advance!
            </p>
            <Button
              onClick={() => onStartGame('series')}
              className="w-full gradient-green text-white font-comic font-bold py-3"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Alphabet Journey
            </Button>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🎲</div>
              <h3 className="font-fredoka font-bold text-xl text-gray-800">Random Challenge</h3>
            </div>
            <p className="font-comic text-gray-600 mb-4">
              Face random letters in any order. Perfect for quick practice sessions and skill building!
            </p>
            <Button
              onClick={() => onStartGame('random')}
              className="w-full gradient-blue text-white font-comic font-bold py-3"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Random Challenge
            </Button>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <Target className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <h4 className="font-comic font-bold text-gray-800">Type to Win</h4>
            <p className="font-comic text-sm text-gray-600">Look at bubbles and type their exact names</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-comic font-bold text-gray-800">Beat the Clock</h4>
            <p className="font-comic text-sm text-gray-600">Complete each letter before time runs out</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4">
            <Trophy className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-comic font-bold text-gray-800">Earn Badges</h4>
            <p className="font-comic text-sm text-gray-600">Unlock achievements as you progress</p>
          </div>
        </div>

        <div className="text-center">
          <p className="font-comic text-gray-600 text-sm">
            🎯 Look for items with yellow rings - these are your targets!<br/>
            💡 Type carefully - spelling must be exact to score points!
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameMenu;
