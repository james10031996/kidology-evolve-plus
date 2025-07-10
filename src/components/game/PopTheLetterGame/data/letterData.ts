
import { letterSafariData } from '../../LetterSafari/letterSafariData';

export interface LetterItem {
  emoji: string;
  name: string;
  fullName: string;
  information: string;
  category: string;
  habitat?: string;
}

// Convert letterSafariData to our format
export const letterDatabase: { [key: string]: LetterItem[] } = {};

// Transform the data from letterSafariData
Object.keys(letterSafariData).forEach(letter => {
  const items = letterSafariData[letter as keyof typeof letterSafariData];
  letterDatabase[letter] = items.map(item => ({
    emoji: item.emoji,
    name: item.name,
    fullName: item.fullName || item.name,
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
