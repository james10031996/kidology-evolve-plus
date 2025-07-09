
import { LetterItem } from '../data/letterData';

interface LetterBubble {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
}

interface EnhancedBubbleAreaProps {
  bubbles: LetterBubble[];
  onBubbleClick: (bubble: LetterBubble) => void;
  selectedBubble?: LetterBubble | null;
}

const EnhancedBubbleArea = ({ bubbles, onBubbleClick, selectedBubble }: EnhancedBubbleAreaProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden mb-6">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => onBubbleClick(bubble)}
            disabled={bubble.clicked}
            className={`
              absolute w-24 h-24 rounded-full flex flex-col items-center justify-center
              font-comic font-bold text-white text-xs shadow-lg
              transition-all duration-300 hover:scale-110
              ${bubble.clicked
                  ? 'opacity-50 scale-90'
                  : `bg-gradient-to-br ${bubble.color} animate-float hover:shadow-2xl`
                }
            `}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animationDelay: `${bubble.id * 0.2}s`
            }}
          >
            <div className="text-lg mb-1">{bubble.emoji}</div>
            <div className="text-xs text-center leading-tight">{bubble.name}</div>
          </button>
        ))}
      </div>

      {/* Information Display */}
      {selectedBubble && selectedBubble.isCorrect && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-scale-in">
          <div className="flex items-start space-x-4">
            <div className="text-6xl">{selectedBubble.emoji}</div>
            <div className="flex-1">
              <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
                {selectedBubble.fullName || selectedBubble.name}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-comic text-gray-700 mb-3">
                    {selectedBubble.information || `This ${selectedBubble.name} starts with the letter ${selectedBubble.letter}!`}
                  </p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="bg-blue-100 text-blue-700 border-blue-200 px-2 py-1 rounded-full text-xs font-comic">
                      {selectedBubble.category || 'Item'}
                    </div>
                    <div className="bg-green-100 text-green-700 border-green-200 px-2 py-1 rounded-full text-xs font-comic">
                      Letter {selectedBubble.letter}
                    </div>
                  </div>
                </div>
                {selectedBubble.habitat && (
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <span className="font-comic font-bold text-gray-700">🏠 Habitat:</span>
                    </div>
                    <p className="font-comic text-gray-600 text-sm">{selectedBubble.habitat}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedBubbleArea;
