
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, CheckCircle, Star, Clock, BookOpen } from 'lucide-react';

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

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Button 
            onClick={onClose}
            variant="ghost" 
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <Badge className="bg-purple-100 text-purple-700 font-comic">
            Course Preview
          </Badge>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Course Info & Lessons */}
          <div className="space-y-6">
            <Card className="p-6">
              <h1 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
                {course.title}
              </h1>
              <p className="font-comic text-gray-600 mb-4">
                {course.description}
              </p>
              
              <div className="flex items-center space-x-4 mb-4">
                <Badge className={`font-comic ${getDifficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{course.duration}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-comic font-bold text-sm text-gray-700">Progress</span>
                  <span className="font-comic text-sm text-gray-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
                📚 Lessons ({course.lessons.length})
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {course.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(index)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                      index === currentLessonIndex
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-comic font-bold text-sm text-gray-800">
                          Lesson {index + 1}: {lesson.title}
                        </h4>
                        <p className="font-comic text-xs text-gray-600 mt-1">
                          {lesson.description}
                        </p>
                      </div>
                      {completedLessons.includes(lesson.id) && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            <Card className="p-8 min-h-96">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-fredoka font-bold text-xl text-gray-800">
                  Lesson {currentLessonIndex + 1}: {currentLesson.title}
                </h2>
                <Badge variant="outline" className="font-comic">
                  {currentLessonIndex + 1} / {course.lessons.length}
                </Badge>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-6">
                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-3">
                  {currentLesson.description}
                </h3>
                <div className="font-comic text-gray-700 leading-relaxed">
                  {currentLesson.content}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button
                    onClick={() => setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1))}
                    disabled={currentLessonIndex === 0}
                    variant="outline"
                    className="font-comic"
                  >
                    Previous
                  </Button>
                  <Button
                    onClick={() => setCurrentLessonIndex(Math.min(course.lessons.length - 1, currentLessonIndex + 1))}
                    disabled={currentLessonIndex === course.lessons.length - 1}
                    variant="outline"
                    className="font-comic"
                  >
                    Next
                  </Button>
                </div>

                <Button
                  onClick={completeLesson}
                  className="gradient-green text-white font-comic font-bold"
                  disabled={completedLessons.includes(currentLesson.id)}
                >
                  {completedLessons.includes(currentLesson.id) ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Complete Lesson
                    </>
                  )}
                </Button>
              </div>
            </Card>

            {/* Course Statistics */}
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4 text-center bg-gradient-to-br from-yellow-50 to-orange-50">
                <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="font-comic font-bold text-gray-800">Lessons</div>
                <div className="font-fredoka text-lg text-yellow-600">{course.lessons.length}</div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-to-br from-green-50 to-emerald-50">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="font-comic font-bold text-gray-800">Completed</div>
                <div className="font-fredoka text-lg text-green-600">{completedLessons.length}</div>
              </Card>
              
              <Card className="p-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50">
                <BookOpen className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="font-comic font-bold text-gray-800">Quizzes</div>
                <div className="font-fredoka text-lg text-blue-600">{course.quizzes?.length || 0}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
