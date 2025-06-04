
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Heart, Zap, Clock, Gift } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const VirtualPet = () => {
  const { userData, feedPet } = useUser();
  const [petMood, setPetMood] = useState(userData.petData.mood);
  
  useEffect(() => {
    setPetMood(userData.petData.mood);
  }, [userData.petData.mood]);

  const getPetEmoji = () => {
    switch (userData.petData.type) {
      case 'dragon':
        return petMood === 'excited' ? '🐲' : petMood === 'happy' ? '🐉' : '😴';
      case 'cat':
        return petMood === 'excited' ? '😻' : petMood === 'happy' ? '😸' : '😿';
      case 'dog':
        return petMood === 'excited' ? '🐕' : petMood === 'happy' ? '🐶' : '😞';
      default:
        return '🐲';
    }
  };

  const getMoodMessage = () => {
    switch (petMood) {
      case 'excited':
        return `${userData.petData.name} is super excited! Great job learning!`;
      case 'happy':
        return `${userData.petData.name} is happy and content!`;
      case 'sleepy':
        return `${userData.petData.name} needs some attention...`;
      default:
        return `${userData.petData.name} is doing well!`;
    }
  };

  const handleFeed = () => {
    feedPet();
    setTimeout(() => setPetMood('excited'), 100);
  };

  const timeSinceLastFed = () => {
    const lastFed = new Date(userData.petData.lastFed);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - lastFed.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just fed!';
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border-0 shadow-lg">
      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
          <span className="text-4xl animate-bounce">{getPetEmoji()}</span>
        </div>
        
        <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
          {userData.petData.name}
        </h2>
        
        <Badge className={`font-comic ${
          petMood === 'excited' ? 'bg-green-500' :
          petMood === 'happy' ? 'bg-blue-500' : 'bg-gray-500'
        } text-white`}>
          {petMood.charAt(0).toUpperCase() + petMood.slice(1)}
        </Badge>
        
        <p className="font-comic text-gray-600 mt-2 text-sm">
          {getMoodMessage()}
        </p>
      </div>

      {/* Pet Stats */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className="font-comic text-sm text-gray-700">Happiness</span>
            </div>
            <span className="font-comic text-sm font-bold text-gray-800">
              {userData.petData.happiness}%
            </span>
          </div>
          <Progress value={userData.petData.happiness} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="font-comic text-sm text-gray-700">Energy</span>
            </div>
            <span className="font-comic text-sm font-bold text-gray-800">
              {userData.petData.energy}%
            </span>
          </div>
          <Progress value={userData.petData.energy} className="h-2" />
        </div>

        <div className="flex items-center justify-between p-3 bg-white rounded-xl">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="font-comic text-sm text-gray-700">Last fed</span>
          </div>
          <span className="font-comic text-sm font-bold text-gray-800">
            {timeSinceLastFed()}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button 
          className="w-full gradient-green text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
          onClick={handleFeed}
        >
          <Gift className="w-4 h-4 mr-2" />
          Feed {userData.petData.name}
        </Button>
        
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="font-comic font-bold rounded-full border-2 border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            🎾 Play
          </Button>
          <Button 
            variant="outline" 
            className="font-comic font-bold rounded-full border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            🛁 Clean
          </Button>
        </div>
      </div>

      {/* Pet Tips */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-lg">💡</span>
          <span className="font-comic font-bold text-gray-800 text-sm">Pet Tip</span>
        </div>
        <p className="font-comic text-xs text-gray-600">
          Complete more lessons to keep {userData.petData.name} happy and energetic! 
          Each lesson completed increases happiness by 10%.
        </p>
      </div>
    </Card>
  );
};

export default VirtualPet;
