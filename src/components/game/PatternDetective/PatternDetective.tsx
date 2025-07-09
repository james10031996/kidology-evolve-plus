
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Zap, Clock, Flame, Heart, Gift, Volume2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';
import { patterns as presetPatterns } from './patternDetectiveData';

const TIMER_DURATION = 20; // seconds per level
const BONUS_TIME_THRESHOLD = 15; // bonus if solved within this time

// Sound effects
const correctSound = new Audio('/sounds/correct.mp3');
const wrongSound = new Audio('/sounds/wrong.mp3');
const tickSound = new Audio('/sounds/tick.mp3');
let bonusSound: HTMLAudioElement | null = null;
try {
  bonusSound = new Audio('/sounds/bonus.mp3');
} catch (e) {
  console.warn('Bonus sound missing');
}

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
  const [lives, setLives] = useState(() => Number(localStorage.getItem('patternLives')) || 3);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
  const [perfectStreak, setPerfectStreak] = useState(false);
  const [theme, setTheme] = useState(colorThemes[Math.floor(Math.random() * colorThemes.length)]);
  const [gameActive, setGameActive] = useState(true);
  const [levelStartTime, setLevelStartTime] = useState<number>(Date.now());
  const [showBonus, setShowBonus] = useState(false);
  const [achievements, setAchievements] = useState<string[]>(() => 
    JSON.parse(localStorage.getItem('patternAchievements') || '[]')
  );
  const [powerUps, setPowerUps] = useState({
    timeFreeze: 2,
    hint: 2,
    extraLife: 1
  });
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('patternBestScore')) || 0);
  const [bestStreak, setBestStreak] = useState(() => Number(localStorage.getItem('patternBestStreak')) || 0);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('patternLevel', currentLevel.toString());
    localStorage.setItem('patternScore', score.toString());
    localStorage.setItem('patternStreak', streak.toString());
    localStorage.setItem('patternLives', lives.toString());
    localStorage.setItem('patternAchievements', JSON.stringify(achievements));
    
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('patternBestScore', score.toString());
    }
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem('patternBestStreak', streak.toString());
    }
  }, [currentLevel, score, streak, lives, achievements, bestScore, bestStreak]);

  // Change theme every level
  useEffect(() => {
    setTheme(colorThemes[Math.floor(Math.random() * colorThemes.length)]);
    setLevelStartTime(Date.now());
  }, [currentLevel]);

  // Combine presets with dynamic generator
  const getPattern = (level: number) => {
    if (level < presetPatterns.length) return presetPatterns[level];

    // Dynamically generate harder patterns
    const base = presetPatterns[Math.floor(Math.random() * presetPatterns.length)];
    const length = 4 + Math.floor(level / 3);
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
    if (timeLeft > 0 && !selectedAnswer && gameActive) {
      const timer = setTimeout(() => {
        if (timeLeft <= 5) tickSound.play();
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !selectedAnswer && gameActive) {
      handleAnswer(''); // Auto wrong
    }
  }, [timeLeft, selectedAnswer, gameActive]);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const solveTime = (Date.now() - levelStartTime) / 1000;
    let levelScore = 0;
    let bonus = 0;

    if (answer === currentPattern.correct) {
      levelScore = (streak + 1) * 10;

      // Speed bonus
      if (solveTime <= 5) {
        bonus = 15;
        setShowBonus(true);
        bonusSound?.play();
        setTimeout(() => setShowBonus(false), 1500);
      } else if (timeLeft > BONUS_TIME_THRESHOLD) {
        bonus = 10;
        setShowBonus(true);
        bonusSound?.play();
        setTimeout(() => setShowBonus(false), 1500);
      } else if (timeLeft > 10) {
        bonus = 5;
      }

      setScore(score + levelScore + bonus);
      const newStreak = streak + 1;
      setStreak(newStreak);

      correctSound.play();
      confetti({
        particleCount: 50 + newStreak * 10,
        spread: 90,
        origin: { y: 0.6 }
      });

      // Achievement checks
      if (newStreak === 5 && !achievements.includes('🔥 Hot Streak')) {
        setPerfectStreak(true);
        setAchievements(prev => [...prev, '🔥 Hot Streak']);
        confetti({
          particleCount: 400,
          spread: 160,
          ticks: 300,
          startVelocity: 50,
          origin: { y: 0.5 }
        });
        setTimeout(() => setPerfectStreak(false), 3000);
      }

      if (currentLevel === 9 && !achievements.includes('🏆 Pattern Master')) {
        setAchievements(prev => [...prev, '🏆 Pattern Master']);
      }

      if (bonus >= 15 && !achievements.includes('⚡ Speed Demon')) {
        setAchievements(prev => [...prev, '⚡ Speed Demon']);
      }
    } else {
      setStreak(0);
      setLives(prev => prev - 1);
      wrongSound.play();

      if (lives <= 1) {
        setGameActive(false);
        setTimeout(() => setShowCompletion(true), 1000);
        return;
      }
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setTimeLeft(TIMER_DURATION);
      setCurrentLevel(currentLevel + 1);
    }, 2000);
  };

  const usePowerUp = (type: 'timeFreeze' | 'hint' | 'extraLife') => {
    if (powerUps[type] <= 0) return;

    setPowerUps(prev => ({ ...prev, [type]: prev[type] - 1 }));

    switch (type) {
      case 'timeFreeze':
        setTimeLeft(prev => prev + 10);
        break;
      case 'hint':
        const hintMessage = `💡 The answer starts with: ${currentPattern.correct.charAt(0)}`;
        break;
      case 'extraLife':
        setLives(prev => prev + 1);
        break;
    }
  };

  const resetGame = () => {
    setCurrentLevel(0);
    setScore(0);
    setStreak(0);
    setLives(3);
    setTimeLeft(TIMER_DURATION);
    setGameActive(true);
    setSelectedAnswer(null);
    setShowCompletion(false);
    setPowerUps({ timeFreeze: 2, hint: 2, extraLife: 1 });
    localStorage.removeItem('patternLevel');
    localStorage.removeItem('patternScore');
    localStorage.removeItem('patternStreak');
    localStorage.removeItem('patternLives');
  };

  if (showCompletion) {
    return (
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
    );
  }

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

        {/* Bonus Animation */}
        {showBonus && (
          <div className="fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
            <div className="bg-yellow-400 text-white font-fredoka text-4xl px-6 py-4 rounded-full shadow-lg animate-pulse flex items-center gap-2">
              ⚡️ Speed Bonus!
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto">
          {/* Cards */}
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            <Card className="p-4 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200">
              <Trophy className="w-6 h-6 mx-auto mb-2 text-yellow-600" />
              <p className="font-comic text-sm font-bold text-gray-700 text-center">Score</p>
              <p className="font-fredoka text-xl font-bold text-orange-700 text-center">{score}</p>
              <p className="font-comic text-xs text-gray-500 text-center">Best: {bestScore}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200">
              <Zap className="w-6 h-6 mx-auto mb-2 text-green-600" />
              <p className="font-comic text-sm font-bold text-gray-700 text-center">Level</p>
              <p className="font-fredoka text-xl font-bold text-green-700 text-center">{currentLevel + 1}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200">
              <Star className="w-6 h-6 mx-auto mb-2 text-purple-600" />
              <p className="font-comic text-sm font-bold text-gray-700 text-center">Streak</p>
              <p className="font-fredoka text-xl font-bold text-purple-700 text-center">{streak}</p>
              <p className="font-comic text-xs text-gray-500 text-center">Best: {bestStreak}</p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200">
              <Clock className="w-6 h-6 mx-auto mb-2 text-blue-600" />
              <p className="font-comic text-sm font-bold text-gray-700 text-center">Time</p>
              <p className={`font-fredoka text-xl font-bold text-center ${timeLeft <= 5 ? 'text-red-600' : 'text-blue-700'}`}>
                {timeLeft}s
              </p>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200">
              <Heart className="w-6 h-6 mx-auto mb-2 text-red-600" />
              <p className="font-comic text-sm font-bold text-gray-700 text-center">Lives</p>
              <div className="flex justify-center">
                {Array.from({ length: lives }).map((_, i) => (
                  <Heart key={i} className="w-4 h-4 text-red-500 fill-current" />
                ))}
              </div>
            </Card>
          </div>

          {/* Power-ups */}
          <div className="flex justify-center space-x-3 mb-4">
            <Button
              size="sm"
              variant="outline"
              onClick={() => usePowerUp('timeFreeze')}
              disabled={powerUps.timeFreeze === 0}
              className="font-comic"
            >
              ⏰ +Time ({powerUps.timeFreeze})
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => usePowerUp('hint')}
              disabled={powerUps.hint === 0}
              className="font-comic"
            >
              💡 Hint ({powerUps.hint})
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => usePowerUp('extraLife')}
              disabled={powerUps.extraLife === 0}
              className="font-comic"
            >
              ❤️ Life ({powerUps.extraLife})
            </Button>
          </div>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1 rounded-full">
                  <span className="font-comic text-xs text-purple-700 font-bold">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Pattern Display */}
          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-orange-200">
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
                  {selectedAnswer === currentPattern.correct ? '🎉 Correct!' : '❌ Wrong or Timeout!'}
                </p>
              </div>
            )}
          </Card>

          {/* Reset Button */}
          <div className="text-center mt-6">
            <Button onClick={resetGame} variant="outline" className="font-comic">
              🔄 Reset Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatternDetective;