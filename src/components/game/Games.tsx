
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Star, Clock, Trophy, Zap, Brain, Target } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

const Games = () => {
  const { userData, updateStars } = useUser();
  const navigate = useNavigate();

  const mathGames = [
    {
      id: 'number-bubble',
      title: 'Number Bubble Pop',
      description: 'Pop bubbles in the right order to practice counting!',
      difficulty: 2,
      duration: '5 min',
      bestScore: 850,
      playCount: 1200,
      gradient: 'gradient-blue',
      stars: 15,
      route: '/activities/number-bubble-pop',
      icon: '🫧'
    }
  ];

  const languageGames = [
    {
      id: 'letter-safari',
      title: 'Letter Safari',
      description: 'Find letters hiding in the jungle adventure!',
      difficulty: 1,
      duration: '7 min',
      bestScore: 650,
      playCount: 800,
      gradient: 'gradient-green',
      stars: 12,
      route: '/activities/letter-safari',
      icon: '🦁'
    }
  ];

  const memoryGames = [
    {
      id: 'memory-palace',
      title: 'Memory Palace',
      description: 'Train your brain with colorful memory challenges!',
      difficulty: 3,
      duration: '6 min',
      playCount: 450,
      gradient: 'gradient-purple',
      stars: 20,
      route: '/activities/memory-palace',
      icon: '🧠'
    }
  ];

  const logicGames = [
    {
      id: 'shape-sorter',
      title: 'Shape Sorter',
      description: 'Sort shapes and learn geometry fundamentals!',
      difficulty: 2,
      duration: '4 min',
      bestScore: 720,
      playCount: 950,
      gradient: 'gradient-pink',
      stars: 10,
      route: '/activities/shape-sorter',
      icon: '🔷'
    }
  ];

  const SearchMissingObject = [
    {
      id: 'search-missing-object',
      title: 'Search Missing Object',
      description: 'Search the missing object, find and drag to correct position!',
      difficulty: 2,
      duration: '4 min',
      bestScore: 720,
      playCount: 950,
      gradient: 'bg-gradient-to-r from-purple-300 via-violet-400 to-pink-500',
      stars: 10,
      route: '/games/search-missing-object',
      icon: '🔷'
    }
  ];

  const PuzzleAssembly = [
    {
      id: 'puzzle-assembly',
      title: 'Shape Sorter',
      description: 'Drag the puzzle pieces to the right location!',
      difficulty: 2,
      duration: '4 min',
      bestScore: 720,
      playCount: 950,
      gradient: 'bg-gradient-to-r from-yellow-300 via-pink-500 to-orange-600',
      stars: 10,
      route: '/games/puzzle-assembly',
      icon: '🔷'
    }
  ];


  const allGames = [...mathGames, ...languageGames, ...memoryGames, ...logicGames, ...SearchMissingObject, ...PuzzleAssembly];

  const playGame = (game: any) => {
    if (game.route) {
      navigate(game.route);
    } else {
      updateStars(game.stars);
    }
  };

  const GameCard = ({ game }: { game: any }) => (
    <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className={`w-full h-24 ${game.gradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
        <div className="text-3xl text-white animate-bounce">
          {game.icon}
        </div>
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/20 text-white font-comic text-xs">
            Level {game.difficulty}
          </Badge>
        </div>
      </div>

      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {game.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {game.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-comic text-xs text-gray-600">Duration:</span>
          <span className="font-comic text-xs font-bold">{game.duration}</span>
        </div>
        {game.bestScore && (
          <div className="flex justify-between items-center">
            <span className="font-comic text-xs text-gray-600">Best Score:</span>
            <span className="font-comic text-xs font-bold text-yellow-600">{game.bestScore}</span>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="font-comic text-xs text-gray-600">Reward:</span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-500 fill-current" />
            <span className="font-comic text-xs font-bold text-yellow-600">{game.stars}</span>
          </div>
        </div>
      </div>

      <Button 
        className={`w-full ${game.gradient} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
        onClick={() => playGame(game)}
      >
        <Play className="w-4 h-4 mr-2" />
        Play Now
      </Button>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            🎮 Learning Games
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Play fun educational games and challenge your brain while learning!
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="all" className="rounded-full font-comic font-bold">
              🎯 All
            </TabsTrigger>
            <TabsTrigger value="math" className="rounded-full font-comic font-bold">
              🔢 Math
            </TabsTrigger>
            <TabsTrigger value="language" className="rounded-full font-comic font-bold">
              📝 Language
            </TabsTrigger>
            <TabsTrigger value="memory" className="rounded-full font-comic font-bold">
              🧠 Memory
            </TabsTrigger>
            <TabsTrigger value="logic" className="rounded-full font-comic font-bold">
              🧩 Logic
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="math">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mathGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="language">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {languageGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="memory">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {memoryGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="logic">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {logicGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Daily Challenge */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-orange-500 animate-bounce" />
            <h3 className="font-fredoka font-bold text-2xl text-gray-800">
              Daily Game Challenge
            </h3>
          </div>
          <p className="font-comic text-gray-700 mb-4">
            Complete 3 different games today to earn a special bonus reward!
          </p>
          <div className="flex justify-center">
            <Badge className="gradient-orange text-white font-comic font-bold px-4 py-2">
              +150 Bonus Stars Available!
            </Badge>
          </div>
        </div>

        {/* Game Categories Info */}
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Math Games</h3>
            <p className="font-comic text-sm text-gray-600">Practice numbers, counting, and basic arithmetic</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl text-center">
            <Zap className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Language</h3>
            <p className="font-comic text-sm text-gray-600">Learn letters, words, and reading skills</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl text-center">
            <Brain className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Memory</h3>
            <p className="font-comic text-sm text-gray-600">Train your brain and improve concentration</p>
          </Card>
          
          <Card className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl text-center">
            <Trophy className="w-12 h-12 text-pink-600 mx-auto mb-4" />
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">Logic</h3>
            <p className="font-comic text-sm text-gray-600">Develop problem-solving and reasoning skills</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Games;
