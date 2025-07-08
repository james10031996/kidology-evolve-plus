
import { QuizQuestion as QuizQuestionType } from '../QuizData';

interface QuizQuestionProps {
  question: QuizQuestionType;
}

const QuizQuestionComponent = ({ question }: QuizQuestionProps) => {
  return (
    <div className="text-center mb-8">
      <div className={`text-9xl mb-6 animate-${question.animation || 'bounce'}`}>
        {question.emoji}
      </div>
      <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-6 leading-relaxed">
        {question.question}
      </h3>
    </div>
  );
};

export default QuizQuestionComponent;
