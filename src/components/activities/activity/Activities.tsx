
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Trophy } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
         <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🎭 Fun Learning Activities
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Explore amazing stories, create art, make music, and learn through play!
          </p>
        </div>

        <Tabs defaultValue="activity" className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8 bg-white rounded-full p-2 shadow-lg">
            <TabsTrigger value="activity" className="rounded-full font-comic font-bold data-[state=active]:bg-yellow-200 data-[state=active]">
              🎮 Activity
            </TabsTrigger>
            <TabsTrigger value="stories" className="rounded-full font-comic font-bold data-[state=active]:bg-orange-200 data-[state=active]">
              📚 Stories
            </TabsTrigger>
            <TabsTrigger value="creative" className="rounded-full font-comic font-bold data-[state=active]:bg-red-200 data-[state=active]">
              🎨 Create
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {activitiesData.activities.map((game) => (
                <ActivityCard key={game.id} activity={game} onPlay={playActivity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activitiesData.stories.map((story) => (
                <StoryCard key={story.id} story={story} onPlay={playActivity} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="creative">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activitiesData.creative.map((activity) => (
                <CreativeCard key={activity.id} activity={activity} onPlay={playActivity} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Daily Challenge */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Trophy className="w-8 h-8 text-orange-500 animate-bounce" />
            <h3 className="font-fredoka font-bold text-2xl text-gray-800">
              Daily Challenge
            </h3>
          </div>
          <p className="font-comic text-gray-700 mb-4">
            Complete 3 activities today to earn a special bonus reward!
          </p>
          <div className="flex justify-center">
            <Badge className="gradient-orange text-white font-comic font-bold px-4 py-2">
              +100 Bonus Stars Available!
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;