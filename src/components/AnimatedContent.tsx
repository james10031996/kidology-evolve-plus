
import { useEffect, useState } from 'react';

interface AnimatedContentProps {
  text: string;
  animation: string;
}

const AnimatedContent = ({ text, animation }: AnimatedContentProps) => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setAnimatedText('');
    setCurrentIndex(0);
    
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev < text.length) {
          setAnimatedText(text.slice(0, prev + 1));
          return prev + 1;
        }
        clearInterval(timer);
        return prev;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [text]);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fly-around':
        return 'animate-bounce';
      case 'shimmer':
        return 'animate-pulse';
      case 'gentle-bounce':
        return 'animate-bounce';
      case 'twinkle':
        return 'animate-pulse';
      case 'sad-glow':
        return 'animate-pulse opacity-75';
      case 'shooting-star':
        return 'animate-bounce';
      case 'celebration':
        return 'animate-bounce';
      case 'rainbow-appear':
        return 'animate-pulse';
      case 'color-wave':
        return 'animate-pulse';
      case 'arch-formation':
        return 'animate-bounce';
      case 'tree-sway':
        return 'animate-pulse';
      case 'animals-gather':
        return 'animate-bounce';
      case 'wisdom-glow':
        return 'animate-pulse';
      case 'heart-pulse':
        return 'animate-pulse';
      default:
        return '';
    }
  };

  const getEmojis = () => {
    switch (animation) {
      case 'fly-around':
        return '🦋✨';
      case 'shimmer':
        return '✨💫';
      case 'gentle-bounce':
        return '🌹🦋';
      case 'twinkle':
        return '⭐✨';
      case 'sad-glow':
        return '⭐💙';
      case 'shooting-star':
        return '🌟💫';
      case 'celebration':
        return '🎉👫⭐';
      case 'rainbow-appear':
        return '🌈☀️';
      case 'color-wave':
        return '🌈🎨';
      case 'arch-formation':
        return '🌈👑';
      case 'tree-sway':
        return '🌳🦉';
      case 'animals-gather':
        return '🐰🦌🐿️';
      case 'wisdom-glow':
        return '🌳💡';
      case 'heart-pulse':
        return '💚🌳';
      default:
        return '✨';
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div className={`text-2xl mb-4 ${getAnimationClass()}`}>
        {getEmojis()}
      </div>
      
      <div className="text-lg font-comic text-gray-800 leading-relaxed text-center max-w-md">
        {animatedText}
        <span className="animate-pulse">|</span>
      </div>
      
      <div className="absolute inset-0 pointer-events-none">
        {animation === 'fly-around' && (
          <div className="absolute top-1/4 left-1/4 animate-bounce">🦋</div>
        )}
        {animation === 'shimmer' && (
          <>
            <div className="absolute top-1/3 left-1/5 animate-pulse">✨</div>
            <div className="absolute top-1/2 right-1/4 animate-pulse delay-500">💫</div>
          </>
        )}
        {animation === 'celebration' && (
          <>
            <div className="absolute top-1/4 left-1/4 animate-bounce">🎉</div>
            <div className="absolute top-1/3 right-1/4 animate-bounce delay-300">🎊</div>
            <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-700">✨</div>
          </>
        )}
        {animation === 'rainbow-appear' && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-4xl animate-pulse">
            🌈
          </div>
        )}
        {animation === 'shooting-star' && (
          <div className="absolute top-1/4 right-1/4 animate-bounce">💫</div>
        )}
      </div>
    </div>
  );
};

export default AnimatedContent;
