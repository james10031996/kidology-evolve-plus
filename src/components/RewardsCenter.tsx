
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Crown, Gem } from 'lucide-react';

const RewardsCenter = () => {
  const rewards = [
    { id: 1, name: 'Golden Star', icon: '⭐', cost: 50, owned: 3, description: 'Show off your achievements!' },
    { id: 2, name: 'Rainbow Badge', icon: '🌈', cost: 100, owned: 1, description: 'Colorful completion reward' },
    { id: 3, name: 'Super Crown', icon: '👑', cost: 200, owned: 0, description: 'Ultimate learning champion' },
    { id: 4, name: 'Magic Wand', icon: '🪄', cost: 150, owned: 0, description: 'Cast spells of knowledge' },
    { id: 5, name: 'Treasure Chest', icon: '💎', cost: 300, owned: 0, description: 'Rare collection item' },
    { id: 6, name: 'Fire Medal', icon: '🔥', cost: 75, owned: 2, description: 'Hot streak achievement' }
  ];

  const currentStars = 1250;
  const dailyGoal = 100;
  const dailyProgress = 65;

  return (
    <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl border-0 shadow-lg">
      <div className="text-center mb-6">
        <div className="w-16 h-16 gradient-orange rounded-full mx-auto mb-3 flex items-center justify-center">
          <Star className="w-8 h-8 text-white" />
        </div>
        <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
          Rewards Center
        </h2>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500 fill-current" />
          <span className="font-fredoka font-bold text-xl text-yellow-600">{currentStars}</span>
          <span className="font-comic text-gray-600">stars</span>
        </div>
      </div>

      {/* Daily Goal Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="font-comic font-bold text-gray-800">Daily Goal</span>
          <span className="font-comic text-sm text-gray-600">{dailyProgress}/{dailyGoal} stars</span>
        </div>
        <Progress value={(dailyProgress / dailyGoal) * 100} className="h-3 mb-2" />
        <div className="text-center">
          <Badge className="gradient-green text-white font-comic">
            {dailyGoal - dailyProgress} more stars for bonus reward!
          </Badge>
        </div>
      </div>

      {/* Rewards Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {rewards.map((reward) => (
          <div key={reward.id} className="relative">
            <Card className={`p-4 text-center transition-all duration-200 hover:scale-105 border-2 ${
              currentStars >= reward.cost 
                ? 'border-yellow-200 bg-white shadow-md' 
                : 'border-gray-200 bg-gray-50 opacity-75'
            }`}>
              <div className="text-3xl mb-2">{reward.icon}</div>
              <div className="font-comic font-bold text-sm text-gray-800 mb-1">
                {reward.name}
              </div>
              <div className="font-comic text-xs text-gray-600 mb-2 line-clamp-1">
                {reward.description}
              </div>
              <div className="flex items-center justify-center space-x-1 mb-2">
                <Star className="w-3 h-3 text-yellow-500 fill-current" />
                <span className="font-comic text-xs font-bold">{reward.cost}</span>
              </div>
              {reward.owned > 0 && (
                <Badge className="bg-green-100 text-green-700 text-xs font-comic">
                  Owned: {reward.owned}
                </Badge>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Special Offers */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 gradient-purple rounded-full flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <div className="font-comic font-bold text-gray-800">Weekend Special!</div>
            <div className="font-comic text-sm text-gray-600">Double stars on all activities</div>
          </div>
          <Badge className="gradient-purple text-white font-comic font-bold">
            2X
          </Badge>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="text-center">
        <Button 
          variant="outline" 
          className="w-full font-comic font-bold rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
        >
          <Trophy className="w-4 h-4 mr-2" />
          View Leaderboard
        </Button>
      </div>
    </Card>
  );
};

export default RewardsCenter;
