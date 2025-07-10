
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Zap, Crown, Star, Target } from 'lucide-react';

interface BadgeData {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  condition: string;
}

interface BadgeSystemProps {
  badges: BadgeData[];
  recentBadge?: string;
}

const BadgeSystem = ({ badges, recentBadge }: BadgeSystemProps) => {
  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'zap': return <Zap className="w-6 h-6" />;
      case 'crown': return <Crown className="w-6 h-6" />;
      case 'trophy': return <Trophy className="w-6 h-6" />;
      case 'star': return <Star className="w-6 h-6" />;
      case 'target': return <Target className="w-6 h-6" />;
      default: return <Trophy className="w-6 h-6" />;
    }
  };

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm shadow-lg rounded-xl">
      <div className="flex items-center mb-3">
        <Trophy className="w-5 h-5 text-yellow-500 mr-2" />
        <h3 className="font-fredoka font-bold text-lg text-gray-800">Achievements</h3>
      </div>
      
      {recentBadge && (
        <div className="mb-4 p-3 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl animate-bounce">
          <div className="text-center">
            <div className="text-2xl mb-1">🎉</div>
            <div className="font-comic font-bold text-yellow-700">New Badge Earned!</div>
            <div className="font-comic text-sm text-yellow-600">{recentBadge}</div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className={`text-center p-3 rounded-xl transition-all duration-200 ${
              badge.earned
                ? 'bg-gradient-to-b from-yellow-100 to-yellow-200 text-yellow-700 scale-105'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <div className={`mx-auto mb-2 ${badge.earned ? 'text-yellow-600' : 'text-gray-400'}`}>
              {getIcon(badge.icon)}
            </div>
            <div className="font-comic font-bold text-xs">{badge.name}</div>
            <div className="font-comic text-xs opacity-75">{badge.description}</div>
            <Badge
              variant={badge.earned ? "default" : "secondary"}
              className="mt-1 text-xs"
            >
              {badge.earned ? "Earned!" : "Locked"}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BadgeSystem;
