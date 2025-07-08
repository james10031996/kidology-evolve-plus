
export const englishLessonsData = [
  { id: 'alphabet', title: '🔤 Alphabet Adventure', description: 'Learn all 26 letters with fun activities', color: 'gradient-blue', difficulty: 'Easy', duration: '15 min' },
  { id: 'phonics', title: '🗣️ Phonics Fun', description: 'Connect letters to sounds', color: 'gradient-green', difficulty: 'Easy', duration: '20 min' },
  { id: 'sight-words', title: '👁️ Sight Words', description: 'Recognize common words instantly', color: 'bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600', difficulty: 'Medium', duration: '25 min' },
  { id: 'rhyming', title: '🎵 Rhyming Games', description: 'Discover words that sound alike', color: 'gradient-purple', difficulty: 'Easy', duration: '18 min' },
  { id: 'spelling', title: '✏️ Spelling Bee', description: 'Build words letter by letter', color: 'gradient-orange', difficulty: 'Medium', duration: '22 min' },
  { id: 'reading', title: '📚 Reading Stories', description: 'Practice reading simple stories', color: 'gradient-pink', difficulty: 'Medium', duration: '30 min' }
];

export const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => ({
  letter,
  word: {
    A: 'Apple', B: 'Ball', C: 'Cat', D: 'Dog', E: 'Egg', F: 'Fish',
    G: 'Goat', H: 'Hat', I: 'Ice', J: 'Jam', K: 'Kite', L: 'Lion',
    M: 'Moon', N: 'Net', O: 'Owl', P: 'Pig', Q: 'Queen', R: 'Rain',
    S: 'Sun', T: 'Tree', U: 'Umbrella', V: 'Van', W: 'Water', X: 'X-ray',
    Y: 'Yellow', Z: 'Zebra'
  }[letter] || '',
  emoji: {
    A: '🍎', B: '⚽', C: '🐱', D: '🐕', E: '🥚', F: '🐟',
    G: '🐐', H: '👒', I: '🧊', J: '🍯', K: '🪁', L: '🦁',
    M: '🌙', N: '🥅', O: '🦉', P: '🐷', Q: '👑', R: '🌧️',
    S: '☀️', T: '🌳', U: '☂️', V: '🚐', W: '💧', X: '🩻',
    Y: '💛', Z: '🦓'
  }[letter] || ''
}));

export const phonicsWords = [
  { word: 'CAT', sounds: ['C-A-T'], emoji: '🐱', color: 'bg-red-100' },
  { word: 'DOG', sounds: ['D-O-G'], emoji: '🐕', color: 'bg-blue-100' },
  { word: 'SUN', sounds: ['S-U-N'], emoji: '☀️', color: 'bg-yellow-100' },
  { word: 'BEE', sounds: ['B-E-E'], emoji: '🐝', color: 'bg-green-100' }
];

export const quizQuestions = {
  alphabet: [
    {
      id: '1',
      question: 'What letter comes after M?',
      options: ['L', 'N', 'O', 'P'],
      correctAnswer: 1,
      explanation: 'In the alphabet order, N comes right after M! M-N-O-P...',
      concept: 'Alphabetical order and letter sequence',
      emoji: '🔤',
      animation: 'bounce'
    },
    {
      id: '2',
      question: 'Which word starts with the letter B?',
      options: ['Apple', 'Ball', 'Cat', 'Dog'],
      correctAnswer: 1,
      explanation: 'Ball starts with the letter B! B-A-L-L',
      concept: 'Letter-sound correspondence and word recognition',
      emoji: '⚽',
      animation: 'pulse'
    }
  ],
  phonics: [
    {
      id: '1',
      question: 'What sound does the letter "S" make?',
      options: ['Mmm', 'Sss', 'Rrr', 'Ttt'],
      correctAnswer: 1,
      explanation: 'The letter S makes a "Sss" sound, like a snake!',
      concept: 'Letter-sound relationships in phonics',
      emoji: '🐍',
      animation: 'bounce'
    }
  ]
};
