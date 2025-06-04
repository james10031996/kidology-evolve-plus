
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Plus, Trash2, Save } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface AdminAddContentProps {
  onAdd: (content: {
    title: string;
    type: 'poem' | 'story';
    pages: {
      text: string;
      animation: string;
      backgroundColor: string;
    }[];
    author?: string;
    createdBy?: string;
  }) => void;
}

interface PageData {
  text: string;
  animation: string;
  backgroundColor: string;
}

const AdminAddContent = ({ onAdd }: AdminAddContentProps) => {
  const form = useForm();
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'poem' | 'story'>('story');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<PageData[]>([
    { text: '', animation: 'gentle-bounce', backgroundColor: 'from-blue-100 to-purple-100' }
  ]);

  const animationOptions = [
    { value: 'fly-around', label: '🦋 Flying Around' },
    { value: 'shimmer', label: '✨ Shimmer' },
    { value: 'gentle-bounce', label: '🌸 Gentle Bounce' },
    { value: 'twinkle', label: '⭐ Twinkle' },
    { value: 'shooting-star', label: '💫 Shooting Star' },
    { value: 'celebration', label: '🎉 Celebration' },
    { value: 'rainbow-appear', label: '🌈 Rainbow' },
    { value: 'color-wave', label: '🎨 Color Wave' },
    { value: 'tree-sway', label: '🌳 Tree Sway' },
    { value: 'heart-pulse', label: '💚 Heart Pulse' }
  ];

  const backgroundOptions = [
    { value: 'from-blue-100 to-purple-100', label: '💙 Blue to Purple' },
    { value: 'from-pink-100 to-rose-100', label: '💗 Pink to Rose' },
    { value: 'from-green-100 to-emerald-100', label: '💚 Green to Emerald' },
    { value: 'from-yellow-100 to-orange-100', label: '💛 Yellow to Orange' },
    { value: 'from-purple-100 to-pink-100', label: '💜 Purple to Pink' },
    { value: 'from-cyan-100 to-blue-100', label: '💙 Cyan to Blue' },
    { value: 'from-red-100 to-pink-100', label: '❤️ Red to Pink' },
    { value: 'from-indigo-100 to-purple-100', label: '💙 Indigo to Purple' }
  ];

  const addPage = () => {
    setPages([...pages, { text: '', animation: 'gentle-bounce', backgroundColor: 'from-blue-100 to-purple-100' }]);
  };

  const removePage = (index: number) => {
    if (pages.length > 1) {
      setPages(pages.filter((_, i) => i !== index));
    }
  };

  const updatePage = (index: number, field: keyof PageData, value: string) => {
    const updatedPages = [...pages];
    updatedPages[index] = { ...updatedPages[index], [field]: value };
    setPages(updatedPages);
  };

  const handleSubmit = () => {
    if (title && pages.every(page => page.text.trim())) {
      const userEmail = localStorage.getItem('userEmail') || 'anonymous@example.com';
      
      onAdd({
        title,
        type,
        pages,
        author,
        createdBy: userEmail
      });

      // Reset form
      setTitle('');
      setType('story');
      setAuthor('');
      setPages([{ text: '', animation: 'gentle-bounce', backgroundColor: 'from-blue-100 to-purple-100' }]);
    }
  };

  return (
    <div className="space-y-6 max-h-[80vh] overflow-y-auto p-4">
      <div className="text-center">
        <h3 className="text-2xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-2">
          ✨ Create New Content
        </h3>
        <p className="text-gray-600 font-comic">
          Add your own magical poems and stories!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-comic">
            Title *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            className="border-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 font-comic">
            Type *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'poem' | 'story')}
            className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none"
          >
            <option value="story">📖 Story</option>
            <option value="poem">🎭 Poem</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2 font-comic">
          Author (Optional)
        </label>
        <Input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author name..."
          className="border-purple-200 focus:border-purple-400"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-fredoka font-bold text-gray-800">
            📄 Pages ({pages.length})
          </h4>
          <Button onClick={addPage} size="sm" className="gradient-green text-white">
            <Plus className="w-4 h-4 mr-1" />
            Add Page
          </Button>
        </div>

        {pages.map((page, index) => (
          <Card key={index} className="p-4 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-bold text-gray-700 font-comic">
                Page {index + 1}
              </h5>
              {pages.length > 1 && (
                <Button
                  onClick={() => removePage(index)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1 font-comic">
                  Text *
                </label>
                <textarea
                  value={page.text}
                  onChange={(e) => updatePage(index, 'text', e.target.value)}
                  placeholder="Enter page content..."
                  rows={3}
                  className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 font-comic">
                    Animation
                  </label>
                  <select
                    value={page.animation}
                    onChange={(e) => updatePage(index, 'animation', e.target.value)}
                    className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none text-sm"
                  >
                    {animationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 font-comic">
                    Background
                  </label>
                  <select
                    value={page.backgroundColor}
                    onChange={(e) => updatePage(index, 'backgroundColor', e.target.value)}
                    className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none text-sm"
                  >
                    {backgroundOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={`p-3 rounded-lg bg-gradient-to-r ${page.backgroundColor} text-center`}>
                <p className="text-sm text-gray-700 font-comic">Preview Background</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-purple-200">
        <Button
          onClick={handleSubmit}
          disabled={!title || pages.some(page => !page.text.trim())}
          className="gradient-purple text-white hover:opacity-90"
        >
          <Save className="w-4 h-4 mr-2" />
          Save Content
        </Button>
      </div>
    </div>
  );
};

export default AdminAddContent;
