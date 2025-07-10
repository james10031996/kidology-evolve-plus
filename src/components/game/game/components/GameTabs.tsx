
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GameCard from './GameCard';
import { mathGames, languageGames, memoryGames, logicGames, puzzleGames, scienceGames, gamesData } from '../data/gamesData';
import { transformGameData } from '../utils/gameDataTransformer';

interface GameTabsProps {
  onPlayGame: (game: any) => void;
}

const GameTabs = ({ onPlayGame }: GameTabsProps) => {
  const allGames = gamesData.map(transformGameData);
  const transformedMathGames = mathGames.map(transformGameData);
  const transformedLanguageGames = languageGames.map(transformGameData);
  const transformedMemoryGames = memoryGames.map(transformGameData);
  const transformedLogicGames = logicGames.map(transformGameData);
  const transformedPuzzleGames = puzzleGames.map(transformGameData);

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-6 max-w-3xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
        <TabsTrigger value="all" className="rounded-full font-comic font-bold data-[state=active]:bg-blue-200">
          🎯 All
        </TabsTrigger>
        <TabsTrigger value="math" className="rounded-full font-comic font-bold data-[state=active]:bg-purple-200">
          🔢 Math
        </TabsTrigger>
        <TabsTrigger value="language" className="rounded-full font-comic font-bold data-[state=active]:bg-violet-200">
          📝 Language
        </TabsTrigger>
        <TabsTrigger value="memory" className="rounded-full font-comic font-bold data-[state=active]:bg-sky-200">
          🧠 Memory
        </TabsTrigger>
        <TabsTrigger value="logic" className="rounded-full font-comic font-bold data-[state=active]:bg-green-200">
          🧩 Logic
        </TabsTrigger>
        <TabsTrigger value="puzzle" className="rounded-full font-comic font-bold data-[state=active]:bg-yellow-200">
          🔍 Puzzle
        </TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="math">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedMathGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="language">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedLanguageGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="memory">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedMemoryGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="logic">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedLogicGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="puzzle">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedPuzzleGames.map((game) => (
            <GameCard key={game.id} game={game} onPlayGame={onPlayGame} />
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default GameTabs;
