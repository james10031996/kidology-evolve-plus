import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, Play, Palette, Music, Beaker, Calculator, 
  Star, Clock, Users, Gamepad2, Brush, PenTool, Scissors,
  Lightbulb, Microscope, Globe, Heart, Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EnhancedBookReader from '../story/EnhancedBookReader';
import CreativeTools from '../creative/CreativeTools';
import StoryBuilder from '../creative/StoryBuilder';

const ActivityContent = () => {
  const navigate = useNavigate();
  const [selectedStory, setSelectedStory] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showStoryBuilder, setShowStoryBuilder] = useState(false);

  const stories = [
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy on an exciting journey through the enchanted forest!',
      duration: '5 min',
      difficulty: 'Easy',
      rating: 4.9,
      pages: [
        {
          text: "Welcome to the magical forest where Luna the fairy lives! She's about to discover something amazing.",
          animation: "fly-around",
          backgroundColor: "from-green-100 to-emerald-100"
        },
        {
          text: "As Luna flutters through the sparkling trees, she notices numbers dancing in the air like fireflies!",
          animation: "shimmer",
          backgroundColor: "from-blue-100 to-purple-100"
        },
        {
          text: "The number 1 appears first, glowing softly. Then 2 and 3 join the magical dance around Luna.",
          animation: "twinkle",
          backgroundColor: "from-purple-100 to-pink-100"
        },
        {
          text: "Luna learns that counting can be magical when you believe in yourself and the power of numbers!",
          animation: "celebration",
          backgroundColor: "from-yellow-100 to-orange-100"
        }
      ]
    },
    {
      id: '2',
      title: 'Space Explorer Mission',
      description: 'Captain Cosmo explores the galaxy and discovers amazing planets!',
      duration: '7 min',
      difficulty: 'Medium',
      rating: 4.8,
      pages: [
        {
          text: "Captain Cosmo puts on his shiny space suit, ready for the greatest adventure in the galaxy!",
          animation: "scale-in",
          backgroundColor: "from-blue-100 to-indigo-100"
        },
        {
          text: "His rocket ship zooms past twinkling stars and colorful planets spinning in the cosmic dance.",
          animation: "shooting-star",
          backgroundColor: "from-purple-100 to-blue-100"
        }
      ]
    }
  ];

  const poems = [
    {
      id: '1',
      title: 'Rainbow Colors',
      description: 'A fun poem about all the beautiful colors in a rainbow',
      duration: '3 min',
      difficulty: 'Easy',
      rating: 4.7,
      pages: [
        {
          text: "Red like roses, orange like sun, Yellow like butter, green like fun!",
          animation: "twinkle",
          backgroundColor: "from-red-100 to-orange-100"
        },
        {
          text: "Blue like ocean, purple like grapes, Colors all around in different shapes!",
          animation: "shimmer",
          backgroundColor: "from-blue-100 to-purple-100"
        }
      ]
    }
  ];

  const games = [
    {
      title: 'Letter Safari',
      description: 'Find animals for each letter of the alphabet',
      icon: '🦁',
      difficulty: 'Easy',
      duration: '10 min',
      players: '1',
      route: '/games/letter-safari'
    },
    {
      title: 'Number Quest',
      description: 'Adventure through math problems',
      icon: '🔢',
      difficulty: 'Medium',
      duration: '15 min',
      players: '1',
      route: '/games/number-quest'
    }
  ];

  const mathActivities = [
    {
      title: 'Counting Fun',
      description: 'Learn to count with colorful objects',
      icon: '🔢',
      difficulty: 'Easy',
      route: '/courses/math-adventure'
    },
    {
      title: 'Shape Explorer',
      description: 'Discover different shapes around us',
      icon: '🔺',
      difficulty: 'Easy',
      route: '/courses/math-adventure'
    }
  ];

  const artActivities = [
    {
      title: 'Magic Paint Studio',
      description: 'Create beautiful digital artwork with magic brushes',
      icon: <Brush className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => navigate('/activities/magic-paint-studio')
    },
    {
      title: 'Digital Drawing',
      description: 'Create beautiful digital artwork',
      icon: <Brush className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => setSelectedTool('Digital Drawing')
    },
    {
      title: 'Coloring Pages',
      description: 'Color amazing pictures',
      icon: <Palette className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => setSelectedTool('Coloring Pages')
    },
    {
      title: 'Paper Crafts',
      description: 'Make fun crafts with paper',
      icon: <Scissors className="w-6 h-6" />,
      difficulty: 'Medium',
      action: () => setSelectedTool('Paper Crafts')
    },
    {
      title: 'Story Builder',
      description: 'Create your own interactive stories',
      icon: <BookOpen className="w-6 h-6" />,
      difficulty: 'Medium',
      action: () => setShowStoryBuilder(true)
    }
  ];

  const scienceActivities = [
    {
      title: 'Kitchen Experiments',
      description: 'Safe science experiments with household items',
      icon: <Beaker className="w-6 h-6" />,
      difficulty: 'Medium',
      action: () => navigate('/courses/science-explorers')
    },
    {
      title: 'Nature Observer',
      description: 'Explore the natural world around you',
      icon: <Microscope className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => navigate('/courses/nature-explorer')
    }
  ];

  const musicActivities = [
    {
      title: 'Music Movement',
      description: 'Dance and move to fun music',
      icon: <Music className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => navigate('/activities/music-movement')
    },
    {
      title: 'Rhythm Maker',
      description: 'Create beats and rhythms',
      icon: <Music className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => setSelectedTool('Rhythm Maker')
    },
    {
      title: 'Sing Along',
      description: 'Learn fun songs and nursery rhymes',
      icon: <Headphones className="w-6 h-6" />,
      difficulty: 'Easy',
      action: () => alert('🎵 Sing your favorite songs!')
    }
  ];

  const openStory = (story: any) => {
    setSelectedStory(story);
  };

  const renderActivityCard = (activity: any, index: number) => (
    <Card key={index} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center text-2xl">
          {typeof activity.icon === 'string' ? activity.icon : activity.icon}
        </div>
        <Badge className="bg-green-100 text-green-700 font-comic">
          {activity.difficulty}
        </Badge>
      </div>
      
      <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
        {activity.title}
      </h3>
      <p className="font-comic text-gray-600 text-sm mb-4">
        {activity.description}
      </p>
      
      <Button 
        className="w-full gradient-purple text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
        onClick={() => {
          if (activity.route) {
            navigate(activity.route);
          } else if (activity.action) {
            activity.action();
          } else {
            alert('Coming soon! 🎉');
          }
        }}
      >
        <Play className="w-4 h-4 mr-2" />
        Start Creating
      </Button>
    </Card>
  );

  return (
    <>
      <TabsContent value="stories" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-blue-100 text-blue-700 font-comic">
                  {story.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {story.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {story.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{story.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-gray-700">{story.rating}</span>
                </div>
              </div>
              
              <Button 
                className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => openStory(story)}
              >
                <Play className="w-4 h-4 mr-2" />
                Read Story
              </Button>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="poems-stories" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {poems.map((poem) => (
            <Card key={poem.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-pink-400 rounded-2xl flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <Badge className="bg-rose-100 text-rose-700 font-comic">
                  {poem.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {poem.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {poem.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{poem.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-gray-700">{poem.rating}</span>
                </div>
              </div>
              
              <Button 
                className="w-full gradient-rose text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => openStory(poem)}
              >
                <Play className="w-4 h-4 mr-2" />
                Read Poem
              </Button>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="games" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Card key={index} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center justify-between mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center text-2xl">
                  {game.icon}
                </div>
                <Badge className="bg-blue-100 text-blue-700 font-comic">
                  {game.difficulty}
                </Badge>
              </div>
              
              <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                {game.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {game.description}
              </p>
              
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{game.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{game.players} player</span>
                </div>
              </div>
              
              <Button 
                className="w-full gradient-blue text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                onClick={() => navigate(game.route)}
              >
                <Gamepad2 className="w-4 h-4 mr-2" />
                Play Game
              </Button>
            </Card>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="math" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mathActivities.map((activity, index) => renderActivityCard(activity, index))}
        </div>
      </TabsContent>

      <TabsContent value="art" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artActivities.map((activity, index) => renderActivityCard(activity, index))}
        </div>
      </TabsContent>

      <TabsContent value="science" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scienceActivities.map((activity, index) => renderActivityCard(activity, index))}
        </div>
      </TabsContent>

      <TabsContent value="music" className="space-y-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicActivities.map((activity, index) => renderActivityCard(activity, index))}
        </div>
      </TabsContent>

      {/* Story Reader Modal */}
      {selectedStory && (
        <EnhancedBookReader
          pages={selectedStory.pages}
          title={selectedStory.title}
          onClose={() => setSelectedStory(null)}
        />
      )}

      {/* Creative Tools Modal */}
      {selectedTool && (
        <CreativeTools
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}

      {/* Story Builder Modal */}
      {showStoryBuilder && (
        <StoryBuilder
          onClose={() => setShowStoryBuilder(false)}
        />
      )}
    </>
  );
};

export default ActivityContent;
