import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Save, X } from 'lucide-react';

interface Page {
  text: string;
  animation: string;
  backgroundColor: string;
}

interface AdminAddContentProps {
  onAdd: (content: {
    title: string;
    type: 'poem' | 'story';
    pages: Page[];
    author?: string;
    createdBy?: string;
  }) => void;
  editingContent?: {
    id: string;
    title: string;
    type: 'poem' | 'story';
    pages: Page[];
    author?: string;
    createdBy?: string;
  } | null;
  onCancel?: () => void;
}

const AdminAddContent = ({ onAdd, editingContent, onCancel }: AdminAddContentProps) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'poem' | 'story'>('story');
  const [author, setAuthor] = useState('');
  const [pages, setPages] = useState<Page[]>([
    {
      text: '',
      animation: 'fade-in',
      backgroundColor: 'from-blue-100 to-purple-100'
    }
  ]);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingContent) {
      setTitle(editingContent.title);
      setType(editingContent.type);
      setAuthor(editingContent.author || '');
      setPages(editingContent.pages);
    } else {
      // Reset form when not editing
      setTitle('');
      setType('story');
      setAuthor('');
      setPages([{
        text: '',
        animation: 'fade-in',
        backgroundColor: 'from-blue-100 to-purple-100'
      }]);
    }
  }, [editingContent]);

  const animations = [
    { value: 'fade-in', label: 'Fade In' },
    { value: 'fly-around', label: 'Fly Around' },
    { value: 'shimmer', label: 'Shimmer' },
    { value: 'twinkle', label: 'Twinkle' },
    { value: 'scale-in', label: 'Scale In' },
    { value: 'celebration', label: 'Celebration' }
  ];

  const backgrounds = [
    { value: 'from-blue-100 to-purple-100', label: 'Blue to Purple' },
    { value: 'from-green-100 to-emerald-100', label: 'Green Forest' },
    { value: 'from-yellow-100 to-orange-100', label: 'Sunset' },
    { value: 'from-pink-100 to-rose-100', label: 'Pink Rose' },
    { value: 'from-purple-100 to-pink-100', label: 'Purple Pink' }
  ];

  const addPage = () => {
    setPages([...pages, {
      text: '',
      animation: 'fade-in',
      backgroundColor: 'from-blue-100 to-purple-100'
    }]);
  };

  const removePage = (index: number) => {
    if (pages.length > 1) {
      setPages(pages.filter((_, i) => i !== index));
    }
  };

  const updatePage = (index: number, field: keyof Page, value: string) => {
    const updatedPages = [...pages];
    updatedPages[index] = { ...updatedPages[index], [field]: value };
    setPages(updatedPages);
  };

  const handleSubmit = () => {
    if (!title.trim() || pages.some(page => !page.text.trim())) {
      alert('Please fill in all required fields');
      return;
    }

    onAdd({
      title: title.trim(),
      type,
      pages: pages.filter(page => page.text.trim()),
      author: author.trim() || undefined,
      createdBy: 'admin@example.com'
    });

    if (!editingContent) {
      // Reset form only when adding new content
      setTitle('');
      setAuthor('');
      setPages([{
        text: '',
        animation: 'fade-in',
        backgroundColor: 'from-blue-100 to-purple-100'
      }]);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-fredoka text-2xl text-purple-700">
          {editingContent ? '✏️ Edit Content' : '✨ Add New Content'}
        </h3>
        {editingContent && onCancel && (
          <Button onClick={onCancel} variant="ghost" size="sm">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
        )}
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
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-comic font-bold text-lg text-gray-800">📄 Pages ({pages.length})</h4>
          <Button onClick={addPage} size="sm" className="gradient-purple text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Page
          </Button>
        </div>

        <div className="space-y-4">
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
                    className="mt-2"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove Page
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1 font-comic">
                    Text *
                  </label>
                  <Textarea
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
                    <Select
                      value={page.animation}
                      onChange={(e) => updatePage(index, 'animation', e.target.value)}
                      className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none text-sm"
                    >
                      {animations.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1 font-comic">
                      Background
                    </label>
                    <Select
                      value={page.backgroundColor}
                      onChange={(e) => updatePage(index, 'backgroundColor', e.target.value)}
                      className="w-full p-2 border border-purple-200 rounded-md focus:border-purple-400 focus:outline-none text-sm"
                    >
                      {backgrounds.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>

                <div className={`p-3 rounded-lg bg-gradient-to-r ${page.backgroundColor} text-center`}>
                  <p className="text-sm text-gray-700 font-comic">Preview Background</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex justify-center pt-6">
        <Button
          onClick={handleSubmit}
          className="gradient-purple text-white font-comic font-bold px-8"
          disabled={!title.trim() || pages.some(page => !page.text.trim())}
        >
          <Save className="w-4 h-4 mr-2" />
          {editingContent ? 'Update Content' : 'Save Content'}
        </Button>
      </div>
    </div>
  );
};

export default AdminAddContent;
