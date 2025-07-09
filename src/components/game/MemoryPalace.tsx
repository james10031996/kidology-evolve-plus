import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, RotateCcw, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import confetti from 'canvas-confetti';

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
  const [score, setScore] = useState(() => Number(localStorage.getItem('memoryScore') || 0));
  const [bestScore, setBestScore] = useState(() => Number(localStorage.getItem('memoryBestScore') || 0));
  const [level, setLevel] = useState(() => Number(localStorage.getItem('memoryLevel') || 1));
  const [moves, setMoves] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>(JSON.parse(localStorage.getItem('memoryBadges') || '[]'));
  const [gameActive, setGameActive] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);

  const emojis = [
    '🎈', '🎯', '🎪', '🎨', '🎭', '🎊', '🎉', '🎁', '🎀', '🎸',
    '🎺', '🎮', '🎲', '🃏', '🎳', '⚽', '🏀', '🏈', '⚾', '🎾',
    '🏐', '🏓', '🏸', '🥊', '🏆', '🏅', '🎖️', '🧩', '🚀', '🧠', '🍕', '🐶', '🐱', '🌈'
  ];

  const generateCards = () => {
    const pairsCount = Math.min(4 + level, 18); // Dynamic difficulty
    const selectedEmojis = emojis.sort(() => Math.random() - 0.5).slice(0, pairsCount);
    const cardEmojis = [...selectedEmojis, ...selectedEmojis];

    const shuffledCards = cardEmojis
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, matched: false, flipped: false }));

    setCards(shuffledCards);
  };

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setMoves(0);
    setStreak(0);
    setBadges([]);
    setTimeLeft(120 - level * 5); // Less time at higher levels
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
          setStreak(prev => prev + 1);

          // Badges
          if (streak + 1 === 5) {
            confetti({ particleCount: 150, spread: 60 });
            setBadges(prev => [...prev, '🔥 5 Streak Master!']);
          }
          if (score >= 500 && !badges.includes('🏅 500 Points Club')) {
            setBadges(prev => [...prev, '🏅 500 Points Club']);
          }

          // Check if all cards are matched
          const updatedCards = cards.map(c =>
            (c.id === firstId || c.id === secondId) ? { ...c, matched: true } : c
          );

          if (updatedCards.every(c => c.matched)) {
            setLevel(prev => prev + 1);
            setTimeLeft(prev => prev + 30);
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
          setStreak(0);
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
    localStorage.setItem('memoryScore', String(score));
    localStorage.setItem('memoryLevel', String(level));
    localStorage.setItem('memoryBadges', JSON.stringify(badges));

    if (score > bestScore) {
      setBestScore(score);
      localStorage.setItem('memoryBestScore', String(score));
      confetti({ particleCount: 200, spread: 80 });
    }
  }, [score, level, badges, bestScore]);

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
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/games')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
          <div className="w-full h-4 bg-gray-300 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full transition-all duration-500 ease-linear"
              style={{
                width: `${(timeLeft / Math.max(120 - level * 5, 30)) * 100}%`
              }}
            >
              <div className="w-3 h-3 bg-white rounded-full shadow-lg animate-pulse ml-auto mr-[-6px]"></div>
            </div>
          </div>
        </div>

        <div className="text-center mb-4">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-2">
            🧠 Memory Palace
          </h1>
          <p className="font-comic text-lg text-gray-600">Best Score: 🏆 {bestScore}</p>
        </div>

        <div className="flex justify-center flex-wrap gap-2 mb-4">
          {badges.map((badge, idx) => (
            <span key={idx} className="bg-yellow-200 px-3 py-1 rounded-full shadow">{badge}</span>
          ))}
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
                  {card.flipped || card.matched ? card.emoji : '❓'}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <div className="text-8xl mb-4">🏰</div>
              <div className="font-fredoka text-3xl text-gray-700 mb-4">Enter the Memory Palace</div>
              <div className="font-comic text-gray-600 mb-4">Flip cards to find matching pairs!</div>
              <Button
                onClick={startGame}
                className="gradient-purple text-white font-comic font-bold px-8 py-3 rounded-full"
              >
                <Play className="w-5 h-5 mr-2" /> Start Training
              </Button>
            </div>
          )}
        </Card>

        {gameCompleted && (
          <GameCompletionPopup
            isOpen={gameCompleted}
            onClose={() => setGameCompleted(false)}
            score={score}
            stars={Math.floor(score / 100)}
            gameName="Memory Palace"
          />
        )}
      </div>
    </div>
  );
};

export default MemoryPalace;
