
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveStoryCard from './InteractiveStoryCard';
import MiniGameCard from './MiniGameCard';
import VirtualPet from './VirtualPet';
import RewardsCenter from './RewardsCenter';
import { BookOpen, Gamepad2, Star, Gift } from 'lucide-react';

const ActivitySection = () => {
  const stories = [
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy on an exciting journey through the enchanted forest where numbers come alive!',
      difficulty: 'Easy' as const,
      duration: '5 min',
      rating: 4.9,
      category: 'Fantasy',
      isNew: true
    },
    {
      id: '2',
      title: 'Space Explorer Mission',
      description: 'Blast off with Captain Cosmo and learn about planets, stars, and the wonders of space!',
      difficulty: 'Medium' as const,
      duration: '7 min',
      rating: 4.8,
      category: 'Science'
    },
    {
      id: '3',
      title: 'Underwater Treasure Hunt',
      description: 'Dive deep with Finny the fish to discover hidden treasures and ocean mysteries!',
      difficulty: 'Easy' as const,
      duration: '6 min',
      rating: 4.7,
      category: 'Adventure'
    }
  ];

  const miniGames = [
    {
      id: '1',
      title: 'Number Bubble Pop',
      description: 'Pop bubbles in the right order to practice counting and number recognition!',
      category: 'Math' as const,
      difficulty: 2,
      bestScore: 850,
      playCount: 1200,
      gradient: 'gradient-blue'
    },
    {
      id: '2',
      title: 'Letter Safari',
      description: 'Go on a wild adventure to find letters hiding in the jungle!',
      category: 'English' as const,
      difficulty: 1,
      bestScore: 650,
      playCount: 800,
      gradient: 'gradient-green'
    },
    {
      id: '3',
      title: 'Memory Palace',
      description: 'Train your brain with fun memory challenges and colorful patterns!',
      category: 'Memory' as const,
      difficulty: 3,
      playCount: 450,
      gradient: 'gradient-purple'
    },
    {
      id: '4',
      title: 'Shape Sorter',
      description: 'Sort shapes into the right places and learn geometry fundamentals!',
      category: 'Logic' as const,
      difficulty: 2,
      bestScore: 720,
      playCount: 950,
      gradient: 'gradient-pink',
      isLocked: true
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Fun Learning Activities
          </h2>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Discover magical stories, play exciting games, and earn amazing rewards while learning!
          </p>
        </div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger 
              value="stories" 
              className="rounded-full font-comic font-bold data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Stories
            </TabsTrigger>
            <TabsTrigger 
              value="games" 
              className="rounded-full font-comic font-bold data-[state=active]:gradient-blue data-[state=active]:text-white"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger 
              value="pet" 
              className="rounded-full font-comic font-bold data-[state=active]:gradient-green data-[state=active]:text-white"
            >
              🐾 Pet
            </TabsTrigger>
            <TabsTrigger 
              value="rewards" 
              className="rounded-full font-comic font-bold data-[state=active]:gradient-orange data-[state=active]:text-white"
            >
              <Gift className="w-4 h-4 mr-2" />
              Rewards
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stories.map((story) => (
                <InteractiveStoryCard key={story.id} {...story} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="games">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {miniGames.map((game) => (
                <MiniGameCard key={game.id} {...game} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pet">
            <div className="max-w-md mx-auto">
              <VirtualPet />
            </div>
          </TabsContent>

          <TabsContent value="rewards">
            <div className="max-w-lg mx-auto">
              <RewardsCenter />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ActivitySection;
