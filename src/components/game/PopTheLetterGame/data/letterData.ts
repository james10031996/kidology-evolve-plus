
import { allAnimalsDatabase } from '../../LetterSafari/letterSafariData';

export interface LetterItem {
  emoji: string;
  name: string;
  fullName: string;
  information: string;
  category: string;
  habitat?: string;
}

// Convert allAnimalsDatabase to our format
export const letterDatabase: { [key: string]: LetterItem[] } = {};

// Transform the data from allAnimalsDatabase
Object.keys(allAnimalsDatabase).forEach(letter => {
  const items = allAnimalsDatabase[letter as keyof typeof allAnimalsDatabase];
  letterDatabase[letter] = items.map(item => ({
    emoji: item.emoji,
    name: item.animal,
    fullName: item.fullName || item.animal,
    information: item.information,
    category: item.category,
    habitat: item.habitat
  }));
});

export const getRandomLetterItems = (letter: string, count: number = 8): LetterItem[] => {
  const items = letterDatabase[letter] || [];
  if (items.length === 0) {
    // Fallback for letters not in database
    return [{
      emoji: '❓',
      name: `${letter} Item`,
      fullName: `Something that starts with ${letter}`,
      information: `This is an item that begins with the letter ${letter}.`,
      category: 'General'
    }];
  }
  
  // If we have fewer items than requested, repeat them
  const result: LetterItem[] = [];
  for (let i = 0; i < count; i++) {
    result.push(items[i % items.length]);
  }
  
  return result;
};
