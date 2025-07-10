
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import GameState from './components/GameState';
import BadgeSystem from './components/BadgeSystem';
import TypingArea from './components/TypingArea';
import FeedbackDisplay from './components/FeedbackDisplay';
import GameTimer from './components/GameTimer';
import { useTypingGameLogic } from './components/TypingGameLogic';

const LetterTypingChallenge = () => {
  const navigate = useNavigate();
  
  const {
    gameStats,
    bubbles,
    gameState,
    feedback,
    isSpeedRound,
    newBadges,
    currentInput,
    foundItems,
    completedRows,
    targetItems,
    startGame,
    handleInputChange,
    handleSubmit,
    setGameState,
    generateNewItems,
    updateTimeLeft,
    handleTimeUp,
    setNewBadges
  } = useTypingGameLogic();
  
  const badgesList = [
    { id: 'streak5', name: 'Typing Streak', description: '5 in a row!', icon: 'zap', earned: gameStats.badges?.streak5 || false, condition: 'Type 5 correct in a row' },
    { id: 'streak10', name: 'Word Master', description: '10 in a row!', icon: 'crown', earned: gameStats.badges?.streak10 || false, condition: 'Type 10 correct in a row' },
    { id: 'alphabetMaster', name: 'Alphabet Explorer', description: 'Complete A-Z!', icon: 'trophy', earned: gameStats.badges?.alphabetMaster || false, condition: 'Complete all letters A-Z' },
    { id: 'correct50', name: 'Typing Wizard', description: '50 correct words!', icon: 'star', earned: gameStats.badges?.correct50 || false, condition: 'Type 50 words correctly' },
    { id: 'speedTyper', name: 'Speed Demon', description: 'Lightning fast!', icon: 'target', earned: gameStats.badges?.speedTyper || false, condition: 'Type 5 words in 30 seconds' }
  ];

  useEffect(() => {
    if (gameState === 'playing' && bubbles.length === 0) {
      generateNewItems();
    }
  }, [generateNewItems, gameState, bubbles.length]);

  useEffect(() => {
    if (newBadges.length > 0) {
      const timer = setTimeout(() => setNewBadges([]), 4000);
      return () => clearTimeout(timer);
    }
  }, [newBadges, setNewBadges]);

  if (gameState === 'menu') {
    return <GameMenu onStartGame={startGame} />;
  }

  if (gameState === 'gameOver') {
    return (
      <GameOver 
        gameStats={gameStats}
        onRestart={() => startGame(gameStats.mode)}
        onMenu={() => setGameState('menu')}
      />
    );
  }

  return (
    <div>
      <Header />
      <GameTimer 
        timeLeft={gameStats.timeLeft}
        gameState={gameState}
        onTimeUpdate={updateTimeLeft}
        onTimeUp={handleTimeUp}
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 p-6">
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

        <GameState 
          gameStats={gameStats}
          isSpeedRound={isSpeedRound}
        />

        <FeedbackDisplay feedback={feedback} />

        {(newBadges.length > 0 || Object.keys(gameStats.badges).length > 0) && (
          <div className="max-w-4xl mx-auto mb-4">
            <BadgeSystem badges={badgesList} recentBadge={newBadges[0]} />
          </div>
        )}

        <TypingArea 
          bubbles={bubbles}
          currentInput={currentInput}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          foundItems={foundItems}
          completedRows={completedRows}
          targetItems={targetItems}
        />
      </div>
    </div>
  );
};

export default LetterTypingChallenge;
