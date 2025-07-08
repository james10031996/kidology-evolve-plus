
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, BookOpen, Clock, Users } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  lessons: any[];
  questions: any[];
  createdAt: string;
  tags?: string;
  image?: string;
  emoji?: string;
  titleColor?: string;
  backgroundColor?: string;
  animation?: string;
}

interface CourseCardProps {
  course: Course;
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
  onPreview: (course: Course) => void;
}

const CourseCard = ({ course, onEdit, onDelete, onPreview }: CourseCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getAnimationClass = (animation?: string) => {
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'ping': return 'animate-ping';
      case 'fade-in': return 'animate-fade-in';
      case 'scale-in': return 'animate-scale-in';
      default: return '';
    }
  };

  return (
    <Card 
      className="p-6 border-green-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      style={{ backgroundColor: course.backgroundColor || '#f8fafc' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center ${getAnimationClass(course.animation)}`}>
            <span className="text-2xl">{course.emoji || '📚'}</span>
          </div>
          <div>
            <h4 
              className="font-bold font-fredoka text-lg mb-1"
              style={{ color: course.titleColor || '#1f2937' }}
            >
              {course.title}
            </h4>
            <p className="text-sm text-gray-500 font-comic">
              {course.category}
            </p>
            {course.tags && (
              <div className="flex flex-wrap gap-1 mt-1">
                {course.tags.split(',').map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag.trim()}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        <Button
          onClick={() => onDelete(course.id)}
          size="sm"
          variant="destructive"
          className="opacity-70 hover:opacity-100"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <p className="text-gray-600 font-comic text-sm mb-4 line-clamp-2">
        {course.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-comic flex items-center">
              <BookOpen className="w-3 h-3 mr-1" />
              Difficulty:
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(course.difficulty)}`}>
              {course.difficulty}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-comic flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Duration:
            </span>
            <span className="font-bold text-gray-700">{course.duration}</span>
          </div>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-comic flex items-center">
              <Users className="w-3 h-3 mr-1" />
              Lessons:
            </span>
            <span className="font-bold text-green-600">{course.lessons.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600 font-comic">Questions:</span>
            <span className="font-bold text-blue-600">{course.questions.length}</span>
          </div>
        </div>
      </div>

      <div className="text-xs text-gray-500 font-comic mb-4">
        Created: {new Date(course.createdAt).toLocaleDateString()}
      </div>

      <div className="flex justify-between gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="text-xs border-green-200 hover:bg-green-50"
          onClick={() => onEdit(course)}
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit
        </Button>
        <Button 
          size="sm" 
          className="gradient-green text-white text-xs hover:opacity-90"
          onClick={() => onPreview(course)}
        >
          <Eye className="w-3 h-3 mr-1" />
          Preview
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;