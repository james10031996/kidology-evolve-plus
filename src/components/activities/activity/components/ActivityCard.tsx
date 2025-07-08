
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';

interface ActivityCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    duration: string;
    bestScore?: number;
    playCount?: number;
    gradient: string;
    stars: number;
    route?: string;
  };
  onPlay: (activity: any) => void;
}

const ActivityCard = ({ activity, onPlay }: ActivityCardProps) => {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Math': return '🔢';
      case 'English': return '📝';
      case 'Memory': return '🧠';
      case 'Logic': return '🧩';
      default: return '🎮';
    }
  };

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`w-full h-24 ${activity.gradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-3xl text-white animate-bounce">
          {getCategoryEmoji(activity.category)}
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/20 text-white font-comic text-xs">
            Level {activity.difficulty}
          </Badge>
        </div>
      </div>

      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {activity.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {activity.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-comic text-xs text-gray-600">Duration:</span>
          <span className="font-comic text-xs font-bold">{activity.duration}</span>
        </div>
        {activity.bestScore && (
          <div className="flex justify-between items-center">
            <span className="font-comic text-xs text-gray-600">Best Score:</span>
            <span className="font-comic text-xs font-bold text-yellow-600">{activity.bestScore}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="font-comic text-xs text-gray-600">Reward:</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold text-yellow-600">{activity.stars}</span>
          </div>
        </div>
      </div>

      <Button 
        className={`w-full ${activity.gradient} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
        onClick={() => onPlay(activity)}
      >
        <Play className="w-4 h-4 mr-2" />
        Play Now
      </Button>
    </Card>
  );
};

export default ActivityCard;
