
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Smile, Users, Brain, Star, MessageCircle } from 'lucide-react';

const SocialEmotionalLearning = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [empathyPoints, setEmpathyPoints] = useState(75);

  const emotions = [
    { id: 1, name: 'Happy', emoji: '😊', color: 'bg-yellow-200', description: 'Feeling joyful and content' },
    { id: 2, name: 'Sad', emoji: '😢', color: 'bg-blue-200', description: 'Feeling down or upset' },
    { id: 3, name: 'Angry', emoji: '😡', color: 'bg-red-200', description: 'Feeling mad or frustrated' },
    { id: 4, name: 'Excited', emoji: '🤩', color: 'bg-purple-200', description: 'Feeling thrilled and energetic' },
    { id: 5, name: 'Nervous', emoji: '😰', color: 'bg-orange-200', description: 'Feeling worried or anxious' },
    { id: 6, name: 'Proud', emoji: '😌', color: 'bg-green-200', description: 'Feeling accomplished and confident' }
  ];

  const socialScenarios = [
    {
      id: 1,
      title: 'Playground Problem',
      description: 'Alex wants to play with the swings, but they\'re all taken. What should Alex do?',
      options: [
        { text: 'Wait patiently and ask nicely', points: 10, correct: true },
        { text: 'Push someone off a swing', points: 0, correct: false },
        { text: 'Find another fun activity', points: 8, correct: true }
      ]
    },
    {
      id: 2,
      title: 'Friend\'s Feelings',
      description: 'Sam looks sad because they dropped their lunch. How can you help?',
      options: [
        { text: 'Share your lunch with Sam', points: 10, correct: true },
        { text: 'Ignore Sam and eat your lunch', points: 0, correct: false },
        { text: 'Tell a teacher about Sam\'s problem', points: 8, correct: true }
      ]
    }
  ];

  const selLessons = [
    {
      id: 1,
      title: 'Emotion Detective',
      description: 'Learn to identify different emotions in yourself and others',
      icon: '🕵️',
      completed: true,
      points: 50
    },
    {
      id: 2,
      title: 'Kindness Champions',
      description: 'Practice acts of kindness and see how they make others feel',
      icon: '🌟',
      completed: false,
      points: 40
    },
    {
      id: 3,
      title: 'Problem Solvers',
      description: 'Learn healthy ways to solve conflicts with friends',
      icon: '🤝',
      completed: false,
      points: 60
    },
    {
      id: 4,
      title: 'Mindful Moments',
      description: 'Practice calming techniques and mindfulness exercises',
      icon: '🧘',
      completed: true,
      points: 30
    }
  ];

  return (
    <div className="space-y-6">
      {/* SEL Header */}
      <Card className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-pink rounded-full mx-auto mb-3 flex items-center justify-center">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            💝 Social & Emotional Learning
          </h2>
          <p className="font-comic text-gray-600">
            Learn about feelings, friendship, and how to be kind to others!
          </p>
        </div>

        {/* Empathy Meter */}
        <div className="mt-6 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 text-pink-500" />
              <span className="font-comic font-bold text-gray-800">Empathy Level</span>
            </div>
            <span className="font-comic text-sm text-gray-600">{empathyPoints}/100</span>
          </div>
          <Progress value={empathyPoints} className="h-3" />
        </div>
      </Card>

      {/* Emotion Explorer */}
      <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
          🎭 Emotion Explorer
        </h3>
        
        <div className="grid grid-cols-3 gap-3 mb-6">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              onClick={() => setSelectedEmotion(emotion)}
              className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
                selectedEmotion?.id === emotion.id 
                  ? `${emotion.color} ring-2 ring-gray-400` 
                  : `${emotion.color} hover:shadow-md`
              }`}
            >
              <div className="text-2xl mb-2">{emotion.emoji}</div>
              <div className="font-comic font-bold text-gray-800 text-sm">{emotion.name}</div>
            </button>
          ))}
        </div>

        {selectedEmotion && (
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="text-3xl mb-2">{selectedEmotion.emoji}</div>
            <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
              {selectedEmotion.name}
            </h4>
            <p className="font-comic text-gray-600 text-sm">
              {selectedEmotion.description}
            </p>
            <Button 
              size="sm" 
              className="mt-3 gradient-pink text-white font-comic rounded-full"
            >
              Practice This Emotion
            </Button>
          </div>
        )}
      </Card>

      {/* Social Scenarios */}
      <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 text-center">
          🤝 Social Scenarios
        </h3>

        {socialScenarios[currentScenario] && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {socialScenarios[currentScenario].title}
              </h4>
              <p className="font-comic text-gray-700">
                {socialScenarios[currentScenario].description}
              </p>
            </div>

            <div className="space-y-2">
              {socialScenarios[currentScenario].options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left font-comic p-4 h-auto"
                  onClick={() => {
                    if (option.correct) {
                      setEmpathyPoints(Math.min(100, empathyPoints + option.points));
                    }
                  }}
                >
                  {option.text}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* SEL Lessons */}
      <div className="grid md:grid-cols-2 gap-4">
        {selLessons.map((lesson) => (
          <Card key={lesson.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="flex items-center justify-between mb-3">
              <div className="text-2xl">{lesson.icon}</div>
              {lesson.completed && (
                <Badge className="bg-green-100 text-green-700 font-comic">
                  Completed
                </Badge>
              )}
            </div>

            <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
              {lesson.title}
            </h4>

            <p className="font-comic text-sm text-gray-600 mb-4">
              {lesson.description}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-comic text-sm font-bold">{lesson.points} pts</span>
              </div>

              <Button 
                size="sm"
                className={`font-comic font-bold rounded-full ${
                  lesson.completed 
                    ? 'bg-gray-200 text-gray-600' 
                    : 'gradient-pink text-white'
                }`}
                disabled={lesson.completed}
              >
                {lesson.completed ? 'Done!' : 'Start Lesson'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SocialEmotionalLearning;
