
export const experiments = [
  {
    id: 1,
    title: 'Rainbow in a Glass',
    description: 'Create a beautiful rainbow using different liquids layered by density.',
    category: 'Chemistry',
    difficulty: 'Easy',
    duration: '15 min',
    materials: ['Water', 'Honey', 'Dish soap', 'Food coloring', 'Glass cup', 'Spoon'],
    safetyLevel: 'Safe',
    icon: '🌈',
    steps: 4,
    completed: false,
    learningOutcome: 'Learn about density and how different liquids stack due to their weight.',
    funFact: 'The densest liquid always stays at the bottom!',
    detailedSteps: [
      {
        step: 1,
        title: 'Prepare the Base',
        instruction: 'Pour honey into the bottom of your glass cup slowly.',
        science: 'Honey has the highest density (about 1.4 g/cm³), so it will sink to the bottom.',
        tip: 'Pour slowly to avoid mixing with other layers.',
        image: '🍯'
      },
      {
        step: 2,
        title: 'Add Colored Water',
        instruction: 'Mix water with food coloring and slowly pour over a spoon onto the honey.',
        science: 'Water is less dense than honey (1.0 g/cm³) but denser than soap.',
        tip: 'Use the back of a spoon to pour gently and maintain separate layers.',
        image: '💧'
      },
      {
        step: 3,
        title: 'Soap Layer',
        instruction: 'Very slowly add dish soap as the top layer.',
        science: 'Dish soap is the least dense (about 0.9 g/cm³), creating our rainbow effect.',
        tip: 'Different soap brands may have different densities.',
        image: '🧽'
      },
      {
        step: 4,
        title: 'Observe and Learn',
        instruction: 'Watch how the liquids maintain their separate layers.',
        science: 'This demonstrates the principle of density stratification found in oceans and atmosphere.',
        tip: 'Try adding other liquids like oil or corn syrup to extend your rainbow!',
        image: '🔬'
      }
    ],
    extensions: [
      'Try different liquids like corn syrup, vegetable oil, or rubbing alcohol',
      'Measure the actual densities using a scale and measuring cup',
      'Research how density layering occurs in the ocean'
    ]
  },
  {
    id: 2,
    title: 'Volcano Eruption Laboratory',
    description: 'Build a detailed volcano model and understand geological processes.',
    category: 'Earth Science',
    difficulty: 'Medium',
    duration: '30 min',
    materials: ['Baking soda', 'Vinegar', 'Food coloring', 'Clay', 'Funnel', 'Measuring cups'],
    safetyLevel: 'Adult Help',
    icon: '🌋',
    steps: 8,
    completed: true,
    learningOutcome: 'Understand chemical reactions, volcanic formation, and geological processes.',
    funFact: 'Real volcanoes can shoot ash 20 miles high into the stratosphere!',
    detailedSteps: [
      {
        step: 1,
        title: 'Build the Volcano Structure',
        instruction: 'Shape clay around a plastic bottle to create a volcano shape.',
        science: 'Real volcanoes form when magma pushes through weak spots in Earth\'s crust.',
        tip: 'Leave the bottle opening accessible for your "magma chamber".',
        image: '⛰️'
      },
      {
        step: 2,
        title: 'Prepare the Magma Chamber',
        instruction: 'Add 3 tablespoons of baking soda to your bottle.',
        science: 'Baking soda (sodium bicarbonate) is our base reactant.',
        tip: 'Use a funnel to avoid spills.',
        image: '🧪'
      },
      {
        step: 3,
        title: 'Add Realistic Colors',
        instruction: 'Mix red and orange food coloring into vinegar.',
        science: 'Real lava temperatures range from 1000-1200°C, glowing red-orange.',
        tip: 'Add a drop of dish soap for more dramatic foaming.',
        image: '🔴'
      },
      {
        step: 4,
        title: 'The Eruption Reaction',
        instruction: 'Quickly pour the colored vinegar into the baking soda.',
        science: 'Acid + Base = Salt + Water + Carbon Dioxide (the gas that creates pressure)',
        tip: 'Step back quickly! The reaction is immediate.',
        image: '💥'
      },
      {
        step: 5,
        title: 'Observe the Flow Patterns',
        instruction: 'Watch how the "lava" flows down different sides.',
        science: 'Real lava follows the path of least resistance, creating river-like flows.',
        tip: 'Create channels in your clay to direct the flow.',
        image: '🌊'
      },
      {
        step: 6,
        title: 'Multiple Eruptions',
        instruction: 'Try different ratios of baking soda to vinegar.',
        science: 'More reactants = more gas production = more explosive eruption.',
        tip: 'Record which ratio creates the most dramatic eruption.',
        image: '📊'
      },
      {
        step: 7,
        title: 'Cool Down Analysis',
        instruction: 'Examine the "lava" residue after it stops flowing.',
        science: 'Real lava cools into different rock types depending on cooling speed.',
        tip: 'Fast cooling creates smooth obsidian, slow cooling creates rough pumice.',
        image: '🪨'
      },
      {
        step: 8,
        title: 'Geological Timeline',
        instruction: 'Discuss how volcanoes shape landscapes over millions of years.',
        science: 'Volcanic activity created many islands and mountain ranges we see today.',
        tip: 'Look up photos of Hawaiian island formation or the Ring of Fire.',
        image: '🌍'
      }
    ],
    extensions: [
      'Research famous volcanoes: Mount Vesuvius, Krakatoa, Mount St. Helens',
      'Create a timeline of major volcanic eruptions in history',
      'Build a cross-section model showing magma chambers and vents'
    ]
  },
  {
    id: 3,
    title: 'Crystal Garden Laboratory',
    description: 'Grow various types of crystals and understand molecular structures.',
    category: 'Chemistry',
    difficulty: 'Hard',
    duration: '7 days',
    materials: ['Salt', 'Sugar', 'Epsom salt', 'Water', 'String', 'Jars', 'Magnifying glass', 'Food coloring'],
    safetyLevel: 'Adult Help',
    icon: '💎',
    steps: 10,
    completed: false,
    learningOutcome: 'Understand crystallization, molecular structure, and geological processes.',
    funFact: 'The largest natural crystal ever found was 39 feet long and weighed 55 tons!',
    detailedSteps: [
      {
        step: 1,
        title: 'Understanding Crystal Structure',
        instruction: 'Learn about how atoms arrange themselves in repeating patterns.',
        science: 'Crystals form when atoms organize in regular, geometric patterns called lattices.',
        tip: 'Look at salt under a magnifying glass to see cubic structures.',
        image: '🔬'
      },
      {
        step: 2,
        title: 'Create Saturated Solutions',
        instruction: 'Heat water and dissolve as much salt/sugar/Epsom salt as possible.',
        science: 'Hot water can hold more dissolved particles than cold water.',
        tip: 'Stir until no more crystals dissolve - this is your saturation point.',
        image: '🌡️'
      },
      {
        step: 3,
        title: 'Prepare Crystal Seeds',
        instruction: 'Tie strings to pencils and dip into your solutions.',
        science: 'Seed crystals provide nucleation points where new crystals can attach.',
        tip: 'You can tie a small crystal to the string to start the process.',
        image: '🧵'
      },
      {
        step: 4,
        title: 'Set Up Growing Chambers',
        instruction: 'Place jars in a quiet location away from vibrations.',
        science: 'Disturbances can cause irregular crystal formation.',
        tip: 'Cover with cloth to prevent dust while allowing evaporation.',
        image: '🏠'
      },
      {
        step: 5,
        title: 'Daily Observations',
        instruction: 'Record crystal growth with drawings and measurements.',
        science: 'Different materials create different crystal shapes: cubic, hexagonal, prismatic.',
        tip: 'Keep a daily journal with sketches of crystal development.',
        image: '📓'
      },
      {
        step: 6,
        title: 'Compare Growth Rates',
        instruction: 'Notice which solutions grow crystals fastest.',
        science: 'Epsom salt typically grows fastest, sugar slowest but largest.',
        tip: 'Temperature affects growth rate - warmer areas grow faster.',
        image: '⏱️'
      },
      {
        step: 7,
        title: 'Color Experiments',
        instruction: 'Add food coloring to create colorful crystals.',
        science: 'Some dyes incorporate into crystal structure, others just coat the surface.',
        tip: 'Natural gemstone colors come from trace elements in the crystal lattice.',
        image: '🌈'
      },
      {
        step: 8,
        title: 'Examine Under Magnification',
        instruction: 'Use magnifying glass to study crystal faces and angles.',
        science: 'Crystal faces meet at specific angles determined by atomic arrangement.',
        tip: 'Count the sides and measure angles - they should be consistent.',
        image: '🔍'
      },
      {
        step: 9,
        title: 'Test Crystal Properties',
        instruction: 'Gently test hardness, transparency, and brittleness.',
        science: 'Crystal properties depend on how atoms are bonded together.',
        tip: 'Salt crystals taste salty because they\'re made of sodium and chlorine.',
        image: '⚡'
      },
      {
        step: 10,
        title: 'Connect to Earth Science',
        instruction: 'Discuss how natural crystals form in caves, geodes, and mineral veins.',
        science: 'Natural crystals can take thousands of years to form in underground cavities.',
        tip: 'Visit a natural history museum to see amazing crystal specimens.',
        image: '🌍'
      }
    ],
    extensions: [
      'Research birthstones and their crystal structures',
      'Create a crystal identification chart',
      'Learn about how crystals are used in technology (quartz watches, silicon chips)'
    ]
  }
];

export const scienceTopics = [
  {
    id: 1,
    title: 'Weather & Climate Mastery',
    description: 'Deep dive into meteorology, climate patterns, and atmospheric science.',
    icon: '🌦️',
    activities: 15,
    completed: 5,
    keyConcepts: ['Atmospheric Pressure', 'Water Cycle', 'Climate Zones', 'Weather Prediction'],
    funFact: 'Lightning bolts can reach temperatures of 30,000°C - 5 times hotter than the sun\'s surface!',
    lessons: [
      {
        id: 1,
        title: 'The Incredible Water Cycle',
        duration: '20 min',
        concepts: ['Evaporation', 'Condensation', 'Precipitation', 'Collection'],
        activities: [
          'Build a terrarium to observe the water cycle',
          'Create cloud formations in a jar',
          'Track precipitation patterns in your area'
        ],
        experiments: [
          'Evaporation race: different liquids in sunlight',
          'Make a rain gauge and measure daily rainfall',
          'Create dew on a cold glass'
        ],
        realWorldConnections: [
          'How do weather forecasters predict rain?',
          'Why do some places have more rain than others?',
          'How does the water cycle affect plant growth?'
        ]
      },
      {
        id: 2,
        title: 'Atmospheric Pressure Adventures',
        duration: '25 min',
        concepts: ['Air pressure', 'Barometric changes', 'Altitude effects', 'Weather systems'],
        activities: [
          'Build a simple barometer',
          'Demonstrate air pressure with suction cups',
          'Explore how altitude affects air pressure'
        ],
        experiments: [
          'Crushing can with air pressure',
          'Making a balloon grow in a vacuum',
          'Measuring pressure changes during weather fronts'
        ],
        realWorldConnections: [
          'Why do your ears pop in airplanes?',
          'How do weather systems move across the country?',
          'Why is it harder to breathe on tall mountains?'
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Animal Kingdom Exploration',
    description: 'Comprehensive study of animal adaptations, behaviors, and ecosystems.',
    icon: '🦁',
    activities: 20,
    completed: 12,
    keyConcepts: ['Evolution', 'Adaptation', 'Food Webs', 'Migration', 'Communication'],
    funFact: 'Octopuses have three hearts and blue blood!',
    lessons: [
      {
        id: 1,
        title: 'Amazing Animal Adaptations',
        duration: '30 min',
        concepts: ['Physical adaptations', 'Behavioral adaptations', 'Environmental pressures', 'Survival strategies'],
        activities: [
          'Design your own adapted animal for different environments',
          'Animal adaptation matching game',
          'Create a field guide of local wildlife adaptations'
        ],
        experiments: [
          'Test camouflage effectiveness with different patterns',
          'Explore bird beak shapes and their functions',
          'Investigate animal insulation with different materials'
        ],
        realWorldConnections: [
          'How are animals adapting to climate change?',
          'Why do animals in the Arctic look different from tropical animals?',
          'How do zoos help protect endangered species?'
        ]
      },
      {
        id: 2,
        title: 'Ecosystem Food Web Dynamics',
        duration: '35 min',
        concepts: ['Producers', 'Primary consumers', 'Secondary consumers', 'Decomposers', 'Energy flow'],
        activities: [
          'Build a 3D food web model',
          'Role-play different animals in an ecosystem',
          'Track energy flow through different trophic levels'
        ],
        experiments: [
          'Set up a decomposition observation station',
          'Create a mini-ecosystem in a bottle',
          'Investigate what happens when one species is removed'
        ],
        realWorldConnections: [
          'What happens when wolves are reintroduced to Yellowstone?',
          'How does overfishing affect ocean ecosystems?',
          'Why are bees so important to our food supply?'
        ]
      }
    ]
  }
];