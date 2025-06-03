
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Gamepad2, Star, Gift, Palette, Beaker, Globe2, Heart, Calculator, Music, Monitor, MapPin, Brush, Puzzle, Target, Brain } from 'lucide-react';

const ActivityTabs = () => {
  return (
    <TabsList className="grid w-full grid-cols-17 max-w-7xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
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
        value="search" 
        className="rounded-full font-comic font-bold text-xs data-[state=active]:gradient-green data-[state=active]:text-white"
      >
        <Target className="w-3 h-3 mr-1" />
        Search
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
  );
};

export default ActivityTabs;
