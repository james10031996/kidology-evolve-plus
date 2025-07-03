
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Clock } from 'lucide-react';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    rating: number;
    category: string;
    isNew?: boolean;
    stars: number;
    route?: string;
  };
  onPlay: (story: any) => void;
}

const StoryCard = ({ story, onPlay }: StoryCardProps) => {
  const getCategoryEmoji = (category: string) => {
    switch (category) {
      case 'Fantasy': return '🧚‍♀️';
      case 'Science': return '🚀';
      case 'Adventure': return '🏴‍☠️';
      default: return '📖';
    }
  };

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative mb-4">
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
          <div className="text-4xl">
            {getCategoryEmoji(story.category)}
          </div>
        </div>
        {story.isNew && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-comic animate-pulse">
            New!
          </Badge>
        )}
      </div>

      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {story.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {story.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="font-comic text-xs">
            {story.difficulty}
          </Badge>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="font-comic text-xs text-gray-600">{story.duration}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold">{story.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold text-yellow-600">{story.stars} stars</span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
        onClick={() => onPlay(story)}
      >
        <Play className="w-4 h-4 mr-2" />
        Read Story
      </Button>
    </Card>
  );
};

export default StoryCard;
