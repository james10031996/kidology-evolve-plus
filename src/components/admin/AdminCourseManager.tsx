
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, BookOpen, Star, Clock, Palette, Type, Sparkles } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import AdminQuizManager from './AdminQuizManager';

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  lessons: Lesson[];
  questions: Question[];
  createdAt: string;
  tags?: string;
  image?: string;
  emoji?: string;
  titleColor?: string;
  backgroundColor?: string;
  animation?: string;
}

interface Lesson {
  id: string;
  title: string;
  content: string;
  animation: string;
  backgroundColor: string;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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
      setIsCreateMode(false);
    }
  };

  const handleDeleteCourse = (id: string) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const saveDraft = (course: any) => {
    console.log('Saving draft:', course);
  };

  const triggerConfetti = () => {
    import('canvas-confetti').then(confetti => {
      confetti.default({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    });
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
              <Card key={course.id} className="p-6 border-green-200 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 font-fredoka text-lg">
                        {course.title}
                      </h4>
                      <p className="text-sm text-gray-500 font-comic">
                        {course.category}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleDeleteCourse(course.id)}
                    size="sm"
                    variant="destructive"
                    className="opacity-70 hover:opacity-100"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>

                <p className="text-gray-600 font-comic text-sm mb-4">
                  {course.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Difficulty:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(course.difficulty)}`}>
                      {course.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Duration:</span>
                    <span className="font-bold text-gray-700">{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Lessons:</span>
                    <span className="font-bold text-green-600">{course.lessons.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 font-comic">Questions:</span>
                    <span className="font-bold text-blue-600">{course.questions.length}</span>
                  </div>
                </div>

                <div className="flex justify-between mt-6 pt-4 border-t border-green-100">
                  <Button size="sm" variant="outline" className="text-xs border-green-200">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" className="gradient-green text-white text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                </div>
              </Card>
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

      {/* Enhanced Course Creation Dialog */}
      <Dialog open={isCreateMode} onOpenChange={setIsCreateMode}>
        <DialogContent className="bg-gradient-to-br from-white via-purple-50 to-pink-50 max-w-5xl max-h-[90vh] overflow-y-auto border border-purple-200 rounded-xl shadow-xl p-6 transition-all duration-500">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl">
            <DialogHeader>
              <DialogTitle className="font-fredoka text-3xl text-white text-center mb-2">
                🎨 Create Amazing Course
              </DialogTitle>
              <DialogDescription className="text-purple-100 text-center font-comic">
                Design a beautiful and engaging course with custom styling!
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="p-8 bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Course Details */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-200">
                  <h3 className="font-fredoka text-xl text-purple-700 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2" />
                    Course Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="font-comic font-bold text-gray-800">📝 Course Title</Label>
                      <Input
                        value={newCourse.title}
                        onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                        placeholder="Enter an exciting course title..."
                        className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                      />
                    </div>
                    
                    <div>
                      <Label className="font-comic font-bold text-gray-800">📖 Description</Label>
                      <Textarea
                        value={newCourse.description}
                        onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                        placeholder="Describe what students will learn..."
                        rows={3}
                        className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-comic font-bold text-gray-800">📂 Category</Label>
                        <Select onValueChange={(value) => setNewCourse({ ...newCourse, category: value })}>
                          <SelectTrigger className="font-comic bg-white border-2 border-purple-200">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Mathematics">📊 Mathematics</SelectItem>
                            <SelectItem value="English">📚 English</SelectItem>
                            <SelectItem value="Science">🔬 Science</SelectItem>
                            <SelectItem value="Art">🎨 Art & Creativity</SelectItem>
                            <SelectItem value="Geography">🌍 Geography</SelectItem>
                            <SelectItem value="History">🏛️ History</SelectItem>
                            <SelectItem value="Music">🎵 Music</SelectItem>
                            <SelectItem value="Sports">⚽ Sports</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="font-comic font-bold text-gray-800">🎯 Difficulty</Label>
                        <Select onValueChange={(value) => setNewCourse({ ...newCourse, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}>
                          <SelectTrigger className="font-comic bg-white border-2 border-purple-200">
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Easy">🟢 Easy</SelectItem>
                            <SelectItem value="Medium">🟡 Medium</SelectItem>
                            <SelectItem value="Hard">🔴 Hard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-comic font-bold text-gray-800">⏱️ Duration</Label>
                      <Input
                        value={newCourse.duration}
                        onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                        placeholder="e.g., 2 weeks, 1 month..."
                        className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Visual Customization Section */}
                <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-2xl border border-pink-200">
                  <h3 className="font-fredoka text-xl text-orange-700 mb-4 flex items-center">
                    <Palette className="w-5 h-5 mr-2" />
                    Visual Customization
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label className="font-comic font-bold text-gray-800">😀 Course Emoji</Label>
                      <div className="grid grid-cols-6 gap-2 mt-2">
                        {emojiOptions.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setNewCourse({ ...newCourse, emoji })}
                            className={`text-2xl p-2 rounded-lg border-2 hover:scale-110 transition-all ${
                              newCourse.emoji === emoji ? 'border-purple-400 bg-purple-100' : 'border-gray-200 hover:border-purple-300'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-comic font-bold text-gray-800">🎨 Title Color</Label>
                      <div className="grid grid-cols-8 gap-2 mt-2">
                        {colorOptions.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setNewCourse({ ...newCourse, titleColor: color })}
                            className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-all ${
                              newCourse.titleColor === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-comic font-bold text-gray-800">🌈 Background Color</Label>
                      <div className="grid grid-cols-7 gap-2 mt-2">
                        {backgroundOptions.map((color) => (
                          <button
                            key={color}
                            type="button"
                            onClick={() => setNewCourse({ ...newCourse, backgroundColor: color })}
                            className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-all ${
                              newCourse.backgroundColor === color ? 'border-gray-800' : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <Label className="font-comic font-bold text-gray-800">✨ Animation</Label>
                      <Select onValueChange={(value) => setNewCourse({ ...newCourse, animation: value })}>
                        <SelectTrigger className="font-comic bg-white border-2 border-pink-200">
                          <SelectValue placeholder="Select animation" />
                        </SelectTrigger>
                        <SelectContent className='font-comic bg-white/90 border-2 border-pink-200'>
                          {animationOptions.map((anim) => (
                            <SelectItem key={anim} value={anim}>
                              <span className="capitalize">{anim.replace('-', ' ')}</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preview */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200 sticky top-0">
                  <h3 className="font-fredoka text-xl text-green-700 mb-4 flex items-center">
                    <Eye className="w-5 h-5 mr-2" />
                    Live Preview
                  </h3>
                  
                  <Card 
                    className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                    style={{ backgroundColor: newCourse.backgroundColor }}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`text-4xl animate-${newCourse.animation}`}>
                            {newCourse.emoji}
                          </div>
                          <div>
                            <h4 
                              className="font-fredoka text-xl font-bold"
                              style={{ color: newCourse.titleColor }}
                            >
                              {newCourse.title || 'Course Title'}
                            </h4>
                            <p className="text-sm text-gray-600 font-comic">
                              {newCourse.category || 'Category'}
                            </p>
                          </div>
                        </div>
                        <Badge className={`${getDifficultyColor(newCourse.difficulty || 'Easy')}`}>
                          {newCourse.difficulty || 'Easy'}
                        </Badge>
                      </div>
                      
                      <p className="text-gray-700 font-comic text-sm mb-4">
                        {newCourse.description || 'Course description will appear here...'}
                      </p>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-comic text-gray-600">
                          Duration: {newCourse.duration || 'Not set'}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-comic font-bold text-yellow-600">4.8</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => setIsCreateMode(false)} 
                className="font-comic px-6 py-2"
              >
                ❌ Cancel
              </Button>
              
              <div className="flex gap-3">
                <Button 
                  variant="ghost" 
                  onClick={() => saveDraft(newCourse)}
                  className="font-comic text-purple-600 border border-purple-200 hover:bg-purple-50"
                >
                  💾 Save Draft
                </Button>
                
                <Button 
                  onClick={() => {
                    handleCreateCourse();
                    triggerConfetti();
                  }} 
                  className="gradient-green text-white font-comic px-8 py-2 hover:scale-105 transition-transform"
                  disabled={!newCourse.title || !newCourse.description}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Course
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCourseManager;