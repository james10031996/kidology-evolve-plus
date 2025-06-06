import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Pause, RotateCcw, Star, Trophy, Info } from 'lucide-react';
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
  fullName: string;
  information: string;
  habitat: string;
  category: string;
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
  const [selectedAnimal, setSelectedAnimal] = useState<LetterAnimal | null>(null);

  const allAnimals = [
    { letter: 'A', animal: 'Alligator', emoji: '🐊', fullName: 'American Alligator', information: 'Large reptiles with powerful jaws and armored bodies. They live in freshwater swamps and rivers.', habitat: 'Freshwater swamps, rivers, and marshes', category: 'Reptile' },
    { letter: 'B', animal: 'Bear', emoji: '🐻', fullName: 'Brown Bear', information: 'Large, powerful mammals with thick fur. They are omnivores and excellent swimmers.', habitat: 'Forests, mountains, and tundra', category: 'Mammal' },
    { letter: 'C', animal: 'Cat', emoji: '🐱', fullName: 'Domestic Cat', information: 'Small carnivorous mammals that are popular pets. They are excellent hunters with sharp claws.', habitat: 'Homes and urban areas', category: 'Pet' },
    { letter: 'D', animal: 'Dolphin', emoji: '🐬', fullName: 'Bottlenose Dolphin', information: 'Highly intelligent marine mammals known for their playful behavior and echolocation abilities.', habitat: 'Oceans and coastal waters', category: 'Marine Mammal' },
    { letter: 'E', animal: 'Elephant', emoji: '🐘', fullName: 'African Elephant', information: 'The largest land mammals with long trunks, large ears, and tusks. They are very intelligent and social.', habitat: 'African savannas and forests', category: 'Mammal' },
    { letter: 'F', animal: 'Fox', emoji: '🦊', fullName: 'Red Fox', information: 'Clever and adaptable small mammals with bushy tails. They are excellent hunters and problem solvers.', habitat: 'Forests, grasslands, and urban areas', category: 'Mammal' },
    { letter: 'G', animal: 'Giraffe', emoji: '🦒', fullName: 'Masai Giraffe', information: 'The tallest mammals in the world with long necks that help them reach high tree leaves.', habitat: 'African savannas', category: 'Mammal' },
    { letter: 'H', animal: 'Horse', emoji: '🐎', fullName: 'Arabian Horse', information: 'Strong and graceful animals that have been human companions for thousands of years.', habitat: 'Grasslands and farms', category: 'Domestic Animal' },
    { letter: 'I', animal: 'Iguana', emoji: '🦎', fullName: 'Green Iguana', information: 'Large lizards that can change color and are excellent swimmers. They love basking in the sun.', habitat: 'Tropical rainforests and beaches', category: 'Reptile' },
    { letter: 'J', animal: 'Jaguar', emoji: '🐆', fullName: 'South American Jaguar', information: 'Powerful big cats with the strongest bite of all felines. They are excellent swimmers.', habitat: 'Amazon rainforest and wetlands', category: 'Big Cat' },
    { letter: 'K', animal: 'Koala', emoji: '🐨', fullName: 'Australian Koala', information: 'Cute marsupials that sleep up to 20 hours a day and only eat eucalyptus leaves.', habitat: 'Eucalyptus forests in Australia', category: 'Marsupial' },
    { letter: 'L', animal: 'Lion', emoji: '🦁', fullName: 'African Lion', information: 'Majestic big cats known as the "King of the Jungle." They live in groups called prides.', habitat: 'African savannas and grasslands', category: 'Big Cat' },
    { letter: 'M', animal: 'Monkey', emoji: '🐵', fullName: 'Capuchin Monkey', information: 'Intelligent primates with long tails and nimble hands. They use tools and live in social groups.', habitat: 'Tropical rainforests', category: 'Primate' },
    { letter: 'N', animal: 'Narwhal', emoji: '🦄', fullName: 'Arctic Narwhal', information: 'Arctic whales famous for their long tusks. They are called "unicorns of the sea."', habitat: 'Arctic Ocean waters', category: 'Marine Mammal' },
    { letter: 'O', animal: 'Owl', emoji: '🦉', fullName: 'Great Horned Owl', information: 'Nocturnal birds of prey with excellent night vision and silent flight. They have large, forward-facing eyes.', habitat: 'Forests, deserts, and urban areas', category: 'Bird' },
    { letter: 'P', animal: 'Penguin', emoji: '🐧', fullName: 'Emperor Penguin', information: 'Flightless birds that are excellent swimmers. They live in colonies and slide on their bellies.', habitat: 'Antarctic ice and cold oceans', category: 'Bird' },
    { letter: 'Q', animal: 'Quail', emoji: '🐦', fullName: 'California Quail', information: 'Small ground birds with distinctive head plumes. They live in groups called coveys.', habitat: 'Grasslands and scrublands', category: 'Bird' },
    { letter: 'R', animal: 'Rabbit', emoji: '🐰', fullName: 'European Rabbit', information: 'Small mammals with long ears and powerful hind legs for hopping. They live in underground burrows.', habitat: 'Meadows, forests, and gardens', category: 'Mammal' },
    { letter: 'S', animal: 'Shark', emoji: '🦈', fullName: 'Great White Shark', information: 'Powerful ocean predators with sharp teeth and excellent senses. They have been around for millions of years.', habitat: 'Ocean waters worldwide', category: 'Fish' },
    { letter: 'T', animal: 'Tiger', emoji: '🐅', fullName: 'Siberian Tiger', information: 'The largest wild cats with distinctive orange and black stripes. Each tiger has a unique stripe pattern.', habitat: 'Asian forests and grasslands', category: 'Big Cat' },
    { letter: 'U', animal: 'Unicorn', emoji: '🦄', fullName: 'Mythical Unicorn', information: 'Magical creatures with a single horn, symbolizing purity and grace in many cultures and stories.', habitat: 'Enchanted forests and fairy tales', category: 'Mythical' },
    { letter: 'V', animal: 'Vulture', emoji: '🦅', fullName: 'Turkey Vulture', information: 'Large birds that help clean the environment by eating carrion. They have excellent eyesight.', habitat: 'Open areas and mountains', category: 'Bird' },
    { letter: 'W', animal: 'Whale', emoji: '🐋', fullName: 'Blue Whale', information: 'The largest animals ever known to have lived on Earth. They can communicate across vast ocean distances.', habitat: 'All oceans worldwide', category: 'Marine Mammal' },
    { letter: 'X', animal: 'X-ray Fish', emoji: '🐠', fullName: 'X-ray Tetra Fish', information: 'Small tropical fish with transparent bodies that allow you to see their internal organs.', habitat: 'Amazon River and tributaries', category: 'Fish' },
    { letter: 'Y', animal: 'Yak', emoji: '🐂', fullName: 'Tibetan Yak', information: 'Large, hairy cattle that live in high mountains. They provide milk, meat, and wool to mountain people.', habitat: 'Himalayan mountains and plateaus', category: 'Mammal' },
    { letter: 'Z', animal: 'Zebra', emoji: '🦓', fullName: 'Plains Zebra', information: 'Wild horses with distinctive black and white stripes. No two zebras have exactly the same stripe pattern.', habitat: 'African grasslands and savannas', category: 'Mammal' }
  ];

  const generateAnimals = () => {
    // Select 10 random animals from A-Z
    const shuffledAnimals = [...allAnimals].sort(() => Math.random() - 0.5).slice(0, 10);
    // Sort them alphabetically for gameplay
    shuffledAnimals.sort((a, b) => a.letter.localeCompare(b.letter));
    
    const newAnimals: LetterAnimal[] = [];

    shuffledAnimals.forEach((animal, index) => {
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
        fullName: animal.fullName,
        information: animal.information,
        habitat: animal.habitat,
        category: animal.category,
        x,
        y,
        found: false
      });
    });

    setAnimals(newAnimals);
    setTargetLetter(newAnimals[0]?.letter || 'A');
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setTimeLeft(90);
    setGameCompleted(false);
    setFoundLetters([]);
    setSelectedAnimal(null);
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
      setSelectedAnimal(animal);
      
      // Find next letter
      const sortedAnimals = animals.sort((a, b) => a.letter.localeCompare(b.letter));
      const currentIndex = sortedAnimals.findIndex(a => a.letter === targetLetter);
      const nextAnimal = sortedAnimals[currentIndex + 1];
      
      if (nextAnimal) {
        setTargetLetter(nextAnimal.letter);
      } else {
        // All animals found in this level
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 30);
        setFoundLetters([]);
        setTimeout(() => {
          generateAnimals();
          setSelectedAnimal(null);
        }, 3000);
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
    setSelectedAnimal(null);
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
            Find 10 amazing animals in alphabetical order! Look for the letter {targetLetter} next!
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
                <div className="font-comic text-gray-600">Find 10 amazing animals in alphabetical order!</div>
              </div>
            </div>
          )}
        </Card>

        {/* Animal Information Display */}
        {selectedAnimal && (
          <Card className="p-6 mb-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl shadow-xl animate-scale-in">
            <div className="flex items-start space-x-4">
              <div className="text-6xl">{selectedAnimal.emoji}</div>
              <div className="flex-1">
                <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
                  {selectedAnimal.fullName}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-comic text-gray-700 mb-3">{selectedAnimal.information}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className="bg-green-100 text-green-700 border-green-200">
                        {selectedAnimal.category}
                      </Badge>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        Letter {selectedAnimal.letter}
                      </Badge>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <div className="flex items-center mb-2">
                      <Info className="w-4 h-4 text-blue-600 mr-2" />
                      <span className="font-comic font-bold text-gray-700">Habitat:</span>
                    </div>
                    <p className="font-comic text-gray-600">{selectedAnimal.habitat}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {foundLetters.length > 0 && (
          <Card className="p-4 mb-8 bg-green-50 rounded-2xl">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Found Animals:</h3>
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
