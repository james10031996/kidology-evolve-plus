import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveStoryCard from './InteractiveStoryCard';
import MiniGameCard from './MiniGameCard';
import VirtualPet from './VirtualPet';
import RewardsCenter from './RewardsCenter';
import CreativeArtStudio from './CreativeArtStudio';
import STEMLab from './STEMLab';
import LanguageLab from './LanguageLab';
import SocialEmotionalLearning from './SocialEmotionalLearning';
import InteractiveMath from './InteractiveMath';
import ReadingAdventures from './ReadingAdventures';
import ScienceExperiments from './ScienceExperiments';
import MusicMovement from './MusicMovement';
import CodingForKids from './CodingForKids';
import GeographyExplorer from './GeographyExplorer';
import Paint from './Paint';
import PuzzleAssembly from './PuzzleAssembly';
import MatchingGame from './MatchingGame';
import GeneralKnowledge from './GeneralKnowledge';
import { BookOpen, Gamepad2, Star, Gift, Palette, Beaker, Globe2, Heart, Calculator, Music, Monitor, MapPin, Brush, Puzzle, Target, Brain } from 'lucide-react';

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
            Discover magical stories, play exciting games, create amazing art, and explore science!
          </p>
        </div>

        <Tabs defaultValue="stories" className="w-full">
          <TabsList className="grid w-full grid-cols-16 max-w-7xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger 
              value="stories" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              Stories
            </TabsTrigger>
            <TabsTrigger 
              value="games" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-blue data-[state=active]:text-white"
            >
              <Gamepad2 className="w-3 h-3 mr-1" />
              Games
            </TabsTrigger>
            <TabsTrigger 
              value="knowledge" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <Brain className="w-3 h-3 mr-1" />
              Knowledge
            </TabsTrigger>
            <TabsTrigger 
              value="math" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-blue data-[state=active]:text-white"
            >
              <Calculator className="w-3 h-3 mr-1" />
              Math
            </TabsTrigger>
            <TabsTrigger 
              value="reading" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <BookOpen className="w-3 h-3 mr-1" />
              Reading
            </TabsTrigger>
            <TabsTrigger 
              value="art" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-pink data-[state=active]:text-white"
            >
              <Palette className="w-3 h-3 mr-1" />
              Art
            </TabsTrigger>
            <TabsTrigger 
              value="paint" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-pink data-[state=active]:text-white"
            >
              <Brush className="w-3 h-3 mr-1" />
              Paint
            </TabsTrigger>
            <TabsTrigger 
              value="puzzle" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-green data-[state=active]:text-white"
            >
              <Puzzle className="w-3 h-3 mr-1" />
              Puzzle
            </TabsTrigger>
            <TabsTrigger 
              value="matching" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <Target className="w-3 h-3 mr-1" />
              Matching
            </TabsTrigger>
            <TabsTrigger 
              value="stem" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-blue data-[state=active]:text-white"
            >
              <Beaker className="w-3 h-3 mr-1" />
              STEM
            </TabsTrigger>
            <TabsTrigger 
              value="science" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-green data-[state=active]:text-white"
            >
              <Beaker className="w-3 h-3 mr-1" />
              Science
            </TabsTrigger>
            <TabsTrigger 
              value="language" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-green data-[state=active]:text-white"
            >
              <Globe2 className="w-3 h-3 mr-1" />
              Language
            </TabsTrigger>
            <TabsTrigger 
              value="music" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-pink data-[state=active]:text-white"
            >
              <Music className="w-3 h-3 mr-1" />
              Music
            </TabsTrigger>
            <TabsTrigger 
              value="coding" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-purple data-[state=active]:text-white"
            >
              <Monitor className="w-3 h-3 mr-1" />
              Coding
            </TabsTrigger>
            <TabsTrigger 
              value="geography" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-blue data-[state=active]:text-white"
            >
              <MapPin className="w-3 h-3 mr-1" />
              Geography
            </TabsTrigger>
            <TabsTrigger 
              value="social" 
              className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-pink data-[state=active]:text-white"
            >
              <Heart className="w-3 h-3 mr-1" />
              Social
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

          <TabsContent value="knowledge">
            <GeneralKnowledge />
          </TabsContent>

          <TabsContent value="math">
            <InteractiveMath />
          </TabsContent>

          <TabsContent value="reading">
            <ReadingAdventures />
          </TabsContent>

          <TabsContent value="art">
            <CreativeArtStudio />
          </TabsContent>

          <TabsContent value="paint">
            <Paint />
          </TabsContent>

          <TabsContent value="puzzle">
            <PuzzleAssembly />
          </TabsContent>

          <TabsContent value="matching">
            <MatchingGame />
          </TabsContent>

          <TabsContent value="stem">
            <STEMLab />
          </TabsContent>

          <TabsContent value="science">
            <ScienceExperiments />
          </TabsContent>

          <TabsContent value="language">
            <LanguageLab />
          </TabsContent>

          <TabsContent value="music">
            <MusicMovement />
          </TabsContent>

          <TabsContent value="coding">
            <CodingForKids />
          </TabsContent>

          <TabsContent value="geography">
            <GeographyExplorer />
          </TabsContent>

          <TabsContent value="social">
            <SocialEmotionalLearning />
          </TabsContent>
        </Tabs>

        {/* Pet and Rewards in a separate section */}
        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
              🐾 Your Learning Buddy
            </h3>
            <VirtualPet />
          </div>
          <div>
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
              🎁 Rewards Center
            </h3>
            <RewardsCenter />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivitySection;
