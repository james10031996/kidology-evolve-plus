
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Trophy, Star, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import confetti from 'canvas-confetti';

const WordBuilderChallenge = () => {
  const navigate = useNavigate();
  const { updateStars } = useUser();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [draggedLetters, setDraggedLetters] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(true);

  const levels = [
    { word: 'CAT', letters: ['C', 'A', 'T', 'D', 'O', 'G'], emoji: '🐱', hint: 'A furry pet that says meow!' },
    { word: 'DOG', letters: ['D', 'O', 'G', 'C', 'A', 'T'], emoji: '🐕', hint: 'A loyal friend that barks!' },
    { word: 'SUN', letters: ['S', 'U', 'N', 'M', 'O', 'R'], emoji: '☀️', hint: 'Bright star in the sky!' },
    { word: 'BIRD', letters: ['B', 'I', 'R', 'D', 'F', 'L', 'Y'], emoji: '🐦', hint: 'It flies in the sky!' },
    { word: 'FISH', letters: ['F', 'I', 'S', 'H', 'W', 'A', 'T'], emoji: '🐠', hint: 'Swims in the water!' }
  ];

  const currentWord = levels[currentLevel];

  useEffect(() => {
    if (timeLeft > 0 && gameActive) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameActive(false);
      setShowCompletion(true);
    }
  }, [timeLeft, gameActive]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(draggedLetters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setDraggedLetters(items);
  };

  const checkWord = () => {
    const formedWord = draggedLetters.join('');
    if (formedWord === currentWord.word) {
      setScore(score + 10);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      if (currentLevel < levels.length - 1) {
        setTimeout(() => {
          setCurrentLevel(currentLevel + 1);
          setDraggedLetters([]);
        }, 1500);
      } else {
        setGameActive(false);
        setShowCompletion(true);
      }
    }
  };

  const addLetter = (letter: string) => {
    if (draggedLetters.length < currentWord.word.length) {
      setDraggedLetters([...draggedLetters, letter]);
    }
  };

  const clearWord = () => {
    setDraggedLetters([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/games')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent mb-4">
            🔤 Word Builder Challenge
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Drag letters to build words! 🌟
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 bg-gradient-to-br from-blue-100 to-purple-100 border-2 border-blue-200">
              <div className="text-center">
                <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Score</p>
                <p className="font-fredoka text-2xl font-bold text-purple-700">{score}</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-green-100 to-teal-100 border-2 border-green-200">
              <div className="text-center">
                <Zap className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Level</p>
                <p className="font-fredoka text-2xl font-bold text-green-700">{currentLevel + 1}/{levels.length}</p>
              </div>
            </Card>
            
            <Card className="p-6 bg-gradient-to-br from-red-100 to-pink-100 border-2 border-red-200">
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <p className="font-comic text-lg font-bold text-gray-700">Time</p>
                <p className="font-fredoka text-2xl font-bold text-red-700">{timeLeft}s</p>
              </div>
            </Card>
          </div>

          <Card className="p-8 bg-white rounded-3xl shadow-2xl border-4 border-orange-200">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 animate-bounce">{currentWord.emoji}</div>
              <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">
                Build the word for: {currentWord.hint}
              </h3>
              <p className="font-comic text-lg text-gray-600">
                Target: <span className="font-bold text-purple-600">{currentWord.word}</span>
              </p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="flex justify-center mb-8">
                <Droppable droppableId="word-builder" direction="horizontal">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="flex space-x-3 p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl border-4 border-dashed border-purple-300 min-h-[100px] items-center min-w-[300px] justify-center"
                    >
                      {draggedLetters.map((letter, index) => (
                        <Draggable key={`${letter}-${index}`} draggableId={`${letter}-${index}`} index={index}>   
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-fredoka font-bold text-2xl shadow-lg cursor-move hover:scale-110 transition-transform"
                            >
                              {letter}
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </DragDropContext>

            <div className="flex justify-center flex-wrap gap-3 mb-8">
              {currentWord.letters.map((letter, index) => (
                <Button
                  key={index}
                  onClick={() => addLetter(letter)}
                  className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 text-white font-fredoka font-bold text-2xl rounded-xl shadow-lg hover:scale-110 transition-transform"
                  disabled={draggedLetters.filter(l => l === letter).length >= currentWord.word.split('').filter(l => l === letter).length}
                >
                  {letter}
                </Button>
              ))}
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={checkWord}
                className="bg-gradient-to-r from-green-500 to-emerald-600 text-white font-comic font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:scale-105 transition-transform"
                disabled={draggedLetters.length !== currentWord.word.length}
              >
                ✅ Check Word!
              </Button>
              <Button
                onClick={clearWord}
                variant="outline"
                className="font-comic font-bold px-6 py-4 rounded-full text-lg border-2 border-gray-300 hover:bg-gray-50"
              >
                🗑️ Clear
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <GameCompletionPopup
        isOpen={showCompletion}
        onClose={() => {
          updateStars(score);
          setShowCompletion(false);
          navigate('/games');
        }}
        score={score}
        stars={Math.min(3, Math.floor(score / 20))}
        gameName="Word Builder Challenge"
      />
    </div>
  );
};

export default WordBuilderChallenge;
