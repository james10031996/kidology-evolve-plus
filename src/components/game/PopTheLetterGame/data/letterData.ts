
export interface LetterItem {
  emoji: string;
  name: string;
  fullName: string;
  information: string;
  category: string;
  habitat?: string;
}

export const letterDatabase: { [key: string]: LetterItem[] } = {
  'A': [
    {
      emoji: '🍎',
      name: 'Apple',
      fullName: 'Red Apple',
      information: 'A delicious and nutritious fruit that grows on apple trees. Apples are rich in fiber and vitamins.',
      category: 'Fruit'
    },
    {
      emoji: '🚑',
      name: 'Ambulance',
      fullName: 'Emergency Ambulance',
      information: 'A special vehicle used to transport sick or injured people to the hospital quickly and safely.',
      category: 'Vehicle'
    },
    {
      emoji: '🐜',
      name: 'Ant',
      fullName: 'Worker Ant',
      information: 'Small insects that live in colonies and work together. They are very strong and can carry objects many times their weight.',
      category: 'Insect',
      habitat: 'Underground colonies, forests, gardens'
    }
  ],
  'B': [
    {
      emoji: '🎈',
      name: 'Balloon',
      fullName: 'Party Balloon',
      information: 'A colorful inflatable object used for celebrations and parties. Balloons can float when filled with helium.',
      category: 'Toy'
    },
    {
      emoji: '🐻',
      name: 'Bear',
      fullName: 'Brown Bear',
      information: 'Large, powerful mammals with thick fur. Bears are omnivores and excellent swimmers and climbers.',
      category: 'Animal',
      habitat: 'Forests, mountains, some Arctic regions'
    },
    {
      emoji: '🌉',
      name: 'Bridge',
      fullName: 'Suspension Bridge',
      information: 'A structure built to span physical obstacles like rivers or valleys, allowing people and vehicles to cross.',
      category: 'Structure'
    }
  ],
  'C': [
    {
      emoji: '🐱',
      name: 'Cat',
      fullName: 'Domestic Cat',
      information: 'Friendly pets known for their independence and hunting skills. Cats have excellent night vision and hearing.',
      category: 'Animal',
      habitat: 'Homes, neighborhoods, some wild areas'
    },
    {
      emoji: '🎂',
      name: 'Cake',
      fullName: 'Birthday Cake',
      information: 'A sweet dessert often served at celebrations. Cakes can be decorated with frosting and candles.',
      category: 'Food'
    },
    {
      emoji: '🚗',
      name: 'Car',
      fullName: 'Automobile',
      information: 'A wheeled vehicle used for transportation. Cars have engines and can travel on roads at various speeds.',
      category: 'Vehicle'
    }
  ],
  'D': [
    {
      emoji: '🐶',
      name: 'Dog',
      fullName: 'Friendly Dog',
      information: 'Loyal companions known as "man\'s best friend." Dogs have amazing senses of smell and hearing.',
      category: 'Animal',
      habitat: 'Homes, parks, various environments with humans'
    },
    {
      emoji: '🦆',
      name: 'Duck',
      fullName: 'Mallard Duck',
      information: 'Waterfowl with webbed feet perfect for swimming. Ducks can fly, swim, and walk on land.',
      category: 'Bird',
      habitat: 'Ponds, lakes, rivers, wetlands'
    },
    {
      emoji: '🌸',
      name: 'Daisy',
      fullName: 'White Daisy',
      information: 'A beautiful flower with white petals and a yellow center. Daisies symbolize innocence and purity.',
      category: 'Flower'
    }
  ],
  'E': [
    {
      emoji: '🐘',
      name: 'Elephant',
      fullName: 'African Elephant',
      information: 'The largest land animals with long trunks and big ears. Elephants are very intelligent and have excellent memories.',
      category: 'Animal',
      habitat: 'African savannas, forests, Asian jungles'
    },
    {
      emoji: '🥚',
      name: 'Egg',
      fullName: 'Chicken Egg',
      information: 'A nutritious food that comes from chickens. Eggs can be cooked in many different ways.',
      category: 'Food'
    },
    {
      emoji: '👁️',
      name: 'Eye',
      fullName: 'Human Eye',
      information: 'The organ of sight that allows us to see the world around us. Eyes can see millions of colors.',
      category: 'Body Part'
    }
  ],
  'F': [
    {
      emoji: '🐟',
      name: 'Fish',
      fullName: 'Tropical Fish',
      information: 'Aquatic animals that breathe through gills and swim using fins. Fish come in many colors and sizes.',
      category: 'Animal',
      habitat: 'Oceans, rivers, lakes, aquariums'
    },
    {
      emoji: '🌺',
      name: 'Flower',
      fullName: 'Hibiscus Flower',
      information: 'The colorful part of plants that often smells sweet. Flowers help plants reproduce and attract bees.',
      category: 'Plant'
    },
    {
      emoji: '🔥',
      name: 'Fire',
      fullName: 'Campfire',
      information: 'A hot, bright phenomenon that produces heat and light. Fire has helped humans cook food and stay warm.',
      category: 'Element'
    }
  ]
};

// Add more letters as needed
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
