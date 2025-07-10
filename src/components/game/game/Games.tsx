
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import GameTabs from './components/GameTabs';
import DailyChallenge from './components/DailyChallenge';
import GameCategories from './components/GameCategories';

const Games = () => {
  const { updateStars } = useUser();
  const navigate = useNavigate();

  const playGame = (game: any) => {
    if (game.route) {
      navigate(game.route);
    } else {
      updateStars(game.stars);
    }
  };

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

        <GameTabs onPlayGame={playGame} />
        <DailyChallenge />
        <GameCategories />
      </div>
    </div>
  );
};

export default Games;
