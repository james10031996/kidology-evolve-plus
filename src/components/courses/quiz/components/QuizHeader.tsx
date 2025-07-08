
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface QuizHeaderProps {
  title: string;
  subject: string;
  onClose: () => void;
}

const QuizHeader = ({ title, subject, onClose }: QuizHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="font-fredoka text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {title} ✨
        </h2>
        <p className="font-comic text-gray-600 text-lg">{subject} Quiz Adventure! 🎮</p>
      </div>
      <Button
        onClick={onClose}
        className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 shadow-lg"
        size="sm"
      >
        <X className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default QuizHeader;
