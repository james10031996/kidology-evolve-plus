
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  onCheckWord: () => void;
  onClearWord: () => void;
  onGiveHint: () => void;
  isCheckDisabled: boolean;
}

const GameControls = ({ onCheckWord, onClearWord, onGiveHint, isCheckDisabled }: GameControlsProps) => {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <Button
        onClick={onCheckWord}
        className="bg-green-500 text-white px-6 py-3 rounded-full font-comic text-lg hover:scale-105 transition"
        disabled={isCheckDisabled}
      >
        ✅ Check Word
      </Button>
      <Button
        onClick={onClearWord}
        variant="outline"
        className="px-6 py-3 rounded-full text-lg"
      >
        🗑 Clear
      </Button>
      <Button
        onClick={onGiveHint}
        variant="secondary"
        className="px-6 py-3 rounded-full text-lg"
      >
        💡 Hint
      </Button>
    </div>
  );
};

export default GameControls;
