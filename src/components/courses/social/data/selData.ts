
export const emotions = [
  { id: 1, name: 'Happy', emoji: '😊', color: 'bg-yellow-200', description: 'Feeling joyful and content' },
  { id: 2, name: 'Sad', emoji: '😢', color: 'bg-blue-200', description: 'Feeling down or upset' },
  { id: 3, name: 'Angry', emoji: '😡', color: 'bg-red-200', description: 'Feeling mad or frustrated' },
  { id: 4, name: 'Excited', emoji: '🤩', color: 'bg-purple-200', description: 'Feeling thrilled and energetic' },
  { id: 5, name: 'Nervous', emoji: '😰', color: 'bg-orange-200', description: 'Feeling worried or anxious' },
  { id: 6, name: 'Proud', emoji: '😌', color: 'bg-green-200', description: 'Feeling accomplished and confident' }
];

export const socialScenarios = [
  {
    id: 1,
    title: 'Playground Problem',
    description: 'Alex wants to play with the swings, but they\'re all taken. What should Alex do?',
    options: [
      { text: 'Wait patiently and ask nicely', points: 10, correct: true },
      { text: 'Push someone off a swing', points: 0, correct: false },
      { text: 'Find another fun activity', points: 8, correct: true }
    ]
  },
  {
    id: 2,
    title: 'Friend\'s Feelings',
    description: 'Sam looks sad because they dropped their lunch. How can you help?',
    options: [
      { text: 'Share your lunch with Sam', points: 10, correct: true },
      { text: 'Ignore Sam and eat your lunch', points: 0, correct: false },
      { text: 'Tell a teacher about Sam\'s problem', points: 8, correct: true }
    ]
  }
];

export const selLessons = [
  {
    id: 1,
    title: 'Emotion Detective',
    description: 'Learn to identify different emotions in yourself and others',
    icon: '🕵️',
    completed: true,
    points: 50
  },
  {
    id: 2,
    title: 'Kindness Champions',
    description: 'Practice acts of kindness and see how they make others feel',
    icon: '🌟',
    completed: false,
    points: 40
  },
  {
    id: 3,
    title: 'Problem Solvers',
    description: 'Learn healthy ways to solve conflicts with friends',
    icon: '🤝',
    completed: false,
    points: 60
  },
  {
    id: 4,
    title: 'Mindful Moments',
    description: 'Practice calming techniques and mindfulness exercises',
    icon: '🧘',
    completed: true,
    points: 30
  }
];
