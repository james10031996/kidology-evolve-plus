
import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Star, Trophy, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

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
};

type Scene = {
  id: string;
  name: string;
  background: string;
  description: string;
  objects: SceneObject[];
};

const SearchMissingObject = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const [foundObjects, setFoundObjects] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [draggedObject, setDraggedObject] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const gameAreaRef = useRef<HTMLDivElement>(null);

  const scenes: Scene[] = [
    {
      id: 'bedroom',
      name: '🛏️ Bedroom',
      background: 'bg-gradient-to-br from-pink-100 to-purple-100',
      description: 'Help organize this messy bedroom! Find the missing objects.',
      objects: [
        {
          id: 'bed',
          name: 'Bed',
          emoji: '🛏️',
          x: 20,
          y: 60,
          width: 120,
          height: 60,
          isMissing: false
        },
        {
          id: 'pillow',
          name: 'Pillow',
          emoji: '🪷',
          x: 300,
          y: 20,
          width: 40,
          height: 30,
          isMissing: true,
          correctSlot: { x: 30, y: 65, width: 40, height: 30 }
        },
        {
          id: 'lamp',
          name: 'Lamp',
          emoji: '🪔',
          x: 200,
          y: 40,
          width: 30,
          height: 40,
          isMissing: false
        },
        {
          id: 'book',
          name: 'Book',
          emoji: '📖',
          x: 350,
          y: 100,
          width: 30,
          height: 20,
          isMissing: true,
          correctSlot: { x: 170, y: 45, width: 30, height: 20 }
        },
        {
          id: 'clock',
          name: 'Clock',
          emoji: '⏰',
          x: 280,
          y: 80,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 80, y: 25, width: 35, height: 35 }
        }
      ]
    },
    {
      id: 'kitchen',
      name: '🍳 Kitchen',
      background: 'bg-gradient-to-br from-yellow-100 to-orange-100',
      description: 'The kitchen needs organizing! Put everything in its right place.',
      objects: [
        {
          id: 'stove',
          name: 'Stove',
          emoji: '🔥',
          x: 30,
          y: 70,
          width: 60,
          height: 50,
          isMissing: false
        },
        {
          id: 'pot',
          name: 'Pot',
          emoji: '🍲',
          x: 300,
          y: 30,
          width: 40,
          height: 40,
          isMissing: true,
          correctSlot: { x: 40, y: 75, width: 40, height: 40 }
        },
        {
          id: 'refrigerator',
          name: 'Refrigerator',
          emoji: '🧊',
          x: 150,
          y: 60,
          width: 50,
          height: 80,
          isMissing: false
        },
        {
          id: 'apple',
          name: 'Apple',
          emoji: '🍎',
          x: 320,
          y: 100,
          width: 25,
          height: 25,
          isMissing: true,
          correctSlot: { x: 160, y: 70, width: 25, height: 25 }
        },
        {
          id: 'cup',
          name: 'Cup',
          emoji: '☕',
          x: 280,
          y: 60,
          width: 30,
          height: 35,
          isMissing: true,
          correctSlot: { x: 100, y: 45, width: 30, height: 35 }
        }
      ]
    },
    {
      id: 'playground',
      name: '🏞️ Playground',
      background: 'bg-gradient-to-br from-green-100 to-blue-100',
      description: 'Kids left their toys scattered! Help put them back where they belong.',
      objects: [
        {
          id: 'swing',
          name: 'Swing',
          emoji: '🏗️',
          x: 40,
          y: 40,
          width: 60,
          height: 80,
          isMissing: false
        },
        {
          id: 'ball',
          name: 'Ball',
          emoji: '⚽',
          x: 300,
          y: 40,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 150, y: 100, width: 35, height: 35 }
        },
        {
          id: 'slide',
          name: 'Slide',
          emoji: '🛝',
          x: 120,
          y: 60,
          width: 80,
          height: 60,
          isMissing: false
        },
        {
          id: 'kite',
          name: 'Kite',
          emoji: '🪁',
          x: 350,
          y: 80,
          width: 40,
          height: 45,
          isMissing: true,
          correctSlot: { x: 50, y: 20, width: 40, height: 45 }
        },
        {
          id: 'bucket',
          name: 'Bucket',
          emoji: '🪣',
          x: 280,
          y: 110,
          width: 30,
          height: 30,
          isMissing: true,
          correctSlot: { x: 170, y: 110, width: 30, height: 30 }
        }
      ]
    }
  ];

  const currentSceneData = scenes[currentScene];
  const missingObjects = currentSceneData.objects.filter(obj => obj.isMissing);
  const sceneProgress = foundObjects.size;
  const totalMissing = missingObjects.length;

  const handleDragStart = (objectId: string) => {
    setDraggedObject(objectId);
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
      setScore(prev => prev + 100);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1500);

      // Check if scene is complete
      if (foundObjects.size + 1 >= totalMissing) {
        setTimeout(() => {
          if (currentScene < scenes.length - 1) {
            setCurrentScene(prev => prev + 1);
            setFoundObjects(new Set());
          } else {
            setGameComplete(true);
          }
        }, 2000);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const resetGame = () => {
    setCurrentScene(0);
    setFoundObjects(new Set());
    setScore(0);
    setGameComplete(false);
    setShowSuccess(false);
  };

  const nextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(prev => prev + 1);
      setFoundObjects(new Set());
    }
  };

  if (gameComplete) {
    return (
      <div className="text-center space-y-6">
        <Card className="p-8 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl border-0 shadow-lg">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
            Congratulations!
          </h2>
          <p className="font-comic text-lg text-gray-600 mb-4">
            You found all the missing objects in every scene!
          </p>
          <div className="bg-white bg-opacity-70 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center space-x-4">
              <Badge className="bg-yellow-100 text-yellow-800 font-comic text-lg px-4 py-2">
                <Trophy className="w-5 h-5 mr-2" />
                Final Score: {score}
              </Badge>
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
            🔍 Search for Missing Objects
          </h2>
          <p className="font-comic text-gray-600">
            Drag the missing objects back to where they belong!
          </p>
          <div className="mt-3 flex items-center justify-center space-x-4">
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
          </div>
        </div>
      </Card>

      {/* Game Area */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Scene */}
        <div className="lg:col-span-3">
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-fredoka font-bold text-xl text-gray-800">
                {currentSceneData.name}
              </h3>
              <div className="flex space-x-2">
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

            <p className="font-comic text-gray-600 mb-6">{currentSceneData.description}</p>

            {/* Scene Display */}
            <div
              ref={gameAreaRef}
              className={`relative ${currentSceneData.background} rounded-xl p-4 min-h-[400px] border-2 border-dashed border-gray-300 overflow-hidden`}
            >
              {/* Fixed Objects */}
              {currentSceneData.objects
                .filter(obj => !obj.isMissing)
                .map((obj) => (
                  <div
                    key={obj.id}
                    className="absolute transition-all duration-300"
                    style={{
                      left: `${obj.x}px`,
                      top: `${obj.y}px`,
                      width: `${obj.width}px`,
                      height: `${obj.height}px`,
                    }}
                  >
                    <div className="text-center bg-white bg-opacity-80 rounded-lg p-2 shadow-md">
                      <div className="text-2xl mb-1">{obj.emoji}</div>
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
                    className="absolute border-2 border-dashed border-gray-400 bg-gray-100 bg-opacity-50 rounded-lg flex items-center justify-center transition-all duration-300 hover:border-purple-400 hover:bg-purple-50"
                    style={{
                      left: `${obj.correctSlot.x}px`,
                      top: `${obj.correctSlot.y}px`,
                      width: `${obj.correctSlot.width}px`,
                      height: `${obj.correctSlot.height}px`,
                    }}
                    onDrop={(e) => handleDrop(e, obj.correctSlot!)}
                    onDragOver={handleDragOver}
                  >
                    <div className="text-gray-400 font-comic text-xs text-center">
                      Drop {obj.name} here
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
                    <div className="text-center bg-green-100 rounded-lg p-2 shadow-md border-2 border-green-300">
                      <div className="text-2xl mb-1">{obj.emoji}</div>
                      <div className="font-comic text-xs text-green-700">{obj.name}</div>
                      <CheckCircle2 className="w-4 h-4 text-green-600 mx-auto mt-1" />
                    </div>
                  </div>
                ))}

              {/* Success Animation */}
              {showSuccess && (
                <div className="absolute inset-0 flex items-center justify-center animate-fade-in">
                  <div className="bg-green-500 text-white px-6 py-3 rounded-full font-comic font-bold text-lg shadow-lg animate-scale-in">
                    ✨ Great Job! ✨
                  </div>
                </div>
              )}
            </div>

            {/* Progress Bar */}
            <div className="mt-4 bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(sceneProgress / totalMissing) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-center">
              <span className="font-comic text-sm text-gray-600">
                Progress: {sceneProgress}/{totalMissing} objects found
              </span>
            </div>
          </Card>
        </div>

        {/* Missing Objects Panel */}
        <div className="lg:col-span-1">
          <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">
              🎯 Missing Objects
            </h3>
            
            <div className="space-y-3">
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
                      ? 'border-purple-400 bg-purple-50 shadow-lg'
                      : 'border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }`}>
                    <div className="text-3xl mb-2">{obj.emoji}</div>
                    <div className="font-comic font-bold text-gray-800">{obj.name}</div>
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
                <li>1. Drag missing objects from the right panel</li>
                <li>2. Drop them in the correct dotted areas</li>
                <li>3. Complete all scenes to win!</li>
                <li>4. Get points for each correct placement</li>
              </ol>
            </div>

            {/* Scene Progress */}
            <div className="mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
              <h4 className="font-comic font-bold text-purple-800 mb-2">🎪 Scene Progress</h4>
              <div className="space-y-2">
                {scenes.map((scene, index) => (
                  <div
                    key={scene.id}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      index === currentScene
                        ? 'bg-purple-100 border border-purple-300'
                        : index < currentScene
                        ? 'bg-green-100'
                        : 'bg-gray-100'
                    }`}
                  >
                    <span className="text-lg">{scene.name.split(' ')[0]}</span>
                    <span className="font-comic text-xs flex-1">{scene.name.split(' ').slice(1).join(' ')}</span>
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
