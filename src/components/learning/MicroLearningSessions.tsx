import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Clock, 
  Play, 
  CheckCircle, 
  Star, 
  Brain, 
  Target,
  Zap,
  Timer,
  BookOpen,
  Gamepad2,
  Palette,
  Music
} from 'lucide-react';

interface MicroSession {
  id: string;
  title: string;
  category: string;
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'quiz' | 'game' | 'story' | 'activity';
  completed: boolean;
  stars: number;
  preview: string;
  skills: string[];
  color: string;
}

const MicroLearningSessions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sessions] = useState<MicroSession[]>([
    {
      id: '1',
      title: 'Quick Math Facts',
      category: 'Math',
      duration: 3,
      difficulty: 'easy',
      type: 'quiz',
      completed: false,
      stars: 0,
      preview: 'Practice addition and subtraction in just 3 minutes!',
      skills: ['Addition', 'Subtraction'],
      color: 'from-blue-400 to-cyan-500'
    },
    {
      id: '2',
      title: 'Letter Sound Game',
      category: 'English',
      duration: 5,
      difficulty: 'medium',
      type: 'game',
      completed: true,
      stars: 3,
      preview: 'Match letters with their sounds in this fun mini-game!',
      skills: ['Phonics', 'Letter Recognition'],
      color: 'from-green-400 to-emerald-500'
    },
    {
      id: '3',
      title: 'Animal Habitats',
      category: 'Science',
      duration: 4,
      difficulty: 'medium',
      type: 'story',
      completed: false,
      stars: 0,
      preview: 'Discover where different animals live around the world!',
      skills: ['Animals', 'Habitats', 'Environment'],
      color: 'from-purple-400 to-pink-500'
    },
    {
      id: '4',
      title: 'Color Mixing Lab',
      category: 'Art',
      duration: 6,
      difficulty: 'easy',
      type: 'activity',
      completed: false,
      stars: 0,
      preview: 'Learn about primary and secondary colors through mixing!',
      skills: ['Colors', 'Art', 'Creativity'],
      color: 'from-orange-400 to-red-500'
    },
    {
      id: '5',
      title: 'Rhythm Patterns',
      category: 'Music',
      duration: 4,
      difficulty: 'hard',
      type: 'game',
      completed: true,
      stars: 2,
      preview: 'Create and follow musical rhythm patterns!',
      skills: ['Rhythm', 'Patterns', 'Music'],
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: '6',
      title: 'Shape Detective',
      category: 'Math',
      duration: 5,
      difficulty: 'medium',
      type: 'game',
      completed: false,
      stars: 0,
      preview: 'Find and identify shapes in everyday objects!',
      skills: ['Shapes', 'Geometry', 'Observation'],
      color: 'from-indigo-400 to-blue-500'
    }
  ]);

  const categories = ['all', 'Math', 'English', 'Science', 'Art', 'Music'];

  const filteredSessions = selectedCategory === 'all' 
    ? sessions 
    : sessions.filter(session => session.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'game': return <Gamepad2 className="w-4 h-4" />;
      case 'story': return <BookOpen className="w-4 h-4" />;
      case 'activity': return <Palette className="w-4 h-4" />;
      default: return <Play className="w-4 h-4" />;
    }
  };

  const totalSessions = sessions.length;
  const completedSessions = sessions.filter(s => s.completed).length;
  const totalStars = sessions.reduce((sum, s) => sum + s.stars, 0);
  const completionRate = (completedSessions / totalSessions) * 100;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <Card className="bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Timer className="w-8 h-8" />
          <div>
            <h2 className="font-fredoka font-bold text-2xl">⚡ Micro-Learning Sessions</h2>
            <p className="font-comic text-lg opacity-90">Quick, fun learning in bite-sized chunks!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{completedSessions}</div>
            <div className="text-sm opacity-80">Completed</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{totalStars}</div>
            <div className="text-sm opacity-80">Stars Earned</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{Math.round(completionRate)}%</div>
            <div className="text-sm opacity-80">Progress</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{sessions.reduce((sum, s) => sum + s.duration, 0)}</div>
            <div className="text-sm opacity-80">Total Minutes</div>
          </div>
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className="capitalize"
          >
            {category === 'all' ? '🌟 All' : `${getCategoryIcon(category)} ${category}`}
          </Button>
        ))}
      </div>

      {/* Progress Overview */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-fredoka font-bold text-lg text-gray-800">Overall Progress</h3>
          <span className="font-comic text-sm text-gray-600">{completedSessions}/{totalSessions} completed</span>
        </div>
        <Progress value={completionRate} className="h-3" />
      </Card>

      {/* Sessions Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSessions.map((session) => (
          <Card key={session.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
            <div className={`h-2 bg-gradient-to-r ${session.color}`} />
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(session.type)}
                  <Badge variant="secondary" className="capitalize text-xs">
                    {session.type}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{session.duration}m</span>
                </div>
              </div>

              <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {session.title}
              </h4>

              <p className="font-comic text-sm text-gray-600 mb-3">
                {session.preview}
              </p>

              <div className="flex justify-between items-center mb-3">
                <Badge className={getDifficultyColor(session.difficulty)}>
                  {session.difficulty}
                </Badge>
                <span className="font-comic text-sm text-gray-500">{session.category}</span>
              </div>

              <div className="mb-4">
                <p className="font-comic text-xs text-gray-500 mb-1">Skills:</p>
                <div className="flex flex-wrap gap-1">
                  {session.skills.map((skill, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {session.completed ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-comic text-sm font-bold">Completed!</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < session.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <Button className={`w-full bg-gradient-to-r ${session.color} hover:opacity-90 group-hover:scale-105 transition-all duration-200`}>
                  <Play className="w-4 h-4 mr-2" />
                  Start Session
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Start Recommendations */}
      <Card className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex items-center gap-3 mb-3">
          <Target className="w-6 h-6 text-blue-500" />
          <h3 className="font-fredoka font-bold text-lg text-gray-800">🎯 Quick Start Recommendations</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border-l-4 border-green-400">
            <div className="font-comic font-bold text-sm text-gray-800">For Beginners</div>
            <div className="font-comic text-xs text-gray-600">Start with 3-minute easy sessions</div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-400">
            <div className="font-comic font-bold text-sm text-gray-800">Daily Goal</div>
            <div className="font-comic text-xs text-gray-600">Complete 2-3 micro-sessions per day</div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-purple-400">
            <div className="font-comic font-bold text-sm text-gray-800">Mix It Up</div>
            <div className="font-comic text-xs text-gray-600">Try different types for variety</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Math': return '🔢';
    case 'English': return '📚';
    case 'Science': return '🔬';
    case 'Art': return '🎨';
    case 'Music': return '🎵';
    default: return '📖';
  }
};

export default MicroLearningSessions;