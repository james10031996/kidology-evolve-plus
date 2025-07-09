
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Star } from 'lucide-react';
import EmotionExplorer from './components/EmotionExplorer';
import SocialScenarios from './components/SocialScenarios';
import { emotions, socialScenarios, selLessons } from './data/selData';
import Header from '@/components/home/Header';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SocialEmotionalLearning = () => {
  const navigate = useNavigate();
  const [currentScenario, setCurrentScenario] = useState(0);
  const [empathyPoints, setEmpathyPoints] = useState(75);

  const handleAnswerSelect = (points: number) => {
    if (points > 0) {
      setEmpathyPoints(Math.min(100, empathyPoints + points));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <Header />
      <Card className="p-6 mb-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border-0 shadow-lg">
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
            className="mr-4 font-comic"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>
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

      <EmotionExplorer emotions={emotions} />

      <SocialScenarios
        scenarios={socialScenarios}
        currentScenario={currentScenario}
        empathyPoints={empathyPoints}
        onAnswerSelect={handleAnswerSelect}
      />

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
                className={`font-comic font-bold rounded-full ${lesson.completed
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
