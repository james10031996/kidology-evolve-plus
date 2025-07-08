
import { Progress } from '@/components/ui/progress';

interface QuizProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  score: number;
}

const QuizProgress = ({ currentQuestion, totalQuestions, score }: QuizProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <span className="font-comic text-lg text-gray-600 font-bold">
          Question {currentQuestion + 1} of {totalQuestions} 🧠
        </span>
        <span className="font-comic text-lg text-gray-600 font-bold">
          Score: {score}/{totalQuestions} ⭐
        </span>
      </div>
      <Progress value={progress} className="h-4 bg-gradient-to-r from-blue-200 to-purple-200" />
    </div>
  );
};

export default QuizProgress;
