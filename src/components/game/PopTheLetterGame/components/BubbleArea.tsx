
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
}

interface BubbleAreaProps {
  bubbles: LetterBubble[];
  onBubbleClick: (bubble: LetterBubble) => void;
}

const BubbleArea = ({ bubbles, onBubbleClick }: BubbleAreaProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
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
    </div>
  );
};

export default BubbleArea;
