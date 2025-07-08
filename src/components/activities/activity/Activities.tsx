
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy, Sparkles, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';
import { activitiesData } from './data/activitiesData';
import ActivityCard from './components/ActivityCard';
import StoryCard from './components/StoryCard';
import CreativeCard from './components/CreativeCard';

const Activities = () => {
  const { updateStars } = useUser();
  const navigate = useNavigate();

  const playActivity = (activity: any) => {
    if (activity.route) {
      navigate(activity.route);
    } else {
      updateStars(activity.stars);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="text-6xl animate-bounce mr-4">🎭</div>
            <div className="text-6xl animate-pulse">✨</div>
            <div className="text-6xl animate-bounce ml-4">🎨</div>
          </div>
          <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent mb-6">
            Fun Learning Activities
          </h1>
          <p className="font-comic text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            🌟 Explore amazing stories, create beautiful art, make wonderful music, and learn through play! 
            Every activity is designed to spark curiosity and joy! 🚀
          </p>
        </div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-lg mx-auto mb-12 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-2xl border border-white/20">
            <TabsTrigger 
              value="activity" 
              className="rounded-full font-comic font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-400 data-[state=active]:to-orange-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🎮 Games
            </TabsTrigger>
            <TabsTrigger 
              value="stories" 
              className="rounded-full font-comic font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-400 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              📚 Stories
            </TabsTrigger>
            <TabsTrigger 
              value="creative" 
              className="rounded-full font-comic font-bold text-sm data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-400 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              🎨 Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity" className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
                🎮 Interactive Learning Games
              </h2>
              <p className="font-comic text-gray-600 text-lg">
                Play and learn with these exciting educational games!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {activitiesData.activities.map((game) => (
                <div key={game.id} className="transform hover:scale-105 transition-all duration-300">
                  <ActivityCard activity={game} onPlay={playActivity} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
                📚 Magical Story Adventures
              </h2>
              <p className="font-comic text-gray-600 text-lg">
                Embark on wonderful journeys through enchanting tales!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activitiesData.stories.map((story) => (
                <div key={story.id} className="transform hover:scale-105 transition-all duration-300">
                  <StoryCard story={story} onPlay={playActivity} />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative" className="animate-fade-in">
            <div className="mb-8 text-center">
              <h2 className="font-fredoka text-3xl font-bold text-gray-800 mb-4">
                🎨 Creative Art Studio
              </h2>
              <p className="font-comic text-gray-600 text-lg">
                Express your creativity and make beautiful art!
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activitiesData.creative.map((activity) => (
                <div key={activity.id} className="transform hover:scale-105 transition-all duration-300">
                  <CreativeCard activity={activity} onPlay={playActivity} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Enhanced Daily Challenge */}
        <div className="mt-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-3xl blur-xl opacity-50"></div>
          <div className="relative bg-gradient-to-r from-yellow-100 via-pink-100 to-purple-100 rounded-3xl p-8 text-center border-4 border-white/30 shadow-2xl">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
              <Sparkles className="w-10 h-10 text-pink-500 animate-pulse" />
              <Star className="w-12 h-12 text-purple-500 animate-bounce" />
            </div>
            <h3 className="font-fredoka font-bold text-4xl bg-gradient-to-r from-yellow-600 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              🏆 Daily Learning Challenge
            </h3>
            <p className="font-comic text-xl text-gray-700 mb-6 leading-relaxed">
              🌟 Complete 3 activities today to earn super special bonus rewards! 🎉
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-comic font-bold px-6 py-3 text-lg shadow-lg animate-pulse">
                ⭐ +100 Bonus Stars!
              </Badge>
              <Badge className="bg-gradient-to-r from-pink-400 to-purple-500 text-white font-comic font-bold px-6 py-3 text-lg shadow-lg animate-pulse">
                🎁 Mystery Prize!
              </Badge>
            </div>
          </div>
        </div>

        {/* Learning Progress Motivator */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl p-8 text-center border-2 border-blue-200/50">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="font-fredoka font-bold text-2xl text-blue-800 mb-4">
            Keep Learning & Growing!
          </h3>
          <p className="font-comic text-blue-700 text-lg">
            Every activity makes you smarter and more creative! 🌟✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default Activities;
