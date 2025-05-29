
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, TrendingUp, Award, Calendar, Users, Shield, Settings } from 'lucide-react';

const ParentDashboard = () => {
  const weeklyActivity = [
    { day: 'Mon', minutes: 45, lessons: 3 },
    { day: 'Tue', minutes: 60, lessons: 4 },
    { day: 'Wed', minutes: 30, lessons: 2 },
    { day: 'Thu', minutes: 75, lessons: 5 },
    { day: 'Fri', minutes: 50, lessons: 3 },
    { day: 'Sat', minutes: 90, lessons: 6 },
    { day: 'Sun', minutes: 35, lessons: 2 }
  ];

  const achievements = [
    { name: 'Math Wizard', date: '2024-01-15', subject: 'Mathematics' },
    { name: 'Reading Star', date: '2024-01-12', subject: 'English' },
    { name: 'Science Explorer', date: '2024-01-10', subject: 'Science' }
  ];

  const concerns = [
    { type: 'Screen Time', message: 'Daily limit approaching (45/60 minutes)', level: 'warning' },
    { type: 'Difficulty', message: 'Struggling with multiplication tables', level: 'attention' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Parent Dashboard
          </h2>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Monitor your child's learning progress, set goals, and ensure a safe learning environment.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="overview" className="rounded-full font-comic font-bold">Overview</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-full font-comic font-bold">Progress</TabsTrigger>
            <TabsTrigger value="safety" className="rounded-full font-comic font-bold">Safety</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-full font-comic font-bold">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="lg:col-span-2 p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">This Week's Activity</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-blue-600">6.2h</div>
                    <div className="font-comic text-sm text-gray-600">Total Time</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-green-600">25</div>
                    <div className="font-comic text-sm text-gray-600">Lessons</div>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-xl">
                    <div className="font-fredoka font-bold text-2xl text-orange-600">12</div>
                    <div className="font-comic text-sm text-gray-600">Streak Days</div>
                  </div>
                </div>

                <div className="space-y-3">
                  {weeklyActivity.map((day) => (
                    <div key={day.day} className="flex items-center space-x-4">
                      <div className="w-8 font-comic text-sm text-gray-600">{day.day}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-comic text-sm text-gray-700">{day.minutes} minutes</span>
                          <span className="font-comic text-sm text-gray-700">{day.lessons} lessons</span>
                        </div>
                        <Progress value={(day.minutes / 90) * 100} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Recent Achievements */}
              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Recent Achievements</h3>
                
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-xl">
                      <Award className="w-8 h-8 text-yellow-500" />
                      <div className="flex-1">
                        <div className="font-comic font-bold text-sm text-gray-800">{achievement.name}</div>
                        <div className="font-comic text-xs text-gray-600">{achievement.subject}</div>
                        <div className="font-comic text-xs text-gray-500">{achievement.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Subject Progress</h3>
                
                <div className="space-y-4">
                  {['Mathematics', 'English', 'Science', 'Art'].map((subject, index) => {
                    const progress = [85, 72, 60, 45][index];
                    const level = [8, 6, 4, 3][index];
                    return (
                      <div key={subject}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-comic font-bold text-gray-800">{subject}</span>
                          <Badge variant="outline" className="font-comic">Level {level}</Badge>
                        </div>
                        <Progress value={progress} className="h-3" />
                        <div className="font-comic text-sm text-gray-600 mt-1">{progress}% complete</div>
                      </div>
                    );
                  })}
                </div>
              </Card>

              <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Areas for Attention</h3>
                
                <div className="space-y-3">
                  {concerns.map((concern, index) => (
                    <div key={index} className={`p-3 rounded-xl border-l-4 ${
                      concern.level === 'warning' 
                        ? 'bg-yellow-50 border-yellow-400' 
                        : 'bg-blue-50 border-blue-400'
                    }`}>
                      <div className="font-comic font-bold text-sm text-gray-800">{concern.type}</div>
                      <div className="font-comic text-sm text-gray-600">{concern.message}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 max-w-2xl mx-auto">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Safety & Privacy Controls</h3>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-green-600" />
                    <div>
                      <div className="font-comic font-bold text-gray-800">Safe Mode</div>
                      <div className="font-comic text-sm text-gray-600">All content is kid-friendly</div>
                    </div>
                  </div>
                  <Badge className="bg-green-500 text-white font-comic">Active</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-blue-600" />
                    <div>
                      <div className="font-comic font-bold text-gray-800">Screen Time Limit</div>
                      <div className="font-comic text-sm text-gray-600">60 minutes per day</div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="font-comic">Edit</Button>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-purple-600" />
                    <div>
                      <div className="font-comic font-bold text-gray-800">Communication</div>
                      <div className="font-comic text-sm text-gray-600">Disabled for safety</div>
                    </div>
                  </div>
                  <Badge variant="outline" className="font-comic">Secure</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0 max-w-2xl mx-auto">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Learning Settings</h3>
              
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start font-comic">
                  <Settings className="w-5 h-5 mr-3" />
                  Adjust Difficulty Level
                </Button>
                <Button variant="outline" className="w-full justify-start font-comic">
                  <Calendar className="w-5 h-5 mr-3" />
                  Set Learning Schedule
                </Button>
                <Button variant="outline" className="w-full justify-start font-comic">
                  <TrendingUp className="w-5 h-5 mr-3" />
                  Progress Reports
                </Button>
                <Button variant="outline" className="w-full justify-start font-comic">
                  <Shield className="w-5 h-5 mr-3" />
                  Privacy Settings
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ParentDashboard;
