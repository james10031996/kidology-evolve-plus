
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, Plus, Sparkles } from 'lucide-react';
import AnimatedContent from './AnimatedContent';
import AdminAddContent from './AdminAddContent';
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
}

const PoemsStories = () => {
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [contents, setContents] = useState<ContentItem[]>([
    {
      id: '1',
      title: 'The Dancing Butterfly',
      type: 'poem',
      pages: [
        {
          text: 'In a garden bright and fair,\nA butterfly dances in the air.',
          animation: 'fly-around',
          backgroundColor: 'from-pink-100 to-purple-100'
        },
        {
          text: 'With wings of orange, blue, and gold,\nA story beautiful to behold.',
          animation: 'shimmer',
          backgroundColor: 'from-orange-100 to-yellow-100'
        },
        {
          text: 'It flutters by the roses red,\nAnd rests upon a flower bed.',
          animation: 'gentle-bounce',
          backgroundColor: 'from-red-100 to-pink-100'
        }
      ]
    },
    {
      id: '2',
      title: 'The Little Star\'s Adventure',
      type: 'story',
      pages: [
        {
          text: 'Once upon a time, there was a little star named Twinkle who lived high up in the sky.',
          animation: 'twinkle',
          backgroundColor: 'from-blue-100 to-indigo-100'
        },
        {
          text: 'Twinkle felt lonely and wanted to make friends with the children on Earth.',
          animation: 'sad-glow',
          backgroundColor: 'from-purple-100 to-blue-100'
        },
        {
          text: 'So one magical night, Twinkle decided to come down and visit the world below.',
          animation: 'shooting-star',
          backgroundColor: 'from-indigo-100 to-purple-100'
        },
        {
          text: 'The children were amazed to see a real star, and they all became the best of friends!',
          animation: 'celebration',
          backgroundColor: 'from-yellow-100 to-orange-100'
        }
      ]
    },
    {
      id: '3',
      title: 'The Magic Rainbow',
      type: 'poem',
      pages: [
        {
          text: 'After the rain, the sun comes out,\nAnd colors dance without a doubt.',
          animation: 'rainbow-appear',
          backgroundColor: 'from-cyan-100 to-blue-100'
        },
        {
          text: 'Red and orange, yellow bright,\nGreen and blue, a wondrous sight.',
          animation: 'color-wave',
          backgroundColor: 'from-red-100 via-yellow-100 to-green-100'
        },
        {
          text: 'Purple crowns this arch so grand,\nA bridge of colors across the land.',
          animation: 'arch-formation',
          backgroundColor: 'from-purple-100 to-pink-100'
        }
      ]
    },
    {
      id: '4',
      title: 'Tommy the Talking Tree',
      type: 'story',
      pages: [
        {
          text: 'In a peaceful forest lived Tommy, a wise old oak tree who could talk to animals.',
          animation: 'tree-sway',
          backgroundColor: 'from-green-100 to-emerald-100'
        },
        {
          text: 'Every morning, the forest animals would gather around Tommy to share their stories.',
          animation: 'animals-gather',
          backgroundColor: 'from-brown-100 to-green-100'
        },
        {
          text: 'Tommy would give them advice and help solve their problems with his ancient wisdom.',
          animation: 'wisdom-glow',
          backgroundColor: 'from-amber-100 to-yellow-100'
        },
        {
          text: 'The forest was always happy and peaceful because of Tommy\'s kind heart.',
          animation: 'heart-pulse',
          backgroundColor: 'from-pink-100 to-rose-100'
        }
      ]
    }
  ]);

  const flipPage = (direction: 'next' | 'prev') => {
    if (!selectedContent || isFlipping) return;
    
    setIsFlipping(true);
    setTimeout(() => {
      if (direction === 'next' && currentPage < selectedContent.pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setIsFlipping(false);
    }, 300);
  };

  const openContent = (content: ContentItem) => {
    setSelectedContent(content);
    setCurrentPage(0);
  };

  const closeContent = () => {
    setSelectedContent(null);
    setCurrentPage(0);
  };

  const addNewContent = (newContent: Omit<ContentItem, 'id'>) => {
    const contentWithId = {
      ...newContent,
      id: Date.now().toString(),
    };
    setContents([...contents, contentWithId]);
  };

  if (selectedContent) {
    const currentPageData = selectedContent.pages[currentPage];
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Button 
            onClick={closeContent}
            className="mb-6 gradient-purple text-white hover:opacity-90"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          
          <div className="relative">
            <Card className={`w-full h-96 bg-gradient-to-br ${currentPageData.backgroundColor} shadow-2xl border-0 overflow-hidden ${isFlipping ? 'animate-pulse' : ''}`}>
              <div className="h-full flex flex-col items-center justify-center p-8 text-center relative">
                <AnimatedContent 
                  text={currentPageData.text} 
                  animation={currentPageData.animation}
                />
                
                <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-comic">
                  Page {currentPage + 1} of {selectedContent.pages.length}
                </div>
              </div>
            </Card>
            
            <div className="flex justify-between mt-6">
              <Button
                onClick={() => flipPage('prev')}
                disabled={currentPage === 0 || isFlipping}
                className="gradient-blue text-white hover:opacity-90 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-2">
                {selectedContent.pages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index === currentPage ? 'bg-purple-500' : 'bg-gray-300'
                    } transition-colors duration-300`}
                  />
                ))}
              </div>
              
              <Button
                onClick={() => flipPage('next')}
                disabled={currentPage === selectedContent.pages.length - 1 || isFlipping}
                className="gradient-blue text-white hover:opacity-90 disabled:opacity-50"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-4xl font-fredoka font-bold gradient-purple bg-clip-text text-transparent mb-4">
          📚 Magical Stories & Poems
        </h2>
        <p className="text-lg text-gray-600 font-comic">
          Dive into enchanting tales and beautiful poems that come to life!
        </p>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gradient-pink text-white hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Add New Content
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
            className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white border-2 border-purple-100"
            onClick={() => openContent(content)}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                content.type === 'poem' ? 'gradient-pink text-white' : 'gradient-blue text-white'
              }`}>
                {content.type === 'poem' ? '🎭 Poem' : '📖 Story'}
              </div>
              <Sparkles className="w-5 h-5 text-yellow-500" />
            </div>
            
            <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-2">
              {content.title}
            </h3>
            
            <p className="text-sm text-gray-600 mb-4 font-comic">
              {content.pages.length} page{content.pages.length > 1 ? 's' : ''}
            </p>
            
            {content.author && (
              <p className="text-xs text-gray-500 mb-2">
                By: {content.author}
              </p>
            )}
            
            <Button className="w-full gradient-purple text-white hover:opacity-90">
              <BookOpen className="w-4 h-4 mr-2" />
              Read Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PoemsStories;
