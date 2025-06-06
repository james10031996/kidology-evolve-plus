
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Star, Clock, Sparkles } from 'lucide-react';
import EnhancedBookReader from './EnhancedBookReader';

const PoemsStories = () => {
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [contentType, setContentType] = useState<'story' | 'poem'>('story');

  const stories = [
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy on an exciting journey through the enchanted forest!',
      difficulty: 'Easy' as const,
      duration: '5 min',
      rating: 4.9,
      category: 'Fantasy',
      isNew: true,
      author: 'Luna Writer',
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
        },
        {
          text: "From that day on, Luna helped all the forest creatures learn to count with joy and wonder. The end!",
          animation: "heart-pulse",
          backgroundColor: "from-pink-100 to-red-100"
        }
      ]
    },
    {
      id: '2',
      title: 'Space Explorer Mission',
      description: 'Blast off with Captain Cosmo to explore the wonders of space!',
      difficulty: 'Medium' as const,
      duration: '7 min',
      rating: 4.8,
      category: 'Science',
      author: 'Captain Cosmo',
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
        },
        {
          text: "On Mars, he discovers that the red planet is covered in rust-colored dust that sparkles like glitter!",
          animation: "shimmer",
          backgroundColor: "from-red-100 to-orange-100"
        },
        {
          text: "Jupiter's great red spot swirls like a giant cotton candy cloud in the starry sky.",
          animation: "color-wave",
          backgroundColor: "from-orange-100 to-yellow-100"
        },
        {
          text: "Captain Cosmo returns home with stories of wonder, teaching everyone that space is full of magic!",
          animation: "celebration",
          backgroundColor: "from-indigo-100 to-purple-100"
        }
      ]
    }
  ];

  const poems = [
    {
      id: '1',
      title: 'Rainbow Colors',
      description: 'A beautiful poem about all the colors in the rainbow!',
      difficulty: 'Easy' as const,
      duration: '3 min',
      rating: 4.7,
      category: 'Colors',
      author: 'Color Poet',
      verses: [
        "Red like roses, red like fire, Red makes hearts leap up higher! 🌹🔥",
        "Orange like pumpkins, orange like sun, Orange makes learning lots of fun! 🎃☀️",
        "Yellow like bananas, yellow like gold, Yellow stories waiting to be told! 🍌✨",
        "Green like grass and leaves on trees, Green like gardens in the breeze! 🌿🌳",
        "Blue like oceans, blue like sky, Blue like dreams that soar up high! 🌊💙",
        "Purple like grapes and flowers too, Purple magic, just for you! 🍇💜"
      ],
      animations: ['bounce', 'scale', 'pulse', 'wiggle', 'float', 'sparkle']
    },
    {
      id: '2',
      title: 'Animal Friends',
      description: 'Meet all the wonderful animals in this delightful poem!',
      difficulty: 'Easy' as const,
      duration: '4 min',
      rating: 4.8,
      category: 'Animals',
      author: 'Nature Poet',
      verses: [
        "Lions roar with mighty sound, In the jungle they are found! 🦁🌿",
        "Elephants are big and gray, They love to splash and play all day! 🐘💦",
        "Monkeys swing from tree to tree, Happy and wild and full of glee! 🐵🌳",
        "Dolphins jump in ocean blue, Making friends with me and you! 🐬🌊",
        "Butterflies with wings so bright, Dancing colors in the light! 🦋✨"
      ],
      animations: ['roar', 'splash', 'swing', 'jump', 'flutter']
    }
  ];

  const openStory = (story: any) => {
    setSelectedContent({
      id: story.id,
      title: story.title,
      author: story.author,
      pages: story.pages
    });
    setContentType('story');
  };

  const openPoem = (poem: any) => {
    setSelectedContent({
      id: poem.id,
      title: poem.title,
      author: poem.author,
      verses: poem.verses,
      animations: poem.animations
    });
    setContentType('poem');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4 animate-fade-in">
          📚 Stories & Poems Library
        </h3>
        <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
          Dive into magical tales and beautiful poems full of wonder, learning, and adventure!
        </p>
      </div>

      <Tabs defaultValue="stories" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto bg-white rounded-full p-2 shadow-lg mb-8">
          <TabsTrigger value="stories" className="rounded-full font-comic font-bold">
            📖 Stories
          </TabsTrigger>
          <TabsTrigger value="poems" className="rounded-full font-comic font-bold">
            🎭 Poems
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stories">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story, index) => (
              <Card key={story.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="text-4xl">
                      {story.category === 'Fantasy' && '🧚‍♀️'}
                      {story.category === 'Science' && '🚀'}
                      {story.category === 'Adventure' && '🏴‍☠️'}
                    </div>
                  </div>
                  {story.isNew && (
                    <Badge className="absolute -top-2 -right-2 bg-red-500 text-white font-comic animate-pulse">
                      New!
                    </Badge>
                  )}
                </div>

                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                  {story.title}
                </h3>
                <p className="font-comic text-gray-600 text-sm mb-4">
                  {story.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="font-comic text-xs">
                      {story.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="font-comic text-xs text-gray-600">{story.duration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-comic text-xs font-bold">{story.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-comic text-xs font-bold text-yellow-600">25 stars</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-orange text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                  onClick={() => openStory(story)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Read Story
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="poems">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {poems.map((poem, index) => (
              <Card key={poem.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative mb-4">
                  <div className="w-full h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl flex items-center justify-center">
                    <div className="text-4xl animate-pulse">
                      {poem.category === 'Colors' && '🌈'}
                      {poem.category === 'Animals' && '🦁'}
                      {poem.category === 'Nature' && '🌿'}
                    </div>
                  </div>
                </div>

                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-2">
                  {poem.title}
                </h3>
                <p className="font-comic text-gray-600 text-sm mb-4">
                  {poem.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="font-comic text-xs">
                      {poem.difficulty}
                    </Badge>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-500" />
                      <span className="font-comic text-xs text-gray-600">{poem.duration}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-comic text-xs font-bold">{poem.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Sparkles className="w-3 h-3 text-purple-500" />
                      <span className="font-comic text-xs font-bold text-purple-600">20 stars</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="w-full gradient-purple text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200"
                  onClick={() => openPoem(poem)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Read Poem
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Enhanced Book Reader */}
      {selectedContent && (
        <EnhancedBookReader
          story={contentType === 'story' ? selectedContent : undefined}
          poem={contentType === 'poem' ? selectedContent : undefined}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  );
};

export default PoemsStories;
