
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, Target, Star, Trophy, Plus, Minus, X, Divide } from 'lucide-react';

const InteractiveMath = () => {
  const [currentProblem, setCurrentProblem] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const mathProblems = [
    { question: '5 + 3 = ?', answer: 8, options: [6, 7, 8, 9], type: 'addition' },
    { question: '12 - 4 = ?', answer: 8, options: [6, 7, 8, 9], type: 'subtraction' },
    { question: '3 × 4 = ?', answer: 12, options: [10, 11, 12, 13], type: 'multiplication' },
    { question: '15 ÷ 3 = ?', answer: 5, options: [3, 4, 5, 6], type: 'division' }
  ];

  const mathActivities = [
    {
      id: 1,
      title: 'Number Line Jump',
      description: 'Hop along the number line to learn counting',
      icon: '🦘',
      difficulty: 'Easy',
      ageGroup: '4-6',
      completed: false
    },
    {
      id: 2,
      title: 'Shape Safari',
      description: 'Hunt for shapes in the wild jungle',
      icon: '🔺',
      difficulty: 'Easy',
      ageGroup: '4-7',
      completed: true
    },
    {
      id: 3,
      title: 'Pizza Fractions',
      description: 'Learn fractions by making delicious pizzas',
      icon: '🍕',
      difficulty: 'Medium',
      ageGroup: '6-8',
      completed: false
    },
    {
      id: 4,
      title: 'Money Math',
      description: 'Count coins and learn about money',
      icon: '💰',
      difficulty: 'Medium',
      ageGroup: '7-9',
      completed: false
    }
  ];

  const checkAnswer = (answer) => {
    setSelectedAnswer(answer);
    if (answer === mathProblems[currentProblem].answer) {
      setScore(score + 10);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const nextProblem = () => {
    setCurrentProblem((currentProblem + 1) % mathProblems.length);
    setSelectedAnswer(null);
  };

  const getOperationIcon = (type) => {
    switch(type) {
      case 'addition': return <Plus className="w-4 h-4" />;
      case 'subtraction': return <Minus className="w-4 h-4" />;
      case 'multiplication': return <X className="w-4 h-4" />;
      case 'division': return <Divide className="w-4 h-4" />;
      default: return <Calculator className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Math Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🔢 Interactive Math Adventures
          </h2>
          <p className="font-comic text-gray-600">
            Make math fun with games, puzzles, and interactive problems!
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="text-center">
            <div className="font-fredoka text-2xl text-blue-600">{score}</div>
            <div className="font-comic text-xs text-gray-600">Points</div>
          </div>
          <div className="text-center">
            <div className="font-fredoka text-2xl text-orange-500">{streak}</div>
            <div className="font-comic text-xs text-gray-600">Streak</div>
          </div>
          <div className="text-center">
            <div className="font-fredoka text-2xl text-green-500">{mathActivities.filter(a => a.completed).length}</div>
            <div className="font-comic text-xs text-gray-600">Completed</div>
          </div>
        </div>
      </Card>

      {/* Current Problem */}
      <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            {getOperationIcon(mathProblems[currentProblem].type)}
            <h3 className="font-fredoka font-bold text-xl text-gray-800">
              Math Challenge
            </h3>
          </div>
          
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 mb-6">
            <div className="font-fredoka text-3xl text-gray-800 mb-4">
              {mathProblems[currentProblem].question}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {mathProblems[currentProblem].options.map((option, index) => (
                <Button
                  key={index}
                  onClick={() => checkAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`h-12 font-fredoka text-lg rounded-xl ${
                    selectedAnswer === option
                      ? option === mathProblems[currentProblem].answer
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : selectedAnswer !== null && option === mathProblems[currentProblem].answer
                      ? 'bg-green-500 text-white'
                      : 'bg-white border-2 border-gray-200 text-gray-800 hover:border-blue-300'
                  }`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {selectedAnswer !== null && (
            <Button 
              onClick={nextProblem}
              className="gradient-blue text-white font-comic font-bold rounded-full"
            >
              Next Problem →
            </Button>
          )}
        </div>
      </Card>

      {/* Math Activities */}
      <div className="grid md:grid-cols-2 gap-6">
        {mathActivities.map((activity) => (
          <Card key={activity.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{activity.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {activity.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                activity.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                activity.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {activity.difficulty}
              </Badge>
              <Badge variant="outline" className="font-comic text-xs">
                Ages {activity.ageGroup}
              </Badge>
            </div>

            <Button className={`w-full font-comic font-bold rounded-full ${
              activity.completed ? 'bg-gray-200 text-gray-600' : 'gradient-blue text-white'
            }`}>
              {activity.completed ? (
                <>
                  <Trophy className="w-4 h-4 mr-2" />
                  Completed!
                </>
              ) : (
                'Start Activity'
              )}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default InteractiveMath;
