import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Trophy, 
  Star, 
  Crown, 
  Shield, 
  Zap, 
  Target, 
  Gem, 
  Award,
  Medal,
  Sparkles,
  TrendingUp,
  Calendar,
  Clock,
  BookOpen,
  Gamepad2,
  Palette,
  Music,
  Brain,
  Heart
} from 'lucide-react';
import { useUser } from '@/contexts/UserContext';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'learning' | 'creativity' | 'social' | 'consistency' | 'mastery' | 'exploration';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  earned: boolean;
  earnedDate?: string;
  progress: number;
  maxProgress: number;
  points: number;
  nextMilestone?: string;
}

interface BadgeCollection {
  id: string;
  name: string;
  description: string;
  badges: Achievement[];
  progress: number;
  maxProgress: number;
  reward: string;
}

const EnhancedAchievementSystem = () => {
  const { userData } = useUser();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: '1',
      name: 'First Steps',
      description: 'Complete your first learning session',
      icon: 'star',
      category: 'learning',
      rarity: 'common',
      earned: true,
      earnedDate: '2024-01-15',
      progress: 1,
      maxProgress: 1,
      points: 10
    },
    {
      id: '2',
      name: 'Speed Learner',
      description: 'Complete 5 sessions in one day',
      icon: 'zap',
      category: 'consistency',
      rarity: 'rare',
      earned: false,
      progress: 3,
      maxProgress: 5,
      points: 50,
      nextMilestone: '2 more sessions today'
    },
    {
      id: '3',
      name: 'Math Wizard',
      description: 'Solve 100 math problems correctly',
      icon: 'crown',
      category: 'mastery',
      rarity: 'epic',
      earned: false,
      progress: 67,
      maxProgress: 100,
      points: 100,
      nextMilestone: '33 more problems'
    },
    {
      id: '4',
      name: 'Creative Genius',
      description: 'Complete 10 art activities',
      icon: 'palette',
      category: 'creativity',
      rarity: 'rare',
      earned: true,
      earnedDate: '2024-01-20',
      progress: 10,
      maxProgress: 10,
      points: 75
    },
    {
      id: '5',
      name: 'Streak Master',
      description: 'Learn for 30 consecutive days',
      icon: 'trophy',
      category: 'consistency',
      rarity: 'legendary',
      earned: false,
      progress: 12,
      maxProgress: 30,
      points: 200,
      nextMilestone: '18 more days'
    },
    {
      id: '6',
      name: 'Explorer',
      description: 'Try activities from 5 different subjects',
      icon: 'target',
      category: 'exploration',
      rarity: 'rare',
      earned: false,
      progress: 3,
      maxProgress: 5,
      points: 60,
      nextMilestone: '2 more subjects'
    }
  ]);

  const [collections] = useState<BadgeCollection[]>([
    {
      id: '1',
      name: 'Math Master Collection',
      description: 'Complete all mathematics achievements',
      badges: achievements.filter(a => a.category === 'mastery'),
      progress: 1,
      maxProgress: 5,
      reward: 'Golden Calculator Badge'
    },
    {
      id: '2',
      name: 'Creative Artist Collection',
      description: 'Unlock your artistic potential',
      badges: achievements.filter(a => a.category === 'creativity'),
      progress: 3,
      maxProgress: 4,
      reward: 'Rainbow Paintbrush Badge'
    }
  ]);

  const categories = ['all', 'learning', 'creativity', 'social', 'consistency', 'mastery', 'exploration'];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements.filter(achievement => achievement.category === selectedCategory);

  const getIcon = (iconName: string, earned: boolean) => {
    const iconClass = `w-6 h-6 ${earned ? 'text-yellow-500' : 'text-gray-400'}`;
    switch (iconName) {
      case 'trophy': return <Trophy className={iconClass} />;
      case 'star': return <Star className={iconClass} />;
      case 'crown': return <Crown className={iconClass} />;
      case 'shield': return <Shield className={iconClass} />;
      case 'zap': return <Zap className={iconClass} />;
      case 'target': return <Target className={iconClass} />;
      case 'gem': return <Gem className={iconClass} />;
      case 'award': return <Award className={iconClass} />;
      case 'medal': return <Medal className={iconClass} />;
      case 'palette': return <Palette className={iconClass} />;
      default: return <Star className={iconClass} />;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return <BookOpen className="w-4 h-4" />;
      case 'creativity': return <Palette className="w-4 h-4" />;
      case 'social': return <Heart className="w-4 h-4" />;
      case 'consistency': return <Calendar className="w-4 h-4" />;
      case 'mastery': return <Crown className="w-4 h-4" />;
      case 'exploration': return <Target className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const totalPoints = achievements.filter(a => a.earned).reduce((sum, a) => sum + a.points, 0);
  const earnedCount = achievements.filter(a => a.earned).length;
  const nearCompletion = achievements.filter(a => !a.earned && a.progress / a.maxProgress > 0.8);

  return (
    <div className="space-y-6">
      {/* Achievement Overview */}
      <Card className="bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-white p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="w-8 h-8" />
          <div>
            <h2 className="font-fredoka font-bold text-2xl">🏆 Achievement Center</h2>
            <p className="font-comic text-lg opacity-90">Unlock amazing badges and earn rewards!</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{earnedCount}</div>
            <div className="text-sm opacity-80">Achievements</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{totalPoints}</div>
            <div className="text-sm opacity-80">Points Earned</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{Math.round((earnedCount / achievements.length) * 100)}%</div>
            <div className="text-sm opacity-80">Completion</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3 text-center">
            <div className="font-bold text-xl">{nearCompletion.length}</div>
            <div className="text-sm opacity-80">Almost Done</div>
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
            {category === 'all' ? '🌟 All' : (
              <span className="flex items-center gap-1">
                {getCategoryIcon(category)}
                {category}
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Nearly Complete Achievements */}
      {nearCompletion.length > 0 && (
        <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-fredoka font-bold text-lg text-gray-800">🎯 Almost There!</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {nearCompletion.map((achievement) => (
              <div key={achievement.id} className="bg-white rounded-lg p-3 border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  {getIcon(achievement.icon, false)}
                  <span className="font-fredoka font-bold text-sm">{achievement.name}</span>
                </div>
                <Progress value={(achievement.progress / achievement.maxProgress) * 100} className="h-2 mb-1" />
                <p className="font-comic text-xs text-gray-600">{achievement.nextMilestone}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Achievements Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement) => (
          <Card 
            key={achievement.id} 
            className={`overflow-hidden transition-all duration-300 ${
              achievement.earned 
                ? 'bg-gradient-to-br from-yellow-50 to-orange-50 shadow-lg border-yellow-200' 
                : 'hover:shadow-md'
            }`}
          >
            <div className={`h-2 bg-gradient-to-r ${getRarityColor(achievement.rarity)}`} />
            
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {getIcon(achievement.icon, achievement.earned)}
                  <Badge 
                    variant="secondary" 
                    className={`capitalize text-xs ${achievement.earned ? 'bg-yellow-100 text-yellow-700' : ''}`}
                  >
                    {achievement.rarity}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span className="font-comic text-sm font-bold text-purple-600">{achievement.points}pts</span>
                </div>
              </div>

              <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {achievement.name}
                {achievement.earned && <span className="ml-2">✨</span>}
              </h4>

              <p className="font-comic text-sm text-gray-600 mb-3">
                {achievement.description}
              </p>

              <div className="flex items-center gap-2 mb-3">
                {getCategoryIcon(achievement.category)}
                <span className="font-comic text-xs text-gray-500 capitalize">{achievement.category}</span>
              </div>

              {achievement.earned ? (
                <div className="bg-green-100 rounded-lg p-3 text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <Trophy className="w-5 h-5 text-green-600" />
                    <span className="font-fredoka font-bold text-green-700">Unlocked!</span>
                  </div>
                  <div className="font-comic text-xs text-green-600">
                    Earned on {achievement.earnedDate}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-comic text-gray-600">Progress</span>
                    <span className="font-bold text-gray-800">
                      {achievement.progress}/{achievement.maxProgress}
                    </span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.maxProgress) * 100} 
                    className="h-2 mb-2" 
                  />
                  {achievement.nextMilestone && (
                    <p className="font-comic text-xs text-blue-600 bg-blue-50 rounded p-2">
                      💡 Next: {achievement.nextMilestone}
                    </p>
                  )}
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Badge Collections */}
      <div>
        <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
          <Crown className="w-6 h-6 text-purple-500" />
          👑 Badge Collections
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {collections.map((collection) => (
            <Card key={collection.id} className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
              <h4 className="font-fredoka font-bold text-lg text-gray-800 mb-2">{collection.name}</h4>
              <p className="font-comic text-sm text-gray-600 mb-3">{collection.description}</p>
              
              <div className="flex justify-between text-sm mb-2">
                <span className="font-comic text-gray-600">Collection Progress</span>
                <span className="font-bold text-gray-800">
                  {collection.progress}/{collection.maxProgress}
                </span>
              </div>
              <Progress value={(collection.progress / collection.maxProgress) * 100} className="h-2 mb-3" />
              
              <div className="bg-white rounded-lg p-3">
                <div className="font-comic text-sm font-bold text-purple-700 mb-1">🎁 Collection Reward:</div>
                <div className="font-comic text-xs text-purple-600">{collection.reward}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Daily Challenges */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-blue-500" />
          <h3 className="font-fredoka font-bold text-lg text-gray-800">⏰ Daily Challenges</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <div className="bg-white rounded-lg p-3 border-l-4 border-blue-400">
            <div className="font-comic font-bold text-sm text-gray-800">Complete 3 Sessions</div>
            <div className="font-comic text-xs text-gray-600 mb-2">Progress: 1/3</div>
            <Progress value={33} className="h-1" />
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-green-400">
            <div className="font-comic font-bold text-sm text-gray-800">Earn 50 Stars</div>
            <div className="font-comic text-xs text-gray-600 mb-2">Progress: 32/50</div>
            <Progress value={64} className="h-1" />
          </div>
          <div className="bg-white rounded-lg p-3 border-l-4 border-purple-400">
            <div className="font-comic font-bold text-sm text-gray-800">Try New Subject</div>
            <div className="font-comic text-xs text-gray-600 mb-2">Not started</div>
            <Progress value={0} className="h-1" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default EnhancedAchievementSystem;