
interface FeedbackDisplayProps {
  feedback: string;
}

const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  if (!feedback) return null;

  return (
    <div className="text-center mb-4">
      <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-comic text-lg font-bold animate-bounce shadow-lg">
        {feedback}
      </div>
    </div>
  );
};

export default FeedbackDisplay;
