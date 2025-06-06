
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Trash2, Eye, BookOpen, Star, Clock } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    questions: []
  });

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
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, course]);
      setNewCourse({
        title: '',
        description: '',
        category: '',
        difficulty: 'Easy',
        duration: '',
        lessons: [],
        questions: []
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-fredoka font-bold gradient-green bg-clip-text text-transparent mb-2">
            🎓 Course Management
          </h2>
          <p className="text-gray-600 font-comic">
            Create and manage educational courses with interactive content
          </p>
        </div>
        
        <Dialog open={isCreateMode} onOpenChange={setIsCreateMode}>
          <DialogTrigger asChild>
            <Button className="gradient-green text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-fredoka text-2xl">Create New Course</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="title" className="font-comic font-bold">Course Title</Label>
                <Input
                  id="title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                  placeholder="Enter course title..."
                  className="font-comic"
                />
              </div>
              
              <div>
                <Label htmlFor="description" className="font-comic font-bold">Description</Label>
                <Textarea
                  id="description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                  placeholder="Describe the course..."
                  className="font-comic"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category" className="font-comic font-bold">Category</Label>
                  <Select onValueChange={(value) => setNewCourse({...newCourse, category: value})}>
                    <SelectTrigger className="font-comic">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Art">Art & Creativity</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="difficulty" className="font-comic font-bold">Difficulty</Label>
                  <Select onValueChange={(value) => setNewCourse({...newCourse, difficulty: value as any})}>
                    <SelectTrigger className="font-comic">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="duration" className="font-comic font-bold">Duration</Label>
                <Input
                  id="duration"
                  value={newCourse.duration}
                  onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})}
                  placeholder="e.g., 2 weeks, 1 month..."
                  className="font-comic"
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsCreateMode(false)}
                  className="font-comic"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreateCourse}
                  className="gradient-green text-white font-comic"
                >
                  Create Course
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
    </div>
  );
};

export default AdminCourseManager;
