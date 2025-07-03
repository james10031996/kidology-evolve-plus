
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AdminQuizManager from './AdminQuizManager';
import CourseCard from './courseManager/CourseCard';
import CourseForm from './courseManager/CourseForm';

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

const AdminCourseManager = () => {
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'Math Fundamentals',
      description: 'Basic math concepts for children',
      category: 'Mathematics',
      difficulty: 'Easy',
      duration: '2 weeks',
      lessons: [],
      questions: [],
      createdAt: '2024-01-15'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [newCourse, setNewCourse] = useState<Partial<Course>>({
    title: '',
    description: '',
    category: '',
    difficulty: 'Easy',
    duration: '',
    lessons: [],
    questions: [],
    emoji: '📚',
    titleColor: '#6366f1',
    backgroundColor: '#f8fafc',
    animation: 'bounce'
  });

  const emojiOptions = ['📚', '🔢', '🔬', '🌍', '🎨', '🎵', '⚽', '🌟', '🚀', '🦋', '🌈', '💎'];
  const colorOptions = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16'];
  const backgroundOptions = ['#f8fafc', '#fef3c7', '#ecfdf5', '#fef2f2', '#f3e8ff', '#e0f2fe', '#f0f9ff'];
  const animationOptions = ['bounce', 'pulse', 'spin', 'ping', 'fade-in', 'scale-in'];

  const handleCreateCourse = () => {
    if (newCourse.title && newCourse.description) {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title,
        description: newCourse.description,
        category: newCourse.category || 'General',
        difficulty: newCourse.difficulty || 'Easy',
        duration: newCourse.duration || '1 week',
        lessons: newCourse.lessons || [],
        questions: newCourse.questions || [],
        createdAt: new Date().toISOString().split('T')[0],
        emoji: newCourse.emoji || '📚',
        titleColor: newCourse.titleColor || '#6366f1',
        backgroundColor: newCourse.backgroundColor || '#f8fafc',
        animation: newCourse.animation || 'bounce'
      };
      setCourses([...courses, course]);
      resetForm();
      setIsCreateMode(false);
    }
  };

  const resetForm = () => {
    setNewCourse({
      title: '',
      description: '',
      category: '',
      difficulty: 'Easy',
      duration: '',
      lessons: [],
      questions: [],
      emoji: '📚',
      titleColor: '#6366f1',
      backgroundColor: '#f8fafc',
      animation: 'bounce'
    });
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse(course);
    setIsEditMode(true);
  };

  const handlePreviewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsPreviewMode(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-green bg-clip-text text-transparent mb-2">
            🎓 Course Management
          </h2>
          <p className="text-gray-600 font-comic">
            Create and manage educational courses with interactive content and quizzes
          </p>
        </div>

        <div>
          <Button
            onClick={() => setIsCreateMode(true)}
            className="gradient-green text-white hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Course
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-green-100 rounded-xl p-1">
          <TabsTrigger value="courses" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-green-600">
            📚 Manage Courses
          </TabsTrigger>
          <TabsTrigger value="quizzes" className="rounded-lg font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600">
            🧠 Quiz Management
          </TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onEdit={handleEditCourse}
                onDelete={handleDeleteCourse}
                onPreview={handlePreviewCourse}
              />
            ))}
          </div>

          {courses.length === 0 && (
            <Card className="p-12 text-center border-green-200">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-xl font-fredoka font-bold text-gray-700 mb-2">
                No Courses Yet
              </h3>
              <p className="text-gray-500 font-comic mb-4">
                Start creating educational courses for children!
              </p>
              <Button
                onClick={() => setIsCreateMode(true)}
                className="gradient-green text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Course
              </Button>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="quizzes">
          <AdminQuizManager />
        </TabsContent>
      </Tabs>

      {/* Course Creation/Edit Dialog */}
      <Dialog open={isCreateMode || isEditMode} onOpenChange={(open) => {
        if (!open) {
          setIsCreateMode(false);
          setIsEditMode(false);
          setSelectedCourse(null);
          resetForm();
        }
      }}>
        <DialogContent className="bg-gradient-to-br from-white via-purple-50 to-pink-50 max-w-5xl max-h-[90vh] overflow-y-auto border border-purple-200 rounded-xl shadow-xl p-6">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
            <DialogHeader>
              <DialogTitle className="font-fredoka text-3xl text-white text-center mb-2">
                {isEditMode ? '✏️ Edit Course' : '🎨 Create Amazing Course'}
              </DialogTitle>
              <DialogDescription className="text-purple-100 text-center font-comic">
                {isEditMode ? 'Update your course details and styling!' : 'Design a beautiful and engaging course with custom styling!'}
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8 bg-white">
            <CourseForm
              course={newCourse}
              setCourse={setNewCourse}
              emojiOptions={emojiOptions}
              colorOptions={colorOptions}
              backgroundOptions={backgroundOptions}
              animationOptions={animationOptions}
            />

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsCreateMode(false);
                  setIsEditMode(false);
                  setSelectedCourse(null);
                }} 
                className="font-comic px-6 py-2"
              >
                ❌ Cancel
              </Button>
              
              <Button 
                onClick={handleCreateCourse}
                className="gradient-green text-white font-comic px-8 py-2 hover:scale-105 transition-transform"
                disabled={!newCourse.title || !newCourse.description}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isEditMode ? 'Update Course' : 'Create Course'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseManager;
