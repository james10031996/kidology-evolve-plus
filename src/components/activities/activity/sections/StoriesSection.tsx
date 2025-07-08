
import { useState } from 'react';
import { Clock, Users, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Story {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  rating: number;
  pages: Array<{
    text: string;
    animation: string;
    backgroundColor: string;
  }>;
}

interface StoriesSectionProps {
  stories: Story[];
  type: 'stories' | 'poems';
}

const StoriesSection = ({ stories, type }: StoriesSectionProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const title = type === 'stories' ? '📚 Magical Stories' : '🎵 Fun Poems';
  const subtitle = type === 'stories' 
    ? 'Discover amazing adventures and magical tales!' 
    : 'Enjoy rhythmic poems and fun verses!';

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">{title}</h2>
        <p className="font-comic text-gray-600 text-lg">{subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <Card 
            key={story.id} 
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-2 border-transparent hover:border-purple-200" 
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl p-6 mb-4 text-white text-center">
              <div className="text-4xl mb-2 animate-bounce">
                {type === 'stories' ? '📖' : '🎵'}
              </div>
              <h3 className="font-fredoka font-bold text-lg">{story.title}</h3>
            </div>

            <p className="font-comic text-gray-600 text-sm mb-4">{story.description}</p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-comic text-xs text-gray-600">{story.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-comic text-xs font-bold text-yellow-600">{story.rating}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                story.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {story.difficulty}
              </Badge>
            </div>

            <Button 
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
              onClick={() => setSelectedStory(story)}
            >
              {type === 'stories' ? 'Read Story' : 'Read Poem'} ✨
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StoriesSection;
