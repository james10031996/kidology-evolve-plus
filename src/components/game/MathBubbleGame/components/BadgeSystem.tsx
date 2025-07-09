
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Zap, Target, Crown } from 'lucide-react';

interface BadgeSystemProps {
  badges: {
    id: string;
    name: string;
    description: string;
    icon: string;
    earned: boolean;
    condition: string;
  }[];
  recentBadge?: string;
}

const BadgeSystem = ({ badges, recentBadge }: BadgeSystemProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'target': return <Target className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      default: return <Star className="w-6 h-6" />;
    }
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
      <h3 className="font-fredoka font-bold text-lg mb-3 text-center">🏅 Achievement Badges</h3>
      
      {recentBadge && (
        <div className="mb-4 p-3 bg-yellow-100 rounded-lg text-center animate-pulse">
          <div className="text-2xl mb-1">🎉</div>
          <div className="font-comic font-bold text-yellow-700">New Badge Earned!</div>
          <div className="font-comic text-sm text-yellow-600">{recentBadge}</div>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`p-3 rounded-lg text-center transition-all duration-300 ${
              badge.earned 
                ? 'bg-gradient-to-br from-yellow-200 to-orange-200 shadow-lg' 
                : 'bg-gray-100 opacity-50'
            }`}
          >
            <div className={`mb-2 ${badge.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
              {getIcon(badge.icon)}
            </div>
            <div className={`font-fredoka font-bold text-xs ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
              {badge.name}
            </div>
            <div className={`font-comic text-xs mt-1 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
              {badge.description}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BadgeSystem;
