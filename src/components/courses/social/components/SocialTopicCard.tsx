
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Heart } from 'lucide-react';

interface SocialTopicCardProps {
  topic: {
    id: string;
    title: string;
    description: string;
    color: string;
  };
  onStart: (topicId: string) => void;
}

const SocialTopicCard = ({ topic, onStart }: SocialTopicCardProps) => {
  return (
    <Card className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in">
      <div className={`w-full h-32 ${topic.color} rounded-xl mb-4 flex items-center justify-center`}>
        <div className="text-4xl text-white animate-bounce">
          {topic.title.split(' ')[0]}
        </div>
      </div>

      <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
        {topic.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {topic.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <Badge className="bg-pink-100 text-pink-700 font-comic">
          Social Skills
        </Badge>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-comic text-sm font-bold text-yellow-600">15 stars</span>
        </div>
      </div>

      <Button 
        className={`w-full ${topic.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
        onClick={() => onStart(topic.id)}
      >
        <Heart className="w-4 h-4 mr-2" />
        Start Learning
      </Button>
    </Card>
  );
};

export default SocialTopicCard;
