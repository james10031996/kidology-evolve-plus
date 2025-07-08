
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Trophy } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  color: string;
  difficulty: string;
  duration: string;
}

interface EnglishLessonCardProps {
  lesson: Lesson;
  index: number;
  isCompleted: boolean;
  onSelect: (lessonId: string) => void;
}

const EnglishLessonCard = ({ lesson, index, isCompleted, onSelect }: EnglishLessonCardProps) => {
  return (
    <Card 
      className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`w-full h-32 ${lesson.color} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-4xl text-white animate-bounce z-10">
          {lesson.title.split(' ')[0]}
        </div>
        {isCompleted && (
          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
            <Trophy className="w-4 h-4" />
          </div>
        )}
      </div>

      <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
        {lesson.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {lesson.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          <Badge className={`font-comic text-xs ${
            lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
            'bg-yellow-100 text-yellow-700'
          }`}>
            {lesson.difficulty}
          </Badge>
          <Badge className="bg-blue-100 text-blue-700 font-comic text-xs">
            {lesson.duration}
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="font-comic text-sm font-bold text-yellow-600">
            {lesson.difficulty === 'Easy' ? '10' : '15'} stars
          </span>
        </div>
      </div>

      <Button 
        className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
        onClick={() => onSelect(lesson.id)}
      >
        <BookOpen className="w-4 h-4 mr-2" />
        Start Learning
      </Button>
    </Card>
  );
};

export default EnglishLessonCard;
