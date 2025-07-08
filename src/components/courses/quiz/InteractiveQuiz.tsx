
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from './QuizData';
import QuizHeader from './components/QuizHeader';
import QuizProgress from './components/QuizProgress';
import QuizQuestion from './components/QuizQuestion';
import QuizAnswers from './components/QuizAnswers';
import QuizExplanation from './components/QuizExplanation';
import QuizCompletion from './components/QuizCompletion';

interface InteractiveQuizProps {
  questions: QuizQuestion[];
  title: string;
  subject: string;
  onClose: () => void;
  onComplete: (score: number, stars: number) => void;
}

const InteractiveQuiz = ({ questions, title, subject, onClose, onComplete }: InteractiveQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQ = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === currentQ.correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 1200);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const getScoreStars = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  if (quizComplete) {
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <QuizCompletion
          score={score}
          totalQuestions={questions.length}
          stars={getScoreStars()}
          onComplete={() => {
            onComplete(score, getScoreStars());
            onClose();
          }}
          onClose={onClose}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-200 shadow-2xl">
        <QuizHeader title={title} subject={subject} onClose={onClose} />
        
        <QuizProgress 
          currentQuestion={currentQuestion} 
          totalQuestions={questions.length} 
          score={score} 
        />

        <QuizQuestion question={currentQ} />

        <QuizAnswers 
          question={currentQ} 
          selectedAnswer={selectedAnswer} 
          onAnswerSelect={handleAnswerSelect} 
        />

        {showExplanation && <QuizExplanation question={currentQ} />}

        {showExplanation && (
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-comic font-bold px-10 py-4 rounded-full text-xl shadow-lg transform hover:scale-105 transition-all"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question! 🚀
                  <ArrowRight className="w-6 h-6 ml-2" />
                </>
              ) : (
                <>
                  See Results! 🎉
                  <Trophy className="w-6 h-6 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuiz;
