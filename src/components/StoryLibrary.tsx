
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, Clock } from 'lucide-react';
import InteractiveStoryCard from './InteractiveStoryCard';

interface Story {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  rating: number;
  category: string;
  isNew?: boolean;
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
  author?: string;
  createdBy?: string;
}

const StoryLibrary = () => {
  const [stories] = useState<Story[]>([
    {
      id: '1',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy on an exciting journey through the enchanted forest where numbers come alive!',
      difficulty: 'Easy',
      duration: '5 min',
      rating: 4.9,
      category: 'Fantasy',
      isNew: true,
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
      description: 'Blast off with Captain Cosmo and learn about planets, stars, and the wonders of space!',
      difficulty: 'Medium',
      duration: '7 min',
      rating: 4.8,
      category: 'Science',
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
    },
    {
      id: '3',
      title: 'Underwater Treasure Hunt',
      description: 'Dive deep with Finny the fish to discover hidden treasures and ocean mysteries!',
      difficulty: 'Easy',
      duration: '6 min',
      rating: 4.7,
      category: 'Adventure',
      pages: [
        {
          text: "Finny the golden fish swims gracefully through the crystal-clear ocean waters, looking for adventure!",
          animation: "gentle-bounce",
          backgroundColor: "from-cyan-100 to-blue-100"
        },
        {
          text: "Deep beneath the waves, colorful coral reefs create a rainbow garden full of sea creatures.",
          animation: "rainbow-appear",
          backgroundColor: "from-blue-100 to-teal-100"
        },
        {
          text: "A friendly octopus points to a mysterious treasure chest hidden behind swaying seaweed.",
          animation: "animals-gather",
          backgroundColor: "from-teal-100 to-green-100"
        },
        {
          text: "Inside the chest, Finny finds not gold, but something more precious - friendship with all sea creatures!",
          animation: "heart-pulse",
          backgroundColor: "from-green-100 to-emerald-100"
        },
        {
          text: "Finny learned that the greatest treasures are the friends we make along our journey. The end!",
          animation: "celebration",
          backgroundColor: "from-emerald-100 to-cyan-100"
        }
      ]
    }
  ]);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="font-fredoka font-bold text-3xl text-gray-800 mb-4 animate-fade-in">
          📚 Magical Story Library
        </h3>
        <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in">
          Dive into enchanting tales full of wonder, learning, and adventure! Each story comes alive with beautiful animations.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <div 
            key={story.id} 
            className="animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <InteractiveStoryCard {...story} />
          </div>
        ))}
      </div>

      <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg text-center">
        <div className="text-6xl mb-4 animate-bounce">📖</div>
        <h4 className="font-fredoka font-bold text-2xl text-gray-800 mb-3">
          More Stories Coming Soon!
        </h4>
        <p className="font-comic text-gray-600 mb-4">
          Our magical storytellers are creating new adventures just for you!
        </p>
        <div className="flex justify-center space-x-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-6 h-6 text-yellow-500 fill-current animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </Card>
    </div>
  );
};

export default StoryLibrary;
