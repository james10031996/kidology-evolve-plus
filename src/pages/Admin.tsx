
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Save, Trash, Edit, BookOpen, Users, Settings } from 'lucide-react';
import Header from '@/components/Header';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Course {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  duration: string;
  lessons: number;
  emoji: string;
  image: string;
  tags: string[];
  createdAt: string;
}

const Admin = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category: '',
    difficulty: 'Beginner',
    duration: '',
    lessons: 1,
    emoji: '📚',
    image: '',
    tags: ''
  });

  const categories = ['Mathematics', 'English', 'Science', 'Art', 'Music', 'History', 'Geography'];
  const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
  const emojiOptions = ['📚', '🔢', '📝', '🔬', '🎨', '🎵', '🌍', '⭐', '🎯', '🚀', '🦄', '🌟'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const course: Course = {
      id: editingCourse?.id || Date.now().toString(),
      title: formData.title,
      description: formData.description,
      content: formData.content,
      category: formData.category,
      difficulty: formData.difficulty,
      duration: formData.duration,
      lessons: formData.lessons,
      emoji: formData.emoji,
      image: formData.image,
      tags: formData.tags.split(',').map(tag => tag.trim()),
      createdAt: editingCourse?.createdAt || new Date().toISOString()
    };

    if (editingCourse) {
      setCourses(prev => prev.map(c => c.id === editingCourse.id ? course : c));
    } else {
      setCourses(prev => [...prev, course]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      content: '',
      category: '',
      difficulty: 'Beginner',
      duration: '',
      lessons: 1,
      emoji: '📚',
      image: '',
      tags: ''
    });
    setEditingCourse(null);
  };

  const editCourse = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      content: course.content,
      category: course.category,
      difficulty: course.difficulty,
      duration: course.duration,
      lessons: course.lessons,
      emoji: course.emoji,
      image: course.image,
      tags: course.tags.join(', ')
    });
    setEditingCourse(course);
  };

  const deleteCourse = (courseId: string) => {
    setCourses(prev => prev.filter(c => c.id !== courseId));
  };

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['blockquote', 'code-block'],
      ['link', 'image'],
      ['clean']
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            ⚙️ Admin Dashboard
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Manage courses, content, and platform settings
          </p>
        </div>

        <Tabs defaultValue="courses" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="courses" className="rounded-full font-comic font-bold">
              📚 Courses
            </TabsTrigger>
            <TabsTrigger value="users" className="rounded-full font-comic font-bold">
              👥 Users
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full font-comic font-bold">
              ⚙️ Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Course Form */}
              <Card className="p-6 bg-white rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-fredoka font-bold text-2xl text-gray-800">
                    {editingCourse ? 'Edit Course' : 'Create New Course'}
                  </h2>
                  {editingCourse && (
                    <Button onClick={resetForm} variant="outline" size="sm">
                      Cancel
                    </Button>
                  )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="font-comic font-bold">Course Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Enter course title"
                        required
                        className="font-comic"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emoji" className="font-comic font-bold">Emoji</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {emojiOptions.map((emoji) => (
                          <button
                            key={emoji}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                            className={`w-10 h-10 text-xl rounded-lg border-2 transition-all ${
                              formData.emoji === emoji 
                                ? 'border-blue-500 bg-blue-50' 
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description" className="font-comic font-bold">Description</Label>
                    <Input
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Brief course description"
                      required
                      className="font-comic"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="category" className="font-comic font-bold">Category</Label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg font-comic"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="difficulty" className="font-comic font-bold">Difficulty</Label>
                      <select
                        id="difficulty"
                        value={formData.difficulty}
                        onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
                        className="w-full p-2 border border-gray-300 rounded-lg font-comic"
                      >
                        {difficulties.map((diff) => (
                          <option key={diff} value={diff}>{diff}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="lessons" className="font-comic font-bold">Lessons</Label>
                      <Input
                        id="lessons"
                        type="number"
                        min="1"
                        value={formData.lessons}
                        onChange={(e) => setFormData(prev => ({ ...prev, lessons: parseInt(e.target.value) }))}
                        className="font-comic"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="duration" className="font-comic font-bold">Duration</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="e.g., 45 min"
                        required
                        className="font-comic"
                      />
                    </div>
                    <div>
                      <Label htmlFor="tags" className="font-comic font-bold">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="math, counting, numbers"
                        className="font-comic"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="image" className="font-comic font-bold">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      placeholder="https://example.com/image.jpg"
                      className="font-comic"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="font-comic font-bold">Course Content</Label>
                    <div className="mt-2">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        modules={modules}
                        placeholder="Write your course content here..."
                        style={{ height: '200px', marginBottom: '50px' }}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full gradient-blue text-white font-comic font-bold">
                    <Save className="w-4 h-4 mr-2" />
                    {editingCourse ? 'Update Course' : 'Create Course'}
                  </Button>
                </form>
              </Card>

              {/* Course List */}
              <Card className="p-6 bg-white rounded-2xl shadow-lg">
                <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-6">
                  Existing Courses ({courses.length})
                </h2>
                
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {courses.length === 0 ? (
                    <div className="text-center py-8">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="font-comic text-gray-500">No courses created yet</p>
                    </div>
                  ) : (
                    courses.map((course) => (
                      <div key={course.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{course.emoji}</span>
                            <div>
                              <h3 className="font-comic font-bold text-gray-800">{course.title}</h3>
                              <p className="font-comic text-sm text-gray-600">{course.description}</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => editCourse(course)}
                              size="sm"
                              variant="outline"
                              className="font-comic"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              onClick={() => deleteCourse(course.id)}
                              size="sm"
                              variant="outline"
                              className="font-comic text-red-600 border-red-200 hover:bg-red-50"
                            >
                              <Trash className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="outline" className="font-comic text-xs">
                            {course.category}
                          </Badge>
                          <Badge variant="outline" className="font-comic text-xs">
                            {course.difficulty}
                          </Badge>
                          <Badge variant="outline" className="font-comic text-xs">
                            {course.lessons} lessons
                          </Badge>
                        </div>
                        
                        {course.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {course.tags.map((tag, index) => (
                              <Badge key={index} className="bg-gray-100 text-gray-600 text-xs font-comic">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">User Management</h2>
              <p className="font-comic text-gray-600 mb-6">
                User management features will be available in the next update.
              </p>
              <Button className="gradient-blue text-white font-comic font-bold">
                Coming Soon
              </Button>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-white rounded-2xl shadow-lg text-center">
              <Settings className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">Platform Settings</h2>
              <p className="font-comic text-gray-600 mb-6">
                Platform configuration and settings will be available soon.
              </p>
              <Button className="gradient-purple text-white font-comic font-bold">
                Coming Soon
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
