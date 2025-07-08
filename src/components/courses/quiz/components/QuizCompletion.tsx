
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, Star } from 'lucide-react';

interface QuizCompletionProps {
  score: number;
  totalQuestions: number;
  stars: number;
  onComplete: () => void;
  onClose: () => void;
}

const QuizCompletion = ({ score, totalQuestions, stars, onComplete, onClose }: QuizCompletionProps) => {
  return (
    <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-purple-200 shadow-2xl">
      <div className="text-center mb-8">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <h2 className="font-fredoka text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
          Amazing Work! 🌟
        </h2>
        <p className="font-comic text-xl text-gray-700 mb-6">
          You got {score} out of {totalQuestions} questions right! Keep learning! 📚✨
        </p>
        <div className="flex justify-center mb-8">
          {[...Array(3)].map((_, index) => (
            <Star
              key={index}
              className={`w-12 h-12 mx-2 ${
                index < stars 
                  ? 'text-yellow-400 fill-yellow-400 animate-pulse' 
                  : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center space-x-4">
        <Button
          onClick={onComplete}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-comic font-bold px-8 py-4 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
        >
          <Trophy className="w-6 h-6 mr-2" />
          Continue Learning! 🚀
        </Button>
        <Button
          onClick={onClose}
          variant="outline"
          className="font-comic px-6 py-3 rounded-full"
        >
          Close
        </Button>
      </div>
    </Card>
  );
};

export default QuizCompletion;
