
import { Card } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { QuizQuestion } from '../QuizData';

interface QuizExplanationProps {
  question: QuizQuestion;
}

const QuizExplanation = ({ question }: QuizExplanationProps) => {
  return (
    <Card className="p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-4 border-yellow-300 mb-6 shadow-xl">
      <div className="flex items-start space-x-4">
        <Lightbulb className="w-10 h-10 text-yellow-600 flex-shrink-0 mt-1 animate-pulse" />
        <div>
          <h4 className="font-fredoka text-2xl font-bold text-orange-800 mb-3">
            🎯 Great Learning Moment!
          </h4>
          <p className="font-comic text-lg text-gray-700 mb-4 leading-relaxed">
            {question.explanation}
          </p>
          <div className="bg-white p-4 rounded-xl shadow-inner">
            <span className="font-fredoka text-lg font-bold text-purple-700">💡 Key Concept: </span>
            <span className="font-comic text-lg text-purple-600">{question.concept}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default QuizExplanation;
