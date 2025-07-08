
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { QuizQuestion } from '../QuizData';

interface QuizAnswersProps {
  question: QuizQuestion;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
}

const QuizAnswers = ({ question, selectedAnswer, onAnswerSelect }: QuizAnswersProps) => {
  return (
    <div className="grid gap-4 mb-8">
      {question.options.map((option, index) => (
        <Button
          key={index}
          onClick={() => onAnswerSelect(index)}
          disabled={selectedAnswer !== null}
          className={`p-6 h-auto text-left justify-start font-comic text-xl rounded-2xl transition-all duration-300 border-4 transform hover:scale-105 ${
            selectedAnswer === null
              ? 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-800 border-blue-200 hover:border-purple-300 shadow-lg'
              : selectedAnswer === index
              ? index === question.correctAnswer
                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg'
                : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-400 shadow-red-200 shadow-lg'
              : index === question.correctAnswer
              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg'
              : 'bg-gray-100 text-gray-500 border-gray-200'
          }`}
        >
          <span className="mr-4 font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {String.fromCharCode(65 + index)}.
          </span>
          {option}
          {selectedAnswer !== null && index === question.correctAnswer && (
            <CheckCircle className="w-8 h-8 text-green-600 ml-auto animate-bounce" />
          )}
          {selectedAnswer === index && index !== question.correctAnswer && (
            <XCircle className="w-8 h-8 text-red-600 ml-auto animate-pulse" />
          )}
        </Button>
      ))}
    </div>
  );
};

export default QuizAnswers;
