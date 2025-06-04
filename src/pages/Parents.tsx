
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, TrendingUp, Award, Calendar, Users, Shield, Settings, AlertCircle, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

const Parents = () => {
  const { userData } = useUser();

  const weeklyActivity = [
    { day: 'Mon', minutes: 45, lessons: 3, subjects: ['Math', 'Reading'] },
    { day: 'Tue', minutes: 60, lessons: 4, subjects: ['Science', 'Art'] },
    { day: 'Wed', minutes: 30, lessons: 2, subjects: ['Math'] },
    { day: 'Thu', minutes: 75, lessons: 5, subjects: ['Reading', 'Science', 'Math'] },
    { day: 'Fri', minutes: 50, lessons: 3, subjects: ['Art', 'Music'] },
    { day: 'Sat', minutes: 90, lessons: 6, subjects: ['All Subjects'] },
    { day: 'Sun', minutes: 35, lessons: 2, subjects: ['Reading'] }
  ];

  const recentAchievements = userData.achievements
    .filter(a => a.unlocked && a.unlockedDate)
    .sort((a, b) => new Date(b.unlockedDate!).getTime() - new Date(a.unlockedDate!).getTime())
    .slice(0, 3);

  const concerns = [
    { 
      type: 'Screen Time', 
      message: 'Daily limit approaching (45/60 minutes)', 
      level: 'warning',
      action: 'Monitor usage'
    },
    { 
      type: 'Difficulty', 
      message: 'Struggling with multiplication tables', 
      level: 'attention',
      action: 'Extra practice recommended'
    }
  ];

  const safetySettings = [
    { name: 'Safe Mode', status: 'Active', description: 'All content is kid-friendly', color: 'green' },
    { name: 'Screen Time Limit', status: '60 min/day', description: 'Automatic logout when reached', color: 'blue' },
    { name: 'Communication', status: 'Disabled', description: 'No chat or social features', color: 'purple' }
  ];

  const learningInsights = [
    { 
      title: 'Strongest Subject', 
      value: 'Mathematics', 
      detail: '85% mastery, ahead of grade level',
      icon: '📊',
      color: 'text-green-600'
    },
    { 
      title: 'Favorite Activity', 
      value: 'Interactive Stories', 
      detail: 'Completed 15 stories this month',
      icon: '📚',
      color: 'text-blue-600'
    },
    { 
      title: 'Learning Style', 
      value: 'Visual Learner', 
      detail: 'Performs best with visual aids',
      icon: '👁️',
      color: 'text-purple-600'
    },
    { 
      title: 'Peak Learning Time', 
      value: 'Morning', 
      detail: 'Most active between 9-11 AM',
      icon: '🌅',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            👨‍👩‍👧‍👦 Parent Dashboard
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor {userData.name}'s learning progress, ensure safety, and celebrate achievements together!
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="overview" className="rounded-full font-comic font-bold">Overview</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-full font-comic font-bold">Progress</TabsTrigger>
            <TabsTrigger value="safety" className="rounded-full font-comic font-bold">Safety</TabsTrigger>
            <TabsTrigger value="insights" className="rounded-full font-comic font-bold">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Weekly Summary */}
              <Card className="lg:col-span-2 p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">This Week's Activity</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-blue-600">
                      {(weeklyActivity.reduce((sum, day) => sum + day.minutes, 0) / 60).toFixed(1)}h
                    </div>
                    <div className="font-comic text-sm text-gray-600">Total Time</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-green-600">
                      {weeklyActivity.reduce((sum, day) => sum + day.lessons, 0)}
                    </div>
                    <div className="font-comic text-sm text-gray-600">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-orange-600">{userData.streak}</div>
                    <div className="font-comic text-sm text-gray-600">Day Streak</div>
                  </div>
                </div>

                <div className="space-y-4">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="font-comic font-bold text-gray-800 w-8">{day.day}</span>
                          <div className="flex flex-wrap gap-1">
                            {day.subjects.map((subject, index) => (
                              <Badge key={index} variant="outline" className="font-comic text-xs">
                                {subject}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-comic text-sm font-bold text-gray-700">{day.minutes} min</div>
                          <div className="font-comic text-xs text-gray-600">{day.lessons} lessons</div>
                        </div>
                      </div>
                      <Progress value={(day.minutes / 90) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Stats & Alerts */}
              <div className="space-y-6">
                {/* Recent Achievements */}
                <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                  <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Recent Achievements</h3>
                  
                  <div className="space-y-3">
                    {recentAchievements.map((achievement, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-comic font-bold text-sm text-gray-800">{achievement.name}</div>
                          <div className="font-comic text-xs text-gray-600">
                            {new Date(achievement.unlockedDate!).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Alerts & Concerns */}
                <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                  <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Parent Alerts</h3>
                  
                  <div className="space-y-3">
                    {concerns.map((concern, index) => (
                      <div key={index} className={`p-3 rounded-xl border-l-4 ${
                        concern.level === 'warning' 
                          ? 'bg-yellow-50 border-yellow-400' 
                          : 'bg-blue-50 border-blue-400'
                      }`}>
                        <div className="flex items-start space-x-3">
                          <AlertCircle className={`w-5 h-5 mt-1 ${
                            concern.level === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                          }`} />
                          <div className="flex-1">
                            <div className="font-comic font-bold text-sm text-gray-800">{concern.type}</div>
                            <div className="font-comic text-sm text-gray-600 mb-2">{concern.message}</div>
                            <Badge className={`text-xs font-comic ${
                              concern.level === 'warning' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {concern.action}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Subject Mastery</h3>
                
                <div className="space-y-6">
                  {userData.progress.map((subject, index) => (
                    <div key={subject.name}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 ${subject.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                            {subject.name[0]}
                          </div>
                          <div>
                            <span className="font-comic font-bold text-gray-800">{subject.name}</span>
                            <div className="font-comic text-xs text-gray-600">Level {subject.level}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-fredoka font-bold text-lg text-gray-800">{subject.progress}%</div>
                          <Badge variant="outline" className="font-comic text-xs">
                            {subject.progress >= 80 ? 'Excellent' : subject.progress >= 60 ? 'Good' : 'Needs Practice'}
                          </Badge>
                        </div>
                      </div>
                      <Progress value={subject.progress} className="h-3 mb-2" />
                      <div className="font-comic text-xs text-gray-600">Next: {subject.nextMilestone}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Learning Patterns</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-comic font-bold text-gray-800">Consistent Learner</span>
                    </div>
                    <p className="font-comic text-sm text-gray-600">
                      {userData.name} maintains a regular learning schedule with {userData.streak} consecutive days of activity.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <span className="font-comic font-bold text-gray-800">Improving Rapidly</span>
                    </div>
                    <p className="font-comic text-sm text-gray-600">
                      Math skills have improved by 15% this month, showing excellent progress.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center space-x-3 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <span className="font-comic font-bold text-gray-800">Achievement Hunter</span>
                    </div>
                    <p className="font-comic text-sm text-gray-600">
                      Unlocked {userData.achievements.filter(a => a.unlocked).length} achievements, showing great motivation.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Safety Controls</h3>
                
                <div className="space-y-4">
                  {safetySettings.map((setting, index) => (
                    <div key={index} className={`p-4 rounded-xl bg-${setting.color}-50`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <Shield className={`w-6 h-6 text-${setting.color}-600`} />
                          <div>
                            <div className="font-comic font-bold text-gray-800">{setting.name}</div>
                            <div className="font-comic text-sm text-gray-600">{setting.description}</div>
                          </div>
                        </div>
                        <Badge className={`bg-${setting.color}-500 text-white font-comic`}>
                          {setting.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <Button variant="outline" className="w-full justify-start font-comic">
                    <Settings className="w-5 h-5 mr-3" />
                    Adjust Screen Time Limits
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-comic">
                    <Shield className="w-5 h-5 mr-3" />
                    Content Filter Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start font-comic">
                    <Users className="w-5 h-5 mr-3" />
                    Activity Reports
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Privacy & Data</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-comic font-bold text-gray-800">Data Protected</span>
                    </div>
                    <p className="font-comic text-sm text-gray-600">
                      All learning data is encrypted and stored securely. No personal information is shared with third parties.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <span className="font-comic font-bold text-gray-800">COPPA Compliant</span>
                    </div>
                    <p className="font-comic text-sm text-gray-600">
                      Our platform follows strict children's privacy guidelines and safety standards.
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="outline" className="w-full font-comic">
                    View Complete Privacy Policy
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Learning Insights</h3>
                
                <div className="space-y-4">
                  {learningInsights.map((insight, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{insight.icon}</span>
                        <div className="flex-1">
                          <div className="font-comic font-bold text-gray-800">{insight.title}</div>
                          <div className={`font-comic text-sm ${insight.color}`}>{insight.value}</div>
                        </div>
                      </div>
                      <p className="font-comic text-sm text-gray-600">{insight.detail}</p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Recommendations</h3>
                
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 rounded-xl border-l-4 border-yellow-400">
                    <h4 className="font-comic font-bold text-gray-800 mb-2">Focus Area</h4>
                    <p className="font-comic text-sm text-gray-600 mb-2">
                      Science progress is slower than other subjects. Consider more hands-on experiments.
                    </p>
                    <Button size="sm" className="gradient-blue text-white font-comic">
                      View Science Activities
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-xl border-l-4 border-green-400">
                    <h4 className="font-comic font-bold text-gray-800 mb-2">Strength</h4>
                    <p className="font-comic text-sm text-gray-600 mb-2">
                      Excellent reading comprehension! Consider advanced reading materials.
                    </p>
                    <Button size="sm" className="gradient-green text-white font-comic">
                      Advanced Stories
                    </Button>
                  </div>
                  
                  <div className="p-4 bg-purple-50 rounded-xl border-l-4 border-purple-400">
                    <h4 className="font-comic font-bold text-gray-800 mb-2">Schedule Tip</h4>
                    <p className="font-comic text-sm text-gray-600">
                      {userData.name} learns best in the morning. Consider scheduling important lessons before 11 AM.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Parents;
