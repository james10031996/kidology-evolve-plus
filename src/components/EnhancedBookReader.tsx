
import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, BookOpen, RotateCcw } from 'lucide-react';
import AnimatedContent from './AnimatedContent';

interface Page {
  text: string;
  animation: string;
  backgroundColor: string;
}

interface BookReaderProps {
  pages: Page[];
  title: string;
  onClose: () => void;
}

const EnhancedBookReader = ({ pages, title, onClose }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragCurrentX, setDragCurrentX] = useState(0);
  const bookRef = useRef<HTMLDivElement>(null);
  const [touchStartX, setTouchStartX] = useState(0);

  const flipPage = (direction: 'next' | 'prev') => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setFlipDirection(direction);
    
    setTimeout(() => {
      if (direction === 'next' && currentPage < pages.length - 1) {
        setCurrentPage(currentPage + 1);
      } else if (direction === 'prev' && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
      setIsFlipping(false);
      setFlipDirection(null);
    }, 600);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragCurrentX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setDragCurrentX(e.clientX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const dragDistance = dragCurrentX - dragStartX;
    const threshold = 50;
    
    if (Math.abs(dragDistance) > threshold) {
      if (dragDistance > 0 && currentPage > 0) {
        flipPage('prev');
      } else if (dragDistance < 0 && currentPage < pages.length - 1) {
        flipPage('next');
      }
    }
    
    setIsDragging(false);
    setDragStartX(0);
    setDragCurrentX(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchStartX - touchEndX;
    const threshold = 50;
    
    if (Math.abs(swipeDistance) > threshold) {
      if (swipeDistance > 0 && currentPage < pages.length - 1) {
        flipPage('next');
      } else if (swipeDistance < 0 && currentPage > 0) {
        flipPage('prev');
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        flipPage('prev');
      } else if (e.key === 'ArrowRight') {
        flipPage('next');
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, onClose]);

  const currentPageData = pages[currentPage];
  const nextPageData = currentPage < pages.length - 1 ? pages[currentPage + 1] : null;

  const getFlipTransform = () => {
    if (isDragging) {
      const dragDistance = dragCurrentX - dragStartX;
      const maxRotation = 15;
      const rotation = Math.max(-maxRotation, Math.min(maxRotation, (dragDistance / 200) * maxRotation));
      return `rotateY(${rotation}deg)`;
    }
    
    if (isFlipping) {
      return flipDirection === 'next' ? 'rotateY(-180deg)' : 'rotateY(180deg)';
    }
    
    return 'rotateY(0deg)';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button 
            onClick={onClose}
            className="gradient-purple text-white hover:opacity-90"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          
          <h1 className="text-2xl font-fredoka font-bold text-gray-800">{title}</h1>
          
          <Button 
            onClick={() => setCurrentPage(0)}
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>
        
        <div className="relative perspective-1000">
          <div 
            ref={bookRef}
            className="relative w-full h-[500px] mx-auto"
            style={{ perspective: '1000px' }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Main Book Container */}
            <div className="relative w-full h-full flex shadow-2xl rounded-lg overflow-hidden">
              {/* Left Page */}
              <Card 
                className={`w-1/2 h-full bg-gradient-to-br ${currentPageData.backgroundColor} border-r-2 border-amber-200 transition-all duration-600 transform-gpu`}
                style={{ 
                  transform: currentPage > 0 ? getFlipTransform() : 'none',
                  transformOrigin: 'right center',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  {currentPage > 0 && (
                    <AnimatedContent 
                      text={pages[currentPage - 1]?.text || currentPageData.text} 
                      animation={pages[currentPage - 1]?.animation || currentPageData.animation}
                    />
                  )}
                  
                  <div className="absolute bottom-4 left-4 text-sm text-gray-500 font-comic">
                    {currentPage > 0 ? currentPage : ''}
                  </div>
                </div>
              </Card>
              
              {/* Right Page */}
              <Card 
                className={`w-1/2 h-full bg-gradient-to-br ${nextPageData?.backgroundColor || currentPageData.backgroundColor} transition-all duration-600 transform-gpu`}
                style={{ 
                  transform: currentPage < pages.length - 1 ? getFlipTransform() : 'none',
                  transformOrigin: 'left center',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <AnimatedContent 
                    text={currentPageData.text} 
                    animation={currentPageData.animation}
                  />
                  
                  <div className="absolute bottom-4 right-4 text-sm text-gray-500 font-comic">
                    {currentPage + 1} of {pages.length}
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Page Curl Effect */}
            {isDragging && (
              <div 
                className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-transparent to-black opacity-10 transform rotate-45"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
                }}
              />
            )}
          </div>
          
          {/* Navigation Controls */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={() => flipPage('prev')}
              disabled={currentPage === 0 || isFlipping}
              className="gradient-blue text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous Page
            </Button>
            
            {/* Page Indicators */}
            <div className="flex space-x-3">
              {pages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isFlipping) {
                      setCurrentPage(index);
                    }
                  }}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentPage 
                      ? 'bg-purple-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
            
            <Button
              onClick={() => flipPage('next')}
              disabled={currentPage === pages.length - 1 || isFlipping}
              className="gradient-blue text-white hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Page
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          
          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 font-comic text-sm">
              💡 Tip: You can drag the pages, swipe on mobile, or use arrow keys to navigate!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedBookReader;
