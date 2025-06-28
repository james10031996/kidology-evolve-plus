
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Plus, Sparkles, Clock, Star, User } from 'lucide-react';
import EnhancedBookReader from './EnhancedBookReader';
import AdminAddContent from '../../admin/AdminAddContent';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ContentItem {
  id: string;
  title: string;
  type: 'poem' | 'story';
  pages: {
    text: string;
    animation: string;
    backgroundColor: string;
  }[];
  author?: string;
  createdBy?: string;
  duration?: string;
  rating?: number;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

const PoemsStories = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'The Dancing Butterfly',
      type: 'poem',
      author: 'Nature Tales',
      duration: '3 min',
      rating: 4.8,
      difficulty: 'Easy',
      pages: [
        {
          text: 'In a garden bright and fair,\nA butterfly dances in the air.\nWith wings so light and colors bright,\nIt brings the garden pure delight!',
          animation: 'fly-around',
          backgroundColor: 'from-pink-100 to-purple-100'
        },
        {
          text: 'With wings of orange, blue, and gold,\nA story beautiful to behold.\nIt flutters high, it flutters low,\nEverywhere the flowers grow!',
          animation: 'shimmer',
          backgroundColor: 'from-orange-100 to-yellow-100'
        },
        {
          text: 'It flutters by the roses red,\nAnd rests upon a flower bed.\nThe butterfly so sweet and free,\nA dancing friend for you and me!',
          animation: 'gentle-bounce',
          backgroundColor: 'from-red-100 to-pink-100'
        }
      ]
    },
    {
      id: '2',
      title: 'The Little Star\'s Adventure',
      type: 'story',
      author: 'Cosmic Tales',
      duration: '5 min',
      rating: 4.9,
      difficulty: 'Easy',
      pages: [
        {
          text: 'Once upon a time, there was a little star named Twinkle who lived high up in the sparkling night sky.',
          animation: 'twinkle',
          backgroundColor: 'from-blue-100 to-indigo-100'
        },
        {
          text: 'Twinkle felt lonely among all the big stars and wanted to make friends with the children on Earth below.',
          animation: 'sad-glow',
          backgroundColor: 'from-purple-100 to-blue-100'
        },
        {
          text: 'So one magical night, Twinkle decided to zoom down like a shooting star to visit the world below!',
          animation: 'shooting-star',
          backgroundColor: 'from-indigo-100 to-purple-100'
        },
        {
          text: 'The children were amazed to see a real star, and they all became the very best of friends forever!',
          animation: 'celebration',
          backgroundColor: 'from-yellow-100 to-orange-100'
        }
      ]
    },
    {
      id: '3',
      title: 'The Magic Rainbow',
      type: 'poem',
      author: 'Weather Wonders',
      duration: '4 min',
      rating: 4.7,
      difficulty: 'Medium',
      pages: [
        {
          text: 'After the rain, the sun comes out,\nAnd colors dance without a doubt.\nUp in the sky so blue and wide,\nA rainbow appears with colors bright!',
          animation: 'rainbow-appear',
          backgroundColor: 'from-cyan-100 to-blue-100'
        },
        {
          text: 'Red and orange, yellow bright,\nGreen and blue, a wondrous sight.\nEach color flows like ocean waves,\nA masterpiece that nature saves!',
          animation: 'color-wave',
          backgroundColor: 'from-red-100 via-yellow-100 to-green-100'
        },
        {
          text: 'Purple crowns this arch so grand,\nA bridge of colors across the land.\nThe magic rainbow shines so true,\nA gift of wonder, just for you!',
          animation: 'arch-formation',
          backgroundColor: 'from-purple-100 to-pink-100'
        }
      ]
    },
    {
      id: '4',
      title: 'Tommy the Talking Tree',
      type: 'story',
      author: 'Forest Friends',
      duration: '6 min',
      rating: 4.6,
      difficulty: 'Medium',
      pages: [
        {
          text: 'In a peaceful forest lived Tommy, a wise old oak tree who could talk to all the woodland animals.',
          animation: 'tree-sway',
          backgroundColor: 'from-green-100 to-emerald-100'
        },
        {
          text: 'Every morning, the forest animals would gather around Tommy to share their stories and adventures.',
          animation: 'animals-gather',
          backgroundColor: 'from-brown-100 to-green-100'
        },
        {
          text: 'Tommy would give them advice and help solve their problems with his ancient wisdom and gentle heart.',
          animation: 'wisdom-glow',
          backgroundColor: 'from-amber-100 to-yellow-100'
        },
        {
          text: 'The forest was always happy and peaceful because of Tommy\'s kind heart and caring nature.',
          animation: 'heart-pulse',
          backgroundColor: 'from-pink-100 to-rose-100'
        }
      ]
    },
    {
      id: '5',
      title: 'The Brave Little Mouse',
      type: 'story',
      author: 'Animal Adventures',
      duration: '4 min',
      rating: 4.5,
      difficulty: 'Easy',
      pages: [
        {
          text: 'In a cozy little house lived a tiny mouse named Max who dreamed of big adventures.',
          animation: 'gentle-bounce',
          backgroundColor: 'from-amber-100 to-orange-100'
        },
        {
          text: 'One day, Max found a magical cheese that glowed with sparkles and shimmered in the light.',
          animation: 'shimmer',
          backgroundColor: 'from-yellow-100 to-gold-100'
        },
        {
          text: 'The cheese gave Max the courage to explore beyond his home and discover the big wide world.',
          animation: 'celebration',
          backgroundColor: 'from-green-100 to-teal-100'
        }
      ]
    },
    {
      id: '6',
      title: 'Seasons Song',
      type: 'poem',
      author: 'Nature\'s Voice',
      duration: '3 min',
      rating: 4.4,
      difficulty: 'Easy',
      pages: [
        {
          text: 'Spring brings flowers, fresh and new,\nGreen grass growing, morning dew.\nBirds are singing, trees are tall,\nNature\'s beauty, loved by all!',
          animation: 'gentle-bounce',
          backgroundColor: 'from-green-100 to-lime-100'
        },
        {
          text: 'Summer sunshine, warm and bright,\nLong fun days and starry nights.\nBeaches, picnics, ice cream treats,\nSummer joy that can\'t be beat!',
          animation: 'shimmer',
          backgroundColor: 'from-yellow-100 to-orange-100'
        },
        {
          text: 'Autumn leaves of red and gold,\nStories that are yet untold.\nHarvest time and cozy nights,\nFall brings such wonderful sights!',
          animation: 'color-wave',
          backgroundColor: 'from-orange-100 to-red-100'
        },
        {
          text: 'Winter snow so white and clean,\nMagical winter wonderland scene.\nSnowmen, sledding, cocoa hot,\nWinter memories we\'ve all got!',
          animation: 'twinkle',
          backgroundColor: 'from-blue-100 to-indigo-100'
        }
      ]
    }
  ]);

  const openContent = (content: ContentItem) => {
    setSelectedContent(content);
  };

  const closeContent = () => {
    setSelectedContent(null);
  };

  const addNewContent = (newContent: Omit<ContentItem, 'id'>) => {
    const contentWithId = {
      ...newContent,
      id: Date.now().toString(),
      duration: '3 min',
      rating: 5.0,
      difficulty: 'Easy' as const,
    };
    setContents([...contents, contentWithId]);
  };

  if (selectedContent) {
    return (
      <EnhancedBookReader
        pages={selectedContent.pages}
        title={selectedContent.title}
        onClose={closeContent}
      />
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-4">
          📚 Magical Stories & Poems
        </h2>
        <p className="text-lg text-gray-600 font-comic max-w-2xl mx-auto">
          Dive into enchanting tales and beautiful poems that come to life with interactive animations! 
          Each story offers a unique magical experience.
        </p>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-pink text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Create New Story
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <AdminAddContent onAdd={addNewContent} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contents.map((content) => (
          <Card 
            key={content.id}
            className="group p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white border-2 border-purple-100 hover:border-purple-300"
            onClick={() => openContent(content)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`px-3 py-1 rounded-full text-xs font-bold border ${
                content.type === 'poem' ? 'gradient-pink text-white' : 'gradient-blue text-white'
              }`}>
                {content.type === 'poem' ? '🎭 Poem' : '📖 Story'}
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-700">{content.rating}</span>
              </div>
            </div>
            
            <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors">
              {content.title}
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {content.duration}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {content.pages.length} pages
                </div>
              </div>
              
              {content.difficulty && (
                <span className={`px-2 py-1 rounded-full text-xs font-bold border ${getDifficultyColor(content.difficulty)}`}>
                  {content.difficulty}
                </span>
              )}
            </div>
            
            {content.author && (
              <div className="flex items-center text-xs text-gray-500 mb-4">
                <User className="w-3 h-3 mr-1" />
                By: {content.author}
              </div>
            )}
            
            <Button className="w-full gradient-purple text-white hover:opacity-90 group-hover:scale-105 transition-all">
              <BookOpen className="w-4 h-4 mr-2" />
              Start Reading
              <Sparkles className="w-4 h-4 ml-2" />
            </Button>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <p className="text-gray-500 font-comic">
          ✨ More magical stories coming soon! ✨
        </p>
      </div>
    </div>
  );
};

export default PoemsStories;
