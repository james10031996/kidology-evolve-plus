import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Target, Sparkles, BookOpen, Clock } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface LearningPath {
  id: string;
  subject: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  nextTopics: string[];
  estimatedTime: string;
  adaptiveReason: string;
}

interface LearningInsight {
  type: 'strength' | 'weakness' | 'recommendation';
  title: string;
  description: string;
  action?: string;
}

const AIAdaptiveLearningEngine = () => {
  const { userData } = useUser();
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([
    {
      id: '1',
      subject: 'Mathematics',
      difficulty: 'intermediate',
      progress: 75,
      nextTopics: ['Fractions', 'Decimals', 'Problem Solving'],
      estimatedTime: '15 mins',
      adaptiveReason: 'Based on your strong performance in basic arithmetic'
    },
    {
      id: '2',
      subject: 'English',
      difficulty: 'beginner',
      progress: 45,
      nextTopics: ['Vocabulary Building', 'Reading Comprehension'],
      estimatedTime: '12 mins',
      adaptiveReason: 'Focusing on reading skills to improve overall performance'
    },
    {
      id: '3',
      subject: 'Science',
      difficulty: 'advanced',
      progress: 60,
      nextTopics: ['Solar System', 'Physics Basics'],
      estimatedTime: '20 mins',
      adaptiveReason: 'You excel at scientific concepts, ready for advanced topics'
    }
  ]);

  const [insights, setInsights] = useState<LearningInsight[]>([
    {
      type: 'strength',
      title: 'Mathematical Reasoning',
      description: 'You show excellent pattern recognition skills!',
      action: 'Continue with advanced problem solving'
    },
    {
      type: 'weakness',
      title: 'Reading Speed',
      description: 'Consider practicing reading comprehension exercises',
      action: 'Try daily reading sessions'
    },
    {
      type: 'recommendation',
      title: 'Creative Arts',
      description: 'Based on your learning style, you might enjoy visual arts',
      action: 'Explore creative activities'
    }
  ]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'from-green-400 to-emerald-500';
      case 'intermediate': return 'from-yellow-400 to-orange-500';
      case 'advanced': return 'from-purple-400 to-pink-500';
      default: return 'from-blue-400 to-cyan-500';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'weakness': return <Target className="w-5 h-5 text-orange-500" />;
      case 'recommendation': return <Sparkles className="w-5 h-5 text-purple-500" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* AI Learning Header */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-8 h-8" />
          <div>
            <h2 className="font-fredoka font-bold text-2xl">🤖 AI Learning Assistant</h2>
            <p className="font-comic text-lg opacity-90">Personalized learning just for you!</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-bold text-xl">{userData.level}</div>
            <div className="text-sm opacity-80">Current Level</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-bold text-xl">{userData.stars}</div>
            <div className="text-sm opacity-80">Total Stars</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="font-bold text-xl">87%</div>
            <div className="text-sm opacity-80">AI Match Score</div>
          </div>
        </div>
      </Card>

      {/* Adaptive Learning Paths */}
      <div>
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-500" />
          🎯 Your Personalized Learning Paths
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {learningPaths.map((path) => (
            <Card key={path.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
              <div className={`h-2 bg-gradient-to-r ${getDifficultyColor(path.difficulty)}`} />
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-fredoka font-bold text-lg text-gray-800">{path.subject}</h4>
                  <Badge variant="secondary" className="capitalize">
                    {path.difficulty}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-comic text-gray-600">Progress</span>
                    <span className="font-bold text-gray-800">{path.progress}%</span>
                  </div>
                  <Progress value={path.progress} className="h-2" />
                </div>

                <div className="mb-3">
                  <p className="font-comic text-sm text-gray-600 mb-2">Next Topics:</p>
                  <div className="flex flex-wrap gap-1">
                    {path.nextTopics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-comic">{path.estimatedTime}</span>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="font-comic text-xs text-blue-700">
                    💡 <strong>AI Insight:</strong> {path.adaptiveReason}
                  </p>
                </div>

                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600">
                  Start Learning
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Learning Insights */}
      <div>
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-yellow-500" />
          ✨ AI Learning Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          {insights.map((insight, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start gap-3">
                {getInsightIcon(insight.type)}
                <div className="flex-1">
                  <h4 className="font-fredoka font-bold text-sm text-gray-800 mb-1">
                    {insight.title}
                  </h4>
                  <p className="font-comic text-xs text-gray-600 mb-2">
                    {insight.description}
                  </p>
                  {insight.action && (
                    <Button size="sm" variant="outline" className="text-xs">
                      {insight.action}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIAdaptiveLearningEngine;