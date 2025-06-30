
import { Card } from '@/components/ui/card';
import { CheckCircle, Play, Star } from 'lucide-react';

interface LessonsListProps {
  lessons: {
    id: string;
    title: string;
    description: string;
  }[];
  currentLessonIndex: number;
  completedLessons: string[];
  onLessonSelect: (index: number) => void;
}

const LessonsList = ({ lessons, currentLessonIndex, completedLessons, onLessonSelect }: LessonsListProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
      <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-6 text-center">
        📚 Course Lessons ({lessons.length})
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {lessons.map((lesson, index) => (
          <button
            key={lesson.id}
            onClick={() => onLessonSelect(index)}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-105 ${
              index === currentLessonIndex
                ? 'border-purple-500 bg-purple-100 shadow-lg'
                : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50'
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    completedLessons.includes(lesson.id) ? 'bg-green-500' : 
                    index === currentLessonIndex ? 'bg-purple-500' : 'bg-gray-400'
                  }`}>
                    {completedLessons.includes(lesson.id) ? '✓' : index + 1}
                  </div>
                  <h4 className="font-comic font-bold text-lg text-gray-800">
                    {lesson.title}
                  </h4>
                </div>
                <p className="font-comic text-sm text-gray-600 ml-10">
                  {lesson.description}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-1 ml-4">
                {completedLessons.includes(lesson.id) && (
                  <CheckCircle className="w-6 h-6 text-green-500" />
                )}
                {index === currentLessonIndex && !completedLessons.includes(lesson.id) && (
                  <Play className="w-6 h-6 text-purple-500 animate-pulse" />
                )}
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-xs text-gray-600 ml-1">10</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </Card>
  );
};

export default LessonsList;
