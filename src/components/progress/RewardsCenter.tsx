
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Gift, Star, Trophy, Crown, Gem, ShoppingCart } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

const RewardsCenter = () => {
  const { userData, purchaseReward } = useUser();

  const dailyGoal = 100;
  const dailyProgress = 65; // This would be calculated based on today's activities

  const specialOffers = [
    {
      id: 'weekend-special',
      title: 'Weekend Special!',
      description: 'Double stars on all activities',
      badge: '2X',
      active: true
    },
    {
      id: 'weekly-challenge',
      title: 'Weekly Challenge',
      description: 'Complete 5 subjects this week',
      badge: '+200',
      active: false
    }
  ];

  const handlePurchase = (rewardId: string) => {
    purchaseReward(rewardId);
  };

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
          <span className="font-fredoka font-bold text-xl text-yellow-600">
            {userData.stars.toLocaleString()}
          </span>
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
        {userData.rewards.map((reward) => (
          <div key={reward.id} className="relative">
            <Card className={`p-4 text-center transition-all duration-200 hover:scale-105 border-2 ${
              userData.stars >= reward.cost 
                ? 'border-yellow-200 bg-white shadow-md cursor-pointer' 
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
              
              {reward.owned > 0 ? (
                <Badge className="bg-green-100 text-green-700 text-xs font-comic w-full justify-center">
                  Owned: {reward.owned}
                </Badge>
              ) : userData.stars >= reward.cost ? (
                <Button 
                  size="sm" 
                  className="w-full gradient-orange text-white font-comic text-xs"
                  onClick={() => handlePurchase(reward.id)}
                >
                  <ShoppingCart className="w-3 h-3 mr-1" />
                  Buy
                </Button>
              ) : (
                <Badge variant="outline" className="text-xs font-comic w-full justify-center">
                  Need {reward.cost - userData.stars} more
                </Badge>
              )}
            </Card>
          </div>
        ))}
      </div>

      {/* Special Offers */}
      <div className="space-y-3 mb-6">
        {specialOffers.map((offer) => (
          <div 
            key={offer.id} 
            className={`p-4 rounded-xl ${
              offer.active 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100' 
                : 'bg-gray-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                offer.active ? 'gradient-purple' : 'bg-gray-400'
              }`}>
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-comic font-bold text-gray-800">{offer.title}</div>
                <div className="font-comic text-sm text-gray-600">{offer.description}</div>
              </div>
              <Badge className={`font-comic font-bold ${
                offer.active ? 'gradient-purple text-white' : 'bg-gray-500 text-white'
              }`}>
                {offer.badge}
              </Badge>
            </div>
          </div>
        ))}
      </div>

      {/* Achievement Progress */}
      <div className="mb-4 p-4 bg-blue-50 rounded-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Trophy className="w-5 h-5 text-blue-500" />
          <span className="font-comic font-bold text-gray-800">Achievement Bonus</span>
        </div>
        <div className="font-comic text-sm text-gray-600 mb-2">
          Unlock {6 - userData.achievements.filter(a => a.unlocked).length} more achievements to earn 500 bonus stars!
        </div>
        <Progress 
          value={(userData.achievements.filter(a => a.unlocked).length / userData.achievements.length) * 100} 
          className="h-2" 
        />
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
