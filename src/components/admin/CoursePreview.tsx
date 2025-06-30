
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, CheckCircle, BookOpen } from 'lucide-react';
import CourseInfo from './preview/CourseInfo';
import LessonsList from './preview/LessonsList';
import LessonContent from './preview/LessonContent';

interface CoursePreviewProps {
  course: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    lessons: {
      id: string;
      title: string;
      description: string;
      content: string;
      completed?: boolean;
    }[];
    quizzes?: {
      id: string;
      title: string;
      questions: any[];
    }[];
  };
  onClose: () => void;
}

const CoursePreview = ({ course, onClose }: CoursePreviewProps) => {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const currentLesson = course.lessons[currentLessonIndex];
  const progress = (completedLessons.length / course.lessons.length) * 100;

  const completeLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (currentLessonIndex < course.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1));
  };

  const handleNext = () => {
    setCurrentLessonIndex(Math.min(course.lessons.length - 1, currentLessonIndex + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={onClose}
            variant="ghost" 
            className="mr-4 font-comic hover:bg-purple-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <Badge className="bg-purple-100 text-purple-700 font-comic px-4 py-2">
            📖 Course Preview
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <CourseInfo course={course} progress={progress} />
            <LessonsList 
              lessons={course.lessons}
              currentLessonIndex={currentLessonIndex}
              completedLessons={completedLessons}
              onLessonSelect={setCurrentLessonIndex}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <LessonContent
              lesson={currentLesson}
              currentIndex={currentLessonIndex}
              totalLessons={course.lessons.length}
              isCompleted={completedLessons.includes(currentLesson.id)}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onComplete={completeLesson}
            />

            {/* Course Statistics */}
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200">
                <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                <div className="font-comic font-bold text-gray-800 text-lg">Total Lessons</div>
                <div className="font-fredoka text-3xl text-yellow-600 font-bold">{course.lessons.length}</div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <div className="font-comic font-bold text-gray-800 text-lg">Completed</div>
                <div className="font-fredoka text-3xl text-green-600 font-bold">{completedLessons.length}</div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="font-comic font-bold text-gray-800 text-lg">Quizzes</div>
                <div className="font-fredoka text-3xl text-blue-600 font-bold">{course.quizzes?.length || 0}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
