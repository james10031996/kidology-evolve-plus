
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Beaker, Microscope, Calculator, Atom, Zap, Globe } from 'lucide-react';

const STEMLab = () => {
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [experimentProgress, setExperimentProgress] = useState(0);

  const experiments = [
    {
      id: 1,
      title: 'Virtual Chemistry Lab',
      description: 'Mix safe virtual chemicals and see amazing reactions!',
      icon: <Beaker className="w-6 h-6" />,
      category: 'Chemistry',
      difficulty: 'Medium',
      duration: '10 min',
      gradient: 'gradient-green'
    },
    {
      id: 2,
      title: 'Space Explorer',
      description: 'Journey through the solar system and learn about planets',
      icon: <Globe className="w-6 h-6" />,
      category: 'Astronomy',
      difficulty: 'Easy',
      duration: '8 min',
      gradient: 'gradient-blue'
    },
    {
      id: 3,
      title: 'Physics Playground',
      description: 'Experiment with gravity, motion, and forces',
      icon: <Zap className="w-6 h-6" />,
      category: 'Physics',
      difficulty: 'Hard',
      duration: '15 min',
      gradient: 'gradient-orange'
    },
    {
      id: 4,
      title: 'Math Visualizer',
      description: 'See numbers and equations come to life!',
      icon: <Calculator className="w-6 h-6" />,
      category: 'Mathematics',
      difficulty: 'Medium',
      duration: '12 min',
      gradient: 'gradient-purple'
    }
  ];

  const startExperiment = (experimentId) => {
    setActiveExperiment(experimentId);
    setExperimentProgress(0);
    
    // Simulate experiment progress
    const interval = setInterval(() => {
      setExperimentProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Lab Header */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Microscope className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🔬 STEM Discovery Lab
          </h2>
          <p className="font-comic text-gray-600">
            Explore science, technology, engineering, and math through fun experiments!
          </p>
        </div>

        {/* Active Experiment Progress */}
        {activeExperiment && (
          <div className="mt-6 p-4 bg-white rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-gray-800">Experiment in Progress</span>
              <span className="font-comic text-sm text-gray-600">{experimentProgress}%</span>
            </div>
            <Progress value={experimentProgress} className="h-3" />
          </div>
        )}
      </Card>

      {/* Experiments Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {experiments.map((experiment) => (
          <Card key={experiment.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0">
            <div className={`${experiment.gradient} h-24 relative flex items-center justify-center text-white`}>
              {experiment.icon}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="outline" className="font-comic text-xs">
                  {experiment.category}
                </Badge>
                <Badge className="bg-blue-100 text-blue-700 font-comic text-xs">
                  {experiment.duration}
                </Badge>
              </div>

              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {experiment.title}
              </h3>

              <p className="font-comic text-gray-600 text-sm mb-4">
                {experiment.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <span className="font-comic text-xs text-gray-500">Difficulty:</span>
                  <Badge className={`font-comic text-xs ${
                    experiment.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    experiment.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {experiment.difficulty}
                  </Badge>
                </div>

                <Button 
                  onClick={() => startExperiment(experiment.id)}
                  disabled={activeExperiment === experiment.id}
                  size="sm"
                  className={`${experiment.gradient} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                >
                  {activeExperiment === experiment.id ? 'Running...' : 'Start Experiment'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Facts */}
      <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border-0">
        <div className="text-center">
          <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
            🧠 Did You Know?
          </h3>
          <p className="font-comic text-gray-600 text-sm">
            Scientists discover about 18,000 new species every year! Keep exploring to make your own discoveries!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default STEMLab;
