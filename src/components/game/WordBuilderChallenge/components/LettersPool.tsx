
import { Button } from '@/components/ui/button';

interface LettersPoolProps {
  shuffledLetters: string[];
  onAddLetter: (letter: string) => void;
}

const LettersPool = ({ shuffledLetters, onAddLetter }: LettersPoolProps) => {
  return (
    <div className="flex flex-wrap justify-center mt-6 gap-3">
      {shuffledLetters.map((letter, idx) => (
        <Button
          key={`${letter}-${idx}`}
          onClick={() => onAddLetter(letter)}
          className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 text-white text-xl font-bold rounded-lg shadow hover:scale-105 transition"
        >
          {letter}
        </Button>
      ))}
    </div>
  );
};

export default LettersPool;
