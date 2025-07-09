
const letterData: { [key: string]: { emoji: string; name: string }[] } = {
  A: [
    { emoji: '🍎', name: 'Apple' },
    { emoji: '🐊', name: 'Alligator' },
    { emoji: '🐜', name: 'Ant' },
    { emoji: '🦅', name: 'Eagle' },
    { emoji: '✈️', name: 'Airplane' },
    { emoji: '🎨', name: 'Art' },
    { emoji: '🔢', name: 'Add' }
  ],
  B: [
    { emoji: '🍌', name: 'Banana' },
    { emoji: '🐻', name: 'Bear' },
    { emoji: '🎈', name: 'Balloon' },
    { emoji: '🦋', name: 'Butterfly' },
    { emoji: '📚', name: 'Book' },
    { emoji: '⚾', name: 'Ball' },
    { emoji: '🛏️', name: 'Bed' }
  ],
  C: [
    { emoji: '🐱', name: 'Cat' },
    { emoji: '🚗', name: 'Car' },
    { emoji: '🍰', name: 'Cake' },
    { emoji: '🐄', name: 'Cow' },
    { emoji: '🍪', name: 'Cookie' },
    { emoji: '☁️', name: 'Cloud' },
    { emoji: '🌽', name: 'Corn' }
  ],
  D: [
    { emoji: '🐶', name: 'Dog' },
    { emoji: '🦆', name: 'Duck' },
    { emoji: '🍩', name: 'Donut' },
    { emoji: '🐉', name: 'Dragon' },
    { emoji: '🚪', name: 'Door' },
    { emoji: '💎', name: 'Diamond' },
    { emoji: '🦌', name: 'Deer' }
  ],
  E: [
    { emoji: '🐘', name: 'Elephant' },
    { emoji: '🥚', name: 'Egg' },
    { emoji: '👁️', name: 'Eye' },
    { emoji: '🦅', name: 'Eagle' },
    { emoji: '👂', name: 'Ear' },
    { emoji: '⚡', name: 'Electric' },
    { emoji: '🌍', name: 'Earth' }
  ],
  F: [
    { emoji: '🐸', name: 'Frog' },
    { emoji: '🐠', name: 'Fish' },
    { emoji: '🌸', name: 'Flower' },
    { emoji: '🔥', name: 'Fire' },
    { emoji: '🍟', name: 'Fries' },
    { emoji: '👪', name: 'Family' },
    { emoji: '🦊', name: 'Fox' }
  ],
  G: [
    { emoji: '🦒', name: 'Giraffe' },
    { emoji: '🍇', name: 'Grapes' },
    { emoji: '🎸', name: 'Guitar' },
    { emoji: '👻', name: 'Ghost' },
    { emoji: '🎁', name: 'Gift' },
    { emoji: '🌿', name: 'Grass' },
    { emoji: '🧤', name: 'Glove' }
  ],
  H: [
    { emoji: '🐴', name: 'Horse' },
    { emoji: '🏠', name: 'House' },
    { emoji: '💖', name: 'Heart' },
    { emoji: '🔨', name: 'Hammer' },
    { emoji: '🎩', name: 'Hat' },
    { emoji: '🍯', name: 'Honey' },
    { emoji: '🦔', name: 'Hedgehog' }
  ],
  I: [
    { emoji: '🍦', name: 'Ice Cream' },
    { emoji: '🦎', name: 'Iguana' },
    { emoji: '🏝️', name: 'Island' },
    { emoji: '💡', name: 'Idea' },
    { emoji: '🔑', name: 'Iron' },
    { emoji: '🧊', name: 'Ice' },
    { emoji: '👶', name: 'Infant' }
  ],
  J: [
    { emoji: '🚂', name: 'Jet' },
    { emoji: '🧃', name: 'Juice' },
    { emoji: '🤹', name: 'Juggle' },
    { emoji: '👖', name: 'Jeans' },
    { emoji: '🪼', name: 'Jellyfish' },
    { emoji: '🎷', name: 'Jazz' },
    { emoji: '💎', name: 'Jewel' }
  ],
  K: [
    { emoji: '🔑', name: 'Key' },
    { emoji: '🦘', name: 'Kangaroo' },
    { emoji: '🐨', name: 'Koala' },
    { emoji: '🪁', name: 'Kite' },
    { emoji: '👑', name: 'King' },
    { emoji: '🔪', name: 'Knife' },
    { emoji: '⌨️', name: 'Keyboard' }
  ],
  L: [
    { emoji: '🦁', name: 'Lion' },
    { emoji: '🍋', name: 'Lemon' },
    { emoji: '🪜', name: 'Ladder' },
    { emoji: '💡', name: 'Light' },
    { emoji: '🦞', name: 'Lobster' },
    { emoji: '🍃', name: 'Leaf' },
    { emoji: '💋', name: 'Love' }
  ],
  M: [
    { emoji: '🐵', name: 'Monkey' },
    { emoji: '🌙', name: 'Moon' },
    { emoji: '🐭', name: 'Mouse' },
    { emoji: '🥛', name: 'Milk' },
    { emoji: '🍄', name: 'Mushroom' },
    { emoji: '🎵', name: 'Music' },
    { emoji: '🗺️', name: 'Map' }
  ],
  N: [
    { emoji: '🌰', name: 'Nut' },
    { emoji: '🦅', name: 'Nest' },
    { emoji: '🌃', name: 'Night' },
    { emoji: '📰', name: 'News' },
    { emoji: '👃', name: 'Nose' },
    { emoji: '🍜', name: 'Noodles' },
    { emoji: '⚓', name: 'Navy' }
  ],
  O: [
    { emoji: '🐙', name: 'Octopus' },
    { emoji: '🍊', name: 'Orange' },
    { emoji: '🦉', name: 'Owl' },
    { emoji: '🌊', name: 'Ocean' },
    { emoji: '⭕', name: 'O' },
    { emoji: '🛸', name: 'Object' },
    { emoji: '🪗', name: 'Organ' }
  ],
  P: [
    { emoji: '🐼', name: 'Panda' },
    { emoji: '🍕', name: 'Pizza' },
    { emoji: '🐧', name: 'Penguin' },
    { emoji: '🌸', name: 'Pink' },
    { emoji: '🥞', name: 'Pancake' },
    { emoji: '✏️', name: 'Pencil' },
    { emoji: '🎹', name: 'Piano' }
  ],
  Q: [
    { emoji: '👸', name: 'Queen' },
    { emoji: '❓', name: 'Question' },
    { emoji: '🦆', name: 'Quack' },
    { emoji: '🪙', name: 'Quarter' },
    { emoji: '🤫', name: 'Quiet' },
    { emoji: '📊', name: 'Quiz' },
    { emoji: '🧩', name: 'Quest' }
  ],
  R: [
    { emoji: '🐰', name: 'Rabbit' },
    { emoji: '🌈', name: 'Rainbow' },
    { emoji: '🌹', name: 'Rose' },
    { emoji: '🚀', name: 'Rocket' },
    { emoji: '🍚', name: 'Rice' },
    { emoji: '💍', name: 'Ring' },
    { emoji: '🏃', name: 'Run' }
  ],
  S: [
    { emoji: '🐍', name: 'Snake' },
    { emoji: '☀️', name: 'Sun' },
    { emoji: '⭐', name: 'Star' },
    { emoji: '🐌', name: 'Snail' },
    { emoji: '🍓', name: 'Strawberry' },
    { emoji: '🏫', name: 'School' },
    { emoji: '🦈', name: 'Shark' }
  ],
  T: [
    { emoji: '🐅', name: 'Tiger' },
    { emoji: '🌳', name: 'Tree' },
    { emoji: '🚂', name: 'Train' },
    { emoji: '🐢', name: 'Turtle' },
    { emoji: '📺', name: 'TV' },
    { emoji: '🍅', name: 'Tomato' },
    { emoji: '👔', name: 'Tie' }
  ],
  U: [
    { emoji: '☂️', name: 'Umbrella' },
    { emoji: '🦄', name: 'Unicorn' },
    { emoji: '📱', name: 'Up' },
    { emoji: '🎓', name: 'University' },
    { emoji: '🔓', name: 'Unlock' },
    { emoji: '🔀', name: 'Under' },
    { emoji: '🔃', name: 'Update' }
  ],
  V: [
    { emoji: '🌋', name: 'Volcano' },
    { emoji: '🎻', name: 'Violin' },
    { emoji: '🚐', name: 'Van' },
    { emoji: '🏐', name: 'Volleyball' },
    { emoji: '🌿', name: 'Vine' },
    { emoji: '🎮', name: 'Video' },
    { emoji: '👁️', name: 'View' }
  ],
  W: [
    { emoji: '🐋', name: 'Whale' },
    { emoji: '🌊', name: 'Water' },
    { emoji: '🐺', name: 'Wolf' },
    { emoji: '🪟', name: 'Window' },
    { emoji: '⌚', name: 'Watch' },
    { emoji: '🌬️', name: 'Wind' },
    { emoji: '✨', name: 'Wish' }
  ],
  X: [
    { emoji: '📱', name: 'X-ray' },
    { emoji: '🎄', name: 'Xmas' },
    { emoji: '❌', name: 'X' },
    { emoji: '🎯', name: 'eXact' },
    { emoji: '🧪', name: 'eXperiment' },
    { emoji: '🗂️', name: 'eXample' },
    { emoji: '📊', name: 'eXcel' }
  ],
  Y: [
    { emoji: '💛', name: 'Yellow' },
    { emoji: '🧶', name: 'Yarn' },
    { emoji: '🐃', name: 'Yak' },
    { emoji: '🛥️', name: 'Yacht' },
    { emoji: '🥱', name: 'Yawn' },
    { emoji: '📅', name: 'Year' },
    { emoji: '👍', name: 'Yes' }
  ],
  Z: [
    { emoji: '🦓', name: 'Zebra' },
    { emoji: '0️⃣', name: 'Zero' },
    { emoji: '🧟', name: 'Zombie' },
    { emoji: '🏃', name: 'Zoom' },
    { emoji: '📐', name: 'Zigzag' },
    { emoji: '🤐', name: 'Zip' },
    { emoji: '🌿', name: 'Zone' }
  ]
};

const getRandomItems = <T>(array: T[], count: number): T[] => {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const getRandomOtherLetters = (currentLetter: string, count: number) => {
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const otherLetters = allLetters.replace(currentLetter, '');
  const randomLetters = getRandomItems(otherLetters.split(''), count);
  
  const incorrectItems: { emoji: string; name: string }[] = [];
  
  randomLetters.forEach(letter => {
    const items = letterData[letter] || [];
    if (items.length > 0) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      incorrectItems.push(randomItem);
    }
  });
  
  return incorrectItems;
};

const colors = [
  'from-pink-400 to-rose-600',
  'from-purple-400 to-indigo-600',
  'from-blue-400 to-cyan-600',
  'from-green-400 to-emerald-600',
  'from-yellow-400 to-orange-600',
  'from-red-400 to-pink-600',
  'from-indigo-400 to-purple-600',
  'from-teal-400 to-blue-600'
];

export const generateLetterBubbles = (targetLetter: string) => {
  const correctItems = letterData[targetLetter] || [];
  const selectedCorrect = getRandomItems(correctItems, Math.min(5, correctItems.length));
  const incorrectItems = getRandomOtherLetters(targetLetter, 5);
  
  const allItems = [...selectedCorrect, ...incorrectItems];
  const shuffledItems = getRandomItems(allItems, Math.min(10, allItems.length));
  
  return shuffledItems.map((item, index) => {
    const isCorrect = selectedCorrect.includes(item);
    
    return {
      id: index,
      emoji: item.emoji,
      name: item.name,
      letter: targetLetter,
      isCorrect,
      x: Math.random() * 75,
      y: Math.random() * 75,
      clicked: false,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  });
};
