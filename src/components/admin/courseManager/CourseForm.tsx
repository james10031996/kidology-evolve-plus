
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BookOpen, Palette } from 'lucide-react';

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
              <Label className="font-comic font-bold text-gray-800">📝 Course Title</Label>
              <Input
                value={course.title}
                onChange={(e) => setCourse({ ...course, title: e.target.value })}
                placeholder="Enter an exciting course title..."
                className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
              />
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">📖 Description</Label>
              <Textarea
                value={course.description}
                onChange={(e) => setCourse({ ...course, description: e.target.value })}
                placeholder="Describe what students will learn..."
                rows={3}
                className="font-comic bg-white border-2 border-purple-200 focus:border-purple-400"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="font-comic font-bold text-gray-800">📂 Category</Label>
                <Select onValueChange={(value) => setCourse({ ...course, category: value })}>
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
                <Select onValueChange={(value) => setCourse({ ...course, difficulty: value as 'Easy' | 'Medium' | 'Hard' })}>
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
                value={course.duration}
                onChange={(e) => setCourse({ ...course, duration: e.target.value })}
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
                    onClick={() => setCourse({ ...course, emoji })}
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
              <div className="grid grid-cols-8 gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setCourse({ ...course, titleColor: color })}
                    className={`w-8 h-8 rounded-full border-2 hover:scale-110 transition-all ${
                      course.titleColor === color ? 'border-gray-800' : 'border-gray-300'
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
                    onClick={() => setCourse({ ...course, backgroundColor: color })}
                    className={`w-8 h-8 rounded-lg border-2 hover:scale-110 transition-all ${
                      course.backgroundColor === color ? 'border-gray-800' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label className="font-comic font-bold text-gray-800">✨ Animation</Label>
              <Select onValueChange={(value) => setCourse({ ...course, animation: value })}>
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
    </div>
  );
};

export default CourseForm;
