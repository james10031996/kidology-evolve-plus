import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, RotateCcw, Bookmark } from 'lucide-react';
import AnimatedContent from '../../courses/course/AnimatedContent';
import HTMLFlipBook from 'react-pageflip';

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
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const flipBookRef = useRef<any>(null);
  const flipSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    flipSound.current = new Audio('/sounds/flip.mp3');
  }, []);

  const playFlipSound = () => {
    if (flipSound.current) {
      flipSound.current.currentTime = 0;
      flipSound.current.play().catch(() => { });
    }
  };

  const goToPage = (pageIndex: number) => {
    flipBookRef.current?.pageFlip()?.flip(pageIndex);
    playFlipSound();
  };

  const toggleBookmark = () => {
    setBookmarks(prev =>
      prev.includes(currentPage)
        ? prev.filter(p => p !== currentPage)
        : [...prev, currentPage]
    );
  };

  return (
    <div className=" bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={onClose} className="gradient-purple text-white">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Library
          </Button>
          <h1 className="hidden sm:block text-2xl font-fredoka font-bold text-gray-800">{title}</h1>
          <Button
            onClick={() => goToPage(0)}
            variant="outline"
            className="border-purple-300 text-purple-600"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Restart
          </Button>
        </div>

        <h1 className="block sm:hidden text-2xl font-fredoka font-bold text-gray-800 mb-6">{title}</h1>

        <HTMLFlipBook
          ref={flipBookRef}
          width={550}
          height={733}
          size="stretch"
          showCover={true}
          startPage={0}
          flippingTime={700}
          showPageCorners={true}
          disableFlipByClick={false}
          onFlip={({ data }) => {
            setCurrentPage(data);
            playFlipSound();
          }}
          maxShadowOpacity={0.5}
          style={{}} // required
          minWidth={315}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1536}
          drawShadow={true}
          useMouseEvents={true}
          clickEventForward={true}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          mobileScrollSupport={true}
          swipeDistance={30}
          className="mx-auto shadow-xl"
        >

          {pages.map((page, index) => (
            <div
              key={index}
              className={`w-full h-full p-6 bg-gradient-to-br ${page.backgroundColor} text-center font-comic flex flex-col items-center justify-center`}
            >
              <AnimatedContent text={page.text} animation={page.animation} />
              <p className="mt-6 text-xs text-gray-400">Page {index + 1}</p>
            </div>
          ))}
        </HTMLFlipBook>

        <div className="flex justify-between items-center mt-6">
          <Button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 0}
            className="gradient-blue text-white disabled:opacity-50"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Prev
          </Button>

          <div className="flex gap-2">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-4 h-4 rounded-full transition-all ${index === currentPage
                    ? 'bg-purple-500 scale-125 shadow-lg'
                    : 'bg-gray-300 hover:bg-gray-400'
                  } relative`}
              >
                {bookmarks.includes(index) && (
                  <Bookmark className="absolute -top-3 -right-3 w-3 h-3 text-yellow-500 animate-bounce" />
                )}
              </button>
            ))}
          </div>

          <Button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage >= pages.length - 1}
            className="gradient-blue text-white disabled:opacity-50"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

        {/* <div className="text-center mt-4">
          <Button
            onClick={toggleBookmark}
            className={`mt-2 ${bookmarks.includes(currentPage)
              ? 'bg-yellow-400 text-white'
              : 'bg-gray-200 text-gray-700'
            }`}
          >
            {bookmarks.includes(currentPage) ? 'Remove Bookmark' : 'Bookmark Page'}
          </Button>
        </div> */}

        <p className="text-sm text-gray-600 text-center mt-4 font-comic">
          💡 Tip: Click dots to jump pages, or use arrow keys and swipe!
        </p>
      </div>
    </div>
  );
};

export default EnhancedBookReader;
