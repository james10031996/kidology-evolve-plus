
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Heart, Star, Sparkles } from 'lucide-react';
import EnhancedBookReader from './EnhancedBookReader';

interface Story {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  ageGroup: string;
  duration: string;
  rating: number;
  cover: string;
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
}

interface Poem {
  id: string;
  title: string;
  author: string;
  description: string;
  category: string;
  ageGroup: string;
  duration: string;
  rating: number;
  cover: string;
  verses: string[];
  animations: string[];
}

const PoemsStories = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [showReader, setShowReader] = useState(false);

  const stories: Story[] = [
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      author: 'Luna Writer',
      description: 'Join Luna the fairy on a magical counting adventure through an enchanted forest!',
      category: 'Adventure',
      ageGroup: '4-7 years',
      duration: '8 min',
      rating: 4.9,
      cover: '🧚‍♀️',
      pages: [
        {
          text: "Once upon a time, in a magical forest filled with sparkling trees and singing flowers, lived Luna the fairy. She had beautiful rainbow wings that shimmered in the sunlight.",
          animation: "fly-around",
          backgroundColor: "from-green-100 to-emerald-100"
        },
        {
          text: "One sunny morning, Luna discovered that all the forest animals had lost their way home! 'Don't worry,' said Luna with a smile, 'I'll help you count your way back!'",
          animation: "bounce",
          backgroundColor: "from-blue-100 to-sky-100"
        },
        {
          text: "First, Luna found ONE little rabbit hiding behind a mushroom. 'Let's count together!' she said. 'ONE rabbit ready to go home!'",
          animation: "scale-in",
          backgroundColor: "from-pink-100 to-rose-100"
        },
        {
          text: "Next, they discovered TWO playful squirrels up in an oak tree. 'That makes THREE friends total!' Luna counted happily.",
          animation: "swing",
          backgroundColor: "from-orange-100 to-amber-100"
        },
        {
          text: "Soon they met THREE singing birds and FOUR dancing butterflies. 'Now we have TEN wonderful friends!' Luna announced with joy.",
          animation: "fly-around",
          backgroundColor: "from-purple-100 to-violet-100"
        },
        {
          text: "Using her magic counting powers, Luna helped each animal find their way home. And they all lived happily ever after, knowing how to count to ten!",
          animation: "sparkle",
          backgroundColor: "from-yellow-100 to-gold-100"
        }
      ]
    },
    {
      id: '2',
      title: 'Captain Cosmo\'s Space Adventure',
      author: 'Star Explorer',
      description: 'Blast off with Captain Cosmo as he explores planets and learns about shapes!',
      category: 'Space',
      ageGroup: '5-8 years',
      duration: '10 min',
      rating: 4.8,
      cover: '🚀',
      pages: [
        {
          text: "Captain Cosmo put on his shiny space suit and climbed into his rocket ship. 'Today I'm going to explore the galaxy and discover amazing shapes!' he said excitedly.",
          animation: "scale-in",
          backgroundColor: "from-blue-100 to-indigo-100"
        },
        {
          text: "WHOOSH! The rocket blasted off into space. Captain Cosmo looked out his round porthole window. 'Look, a CIRCLE!' he noted in his space journal.",
          animation: "fly-around",
          backgroundColor: "from-purple-100 to-indigo-100"
        },
        {
          text: "On the first planet, Captain Cosmo found crystal formations shaped like TRIANGLES. They sparkled like diamonds in the alien sunlight.",
          animation: "sparkle",
          backgroundColor: "from-green-100 to-teal-100"
        },
        {
          text: "The next planet had buildings made of perfect SQUARES. 'The aliens here love geometry!' laughed Captain Cosmo as he took pictures.",
          animation: "bounce",
          backgroundColor: "from-orange-100 to-red-100"
        },
        {
          text: "On his way home, Captain Cosmo flew past RECTANGULAR asteroids and OVAL moons. 'I've learned so many shapes today!' he cheered.",
          animation: "fly-around",
          backgroundColor: "from-pink-100 to-purple-100"
        },
        {
          text: "Back on Earth, Captain Cosmo shared his shape discoveries with all the children. And they all became shape explorers too!",
          animation: "scale-in",
          backgroundColor: "from-yellow-100 to-orange-100"
        }
      ]
    },
    {
      id: '3',
      title: 'The Rainbow Colors Quest',
      author: 'Prism Princess',
      description: 'Help Princess Rainbow find all the missing colors to save her magical kingdom!',
      category: 'Fantasy',
      ageGroup: '3-6 years',
      duration: '12 min',
      rating: 4.7,
      cover: '🌈',
      pages: [
        {
          text: "In the magical Kingdom of Colors, Princess Rainbow woke up to find all the colors had vanished! Everything was gray and sad.",
          animation: "fade-in",
          backgroundColor: "from-gray-100 to-slate-100"
        },
        {
          text: "Princess Rainbow put on her special color-finding crown and set off on a quest. 'I must find RED first!' she declared bravely.",
          animation: "bounce",
          backgroundColor: "from-red-100 to-pink-100"
        },
        {
          text: "She found RED hiding in a field of roses and strawberries. 'You're beautiful, RED!' she said, and the roses bloomed brighter.",
          animation: "bloom",
          backgroundColor: "from-red-100 to-rose-100"
        },
        {
          text: "Next, she discovered BLUE swimming in the ocean with whales and dolphins. The sky turned a brilliant blue when she called its name.",
          animation: "wave",
          backgroundColor: "from-blue-100 to-sky-100"
        },
        {
          text: "YELLOW was playing with sunflowers and busy bees in a sunny meadow. When Princess Rainbow found it, the sun shone golden bright.",
          animation: "shine",
          backgroundColor: "from-yellow-100 to-amber-100"
        },
        {
          text: "One by one, she found all the colors: GREEN in the forest, ORANGE in pumpkin patches, PURPLE in lavender fields, and more!",
          animation: "rainbow",
          backgroundColor: "from-purple-100 to-indigo-100"
        },
        {
          text: "With all colors restored, the kingdom burst into vibrant life! Princess Rainbow had saved the day, and everyone celebrated with a magnificent rainbow in the sky.",
          animation: "sparkle",
          backgroundColor: "from-pink-100 to-purple-100"
        }
      ]
    }
  ];

  const poems: Poem[] = [
    {
      id: '1',
      title: 'ABC Animal Parade',
      author: 'Melody Maker',
      description: 'A fun rhyming poem about animals from A to Z!',
      category: 'Educational',
      ageGroup: '3-6 years',
      duration: '5 min',
      rating: 4.9,
      cover: '🐘',
      verses: [
        'A is for Alligator snapping in the sun',
        'B is for Butterfly, colorful and fun',
        'C is for Cat who loves to play',
        'D is for Dog who barks all day',
        'E is for Elephant, big and gray',
        'F is for Fish swimming away'
      ],
      animations: ['bounce', 'flutter', 'pounce', 'wag', 'stomp', 'swim']
    },
    {
      id: '2',
      title: 'Counting Stars',
      author: 'Night Sky',
      description: 'Count the twinkling stars in this dreamy bedtime poem!',
      category: 'Bedtime',
      ageGroup: '2-5 years',
      duration: '4 min',
      rating: 4.8,
      cover: '⭐',
      verses: [
        'One little star up in the sky',
        'Two more stars come floating by',
        'Three bright stars begin to glow',
        'Four sweet stars in a row',
        'Five kind stars watch over me',
        'As I sleep so peacefully'
      ],
      animations: ['twinkle', 'float', 'glow', 'shine', 'watch', 'sleep']
    },
    {
      id: '3',
      title: 'The Happy Rainbow',
      author: 'Sunny Day',
      description: 'A cheerful poem about a rainbow that brings joy to everyone!',
      category: 'Nature',
      ageGroup: '4-7 years',
      duration: '6 min',
      rating: 4.7,
      cover: '🌈',
      verses: [
        'After the rain comes a beautiful sight',
        'A rainbow appears with colors so bright',
        'Red and orange dance in the sky',
        'Yellow and green make spirits fly',
        'Blue and purple complete the show',
        'Making everyone happy from head to toe'
      ],
      animations: ['appear', 'dance', 'fly', 'complete', 'rainbow', 'joy']
    }
  ];

  const openStory = (story: Story) => {
    setSelectedStory(story);
    setSelectedPoem(null);
    setShowReader(true);
  };

  const openPoem = (poem: Poem) => {
    setSelectedPoem(poem);
    setSelectedStory(null);
    setShowReader(true);
  };

  const closeReader = () => {
    setShowReader(false);
    setSelectedStory(null);
    setSelectedPoem(null);
  };

  if (showReader && (selectedStory || selectedPoem)) {
    return (
      <EnhancedBookReader
        story={selectedStory}
        poem={selectedPoem}
        onClose={closeReader}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-2">
          📚 Stories & Poems Library
        </h2>
        <p className="text-gray-600 font-comic">
          Discover magical stories and delightful poems that bring learning to life!
        </p>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-purple-100 rounded-full p-1">
          <TabsTrigger value="stories" className="rounded-full font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600">
            📖 Stories
          </TabsTrigger>
          <TabsTrigger value="poems" className="rounded-full font-comic font-bold data-[state=active]:bg-white data-[state=active]:text-purple-600">
            🎭 Poems
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stories" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <Card key={story.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 animate-bounce">
                    {story.cover}
                  </div>
                  <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                    {story.title}
                  </h3>
                  <p className="font-comic text-sm text-gray-600 mb-3">
                    by {story.author}
                  </p>
                  <p className="font-comic text-gray-700 text-sm mb-4">
                    {story.description}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Category:</span>
                    <span className="font-comic font-bold text-purple-600">{story.category}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Age Group:</span>
                    <span className="font-comic font-bold text-gray-700">{story.ageGroup}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Duration:</span>
                    <span className="font-comic font-bold text-gray-700">{story.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-comic text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="font-comic font-bold text-yellow-600">{story.rating}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => openStory(story)}
                  className="w-full gradient-purple text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Story
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="poems" className="mt-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem) => (
              <Card key={poem.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 animate-bounce">
                    {poem.cover}
                  </div>
                  <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                    {poem.title}
                  </h3>
                  <p className="font-comic text-sm text-gray-600 mb-3">
                    by {poem.author}
                  </p>
                  <p className="font-comic text-gray-700 text-sm mb-4">
                    {poem.description}
                  </p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Category:</span>
                    <span className="font-comic font-bold text-pink-600">{poem.category}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Age Group:</span>
                    <span className="font-comic font-bold text-gray-700">{poem.ageGroup}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="font-comic text-gray-600">Duration:</span>
                    <span className="font-comic font-bold text-gray-700">{poem.duration}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-comic text-gray-600">Rating:</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 fill-current mr-1" />
                      <span className="font-comic font-bold text-yellow-600">{poem.rating}</span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => openPoem(poem)}
                  className="w-full gradient-pink text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Read Poem
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoemsStories;
