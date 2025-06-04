
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, BookOpen, Volume2, Star } from 'lucide-react';

interface StoryCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  rating: number;
  isNew?: boolean;
  category: string;
  hasAudio?: boolean;
  isInteractive?: boolean;
}

const InteractiveStoryCard = ({
  title,
  description,
  difficulty,
  duration,
  rating,
  isNew,
  category,
  hasAudio = true,
  isInteractive = true
}: StoryCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const difficultyColors = {
    Easy: 'bg-green-100 text-green-700',
    Medium: 'bg-yellow-100 text-yellow-700',
    Hard: 'bg-red-100 text-red-700'
  };

  const categoryEmojis = {
    'Adventure': '🏴‍☠️',
    'Fantasy': '🧚‍♀️',
    'Animals': '🐰',
    'Science': '🔬',
    'Friendship': '👫'
  };

  return (
    <Card className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
      {/* Story Illustration */}
      <div className="gradient-purple h-40 relative flex items-center justify-center text-6xl">
        {categoryEmojis[category as keyof typeof categoryEmojis] || '📚'}
        
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 font-comic font-bold">
            NEW!
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        
        <Button 
          size="lg"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-purple-600 rounded-full w-16 h-16 p-0"
        >
          <Play className="w-8 h-8" />
        </Button>
      </div>

      <div className="p-6">
        {/* Category & Features */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="font-comic font-bold text-gray-600">
            {category}
          </Badge>
          <div className="flex items-center space-x-2">
            {hasAudio && <Volume2 className="w-4 h-4 text-blue-500" />}
            {isInteractive && <BookOpen className="w-4 h-4 text-green-500" />}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-comic text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Story Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <Badge className={`font-comic font-bold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </Badge>
          <span className="font-comic">{duration}</span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-comic font-bold">{rating}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1 gradient-purple text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
            size="sm"
          >
            Read Story
          </Button>
          <Button 
            variant="outline"
            size="sm"
            className="px-4 rounded-full border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InteractiveStoryCard;
