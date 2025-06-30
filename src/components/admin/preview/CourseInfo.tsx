
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface CourseInfoProps {
  course: {
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    lessons: any[];
  };
  progress: number;
}

const CourseInfo = ({ course, progress }: CourseInfoProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
      <div className="text-center mb-6">
        <h1 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
          {course.title}
        </h1>
        <p className="font-comic text-gray-600 text-lg">
          {course.description}
        </p>
      </div>
      
      <div className="flex items-center justify-center space-x-4 mb-6">
        <Badge className={`font-comic text-sm ${getDifficultyColor(course.difficulty)}`}>
          {course.difficulty}
        </Badge>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className="font-comic text-sm text-gray-600">{course.duration}</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl">
        <div className="flex justify-between items-center mb-3">
          <span className="font-comic font-bold text-lg text-gray-700">Course Progress</span>
          <span className="font-comic text-lg text-purple-600 font-bold">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-3 mb-2" />
        <p className="font-comic text-sm text-gray-600 text-center">
          {Math.round((progress / 100) * course.lessons.length)} of {course.lessons.length} lessons completed
        </p>
      </div>
    </Card>
  );
};

export default CourseInfo;
