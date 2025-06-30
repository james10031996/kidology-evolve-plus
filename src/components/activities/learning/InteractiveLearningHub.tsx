
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Star, Heart, Zap, Gift } from 'lucide-react';

const InteractiveLearningHub = () => {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);

  const learningActivities = [
    {
      id: 'alphabet-adventure',
      title: '🔤 Alphabet Adventure',
      description: 'Learn letters with fun animations and sounds!',
      difficulty: 'Easy',
      points: 10,
      color: 'from-pink-400 to-rose-500',
      activities: [
        { name: 'Letter Tracing', emoji: '✏️', description: 'Trace letters with your finger!' },
        { name: 'Find the Letter', emoji: '🔍', description: 'Spot letters in colorful scenes!' },
        { name: 'Letter Sounds', emoji: '🔊', description: 'Hear how letters sound!' }
      ]
    },
    {
      id: 'number-playground',
      title: '🔢 Number Playground',
      description: 'Count and play with numbers in magical ways!',
      difficulty: 'Easy',
      points: 15,
      color: 'from-blue-400 to-cyan-500',
      activities: [
        { name: 'Counting Game', emoji: '🧮', description: 'Count colorful objects!' },
        { name: 'Number Puzzle', emoji: '🧩', description: 'Put numbers in order!' },
        { name: 'Math Magic', emoji: '✨', description: 'Simple addition with animations!' }
      ]
    },
    {
      id: 'shape-explorer',
      title: '🔺 Shape Explorer',
      description: 'Discover shapes everywhere around you!',
      difficulty: 'Easy',
      points: 12,
      color: 'from-green-400 to-emerald-500',
      activities: [
        { name: 'Shape Hunt', emoji: '🎯', description: 'Find shapes in pictures!' },
        { name: 'Shape Builder', emoji: '🏗️', description: 'Build with different shapes!' },
        { name: 'Shape Songs', emoji: '🎵', description: 'Sing along to shape melodies!' }
      ]
    },
    {
      id: 'color-carnival',
      title: '🌈 Color Carnival',
      description: 'Explore the wonderful world of colors!',
      difficulty: 'Easy',
      points: 8,
      color: 'from-purple-400 to-pink-500',
      activities: [
        { name: 'Color Mixing', emoji: '🎨', description: 'Mix colors to make new ones!' },
        { name: 'Rainbow Match', emoji: '🌈', description: 'Match objects to their colors!' },
        { name: 'Color Stories', emoji: '📚', description: 'Read colorful picture books!' }
      ]
    }
  ];

  const achievements = [
    { name: 'First Steps', icon: '👶', description: 'Complete your first activity!', unlocked: points >= 10 },
    { name: 'Learning Star', icon: '⭐', description: 'Earn 50 points!', unlocked: points >= 50 },
    { name: 'Streak Master', icon: '🔥', description: 'Keep a 5-day streak!', unlocked: streak >= 5 },
    { name: 'Explorer', icon: '🗺️', description: 'Try all activity types!', unlocked: points >= 100 }
  ];

  const completeActivity = (activityPoints: number) => {
    setPoints(points + activityPoints);
    setStreak(streak + 1);
  };

  return (
    <div className="space-y-8">
      {/* Header with Stats */}
      <Card className="p-6 bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 border-4 border-yellow-300">
        <div className="text-center">
          <h1 className="font-fredoka text-4xl text-purple-700 mb-4">
            🌟 Interactive Learning Hub
          </h1>
          <p className="font-comic text-lg text-gray-600 mb-6">
            Learn, play, and grow with magical activities!
          </p>
          
          <div className="flex justify-center space-x-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mb-2">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="font-fredoka text-2xl text-yellow-600 font-bold">{points}</div>
              <div className="font-comic text-sm text-gray-600">Points</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full flex items-center justify-center mb-2">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="font-fredoka text-2xl text-red-600 font-bold">{streak}</div>
              <div className="font-comic text-sm text-gray-600">Day Streak</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-400 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="font-fredoka text-2xl text-green-600 font-bold">5</div>
              <div className="font-comic text-sm text-gray-600">Level</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Learning Activities */}
      <div className="grid md:grid-cols-2 gap-8">
        {learningActivities.map((activity, index) => (
          <Card key={activity.id} className="p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-4 border-gray-100" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className={`w-full h-32 bg-gradient-to-r ${activity.color} rounded-2xl mb-6 flex items-center justify-center`}>
              <div className="text-6xl animate-bounce">
                {activity.title.split(' ')[0]}
              </div>
            </div>
            
            <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-3">
              {activity.title}
            </h3>
            <p className="font-comic text-gray-600 mb-4">
              {activity.description}
            </p>
            
            <div className="flex justify-between items-center mb-4">
              <Badge className="bg-green-100 text-green-700 font-comic">
                {activity.difficulty}
              </Badge>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-comic font-bold text-yellow-600">{activity.points} points</span>
              </div>
            </div>

            {/* Sub-activities */}
            <div className="space-y-2 mb-6">
              {activity.activities.map((subActivity, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <span className="text-2xl">{subActivity.emoji}</span>
                  <div>
                    <h4 className="font-comic font-bold text-gray-800 text-sm">{subActivity.name}</h4>
                    <p className="font-comic text-gray-600 text-xs">{subActivity.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              className={`w-full bg-gradient-to-r ${activity.color} text-white font-comic font-bold text-lg py-3 rounded-2xl hover:scale-105 transition-transform duration-200 shadow-lg`}
              onClick={() => completeActivity(activity.points)}
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Start Adventure
            </Button>
          </Card>
        ))}
      </div>

      {/* Achievements */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-4 border-purple-200">
        <h2 className="font-fredoka text-3xl text-purple-700 text-center mb-8">
          🏆 Your Achievements
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <div key={index} className={`text-center p-6 rounded-2xl transition-all duration-300 ${
              achievement.unlocked 
                ? 'bg-gradient-to-br from-yellow-100 to-orange-100 border-4 border-yellow-300 shadow-lg' 
                : 'bg-gray-100 border-4 border-gray-300 opacity-50'
            }`}>
              <div className="text-4xl mb-3">{achievement.icon}</div>
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {achievement.name}
              </h3>
              <p className="font-comic text-sm text-gray-600">
                {achievement.description}
              </p>
              {achievement.unlocked && (
                <Badge className="mt-3 bg-green-500 text-white font-comic">
                  Unlocked!
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Rewards */}
      <Card className="p-6 bg-gradient-to-r from-green-100 to-blue-100 border-4 border-green-300">
        <div className="text-center">
          <h2 className="font-fredoka text-2xl text-green-700 mb-4">
            🎁 Daily Learning Reward
          </h2>
          <p className="font-comic text-gray-600 mb-4">
            Come back tomorrow for a special surprise!
          </p>
          <Button className="gradient-green text-white font-comic font-bold px-8 py-3 rounded-full">
            <Gift className="w-5 h-5 mr-2" />
            Claim Tomorrow's Gift
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveLearningHub;
