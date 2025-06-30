
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, CheckCircle, ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

interface LessonContentProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    content: string;
  };
  currentIndex: number;
  totalLessons: number;
  isCompleted: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onComplete: () => void;
}

const LessonContent = ({ 
  lesson, 
  currentIndex, 
  totalLessons, 
  isCompleted, 
  onPrevious, 
  onNext, 
  onComplete 
}: LessonContentProps) => {
  return (
    <Card className="p-8 min-h-96 bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            Lesson {currentIndex + 1}: {lesson.title}
          </h2>
          <p className="font-comic text-gray-600">{lesson.description}</p>
        </div>
        <Badge variant="outline" className="font-comic text-lg px-4 py-2">
          {currentIndex + 1} / {totalLessons}
        </Badge>
      </div>
      
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 mb-8 border-2 border-dashed border-purple-300">
        <div className="flex items-center mb-4">
          <BookOpen className="w-6 h-6 text-purple-600 mr-2" />
          <h3 className="font-fredoka font-bold text-xl text-purple-700">
            Lesson Overview
          </h3>
        </div>
        <div className="font-comic text-gray-700 leading-relaxed text-lg bg-white p-6 rounded-lg shadow-sm">
          {lesson.content}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <Button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            variant="outline"
            className="font-comic border-purple-300 hover:bg-purple-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </Button>
          <Button
            onClick={onNext}
            disabled={currentIndex === totalLessons - 1}
            variant="outline"
            className="font-comic border-purple-300 hover:bg-purple-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <Button
          onClick={onComplete}
          className={`font-comic font-bold px-6 py-3 ${
            isCompleted 
              ? 'bg-green-500 hover:bg-green-600 text-white' 
              : 'gradient-green text-white hover:scale-105 transition-transform'
          }`}
          disabled={isCompleted}
        >
          {isCompleted ? (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Completed
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Complete Lesson
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default LessonContent;
