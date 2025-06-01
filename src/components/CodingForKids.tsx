
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Monitor, Play, RotateCcw, ArrowRight, ArrowUp, ArrowDown, ArrowLeft } from 'lucide-react';

const CodingForKids = () => {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });
  const [commands, setCommands] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const codingConcepts = [
    {
      id: 1,
      title: 'Sequences',
      description: 'Learn to put commands in the right order',
      icon: '📝',
      level: 'Beginner',
      lessons: 8,
      completed: 6
    },
    {
      id: 2,
      title: 'Loops',
      description: 'Make the robot repeat actions multiple times',
      icon: '🔄',
      level: 'Beginner',
      lessons: 6,
      completed: 3
    },
    {
      id: 3,
      title: 'Conditionals',
      description: 'Teach the robot to make decisions',
      icon: '🤔',
      level: 'Intermediate',
      lessons: 10,
      completed: 1
    },
    {
      id: 4,
      title: 'Functions',
      description: 'Create reusable pieces of code',
      icon: '🧩',
      level: 'Advanced',
      lessons: 12,
      completed: 0
    }
  ];

  const blockCommands = [
    { id: 'forward', label: 'Move Forward', icon: <ArrowUp className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'backward', label: 'Move Back', icon: <ArrowDown className="w-4 h-4" />, color: 'bg-blue-500' },
    { id: 'left', label: 'Turn Left', icon: <ArrowLeft className="w-4 h-4" />, color: 'bg-green-500' },
    { id: 'right', label: 'Turn Right', icon: <ArrowRight className="w-4 h-4" />, color: 'bg-green-500' }
  ];

  const codingGames = [
    {
      id: 1,
      title: 'Robot Maze',
      description: 'Guide the robot through mazes using code blocks',
      icon: '🤖',
      difficulty: 'Easy',
      type: 'Puzzle',
      stars: 3
    },
    {
      id: 2,
      title: 'Dance Creator',
      description: 'Program a character to perform dance moves',
      icon: '💃',
      difficulty: 'Easy',
      type: 'Creative',
      stars: 2
    },
    {
      id: 3,
      title: 'Treasure Hunt',
      description: 'Code a path to collect all the treasures',
      icon: '💎',
      difficulty: 'Medium',
      type: 'Adventure',
      stars: 3
    },
    {
      id: 4,
      title: 'Art Generator',
      description: 'Create beautiful patterns using code loops',
      icon: '🎨',
      difficulty: 'Medium',
      type: 'Art',
      stars: 1
    }
  ];

  const addCommand = (command) => {
    setCommands([...commands, command]);
  };

  const runCode = () => {
    setIsRunning(true);
    // Simulate running the code
    setTimeout(() => {
      setIsRunning(false);
    }, 2000);
  };

  const resetCode = () => {
    setCommands([]);
    setRobotPosition({ x: 0, y: 0 });
  };

  const renderStars = (count) => {
    return Array.from({ length: 3 }, (_, i) => (
      <span key={i} className={`text-lg ${i < count ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Coding Header */}
      <Card className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            💻 Coding for Kids
          </h2>
          <p className="font-comic text-gray-600">
            Learn programming through fun games and visual blocks!
          </p>
        </div>
      </Card>

      {/* Block Coding Interface */}
      <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
          🧩 Visual Block Coding
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Code Blocks */}
          <div>
            <h4 className="font-comic font-bold text-gray-700 mb-3">Available Commands:</h4>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {blockCommands.map((command) => (
                <Button
                  key={command.id}
                  onClick={() => addCommand(command)}
                  className={`${command.color} text-white font-comic h-12 rounded-lg hover:opacity-90`}
                >
                  {command.icon}
                  <span className="ml-2 text-xs">{command.label}</span>
                </Button>
              ))}
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={runCode}
                disabled={commands.length === 0 || isRunning}
                className="gradient-green text-white font-comic rounded-full"
              >
                <Play className="w-4 h-4 mr-2" />
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
              <Button
                onClick={resetCode}
                variant="outline"
                className="font-comic rounded-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Code Display */}
          <div>
            <h4 className="font-comic font-bold text-gray-700 mb-3">Your Code:</h4>
            <div className="bg-gray-50 rounded-lg p-4 min-h-48 border-2 border-dashed border-gray-200">
              {commands.length === 0 ? (
                <div className="text-center text-gray-400 mt-8">
                  <Monitor className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="font-comic">Drag blocks here to create your program!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {commands.map((command, index) => (
                    <div
                      key={index}
                      className={`${command.color} text-white p-2 rounded flex items-center text-sm font-comic`}
                    >
                      {command.icon}
                      <span className="ml-2">{command.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Coding Concepts */}
      <div className="grid md:grid-cols-2 gap-6">
        {codingConcepts.map((concept) => (
          <Card key={concept.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{concept.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{concept.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {concept.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <Badge className={`font-comic text-xs ${
                  concept.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                  concept.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {concept.level}
                </Badge>
                <span className="font-comic text-sm text-gray-600">
                  {concept.completed}/{concept.lessons} lessons
                </span>
              </div>
              <Progress value={(concept.completed / concept.lessons) * 100} className="h-2" />
            </div>

            <Button className="w-full gradient-purple text-white font-comic font-bold rounded-full">
              {concept.completed > 0 ? 'Continue Learning' : 'Start Learning'}
            </Button>
          </Card>
        ))}
      </div>

      {/* Coding Games */}
      <div className="grid md:grid-cols-2 gap-6">
        {codingGames.map((game) => (
          <Card key={game.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{game.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{game.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {game.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-2">
                <Badge className={`font-comic text-xs ${
                  game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {game.difficulty}
                </Badge>
                <Badge variant="outline" className="font-comic text-xs">
                  {game.type}
                </Badge>
              </div>
              <div className="flex space-x-1">
                {renderStars(game.stars)}
              </div>
            </div>

            <Button className="w-full gradient-blue text-white font-comic font-bold rounded-full">
              Play Game
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CodingForKids;
