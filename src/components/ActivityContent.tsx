
import { TabsContent } from '@/components/ui/tabs';
import InteractiveStoryCard from './InteractiveStoryCard';
import MiniGameCard from './MiniGameCard';
import GeneralKnowledge from './GeneralKnowledge';
import SearchMissingObject from './SearchMissingObject';
import InteractiveMath from './InteractiveMath';
import ReadingAdventures from './ReadingAdventures';
import CreativeArtStudio from './CreativeArtStudio';
import Paint from './Paint';
import PuzzleAssembly from './PuzzleAssembly';
import MatchingGame from './MatchingGame';
import STEMLab from './STEMLab';
import ScienceExperiments from './ScienceExperiments';
import LanguageLab from './LanguageLab';
import MusicMovement from './MusicMovement';
import CodingForKids from './CodingForKids';
import GeographyExplorer from './GeographyExplorer';
import SocialEmotionalLearning from './SocialEmotionalLearning';

const ActivityContent = () => {
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
    <>
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

      <TabsContent value="search">
        <SearchMissingObject />
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
    </>
  );
};

export default ActivityContent;
