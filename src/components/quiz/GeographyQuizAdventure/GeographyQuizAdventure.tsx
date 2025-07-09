import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Globe, Map, Award, Flame } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';
import { landmarks as presetLandmarks } from './geographyQuizAdventureData';

const TIMER_SECONDS = 20; // Each question has 20 seconds

const GeographyQuizAdventure = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(() => {
    return parseInt(localStorage.getItem('geoQuizCurrentQuestion') || '0', 10);
  });
  const [score, setScore] = useState(() => {
    return parseInt(localStorage.getItem('geoQuizScore') || '0', 10);
  });
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('geoQuizStreak') || '0', 10);
  });
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [badges, setBadges] = useState<string[]>([]);
  const [bestScore, setBestScore] = useState(() => parseInt(localStorage.getItem('geoQuizBestScore') || '0', 10));
  const [bestStreak, setBestStreak] = useState(() => parseInt(localStorage.getItem('geoQuizBestStreak') || '0', 10));

  // Merge presets with random ones after
  const allLandmarks = [...presetLandmarks];

  // Generate random landmark (after presets)
  const generateRandomLandmark = () => {
    const random = presetLandmarks[Math.floor(Math.random() * presetLandmarks.length)];
    const harderOptions = random.options.slice();
    while (harderOptions.length < 4) {
      const city = presetLandmarks[Math.floor(Math.random() * presetLandmarks.length)].city;
      if (!harderOptions.includes(city)) harderOptions.push(city);
    }
    return {
      ...random,
      options: shuffleArray(harderOptions)
    };
  };

  const currentLandmark = currentQuestion < allLandmarks.length
    ? allLandmarks[currentQuestion]
    : generateRandomLandmark();

  // Timer countdown
  useEffect(() => {
    if (selectedAnswer || showCompletion) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAnswer(''); // Treat timeout as wrong
          return TIMER_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [currentQuestion, selectedAnswer, showCompletion]);

  // Save progress
  useEffect(() => {
    localStorage.setItem('geoQuizCurrentQuestion', currentQuestion.toString());
    localStorage.setItem('geoQuizScore', score.toString());
    localStorage.setItem('geoQuizStreak', streak.toString());
  }, [currentQuestion, score, streak]);

  const updateRecords = () => {
    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('geoQuizBestScore', score.toString());
    }
    if (streak > bestStreak) {
      setBestStreak(streak);
      localStorage.setItem('geoQuizBestStreak', streak.toString());
    }
  };

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const isCorrect = answer === currentLandmark.correct;

    if (isCorrect) {
      const timeBonus = Math.floor((timeLeft / TIMER_SECONDS) * 5); // Faster = more bonus
      const points = (streak + 1) * 10 + timeBonus;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);

      confetti({
        particleCount: 50 + (streak * 10),
        spread: 70,
        origin: { y: 0.6 }
      });

      if (streak + 1 >= 5) {
        confetti({
          particleCount: 200,
          spread: 90,
          origin: { y: 0.5 }
        });
         if (!badges.includes('🔥 Perfect Streak')) {
          setBadges(prev => [...prev, '🔥 Perfect Streak']);
        }
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setSelectedAnswer(null);
      setTimeLeft(TIMER_SECONDS);
      setCurrentQuestion(prev => prev + 1);
    }, 3000);
  };

  useEffect(() => {

    updateRecords();

  }, [score, streak]);

  const handleCompletion = () => {
    updateStars(Math.floor(score / 10));
    updateRecords();
    setShowCompletion(false);
    localStorage.removeItem('geoQuizCurrentQuestion');
    localStorage.removeItem('geoQuizScore');
    localStorage.removeItem('geoQuizStreak');
    navigate('/games');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-5xl text-rainbow mb-4">
            🌍 Geography Quiz Adventure
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Explore world landmarks and race against time! ⏳✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200 card-magic">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Score</p>
                <p className="font-fredoka text-2xl font-bold text-orange-700">{score}</p>
                <p className="font-comic text-sm text-gray-500 mt-2">🏆 Best: {bestScore}</p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200 card-magic">
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Question</p>
                <p className="font-fredoka text-2xl font-bold text-green-700">{currentQuestion + 1}</p>
                <div className="w-full bg-gray-200 rounded-full mt-2">
                  <div
                    className="h-2 bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-200 card-magic">
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Streak</p>
                <p className="font-fredoka text-2xl font-bold text-purple-700">{streak}</p>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-blue-200 card-magic">
            <div className="text-center mb-8">
              <div className="text-9xl mb-6 animate-float">{currentLandmark.image}</div>
              <h3 className="font-fredoka text-4xl font-bold text-gray-800 mb-4">
                {currentLandmark.name}
              </h3>
              <p className="font-comic text-2xl text-gray-600 mb-6">
                🌍 Where in the world is this famous landmark?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {currentLandmark.options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`p-6 h-auto text-2xl rounded-2xl transition-all duration-300 border-4 transform hover:scale-105 font-comic font-bold ${
                    selectedAnswer === null
                      ? 'bg-gradient-to-br from-white to-gray-50 hover:from-blue-50 hover:to-green-50 text-gray-800 border-gray-200 hover:border-blue-300 shadow-lg'
                      : selectedAnswer === option
                      ? option === currentLandmark.correct
                        ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg animate-pulse'
                        : 'bg-gradient-to-br from-red-100 to-pink-100 text-red-800 border-red-400 shadow-red-200 shadow-lg'
                      : option === currentLandmark.correct
                      ? 'bg-gradient-to-br from-green-100 to-emerald-100 text-green-800 border-green-400 shadow-green-200 shadow-lg animate-pulse'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                  }`}
                >
                  <Map className="w-6 h-6 mr-3" />
                  {option}
                </Button>
              ))}
            </div>

            {selectedAnswer && (
              <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-4 border-yellow-300 shadow-xl">
                <div className="text-center">
                  <p className={`font-comic text-2xl font-bold mb-4 ${
                    selectedAnswer === currentLandmark.correct 
                      ? 'text-green-600' 
                      : 'text-red-600'
                  }`}>
                    {selectedAnswer === currentLandmark.correct
                      ? '🎉 Excellent! You\'re a geography expert!'
                      : `🤔 Oops! The correct answer was ${currentLandmark.correct}.`}
                  </p>
                  <div className="bg-white p-4 rounded-xl">
                    <p className="font-comic text-lg text-gray-700 font-bold">
                      Fun Fact: {currentLandmark.fact}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </Card>
        </div>
      </div>

      <GameCompletionPopup
        isOpen={showCompletion}
        onClose={() => {
          updateStars(Math.floor(score / 10));
          setShowCompletion(false);
          localStorage.removeItem('geoQuizCurrentQuestion');
          localStorage.removeItem('geoQuizScore');
          localStorage.removeItem('geoQuizStreak');
          navigate('/games');
        }}
        score={score}
        stars={Math.min(3, Math.floor(score / 50))}
        gameName="Geography Quiz Adventure"
      />
    </div>
  );
};

// Utility: Shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default GeographyQuizAdventure;
