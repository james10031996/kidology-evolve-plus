
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Star, Clock, Zap, Target, Trophy, Heart, Atom, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import { scienceQuestions } from './scienceBubbleGameData';

interface ScienceQuestion {
  id: number;
  question: string;
  answer: string;
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
  category: string;
}

const ScienceBubbleGame = () => {
  const [gameStats, setGameStats] = useState({
    level: 1,
    score: 0,
    lives: 3,
    timeLeft: 45,
    streak: 0,
    totalCorrect: 0
  });

  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questions, setQuestions] = useState<ScienceQuestion[]>([]);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameOver' | 'levelComplete'>('menu');
  const [feedback, setFeedback] = useState<string>('');

  const bubbleColors = [
    'from-red-400 to-red-600',
    'from-blue-400 to-blue-600',
    'from-green-400 to-green-600',
    'from-yellow-400 to-yellow-600',
    'from-purple-400 to-purple-600',
    'from-pink-400 to-pink-600',
    'from-indigo-400 to-indigo-600',
    'from-teal-400 to-teal-600'
  ];

  const generateQuestions = useCallback(() => {
    const level = gameStats.level;
    const difficulty = level <= 2 ? 'easy' : level <= 4 ? 'medium' : 'hard';
    const questionPool = scienceQuestions[difficulty];
    const selectedQ = questionPool[Math.floor(Math.random() * questionPool.length)];

    setCurrentQuestion(selectedQ.q);

    const bubbleCount = Math.min(6 + level, 10);
    const newQuestions: ScienceQuestion[] = [];

    // Add correct answer
    newQuestions.push({
      id: 0,
      question: selectedQ.q,
      answer: selectedQ.correct,
      isCorrect: true,
      x: Math.random() * 80 + 10,
      y: Math.random() * 70 + 15,
      clicked: false,
      color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
      category: difficulty
    });

    // Add wrong answers
    selectedQ.wrong.forEach((wrong, index) => {
      newQuestions.push({
        id: index + 1,
        question: selectedQ.q,
        answer: wrong,
        isCorrect: false,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        clicked: false,
        color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
        category: difficulty
      });
    });

    // Add additional wrong answers from other questions
    const otherQuestions = questionPool.filter(q => q.q !== selectedQ.q);
    while (newQuestions.length < bubbleCount && otherQuestions.length > 0) {
      const randomQ = otherQuestions[Math.floor(Math.random() * otherQuestions.length)];
      const randomWrong = randomQ.wrong[Math.floor(Math.random() * randomQ.wrong.length)];

      if (!newQuestions.some(q => q.answer === randomWrong)) {
        newQuestions.push({
          id: newQuestions.length,
          question: selectedQ.q,
          answer: randomWrong,
          isCorrect: false,
          x: Math.random() * 80 + 10,
          y: Math.random() * 70 + 15,
          clicked: false,
          color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
          category: difficulty
        });
      }
    }

    setQuestions(newQuestions);
  }, [gameStats.level]);

  const startGame = () => {
    setGameState('playing');
    setGameStats({
      level: 1,
      score: 0,
      lives: 3,
      timeLeft: 45,
      streak: 0,
      totalCorrect: 0
    });
    generateQuestions();
  };

  const handleBubbleClick = (bubble: ScienceQuestion) => {
    if (bubble.clicked) return;

    const newQuestions = questions.map(q =>
      q.id === bubble.id ? { ...q, clicked: true } : q
    );
    setQuestions(newQuestions);

    if (bubble.isCorrect) {
      setGameStats(prev => ({
        ...prev,
        score: prev.score + (20 * (prev.level + prev.streak)),
        streak: prev.streak + 1,
        totalCorrect: prev.totalCorrect + 1
      }));
      setFeedback('Correct! 🧪✨');

      setTimeout(() => {
        setGameState('levelComplete');
      }, 1000);
    } else {
      setGameStats(prev => ({
        ...prev,
        lives: prev.lives - 1,
        streak: 0
      }));
      setFeedback('Wrong! Try again! ❌');

      if (gameStats.lives <= 1) {
        setTimeout(() => {
          setGameState('gameOver');
        }, 1000);
      }
    }

    setTimeout(() => setFeedback(''), 1500);
  };

  const nextLevel = () => {
    const newLevel = gameStats.level + 1;
    const newTimeLimit = Math.max(25, 50 - newLevel * 3);

    setGameStats(prev => ({
      ...prev,
      level: newLevel,
      timeLeft: newTimeLimit,
      streak: 0
    }));

    generateQuestions();
    setGameState('playing');
  };

  // Timer effect
  useEffect(() => {
    if (gameState === 'playing' && gameStats.timeLeft > 0) {
      const timer = setTimeout(() => {
        setGameStats(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);

      return () => clearTimeout(timer);
    } else if (gameState === 'playing' && gameStats.timeLeft === 0) {
      setGameState('gameOver');
    }
  }, [gameState, gameStats.timeLeft]);

  if (gameState === 'menu') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/games')}
              className="mr-4 font-comic"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <h1 className="font-fredoka text-6xl font-bold gradient-text animate-bounce">
                🧪 Science Pop Quiz!
              </h1>
              <p className="font-comic text-xl text-gray-700">
                Pop the bubble with the correct answer to science questions!
              </p>
            </div>

            <Card className="p-8 bg-white/80 backdrop-blur-sm">
              <Atom className="w-16 h-16 text-blue-500 mx-auto mb-4" />
              <h2 className="font-fredoka text-2xl font-bold mb-4">How to Play:</h2>
              <div className="space-y-3 text-left font-comic">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-blue-500" />
                  <span>Read the science question carefully</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <span>Pop the bubble with the correct answer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-6 h-6 text-red-500" />
                  <span>Answer before time runs out</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Star className="w-6 h-6 text-purple-500" />
                  <span>Learn amazing science facts!</span>
                </div>
              </div>
            </Card>

            <Button
              onClick={startGame}
              size="lg"
              className="font-fredoka text-xl px-8 py-4 gradient-green text-white hover:scale-105 transition-transform"
            >
              🚀 Start Learning!
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === 'gameOver') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-orange-100 to-yellow-100 p-6 flex items-center justify-center">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/games')}
              className="mr-4 font-comic"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
          <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
            <h2 className="font-fredoka text-4xl font-bold text-red-600 mb-4">Game Over!</h2>
            <div className="space-y-3 font-comic text-lg">
              <p>Final Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
              <p>Level Reached: <span className="font-bold text-blue-600">{gameStats.level}</span></p>
              <p>Correct Answers: <span className="font-bold text-green-600">{gameStats.totalCorrect}</span></p>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <Button onClick={startGame} className="gradient-green text-white font-comic">
                🔄 Try Again
              </Button>
              <Button onClick={() => setGameState('menu')} variant="outline" className="font-comic">
                🏠 Menu
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (gameState === 'levelComplete') {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-6 flex items-center justify-center">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/games')}
              className="mr-4 font-comic"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Games
            </Button>
          </div>
          <Card className="p-8 max-w-md mx-auto text-center bg-white/90 backdrop-blur-sm">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="font-fredoka text-4xl font-bold text-green-600 mb-4">Correct!</h2>
            <div className="space-y-2 font-comic text-lg mb-6">
              <p>Level {gameStats.level} completed! 🎉</p>
              <p>Score: <span className="font-bold text-purple-600">{gameStats.score}</span></p>
              {gameStats.streak > 2 && <p>Great streak! 🔥</p>}
            </div>
            <Button onClick={nextLevel} className="gradient-blue text-white font-comic text-lg px-6">
              ➡️ Next Question
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-teal-100 p-4">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
        {/* Game Header */}
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-4 bg-white/80 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="font-fredoka text-sm text-gray-600">Level</div>
                <div className="font-bold text-2xl text-blue-600">{gameStats.level}</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka text-sm text-gray-600">Score</div>
                <div className="font-bold text-2xl text-purple-600">{gameStats.score}</div>
              </div>
              <div className="text-center">
                <div className="font-fredoka text-sm text-gray-600">Streak</div>
                <div className="font-bold text-2xl text-orange-600">{gameStats.streak}</div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {Array.from({ length: gameStats.lives }).map((_, i) => (
                  <Heart key={i} className="w-6 h-6 text-red-500 fill-current" />
                ))}
              </div>
              <div className="text-center">
                <Clock className="w-6 h-6 text-red-500 mx-auto" />
                <div className="font-bold text-xl text-red-600">{gameStats.timeLeft}s</div>
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="text-center mb-6">
            <Card className="p-6 bg-white/90 backdrop-blur-sm max-w-4xl mx-auto">
              <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
                {currentQuestion}
              </h2>
              <p className="font-comic text-lg text-gray-600">Pop the bubble with the correct answer!</p>
            </Card>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="text-center mb-4">
              <div className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full font-comic text-lg font-bold animate-bounce">
                {feedback}
              </div>
            </div>
          )}

          {/* Game Area */}
          <div className="relative h-96 bg-white/20 backdrop-blur-sm rounded-2xl overflow-hidden">
            {questions.map((bubble) => (
              <button
                key={bubble.id}
                onClick={() => handleBubbleClick(bubble)}
                disabled={bubble.clicked}
                className={`
                absolute w-24 h-24 rounded-full flex items-center justify-center
                font-comic font-bold text-white text-xs shadow-lg p-2
                transition-all duration-300 hover:scale-110
                ${bubble.clicked
                    ? 'opacity-50 scale-90'
                    : `bg-gradient-to-br ${bubble.color} animate-float hover:shadow-2xl`
                  }
              `}
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  animationDelay: `${bubble.id * 0.3}s`
                }}
              >
                <span className="text-center leading-tight">{bubble.answer}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceBubbleGame;
