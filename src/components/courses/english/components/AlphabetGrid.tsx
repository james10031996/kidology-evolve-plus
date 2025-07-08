
import { Card } from '@/components/ui/card';

interface AlphabetItem {
  letter: string;
  word: string;
  emoji: string;
}

interface AlphabetGridProps {
  letters: AlphabetItem[];
}

const AlphabetGrid = ({ letters }: AlphabetGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {letters.map((item, index) => (
        <Card 
          key={item.letter} 
          className="p-4 text-center bg-white hover:shadow-lg transition-all duration-300 animate-fade-in border-2 border-blue-100" 
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className="text-4xl font-fredoka font-bold text-blue-600 mb-2 animate-bounce">
            {item.letter}
          </div>
          <div className="text-3xl mb-2">
            {item.emoji}
          </div>
          <div className="font-comic text-sm text-gray-700 font-bold">
            {item.word}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default AlphabetGrid;
