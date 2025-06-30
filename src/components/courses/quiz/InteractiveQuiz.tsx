
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, CheckCircle, XCircle, Lightbulb, ArrowRight, Trophy } from 'lucide-react';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  concept: string;
  emoji: string;
  animation: string;
}

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
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correctAnswer;
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      setShowExplanation(true);
    }, 1000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
      setShowResults(true);
    }
  };

  const getScoreStars = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return 3;
    if (percentage >= 70) return 2;
    if (percentage >= 50) return 1;
    return 0;
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'pulse': return 'animate-pulse';
      case 'spin': return 'animate-spin';
      case 'ping': return 'animate-ping';
      default: return 'animate-bounce';
    }
  };

  if (quizComplete && showResults) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <Card className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">🎉</div>
            <h2 className="font-fredoka text-3xl font-bold text-green-700 mb-4">
              Quiz Complete!
            </h2>
            <p className="font-comic text-lg text-gray-600 mb-6">
              You scored {score} out of {questions.length} questions correctly!
            </p>
            <div className="flex justify-center mb-8">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`text-4xl mx-1 ${index < getScoreStars() ? 'text-yellow-500' : 'text-gray-300'}`}
                >
                  ⭐
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 mb-8">
            <h3 className="font-fredoka text-2xl text-center text-purple-700 mb-6">
              📚 Review Your Answers
            </h3>
            
            {questions.map((question, index) => (
              <Card key={question.id} className={`p-6 border-2 ${answers[index] ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                <div className="flex items-start space-x-4">
                  <div className={`text-4xl ${getAnimationClass(question.animation)}`}>
                    {question.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      {answers[index] ? (
                        <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600 mr-2" />
                      )}
                      <span className="font-fredoka text-lg font-bold">
                        Question {index + 1}
                      </span>
                    </div>
                    
                    <h4 className="font-comic text-gray-800 mb-3">{question.question}</h4>
                    
                    <div className="bg-white p-4 rounded-xl mb-4 border border-gray-200">
                      <div className="flex items-center mb-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 mr-2" />
                        <span className="font-fredoka font-bold text-yellow-700">Correct Answer:</span>
                      </div>
                      <p className="font-comic text-green-700 font-bold mb-2">
                        {question.options[question.correctAnswer]}
                      </p>
                      <p className="font-comic text-sm text-gray-600">
                        {question.explanation}
                      </p>
                    </div>
                    
                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <span className="font-fredoka text-sm font-bold text-purple-700">Concept: </span>
                      <span className="font-comic text-sm text-purple-600">{question.concept}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                onComplete(score, getScoreStars());
                onClose();
              }}
              className="gradient-green text-white font-comic px-8 py-3 rounded-full text-lg"
            >
              <Trophy className="w-5 h-5 mr-2" />
              Complete Quiz
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
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="bg-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-fredoka text-2xl font-bold text-purple-700">{title}</h2>
            <p className="font-comic text-gray-600">{subject} Quiz</p>
          </div>
          <Button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2"
            size="sm"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-comic text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="font-comic text-sm text-gray-600">
              Score: {score}/{questions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="text-center mb-8">
          <div className={`text-8xl mb-6 ${getAnimationClass(currentQ.animation)}`}>
            {currentQ.emoji}
          </div>
          <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-6">
            {currentQ.question}
          </h3>
        </div>

        <div className="grid gap-4 mb-8">
          {currentQ.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
              className={`p-6 h-auto text-left justify-start font-comic text-lg rounded-2xl transition-all duration-300 ${
                selectedAnswer === null
                  ? 'bg-gray-50 hover:bg-blue-50 text-gray-800 border-2 border-gray-200 hover:border-blue-300'
                  : selectedAnswer === index
                  ? index === currentQ.correctAnswer
                    ? 'bg-green-100 text-green-800 border-2 border-green-400'
                    : 'bg-red-100 text-red-800 border-2 border-red-400'
                  : index === currentQ.correctAnswer
                  ? 'bg-green-100 text-green-800 border-2 border-green-400'
                  : 'bg-gray-100 text-gray-600 border-2 border-gray-200'
              }`}
            >
              <span className="mr-4 font-bold">
                {String.fromCharCode(65 + index)}.
              </span>
              {option}
              {selectedAnswer !== null && index === currentQ.correctAnswer && (
                <CheckCircle className="w-6 h-6 text-green-600 ml-auto" />
              )}
              {selectedAnswer === index && index !== currentQ.correctAnswer && (
                <XCircle className="w-6 h-6 text-red-600 ml-auto" />
              )}
            </Button>
          ))}
        </div>

        {showExplanation && (
          <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 mb-6">
            <div className="flex items-start space-x-4">
              <Lightbulb className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-fredoka text-lg font-bold text-blue-800 mb-2">
                  Explanation
                </h4>
                <p className="font-comic text-gray-700 mb-3">
                  {currentQ.explanation}
                </p>
                <div className="bg-white p-3 rounded-lg">
                  <span className="font-fredoka text-sm font-bold text-purple-700">Key Concept: </span>
                  <span className="font-comic text-sm text-purple-600">{currentQ.concept}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {showExplanation && (
          <div className="text-center">
            <Button
              onClick={handleNextQuestion}
              className="gradient-blue text-white font-comic px-8 py-3 rounded-full text-lg"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              ) : (
                <>
                  View Results
                  <Trophy className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default InteractiveQuiz;
