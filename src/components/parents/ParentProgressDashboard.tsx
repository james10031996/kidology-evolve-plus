import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Star, 
  BookOpen, 
  Brain, 
  Trophy,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Award,
  AlertCircle,
  CheckCircle,
  Users,
  Download,
  Mail,
  Settings
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface LearningMetric {
  subject: string;
  timeSpent: number; // minutes this week
  accuracy: number; // percentage
  improvement: number; // percentage change
  sessionsCompleted: number;
  color: string;
}

interface WeeklyGoal {
  type: string;
  target: number;
  current: number;
  unit: string;
  icon: React.ReactNode;
}

interface LearningAlert {
  type: 'success' | 'warning' | 'info';
  title: string;
  message: string;
  action?: string;
}

const ParentProgressDashboard = () => {
  const { userData } = useUser();
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('week');
  
  const [metrics] = useState<LearningMetric[]>([
    {
      subject: 'Mathematics',
      timeSpent: 120,
      accuracy: 87,
      improvement: 12,
      sessionsCompleted: 8,
      color: 'from-blue-400 to-blue-600'
    },
    {
      subject: 'English',
      timeSpent: 90,
      accuracy: 92,
      improvement: 5,
      sessionsCompleted: 6,
      color: 'from-green-400 to-green-600'
    },
    {
      subject: 'Science',
      timeSpent: 75,
      accuracy: 78,
      improvement: -3,
      sessionsCompleted: 5,
      color: 'from-purple-400 to-purple-600'
    },
    {
      subject: 'Art & Creativity',
      timeSpent: 60,
      accuracy: 95,
      improvement: 8,
      sessionsCompleted: 4,
      color: 'from-pink-400 to-pink-600'
    }
  ]);

  const [weeklyGoals] = useState<WeeklyGoal[]>([
    {
      type: 'Study Time',
      target: 300,
      current: 245,
      unit: 'minutes',
      icon: <Clock className="w-5 h-5" />
    },
    {
      type: 'Sessions',
      target: 15,
      current: 12,
      unit: 'completed',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      type: 'Accuracy',
      target: 85,
      current: 88,
      unit: 'percent',
      icon: <Target className="w-5 h-5" />
    },
    {
      type: 'Achievements',
      target: 3,
      current: 2,
      unit: 'unlocked',
      icon: <Trophy className="w-5 h-5" />
    }
  ]);

  const [alerts] = useState<LearningAlert[]>([
    {
      type: 'success',
      title: 'Great Progress!',
      message: 'Your child has improved math accuracy by 12% this week',
      action: 'View Details'
    },
    {
      type: 'warning',
      title: 'Science Needs Attention',
      message: 'Science accuracy dropped by 3%. Consider extra practice',
      action: 'Recommend Activities'
    },
    {
      type: 'info',
      title: 'New Achievement Unlocked',
      message: 'Completed "Reading Champion" badge yesterday',
      action: 'Celebrate'
    }
  ]);

  const totalTimeThisWeek = metrics.reduce((sum, metric) => sum + metric.timeSpent, 0);
  const averageAccuracy = Math.round(metrics.reduce((sum, metric) => sum + metric.accuracy, 0) / metrics.length);
  const totalSessions = metrics.reduce((sum, metric) => sum + metric.sessionsCompleted, 0);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'info': return <Activity className="w-5 h-5 text-blue-500" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-fredoka font-bold text-3xl mb-2">👨‍👩‍👧‍👦 Parent Dashboard</h1>
            <p className="font-comic text-lg opacity-90">Real-time insights into your child's learning journey</p>
            <div className="mt-4 flex items-center gap-4">
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="font-comic text-sm">Child: Alex Johnson</span>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="font-comic text-sm">Age: 8 years</span>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1">
                <span className="font-comic text-sm">Grade: 3rd</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button variant="secondary" size="sm">
              <Mail className="w-4 h-4 mr-2" />
              Share Progress
            </Button>
          </div>
        </div>
      </Card>

      {/* Period Selector */}
      <div className="flex gap-2">
        {(['week', 'month', 'quarter'] as const).map((period) => (
          <Button
            key={period}
            variant={selectedPeriod === period ? "default" : "outline"}
            onClick={() => setSelectedPeriod(period)}
            className="capitalize"
          >
            {period === 'week' ? '📅 This Week' : period === 'month' ? '📊 This Month' : '📈 This Quarter'}
          </Button>
        ))}
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100">
          <div className="flex items-center gap-3">
            <Clock className="w-8 h-8 text-blue-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{totalTimeThisWeek}m</div>
              <div className="font-comic text-sm text-gray-600">Total Study Time</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-green-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{averageAccuracy}%</div>
              <div className="font-comic text-sm text-gray-600">Average Accuracy</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-purple-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{totalSessions}</div>
              <div className="font-comic text-sm text-gray-600">Sessions Completed</div>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-yellow-100">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <div className="font-fredoka font-bold text-2xl text-gray-800">{userData.stars}</div>
              <div className="font-comic text-sm text-gray-600">Stars Earned</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Learning Alerts */}
      <Card className="p-4">
        <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-blue-500" />
          📢 Learning Insights & Alerts
        </h3>
        <div className="space-y-3">
          {alerts.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${
              alert.type === 'success' ? 'bg-green-50 border-green-400' :
              alert.type === 'warning' ? 'bg-orange-50 border-orange-400' :
              'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {getAlertIcon(alert.type)}
                  <div>
                    <div className="font-fredoka font-bold text-sm text-gray-800">{alert.title}</div>
                    <div className="font-comic text-sm text-gray-600">{alert.message}</div>
                  </div>
                </div>
                {alert.action && (
                  <Button size="sm" variant="outline" className="text-xs">
                    {alert.action}
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Tabs defaultValue="subjects" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subjects">📚 By Subject</TabsTrigger>
          <TabsTrigger value="goals">🎯 Goals</TabsTrigger>
          <TabsTrigger value="trends">📈 Trends</TabsTrigger>
          <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-fredoka font-bold text-lg text-gray-800">{metric.subject}</h4>
                  <Badge variant={metric.improvement >= 0 ? "default" : "destructive"}>
                    {metric.improvement >= 0 ? '+' : ''}{metric.improvement}%
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-comic text-gray-600">Time Spent</span>
                      <span className="font-bold">{metric.timeSpent} minutes</span>
                    </div>
                    <div className={`h-2 bg-gradient-to-r ${metric.color} rounded-full`} 
                         style={{width: `${(metric.timeSpent / 150) * 100}%`}} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-comic text-gray-600">Accuracy</span>
                      <span className="font-bold">{metric.accuracy}%</span>
                    </div>
                    <Progress value={metric.accuracy} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="font-comic text-gray-600">Sessions</span>
                    <span className="font-bold">{metric.sessionsCompleted} completed</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {weeklyGoals.map((goal, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  {goal.icon}
                  <h4 className="font-fredoka font-bold text-lg text-gray-800">{goal.type}</h4>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-comic text-gray-600">Progress</span>
                    <span className="font-bold">
                      {goal.current}/{goal.target} {goal.unit}
                    </span>
                  </div>
                  <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                  
                  <div className={`text-xs font-comic ${
                    goal.current >= goal.target ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {goal.current >= goal.target 
                      ? '🎉 Goal achieved!' 
                      : `${goal.target - goal.current} ${goal.unit} remaining`
                    }
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card className="p-6">
            <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4">📊 Learning Trends</h3>
            <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <p className="font-comic text-gray-600">Interactive charts showing learning progress over time</p>
                <p className="font-comic text-sm text-gray-500 mt-2">Data visualization coming soon!</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {userData.achievements.slice(0, 6).map((achievement, index) => (
              <Card key={index} className="p-4">
                <div className="text-center">
                  <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <h4 className="font-fredoka font-bold text-sm text-gray-800 mb-1">
                    {achievement.name}
                  </h4>
                  <p className="font-comic text-xs text-gray-600 mb-2">
                    {achievement.description}
                  </p>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.unlocked ? 'Unlocked' : 'In Progress'}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recommendations */}
      <Card className="p-4 bg-gradient-to-r from-cyan-50 to-blue-50">
        <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
          <Brain className="w-5 h-5 text-blue-500" />
          💡 AI Recommendations for Parents
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-3 border-l-4 border-green-400">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Encourage Math Practice</div>
            <div className="font-comic text-xs text-gray-600">Your child shows strong improvement in math. Consider advanced problem-solving activities.</div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-yellow-400">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Reading Time</div>
            <div className="font-comic text-xs text-gray-600">Add 10 minutes of daily reading to boost comprehension skills.</div>
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-purple-400">
            <div className="font-comic font-bold text-sm text-gray-800 mb-1">Creative Exploration</div>
            <div className="font-comic text-xs text-gray-600">Your child loves art! Introduce music or creative writing activities.</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ParentProgressDashboard;