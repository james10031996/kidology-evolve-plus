import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Beaker, Zap, Droplets, Thermometer, Eye, PlayCircle } from 'lucide-react';
import { experiments, scienceTopics } from './scienceData/scienceExplorersData';

const ScienceExperiments = () => { 
  const [activeExperiment, setActiveExperiment] = useState(null);
  const [completedSteps, setCompletedSteps] = useState(0);



  const startExperiment = (experiment) => {
    setActiveExperiment(experiment);
    setCompletedSteps(0);
  };

  const completeStep = () => {
    if (activeExperiment && completedSteps < activeExperiment.steps) {
      setCompletedSteps(completedSteps + 1);
    }
  };

  const getSafetyColor = (level) => {
    switch (level) {
      case 'Safe': return 'bg-green-100 text-green-700';
      case 'Adult Help': return 'bg-yellow-100 text-yellow-700';
      case 'Caution': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Science Header */}
      <Card className="p-6 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-green rounded-full mx-auto mb-3 flex items-center justify-center">
            <Beaker className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🔬 Science Experiments
          </h2>
          <p className="font-comic text-gray-600">
            Discover the wonders of science through safe, fun experiments!
          </p>
        </div>

        {/* Active Experiment Progress */}
        {activeExperiment && (
          <div className="mt-6 bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-comic font-bold text-gray-800">
                {activeExperiment.title} - Step {completedSteps + 1}
              </span>
              <span className="font-comic text-sm text-gray-600">
                {completedSteps}/{activeExperiment.steps}
              </span>
            </div>
            <Progress value={(completedSteps / activeExperiment.steps) * 100} className="h-3" />
            <Button
              onClick={completeStep}
              disabled={completedSteps >= activeExperiment.steps}
              size="sm"
              className="mt-3 gradient-green text-white font-comic rounded-full"
            >
              {completedSteps >= activeExperiment.steps ? 'Completed!' : 'Complete Step'}
            </Button>
          </div>
        )}
      </Card>

      {/* Experiments Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {experiments.map((experiment) => (
          <Card
            key={experiment.id}
            className="group relative overflow-hidden bg-gradient-to-br from-white via-green-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-green-100 animate-fade-in"
          >
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="text-4xl animate-bounce">{experiment.icon}</div>
                {experiment.completed && (
                  <Badge className="bg-green-100 text-green-700 font-comic">Completed</Badge>
                )}
              </div>

              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {experiment.title}
              </h3>

              <p className="font-comic text-sm text-gray-600 mb-4">
                {experiment.description}
              </p>

              <div className="text-xs text-blue-700 italic mb-2">
                🔍 {experiment.learningOutcome}
              </div>
              <div className="text-xs text-yellow-700 italic mb-4">
                🌟 {experiment.funFact}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="font-comic text-xs">
                    {experiment.category}
                  </Badge>
                  <Badge className={`font-comic text-xs ${getSafetyColor(experiment.safetyLevel)}`}>
                    {experiment.safetyLevel}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <Badge
                    className={`font-comic text-xs ${experiment.difficulty === 'Easy'
                        ? 'bg-green-100 text-green-700'
                        : experiment.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                  >
                    {experiment.difficulty}
                  </Badge>
                  <span className="font-comic text-xs text-gray-500">{experiment.duration}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-comic font-bold text-sm text-gray-700 mb-2">
                  Materials needed:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {experiment.materials.slice(0, 4).map((material, index) => (
                    <Badge key={index} variant="outline" className="font-comic text-xs">
                      {material}
                    </Badge>
                  ))}
                  {experiment.materials.length > 4 && (
                    <Badge variant="outline" className="font-comic text-xs">
                      +{experiment.materials.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              <Button
                onClick={() => startExperiment(experiment)}
                disabled={activeExperiment?.id === experiment.id}
                className={`w-full font-comic font-bold rounded-full ${experiment.completed
                    ? 'bg-gray-200 text-gray-600'
                    : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                  }`}
              >
                <PlayCircle className="w-4 h-4 mr-2" />
                {activeExperiment?.id === experiment.id
                  ? 'In Progress...'
                  : experiment.completed
                    ? 'Try Again'
                    : 'Start Experiment'}
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Science Topics */}
      <div className="grid md:grid-cols-2 gap-6">
        {scienceTopics.map((topic) => (
          <Card
            key={topic.id}
            className="p-5 bg-gradient-to-br from-white via-blue-50 to-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border border-blue-100 animate-fade-in"
          >
            <div className="text-center mb-4">
              <div className="text-4xl mb-2 animate-bounce">{topic.icon}</div>
              <h4 className="font-fredoka font-bold text-xl text-gray-800">{topic.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-700 mb-4 text-center px-2">
              {topic.description}
            </p>

            <div className="mb-4 px-1 text-left space-y-2">
              <h5 className="font-comic font-bold text-blue-600 text-sm">Key Concepts:</h5>
              <ul className="list-disc list-inside text-xs text-gray-600">
                {topic.keyConcepts?.map((concept, i) => (
                  <li key={i}>{concept}</li>
                ))}
              </ul>
              <p className="text-yellow-700 text-xs italic pt-1">🌟 {topic.funFact}</p>
            </div>

            <div className="space-y-3 mb-4 px-1">
              <div className="flex justify-between items-center">
                <span className="font-comic text-sm text-gray-700">Progress</span>
                <span className="font-comic text-sm font-bold text-gray-800">
                  {topic.completed}/{topic.activities} activities
                </span>
              </div>
              <Progress value={(topic.completed / topic.activities) * 100} className="h-2 bg-blue-200" />
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-comic font-bold rounded-full hover:from-blue-600 hover:to-purple-600 transition-colors duration-200">
              Explore Topic
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ScienceExperiments;
