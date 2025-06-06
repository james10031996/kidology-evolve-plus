
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, ArrowRight, Trophy, Star } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface CourseTestProps {
  courseId: string;
  courseName: string;
  questions: Question[];
  onComplete: (score: number, passed: boolean) => void;
  onBack: () => void;
}

const CourseTest = ({ courseId, courseName, questions, onComplete, onBack }: CourseTestProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    onComplete(finalScore, finalScore >= 70);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  if (showResults) {
    const passed = score >= 70;
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 bg-white rounded-3xl shadow-2xl text-center animate-scale-in">
            <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
              passed ? 'bg-green-100' : 'bg-orange-100'
            }`}>
              {passed ? (
                <Trophy className="w-10 h-10 text-green-600" />
              ) : (
                <Star className="w-10 h-10 text-orange-600" />
              )}
            </div>
            
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              {passed ? '🎉 Congratulations! 🎉' : '📚 Keep Learning! 📚'}
            </h2>
            
            <p className="font-comic text-lg text-gray-600 mb-6">
              You scored <span className="font-bold text-purple-600">{score}%</span> on the {courseName} test!
            </p>
            
            <div className="mb-6">
              <div className={`text-4xl font-fredoka font-bold mb-2 ${
                passed ? 'text-green-600' : 'text-orange-600'
              }`}>
                {score}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-1000 ${
                    passed ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-orange-400 to-orange-600'
                  }`}
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
            
            <p className="font-comic text-gray-600 mb-8">
              {passed 
                ? 'Excellent work! You\'ve mastered this course and earned your certificate!' 
                : 'Good effort! Review the course materials and try again to improve your score.'
              }
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onBack}
                className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                Back to Courses
              </Button>
              {!passed && (
                <Button 
                  onClick={() => {
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                    setShowResults(false);
                    setScore(0);
                  }}
                  className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
                >
                  Try Again
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-fredoka font-bold text-3xl text-gray-800">
              📝 {courseName} Test
            </h1>
            <div className="font-comic text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>
          
          <Progress value={progress} className="h-3 rounded-full" />
        </div>

        <Card className="p-8 bg-white rounded-3xl shadow-xl animate-fade-in">
          <div className="mb-8">
            <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-2xl border-2 transition-all duration-300 font-comic ${
                    selectedAnswers[currentQuestion] === index
                      ? 'border-purple-400 bg-purple-50 text-purple-700 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-purple-400 bg-purple-400'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswers[currentQuestion] === index && (
                        <div className="w-2 h-2 rounded-full bg-white" />
                      )}
                    </div>
                    {option}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button 
              onClick={onBack}
              variant="outline"
              className="font-comic font-bold px-6 py-3 rounded-full"
            >
              Exit Test
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full disabled:opacity-50"
            >
              {currentQuestion < questions.length - 1 ? (
                <>
                  Next Question
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                'Finish Test'
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CourseTest;
