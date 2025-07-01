
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Star, CheckCircle, BookOpen, Edit, Eye } from 'lucide-react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedCourse, setEditedCourse] = useState(course);

  const currentLesson = editedCourse.lessons[currentLessonIndex];
  const progress = (completedLessons.length / editedCourse.lessons.length) * 100;

  const completeLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (currentLessonIndex < editedCourse.lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentLessonIndex(Math.max(0, currentLessonIndex - 1));
  };

  const handleNext = () => {
    setCurrentLessonIndex(Math.min(editedCourse.lessons.length - 1, currentLessonIndex + 1));
  };

  const handleSave = () => {
    console.log('Saving course:', editedCourse);
    setIsEditing(false);
    alert('Course saved successfully!');
  };

  const handlePreview = () => {
    console.log('Previewing course:', editedCourse);
    alert('Course preview mode activated!');
  };

  const handleEditQuiz = (quizId: string) => {
    console.log('Editing quiz:', quizId);
    alert(`Editing quiz: ${quizId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
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
          
          <div className="flex space-x-2">
            <Button
              onClick={handlePreview}
              className="gradient-blue text-white font-comic"
            >
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button
              onClick={() => setIsEditing(!isEditing)}
              variant={isEditing ? "default" : "outline"}
              className="font-comic"
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditing ? 'Cancel Edit' : 'Edit Course'}
            </Button>
            {isEditing && (
              <Button
                onClick={handleSave}
                className="gradient-green text-white font-comic"
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="space-y-6">
            <CourseInfo course={editedCourse} progress={progress} />
            <LessonsList 
              lessons={editedCourse.lessons}
              currentLessonIndex={currentLessonIndex}
              completedLessons={completedLessons}
              onLessonSelect={setCurrentLessonIndex}
            />
            
            {/* Quizzes Section */}
            {editedCourse.quizzes && editedCourse.quizzes.length > 0 && (
              <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200">
                <h3 className="font-fredoka text-xl text-orange-700 mb-4">📝 Course Quizzes</h3>
                <div className="space-y-3">
                  {editedCourse.quizzes.map((quiz, index) => (
                    <div key={quiz.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-orange-200">
                      <div>
                        <div className="font-comic font-bold text-gray-800">{quiz.title}</div>
                        <div className="font-comic text-sm text-gray-600">
                          {quiz.questions.length} questions
                        </div>
                      </div>
                      <Button
                        onClick={() => handleEditQuiz(quiz.id)}
                        size="sm"
                        className="gradient-orange text-white font-comic"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <LessonContent
              lesson={currentLesson}
              currentIndex={currentLessonIndex}
              totalLessons={editedCourse.lessons.length}
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
                <div className="font-fredoka text-3xl text-yellow-600 font-bold">{editedCourse.lessons.length}</div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <div className="font-comic font-bold text-gray-800 text-lg">Completed</div>
                <div className="font-fredoka text-3xl text-green-600 font-bold">{completedLessons.length}</div>
              </Card>
              
              <Card className="p-6 text-center bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                <BookOpen className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                <div className="font-comic font-bold text-gray-800 text-lg">Quizzes</div>
                <div className="font-fredoka text-3xl text-blue-600 font-bold">{editedCourse.quizzes?.length || 0}</div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;