
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { X, CheckCircle, XCircle, Lightbulb, ArrowRight, Trophy, Star } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import confetti from 'canvas-confetti';
import { QuizQuestion } from './QuizData';

interface EnhancedInteractiveQuizProps {
  questions: QuizQuestion[];
  title: string;
  subject: string;
  onClose: () => void;
  onComplete: (score: number, stars: number) => void;
}

const EnhancedInteractiveQuiz = ({ questions, title, subject, onClose, onComplete }: EnhancedInteractiveQuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [draggedLetters, setDraggedLetters] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(draggedLetters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setDraggedLetters(items);
  };

  const checkDragAnswer = () => {
    const correctSequence = currentQ.interactiveElements?.correctSequence || [];
    const availableItems = currentQ.interactiveElements?.items || [];
    const correctLetters = correctSequence.map(index => availableItems[index]);
    
    const isCorrect = draggedLetters.join('') === correctLetters.join('');
    setAnswers([...answers, isCorrect]);
    
    if (isCorrect) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setSelectedAnswer(isCorrect ? 0 : 1);
    setTimeout(() => {
      setShowExplanation(true);
    }, 1200);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setDraggedLetters([]);
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
        <Card className="bg-gradient-to-br from-white via-purple-50 to-pink-50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-purple-200 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h2 className="font-fredoka text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-4">
              Amazing Work! 🌟
            </h2>
            <p className="font-comic text-xl text-gray-700 mb-6">
              You got {score} out of {questions.length} questions right! Keep learning! 📚✨
            </p>
            <div className="flex justify-center mb-8">
              {[...Array(3)].map((_, index) => (
                <Star
                  key={index}
                  className={`w-12 h-12 mx-2 ${
                    index < getScoreStars() 
                      ? 'text-yellow-400 fill-yellow-400 animate-pulse' 
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button
              onClick={() => {
                onComplete(score, getScoreStars());
                onClose();
              }}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-comic font-bold px-8 py-4 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all"
            >
              <Trophy className="w-6 h-6 mr-2" />
              Continue Learning! 🚀
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <Card className="bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto border-4 border-blue-200 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="font-fredoka text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {title} ✨
            </h2>
            <p className="font-comic text-gray-600 text-lg">{subject} Quiz Adventure! 🎮</p>
          </div>
          <Button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-3 shadow-lg"
            size="sm"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-comic text-lg text-gray-600 font-bold">
              Question {currentQuestion + 1} of {questions.length} 🧠
            </span>
            <span className="font-comic text-lg text-gray-600 font-bold">
              Score: {score}/{questions.length} ⭐
            </span>
          </div>
          <Progress value={progress} className="h-4 bg-gradient-to-r from-blue-200 to-purple-200" />
        </div>

        <div className="text-center mb-8">
          <div className={`text-9xl mb-6 animate-${currentQ.animation}`}>
            {currentQ.emoji}
          </div>
          <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-6 leading-relaxed">
            {currentQ.question}
          </h3>
        </div>

        {currentQ.visualType === 'drag-drop' && currentQ.interactiveElements?.type === 'drag-letters' ? (
          <div className="mb-8">
            <p className="font-comic text-lg text-center mb-6 text-purple-700 font-bold">
              🎯 Drag the letters to spell the word!
            </p>
            
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex justify-center mb-6">
                <Droppable droppableId="word-builder" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex space-x-2 p-4 bg-white rounded-2xl border-4 border-dashed border-purple-300 min-h-[80px] items-center"
                    >
                      {draggedLetters.map((letter, index) => (
                        <Draggable key={`${letter}-${index}`} draggableId={`${letter}-${index}`} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-fredoka font-bold text-2xl shadow-lg cursor-move hover:scale-110 transition-transform"
                            >
                              {letter}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            <div className="flex justify-center space-x-2 mb-6">
              {currentQ.interactiveElements?.items.map((letter, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    if (!draggedLetters.includes(letter)) {
                      setDraggedLetters([...draggedLetters, letter]);
                    }
                  }}
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 text-white font-fredoka font-bold text-2xl rounded-xl shadow-lg hover:scale-110 transition-transform"
                  disabled={draggedLetters.includes(letter)}
                >
                  {letter}
                </Button>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={checkDragAnswer}
                disabled={selectedAnswer !== null || draggedLetters.length === 0}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-comic font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
              >
                ✅ Check My Answer!
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 mb-8">
            {currentQ.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={selectedAnswer !== null}
                className={`p-6 h-auto text-left justify-start font-comic text-xl rounded-2xl transition-all duration-300 border-4 transform hover:scale-105 ${
                  selectedAnswer === null
                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-800 border-blue-200 hover:border-purple-300 shadow-lg'
                    : selectedAnswer === index
                    ? index === currentQ.correctAnswer
                      ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg'
                      : 'bg-gradient-to-r from-red-100 to-pink-100 text-red-800 border-red-400 shadow-red-200 shadow-lg'
                    : index === currentQ.correctAnswer
                    ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg'
                    : 'bg-gray-100 text-gray-500 border-gray-200'
                }`}
              >
                <span className="mr-4 font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
                {selectedAnswer !== null && index === currentQ.correctAnswer && (
                  <CheckCircle className="w-8 h-8 text-green-600 ml-auto animate-bounce" />
                )}
                {selectedAnswer === index && index !== currentQ.correctAnswer && (
                  <XCircle className="w-8 h-8 text-red-600 ml-auto animate-pulse" />
                )}
              </Button>
            ))}
          </div>
        )}

        {showExplanation && (
          <Card className="p-6 bg-gradient-to-r from-yellow-50 via-orange-50 to-red-50 border-4 border-yellow-300 mb-6 shadow-xl">
            <div className="flex items-start space-x-4">
              <Lightbulb className="w-10 h-10 text-yellow-600 flex-shrink-0 mt-1 animate-pulse" />
              <div>
                <h4 className="font-fredoka text-2xl font-bold text-orange-800 mb-3">
                  🎯 Great Learning Moment!
                </h4>
                <p className="font-comic text-lg text-gray-700 mb-4 leading-relaxed">
                  {currentQ.explanation}
                </p>
                <div className="bg-white p-4 rounded-xl shadow-inner">
                  <span className="font-fredoka text-lg font-bold text-purple-700">💡 Key Concept: </span>
                  <span className="font-comic text-lg text-purple-600">{currentQ.concept}</span>
                </div>
              </div>
            </div>
          </Card>
        )}

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
      </Card>
    </div>
  );
};

export default EnhancedInteractiveQuiz;
