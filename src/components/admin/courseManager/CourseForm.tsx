
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookOpen, Palette, Clock, Tag, Image, FileText } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface CourseFormProps {
  course: any;
  setCourse: (course: any) => void;
  emojiOptions: string[];
  colorOptions: string[];
  backgroundOptions: string[];
  animationOptions: string[];
}

const CourseForm = ({ 
  course, 
  setCourse, 
  emojiOptions, 
  colorOptions, 
  backgroundOptions, 
  animationOptions 
}: CourseFormProps) => {
  const handleInputChange = (field: string, value: string) => {
    setCourse({ ...course, [field]: value });
  };

  return (
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
              <Label className="font-comic font-bold text-gray-800">📝 Course Title *</Label>
              <Input
                value={course.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter an exciting course title..."
                className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                {course.title?.length || 0}/100 characters
              </p>
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">📖 Description *</Label>
              <Textarea
                value={course.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what students will learn..."
                rows={4}
                className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 mt-1">
                {course.description?.length || 0}/500 characters
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-comic font-bold text-gray-800">📂 Category *</Label>
                <Select 
                  value={course.category || ''} 
                  onValueChange={(value) => handleInputChange('category', value)}
                >
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
                    <SelectItem value="Technology">💻 Technology</SelectItem>
                    <SelectItem value="Languages">🗣️ Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-comic font-bold text-gray-800">🎯 Difficulty</Label>
                <Select 
                  value={course.difficulty || 'Easy'} 
                  onValueChange={(value) => handleInputChange('difficulty', value)}
                >
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
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-comic font-bold text-gray-800 flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Duration *
                </Label>
                <Input
                  value={course.duration || ''}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 2 weeks, 1 month..."
                  className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                />
              </div>
              
              <div>
                <Label className="font-comic font-bold text-gray-800 flex items-center">
                  <Tag className="w-4 h-4 mr-1" />
                  Tags
                </Label>
                <Input
                  value={course.tags || ''}
                  onChange={(e) => handleInputChange('tags', e.target.value)}
                  placeholder="math,basic,fun (comma-separated)"
                  className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate tags with commas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-2xl border border-green-200">
          <h3 className="font-fredoka text-xl text-green-700 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Course Content
          </h3>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {course.lessons?.length || 0}
                </div>
                <div className="text-sm text-gray-600 font-comic">Lessons</div>
              </Card>
              
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {course.questions?.length || 0}
                </div>
                <div className="text-sm text-gray-600 font-comic">Questions</div>
              </Card>
            </div>
            
            <p className="text-sm text-gray-600 font-comic">
              Content will be added after creating the course
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Visual Customization */}
      <div className="space-y-6">
        <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-6 rounded-2xl border border-pink-200">
          <h3 className="font-fredoka text-xl text-orange-700 mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2" />
            Visual Customization
          </h3>
          
          <div className="space-y-6">
            <div>
              <Label className="font-comic font-bold text-gray-800">😀 Course Emoji</Label>
              <div className="grid grid-cols-8 gap-2 mt-2">
                {emojiOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => handleInputChange('emoji', emoji)}
                    className={`text-2xl p-2 rounded-lg border-2 hover:scale-110 transition-all ${
                      course.emoji === emoji ? 'border-purple-400 bg-purple-100' : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">🎨 Title Color</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('titleColor', color)}
                    className={`w-10 h-10 rounded-full border-2 hover:scale-110 transition-all ${
                      course.titleColor === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">🌈 Background Color</Label>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {backgroundOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => handleInputChange('backgroundColor', color)}
                    className={`w-10 h-10 rounded-lg border-2 hover:scale-110 transition-all ${
                      course.backgroundColor === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">✨ Animation</Label>
              <Select 
                value={course.animation || 'bounce'} 
                onValueChange={(value) => handleInputChange('animation', value)}
              >
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

        {/* Live Preview */}
        <div className="bg-gradient-to-br from-yellow-50 to-red-50 p-6 rounded-2xl border border-yellow-200">
          <h3 className="font-fredoka text-xl text-red-700 mb-4 flex items-center">
            <Image className="w-5 h-5 mr-2" />
            Live Preview
          </h3>
          
          <Card 
            className="p-4 border-2 transition-all duration-300"
            style={{ backgroundColor: course.backgroundColor || '#f8fafc' }}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-400 ${
                course.animation === 'bounce' ? 'animate-bounce' :
                course.animation === 'pulse' ? 'animate-pulse' :
                course.animation === 'spin' ? 'animate-spin' :
                course.animation === 'ping' ? 'animate-ping' : ''
              }`}>
                <span className="text-lg">{course.emoji || '📚'}</span>
              </div>
              <div>
                <h4 
                  className="font-fredoka font-bold text-sm"
                  style={{ color: course.titleColor || '#1f2937' }}
                >
                  {course.title || 'Course Title'}
                </h4>
                <p className="text-xs text-gray-500">
                  {course.category || 'Category'}
                </p>
              </div>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">
              {course.description || 'Course description will appear here...'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseForm;