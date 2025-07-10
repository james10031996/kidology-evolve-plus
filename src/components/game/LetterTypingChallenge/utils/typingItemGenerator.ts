
import { getRandomLetterItems } from '../../PopTheLetterGame/data/letterData';

export interface TypingItem {
  id: number;
  emoji: string;
  name: string;
  letter: string;
  x: number;
  y: number;
  found: boolean;
  color: string;
  fullName?: string;
  information?: string;
  category?: string;
  habitat?: string;
  pulsing?: boolean;
  fading?: boolean;
}

const colors = [
  'from-emerald-400 to-emerald-600',
  'from-teal-400 to-teal-600',
  'from-cyan-400 to-cyan-600',
  'from-blue-400 to-blue-600',
  'from-indigo-400 to-indigo-600',
  'from-purple-400 to-purple-600',
  'from-pink-400 to-pink-600',
  'from-rose-400 to-rose-600'
];

const distractorItems = [
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

export const generateTypingItems = (targetLetter: string, totalCount: number = 10): TypingItem[] => {
  const items: TypingItem[] = [];
  
  // Get target letter items (5 items)
  let letterItems = getRandomLetterItems(targetLetter, 5);
  
  // Ensure we have exactly 5 items by repeating if necessary
  while (letterItems.length < 5) {
    const additionalItems = getRandomLetterItems(targetLetter, 5 - letterItems.length);
    letterItems = [...letterItems, ...additionalItems];
  }
  letterItems = letterItems.slice(0, 5);
  
  // Add target letter items
  letterItems.forEach((item, index) => {
    let x, y;
    let attempts = 0;
    
    do {
      x = Math.random() * 75 + 5;
      y = Math.random() * 65 + 10;
      attempts++;
    } while (
      attempts < 10 &&
      items.some(existing => Math.abs(existing.x - x) < 12 && Math.abs(existing.y - y) < 12)
    );

    items.push({
      id: index,
      emoji: item.emoji,
      name: item.name,
      letter: targetLetter,
      x,
      y,
      found: false,
      color: colors[index % colors.length],
      fullName: item.fullName,
      information: item.information,
      category: item.category,
      habitat: item.habitat,
      pulsing: false,
      fading: false
    });
  });

  // Add distractor items (5 items)
  const availableDistractors = distractorItems.filter(item => item.letter !== targetLetter);
  const selectedDistractors = availableDistractors.sort(() => Math.random() - 0.5).slice(0, 5);
  
  selectedDistractors.forEach((item, index) => {
    let x, y;
    let attempts = 0;
    
    do {
      x = Math.random() * 75 + 5;
      y = Math.random() * 65 + 10;
      attempts++;
    } while (
      attempts < 10 &&
      items.some(existing => Math.abs(existing.x - x) < 12 && Math.abs(existing.y - y) < 12)
    );

    items.push({
      id: items.length,
      emoji: item.emoji,
      name: item.name,
      letter: item.letter,
      x,
      y,
      found: false,
      color: colors[(index + 5) % colors.length],
      pulsing: false,
      fading: false
    });
  });

  return items.sort(() => Math.random() - 0.5);
};
