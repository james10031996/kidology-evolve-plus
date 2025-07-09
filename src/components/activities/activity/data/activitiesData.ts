
export const activitiesData = {
  quizes: [
    {
      id: 'geography-quiz-adventure',
      title: 'Geography Quiz Adventure',
      description: 'Explore world landmarks and race against time!⏳✨',
      category: 'Geography',
      difficulty: 2,
      duration: '5 min',
      bestScore: 850,
      playCount: 1200,
      gradient: 'gradient-blue',
      stars: 15,
      route: '/quizes/geography-quiz-adventure'
    },
    {
      id: 'letter-safari',
      title: 'Letter Safari',
      description: 'Find letters hiding in the jungle adventure!',
      category: 'English',
      difficulty: 1,
      duration: '7 min',
      bestScore: 650,
      playCount: 800,
      gradient: 'gradient-green',
      stars: 12
    },
    {
      id: 'memory-palace',
      title: 'Memory Palace',
      description: 'Train your brain with colorful memory challenges!',
      category: 'Memory',
      difficulty: 3,
      duration: '6 min',
      playCount: 450,
      gradient: 'gradient-purple',
      stars: 20
    },
    {
      id: 'shape-sorter',
      title: 'Shape Sorter',
      description: 'Sort shapes and learn geometry fundamentals!',
      category: 'Logic',
      difficulty: 2,
      duration: '4 min',
      bestScore: 720,
      playCount: 950,
      gradient: 'gradient-pink',
      stars: 10
    }
  ],
  stories: [
    {
      id: 'magic-forest',
      title: 'The Magic Forest Adventure',
      description: 'Join Luna the fairy through the enchanted forest!',
      difficulty: 'Easy',
      duration: '5 min',
      rating: 4.9,
      category: 'Fantasy',
      isNew: true,
      stars: 25,
      route: '/activities/number-bubble-pop'
    },
    {
      id: 'space-explorer',
      title: 'Space Explorer Mission',
      description: 'Blast off with Captain Cosmo to explore space!',
      difficulty: 'Medium',
      duration: '7 min',
      rating: 4.8,
      category: 'Science',
      stars: 30,
      route: '/activities/number-bubble-pop'
    },
    {
      id: 'underwater-treasure',
      title: 'Underwater Treasure Hunt',
      description: 'Dive deep with Finny to discover ocean mysteries!',
      difficulty: 'Easy',
      duration: '6 min',
      rating: 4.7,
      category: 'Adventure',
      stars: 20,
      route: '/activities/number-bubble-pop'
    }
  ],
  creative: [
    {
      id: 'magic-paint-studio',
      title: 'Magic Paint Studio',
      description: 'Create beautiful artworks with magical brushes!',
      category: 'Art',
      difficulty: 1,
      duration: '15 min',
      tools: ['Brushes', 'Colors', 'Stickers'],
      gradient: 'gradient-pink',
      stars: 35,
      route: '/activities/magic-paint-studio'
    },
    {
      id: 'music-maker',
      title: 'Music Maker',
      description: 'Compose melodies and learn about rhythm!',
      category: 'Music',
      difficulty: 2,
      duration: '12 min',
      tools: ['Piano', 'Drums', 'Recorder'],
      gradient: 'gradient-purple',
      stars: 30,
      route: '/activities/music-movement'
    },
    {
      id: 'creative-arts',
      title: 'Creative Arts',
      description: 'Create your own interactive stories!',
      category: 'Writing',
      difficulty: 3,
      duration: '20 min',
      tools: ['Characters', 'Backgrounds', 'Text'],
      gradient: 'gradient-blue',
      stars: 40,
      route: '/activities/creative-arts'
    }
  ]
};
