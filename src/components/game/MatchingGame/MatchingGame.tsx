import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Target, RotateCcw, ChevronDown, CheckCircle, Star, Trophy, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import { categories } from './matchingGameData';


const MatchingGame = () => {
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState('body');
  const [selectedObject, setSelectedObject] = useState<string | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, Record<string, boolean>>>({});
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<{ type: string, message: string, emoji: string } | null>(null);
  const [gameComplete, setGameComplete] = useState(false);

  const currentCategoryData = categories.find(c => c.id === currentCategory);
  const categoryMatches = matches[currentCategory] || {};

  useEffect(() => {
    // Check if game is complete
    if (currentCategoryData && Object.keys(categoryMatches).length === currentCategoryData.items.length) {
      setGameComplete(true);
      setTimeout(() => setGameComplete(false), 3000);
    }
  }, [categoryMatches, currentCategoryData]);

  const handleObjectClick = (item: any) => {
    if (categoryMatches[item.id]) return; // Already matched

    if (selectedName && selectedName === item.name) {
      // Correct match!
      setMatches(prev => ({
        ...prev,
        [currentCategory]: {
          ...prev[currentCategory],
          [item.id]: true
        }
      }));
      setScore(prev => prev + 10);
      setShowFeedback({ type: 'success', message: item.sound, emoji: '🎉' });
      setSelectedObject(null);
      setSelectedName(null);
    } else if (selectedName) {
      // Wrong match
      setShowFeedback({ type: 'error', message: 'Try again! 🤔', emoji: '❌' });
      setSelectedObject(null);
      setSelectedName(null);
    } else {
      setSelectedObject(item.id);
    }

    if (showFeedback) {
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  const handleNameClick = (name: string) => {
    if (Object.values(categoryMatches).length >= (currentCategoryData?.items.length || 0)) return;

    if (selectedObject) {
      const objectItem = currentCategoryData?.items.find(item => item.id === selectedObject);
      if (objectItem && objectItem.name === name) {
        // Correct match!
        setMatches(prev => ({
          ...prev,
          [currentCategory]: {
            ...prev[currentCategory],
            [selectedObject]: true
          }
        }));
        setScore(prev => prev + 10);
        setShowFeedback({ type: 'success', message: objectItem.sound, emoji: '🎉' });
        setSelectedObject(null);
        setSelectedName(null);
      } else {
        // Wrong match
        setShowFeedback({ type: 'error', message: 'Try again! 🤔', emoji: '❌' });
        setSelectedObject(null);
        setSelectedName(null);
      }
    } else {
      setSelectedName(name);
    }

    if (showFeedback) {
      setTimeout(() => setShowFeedback(null), 2000);
    }
  };

  const resetGame = () => {
    setMatches(prev => ({
      ...prev,
      [currentCategory]: {}
    }));
    setSelectedObject(null);
    setSelectedName(null);
    setShowFeedback(null);
  };

  const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const shuffledItems = currentCategoryData ? shuffleArray(currentCategoryData.items) : [];
  const shuffledNames = currentCategoryData ? shuffleArray(currentCategoryData.items.map(item => item.name)) : [];
  const [open, setOpen] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-0 shadow-lg">
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
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <Target className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🎯 Matching Game
          </h2>
          <p className="font-comic text-gray-600">
            Match objects with their names and learn new words!
          </p>
          <div className="mt-3 flex items-center justify-center space-x-4">
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-comic font-bold">
              <Star className="w-4 h-4 inline mr-1" />
              Score: {score}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Category Selection */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 flex items-center justify-between">
        🎪 Categories
        <button
          onClick={() => setOpen(!open)}
          className="text-sm text-blue-500 hover:underline flex items-center"
        >
          {open ? 'Hide' : 'Choose'} <ChevronDown className="ml-1 w-4 h-4 transition-transform duration-200" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0)' }} />
        </button>
      </h3>

      {/* Dropdown content */}
      {open && (
        <div className="space-y-3 transition-all duration-300 ease-in-out max-h-[500px] overflow-y-auto">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`p-3 cursor-pointer transition-all transform hover:scale-105 border-2 ${
                currentCategory === category.id
                  ? 'border-purple-400 bg-purple-50 shadow-lg'
                  : 'border-gray-200 hover:border-purple-300'
              }`}
              onClick={() => {
                setCurrentCategory(category.id);
                setOpen(false); // close dropdown on selection
              }}
            >
              <div className="text-center space-y-1">
                <div className="text-2xl">{category.emoji}</div>
                <h4 className="font-comic font-bold text-sm text-gray-800">{category.name}</h4>
                {matches[category.id] &&
                  Object.keys(matches[category.id]).length === category.items.length && (
                    <Badge className="bg-green-100 text-green-700 font-comic text-xs">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Complete!
                    </Badge>
                  )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Instructions Section */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4">
        <h4 className="font-comic font-bold text-blue-800 mb-2">📝 How to Play:</h4>
        <ol className="font-comic text-sm text-blue-700 space-y-1">
          <li>1. Click an object</li>
          <li>2. Click its matching name</li>
          <li>3. Get points for correct matches!</li>
          <li>4. Complete all categories! 🏆</li>
        </ol>
      </div>
    </Card>

        {/* Objects Area */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-fredoka font-bold text-lg text-gray-800">
              🎭 Objects
            </h3>
            <Button size="sm" variant="outline" onClick={resetGame} className="rounded-full">
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {shuffledItems.map((item) => (
              <Card
                key={item.id}
                className={`p-4 cursor-pointer transition-all transform hover:scale-105 border-2 ${categoryMatches[item.id]
                    ? 'border-green-400 bg-green-50'
                    : selectedObject === item.id
                      ? 'border-blue-400 bg-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                onClick={() => handleObjectClick(item)}
              >
                <div className="text-center space-y-2">
                  <div className="text-4xl">{item.emoji}</div>
                  {categoryMatches[item.id] && (
                    <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Names Area */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            📝 Names
          </h3>

          <div className="space-y-3">
            {shuffledNames.map((name, index) => {
              const isMatched = Object.keys(categoryMatches).some(itemId => {
                const item = currentCategoryData?.items.find(i => i.id === itemId);
                return item?.name === name && categoryMatches[itemId];
              });

              return (
                <Card
                  key={`${name}-${index}`}
                  className={`p-3 cursor-pointer transition-all transform hover:scale-105 border-2 ${isMatched
                      ? 'border-green-400 bg-green-50'
                      : selectedName === name
                        ? 'border-blue-400 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  onClick={() => !isMatched && handleNameClick(name)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-comic font-bold text-gray-800">{name}</span>
                    {isMatched && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </div>
                </Card>
              );
            })}
          </div>
        </Card>

        {/* Progress & Feedback */}
        <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
            📊 Progress
          </h3>

          {/* Current Category Progress */}
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-comic font-bold text-purple-800">
                  {currentCategoryData?.name}
                </span>
                <span className="font-comic text-sm text-purple-600">
                  {Object.keys(categoryMatches).length}/{currentCategoryData?.items.length || 0}
                </span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-3">
                <div
                  className="bg-purple-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${currentCategoryData ? (Object.keys(categoryMatches).length / currentCategoryData.items.length) * 100 : 0}%`
                  }}
                />
              </div>
            </div>

            {/* Overall Progress */}
            <div className="bg-yellow-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-comic font-bold text-yellow-800">🏆 Total Progress</span>
                <span className="font-comic text-sm text-yellow-600">
                  {Object.values(matches).reduce((total: number, cat: Record<string, boolean>) => total + Object.keys(cat).length, 0)}/
                  {categories.reduce((total, cat) => total + cat.items.length, 0)}
                </span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-3">
                <div
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${(Object.values(matches).reduce((total: number, cat: Record<string, boolean>) => total + Object.keys(cat).length, 0) / categories.reduce((total, cat) => total + cat.items.length, 0)) * 100}%`
                  }}
                />
              </div>
            </div>

            {/* Feedback Area */}
            {showFeedback && (
              <div className={`rounded-xl p-4 text-center animate-pulse-soft ${showFeedback.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
                }`}>
                <div className="text-2xl mb-1">{showFeedback.emoji}</div>
                <p className="font-comic font-bold">{showFeedback.message}</p>
              </div>
            )}

            {/* Game Complete Celebration */}
            {gameComplete && (
              <div className="bg-green-50 rounded-xl p-4 text-center animate-bounce-gentle">
                <div className="text-4xl mb-2">🎉</div>
                <div className="text-green-800 font-comic font-bold">
                  <Trophy className="w-5 h-5 inline mr-2" />
                  Category Complete!
                </div>
                <p className="font-comic text-green-700 text-sm mt-1">
                  Amazing job! Try another category!
                </p>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MatchingGame;
