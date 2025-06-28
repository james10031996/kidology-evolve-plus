
import { TabsContent } from '@/components/ui/tabs';
import StoryLibrary from '../story/StoryLibrary';
import MiniGameCard from '../../game/game/MiniGameCard';
import GeneralKnowledge from '../../courses/gk/GeneralKnowledge';
import SearchMissingObject from '../../game/SearchMissingObject';
import InteractiveMath from '../../courses/maths/InteractiveMath';
import ReadingAdventures from '../../courses/gk/ReadingAdventures';
import CreativeArtStudio from '../CreativeArtStudio';
import Paint from '../Paint';
import PuzzleAssembly from '../../game/PuzzleAssembly';
import MatchingGame from '../../game/game/MatchingGame';
import STEMLab from '../../courses/gk/STEMLab';
import ScienceExperiments from '../../courses/science/ScienceExperiments';
import LanguageLab from '../../courses/gk/LanguageLab';
import MusicMovement from '../MusicMovement';
import CodingForKids from '../../courses/CodingForKids';
import GeographyExplorer from '../../courses/geography/GeographyExplorer';
import SocialEmotionalLearning from '../../courses/social/SocialEmotionalLearning';
import MagicPaintbook from '../MagicPaintbook';
import StoryIllustrationStudio from '../story/StoryIllustrationStudio';
import AvatarDressUpCreator from '../../admin/AvatarDressUpCreator';
import MandalaMaker from '../MandalaMaker';
import PoemsStories from '../story/PoemsStories';

const ActivityContent = () => {
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
      gradient: 'gradient-pink'
    }
  ];

  return (
    <>
      <TabsContent value="stories">
        <StoryLibrary />
      </TabsContent>

      <TabsContent value="games">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {miniGames.map((game) => (
            <MiniGameCard key={game.id} {...game} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="poems-stories">
        <PoemsStories />
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

      <TabsContent value="magic-paint">
        <MagicPaintbook />
      </TabsContent>

      <TabsContent value="story-studio">
        <StoryIllustrationStudio />
      </TabsContent>

      <TabsContent value="avatar-creator">
        <AvatarDressUpCreator />
      </TabsContent>

      <TabsContent value="mandala">
        <MandalaMaker />
      </TabsContent>
    </>
  );
};

export default ActivityContent;
