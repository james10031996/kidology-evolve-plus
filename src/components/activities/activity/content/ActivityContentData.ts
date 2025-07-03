
export const stories = [
  {
    id: '1',
    title: 'The Magic Forest Adventure',
    description: 'Join Luna the fairy on an exciting journey through the enchanted forest!',
    duration: '5 min',
    difficulty: 'Easy',
    rating: 4.9,
    pages: [
      {
        text: "Welcome to the magical forest where Luna the fairy lives! She's about to discover something amazing.",
        animation: "fly-around",
        backgroundColor: "from-green-100 to-emerald-100"
      },
      {
        text: "As Luna flutters through the sparkling trees, she notices numbers dancing in the air like fireflies!",
        animation: "shimmer",
        backgroundColor: "from-blue-100 to-purple-100"
      },
      {
        text: "The number 1 appears first, glowing softly. Then 2 and 3 join the magical dance around Luna.",
        animation: "twinkle",
        backgroundColor: "from-purple-100 to-pink-100"
      },
      {
        text: "Luna learns that counting can be magical when you believe in yourself and the power of numbers!",
        animation: "celebration",
        backgroundColor: "from-yellow-100 to-orange-100"
      }
    ]
  },
  {
    id: '2',
    title: 'Space Explorer Mission',
    description: 'Captain Cosmo explores the galaxy and discovers amazing planets!',
    duration: '7 min',
    difficulty: 'Medium',
    rating: 4.8,
    pages: [
      {
        text: "Captain Cosmo puts on his shiny space suit, ready for the greatest adventure in the galaxy!",
        animation: "scale-in",
        backgroundColor: "from-blue-100 to-indigo-100"
      },
      {
        text: "His rocket ship zooms past twinkling stars and colorful planets spinning in the cosmic dance.",
        animation: "shooting-star",
        backgroundColor: "from-purple-100 to-blue-100"
      }
    ]
  }
];

export const poems = [
  {
    id: '1',
    title: 'Rainbow Colors',
    description: 'A fun poem about all the beautiful colors in a rainbow',
    duration: '3 min',
    difficulty: 'Easy',
    rating: 4.7,
    pages: [
      {
        text: "Red like roses, orange like sun, Yellow like butter, green like fun!",
        animation: "twinkle",
        backgroundColor: "from-red-100 to-orange-100"
      },
      {
        text: "Blue like ocean, purple like grapes, Colors all around in different shapes!",
        animation: "shimmer",
        backgroundColor: "from-blue-100 to-purple-100"
      }
    ]
  }
];

export const activityCategories = {
  creative: [
    {
      title: 'Magic Paint Studio',
      description: 'Create beautiful digital artwork with magic brushes',
      icon: 'Brush',
      difficulty: 'Easy',
      route: '/activities/magic-paint-studio'
    },
    {
      title: 'Paper Crafts',
      description: 'Make fun crafts with paper',
      icon: 'Scissors',
      difficulty: 'Medium',
      route: '/activities/paper-crafts'
    },
    {
      title: 'Mandal Maker',
      description: 'Create beautiful symmetric patterns and peaceful mandalas!',
      icon: 'Brush',
      difficulty: 'Easy',
      action: 'Digital Drawing'
    },
    {
      title: 'Coloring Pages',
      description: 'Color amazing pictures',
      icon: 'Palette',
      difficulty: 'Easy',
      route: '/activities/coloring-pages-tool'
    }
  ],
  art: [
    {
      title: 'Music Movement',
      description: ' Sing, dance, and move to learn through music and rhythm!',
      icon: 'Sparkles',
      difficulty: 'Easy',
      route: '/activities/music-movement'
    },
    {
      title: 'Magic Paint Studio',
      description: 'Create beautiful digital artwork with magic brushes',
      icon: 'Brush',
      difficulty: 'Easy',
      route: '/activities/magic-paint-studio'
    },
    {
      title: 'Paper Crafts',
      description: 'Make fun crafts with paper',
      icon: 'Scissors',
      difficulty: 'Medium',
      route: '/activities/paper-crafts'
    },
    {
      title: 'Coloring Pages',
      description: 'Color amazing pictures',
      icon: 'Palette',
      difficulty: 'Easy',
      action: 'Coloring Pages'
    }
  ],
  science: [
    {
      title: 'Kitchen Experiments',
      description: 'Safe science experiments with household items',
      icon: 'Beaker',
      difficulty: 'Medium',
      route: '/courses/science-explorers'
    },
    {
      title: 'Nature Observer',
      description: 'Explore the natural world around you',
      icon: 'Microscope',
      difficulty: 'Easy',
      route: '/courses/nature-explorer'
    }
  ],
  music: [
    {
      title: 'Music Movement',
      description: 'Dance and move to fun music',
      icon: 'Music',
      difficulty: 'Easy',
      route: '/activities/music-movement'
    },
    {
      title: 'Music Maker',
      description: 'Create beats and rhythms',
      icon: 'Music',
      difficulty: 'Easy',
      route: '/activities/music-maker'
    },
    {
      title: 'Sing Along',
      description: 'Learn fun songs and nursery rhymes',
      icon: 'Headphones',
      difficulty: 'Easy',
      action: '🎵 Sing your favorite songs!'
    }
  ],
  math: [
    {
      title: 'Counting Fun',
      description: 'Learn to count with colorful objects',
      icon: '🔢',
      difficulty: 'Easy',
      route: '/courses/math-adventure'
    },
    {
      title: 'Shape Explorer',
      description: 'Discover different shapes around us',
      icon: '🔺',
      difficulty: 'Easy',
      route: '/courses/math-adventure'
    }
  ]
};
