
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, CheckCircle, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

const MathBasics = () => {
  const navigate = useNavigate();
  const { userData, updateStars, updateProgress } = useUser();
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const lessons = [
    { id: 1, title: 'Counting 1-10', description: 'Learn to count from 1 to 10 with fun animations', duration: '8 min', difficulty: 'Easy', stars: 15 },
    { id: 2, title: 'Basic Addition', description: 'Add numbers using visual aids and games', duration: '12 min', difficulty: 'Easy', stars: 20 },
    { id: 3, title: 'Simple Subtraction', description: 'Subtract numbers with interactive exercises', duration: '10 min', difficulty: 'Medium', stars: 25 },
    { id: 4, title: 'Shapes Recognition', description: 'Identify circles, squares, triangles and more', duration: '15 min', difficulty: 'Easy', stars: 18 },
    { id: 5, title: 'Number Patterns', description: 'Find patterns in number sequences', duration: '14 min', difficulty: 'Medium', stars: 30 },
    { id: 6, title: 'Measurement Basics', description: 'Learn about size, length, and weight', duration: '16 min', difficulty: 'Medium', stars: 28 }
  ];

  const courseProgress = Math.round((completedLessons.length / lessons.length) * 100);

  const startLesson = (lessonId: number, stars: number) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      updateStars(stars);
      updateProgress('Mathematics', 10);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/courses')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        {/* Course Header */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 gradient-blue rounded-full mx-auto mb-6 flex items-center justify-center">
            <span className="text-4xl text-white">🔢</span>
          </div>
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            Math Basics Course
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Master the fundamentals of mathematics with fun, interactive lessons designed for young learners!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-blue-100 text-blue-800 font-comic">6 Lessons</Badge>
            <Badge className="bg-green-100 text-green-800 font-comic">Beginner Friendly</Badge>
            <Badge className="bg-purple-100 text-purple-800 font-comic">Interactive</Badge>
          </div>

          {/* Progress Overview */}
          <Card className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <span className="font-comic font-bold text-gray-800">Course Progress</span>
              <span className="font-fredoka text-2xl text-blue-600">{courseProgress}%</span>
            </div>
            <Progress value={courseProgress} className="h-3 mb-4" />
            <div className="flex justify-between text-sm font-comic text-gray-600">
              <span>{completedLessons.length} completed</span>
              <span>{lessons.length - completedLessons.length} remaining</span>
            </div>
          </Card>
        </div>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id);
            const isLocked = index > 0 && !completedLessons.includes(lessons[index - 1].id);
            
            return (
              <Card key={lesson.id} className={`p-6 rounded-2xl shadow-lg border-0 transition-all duration-300 ${
                isCompleted ? 'bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200' :
                isLocked ? 'bg-gray-100 opacity-60' : 'bg-white hover:shadow-xl hover:-translate-y-2'
              }`}>
                <div className="relative mb-4">
                  <div className={`w-full h-24 rounded-xl flex items-center justify-center ${
                    isCompleted ? 'bg-green-200' : isLocked ? 'bg-gray-200' : 'gradient-blue'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : isLocked ? (
                      <span className="text-2xl">🔒</span>
                    ) : (
                      <span className="text-3xl text-white">
                        {lesson.id === 1 && '🔢'}
                        {lesson.id === 2 && '➕'}
                        {lesson.id === 3 && '➖'}
                        {lesson.id === 4 && '🔺'}
                        {lesson.id === 5 && '🔄'}
                        {lesson.id === 6 && '📏'}
                      </span>
                    )}
                  </div>
                  {isCompleted && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-4 h-4 text-yellow-800 fill-current" />
                    </div>
                  )}
                </div>

                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                  Lesson {lesson.id}: {lesson.title}
                </h3>
                <p className="font-comic text-gray-600 text-sm mb-4">
                  {lesson.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-comic text-xs text-gray-600">Duration:</span>
                    <Badge variant="outline" className="font-comic text-xs">{lesson.duration}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-comic text-xs text-gray-600">Difficulty:</span>
                    <Badge variant="outline" className={`font-comic text-xs ${
                      lesson.difficulty === 'Easy' ? 'border-green-300 text-green-700' : 'border-orange-300 text-orange-700'
                    }`}>
                      {lesson.difficulty}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-comic text-xs text-gray-600">Reward:</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-comic text-xs font-bold text-yellow-600">{lesson.stars}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className={`w-full font-comic font-bold rounded-full transition-all duration-200 ${
                    isCompleted ? 'bg-green-500 hover:bg-green-600 text-white' :
                    isLocked ? 'bg-gray-300 text-gray-500 cursor-not-allowed' :
                    'gradient-blue text-white hover:scale-105'
                  }`}
                  onClick={() => !isLocked && startLesson(lesson.id, lesson.stars)}
                  disabled={isLocked}
                >
                  {isCompleted ? (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Completed
                    </>
                  ) : isLocked ? (
                    <>
                      🔒 Complete Previous Lesson
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Lesson
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {/* Course Completion Reward */}
        {courseProgress === 100 && (
          <Card className="p-8 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl text-center">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              🎉 Course Completed! 🎉
            </h2>
            <p className="font-comic text-lg text-gray-700 mb-6">
              Congratulations! You've mastered Math Basics and earned the Math Wizard badge!
            </p>
            <Button className="gradient-orange text-white font-comic font-bold px-8 py-3 rounded-full">
              Claim Your Certificate
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MathBasics;
