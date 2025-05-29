
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Trophy, Clock, Users } from 'lucide-react';

interface MiniGameProps {
  id: string;
  title: string;
  description: string;
  category: 'Math' | 'English' | 'Logic' | 'Memory' | 'Puzzle';
  difficulty: number;
  bestScore?: number;
  playCount: number;
  gradient: string;
  isLocked?: boolean;
}

const MiniGameCard = ({
  title,
  description,
  category,
  difficulty,
  bestScore,
  playCount,
  gradient,
  isLocked = false
}: MiniGameProps) => {
  const categoryIcons = {
    Math: '🔢',
    English: '📝',
    Logic: '🧩',
    Memory: '🧠',
    Puzzle: '🧩'
  };

  const difficultyStars = '⭐'.repeat(difficulty);

  return (
    <Card className={`group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 ${
      isLocked ? 'opacity-60' : 'hover:scale-105'
    }`}>
      {/* Game Preview */}
      <div className={`${gradient} h-32 relative flex items-center justify-center text-5xl`}>
        {isLocked ? '🔒' : categoryIcons[category]}
        
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
        
        {!isLocked && (
          <Button 
            size="sm"
            className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 text-gray-800 rounded-full w-12 h-12 p-0"
          >
            <Play className="w-6 h-6" />
          </Button>
        )}
      </div>

      <div className="p-4">
        {/* Title & Category */}
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className="font-comic text-xs">
            {category}
          </Badge>
          <div className="text-sm">{difficultyStars}</div>
        </div>

        <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
          {title}
        </h3>

        <p className="font-comic text-gray-600 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        {/* Game Stats */}
        {!isLocked && (
          <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              <Trophy className="w-3 h-3" />
              <span className="font-comic">{bestScore || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3" />
              <span className="font-comic">{playCount}</span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Button 
          className={`w-full font-comic font-bold rounded-full text-sm ${
            isLocked 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : `${gradient} text-white hover:scale-105 transition-transform duration-200`
          }`}
          size="sm"
          disabled={isLocked}
        >
          {isLocked ? 'Complete more lessons to unlock' : 'Play Game'}
        </Button>
      </div>
    </Card>
  );
};

export default MiniGameCard;
