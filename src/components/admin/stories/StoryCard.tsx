
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Trash2, Edit, Eye } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  type: 'poem' | 'story';
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
  author?: string;
  createdBy?: string;
  createdAt: string;
}

interface StoryCardProps {
  story: Story;
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
  onPreview: (story: Story) => void;
}

const StoryCard = ({ story, onEdit, onDelete, onPreview }: StoryCardProps) => {
  return (
    <Card className="p-4 border-purple-200 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800 font-comic text-sm">
              {story.title}
            </h4>
            <p className="text-xs text-gray-500 font-comic">
              {story.type === 'story' ? '📖 Story' : '🎭 Poem'}
            </p>
          </div>
        </div>
        <Button
          onClick={() => onDelete(story.id)}
          size="sm"
          variant="destructive"
          className="opacity-70 hover:opacity-100"
        >
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600 font-comic">Author:</span>
          <span className="font-bold text-gray-700">{story.author || 'Anonymous'}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-comic">Pages:</span>
          <span className="font-bold text-purple-600">{story.pages.length}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 font-comic">Created:</span>
          <span className="font-bold text-gray-700">{story.createdAt}</span>
        </div>
      </div>

      <div className="flex justify-between mt-4 pt-3 border-t border-purple-100">
        <Button 
          size="sm" 
          variant="outline" 
          className="text-xs border-purple-200"
          onClick={() => onEdit(story)}
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit
        </Button>
        <Button
          size="sm"
          className="gradient-purple text-white text-xs"
          onClick={() => onPreview(story)}
        >
          <Eye className="w-3 h-3 mr-1" />
          Preview
        </Button>
      </div>
    </Card>
  );
};

export default StoryCard;
