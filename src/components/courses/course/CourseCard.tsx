
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Star, Clock, Users, Play } from 'lucide-react';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  students: number;
  rating: number;
  progress?: number;
  lessons: number;
  category: string;
  isNew?: boolean;
  gradient: string;
}

const CourseCard = ({
  title,
  description,
  difficulty,
  duration,
  students,
  rating,
  progress,
  lessons,
  category,
  isNew,
  gradient
}: CourseCardProps) => {
  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-700',
    Intermediate: 'bg-yellow-100 text-yellow-700',
    Advanced: 'bg-red-100 text-red-700'
  };

  return (
    <Card className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
      {/* Header with gradient */}
      <div className={`${gradient} h-40 relative flex items-center justify-center text-6xl`}>
        {category === 'Math' && '🔢'}
        {category === 'English' && '📚'}
        {category === 'Science' && '🧪'}
        {category === 'Art' && '🎨'}
        {category === 'Music' && '🎵'}
        {category === 'Geography' && '🗺️'}
        
        {isNew && (
          <Badge className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 font-comic font-bold">
            NEW!
          </Badge>
        )}
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        <Button 
          size="sm" 
          className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-sm text-white border-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <Play className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6">
        {/* Category & Difficulty */}
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="font-comic font-bold text-gray-600">
            {category}
          </Badge>
          <Badge className={`font-comic font-bold ${difficultyColors[difficulty]}`}>
            {difficulty}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="font-comic text-gray-600 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span className="font-comic">{duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="w-4 h-4" />
            <span className="font-comic">{students.toLocaleString()}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-comic font-bold">{rating}</span>
          </div>
        </div>

        {/* Progress */}
        {progress !== undefined && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-comic text-sm text-gray-600">Progress</span>
              <span className="font-comic font-bold text-sm text-gray-800">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Action Button */}
        <Button 
          className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
          size="sm"
        >
          {progress !== undefined ? 'Continue Learning' : 'Start Course'}
        </Button>

        {/* Lessons count */}
        <div className="text-center mt-3">
          <span className="font-comic text-xs text-gray-500">
            {lessons} lessons available
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
