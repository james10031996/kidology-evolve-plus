
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Sparkles, BookOpen, Users } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
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
      description: 'Basic math concepts for children including counting, addition, subtraction, and basic geometry.',
      category: 'Mathematics',
      difficulty: 'Easy',
      duration: '2 weeks',
      lessons: [
        { id: '1', title: 'Counting to 10', duration: '15 min' },
        { id: '2', title: 'Basic Addition', duration: '20 min' }
      ],
      questions: [
        { id: '1', question: 'What is 2 + 2?', options: ['3', '4', '5'], correct: 1 }
      ],
      createdAt: '2024-01-15',
      emoji: '🔢',
      titleColor: '#3b82f6',
      backgroundColor: '#f0f9ff',
      animation: 'bounce',
      tags: 'math,basic,'
    },
    {
      id: '2',
      title: 'Science Explorers',
      description: 'Discover the wonders of science through fun experiments and interactive lessons.',
      category: 'Science',
      difficulty: 'Medium',
      duration: '3 weeks',
      lessons: [
        { id: '1', title: 'Water Cycle', duration: '25 min' },
        { id: '2', title: 'Plants and Animals', duration: '30 min' }
      ],
      questions: [
        { id: '1', question: 'What do plants need to grow?', options: ['Water', 'Sunlight', 'Both'], correct: 2 }
      ],
      createdAt: '2024-01-20',
      emoji: '🔬',
      titleColor: '#10b981',
      backgroundColor: '#f0fdf4',
      animation: 'pulse',
      tags: 'science,experiments,nature'
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
    animation: 'bounce',
    tags: ''
  });

  const emojiOptions = ['📚', '🔢', '🔬', '🌍', '🎨', '🎵', '⚽', '🌟', '🚀', '🦋', '🌈', '💎', '🏆', '🎯', '🧩', '🎪'];
  const colorOptions = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316', '#14b8a6'];
  const backgroundOptions = ['#f8fafc', '#fef3c7', '#ecfdf5', '#fef2f2', '#f3e8ff', '#e0f2fe', '#f0f9ff', '#fef7ed', '#f0fdfa'];
  const animationOptions = ['bounce', 'pulse', 'spin', 'ping', 'fade-in', 'scale-in'];

  const validateCourse = (course: Partial<Course>): string[] => {
    const errors: string[] = [];
    if (!course.title?.trim()) errors.push('Title is required');
    if (!course.description?.trim()) errors.push('Description is required');
    if (!course.category?.trim()) errors.push('Category is required');
    if (!course.duration?.trim()) errors.push('Duration is required');
    if (course.title && course.title.length > 100) errors.push('Title must be less than 100 characters');
    if (course.description && course.description.length > 500) errors.push('Description must be less than 500 characters');
    return errors;
  };

  const handleCreateCourse = () => {
    const errors = validateCourse(newCourse);
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    try {
      const course: Course = {
        id: Date.now().toString(),
        title: newCourse.title!,
        description: newCourse.description!,
        category: newCourse.category || 'General',
        difficulty: newCourse.difficulty || 'Easy',
        duration: newCourse.duration || '1 week',
        lessons: newCourse.lessons || [],
        questions: newCourse.questions || [],
        createdAt: new Date().toISOString().split('T')[0],
        emoji: newCourse.emoji || '📚',
        titleColor: newCourse.titleColor || '#6366f1',
        backgroundColor: newCourse.backgroundColor || '#f8fafc',
        animation: newCourse.animation || 'bounce',
        tags: newCourse.tags || ''
      };

      setCourses([...courses, course]);
      toast({
        title: "Success!",
        description: "Course created successfully",
      });
      resetForm();
      setIsCreateMode(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleUpdateCourse = () => {
    if (!selectedCourse) return;
    
    const errors = validateCourse(newCourse);
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(', '),
        variant: "destructive"
      });
      return;
    }

    try {
      const updatedCourse: Course = {
        ...selectedCourse,
        title: newCourse.title!,
        description: newCourse.description!,
        category: newCourse.category || 'General',
        difficulty: newCourse.difficulty || 'Easy',
        duration: newCourse.duration || '1 week',
        emoji: newCourse.emoji || '📚',
        titleColor: newCourse.titleColor || '#6366f1',
        backgroundColor: newCourse.backgroundColor || '#f8fafc',
        animation: newCourse.animation || 'bounce',
        tags: newCourse.tags || ''
      };

      setCourses(courses.map(course => 
        course.id === selectedCourse.id ? updatedCourse : course
      ));
      
      toast({
        title: "Success!",
        description: "Course updated successfully",
      });
      resetForm();
      setIsEditMode(false);
      setSelectedCourse(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update course. Please try again.",
        variant: "destructive"
      });
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
      animation: 'bounce',
      tags: ''
    });
  };

  const handleDeleteCourse = (id: string) => {
    try {
      setCourses(courses.filter(course => course.id !== id));
      toast({
        title: "Success!",
        description: "Course deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete course. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setNewCourse({
      title: course.title,
      description: course.description,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      lessons: course.lessons,
      questions: course.questions,
      emoji: course.emoji,
      titleColor: course.titleColor,
      backgroundColor: course.backgroundColor,
      animation: course.animation,
      tags: course.tags
    });
    setIsEditMode(true);
  };

  const handlePreviewCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsPreviewMode(true);
  };

  const closeAllDialogs = () => {
    setIsCreateMode(false);
    setIsEditMode(false);
    setIsPreviewMode(false);
    setSelectedCourse(null);
    resetForm();
  };

  const courseStats = {
    total: courses.length,
    easy: courses.filter(c => c.difficulty === 'Easy').length,
    medium: courses.filter(c => c.difficulty === 'Medium').length,
    hard: courses.filter(c => c.difficulty === 'Hard').length
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
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span className="flex items-center">
              <BookOpen className="w-4 h-4 mr-1" />
              {courseStats.total} Courses
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {courseStats.easy} Easy • {courseStats.medium} Medium • {courseStats.hard} Hard
            </span>
          </div>
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
        if (!open) closeAllDialogs();
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
                onClick={closeAllDialogs}
                className="font-comic px-6 py-2"
              >
                ❌ Cancel
              </Button>
              
              <Button 
                onClick={isEditMode ? handleUpdateCourse : handleCreateCourse}
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

      {/* Course Preview Dialog */}
      <Dialog open={isPreviewMode} onOpenChange={(open) => {
        if (!open) {
          setIsPreviewMode(false);
          setSelectedCourse(null);
        }
      }}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <DialogHeader>
            <DialogTitle className="font-fredoka text-2xl text-center">
              Course Preview
            </DialogTitle>
          </DialogHeader>
          
          {selectedCourse && (
            <div className="p-6 space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">{selectedCourse.emoji}</div>
                <h2 
                  className="text-3xl font-fredoka font-bold mb-2"
                  style={{ color: selectedCourse.titleColor }}
                >
                  {selectedCourse.title}
                </h2>
                <p className="text-gray-600 font-comic">{selectedCourse.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Category:</strong> {selectedCourse.category}
                </div>
                <div>
                  <strong>Difficulty:</strong> {selectedCourse.difficulty}
                </div>
                <div>
                  <strong>Duration:</strong> {selectedCourse.duration}
                </div>
                <div>
                  <strong>Lessons:</strong> {selectedCourse.lessons.length}
                </div>
              </div>
              
              {selectedCourse.tags && (
                <div>
                  <strong>Tags:</strong> {selectedCourse.tags}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseManager;