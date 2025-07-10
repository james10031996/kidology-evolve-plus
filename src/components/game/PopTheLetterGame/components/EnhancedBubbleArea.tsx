
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
  isBlinking?: boolean;
  isDisappearing?: boolean;
}

interface PoppedBubble {
  emoji: string;
  name: string;
  information: string;
  letter: string;
  fullName?: string;
}

interface EnhancedBubbleAreaProps {
  bubbles: LetterBubble[];
  onBubbleClick: (bubble: LetterBubble) => void;
  selectedBubble?: LetterBubble | null;
  poppedBubbles: PoppedBubble[][];
  currentRow: PoppedBubble[];
}

const EnhancedBubbleArea = ({ bubbles, onBubbleClick, selectedBubble, poppedBubbles, currentRow }: EnhancedBubbleAreaProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Bubble Game Area */}
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden mb-6">
        {bubbles.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => onBubbleClick(bubble)}
            disabled={bubble.clicked}
            className={`
              absolute w-20 h-20 rounded-full flex flex-col items-center justify-center
              font-comic font-bold text-white text-xs shadow-lg
              transition-all duration-300 hover:scale-110
              ${bubble.clicked
                  ? 'opacity-50 scale-90'
                  : `bg-gradient-to-br ${bubble.color} animate-float hover:shadow-2xl`
                }
              ${bubble.isBlinking ? 'animate-pulse opacity-60' : ''}
              ${bubble.isDisappearing ? 'opacity-30 pointer-events-none' : ''}
            `}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animationDelay: `${bubble.id * 0.2}s`
            }}
          >
            <div className="text-base mb-1">{bubble.emoji}</div>
            <div className="text-xs text-center leading-tight">{bubble.name}</div>
          </button>
        ))}
      </div>

      {/* Popped Bubbles Display */}
      {(poppedBubbles.length > 0 || currentRow.length > 0) && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
            🎯 Letters You've Found!
          </h3>
          
          {/* Previous completed rows */}
          {poppedBubbles.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-4 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="font-comic font-bold text-gray-700">Row {rowIndex + 1} - Letter {row[0]?.letter}:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {row.map((bubble, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{bubble.emoji}</div>
                      <div className="font-comic font-bold text-sm text-gray-800">{bubble.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{bubble.information}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Current row being filled */}
          {currentRow.length > 0 && (
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl animate-pulse">
              <div className="flex items-center mb-2">
                <span className="font-comic font-bold text-gray-700">Current - Letter {currentRow[0]?.letter}:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {currentRow.map((bubble, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border-2 border-yellow-300">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{bubble.emoji}</div>
                      <div className="font-comic font-bold text-sm text-gray-800">{bubble.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{bubble.information}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Individual Selected Bubble Info */}
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
