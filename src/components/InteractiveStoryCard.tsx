
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Star, Clock, BookOpen } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import EnhancedBookReader from './EnhancedBookReader';

interface StoryCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  rating: number;
  category: string;
  isNew?: boolean;
}

const InteractiveStoryCard = ({ 
  title, 
  description, 
  difficulty, 
  duration, 
  rating, 
  category, 
  isNew 
}: StoryCardProps) => {
  const { updateStars } = useUser();
  const [showReader, setShowReader] = useState(false);

  const storyPages = [
    {
      text: `Welcome to "${title}"! This ${category.toLowerCase()} adventure is about to begin. Are you ready to dive into an amazing world of wonder and discovery?`,
      animation: "fade-in",
      backgroundColor: "from-blue-100 to-purple-100"
    },
    {
      text: "Once upon a time, in a land far away, there lived characters who would soon embark on the most incredible journey ever imagined.",
      animation: "slide-in-right",
      backgroundColor: "from-green-100 to-blue-100"
    },
    {
      text: "The adventure begins when our hero discovers something magical that would change everything they thought they knew about the world.",
      animation: "scale-in",
      backgroundColor: "from-purple-100 to-pink-100"
    },
    {
      text: "With courage in their heart and wonder in their eyes, they set off on a journey that would test their bravery and wisdom.",
      animation: "fade-in",
      backgroundColor: "from-yellow-100 to-orange-100"
    },
    {
      text: "Along the way, they meet friends who help them learn important lessons about friendship, kindness, and believing in yourself.",
      animation: "slide-in-right",
      backgroundColor: "from-pink-100 to-red-100"
    },
    {
      text: "Together, they overcome challenges and discover that the real magic was inside them all along. The end of this wonderful adventure!",
      animation: "scale-in",
      backgroundColor: "from-indigo-100 to-purple-100"
    }
  ];

  const readStory = () => {
    setShowReader(true);
    updateStars(25);
  };

  if (showReader) {
    return (
      <EnhancedBookReader
        pages={storyPages}
        title={title}
        onClose={() => setShowReader(false)}
      />
    );
  }

  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative mb-4">
        <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
          <div className="text-4xl">
            {category === 'Fantasy' && '🧚‍♀️'}
            {category === 'Science' && '🚀'}
            {category === 'Adventure' && '🏴‍☠️'}
            {category === 'Mystery' && '🔍'}
            {category === 'Animal' && '🦁'}
            {!['Fantasy', 'Science', 'Adventure', 'Mystery', 'Animal'].includes(category) && '📚'}
          </div>
        </div>
        {isNew && (
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-comic animate-pulse">
            New!
          </Badge>
        )}
      </div>

      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <Badge variant="outline" className="font-comic text-xs">
            {difficulty}
          </Badge>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3 text-gray-500" />
            <span className="font-comic text-xs text-gray-600">{duration}</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold">{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold text-yellow-600">25 stars</span>
          </div>
        </div>
      </div>

      <Button 
        className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
        onClick={readStory}
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Read Story
      </Button>
    </Card>
  );
};

export default InteractiveStoryCard;
