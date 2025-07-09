
interface MathExpression {
  id: number;
  expression: string;
  value: number; 
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
}

interface BubbleAreaProps {
  expressions: MathExpression[];
  onBubbleClick: (bubble: MathExpression) => void;
}

const BubbleArea = ({ expressions, onBubbleClick }: BubbleAreaProps) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
        {expressions.map((bubble) => (
          <button
            key={bubble.id}
            onClick={() => onBubbleClick(bubble)}
            disabled={bubble.clicked}
            className={`
              absolute w-20 h-20 rounded-full flex items-center justify-center
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
            {bubble.expression}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BubbleArea;
