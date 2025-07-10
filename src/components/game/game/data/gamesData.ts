
// Define the structure for each game
export interface GameData {
  id: number;
  title: string;
  description: string;
  image: string;
  difficulty: string;
  category: string;
  path: string;
  color: string;
  tags: string[];
  ageRange: string;
  skills: string[];
  playTime: string;
  isNew?: boolean;
  featured?: boolean;
}

export const gamesData = [
  {
    id: 1,
    title: "Math Sprint",
    description: "Sharpen your math skills with fast-paced challenges!",
    image: "/images/game-card-icons/math.png",
    difficulty: "Beginner",
    category: "Math",
    path: "/games/math-sprint",
    color: "from-red-400 to-red-600",
    tags: ["Math", "Numbers", "Quick Thinking", "Arithmetic"],
    ageRange: "6-12 years",
    skills: ["Addition", "Subtraction", "Multiplication", "Division"],
    playTime: "5-10 minutes",
  },
  {
    id: 2,
    title: "Word Scramble",
    description: "Unscramble letters to form words and expand your vocabulary!",
    image: "/images/game-card-icons/word.png",
    difficulty: "Intermediate",
    category: "Language",
    path: "/games/word-scramble",
    color: "from-blue-400 to-blue-600",
    tags: ["Words", "Vocabulary", "Spelling", "Anagrams"],
    ageRange: "8-14 years",
    skills: ["Spelling", "Vocabulary", "Word Recognition", "Pattern Recognition"],
    playTime: "5-10 minutes",
  },
  {
    id: 3,
    title: "Memory Match",
    description: "Test your memory by matching pairs of cards!",
    image: "/images/game-card-icons/memory.png",
    difficulty: "Beginner",
    category: "Memory",
    path: "/games/memory-match",
    color: "from-green-400 to-green-600",
    tags: ["Memory", "Matching", "Concentration", "Pairs"],
    ageRange: "4-10 years",
    skills: ["Concentration", "Visual Memory", "Short-term Memory", "Focus"],
    playTime: "5-10 minutes",
  },
  {
    id: 4,
    title: "Color Catch",
    description: "Improve your reflexes by catching the correct colors!",
    image: "/images/game-card-icons/color.png",
    difficulty: "Intermediate",
    category: "Reaction",
    path: "/games/color-catch",
    color: "from-yellow-400 to-yellow-600",
    tags: ["Colors", "Reflexes", "Speed", "Coordination"],
    ageRange: "6-12 years",
    skills: ["Reflexes", "Color Recognition", "Hand-eye Coordination", "Speed"],
    playTime: "5-10 minutes",
  },
  {
    id: 5,
    title: "Shape Sorter",
    description: "Sort shapes into the correct containers!",
    image: "/images/game-card-icons/shape.png",
    difficulty: "Beginner",
    category: "Logic",
    path: "/games/shape-sorter",
    color: "from-purple-400 to-purple-600",
    tags: ["Shapes", "Sorting", "Logic", "Patterns"],
    ageRange: "3-7 years",
    skills: ["Shape Recognition", "Sorting Skills", "Logical Thinking", "Problem Solving"],
    playTime: "5-10 minutes",
  },
  {
    id: 6,
    title: "Number Sequence",
    description: "Identify the next number in the sequence!",
    image: "/images/game-card-icons/number.png",
    difficulty: "Intermediate",
    category: "Math",
    path: "/games/number-sequence",
    color: "from-orange-400 to-orange-600",
    tags: ["Numbers", "Sequences", "Patterns", "Math"],
    ageRange: "7-13 years",
    skills: ["Pattern Recognition", "Logical Thinking", "Math Skills", "Problem Solving"],
    playTime: "5-10 minutes",
  },
  {
    id: 7,
    title: "Animal Sounds",
    description: "Match the animal to the sound it makes!",
    image: "/images/game-card-icons/animal.png",
    difficulty: "Beginner",
    category: "Educational",
    path: "/games/animal-sounds",
    color: "from-teal-400 to-teal-600",
    tags: ["Animals", "Sounds", "Matching", "Educational"],
    ageRange: "3-7 years",
    skills: ["Auditory Recognition", "Animal Knowledge", "Matching Skills", "Memory"],
    playTime: "5-10 minutes",
  },
  {
    id: 8,
    title: "Letter Tracing",
    description: "Practice writing by tracing letters!",
    image: "/images/game-card-icons/letter.png",
    difficulty: "Beginner",
    category: "Language",
    path: "/games/letter-tracing",
    color: "from-pink-400 to-pink-600",
    tags: ["Letters", "Tracing", "Writing", "Language"],
    ageRange: "4-8 years",
    skills: ["Fine Motor Skills", "Letter Recognition", "Writing Skills", "Hand-eye Coordination"],
    playTime: "5-10 minutes",
  },
  {
    id: 9,
    title: "Letter Safari",
    description: "Embark on a safari to find animals and learn the alphabet!",
    image: "🦁",
    difficulty: "Beginner",
    category: "Language",
    path: "/games/letter-safari",
    color: "from-lime-400 to-green-500",
    tags: ["Letters", "Animals", "Alphabet", "Safari"],
    ageRange: "4-7 years",
    skills: ["Letter Recognition", "Animal Knowledge", "Vocabulary", "Observation"],
    playTime: "5-10 minutes",
    isNew: true,
    featured: true
  },
  {
    id: 10,
    title: "Pop the Letter",
    description: "Pop bubbles with letters and learn new words!",
    image: "🎈",
    difficulty: "Intermediate",
    category: "Language",
    path: "/games/pop-the-letter",
    color: "from-pink-400 to-purple-500",
    tags: ["Letters", "Words", "Vocabulary", "Bubbles"],
    ageRange: "5-9 years",
    skills: ["Letter Recognition", "Vocabulary", "Reading", "Reflexes"],
    playTime: "7-12 minutes",
    isNew: true,
    featured: true
  },
  {
    id: 11,
    title: "Word Safari Challenge",
    description: "Type animal names and discover amazing facts! Combine typing skills with learning.",
    image: "🔤",
    difficulty: "Intermediate",
    category: "Typing",
    path: "/games/word-safari-challenge",
    color: "from-emerald-400 to-teal-500",
    tags: ["Typing", "Animals", "Learning", "Safari"],
    ageRange: "6-12 years",
    skills: ["Typing Speed", "Spelling", "Animal Knowledge", "Memory"],
    playTime: "10-15 minutes",
    isNew: true,
    featured: true
  }
];

// Organize games by category
export const categorizedGames = gamesData.reduce((acc: { [key: string]: GameData[] }, game) => {
  if (!acc[game.category]) {
    acc[game.category] = [];
  }
  acc[game.category].push(game);
  return acc;
}, {});

// Export categorized arrays
export const mathGames = gamesData.filter(game => game.category === 'Math');
export const languageGames = gamesData.filter(game => game.category === 'Language');
export const memoryGames = gamesData.filter(game => game.category === 'Memory');
export const logicGames = gamesData.filter(game => game.category === 'Logic');
export const puzzleGames = gamesData.filter(game => game.category === 'Puzzle');
export const scienceGames = gamesData.filter(game => game.category === 'Science');
