import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Zap, Clock, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';
import { patterns as presetPatterns } from './patternDetectiveData';

const TIMER_DURATION = 15; // seconds per level

const colorThemes = [
  { bg: 'from-pink-50 via-red-50 to-yellow-50', primary: 'from-pink-400 to-red-500', accent: 'from-yellow-400 to-orange-500' },
  { bg: 'from-blue-50 via-green-50 to-cyan-50', primary: 'from-blue-400 to-cyan-500', accent: 'from-green-400 to-lime-500' },
  { bg: 'from-purple-50 via-indigo-50 to-pink-50', primary: 'from-purple-400 to-indigo-500', accent: 'from-pink-400 to-rose-500' },
  { bg: 'from-orange-50 via-yellow-50 to-pink-50', primary: 'from-orange-400 to-amber-500', accent: 'from-pink-400 to-fuchsia-500' },
  { bg: 'from-green-50 via-teal-50 to-blue-50', primary: 'from-teal-400 to-green-500', accent: 'from-blue-400 to-sky-500' },
];

const PatternDetective = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();

  const [currentLevel, setCurrentLevel] = useState(() => Number(localStorage.getItem('patternLevel')) || 0);
  const [score, setScore] = useState(() => Number(localStorage.getItem('patternScore')) || 0);
  const [streak, setStreak] = useState(() => Number(localStorage.getItem('patternStreak')) || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [progress, setProgress] = useState(() => Number(localStorage.getItem('patternProgress')) || 0);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [perfectStreak, setPerfectStreak] = useState(false);
  const [theme, setTheme] = useState(colorThemes[Math.floor(Math.random() * colorThemes.length)]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('patternLevel', currentLevel.toString());
    localStorage.setItem('patternScore', score.toString());
    localStorage.setItem('patternStreak', streak.toString());
    localStorage.setItem('patternProgress', progress.toString());
  }, [currentLevel, score, streak, progress]);

  // Change theme every level
  useEffect(() => {
    setTheme(colorThemes[Math.floor(Math.random() * colorThemes.length)]);
  }, [currentLevel]);

  // Combine presets with dynamic generator
  const getPattern = (level: number) => {
    if (level < presetPatterns.length) return presetPatterns[level];

    // Dynamically generate harder patterns
    const base = presetPatterns[Math.floor(Math.random() * presetPatterns.length)];
    const length = 4 + Math.floor(level / 3); // Sequence grows every 3 levels
    const sequence = Array.from({ length }, (_, i) => base.sequence[i % base.sequence.length]);

    const distractors = new Set(base.options);
    distractors.add(base.correct);
    while (distractors.size < 6) {
      const randomEmoji = base.sequence[Math.floor(Math.random() * base.sequence.length)];
      distractors.add(randomEmoji);
    }

    const options = Array.from(distractors).sort(() => Math.random() - 0.5);

    return {
      sequence,
      options,
      correct: base.correct,
      type: base.type,
      hint: base.hint
    };
  };

  const currentPattern = getPattern(currentLevel);

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !selectedAnswer) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !selectedAnswer) handleAnswer(''); // Auto wrong
  }, [timeLeft, selectedAnswer]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    let levelScore = 0;

    if (answer === currentPattern.correct) {
      levelScore = (streak + 1) * 10;

      if (timeLeft > 10) levelScore += 5; // Bonus for speed
      else if (timeLeft > 5) levelScore += 3;

      setScore(score + levelScore);
      const newStreak = streak + 1;
      setStreak(newStreak);

      confetti({
        particleCount: 50 + newStreak * 10,
        spread: 90,
        origin: { y: 0.6 }
      });

      if (newStreak === 5) {
        setPerfectStreak(true);
        confetti({
          particleCount: 400,
          spread: 160,
          ticks: 300,
          startVelocity: 50,
          origin: { y: 0.5 }
        });
        setTimeout(() => setPerfectStreak(false), 3000);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setTimeLeft(TIMER_DURATION);
      setCurrentLevel(currentLevel + 1);
      setProgress(((currentLevel + 2) / (presetPatterns.length + 10)) * 100);
    }, 1500);
  };

  return (
   <div className={`min-h-screen bg-gradient-to-br ${theme.bg}`}>
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className={`font-fredoka font-bold text-5xl bg-gradient-to-r ${theme.primary} bg-clip-text text-transparent mb-4`}>
            🎨 Pattern Detective
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Solve patterns fast! Bonus for speed and perfect streaks! ✨
          </p>
          {perfectStreak && (
            <div className="flex justify-center items-center mt-4 animate-bounce">
              <Flame className="w-10 h-10 text-orange-500 mr-2" />
              <span className="text-3xl font-bold text-orange-600">Perfect Streak!</span>
            </div>
          )}
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="relative w-full h-6 bg-gray-200 rounded-full mb-6 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${theme.accent} rounded-full transition-all duration-700`}
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
              <p className="font-comic text-lg font-bold text-gray-700 text-center">Score</p>
              <p className="font-fredoka text-2xl font-bold text-orange-700 text-center">{score}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200">
              <Zap className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="font-comic text-lg font-bold text-gray-700 text-center">Level</p>
              <p className="font-fredoka text-2xl font-bold text-green-700 text-center">{currentLevel + 1}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
              <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="font-comic text-lg font-bold text-gray-700 text-center">Streak</p>
              <p className="font-fredoka text-2xl font-bold text-purple-700 text-center">{streak}</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200">
              <Clock className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="font-comic text-lg font-bold text-gray-700 text-center">Time Left</p>
              <p className={`font-fredoka text-2xl font-bold text-center ${timeLeft <= 5 ? 'text-red-600' : 'text-blue-700'}`}>
                {timeLeft}s
              </p>
            </Card>
          </div>

{/* Pattern Display */}
          <Card className={`p-8 bg-white rounded-3xl shadow-2xl border-4 border-${theme.primary.split(' ')[0]}`}>
            {/* Pattern Content */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🧩</div>
              <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
                {currentPattern.type}
              </h3>
              <p className="font-comic text-xl text-gray-600 mb-6">{currentPattern.hint}</p>
            </div>

            <div className="flex justify-center items-center space-x-4 mb-8">
              {currentPattern.sequence.map((item, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 shadow-lg border-2 border-gray-200 text-4xl min-w-[80px] min-h-[80px] flex items-center justify-center"
                >
                  {item}
                </div>
              ))}
              <div className="bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl p-4 shadow-lg border-4 border-dashed border-orange-400 text-4xl min-w-[80px] min-h-[80px] flex items-center justify-center animate-pulse">
                ?
              </div>
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {currentPattern.options.map((option, idx) => (
                <Button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={!!selectedAnswer}
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
                <p className={`font-comic text-2xl font-bold ${selectedAnswer === currentPattern.correct ? 'text-green-600' : 'text-red-600'}`}>
                  {selectedAnswer === currentPattern.correct ? '🎉 Correct!' : '⏰ Wrong or Timeout!'}
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
          localStorage.clear();
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
