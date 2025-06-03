
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Star, Trophy, Volume2, ArrowRight, CheckCircle } from 'lucide-react';

const GeneralKnowledge = () => {
  const [currentCategory, setCurrentCategory] = useState('alphabets');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [completedItems, setCompletedItems] = useState(new Set());
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  const categories = [
    {
      id: 'alphabets',
      name: 'Alphabets',
      emoji: '🔤',
      description: 'Learn letters with fun examples!',
      color: 'bg-blue-50',
      items: [
        { letter: 'A', word: 'Apple', emoji: '🍎', sound: 'A is for Apple!', fact: 'Apples come in many colors!' },
        { letter: 'B', word: 'Butterfly', emoji: '🦋', sound: 'B is for Butterfly!', fact: 'Butterflies taste with their feet!' },
        { letter: 'C', word: 'Cat', emoji: '🐱', sound: 'C is for Cat!', fact: 'Cats sleep 12-16 hours a day!' },
        { letter: 'D', word: 'Dog', emoji: '🐶', sound: 'D is for Dog!', fact: 'Dogs have amazing sense of smell!' },
        { letter: 'E', word: 'Elephant', emoji: '🐘', sound: 'E is for Elephant!', fact: 'Elephants never forget!' }
      ]
    },
    {
      id: 'body',
      name: 'Body Parts',
      emoji: '👤',
      description: 'Discover your amazing body!',
      color: 'bg-pink-50',
      items: [
        { name: 'Eyes', emoji: '👀', sound: 'These are your eyes!', fact: 'You blink about 20 times per minute!' },
        { name: 'Heart', emoji: '❤️', sound: 'This is your heart!', fact: 'Your heart beats 100,000 times a day!' },
        { name: 'Brain', emoji: '🧠', sound: 'This is your brain!', fact: 'Your brain uses 20% of your energy!' },
        { name: 'Hands', emoji: '✋', sound: 'These are your hands!', fact: 'You have 27 bones in each hand!' },
        { name: 'Feet', emoji: '🦶', sound: 'These are your feet!', fact: 'Your feet have 26 bones each!' }
      ]
    },
    {
      id: 'animals',
      name: 'Animals',
      emoji: '🐾',
      description: 'Meet amazing animals!',
      color: 'bg-green-50',
      items: [
        { name: 'Lion', emoji: '🦁', sound: 'Lions are the king of jungle!', fact: 'Lions can sleep 20 hours a day!' },
        { name: 'Giraffe', emoji: '🦒', sound: 'Giraffes are very tall!', fact: 'Giraffes have the same number of neck bones as humans!' },
        { name: 'Penguin', emoji: '🐧', sound: 'Penguins love to swim!', fact: 'Penguins can hold their breath for 20 minutes!' },
        { name: 'Monkey', emoji: '🐵', sound: 'Monkeys are very playful!', fact: 'Some monkeys can use tools!' },
        { name: 'Zebra', emoji: '🦓', sound: 'Zebras have beautiful stripes!', fact: 'Each zebra has a unique stripe pattern!' }
      ]
    },
    {
      id: 'ocean',
      name: 'Ocean Creatures',
      emoji: '🌊',
      description: 'Explore the deep blue sea!',
      color: 'bg-cyan-50',
      items: [
        { name: 'Whale', emoji: '🐋', sound: 'Whales are gentle giants!', fact: 'Blue whales are the largest animals ever!' },
        { name: 'Dolphin', emoji: '🐬', sound: 'Dolphins are very smart!', fact: 'Dolphins recognize themselves in mirrors!' },
        { name: 'Octopus', emoji: '🐙', sound: 'Octopuses have eight arms!', fact: 'Octopuses have three hearts!' },
        { name: 'Starfish', emoji: '⭐', sound: 'Starfish live on ocean floor!', fact: 'Starfish can regrow their arms!' },
        { name: 'Seahorse', emoji: '🐴', sound: 'Seahorses are unique fish!', fact: 'Male seahorses carry the babies!' }
      ]
    },
    {
      id: 'nature',
      name: 'Nature',
      emoji: '🌳',
      description: 'Learn about our beautiful nature!',
      color: 'bg-emerald-50',
      items: [
        { name: 'Tree', emoji: '🌳', sound: 'Trees give us oxygen!', fact: 'Trees can live for thousands of years!' },
        { name: 'Flower', emoji: '🌸', sound: 'Flowers are beautiful!', fact: 'Flowers attract bees with their colors!' },
        { name: 'Rainbow', emoji: '🌈', sound: 'Rainbows have seven colors!', fact: 'Rainbows are circles, but we see arcs!' },
        { name: 'Sun', emoji: '☀️', sound: 'The sun gives us light!', fact: 'The sun is a giant star!' },
        { name: 'Moon', emoji: '🌙', sound: 'The moon shines at night!', fact: 'The moon controls ocean tides!' }
      ]
    },
    {
      id: 'objects',
      name: 'Everyday Objects',
      emoji: '🏠',
      description: 'Things we use every day!',
      color: 'bg-orange-50',
      items: [
        { name: 'Book', emoji: '📚', sound: 'Books help us learn!', fact: 'The first books were made on clay tablets!' },
        { name: 'Car', emoji: '🚗', sound: 'Cars help us travel!', fact: 'The first car was invented in 1885!' },
        { name: 'Bicycle', emoji: '🚲', sound: 'Bicycles are fun to ride!', fact: 'Bicycles are the most efficient way to travel!' },
        { name: 'Phone', emoji: '📱', sound: 'Phones help us talk to people!', fact: 'The first mobile phone weighed 2 pounds!' },
        { name: 'Clock', emoji: '🕐', sound: 'Clocks tell us the time!', fact: 'Ancient people used sundials to tell time!' }
      ]
    }
  ];

  const currentCategoryData = categories.find(c => c.id === currentCategory);
  const currentItem = currentCategoryData?.items[currentLevel];

  const playSound = (text: string) => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (!currentCategoryData) return;
    
    if (currentLevel < currentCategoryData.items.length - 1) {
      setCurrentLevel(prev => prev + 1);
    } else {
      setCurrentLevel(0);
    }
    setShowAnswer(false);
  };

  const handleReveal = () => {
    setShowAnswer(true);
    setCompletedItems(prev => new Set([...prev, `${currentCategory}-${currentLevel}`]));
    setScore(prev => prev + 10);
    if (currentItem) {
      playSound(currentItem.sound);
    }
  };

  const resetCategory = () => {
    setCurrentLevel(0);
    setShowAnswer(false);
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      currentCategoryData?.items.forEach((_, index) => {
        newSet.delete(`${currentCategory}-${index}`);
      });
      return newSet;
    });
  };

  const categoryProgress = currentCategoryData ? 
    currentCategoryData.items.filter((_, index) => 
      completedItems.has(`${currentCategory}-${index}`)
    ).length : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🧠 General Knowledge Adventure
          </h2>
          <p className="font-comic text-gray-600">
            Discover amazing facts and learn new things every day!
          </p>
          <div className="mt-3 flex items-center justify-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
              <Star className="w-4 h-4 inline mr-1" />
              Score: {score}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-comic font-bold">
              <Trophy className="w-4 h-4 inline mr-1" />
              Items Learned: {completedItems.size}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Category Selection */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            📚 Choose Topic
          </h3>
          
          <div className="space-y-3">
            {categories.map((category) => (
              <Card
                key={category.id}
                className={`p-4 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                  currentCategory === category.id 
                    ? 'border-purple-400 bg-purple-50 shadow-lg' 
                    : 'border-gray-200 hover:border-purple-300'
                }`}
                onClick={() => {
                  setCurrentCategory(category.id);
                  setCurrentLevel(0);
                  setShowAnswer(false);
                }}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{category.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-comic font-bold text-gray-800">{category.name}</h4>
                    <p className="font-comic text-xs text-gray-600">{category.description}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="w-16 bg-gray-200 rounded-full h-1">
                        <div 
                          className="bg-purple-500 h-1 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${category.items.filter((_, index) => 
                              completedItems.has(`${category.id}-${index}`)
                            ).length / category.items.length * 100}%` 
                          }}
                        />
                      </div>
                      <span className="font-comic text-xs text-gray-500">
                        {category.items.filter((_, index) => 
                          completedItems.has(`${category.id}-${index}`)
                        ).length}/{category.items.length}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-purple-800">🌟 Total Progress</span>
              <span className="font-comic text-sm text-purple-600">
                {completedItems.size}/{categories.reduce((total, cat) => total + cat.items.length, 0)}
              </span>
            </div>
            <div className="w-full bg-purple-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                style={{ 
                  width: `${(completedItems.size / categories.reduce((total, cat) => total + cat.items.length, 0)) * 100}%` 
                }}
              />
            </div>
          </div>
        </Card>

        {/* Learning Area */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-fredoka font-bold text-lg text-gray-800">
              🎓 Learning Zone
            </h3>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={resetCategory} className="rounded-full">
                Reset Topic
              </Button>
            </div>
          </div>

          {currentItem && (
            <div className="space-y-6">
              {/* Current Item Display */}
              <div className={`${currentCategoryData?.color} rounded-2xl p-6 text-center`}>
                <div className="text-8xl mb-4">{currentItem.emoji}</div>
                
                {currentCategory === 'alphabets' ? (
                  <div className="space-y-2">
                    <h2 className="font-fredoka font-bold text-4xl text-gray-800">
                      {currentItem.letter}
                    </h2>
                    {showAnswer && (
                      <div className="animate-fade-in">
                        <h3 className="font-comic font-bold text-2xl text-gray-700">
                          {currentItem.word}
                        </h3>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h2 className="font-fredoka font-bold text-3xl text-gray-800">
                      {showAnswer ? currentItem.name : '???'}
                    </h2>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex justify-center space-x-3">
                  {!showAnswer ? (
                    <Button onClick={handleReveal} className="rounded-full gradient-purple text-white">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Reveal & Learn!
                    </Button>
                  ) : (
                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => playSound(currentItem.sound)} 
                        variant="outline" 
                        className="rounded-full"
                      >
                        <Volume2 className="w-4 h-4 mr-1" />
                        Play Sound
                      </Button>
                      <Button onClick={handleNext} className="rounded-full gradient-blue text-white">
                        Next
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  )}
                </div>

                {/* Fun Fact */}
                {showAnswer && (
                  <div className="mt-6 bg-white bg-opacity-70 rounded-xl p-4 animate-fade-in">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="w-5 h-5 text-yellow-600 mr-2" />
                      <span className="font-comic font-bold text-yellow-800">Fun Fact!</span>
                    </div>
                    <p className="font-comic text-gray-700">{currentItem.fact}</p>
                  </div>
                )}
              </div>

              {/* Progress Indicator */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-comic font-bold text-gray-800">
                    {currentCategoryData?.name} Progress
                  </span>
                  <span className="font-comic text-sm text-gray-600">
                    {currentLevel + 1}/{currentCategoryData?.items.length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${((currentLevel + 1) / (currentCategoryData?.items.length || 1)) * 100}%` }}
                  />
                </div>
                <div className="mt-2 text-center">
                  <span className="font-comic text-xs text-gray-600">
                    Items completed: {categoryProgress}/{currentCategoryData?.items.length}
                  </span>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Knowledge Bank */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            🏆 Knowledge Bank
          </h3>

          <div className="space-y-4">
            {/* Recently Learned */}
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-green-800 mb-3 flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Recently Learned
              </h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {Array.from(completedItems).slice(-5).reverse().map((itemKey) => {
                  const [catId, levelStr] = itemKey.split('-');
                  const level = parseInt(levelStr);
                  const category = categories.find(c => c.id === catId);
                  const item = category?.items[level];
                  
                  return item ? (
                    <div key={itemKey} className="flex items-center space-x-2 bg-white rounded-lg p-2">
                      <span className="text-lg">{item.emoji}</span>
                      <span className="font-comic text-sm font-bold text-gray-700">
                        {catId === 'alphabets' ? `${item.letter} - ${item.word}` : item.name}
                      </span>
                    </div>
                  ) : null;
                })}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-yellow-800 mb-3 flex items-center">
                <Trophy className="w-4 h-4 mr-2" />
                Achievements
              </h4>
              <div className="space-y-2">
                {completedItems.size >= 5 && (
                  <Badge className="bg-yellow-100 text-yellow-800 font-comic text-xs">
                    🌟 Curious Learner - Learned 5 items!
                  </Badge>
                )}
                {completedItems.size >= 15 && (
                  <Badge className="bg-orange-100 text-orange-800 font-comic text-xs">
                    🧠 Smart Student - Learned 15 items!
                  </Badge>
                )}
                {completedItems.size >= 30 && (
                  <Badge className="bg-purple-100 text-purple-800 font-comic text-xs">
                    👑 Knowledge Master - Learned 30 items!
                  </Badge>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-blue-800 mb-2">📖 How to Learn:</h4>
              <ol className="font-comic text-sm text-blue-700 space-y-1">
                <li>1. Choose a topic you want to explore</li>
                <li>2. Click "Reveal & Learn!" to discover</li>
                <li>3. Listen to sounds and read fun facts</li>
                <li>4. Collect knowledge and earn achievements!</li>
              </ol>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GeneralKnowledge;
