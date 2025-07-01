
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Play, Clock, Star, X } from 'lucide-react';
import EnhancedBookReader from '../story/EnhancedBookReader';

interface Story {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  rating: number;
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
}

interface StorySectionProps {
  stories: Story[];
  type: 'stories' | 'poems';
}

const StorySection = ({ stories, type }: StorySectionProps) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const gradientClass = type === 'stories' ? 'gradient-orange' : 'gradient-rose';
  const iconBgClass = type === 'stories' 
    ? 'from-orange-400 to-red-400' 
    : 'from-rose-400 to-pink-400';

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <Card key={story.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-16 h-16 bg-gradient-to-br ${iconBgClass} rounded-2xl flex items-center justify-center`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <Badge className="bg-blue-100 text-blue-700 font-comic">
                {story.difficulty}
              </Badge>
            </div>
            
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
              {story.title}
            </h3>
            <p className="font-comic text-gray-600 text-sm mb-4">
              {story.description}
            </p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-comic text-sm text-gray-600">{story.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-comic text-sm font-bold text-gray-700">{story.rating}</span>
              </div>
            </div>
            
            <Button 
              className={`w-full ${gradientClass} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
              onClick={() => setSelectedStory(story)}
            >
              <Play className="w-4 h-4 mr-2" />
              {type === 'stories' ? 'Read Story' : 'Read Poem'}
            </Button>
          </Card>
        ))}
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
            <Button
              onClick={() => setSelectedStory(null)}
              className="absolute top-4 right-4 z-10 rounded-full w-10 h-10 p-0 bg-white/10 text-gray-600 hover:bg-white/20"
              variant="ghost"
            >
              <X className="w-5 h-5" />
            </Button>
            <EnhancedBookReader
              pages={selectedStory.pages}
              title={selectedStory.title}
              onClose={() => setSelectedStory(null)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default StorySection;