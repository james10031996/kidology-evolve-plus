
import { getRandomLetterItems } from '../data/letterData';

export interface LetterBubble {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  isCorrect: boolean;
  x: number;
  y: number;
  clicked: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
  isBlinking?: boolean;
  isDisappearing?: boolean;
}

const colors = [
  'from-pink-400 to-pink-600',
  'from-purple-400 to-purple-600',
  'from-blue-400 to-blue-600',
  'from-green-400 to-green-600',
  'from-yellow-400 to-yellow-600',
  'from-red-400 to-red-600',
  'from-indigo-400 to-indigo-600',
  'from-orange-400 to-orange-600'
];

const wrongAnswers = [
  { emoji: '🌟', name: 'Star', letter: 'S' },
  { emoji: '🌙', name: 'Moon', letter: 'M' },
  { emoji: '☀️', name: 'Sun', letter: 'S' },
  { emoji: '🌈', name: 'Rainbow', letter: 'R' },
  { emoji: '⚡', name: 'Lightning', letter: 'L' },
  { emoji: '🔥', name: 'Fire', letter: 'F' },
  { emoji: '💧', name: 'Water', letter: 'W' },
  { emoji: '🌸', name: 'Blossom', letter: 'B' },
  { emoji: '🍃', name: 'Leaf', letter: 'L' },
  { emoji: '🌺', name: 'Flower', letter: 'F' },
  { emoji: '🦋', name: 'Butterfly', letter: 'B' },
  { emoji: '🐝', name: 'Bee', letter: 'B' },
  { emoji: '🌻', name: 'Sunflower', letter: 'S' },
  { emoji: '🌷', name: 'Tulip', letter: 'T' },
  { emoji: '🌹', name: 'Rose', letter: 'R' }
];

export const generateLetterBubbles = (targetLetter: string, targetCount: number = 5): LetterBubble[] => {
  const bubbles: LetterBubble[] = [];
  const letterItems = getRandomLetterItems(targetLetter, targetCount);
  
  // Add target letter bubbles (exactly 5)
  letterItems.slice(0, targetCount).forEach((item, index) => {
    let x, y;
    let attempts = 0;
    
    do {
      x = Math.random() * 75 + 5;
      y = Math.random() * 65 + 10;
      attempts++;
    } while (
      attempts < 10 &&
      bubbles.some(existing => Math.abs(existing.x - x) < 12 && Math.abs(existing.y - y) < 12)
    );

    bubbles.push({
      id: index,
      emoji: item.emoji,
      name: item.name,
      letter: targetLetter,
      isCorrect: true,
      x,
      y,
      clicked: false,
      color: colors[index % colors.length],
      fullName: item.fullName,
      information: item.information,
      category: item.category,
      habitat: item.habitat,
      isBlinking: false,
      isDisappearing: false
    });
  });

  // Add random wrong answer bubbles (exactly 5)
  const availableWrong = wrongAnswers.filter(item => item.letter !== targetLetter);
  const selectedWrong = availableWrong.sort(() => Math.random() - 0.5).slice(0, 5);
  
  selectedWrong.forEach((item, index) => {
    let x, y;
    let attempts = 0;
    
    do {
      x = Math.random() * 75 + 5;
      y = Math.random() * 65 + 10;
      attempts++;
    } while (
      attempts < 10 &&
      bubbles.some(existing => Math.abs(existing.x - x) < 12 && Math.abs(existing.y - y) < 12)
    );

    bubbles.push({
      id: bubbles.length,
      emoji: item.emoji,
      name: item.name,
      letter: item.letter,
      isCorrect: false,
      x,
      y,
      clicked: false,
      color: colors[(index + targetCount) % colors.length],
      isBlinking: false,
      isDisappearing: false
    });
  });

  return bubbles.sort(() => Math.random() - 0.5);
};
