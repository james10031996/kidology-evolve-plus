
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Heart, Star, Apple, Gamepad2 } from 'lucide-react';

const VirtualPet = () => {
  const [petStats, setPetStats] = useState({
    happiness: 75,
    energy: 60,
    hunger: 40,
    level: 3,
    name: 'Buddy',
    experience: 65
  });

  const [lastInteraction, setLastInteraction] = useState(Date.now());

  const feedPet = () => {
    setPetStats(prev => ({
      ...prev,
      hunger: Math.max(0, prev.hunger - 30),
      happiness: Math.min(100, prev.happiness + 10)
    }));
    setLastInteraction(Date.now());
  };

  const playWithPet = () => {
    setPetStats(prev => ({
      ...prev,
      happiness: Math.min(100, prev.happiness + 20),
      energy: Math.max(0, prev.energy - 15)
    }));
    setLastInteraction(Date.now());
  };

  const petAnimation = petStats.happiness > 70 ? 'bounce-gentle' : petStats.happiness > 30 ? 'floating' : '';

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-0 shadow-lg">
      <div className="text-center mb-6">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
          Your Learning Buddy: {petStats.name}
        </h3>
        <div className="text-center mb-4">
          <div className={`text-6xl mx-auto mb-2 ${petAnimation}`}>
            {petStats.happiness > 70 ? '🐶' : petStats.happiness > 30 ? '🐕' : '😴'}
          </div>
          <div className="font-comic text-sm text-gray-600">Level {petStats.level}</div>
        </div>
      </div>

      {/* Pet Stats */}
      <div className="space-y-3 mb-6">
        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-comic text-sm text-gray-700">Happiness</span>
            </div>
            <span className="font-comic text-sm font-bold text-gray-800">{petStats.happiness}%</span>
          </div>
          <Progress value={petStats.happiness} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span className="font-comic text-sm text-gray-700">Energy</span>
            </div>
            <span className="font-comic text-sm font-bold text-gray-800">{petStats.energy}%</span>
          </div>
          <Progress value={petStats.energy} className="h-2" />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <div className="flex items-center space-x-2">
              <Apple className="w-4 h-4 text-green-500" />
              <span className="font-comic text-sm text-gray-700">Hunger</span>
            </div>
            <span className="font-comic text-sm font-bold text-gray-800">{100 - petStats.hunger}%</span>
          </div>
          <Progress value={100 - petStats.hunger} className="h-2" />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button 
          onClick={feedPet}
          size="sm"
          className="flex-1 gradient-green text-white font-comic font-bold rounded-full"
        >
          <Apple className="w-4 h-4 mr-2" />
          Feed
        </Button>
        <Button 
          onClick={playWithPet}
          size="sm"
          className="flex-1 gradient-blue text-white font-comic font-bold rounded-full"
        >
          <Gamepad2 className="w-4 h-4 mr-2" />
          Play
        </Button>
      </div>
    </Card>
  );
};

export default VirtualPet;
