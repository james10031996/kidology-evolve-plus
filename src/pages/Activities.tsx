
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Play, Star, Clock, Trophy, Zap } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

const Activities = () => {
  const { userData, updateStars } = useUser();

  const activities = {
    games: [
      {
        id: 'number-bubble',
        title: 'Number Bubble Pop',
        description: 'Pop bubbles in the right order to practice counting!',
        category: 'Math',
        difficulty: 2,
        duration: '5 min',
        bestScore: 850,
        playCount: 1200,
        gradient: 'gradient-blue',
        stars: 15
      },
      {
        id: 'letter-safari',
        title: 'Letter Safari',
        description: 'Find letters hiding in the jungle adventure!',
        category: 'English',
        difficulty: 1,
        duration: '7 min',
        bestScore: 650,
        playCount: 800,
        gradient: 'gradient-green',
        stars: 12
      },
      {
        id: 'memory-palace',
        title: 'Memory Palace',
        description: 'Train your brain with colorful memory challenges!',
        category: 'Memory',
        difficulty: 3,
        duration: '6 min',
        playCount: 450,
        gradient: 'gradient-purple',
        stars: 20
      },
      {
        id: 'shape-sorter',
        title: 'Shape Sorter',
        description: 'Sort shapes and learn geometry fundamentals!',
        category: 'Logic',
        difficulty: 2,
        duration: '4 min',
        bestScore: 720,
        playCount: 950,
        gradient: 'gradient-pink',
        stars: 10
      }
    ],
    stories: [
      {
        id: 'magic-forest',
        title: 'The Magic Forest Adventure',
        description: 'Join Luna the fairy through the enchanted forest!',
        difficulty: 'Easy',
        duration: '5 min',
        rating: 4.9,
        category: 'Fantasy',
        isNew: true,
        stars: 25
      },
      {
        id: 'space-explorer',
        title: 'Space Explorer Mission',
        description: 'Blast off with Captain Cosmo to explore space!',
        difficulty: 'Medium',
        duration: '7 min',
        rating: 4.8,
        category: 'Science',
        stars: 30
      },
      {
        id: 'underwater-treasure',
        title: 'Underwater Treasure Hunt',
        description: 'Dive deep with Finny to discover ocean mysteries!',
        difficulty: 'Easy',
        duration: '6 min',
        rating: 4.7,
        category: 'Adventure',
        stars: 20
      }
    ],
    creative: [
      {
        id: 'paint-studio',
        title: 'Magic Paint Studio',
        description: 'Create beautiful artworks with magical brushes!',
        category: 'Art',
        difficulty: 1,
        duration: '15 min',
        tools: ['Brushes', 'Colors', 'Stickers'],
        gradient: 'gradient-pink',
        stars: 35
      },
      {
        id: 'music-maker',
        title: 'Music Maker',
        description: 'Compose melodies and learn about rhythm!',
        category: 'Music',
        difficulty: 2,
        duration: '12 min',
        tools: ['Piano', 'Drums', 'Recorder'],
        gradient: 'gradient-purple',
        stars: 30
      },
      {
        id: 'story-builder',
        title: 'Story Builder',
        description: 'Create your own interactive stories!',
        category: 'Writing',
        difficulty: 3,
        duration: '20 min',
        tools: ['Characters', 'Backgrounds', 'Text'],
        gradient: 'gradient-blue',
        stars: 40
      }
    ]
  };

  const playActivity = (activityId: string, stars: number) => {
    updateStars(stars);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            🎮 Fun Learning Activities
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Play games, read stories, and create amazing things while learning!
          </p>
        </div>

        <Tabs defaultValue="games" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="games" className="rounded-full font-comic font-bold">
              🎮 Games
            </TabsTrigger>
            <TabsTrigger value="stories" className="rounded-full font-comic font-bold">
              📚 Stories
            </TabsTrigger>
            <TabsTrigger value="creative" className="rounded-full font-comic font-bold">
              🎨 Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="games">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activities.games.map((game) => (
                <Card key={game.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-full h-24 ${game.gradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                    <div className="text-3xl text-white animate-bounce">
                      {game.category === 'Math' && '🔢'}
                      {game.category === 'English' && '📝'}
                      {game.category === 'Memory' && '🧠'}
                      {game.category === 'Logic' && '🧩'}
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
                    onClick={() => playActivity(game.id, game.stars)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Play Now
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.stories.map((story) => (
                <Card key={story.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="relative mb-4">
                    <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                      <div className="text-4xl">
                        {story.category === 'Fantasy' && '🧚‍♀️'}
                        {story.category === 'Science' && '🚀'}
                        {story.category === 'Adventure' && '🏴‍☠️'}
                      </div>
                    </div>
                    {story.isNew && (
                      <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-comic animate-pulse">
                        New!
                      </Badge>
                    )}
                  </div>

                  <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="font-comic text-gray-600 text-sm mb-4">
                    {story.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="font-comic text-xs">
                        {story.difficulty}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-gray-500" />
                        <span className="font-comic text-xs text-gray-600">{story.duration}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="font-comic text-xs font-bold">{story.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="font-comic text-xs font-bold text-yellow-600">{story.stars} stars</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                    onClick={() => playActivity(story.id, story.stars)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Read Story
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.creative.map((activity) => (
                <Card key={activity.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-full h-32 ${activity.gradient} rounded-xl mb-4 flex items-center justify-center`}>
                    <div className="text-4xl text-white">
                      {activity.category === 'Art' && '🎨'}
                      {activity.category === 'Music' && '🎵'}
                      {activity.category === 'Writing' && '✍️'}
                    </div>
                  </div>

                  <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="font-comic text-gray-600 text-sm mb-4">
                    {activity.description}
                  </p>

                  <div className="mb-4">
                    <p className="font-comic text-xs text-gray-600 mb-2">Tools available:</p>
                    <div className="flex flex-wrap gap-1">
                      {activity.tools.map((tool, index) => (
                        <Badge key={index} className="bg-gray-100 text-gray-700 text-xs font-comic">
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-comic text-xs text-gray-600">Duration:</span>
                      <span className="font-comic text-xs font-bold">{activity.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-comic text-xs text-gray-600">Reward:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="font-comic text-xs font-bold text-yellow-600">{activity.stars}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${activity.gradient} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                    onClick={() => playActivity(activity.id, activity.stars)}
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Creating
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Daily Challenge */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-orange-500 animate-bounce" />
            <h3 className="font-fredoka font-bold text-2xl text-gray-800">
              Daily Challenge
            </h3>
          </div>
          <p className="font-comic text-gray-700 mb-4">
            Complete 3 activities today to earn a special bonus reward!
          </p>
          <div className="flex justify-center">
            <Badge className="gradient-orange text-white font-comic font-bold px-4 py-2">
              +100 Bonus Stars Available!
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;
