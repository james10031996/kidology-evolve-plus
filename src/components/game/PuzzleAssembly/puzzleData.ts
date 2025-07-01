// src/data/puzzleData.ts

export interface PuzzlePiece {
  id: string;
  name: string;
  emoji: string;
  color: string;
  hint?: string;
}

export interface PuzzleData {
  id: string;
  name: string;
  emoji: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit?: number;
  slots: number;
  pieces: PuzzlePiece[];
  hints: string[];
  validPieceIds: string[];
  incorrectIds: string[];
}

export const puzzleData: PuzzleData[] = [

  {
      id: 'usa',
      name: 'United States Map',
      emoji: '🇺🇸',
      description: 'Build the United States by placing states correctly!',
      difficulty: 'Easy',
      pieces: [
        { id: 'california', name: 'California', emoji: '🏖️', color: 'bg-blue-200', hint: 'West coast, golden beaches' },
        { id: 'texas', name: 'Texas', emoji: '🤠', color: 'bg-red-200', hint: 'Everything is bigger here!' },
        { id: 'florida', name: 'Florida', emoji: '🏝️', color: 'bg-green-200', hint: 'Sunshine State with palm trees' },
        { id: 'mumbai', name: 'Mumbai', emoji: '🏝️', color: 'bg-green-200', hint: 'Sunshine State with palm trees' },
        { id: 'newyork', name: 'New York', emoji: '🗽', color: 'bg-purple-200', hint: 'Home of the Statue of Liberty' },
        { id: 'alaska', name: 'Alaska', emoji: '🐻', color: 'bg-cyan-200', hint: 'Coldest state with polar bears' }
      ],
      slots: 5,
      validPieceIds: ['california', 'texas', 'florida', 'newyork', 'alaska'],
      incorrectIds: ['mumbai', 'delhi', 'paris'],
      hints: ['Look for coastal states first', 'Think about weather patterns', 'Remember state symbols']
    },
    {
      id: 'world',
      name: 'World Continents',
      emoji: '🌍',
      description: 'Connect all continents to complete our beautiful world!',
      difficulty: 'Medium',
      pieces: [
        { id: 'northamerica', name: 'North America', emoji: '🦅', color: 'bg-blue-200', hint: 'Eagles soar here' },
        { id: 'southamerica', name: 'South America', emoji: '🦙', color: 'bg-green-200', hint: 'Llamas live here' },
        { id: 'europe', name: 'Europe', emoji: '🏰', color: 'bg-purple-200', hint: 'Medieval castles' },
        { id: 'africa', name: 'Africa', emoji: '🦁', color: 'bg-orange-200', hint: 'Lions roam freely' },
        { id: 'asia', name: 'Asia', emoji: '🐼', color: 'bg-red-200', hint: 'Giant pandas live here' },
        { id: 'india', name: 'India', emoji: '🐼', color: 'bg-red-200', hint: 'Giant pandas live here' },
        { id: 'america', name: 'America', emoji: '🐼', color: 'bg-red-200', hint: 'Giant pandas live here' },
        { id: 'australia', name: 'Australia', emoji: '🦘', color: 'bg-yellow-200', hint: 'Kangaroos hop around' }
      ],
      slots: 6,
      validPieceIds: ['northamerica', 'southamerica', 'europe', 'africa', 'australia', 'asia'],
      incorrectIds: ['india', 'america'],
      hints: ['Start with the largest continent', 'Think about animals from each place', 'Remember continental shapes']
    },
    {
      id: 'body',
      name: 'Human Body',
      emoji: '👤',
      description: 'Assemble the human body parts in the right places!',
      difficulty: 'Easy',
      pieces: [
        { id: 'head', name: 'Head', emoji: '🧠', color: 'bg-pink-200', hint: 'Houses the brain' },
        { id: 'torso', name: 'Torso', emoji: '🫁', color: 'bg-blue-200', hint: 'Contains lungs and heart' },
        { id: 'leftarm', name: 'Left Arm', emoji: '💪', color: 'bg-green-200', hint: 'Left side strength' },
        { id: 'rightarm', name: 'Right Arm', emoji: '💪', color: 'bg-green-200', hint: 'Right side strength' },
        { id: 'leftleg', name: 'Left Leg', emoji: '🦵', color: 'bg-yellow-200', hint: 'Left leg for walking' },
        { id: 'rightleg', name: 'Right Leg', emoji: '🦵', color: 'bg-yellow-200', hint: 'Right leg for walking' },
        { id: 'banana', name: 'Banana', emoji: '🍌', color: 'bg-yellow-100', hint: 'Not part of the body!' },
        { id: 'hat', name: 'Hat', emoji: '🎩', color: 'bg-gray-100', hint: 'An accessory, not a body part!' }
      ],
      validPieceIds: ['head', 'torso', 'leftarm', 'rightarm', 'leftleg', 'rightleg'],
      incorrectIds: ['banana', 'hat'],
      slots: 6,
      hints: ['Head goes at the top', 'Arms connect to shoulders', 'Legs support the body']
    },
    {
      id: 'car',
      name: 'Build a Car',
      emoji: '🚗',
      description: 'Assemble all car parts to build a complete vehicle!',
      difficulty: 'Easy',
      pieces: [
        { id: 'engine', name: 'Engine', emoji: '⚙️', color: 'bg-gray-200', hint: 'Powers the car' },
        { id: 'wheels', name: 'Wheels', emoji: '🛞', color: 'bg-black', hint: 'Round and help car move' },
        { id: 'body', name: 'Body', emoji: '🚙', color: 'bg-red-200', hint: 'Main frame of car' },
        { id: 'windows', name: 'Windows', emoji: '🪟', color: 'bg-blue-200', hint: 'Clear to see through' },
        { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-purple-200', hint: 'Not a car part!' },
        { id: 'parachute', name: 'Parachute', emoji: '🪂', color: 'bg-orange-200', hint: 'Used in air, not in cars' }
      ],
      validPieceIds: ['engine', 'wheels', 'body', 'windows'],
      incorrectIds: ['rocket', 'parachute'],
      slots: 4,
      hints: ['Start with the main body', 'Wheels go at the bottom', 'Windows let light in']
    },
    {
      id: 'animals',
      name: 'Animal Kingdom',
      emoji: '🦁',
      description: 'Place animals in their natural habitat groups!',
      difficulty: 'Medium',
      timeLimit: 120,
      pieces: [
        { id: 'lion', name: 'Lion', emoji: '🦁', color: 'bg-yellow-200', hint: 'King of the jungle' },
        { id: 'elephant', name: 'Elephant', emoji: '🐘', color: 'bg-gray-200', hint: 'Largest land animal' },
        { id: 'penguin', name: 'Penguin', emoji: '🐧', color: 'bg-blue-200', hint: 'Lives in cold places' },
        { id: 'monkey', name: 'Monkey', emoji: '🐵', color: 'bg-brown-200', hint: 'Swings on trees' },
        { id: 'fish', name: 'Fish', emoji: '🐠', color: 'bg-cyan-200', hint: 'Lives underwater' },
        { id: 'bird', name: 'Bird', emoji: '🐦', color: 'bg-green-200', hint: 'Flies in the sky' },
        { id: 'robot', name: 'Robot', emoji: '🤖', color: 'bg-gray-100', hint: 'Not an animal!' },
        { id: 'chair', name: 'Chair', emoji: '🪑', color: 'bg-blue-100', hint: 'Furniture, not fauna' }
      ],
      validPieceIds: ['lion', 'elephant', 'penguin', 'monkey', 'fish', 'bird'],
      incorrectIds: ['robot', 'chair'],
      slots: 6,
      hints: ['Think about where each animal lives', 'Land, sea, or air?', 'Hot or cold climates?']
    },
    {
      id: 'solar',
      name: 'Solar System',
      emoji: '🪐',
      description: 'Arrange planets in order from the Sun!',
      difficulty: 'Hard',
      timeLimit: 180,
      pieces: [
        { id: 'mercury', name: 'Mercury', emoji: '☿️', color: 'bg-gray-300', hint: 'Closest to Sun' },
        { id: 'venus', name: 'Venus', emoji: '♀️', color: 'bg-yellow-300', hint: 'Hottest planet' },
        { id: 'earth', name: 'Earth', emoji: '🌍', color: 'bg-blue-300', hint: 'Our home planet' },
        { id: 'mars', name: 'Mars', emoji: '♂️', color: 'bg-red-300', hint: 'The red planet' },
        { id: 'jupiter', name: 'Jupiter', emoji: '♃', color: 'bg-orange-300', hint: 'Largest planet' },
        { id: 'saturn', name: 'Saturn', emoji: '♄', color: 'bg-yellow-200', hint: 'Has beautiful rings' },
        { id: 'pluto', name: 'Pluto', emoji: '❄️', color: 'bg-blue-100', hint: 'No longer a planet!' },
        { id: 'moon', name: 'Moon', emoji: '🌕', color: 'bg-gray-100', hint: 'It orbits Earth' }
      ],
      validPieceIds: ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn'],
      incorrectIds: ['pluto', 'moon'],
      slots: 6,
      hints: ['Mercury is first', 'Remember: My Very Educated Mother...', 'Earth is third from Sun']
    },
    {
      id: 'computer',
      name: 'Build a Computer',
      emoji: '💻',
      description: 'Assemble the essential components of a personal computer.',
      difficulty: 'Medium',
      pieces: [
        { id: 'cpu', name: 'CPU', emoji: '🧠', color: 'bg-gray-200', hint: 'The brain of the computer' },
        { id: 'ram', name: 'RAM', emoji: '📟', color: 'bg-blue-200', hint: 'Short-term memory' },
        { id: 'motherboard', name: 'Motherboard', emoji: '🧩', color: 'bg-green-200', hint: 'Everything connects here' },
        { id: 'harddrive', name: 'Hard Drive', emoji: '💾', color: 'bg-yellow-200', hint: 'Stores all data' },
        { id: 'powersupply', name: 'Power Supply', emoji: '🔌', color: 'bg-red-200', hint: 'Provides power' },
        { id: 'toaster', name: 'Toaster', emoji: '🍞', color: 'bg-orange-200', hint: 'Definitely not a computer part!' }
      ],
      slots: 5,
      validPieceIds: ['cpu', 'ram', 'motherboard', 'harddrive', 'powersupply'],
      incorrectIds: ['toaster'],
      hints: ['Start with the brain', 'Storage and power are essentials', 'Ignore kitchen appliances!']
    },
    {
      id: 'spacekit',
      name: 'Space Exploration Kit',
      emoji: '🚀',
      description: 'Prepare everything needed for a space mission.',
      difficulty: 'Medium',
      pieces: [
        { id: 'spacesuit', name: 'Space Suit', emoji: '👨‍🚀', color: 'bg-blue-300', hint: 'Needed for astronaut' },
        { id: 'rocket', name: 'Rocket', emoji: '🚀', color: 'bg-red-200', hint: 'Takes you to space' },
        { id: 'oxygen', name: 'Oxygen Tank', emoji: '🧴', color: 'bg-cyan-200', hint: 'Helps you breathe' },
        { id: 'toolkit', name: 'Tool Kit', emoji: '🧰', color: 'bg-yellow-200', hint: 'For repairs in space' },
        { id: 'banana', name: 'Banana', emoji: '🍌', color: 'bg-green-200', hint: 'Not a critical mission item' }
      ],
      slots: 4,
      validPieceIds: ['spacesuit', 'rocket', 'oxygen', 'toolkit'],
      incorrectIds: ['banana'],
      hints: ['Focus on survival gear', 'Bananas are optional... but not mission-critical']
    },
    {
      id: 'oceanlife',
      name: 'Ocean Life',
      emoji: '🌊',
      description: 'Identify creatures that live in the ocean.',
      difficulty: 'Easy',
      pieces: [
        { id: 'shark', name: 'Shark', emoji: '🦈', color: 'bg-blue-200', hint: 'Top predator in the ocean' },
        { id: 'whale', name: 'Whale', emoji: '🐋', color: 'bg-indigo-200', hint: 'Largest ocean mammal' },
        { id: 'dolphin', name: 'Dolphin', emoji: '🐬', color: 'bg-cyan-200', hint: 'Smart sea animal' },
        { id: 'crab', name: 'Crab', emoji: '🦀', color: 'bg-red-200', hint: 'Scuttles along the beach' },
        { id: 'camel', name: 'Camel', emoji: '🐫', color: 'bg-yellow-300', hint: 'Does not swim!' }
      ],
      slots: 4,
      validPieceIds: ['shark', 'whale', 'dolphin', 'crab'],
      incorrectIds: ['camel'],
      hints: ['Camels don’t swim', 'Look for aquatic life', 'Whales and dolphins are mammals']
    },
    {
      id: 'math',
      name: 'Math Symbols',
      emoji: '➗',
      description: 'Match the math symbols to their correct names!',
      difficulty: 'Easy',
      slots: 5,
      validPieceIds: ['plus', 'minus', 'multiply', 'divide', 'equals'],
      incorrectIds: ['percent', 'hashtag'],
      pieces: [
        { id: 'plus', name: 'Plus', emoji: '➕', color: 'bg-green-200', hint: 'Used for addition' },
        { id: 'minus', name: 'Minus', emoji: '➖', color: 'bg-red-200', hint: 'Used for subtraction' },
        { id: 'multiply', name: 'Multiply', emoji: '✖️', color: 'bg-yellow-200', hint: 'Used for multiplication' },
        { id: 'divide', name: 'Divide', emoji: '➗', color: 'bg-blue-200', hint: 'Used for division' },
        { id: 'equals', name: 'Equals', emoji: '🟰', color: 'bg-purple-200', hint: 'Shows equality' },
        { id: 'percent', name: 'Percent', emoji: '📊', color: 'bg-gray-200', hint: 'Used in percentages' },
        { id: 'hashtag', name: 'Hashtag', emoji: '#️⃣', color: 'bg-pink-200', hint: 'Not a math symbol' }
      ],
      hints: ['These symbols are used in equations', 'Look for familiar math signs']
    },
    {
      id: 'inventors',
      name: 'Famous Inventors',
      emoji: '💡',
      description: 'Match inventors to their famous inventions!',
      difficulty: 'Medium',
      slots: 5,
      validPieceIds: ['edison', 'tesla', 'wright', 'bell', 'einstein'],
      incorrectIds: ['beethoven', 'picasso'],
      pieces: [
        { id: 'edison', name: 'Thomas Edison', emoji: '💡', color: 'bg-yellow-200', hint: 'Light bulb' },
        { id: 'tesla', name: 'Nikola Tesla', emoji: '⚡', color: 'bg-blue-200', hint: 'AC current' },
        { id: 'wright', name: 'Wright Brothers', emoji: '✈️', color: 'bg-green-200', hint: 'First airplane' },
        { id: 'bell', name: 'Alexander Graham Bell', emoji: '📞', color: 'bg-red-200', hint: 'Telephone' },
        { id: 'einstein', name: 'Albert Einstein', emoji: '🧠', color: 'bg-purple-200', hint: 'Theory of Relativity' },
        { id: 'beethoven', name: 'Beethoven', emoji: '🎵', color: 'bg-gray-200', hint: 'Composer, not inventor' },
        { id: 'picasso', name: 'Picasso', emoji: '🎨', color: 'bg-pink-200', hint: 'Painter, not inventor' }
      ],
      hints: ['Think of people who invented or discovered things', 'Look for science-related icons']
    },
    {
      id: 'festivals',
      name: 'World Festivals',
      emoji: '🎉',
      description: 'Place the correct festivals from around the world!',
      difficulty: 'Medium',
      slots: 5,
      validPieceIds: ['diwali', 'christmas', 'eid', 'hanukkah', 'chinesenewyear'],
      incorrectIds: ['birthday', 'halloween'],
      pieces: [
        { id: 'diwali', name: 'Diwali', emoji: '🪔', color: 'bg-yellow-100', hint: 'Festival of Lights' },
        { id: 'christmas', name: 'Christmas', emoji: '🎄', color: 'bg-green-100', hint: 'Celebrated in December' },
        { id: 'eid', name: 'Eid', emoji: '🕌', color: 'bg-blue-100', hint: 'Islamic festival' },
        { id: 'hanukkah', name: 'Hanukkah', emoji: '🕎', color: 'bg-purple-100', hint: 'Jewish Festival of Lights' },
        { id: 'chinesenewyear', name: 'Chinese New Year', emoji: '🧧', color: 'bg-red-100', hint: 'Celebrated in China' },
        { id: 'birthday', name: 'Birthday', emoji: '🎂', color: 'bg-pink-100', hint: 'Personal celebration' },
        { id: 'halloween', name: 'Halloween', emoji: '🎃', color: 'bg-orange-100', hint: 'Scary costumes' }
      ],
      hints: ['These are celebrated worldwide', 'Avoid personal or costume events']
    }
  // Add more puzzles...
];
