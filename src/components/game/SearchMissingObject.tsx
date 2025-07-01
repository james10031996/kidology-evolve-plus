
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Trophy, RotateCcw, ArrowRight, CheckCircle2, Lightbulb, Timer, Volume2 } from 'lucide-react';

type SceneObject = {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMissing: boolean;
  correctSlot?: { x: number; y: number; width: number; height: number };
  hint?: string;
  sound?: string;
};

type Scene = {
  id: string;
  name: string;
  background: string;
  description: string;
  objects: SceneObject[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit?: number;
  backgroundMusic?: string;
};

const SearchMissingObject = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [streak, setStreak] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const scenes: Scene[] = [
    {
      id: 'bedroom',
      name: '🛏️ Cozy Bedroom',
      background: 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100',
      description: 'Help organize Emma\'s messy bedroom! Find all the missing objects.',
      difficulty: 'Easy',
      objects: [
        {
          id: 'bed',
          name: 'Bed',
          emoji: '🛏️',
          x: 50,
          y: 200,
          width: 160,
          height: 80,
          isMissing: false
        },
        {
          id: 'pillow',
          name: 'Pillow',
          emoji: '🛋️',
          x: 400,
          y: 50,
          width: 50,
          height: 40,
          isMissing: true,
          correctSlot: { x: 70, y: 210, width: 50, height: 40 },
          hint: 'Something soft for your head',
          sound: 'pillow-fluff'
        },
        {
          id: 'lamp',
          name: 'Bedside Lamp',
          emoji: '🛋️',
          x: 240,
          y: 200,
          width: 40,
          height: 60,
          isMissing: false
        },
        {
          id: 'book',
          name: 'Storybook',
          emoji: '📖',
          x: 450,
          y: 300,
          width: 40,
          height: 30,
          isMissing: true,
          correctSlot: { x: 250, y: 220, width: 40, height: 30 },
          hint: 'Contains magical stories',
          sound: 'page-turn'
        },
        {
          id: 'clock',
          name: 'Alarm Clock',
          emoji: '⏰',
          x: 350,
          y: 280,
          width: 45,
          height: 45,
          isMissing: true,
          correctSlot: { x: 290, y: 200, width: 45, height: 45 },
          hint: 'Tells you what time it is',
          sound: 'tick-tock'
        },
        {
          id: 'teddy',
          name: 'Teddy Bear',
          emoji: '🧸',
          x: 380,
          y: 120,
          width: 50,
          height: 60,
          isMissing: true,
          correctSlot: { x: 150, y: 220, width: 50, height: 60 },
          hint: 'Cuddly friend for bedtime',
          sound: 'soft-squeak'
        },
        {
          id: 'shoes',
          name: 'Slippers',
          emoji: '🥿',
          x: 320,
          y: 350,
          width: 60,
          height: 30,
          isMissing: true,
          correctSlot: { x: 80, y: 300, width: 60, height: 30 },
          hint: 'Keeps your feet warm',
          sound: 'soft-step'
        }
      ]
    },
    {
      id: 'kitchen',
      name: '🍳 Busy Kitchen',
      background: 'bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100',
      description: 'Chef Mario\'s kitchen is chaotic! Put everything back where it belongs.',
      difficulty: 'Medium',
      timeLimit: 120,
      objects: [
        {
          id: 'stove',
          name: 'Stove',
          emoji: '🔥',
          x: 60,
          y: 220,
          width: 100,
          height: 80,
          isMissing: false
        },
        {
          id: 'pot',
          name: 'Cooking Pot',
          emoji: '🍲',
          x: 400,
          y: 80,
          width: 60,
          height: 60,
          isMissing: true,
          correctSlot: { x: 80, y: 230, width: 60, height: 60 },
          hint: 'Used for cooking soup',
          sound: 'pot-clang'
        },
        {
          id: 'refrigerator',
          name: 'Refrigerator',
          emoji: '🧊',
          x: 200,
          y: 160,
          width: 80,
          height: 120,
          isMissing: false
        },
        {
          id: 'apple',
          name: 'Fresh Apple',
          emoji: '🍎',
          x: 420,
          y: 280,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 220, y: 180, width: 35, height: 35 },
          hint: 'A healthy red fruit',
          sound: 'crunch'
        },
        {
          id: 'cup',
          name: 'Coffee Mug',
          emoji: '☕',
          x: 360,
          y: 180,
          width: 40,
          height: 50,
          isMissing: true,
          correctSlot: { x: 300, y: 120, width: 40, height: 50 },
          hint: 'Contains a warm drink',
          sound: 'ceramic-clink'
        },
        {
          id: 'spatula',
          name: 'Spatula',
          emoji: '🥄',
          x: 450,
          y: 200,
          width: 30,
          height: 80,
          isMissing: true,
          correctSlot: { x: 350, y: 120, width: 30, height: 80 },
          hint: 'Tool for flipping food',
          sound: 'metal-tap'
        },
        {
          id: 'bread',
          name: 'Bread Loaf',
          emoji: '🍞',
          x: 380,
          y: 320,
          width: 50,
          height: 30,
          isMissing: true,
          correctSlot: { x: 350, y: 120, width: 50, height: 30 },
          hint: 'Goes in the toaster',
          sound: 'bread-squish'
        }
      ]
    },
    {
      id: 'playground',
      name: '🏞️ Fun Playground',
      background: 'bg-gradient-to-br from-green-100 via-blue-100 to-purple-100',
      description: 'The playground is messy after recess! Help put toys back in place.',
      difficulty: 'Easy',
      objects: [
        {
          id: 'swing',
          name: 'Swing Set',
          emoji: '🏗️',
          x: 80,
          y: 120,
          width: 100,
          height: 120,
          isMissing: false
        },
        {
          id: 'ball',
          name: 'Soccer Ball',
          emoji: '⚽',
          x: 400,
          y: 100,
          width: 50,
          height: 50,
          isMissing: true,
          correctSlot: { x: 200, y: 280, width: 50, height: 50 },
          hint: 'Round and used for kicking',
          sound: 'ball-bounce'
        },
        {
          id: 'slide',
          name: 'Slide',
          emoji: '🛝',
          x: 200,
          y: 180,
          width: 120,
          height: 100,
          isMissing: false
        },
        {
          id: 'kite',
          name: 'Colorful Kite',
          emoji: '🪁',
          x: 450,
          y: 200,
          width: 60,
          height: 70,
          isMissing: true,
          correctSlot: { x: 100, y: 60, width: 60, height: 70 },
          hint: 'Flies high in the sky',
          sound: 'wind-whoosh'
        },
        {
          id: 'bucket',
          name: 'Sand Bucket',
          emoji: '🪣',
          x: 350,
          y: 320,
          width: 40,
          height: 40,
          isMissing: true,
          correctSlot: { x: 280, y: 300, width: 40, height: 40 },
          hint: 'Used for building sandcastles',
          sound: 'sand-pour'
        },
        {
          id: 'frisbee',
          name: 'Flying Frisbee',
          emoji: '🥏',
          x: 420,
          y: 250,
          width: 45,
          height: 45,
          isMissing: true,
          correctSlot: { x: 150, y: 300, width: 45, height: 45 },
          hint: 'Spins through the air',
          sound: 'frisbee-whoosh'
        }
      ]
    },
    {
      id: 'classroom',
      name: '📚 School Classroom',
      background: 'bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100',
      description: 'After art class, everything is scattered! Help organize the classroom.',
      difficulty: 'Medium',
      objects: [
        {
          id: 'desk',
          name: 'Teacher Desk',
          emoji: '🏫',
          x: 200,
          y: 200,
          width: 120,
          height: 80,
          isMissing: false
        },
        {
          id: 'pencil',
          name: 'Pencil',
          emoji: '✏️',
          x: 400,
          y: 120,
          width: 30,
          height: 8,
          isMissing: true,
          correctSlot: { x: 220, y: 220, width: 30, height: 8 },
          hint: 'Used for writing',
          sound: 'pencil-scratch'
        },
        {
          id: 'globe',
          name: 'World Globe',
          emoji: '🌍',
          x: 350,
          y: 280,
          width: 50,
          height: 50,
          isMissing: true,
          correctSlot: { x: 270, y: 200, width: 50, height: 50 },
          hint: 'Shows all countries',
          sound: 'globe-spin'
        },
        {
          id: 'backpack',
          name: 'School Backpack',
          emoji: '🎒',
          x: 450,
          y: 300,
          width: 60,
          height: 80,
          isMissing: true,
          correctSlot: { x: 80, y: 250, width: 60, height: 80 },
          hint: 'Carries school supplies',
          sound: 'zipper-close'
        },
        {
          id: 'calculator',
          name: 'Calculator',
          emoji: '🔢',
          x: 380,
          y: 200,
          width: 40,
          height: 50,
          isMissing: true,
          correctSlot: { x: 240, y: 230, width: 40, height: 50 },
          hint: 'Helps with math problems',
          sound: 'button-beep'
        }
      ]
    },
    {
      id: 'garden',
      name: '🌻 Beautiful Garden',
      background: 'bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100',
      description: 'The garden needs tending! Put all the gardening tools back in place.',
      difficulty: 'Hard',
      timeLimit: 150,
      objects: [
        {
          id: 'tree',
          name: 'Oak Tree',
          emoji: '🌳',
          x: 100,
          y: 80,
          width: 100,
          height: 120,
          isMissing: false
        },
        {
          id: 'watering-can',
          name: 'Watering Can',
          emoji: '🚿',
          x: 400,
          y: 160,
          width: 50,
          height: 60,
          isMissing: true,
          correctSlot: { x: 300, y: 280, width: 50, height: 60 },
          hint: 'Waters the plants',
          sound: 'water-splash'
        },
        {
          id: 'flower',
          name: 'Sunflower',
          emoji: '🌻',
          x: 350,
          y: 100,
          width: 40,
          height: 80,
          isMissing: true,
          correctSlot: { x: 250, y: 200, width: 40, height: 80 },
          hint: 'Follows the sun',
          sound: 'nature-chirp'
        },
        {
          id: 'shovel',
          name: 'Garden Shovel',
          emoji: '🌿',
          x: 450,
          y: 250,
          width: 30,
          height: 100,
          isMissing: true,
          correctSlot: { x: 350, y: 250, width: 30, height: 100 },
          hint: 'Digs holes in soil',
          sound: 'dirt-dig'
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          emoji: '🦋',
          x: 380,
          y: 80,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 150, y: 100, width: 35, height: 35 },
          hint: 'Beautiful flying insect',
          sound: 'flutter-wings'
        },
        {
          id: 'seeds',
          name: 'Flower Seeds',
          emoji: '🌱',
          x: 420,
          y: 320,
          width: 30,
          height: 30,
          isMissing: true,
          correctSlot: { x: 200, y: 300, width: 30, height: 30 },
          hint: 'Grows into plants',
          sound: 'seed-rattle'
        }
      ]
    }
  ];

  const currentSceneData = scenes[currentScene];
  const missingObjects = currentSceneData.objects.filter(obj => obj.isMissing);
  const sceneProgress = foundObjects.size;
  const totalMissing = missingObjects.length;

  // Timer effect
  useEffect(() => {
    if (currentSceneData.timeLimit && timeLeft === null) {
      setTimeLeft(currentSceneData.timeLimit);
    }
    
    if (timeLeft && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currentSceneData.timeLimit]);

  const playSound = (soundId: string) => {
    if (soundEnabled) {
      console.log(`Playing sound: ${soundId}`);
      // In a real implementation, you would play actual sounds here
    }
  };

  const handleDragStart = (objectId: string) => {
    setDraggedObject(objectId);
    const obj = missingObjects.find(o => o.id === objectId);
    if (obj?.sound) playSound(obj.sound);
  };

  const handleDragEnd = () => {
    setDraggedObject(null);
  };

  const handleDrop = (e: React.DragEvent, targetSlot: { x: number; y: number; width: number; height: number }) => {
    e.preventDefault();
    if (!draggedObject) return;

    const draggedObj = missingObjects.find(obj => obj.id === draggedObject);
    if (!draggedObj || !draggedObj.correctSlot) return;

    // Check if dropped in correct slot
    if (draggedObj.correctSlot.x === targetSlot.x && draggedObj.correctSlot.y === targetSlot.y) {
      setFoundObjects(prev => new Set([...prev, draggedObject]));
      setStreak(prev => prev + 1);
      
      // Calculate score with streak bonus
      const baseScore = 100;
      const streakBonus = Math.min(streak * 10, 100);
      const timeBonus = timeLeft ? Math.floor(timeLeft / 10) * 5 : 0;
      const totalPoints = baseScore + streakBonus + timeBonus;
      
      setScore(prev => prev + totalPoints);
      setShowSuccess(true);
      
      if (draggedObj.sound) playSound(draggedObj.sound);
      
      setTimeout(() => setShowSuccess(false), 1500);

      // Check if scene is complete
      if (foundObjects.size + 1 >= totalMissing) {
        setTimeout(() => {
          if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
            setFoundObjects(new Set());
            setTimeLeft(null);
          } else {
            setGameComplete(true);
          }
        }, 2000);
      }
    } else {
      // Wrong placement - reset streak
      setStreak(0);
      setScore(prev => Math.max(0, prev - 25));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const showObjectHint = (objectId: string) => {
    const obj = missingObjects.find(o => o.id === objectId);
    if (obj?.hint) {
      setShowHint(obj.hint);
      setTimeout(() => setShowHint(null), 3000);
    }
  };

  const resetGame = () => {
    setCurrentScene(0);
    setFoundObjects(new Set());
    setScore(0);
    setGameComplete(false);
    setShowSuccess(false);
    setStreak(0);
    setTimeLeft(null);
  };

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
      setFoundObjects(new Set());
      setTimeLeft(null);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (gameComplete) {
    return (
      <div className="text-center space-y-6">
        <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl border-0 shadow-lg">
          <div className="text-6xl mb-4 animate-bounce">🎉</div>
          <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
            Outstanding Detective Work!
          </h2>
          <p className="font-comic text-lg text-gray-600 mb-4">
            You found all missing objects in every scene!
          </p>
          <div className="bg-white bg-opacity-70 rounded-xl p-6 mb-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-purple-600">{score}</div>
                <div className="font-comic text-purple-600">Final Score</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-blue-600">{scenes.length}</div>
                <div className="font-comic text-blue-600">Scenes Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-green-600">{Math.max(streak)}</div>
                <div className="font-comic text-green-600">Best Streak</div>
              </div>
            </div>
          </div>
          <Button onClick={resetGame} className="rounded-full gradient-purple text-white font-comic font-bold">
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🔍 Missing Objects Detective
          </h2>
          <p className="font-comic text-gray-600">
            Find all missing objects and put them back where they belong!
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Badge className="bg-blue-100 text-blue-800 font-comic font-bold">
              Scene: {currentScene + 1}/{scenes.length}
            </Badge>
            <Badge className="bg-yellow-100 text-yellow-800 font-comic font-bold">
              <Star className="w-4 h-4 mr-1" />
              Score: {score}
            </Badge>
            <Badge className="bg-green-100 text-green-800 font-comic font-bold">
              Found: {sceneProgress}/{totalMissing}
            </Badge>
            {streak > 0 && (
              <Badge className="bg-purple-100 text-purple-800 font-comic font-bold">
                🔥 Streak: {streak}
              </Badge>
            )}
            {timeLeft && (
              <Badge className="bg-red-100 text-red-800 font-comic font-bold">
                <Timer className="w-4 h-4 mr-1" />
                {timeLeft}s
              </Badge>
            )}
            <Badge className={getDifficultyColor(currentSceneData.difficulty)}>
              {currentSceneData.difficulty}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Hint Display */}
      {showHint && (
        <Card className="p-4 bg-yellow-100 border-yellow-300 rounded-xl animate-fade-in">
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="font-comic font-bold text-yellow-800">
              Hint: {showHint}
            </span>
          </div>
        </Card>
      )}

      {/* Game Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Scene */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-fredoka font-bold text-xl text-gray-800">
                  {currentSceneData.name}
                </h3>
                <p className="font-comic text-sm text-gray-600">{currentSceneData.description}</p>
              </div>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="rounded-full"
                >
                  <Volume2 className={`w-4 h-4 ${soundEnabled ? 'text-blue-600' : 'text-gray-400'}`} />
                </Button>
                <Button size="sm" variant="outline" onClick={resetGame} className="rounded-full">
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Reset
                </Button>
                {sceneProgress >= totalMissing && currentScene < scenes.length - 1 && (
                  <Button size="sm" onClick={nextScene} className="rounded-full gradient-green text-white">
                    Next Scene
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>

            {/* Scene Display */}
            <div
              ref={gameAreaRef}
              className={`relative ${currentSceneData.background} rounded-xl p-4 min-h-[500px] border-2 border-dashed border-gray-300 overflow-hidden`}
            >
              {/* Fixed Objects */}
              {currentSceneData.objects
                .filter(obj => !obj.isMissing)
                .map((obj) => (
                  <div
                    key={obj.id}
                    className="absolute transition-all duration-300 hover:scale-105"
                    style={{
                      left: `${obj.x}px`,
                      top: `${obj.y}px`,
                      width: `${obj.width}px`,
                      height: `${obj.height}px`,
                    }}
                  >
                    <div className="text-center bg-white bg-opacity-90 rounded-lg p-2 shadow-md hover:shadow-lg cursor-pointer">
                      <div className="text-3xl mb-1">{obj.emoji}</div>
                      <div className="font-comic text-xs text-gray-700">{obj.name}</div>
                    </div>
                  </div>
                ))}

              {/* Drop Zones for Missing Objects */}
              {missingObjects.map((obj) => {
                if (!obj.correctSlot || foundObjects.has(obj.id)) return null;
                
                return (
                  <div
                    key={`slot-${obj.id}`}
                    className="absolute border-2 border-dashed border-purple-400 bg-purple-100 bg-opacity-50 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-purple-600 hover:bg-purple-200 hover:scale-105"
                    style={{
                      left: `${obj.correctSlot.x}px`,
                      top: `${obj.correctSlot.y}px`,
                      width: `${obj.correctSlot.width}px`,
                      height: `${obj.correctSlot.height}px`,
                    }}
                    onDrop={(e) => handleDrop(e, obj.correctSlot!)}
                    onDragOver={handleDragOver}
                  >
                    <div className="text-purple-600 font-comic text-xs text-center p-1">
                      <div className="text-lg mb-1">📍</div>
                      <div>Drop {obj.name}</div>
                    </div>
                  </div>
                );
              })}

              {/* Found Objects in Correct Position */}
              {missingObjects
                .filter(obj => foundObjects.has(obj.id))
                .map((obj) => (
                  <div
                    key={`found-${obj.id}`}
                    className="absolute animate-scale-in"
                    style={{
                      left: `${obj.correctSlot!.x}px`,
                      top: `${obj.correctSlot!.y}px`,
                      width: `${obj.correctSlot!.width}px`,
                      height: `${obj.correctSlot!.height}px`,
                    }}
                  >
                    <div className="text-center bg-green-100 rounded-lg p-2 shadow-md border-2 border-green-300 hover:scale-105 transition-transform">
                      <div className="text-3xl mb-1">{obj.emoji}</div>
                      <div className="font-comic text-xs text-green-700">{obj.name}</div>
                      <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mt-1" />
                    </div>
                  </div>
                ))}

              {/* Success Animation */}
              {showSuccess && (
                <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full font-comic font-bold text-lg shadow-lg animate-scale-in">
                    ✨ Perfect! +{100 + Math.min(streak * 10, 100)} points! ✨
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500 flex items-center justify-center"
                style={{ width: `${(sceneProgress / totalMissing) * 100}%` }}
              >
                {sceneProgress > 0 && (
                  <span className="text-white font-comic text-xs font-bold">
                    {Math.round((sceneProgress / totalMissing) * 100)}%
                  </span>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Missing Objects Panel */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
              🎯 Missing Objects
            </h3>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {missingObjects.map((obj) => (
                <div
                  key={obj.id}
                  className={`transition-all duration-300 ${
                    foundObjects.has(obj.id) 
                      ? 'opacity-50 scale-95' 
                      : 'hover:scale-105 cursor-grab active:cursor-grabbing'
                  }`}
                  draggable={!foundObjects.has(obj.id)}
                  onDragStart={() => handleDragStart(obj.id)}
                  onDragEnd={handleDragEnd}
                >
                  <Card className={`p-3 text-center border-2 ${
                    foundObjects.has(obj.id)
                      ? 'border-green-300 bg-green-50'
                      : draggedObject === obj.id
                      ? 'border-purple-400 bg-purple-50 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}>
                    <div className="text-4xl mb-2">{obj.emoji}</div>
                    <div className="font-comic font-bold text-gray-800 mb-1">{obj.name}</div>
                    {!foundObjects.has(obj.id) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => showObjectHint(obj.id)}
                        className="text-xs border-blue-300 text-blue-600 hover:bg-blue-50"
                      >
                        💡 Hint
                      </Button>
                    )}
                    {foundObjects.has(obj.id) && (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mx-auto mt-2" />
                    )}
                  </Card>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-6 bg-blue-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-blue-800 mb-2">📖 How to Play:</h4>
              <ol className="font-comic text-sm text-blue-700 space-y-1">
                <li>1. Drag missing objects</li>
                <li>2. Drop in correct spots (purple zones)</li>
                <li>3. Use hints if stuck</li>
                <li>4. Build streak for bonus points!</li>
                <li>5. Complete all scenes to win!</li>
              </ol>
            </div>

            {/* Scene Progress */}
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-purple-800 mb-2">🎪 Scene Progress</h4>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg text-sm ${
                      index === currentScene
                        ? 'bg-purple-100 border border-purple-300'
                        : index < currentScene
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{scene.name.split(' ')[0]}</span>
                    <span className="font-comic text-xs flex-1">{scene.name.split(' ').slice(1).join(' ')}</span>
                    <Badge className={`text-xs ${getDifficultyColor(scene.difficulty)}`}>
                      {scene.difficulty}
                    </Badge>
                    {index < currentScene && (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    )}
                    {index === currentScene && (
                      <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SearchMissingObject;