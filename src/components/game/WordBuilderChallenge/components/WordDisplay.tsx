
interface WordDisplayProps {
  emoji: string;
  hint: string;
}

const WordDisplay = ({ emoji, hint }: WordDisplayProps) => {
  return (
    <div className="text-center mb-6">
      <div className="text-7xl animate-bounce">{emoji}</div>
      <h3 className="font-fredoka text-2xl mt-3">{hint}</h3>
    </div>
  );
};

export default WordDisplay;
