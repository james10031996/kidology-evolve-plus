
import { Card } from '@/components/ui/card';
import { Progress as ProgressBar } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Clock, Target, Award, Flame, TrendingUp } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/Header';

const Progress = () => {
  const { userData } = useUser();

  const weeklyProgress = [
    { day: 'Mon', minutes: 45, target: 60, lessons: 3 },
    { day: 'Tue', minutes: 60, target: 60, lessons: 4 },
    { day: 'Wed', minutes: 30, target: 60, lessons: 2 },
    { day: 'Thu', minutes: 75, target: 60, lessons: 5 },
    { day: 'Fri', minutes: 50, target: 60, lessons: 3 },
    { day: 'Sat', minutes: 90, target: 60, lessons: 6 },
    { day: 'Sun', minutes: 35, target: 60, lessons: 2 }
  ];

  const monthlyStats = [
    { label: 'Total Hours', value: (userData.totalTime / 60).toFixed(1), icon: Clock, color: 'text-blue-500' },
    { label: 'Lessons Done', value: userData.lessonsCompleted, icon: Target, color: 'text-green-500' },
    { label: 'Current Streak', value: userData.streak, icon: Flame, color: 'text-orange-500' },
    { label: 'Stars Earned', value: userData.stars, icon: Star, color: 'text-yellow-500' }
  ];

  const levelProgress = ((userData.stars % 500) / 500) * 100;
  const nextLevelStars = 500 - (userData.stars % 500);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            📊 Your Learning Journey
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Track your amazing progress and celebrate your achievements!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Level & Stats */}
          <div className="lg:col-span-1 space-y-6">
            {/* Level Card */}
            <Card className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg border-0">
              <div className="text-center mb-6">
                <div className="w-20 h-20 gradient-orange rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-fredoka font-bold text-white">
                    {userData.level}
                  </span>
                </div>
                <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
                  Level {userData.level}
                </h3>
                <p className="font-comic text-gray-600">Learning Champion</p>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-comic text-sm text-gray-700">Next Level</span>
                  <span className="font-comic text-sm font-bold text-gray-800">
                    {nextLevelStars} stars to go
                  </span>
                </div>
                <ProgressBar value={levelProgress} className="h-3" />
              </div>

              <Badge className="w-full justify-center gradient-orange text-white font-comic font-bold py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                {levelProgress.toFixed(1)}% to Level {userData.level + 1}
              </Badge>
            </Card>

            {/* Monthly Stats */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6 text-center">
                This Month
              </h3>
              
              <div className="space-y-4">
                {monthlyStats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center`}>
                        <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      </div>
                      <span className="font-comic font-bold text-gray-800">{stat.label}</span>
                    </div>
                    <div className="font-fredoka font-bold text-xl text-gray-800">
                      {stat.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Weekly Activity */}
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
                This Week's Activity
              </h3>
              
              <div className="space-y-3">
                {weeklyProgress.map((day, index) => (
                  <div key={day.day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-comic text-sm font-bold text-gray-800">{day.day}</span>
                      <span className="font-comic text-xs text-gray-600">
                        {day.minutes}m • {day.lessons} lessons
                      </span>
                    </div>
                    <ProgressBar 
                      value={(day.minutes / day.target) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Middle Column - Subject Progress */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-6">
                Subject Mastery
              </h3>
              
              <div className="space-y-6">
                {userData.progress.map((subject, index) => (
                  <div key={subject.name}>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                          {subject.name[0]}
                        </div>
                        <div>
                          <div className="font-comic font-bold text-gray-800">{subject.name}</div>
                          <Badge variant="outline" className="font-comic text-xs">
                            Level {subject.level}
                          </Badge>
                        </div>
                      </div>
                      <div className="font-fredoka font-bold text-lg text-gray-800">
                        {subject.progress}%
                      </div>
                    </div>
                    
                    <ProgressBar value={subject.progress} className="h-3 mb-2" />
                    
                    <div className="font-comic text-xs text-gray-600">
                      Next milestone: {subject.nextMilestone}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Streaks */}
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl shadow-lg border-0">
              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
                🔥 Learning Streaks
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div>
                    <div className="font-comic font-bold text-gray-800">Current Streak</div>
                    <div className="font-comic text-sm text-gray-600">Keep it going!</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Flame className="w-6 h-6 text-orange-500" />
                    <span className="font-fredoka font-bold text-2xl text-orange-500">
                      {userData.streak}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-white rounded-xl">
                  <div>
                    <div className="font-comic font-bold text-gray-800">Best Streak</div>
                    <div className="font-comic text-sm text-gray-600">Personal record</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6 text-gold-500" />
                    <span className="font-fredoka font-bold text-2xl text-yellow-600">
                      18
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column - Achievements */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white rounded-2xl shadow-lg border-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-fredoka font-bold text-xl text-gray-800">Achievements</h3>
                <Badge className="gradient-orange text-white font-comic font-bold">
                  {userData.achievements.filter(a => a.unlocked).length}/{userData.achievements.length} Unlocked
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {userData.achievements.map((achievement) => (
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
                      {achievement.unlocked && achievement.unlockedDate && (
                        <div className="font-comic text-xs text-green-600 mt-2">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                    
                    {achievement.unlocked && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 gradient-orange rounded-full flex items-center justify-center">
                        <Trophy className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Next Achievement */}
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 gradient-purple rounded-full flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-comic font-bold text-gray-800">Next Goal</div>
                    <div className="font-comic text-sm text-gray-600">
                      Complete {7 - userData.achievements.filter(a => a.unlocked).length} more achievements to unlock Super Star badge!
                    </div>
                  </div>
                </div>
              </div>

              {/* Weekly Goal */}
              <div className="mt-4 p-4 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-comic font-bold text-gray-800">Weekly Goal</span>
                  <span className="font-comic text-sm text-gray-600">5/7 days</span>
                </div>
                <ProgressBar value={(5/7) * 100} className="h-2 mb-2" />
                <div className="font-comic text-xs text-gray-600">
                  Learn 2 more days this week to earn 50 bonus stars!
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
