
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';

interface MemoryCard {
  id: number;
  emoji: string;
  matched: boolean;
  flipped: boolean;
}

const MemoryPalace = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [moves, setMoves] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const emojis = ['🎈', '🎯', '🎪', '🎨', '🎭', '🎪', '🎊', '🎉', '🎁', '🎀', '🎸', '🎺', '🎮', '🎲', '🃏', '🎳', '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏓', '🏸', '🥊', '🏆', '🏅', '🎖️'];

  const generateCards = () => {
    const pairsCount = Math.min(4 + level, 12);
    const selectedEmojis = emojis.slice(0, pairsCount);
    const cardEmojis = [...selectedEmojis, ...selectedEmojis];

    const shuffledCards = cardEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        matched: false,
        flipped: false
      }));

    setCards(shuffledCards);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setLevel(1);
    setMoves(0);
    setTimeLeft(120);
    setGameCompleted(false);
    setFlippedCards([]);
    generateCards();
  };

  const flipCard = (cardId: number) => {
    if (!gameActive || flippedCards.length >= 2) return;

    const card = cards.find(c => c.id === cardId);
    if (!card || card.matched || card.flipped) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    setCards(prev => prev.map(c =>
      c.id === cardId ? { ...c, flipped: true } : c
    ));

    if (newFlippedCards.length === 2) {
      setMoves(prev => prev + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      if (firstCard && secondCard && firstCard.emoji === secondCard.emoji) {
        // Match found
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === firstId || c.id === secondId)
              ? { ...c, matched: true, flipped: false }
              : c
          ));
          setFlippedCards([]);
          setScore(prev => prev + (level * 20));

          // Check if all cards are matched
          const updatedCards = cards.map(c =>
            (c.id === firstId || c.id === secondId)
              ? { ...c, matched: true }
              : c
          );

          if (updatedCards.every(c => c.matched)) {
            setLevel(prev => prev + 1);
            setTimeLeft(prev => prev + 60);
            setTimeout(() => generateCards(), 1000);
          }
        }, 1000);
      } else {
        // No match
        setTimeout(() => {
          setCards(prev => prev.map(c =>
            (c.id === firstId || c.id === secondId)
              ? { ...c, flipped: false }
              : c
          ));
          setFlippedCards([]);
          setScore(prev => Math.max(0, prev - 5));
        }, 1000);
      }
    }
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setLevel(1);
    setMoves(0);
    setTimeLeft(120);
    setCards([]);
    setGameCompleted(false);
    setFlippedCards([]);
  };

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (gameActive && timeLeft === 0) {
      setGameActive(false);
      setGameCompleted(true);
      if (score > 200) {
        updateStars(Math.floor(score / 20));
      }
    }
  }, [gameActive, timeLeft, score, updateStars]);

  const gridCols = cards.length <= 8 ? 'grid-cols-4' : cards.length <= 12 ? 'grid-cols-4' : 'grid-cols-6';

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
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

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🧠 Memory Palace
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Train your brain by matching pairs of cards! Remember the positions and find all matches!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Score</div>
            <div className="font-fredoka text-2xl font-bold text-purple-600">{score}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Level</div>
            <div className="font-fredoka text-2xl font-bold text-pink-600">{level}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Moves</div>
            <div className="font-fredoka text-2xl font-bold text-indigo-600">{moves}</div>
          </Card>
          <Card className="p-4 text-center bg-white rounded-xl shadow-lg">
            <div className="font-comic text-sm text-gray-600">Time</div>
            <div className="font-fredoka text-2xl font-bold text-red-600">{timeLeft}s</div>
          </Card>
        </div>

        <div className="flex justify-center space-x-4 mb-8">
          {!gameActive && !gameCompleted && (
            <Button
              onClick={startGame}
              className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
            >
              <Play className="w-5 h-5 mr-2" />
              Start Training
            </Button>
          )}

          <Button
            onClick={resetGame}
            variant="outline"
            className="font-comic font-bold px-8 py-3 rounded-full"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Reset
          </Button>
        </div>

        <Card className="p-8 bg-white rounded-2xl shadow-lg mb-8">
          {gameActive ? (
            <div className={`grid ${gridCols} gap-4 max-w-2xl mx-auto`}>
              {cards.map((card) => (
                <button
                  key={card.id}
                  onClick={() => flipCard(card.id)}
                  className={`aspect-square rounded-xl font-fredoka text-2xl transition-all duration-300 transform hover:scale-105 ${card.flipped || card.matched
                      ? 'bg-gradient-to-br from-yellow-100 to-orange-100 shadow-lg'
                      : 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200'
                    } ${card.matched ? 'opacity-60' : ''}`}
                  disabled={card.matched || flippedCards.length >= 2}
                >
                  {card.flipped || card.matched ? card.emoji : '?'}
                </button>
              ))}
            </div>
          ) : !gameCompleted ? (
            <div className="text-center">
              <div className="text-8xl mb-4">🏰</div>
              <div className="font-fredoka text-3xl text-gray-700 mb-4">Enter the Memory Palace</div>
              <div className="font-comic text-gray-600 mb-4">Flip cards to find matching pairs!</div>
              {!gameActive && !gameCompleted && (
                <Button
                  onClick={startGame}
                  className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Training
                </Button>
              )}
            </div>
          ) : null}
        </Card>

        {gameCompleted && (
          <GameCompletionPopup
                      isOpen={gameCompleted}
                      onClose={() => setGameCompleted(false)}
                      score={score}
                      stars={Math.floor(score / 100)}
                      gameName="Memory Palace"
                    />

          // <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl text-center">
          //   <Trophy className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          //   <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
          //     🎉 Memory Master! 🎉
          //   </h2>
          //   <p className="font-comic text-lg text-gray-700 mb-4">
          //     Final Score: <span className="font-bold text-purple-600">{score}</span>
          //   </p>
          //   <p className="font-comic text-lg text-gray-700 mb-6">
          //     You completed {level - 1} levels in {moves} moves and earned {Math.floor(score / 20)} stars!
          //   </p>
          //   <div className="flex justify-center space-x-4">
          //     <Button
          //       onClick={startGame}
          //       className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
          //     >
          //       <Play className="w-5 h-5 mr-2" />
          //       Play Again
          //     </Button>
          //     <Button
          //       onClick={() => navigate('/games')}
          //       className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full"
          //     >
          //       Try Another Game
          //     </Button>
          //   </div>
          // </Card>
        )}
      </div>
    </div>
  );
};

export default MemoryPalace;
