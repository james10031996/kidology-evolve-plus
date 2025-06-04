
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Pause, RotateCcw, Star, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

interface LetterAnimal {
  id: number;
  letter: string;
  animal: string;
  emoji: string;
  x: number;
  y: number;
  found: boolean;
}

const LetterSafari = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [timeLeft, setTimeLeft] = useState(90);
  const [gameActive, setGameActive] = useState(false);
  const [animals, setAnimals] = useState<LetterAnimal[]>([]);
  const [targetLetter, setTargetLetter] = useState('A');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [foundLetters, setFoundLetters] = useState<string[]>([]);

  const animalData = [
    { letter: 'A', animal: 'Alligator', emoji: '🐊' },
    { letter: 'B', animal: 'Bear', emoji: '🐻' },
    { letter: 'C', animal: 'Cat', emoji: '🐱' },
    { letter: 'D', animal: 'Dog', emoji: '🐶' },
    { letter: 'E', animal: 'Elephant', emoji: '🐘' },
    { letter: 'F', animal: 'Fox', emoji: '🦊' },
    { letter: 'G', animal: 'Giraffe', emoji: '🦒' },
    { letter: 'H', animal: 'Horse', emoji: '🐎' },
    { letter: 'I', animal: 'Iguana', emoji: '🦎' },
    { letter: 'J', animal: 'Jaguar', emoji: '🐆' },
    { letter: 'K', animal: 'Koala', emoji: '🐨' },
    { letter: 'L', animal: 'Lion', emoji: '🦁' },
    { letter: 'M', animal: 'Monkey', emoji: '🐵' },
    { letter: 'N', animal: 'Newt', emoji: '🦎' },
    { letter: 'O', animal: 'Owl', emoji: '🦉' },
    { letter: 'P', animal: 'Penguin', emoji: '🐧' },
    { letter: 'Q', animal: 'Quail', emoji: '🐦' },
    { letter: 'R', animal: 'Rabbit', emoji: '🐰' },
    { letter: 'S', animal: 'Snake', emoji: '🐍' },
    { letter: 'T', animal: 'Tiger', emoji: '🐅' },
    { letter: 'U', animal: 'Unicorn', emoji: '🦄' },
    { letter: 'V', animal: 'Vulture', emoji: '🦅' },
    { letter: 'W', animal: 'Wolf', emoji: '🐺' },
    { letter: 'X', animal: 'X-ray Fish', emoji: '🐠' },
    { letter: 'Y', animal: 'Yak', emoji: '🐂' },
    { letter: 'Z', animal: 'Zebra', emoji: '🦓' }
  ];

  const generateAnimals = () => {
    const lettersPerLevel = Math.min(8 + level, 15);
    const selectedAnimals = animalData.slice(0, lettersPerLevel);
    const newAnimals: LetterAnimal[] = [];

    selectedAnimals.forEach((animal, index) => {
      let x, y;
      let attempts = 0;
      
      do {
        x = Math.random() * 75 + 5;
        y = Math.random() * 65 + 10;
        attempts++;
      } while (attempts < 10 && newAnimals.some(existing => 
        Math.abs(existing.x - x) < 12 && Math.abs(existing.y - y) < 12
      ));

      newAnimals.push({
        id: index,
        letter: animal.letter,
        animal: animal.animal,
        emoji: animal.emoji,
        x,
        y,
        found: false
      });
    });

    setAnimals(newAnimals);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(90);
    setTargetLetter('A');
    setGameCompleted(false);
    setFoundLetters([]);
    generateAnimals();
  };

  const findAnimal = (animal: LetterAnimal) => {
    if (!gameActive || animal.found) return;

    if (animal.letter === targetLetter) {
      setAnimals(prev => prev.map(a => 
        a.id === animal.id ? { ...a, found: true } : a
      ));
      setScore(prev => prev + (level * 15));
      setFoundLetters(prev => [...prev, animal.letter]);
      
      // Find next letter
      const nextCharCode = targetLetter.charCodeAt(0) + 1;
      if (nextCharCode <= 'Z'.charCodeAt(0)) {
        const nextLetter = String.fromCharCode(nextCharCode);
        const hasNextLetter = animals.some(a => a.letter === nextLetter);
        if (hasNextLetter) {
          setTargetLetter(nextLetter);
        } else {
          // Level complete
          setLevel(prev => prev + 1);
          setTargetLetter('A');
          setTimeLeft(prev => prev + 30);
          setFoundLetters([]);
          setTimeout(() => generateAnimals(), 1500);
        }
      } else {
        // All letters found in this level
        setLevel(prev => prev + 1);
        setTargetLetter('A');
        setTimeLeft(prev => prev + 30);
        setFoundLetters([]);
        setTimeout(() => generateAnimals(), 1500);
      }
    } else {
      setScore(prev => Math.max(0, prev - 10));
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setLevel(1);
    setTimeLeft(90);
    setTargetLetter('A');
    setAnimals([]);
    setGameCompleted(false);
    setFoundLetters([]);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setGameCompleted(true);
      if (score > 150) {
        updateStars(Math.floor(score / 15));
      }
    }
  }, [gameActive, timeLeft, score, updateStars]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50 to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
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

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🦁 Letter Safari Adventure
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Find animals in alphabetical order! Look for the letter {targetLetter} next!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-green-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-orange-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Find Letter</div>
            <div className="font-fredoka text-2xl font-bold text-blue-600">{targetLetter}</div>
          </Card>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {!gameActive && !gameCompleted && (
            <Button 
              onClick={startGame}
              className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Safari
            </Button>
          )}
          
          {gameActive && (
            <Button 
              onClick={() => setGameActive(false)}
              className="gradient-orange text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Pause className="w-5 h-5 mr-2" />
              Pause
            </Button>
          )}
          
          <Button 
            onClick={resetGame}
            variant="outline"
            className="font-comic font-bold px-8 py-3 rounded-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <Card className="relative h-96 bg-gradient-to-br from-green-100 to-yellow-100 rounded-2xl shadow-lg overflow-hidden mb-8">
          {gameActive && (
            <div className="relative w-full h-full">
              {animals.map((animal) => (
                <button
                  key={animal.id}
                  onClick={() => findAnimal(animal)}
                  className={`absolute w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center font-fredoka font-bold shadow-lg transform transition-all duration-200 hover:scale-110 ${
                    animal.found ? 'opacity-30 scale-75' : 'animate-pulse'
                  }`}
                  style={{
                    left: `${animal.x}%`,
                    top: `${animal.y}%`,
                    animationDelay: `${animal.id * 0.1}s`
                  }}
                  disabled={animal.found}
                >
                  <div className="text-2xl">{animal.emoji}</div>
                  <div className="text-sm text-gray-700">{animal.letter}</div>
                </button>
              ))}
            </div>
          )}
          
          {!gameActive && !gameCompleted && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-8xl mb-4">🌍</div>
                <div className="font-fredoka text-3xl text-gray-700 mb-4">Ready for Safari Adventure?</div>
                <div className="font-comic text-gray-600">Find animals in alphabetical order!</div>
              </div>
            </div>
          )}
        </Card>

        {foundLetters.length > 0 && (
          <Card className="p-4 mb-8 bg-green-50 rounded-2xl">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Found Letters:</h3>
            <div className="flex flex-wrap gap-2">
              {foundLetters.map((letter) => (
                <Badge key={letter} className="bg-green-500 text-white font-comic">
                  {letter}
                </Badge>
              ))}
            </div>
          </Card>
        )}

        {gameCompleted && (
          <Card className="p-8 bg-gradient-to-r from-yellow-100 to-green-100 rounded-2xl text-center">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              🎉 Safari Complete! 🎉
            </h2>
            <p className="font-comic text-lg text-gray-700 mb-4">
              Final Score: <span className="font-bold text-green-600">{score}</span>
            </p>
            <p className="font-comic text-lg text-gray-700 mb-6">
              You found {foundLetters.length} animals and earned {Math.floor(score / 15)} stars!
            </p>
            <div className="flex justify-center space-x-4">
              <Button 
                onClick={startGame}
                className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                <Play className="w-5 h-5 mr-2" />
                Play Again
              </Button>
              <Button 
                onClick={() => navigate('/games')}
                className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                Try Another Game
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LetterSafari;
