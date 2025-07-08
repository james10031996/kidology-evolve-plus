
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Zap, Star } from 'lucide-react';

interface CreativeCardProps {
  activity: {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: number;
    duration: string;
    tools: string[];
    gradient: string;
    stars: number;
    route?: string;
  };
  onPlay: (activity: any) => void;
}

const CreativeCard = ({ activity, onPlay }: CreativeCardProps) => {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Art': return '🎨';
      case 'Music': return '🎵';
      case 'Writing': return '✍️';
      default: return '🌟';
    }
  };

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`w-full h-32 ${activity.gradient} rounded-xl mb-4 flex items-center justify-center`}>
        <div className="text-4xl text-white">
          {getCategoryEmoji(activity.category)}
        </div>
      </div>

      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {activity.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {activity.description}
      </p>

      <div className="mb-4">
        <p className="font-comic text-xs text-gray-600 mb-2">Tools available:</p>
        <div className="flex flex-wrap gap-1">
          {activity.tools.map((tool, index) => (
            <Badge key={index} className="bg-gray-100 text-gray-700 text-xs font-comic">
              {tool}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-comic text-xs text-gray-600">Duration:</span>
          <span className="font-comic text-xs font-bold">{activity.duration}</span>
        </div>
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
        <Zap className="w-4 h-4 mr-2" />
        Start Creating
      </Button>
    </Card>
  );
};

export default CreativeCard;
