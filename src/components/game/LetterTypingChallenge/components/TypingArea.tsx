
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Target } from 'lucide-react';

interface TypingItem {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  x: number;
  y: number;
  found: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
  pulsing?: boolean;
  fading?: boolean;
}

interface FoundItem {
  emoji: string;
  name: string;
  information: string;
  letter: string;
  fullName?: string;
}

interface TypingAreaProps {
  bubbles: TypingItem[];
  currentInput: string;
  onInputChange: (value: string) => void;
  onSubmit: () => void;
  foundItems: FoundItem[];
  completedRows: FoundItem[][];
  targetItems: TypingItem[];
}

const TypingArea = ({ 
  bubbles, 
  currentInput, 
  onInputChange, 
  onSubmit, 
  foundItems, 
  completedRows, 
  targetItems 
}: TypingAreaProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Typing Input Area */}
      <div className="mb-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
        <div className="text-center mb-4">
          <Target className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
          <h3 className="font-fredoka font-bold text-xl text-gray-800">
            Type the name of items that start with the target letter!
          </h3>
          <p className="font-comic text-gray-600 mt-2">
            Look at the bubbles and type the exact name, then press Enter or click Send
          </p>
        </div>
        
        <div className="flex gap-4 max-w-md mx-auto">
          <Input
            value={currentInput}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type the name here..."
            className="flex-1 font-comic text-lg"
            autoFocus
          />
          <Button
            onClick={onSubmit}
            className="gradient-green text-white font-comic font-bold px-6"
            disabled={!currentInput.trim()}
          >
            <Send className="w-4 h-4 mr-2" />
            Send
          </Button>
        </div>
      </div>

      {/* Bubble Game Area */}
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden mb-6">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`
              absolute w-20 h-20 rounded-full flex flex-col items-center justify-center
              font-comic font-bold text-white text-xs shadow-lg
              transition-all duration-300
              ${bubble.found
                  ? 'opacity-30 scale-75 bg-green-400'
                  : `bg-gradient-to-br ${bubble.color} animate-float`
                }
              ${bubble.pulsing ? 'animate-pulse' : ''}
              ${bubble.fading ? 'opacity-50' : ''}
              ${targetItems.some(target => target.id === bubble.id) ? 'ring-4 ring-yellow-400 ring-opacity-70' : ''}
            `}
            style={{
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              animationDelay: `${bubble.id * 0.2}s`
            }}
          >
            <div className="text-base mb-1">{bubble.emoji}</div>
            <div className="text-xs text-center leading-tight">{bubble.name}</div>
          </div>
        ))}
      </div>

      {/* Progress Display */}
      {(completedRows.length > 0 || foundItems.length > 0) && (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
            🎯 Words You've Typed!
          </h3>
          
          {/* Previous completed rows */}
          {completedRows.map((row, rowIndex) => (
            <div key={rowIndex} className="mb-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
              <div className="flex items-center mb-2">
                <span className="font-comic font-bold text-gray-700">Letter {row[0]?.letter} - Completed!</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {row.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border-2 border-green-200">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="font-comic font-bold text-sm text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{item.information}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Current progress */}
          {foundItems.length > 0 && (
            <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl animate-pulse">
              <div className="flex items-center mb-2">
                <span className="font-comic font-bold text-gray-700">Current Letter {foundItems[0]?.letter} Progress:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {foundItems.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 shadow-sm border-2 border-yellow-300">
                    <div className="text-center">
                      <div className="text-2xl mb-1">{item.emoji}</div>
                      <div className="font-comic font-bold text-sm text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-600 mt-1">{item.information}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TypingArea;
