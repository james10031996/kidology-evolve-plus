
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Clock, Target, Award, Flame } from 'lucide-react';

const ProgressDashboard = () => {
  const achievements = [
    { id: 1, name: 'First Steps', icon: '👶', unlocked: true, description: 'Complete your first lesson' },
    { id: 2, name: 'Math Wizard', icon: '🧙‍♂️', unlocked: true, description: 'Solve 50 math problems' },
    { id: 3, name: 'Reading Star', icon: '⭐', unlocked: true, description: 'Read 10 stories' },
    { id: 4, name: 'Science Explorer', icon: '🔬', unlocked: false, description: 'Complete 5 experiments' },
    { id: 5, name: 'Art Master', icon: '🎨', unlocked: false, description: 'Create 20 artworks' },
    { id: 6, name: 'Music Lover', icon: '🎵', unlocked: false, description: 'Learn 15 songs' }
  ];

  const weeklyProgress = [
    { day: 'Mon', minutes: 45, target: 60 },
    { day: 'Tue', minutes: 60, target: 60 },
    { day: 'Wed', minutes: 30, target: 60 },
    { day: 'Thu', minutes: 75, target: 60 },
    { day: 'Fri', minutes: 50, target: 60 },
    { day: 'Sat', minutes: 90, target: 60 },
    { day: 'Sun', minutes: 35, target: 60 }
  ];

  const subjects = [
    { name: 'Mathematics', progress: 85, level: 8, color: 'gradient-blue', nextMilestone: '100 problems solved' },
    { name: 'English', progress: 72, level: 6, color: 'gradient-green', nextMilestone: '5 more stories to read' },
    { name: 'Science', progress: 45, level: 4, color: 'gradient-purple', nextMilestone: '3 experiments left' },
    { name: 'Art', progress: 60, level: 5, color: 'gradient-pink', nextMilestone: '10 more artworks' }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Your Learning Journey
          </h2>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Track your progress, celebrate achievements, and see how far you've come!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Weekly Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-orange rounded-full flex items-center justify-center">
                      <Flame className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-comic font-bold text-gray-800">Streak</div>
                      <div className="font-comic text-sm text-gray-600">Learning days</div>
                    </div>
                  </div>
                  <div className="font-fredoka font-bold text-2xl text-orange-500">12</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-blue rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-comic font-bold text-gray-800">Total Time</div>
                      <div className="font-comic text-sm text-gray-600">This week</div>
                    </div>
                  </div>
                  <div className="font-fredoka font-bold text-2xl text-blue-500">6.2h</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 gradient-green rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-comic font-bold text-gray-800">Lessons</div>
                      <div className="font-comic text-sm text-gray-600">Completed</div>
                    </div>
                  </div>
                  <div className="font-fredoka font-bold text-2xl text-green-500">47</div>
                </div>
              </div>
            </Card>

            {/* Weekly Activity */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">This Week</h3>
              
              <div className="space-y-3">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="flex items-center space-x-3">
                    <div className="w-8 text-center font-comic text-sm text-gray-600">
                      {day.day}
                    </div>
                    <div className="flex-1">
                      <Progress 
                        value={(day.minutes / day.target) * 100} 
                        className="h-3"
                      />
                    </div>
                    <div className="w-12 text-right font-comic text-sm text-gray-800">
                      {day.minutes}m
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle Column - Subject Progress */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">Subject Progress</h3>
              
              <div className="space-y-6">
                {subjects.map((subject, index) => (
                  <div key={subject.name}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${subject.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                          {subject.name[0]}
                        </div>
                        <div>
                          <div className="font-comic font-bold text-gray-800">{subject.name}</div>
                          <div className="font-comic text-xs text-gray-600">Level {subject.level}</div>
                        </div>
                      </div>
                      <div className="font-fredoka font-bold text-lg text-gray-800">
                        {subject.progress}%
                      </div>
                    </div>
                    
                    <Progress value={subject.progress} className="h-2 mb-2" />
                    
                    <div className="font-comic text-xs text-gray-600">
                      Next: {subject.nextMilestone}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Achievements */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-fredoka font-bold text-xl text-gray-800">Achievements</h3>
                <Badge className="gradient-orange text-white font-comic font-bold">
                  3/6 Unlocked
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200 shadow-md'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="font-comic font-bold text-sm text-gray-800 mb-1">
                        {achievement.name}
                      </div>
                      <div className="font-comic text-xs text-gray-600 leading-tight">
                        {achievement.description}
                      </div>
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 gradient-orange rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-purple rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic font-bold text-gray-800">Next Reward</div>
                    <div className="font-comic text-sm text-gray-600">2 more achievements to unlock Super Star badge!</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgressDashboard;
