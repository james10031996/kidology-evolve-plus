
import { useState } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { 
  BookOpen, Play, Palette, Music, Beaker, Calculator, 
  Star, Clock, Users, Brush, PenTool, Scissors,
  Lightbulb, Microscope, Globe, Heart, Headphones, Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import StorySection from './StorySection';
import ActivitySection from './ActivitySection';
import CreativeTools from '../creativeTools/CreativeTools';

const ActivityContent = () => {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

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
    },
    {
      id: '3',
      title: 'Underwater Treasure Hunt',
      description: 'Dive deep with Finny the fish to discover ocean mysteries!',
      duration: '6 min',
      difficulty: 'Easy',
      rating: 4.7,
      pages: [
        {
          text: "Finny the colorful fish swims through the coral reef, looking for hidden treasures!",
          animation: "wave",
          backgroundColor: "from-cyan-100 to-blue-100"
        },
        {
          text: "Deep in the ocean, Finny discovers a treasure chest filled with numbers and letters!",
          animation: "sparkle",
          backgroundColor: "from-teal-100 to-cyan-100"
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
    },
    {
      id: '2',
      title: 'Counting Stars',
      description: 'Learn to count with twinkling stars in the night sky',
      duration: '4 min',
      difficulty: 'Easy',
      rating: 4.8,
      pages: [
        {
          text: "One little star shines so bright, Two more stars join in the night!",
          animation: "twinkle",
          backgroundColor: "from-indigo-100 to-purple-100"
        },
        {
          text: "Three, four, five stars up above, Counting stars is what I love!",
          animation: "sparkle",
          backgroundColor: "from-purple-100 to-pink-100"
        }
      ]
    }
  ];

  const creativeActivities = [
    {
      title: 'Magic Paint Studio',
      description: 'Create beautiful digital artwork with magic brushes and vibrant colors!',
      icon: <Brush className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => navigate('/activities/magic-paint-studio')
    },
    {
      title: 'Paper Crafts Workshop',
      description: 'Make amazing crafts with colorful paper and creativity!',
      icon: <Scissors className="w-6 h-6" />,
      difficulty: 'Medium',
      gradient: 'gradient-orange',
      action: () => navigate('/activities/paper-crafts')
    },
    {
      title: 'Mandala Maker',
      description: 'Create beautiful symmetric patterns and peaceful mandalas!',
      icon: <Sparkles className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-purple',
      action: () => setSelectedTool('Digital Drawing')
    },
    {
      title: 'Coloring Pages',
      description: 'Color amazing pictures and bring them to life!',
      icon: <Palette className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-green',
      action: () => navigate('/activities/coloring-pages-tool')
    }
  ];

  const artActivities = [
    {
      title: 'Music & Movement',
      description: 'Sing, dance, and move to learn through music and rhythm!',
      icon: <Music className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-blue',
      action: () => navigate('/activities/music-movement')
    },
    {
      title: 'Digital Art Studio',
      description: 'Create masterpieces with digital brushes and tools!',
      icon: <Brush className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => navigate('/activities/magic-paint-studio')
    },
    {
      title: 'Craft Corner',
      description: 'Make wonderful crafts with paper, glue, and imagination!',
      icon: <Scissors className="w-6 h-6" />,
      difficulty: 'Medium',
      gradient: 'gradient-orange',
      action: () => navigate('/activities/paper-crafts')
    },
    {
      title: 'Color Galaxy',
      description: 'Explore the universe of colors and create amazing art!',
      icon: <Palette className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-purple',
      action: () => navigate('/activities/coloring-pages-tool')
    }
  ];

  const scienceActivities = [
    {
      title: 'Kitchen Science Lab',
      description: 'Discover amazing science with safe household experiments!',
      icon: <Beaker className="w-6 h-6" />,
      difficulty: 'Medium',
      gradient: 'gradient-green',
      action: () => navigate('/courses/science-explorers')
    },
    {
      title: 'Nature Detective',
      description: 'Explore the natural world and become a nature expert!',
      icon: <Microscope className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-blue',
      action: () => navigate('/courses/nature-explorer')
    },
    {
      title: 'Space Adventure',
      description: 'Journey through space and learn about planets and stars!',
      icon: <Globe className="w-6 h-6" />,
      difficulty: 'Medium',
      gradient: 'gradient-purple',
      action: () => navigate('/courses/science-explorers')
    }
  ];

  const musicActivities = [
    {
      title: 'Dance Party',
      description: 'Move and groove to fun music while learning!',
      icon: <Music className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-pink',
      action: () => navigate('/activities/music-movement')
    },
    {
      title: 'Beat Maker',
      description: 'Create amazing beats and rhythms with virtual instruments!',
      icon: <Headphones className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-blue',
      action: () => alert('🎵 Coming soon - Beat Maker Studio!')
    },
    {
      title: 'Sing Along Fun',
      description: 'Learn through catchy songs and nursery rhymes!',
      icon: <Heart className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-orange',
      action: () => alert('🎵 Sing your favorite songs!')
    }
  ];

  const mathActivities = [
    {
      title: 'Number Adventure',
      description: 'Embark on exciting adventures while learning numbers!',
      icon: <Calculator className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-blue',
      action: () => navigate('/courses/math-adventure')
    },
    {
      title: 'Shape Explorer',
      description: 'Discover amazing shapes in the world around us!',
      icon: <Star className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-green',
      action: () => navigate('/courses/math-adventure')
    },
    {
      title: 'Counting Quest',
      description: 'Go on a magical quest to master counting skills!',
      icon: <Lightbulb className="w-6 h-6" />,
      difficulty: 'Easy',
      gradient: 'gradient-purple',
      action: () => navigate('/courses/enhanced-math-adventure')
    }
  ];

  return (
    <>
      <TabsContent value="stories" className="space-y-8">
        <StorySection stories={stories} type="stories" />
      </TabsContent>

      <TabsContent value="poems-stories" className="space-y-8">
        <StorySection stories={poems} type="poems" />
      </TabsContent>

      <TabsContent value="creative" className="space-y-8">
        <ActivitySection activities={creativeActivities} gradientClass="gradient-purple" />
      </TabsContent>

      <TabsContent value="math" className="space-y-8">
        <ActivitySection activities={mathActivities} gradientClass="gradient-blue" />
      </TabsContent>

      <TabsContent value="art" className="space-y-8">
        <ActivitySection activities={artActivities} gradientClass="gradient-pink" />
      </TabsContent>

      <TabsContent value="science" className="space-y-8">
        <ActivitySection activities={scienceActivities} gradientClass="gradient-green" />
      </TabsContent>

      <TabsContent value="music" className="space-y-8">
        <ActivitySection activities={musicActivities} gradientClass="gradient-orange" />
      </TabsContent>

      {selectedTool && (
        <CreativeTools
          tool={selectedTool}
          onClose={() => setSelectedTool(null)}
        />
      )}
    </>
  );
};

export default ActivityContent;
