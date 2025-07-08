
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trophy, Star, Globe, Map } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';

const GeographyQuizAdventure = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showCompletion, setShowCompletion] = useState(false);
  const [streak, setStreak] = useState(0);

  const landmarks = [
    {
      name: 'Eiffel Tower',
      country: 'France',
      city: 'Paris',
      image: '🗼',
      options: ['London', 'Paris', 'Rome', 'Berlin'],
      correct: 'Paris',
      fact: 'The Eiffel Tower was built in 1889 and is 330 meters tall!'
    },
    {
      name: 'Great Wall',
      country: 'China',
      city: 'Beijing',
      image: '🏯',
      options: ['Tokyo', 'Seoul', 'Beijing', 'Bangkok'],
      correct: 'Beijing',
      fact: 'The Great Wall of China is over 13,000 miles long!'
    },
    {
      name: 'Statue of Liberty',
      country: 'USA',
      city: 'New York',
      image: '🗽',
      options: ['New York', 'Los Angeles', 'Chicago', 'Miami'],
      correct: 'New York',
      fact: 'The Statue of Liberty was a gift from France to America!'
    },
    {
      name: 'Big Ben',
      country: 'UK',
      city: 'London',
      image: '🕰️',
      options: ['Manchester', 'London', 'Edinburgh', 'Dublin'],
      correct: 'London',
      fact: 'Big Ben is actually the name of the bell, not the tower!'
    },
    {
      name: 'Sydney Opera House',
      country: 'Australia',
      city: 'Sydney',
      image: '🎭',
      options: ['Melbourne', 'Brisbane', 'Sydney', 'Perth'],
      correct: 'Sydney',
      fact: 'The Sydney Opera House looks like giant seashells!'
    }
  ];

  const currentLandmark = landmarks[currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    
    if (answer === currentLandmark.correct) {
      const points = (streak + 1) * 15;
      setScore(score + points);
      setStreak(streak + 1);
      
      confetti({
        particleCount: 50 + (streak * 10),
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        if (currentQuestion < landmarks.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
        } else {
          setShowCompletion(true);
        }
      }, 3000);
    } else {
      setStreak(0);
      setTimeout(() => {
        setSelectedAnswer(null);
      }, 3000);
    }
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
            Explore world landmarks and learn about amazing places! 🗺️✨
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-yellow-100 to-orange-100 border-2 border-yellow-200 card-magic">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Score</p>
                <p className="font-fredoka text-2xl font-bold text-orange-700">{score}</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200 card-magic">
              <div className="text-center">
                <Globe className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Question</p>
                <p className="font-fredoka text-2xl font-bold text-green-700">{currentQuestion + 1}/{landmarks.length}</p>
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
                      : option === currentLandmark.correct && selectedAnswer !== null
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
                      : `🤔 Good try! The correct answer is ${currentLandmark.correct}.`
                    }
                  </p>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="text-4xl mb-2">🌟</div>
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
          navigate('/games');
        }}
        score={score}
        stars={Math.min(3, Math.floor(score / 50))}
        gameName="Geography Quiz Adventure"
      />
    </div>
  );
};

export default GeographyQuizAdventure;
