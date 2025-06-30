
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { X, BookOpen, Save, Eye, Plus, Trash2 } from 'lucide-react';

interface StoryBuilderProps {
  onClose: () => void;
}

interface StoryPage {
  id: string;
  text: string;
  animation: string;
  backgroundColor: string;
}

const StoryBuilder = ({ onClose }: StoryBuilderProps) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<StoryPage[]>([
    {
      id: '1',
      text: '',
      animation: 'fade-in',
      backgroundColor: 'from-blue-100 to-purple-100'
    }
  ]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const animations = [
    { value: 'fade-in', label: 'Fade In', icon: '✨' },
    { value: 'fly-around', label: 'Fly Around', icon: '🦋' },
    { value: 'shimmer', label: 'Shimmer', icon: '⭐' },
    { value: 'twinkle', label: 'Twinkle', icon: '💫' },
    { value: 'scale-in', label: 'Scale In', icon: '🔍' },
    { value: 'celebration', label: 'Celebration', icon: '🎉' }
  ];

  const backgrounds = [
    { value: 'from-blue-100 to-purple-100', label: 'Blue to Purple', preview: 'bg-gradient-to-br from-blue-100 to-purple-100' },
    { value: 'from-green-100 to-emerald-100', label: 'Green Forest', preview: 'bg-gradient-to-br from-green-100 to-emerald-100' },
    { value: 'from-yellow-100 to-orange-100', label: 'Sunset', preview: 'bg-gradient-to-br from-yellow-100 to-orange-100' },
    { value: 'from-pink-100 to-rose-100', label: 'Pink Rose', preview: 'bg-gradient-to-br from-pink-100 to-rose-100' },
    { value: 'from-purple-100 to-pink-100', label: 'Purple Pink', preview: 'bg-gradient-to-br from-purple-100 to-pink-100' }
  ];

  const currentPage = pages[currentPageIndex];

  const addPage = () => {
    const newPage: StoryPage = {
      id: Date.now().toString(),
      text: '',
      animation: 'fade-in',
      backgroundColor: 'from-blue-100 to-purple-100'
    };
    setPages([...pages, newPage]);
    setCurrentPageIndex(pages.length);
  };

  const deletePage = (index: number) => {
    if (pages.length > 1) {
      const newPages = pages.filter((_, i) => i !== index);
      setPages(newPages);
      if (currentPageIndex >= newPages.length) {
        setCurrentPageIndex(newPages.length - 1);
      }
    }
  };

  const updateCurrentPage = (field: keyof StoryPage, value: string) => {
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = { ...currentPage, [field]: value };
    setPages(updatedPages);
  };

  const saveStory = () => {
    const story = {
      title,
      author,
      pages,
      type: 'story',
      createdAt: new Date().toISOString()
    };
    console.log('Saving story:', story);
    alert('Story saved successfully! 📚');
  };

  const previewStory = () => {
    console.log('Previewing story:', { title, pages });
    alert('Story preview coming soon! 👀');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-6xl h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-3xl">
          <div className="flex justify-between items-center">
            <h2 className="font-fredoka text-3xl gradient-purple bg-clip-text text-transparent">
              📖 Story Builder
            </h2>
            <Button
              onClick={onClose}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="p-6 grid lg:grid-cols-3 gap-6">
          {/* Story Details */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-fredoka text-xl text-gray-800 mb-4">📝 Story Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                    Story Title
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter your story title..."
                    className="font-comic"
                  />
                </div>
                <div>
                  <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                    Author Name
                  </label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your name..."
                    className="font-comic"
                  />
                </div>
              </div>
            </Card>

            {/* Page Navigation */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-fredoka text-xl text-gray-800">📄 Pages ({pages.length})</h3>
                <Button onClick={addPage} size="sm" className="gradient-purple text-white">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Page
                </Button>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {pages.map((page, index) => (
                  <div
                    key={page.id}
                    className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      index === currentPageIndex
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentPageIndex(index)}
                  >
                    <div className="flex items-center space-x-2">
                      <div className="font-comic font-bold text-sm text-gray-700">
                        Page {index + 1}
                      </div>
                      {page.text && (
                        <Badge variant="outline" className="font-comic text-xs">
                          {page.text.slice(0, 20)}...
                        </Badge>
                      )}
                    </div>
                    {pages.length > 1 && (
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePage(index);
                        }}
                        size="sm"
                        variant="ghost"
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Page Editor */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-fredoka text-xl text-gray-800 mb-4">
                ✏️ Edit Page {currentPageIndex + 1}
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                    Page Text
                  </label>
                  <Textarea
                    value={currentPage.text}
                    onChange={(e) => updateCurrentPage('text', e.target.value)}
                    placeholder="Write your story text here..."
                    className="font-comic min-h-32"
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                      Animation
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {animations.map((animation) => (
                        <button
                          key={animation.value}
                          onClick={() => updateCurrentPage('animation', animation.value)}
                          className={`p-3 rounded-lg border-2 font-comic text-sm transition-all ${
                            currentPage.animation === animation.value
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="text-lg mb-1">{animation.icon}</div>
                          {animation.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="space-y-2">
                      {backgrounds.map((bg) => (
                        <button
                          key={bg.value}
                          onClick={() => updateCurrentPage('backgroundColor', bg.value)}
                          className={`w-full p-3 rounded-lg border-2 font-comic text-sm transition-all flex items-center space-x-3 ${
                            currentPage.backgroundColor === bg.value
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded ${bg.preview}`}></div>
                          <span>{bg.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Page Preview */}
                <div>
                  <label className="block font-comic font-bold text-sm text-gray-700 mb-2">
                    Page Preview
                  </label>
                  <div className={`w-full h-40 bg-gradient-to-br ${currentPage.backgroundColor} rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center p-4`}>
                    <div className="text-center">
                      {currentPage.text ? (
                        <p className="font-comic text-gray-700 text-sm">
                          {currentPage.text}
                        </p>
                      ) : (
                        <p className="font-comic text-gray-400 text-sm italic">
                          Enter text to see preview...
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <Button
                onClick={previewStory}
                className="gradient-blue text-white font-comic font-bold"
                disabled={!title || pages.some(p => !p.text)}
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview Story
              </Button>
              <Button
                onClick={saveStory}
                className="gradient-green text-white font-comic font-bold"
                disabled={!title || pages.some(p => !p.text)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryBuilder;
