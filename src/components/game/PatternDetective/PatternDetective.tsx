
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';

const PatternDetective = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [streak, setStreak] = useState(0);

  const patterns = [
    {
      sequence: ['🟦', '🟨', '🟦', '🟨', '🟦'],
      options: ['🟨', '🟦', '🟪', '🟩'],
      correct: '🟨',
      type: 'Color Pattern',
      hint: 'What comes next in this color pattern?'
    },
    {
      sequence: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐'],
      options: ['⭐⭐⭐⭐⭐', '⭐⭐', '⭐', '⭐⭐⭐'],
      correct: '⭐⭐⭐⭐⭐',
      type: 'Number Pattern',
      hint: 'How many stars come next?'
    },
    {
      sequence: ['🔺', '🔴', '🔺', '🔴', '🔺'],
      options: ['🔴', '🔺', '🟢', '🟨'],
      correct: '🔴',
      type: 'Shape Pattern',
      hint: 'Which shape continues the pattern?'
    },
    {
      sequence: ['🌟', '🌟🌟', '🌟', '🌟🌟', '🌟'],
      options: ['🌟🌟', '🌟', '🌟🌟🌟', '⭐'],
      correct: '🌟🌟',
      type: 'Repeating Pattern',
      hint: 'What comes next in this repeating pattern?'
    },
    {
      sequence: ['🎈', '🎈🎈', '🎈🎈🎈', '🎈🎈🎈🎈'],
      options: ['🎈🎈🎈🎈🎈', '🎈', '🎈🎈', '🎭'],
      correct: '🎈🎈🎈🎈🎈',
      type: 'Growing Pattern',
      hint: 'How many balloons come next?'
    }
  ];

  const currentPattern = patterns[currentLevel];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (answer === currentPattern.correct) {
      const points = (streak + 1) * 10;
      setScore(score + points);
      setStreak(streak + 1);
      
      confetti({
        particleCount: 50 + (streak * 10),
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        if (currentLevel < patterns.length - 1) {
          setCurrentLevel(currentLevel + 1);
          setSelectedAnswer(null);
        } else {
          setShowCompletion(true);
        }
      }, 2000);
    } else {
      setStreak(0);
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🔍 Pattern Detective
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Find and complete the patterns! 🧩✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Score</p>
                <p className="font-fredoka text-2xl font-bold text-orange-700">{score}</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Level</p>
                <p className="font-fredoka text-2xl font-bold text-green-700">{currentLevel + 1}/{patterns.length}</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Streak</p>
                <p className="font-fredoka text-2xl font-bold text-purple-700">{streak}</p>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-purple-200">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
                {currentPattern.type}
              </h3>
              <p className="font-comic text-xl text-gray-600 mb-6">
                {currentPattern.hint}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
              <div className="flex justify-center items-center space-x-4 mb-4">
                {currentPattern.sequence.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200 text-4xl min-w-[80px] min-h-[80px] flex items-center justify-center animate-fade-in"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {item}
                  </div>
                ))}
                <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-4 shadow-lg border-4 border-dashed border-orange-400 text-4xl min-w-[80px] min-h-[80px] flex items-center justify-center animate-pulse">
                  ?
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {currentPattern.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 h-auto text-4xl rounded-2xl transition-all duration-300 border-4 transform hover:scale-105 ${
                    selectedAnswer === null
                      ? 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-purple-50 text-gray-800 border-gray-200 hover:border-blue-300 shadow-lg'
                      : selectedAnswer === option
                      ? option === currentPattern.correct
                        ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg'
                        : 'bg-gradient-to-br from-red-100 to-pink-100 text-red-800 border-red-400 shadow-red-200 shadow-lg'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswer && (
              <div className="text-center">
                <p className={`font-comic text-2xl font-bold ${
                  selectedAnswer === currentPattern.correct 
                    ? 'text-green-600' 
                    : 'text-red-600'
                }`}>
                  {selectedAnswer === currentPattern.correct 
                    ? '🎉 Excellent! You found the pattern!' 
                    : '🤔 Try again! Look at the pattern carefully.'
                  }
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <GameCompletionPopup
        isOpen={showCompletion}
        onClose={() => {
          updateStars(Math.floor(score / 10));
          setShowCompletion(false);
          navigate('/games');
        }}
        score={score}
        stars={Math.min(3, Math.floor(score / 50))}
        gameName="Pattern Detective"
      />
    </div>
  );
};

export default PatternDetective;
