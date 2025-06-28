
import { useEffect, useState } from 'react';

interface AnimatedContentProps {
  text: string;
  animation: string;
}

const AnimatedContent = ({ text, animation }: AnimatedContentProps) => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setAnimatedText('');
    setCurrentIndex(0);
    setIsVisible(false);
    
    // Start animation after a brief delay
    setTimeout(() => {
      setIsVisible(true);
    }, 200);
    
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
    const baseClass = isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4';
    
    switch (animation) {
      case 'fly-around':
        return `${baseClass} transition-all duration-1000 ease-out`;
      case 'shimmer':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'gentle-bounce':
        return `${baseClass} animate-bounce transition-all duration-1000`;
      case 'twinkle':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'sad-glow':
        return `${baseClass} animate-pulse opacity-75 transition-all duration-1000`;
      case 'shooting-star':
        return `${baseClass} animate-bounce transition-all duration-1000`;
      case 'celebration':
        return `${baseClass} animate-bounce transition-all duration-1000`;
      case 'rainbow-appear':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'color-wave':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'arch-formation':
        return `${baseClass} animate-bounce transition-all duration-1000`;
      case 'tree-sway':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'animals-gather':
        return `${baseClass} animate-bounce transition-all duration-1000`;
      case 'wisdom-glow':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      case 'heart-pulse':
        return `${baseClass} animate-pulse transition-all duration-1000`;
      default:
        return `${baseClass} transition-all duration-1000`;
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
      <div className={`text-3xl mb-6 ${getAnimationClass()}`}>
        {getEmojis()}
      </div>
      
      <div className={`text-xl font-comic text-gray-800 leading-relaxed text-center max-w-md ${getAnimationClass()}`}>
        {animatedText}
        <span className="animate-pulse ml-1">|</span>
      </div>
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {animation === 'fly-around' && (
          <div className="absolute top-1/4 left-1/4 animate-bounce text-2xl">🦋</div>
        )}
        {animation === 'shimmer' && (
          <>
            <div className="absolute top-1/3 left-1/5 animate-pulse text-xl">✨</div>
            <div className="absolute top-1/2 right-1/4 animate-pulse delay-500 text-xl">💫</div>
            <div className="absolute bottom-1/3 left-1/3 animate-pulse delay-1000 text-lg">⭐</div>
          </>
        )}
        {animation === 'celebration' && (
          <>
            <div className="absolute top-1/4 left-1/4 animate-bounce text-2xl">🎉</div>
            <div className="absolute top-1/3 right-1/4 animate-bounce delay-300 text-xl">🎊</div>
            <div className="absolute bottom-1/4 left-1/3 animate-bounce delay-700 text-lg">✨</div>
            <div className="absolute top-1/2 left-1/2 animate-bounce delay-1000 text-xl">🌟</div>
          </>
        )}
        {animation === 'rainbow-appear' && (
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-5xl animate-pulse">
            🌈
          </div>
        )}
        {animation === 'shooting-star' && (
          <>
            <div className="absolute top-1/4 right-1/4 animate-bounce text-2xl">💫</div>
            <div className="absolute top-1/3 left-1/3 animate-pulse delay-500 text-xl">⭐</div>
          </>
        )}
        {animation === 'animals-gather' && (
          <>
            <div className="absolute bottom-1/4 left-1/4 animate-bounce text-xl">🐰</div>
            <div className="absolute bottom-1/3 right-1/3 animate-bounce delay-300 text-xl">🦌</div>
            <div className="absolute bottom-1/2 left-1/2 animate-bounce delay-600 text-lg">🐿️</div>
          </>
        )}
      </div>
    </div>
  );
};

export default AnimatedContent;
