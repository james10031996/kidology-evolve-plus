
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import GameMenu from './components/GameMenu';
import GameOver from './components/GameOver';
import GameState from './components/GameState';
import BadgeSystem from './components/BadgeSystem';
import EnhancedBubbleArea from './components/EnhancedBubbleArea';
import FeedbackDisplay from './components/FeedbackDisplay';
import GameTimer from './components/GameTimer';
import { useGameLogic } from './components/GameLogic';

const PopTheLetterGame = () => {
  const navigate = useNavigate();
  
  const {
    gameStats,
    bubbles,
    gameState,
    feedback,
    isSpeedRound,
    newBadges,
    selectedBubble,
    poppedBubbles,
    currentRow,
    startGame,
    handleBubbleClick,
    setGameState,
    generateNewBubbles,
    updateTimeLeft,
    handleTimeUp,
    setNewBadges
  } = useGameLogic();
  
  const badgesList = [
    { id: 'streak5', name: 'Letter Streak', description: '5 in a row!', icon: 'zap', earned: gameStats.badges?.streak5 || false, condition: 'Get 5 correct in a row' },
    { id: 'streak10', name: 'Alphabet Ace', description: '10 in a row!', icon: 'crown', earned: gameStats.badges?.streak10 || false, condition: 'Get 10 correct in a row' },
    { id: 'alphabetMaster', name: 'Alphabet Master', description: 'Complete A-Z!', icon: 'trophy', earned: gameStats.badges?.alphabetMaster || false, condition: 'Complete all letters A-Z' },
    { id: 'correct50', name: 'Word Wizard', description: '50 correct bubbles!', icon: 'star', earned: gameStats.badges?.correct50 || false, condition: 'Pop 50 bubbles correctly' },
    { id: 'highScore', name: 'Record Breaker', description: 'New high score!', icon: 'target', earned: gameStats.badges?.highScore || false, condition: 'Beat your high score' }
  ];

  useEffect(() => {
    if (gameState === 'playing' && bubbles.length === 0) {
      generateNewBubbles();
    }
  }, [generateNewBubbles, gameState, bubbles.length]);

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
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6">
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

        <EnhancedBubbleArea 
          bubbles={bubbles} 
          onBubbleClick={handleBubbleClick}
          selectedBubble={selectedBubble}
          poppedBubbles={poppedBubbles}
          currentRow={currentRow}
        />
      </div>
    </div>
  );
};

export default PopTheLetterGame;
