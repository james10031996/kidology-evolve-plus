
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, ChevronLeft, ChevronRight, Volume2, Play, Pause } from 'lucide-react';

interface Story {
  id: string;
  title: string;
  author: string;
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
  verses: string[];
  animations: string[];
}

interface EnhancedBookReaderProps {
  story?: Story | null;
  poem?: Poem | null;
  onClose: () => void;
}

const EnhancedBookReader = ({ story, poem, onClose }: EnhancedBookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const content = story || poem;
  if (!content) return null;

  const totalPages = story ? story.pages.length : poem ? poem.verses.length : 0;
  const isStory = !!story;

  const getCurrentContent = () => {
    if (story) {
      return story.pages[currentPage];
    } else if (poem) {
      return {
        text: poem.verses[currentPage],
        animation: poem.animations[currentPage] || 'bounce',
        backgroundColor: 'from-purple-100 to-pink-100'
      };
    }
    return null;
  };

  const currentContent = getCurrentContent();

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const getAnimationClass = (animation: string) => {
    switch (animation) {
      case 'bounce': return 'animate-bounce';
      case 'fly-around': return 'animate-pulse';
      case 'scale-in': return 'animate-scale-in';
      case 'sparkle': return 'animate-pulse';
      case 'swing': return 'animate-bounce';
      case 'bloom': return 'animate-scale-in';
      case 'wave': return 'animate-pulse';
      case 'shine': return 'animate-pulse';
      case 'rainbow': return 'animate-pulse';
      case 'twinkle': return 'animate-pulse';
      case 'float': return 'animate-bounce';
      case 'glow': return 'animate-pulse';
      case 'fade-in': return 'animate-fade-in';
      case 'appear': return 'animate-scale-in';
      case 'dance': return 'animate-bounce';
      case 'fly': return 'animate-pulse';
      case 'complete': return 'animate-scale-in';
      case 'joy': return 'animate-bounce';
      default: return 'animate-bounce';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Book Container */}
        <div className="relative bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 rounded-3xl shadow-2xl p-8 border-4 border-amber-200">
          {/* Close Button */}
          <Button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
            size="sm"
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Audio Controls */}
          <div className="absolute top-4 left-4 z-20 flex space-x-2">
            <Button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2"
              size="sm"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2"
              size="sm"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Book Pages */}
          <div className="flex min-h-[500px]">
            {/* Left Page (Book Info or Previous Content) */}
            <div className="w-1/2 p-6 border-r-2 border-amber-300">
              {currentPage === 0 ? (
                <div className="flex flex-col justify-center items-center h-full text-center">
                  <div className="text-6xl mb-6 animate-bounce">
                    {isStory ? '📖' : '🎭'}
                  </div>
                  <h1 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                    {content.title}
                  </h1>
                  <p className="font-comic text-lg text-gray-600 mb-6">
                    by {content.author}
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                </div>
              ) : (
                currentContent && (
                  <div className={`h-full bg-gradient-to-br ${currentContent.backgroundColor} rounded-2xl p-6 flex flex-col justify-center`}>
                    <div className="text-center">
                      <div className={`text-6xl mb-6 ${getAnimationClass(currentContent.animation)}`}>
                        {isStory ? '✨' : '🎵'}
                      </div>
                      <p className="font-comic text-lg leading-relaxed text-gray-800">
                        {currentContent.text}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Right Page (Current Content or Next Preview) */}
            <div className="w-1/2 p-6">
              {currentContent ? (
                <div className={`h-full bg-gradient-to-br ${currentContent.backgroundColor} rounded-2xl p-6 flex flex-col justify-center`}>
                  <div className="text-center">
                    <div className={`text-8xl mb-8 ${getAnimationClass(currentContent.animation)}`}>
                      {isStory ? 
                        (currentPage === 0 ? '🌟' : 
                         currentPage === 1 ? '🧚‍♀️' :
                         currentPage === 2 ? '🐰' :
                         currentPage === 3 ? '🐿️' :
                         currentPage === 4 ? '🦋' : '✨') :
                        (currentPage === 0 ? '🎪' :
                         currentPage === 1 ? '🎨' :
                         currentPage === 2 ? '🌈' :
                         currentPage === 3 ? '⭐' : '🎭')
                      }
                    </div>
                    {currentPage > 0 && (
                      <p className="font-comic text-xl leading-relaxed text-gray-800">
                        {currentContent.text}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">📚</div>
                    <p className="font-comic text-gray-600">The End</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-6 px-4">
            <Button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed font-comic font-bold px-6 py-2 rounded-full"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                    i === currentPage 
                      ? 'bg-purple-500 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentPage(i)}
                />
              ))}
            </div>

            <Button
              onClick={nextPage}
              disabled={currentPage >= totalPages - 1}
              className="bg-purple-500 hover:bg-purple-600 text-white disabled:opacity-50 disabled:cursor-not-allowed font-comic font-bold px-6 py-2 rounded-full"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          {/* Page Counter */}
          <div className="text-center mt-4">
            <span className="font-comic text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
          </div>
        </div>

        {/* Book Shadow */}
        <div className="absolute -bottom-4 -right-4 w-full h-full bg-amber-200 rounded-3xl -z-10 transform rotate-1"></div>
        <div className="absolute -bottom-8 -right-8 w-full h-full bg-amber-300 rounded-3xl -z-20 transform rotate-2"></div>
      </div>
    </div>
  );
};

export default EnhancedBookReader;
