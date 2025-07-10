
import { Card } from '@/components/ui/card';

interface FeedbackDisplayProps {
  feedback: string;
}

const FeedbackDisplay = ({ feedback }: FeedbackDisplayProps) => {
  if (!feedback) return null;

  const isSuccess = feedback.includes('Perfect') || feedback.includes('HIGH SCORE');
  const isError = feedback.includes('Try again') || feedback.includes('Check');
  const isSpecial = feedback.includes('SPEED') || feedback.includes('Next Letter');

  return (
    <div className="max-w-4xl mx-auto mb-4">
      <Card className={`p-4 text-center animate-bounce ${
        isSuccess ? 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-300' :
        isError ? 'bg-gradient-to-r from-red-100 to-pink-100 border-red-300' :
        isSpecial ? 'bg-gradient-to-r from-purple-100 to-indigo-100 border-purple-300' :
        'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300'
      }`}>
        <div className={`font-fredoka font-bold text-lg ${
          isSuccess ? 'text-green-700' :
          isError ? 'text-red-700' :
          isSpecial ? 'text-purple-700' :
          'text-blue-700'
        }`}>
          {feedback}
        </div>
      </Card>
    </div>
  );
};

export default FeedbackDisplay;
