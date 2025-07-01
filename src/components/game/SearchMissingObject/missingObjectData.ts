type SceneObject = {
  id: string;
  name: string;
  emoji: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isMissing: boolean;
  correctSlot?: { x: number; y: number; width: number; height: number };
  hint?: string;
  sound?: string;
};

type Scene = {
  id: string;
  name: string;
  background: string;
  description: string;
  objects: SceneObject[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit?: number;
  backgroundMusic?: string;
};

  export const scenes: Scene[] = [
    {
      id: 'bedroom',
      name: '🛏️ Cozy Bedroom',
      background: 'bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100',
      description: 'Help organize Emma\'s messy bedroom! Find all the missing objects.',
      difficulty: 'Easy',
      objects: [
        {
          id: 'bed',
          name: 'Bed',
          emoji: '🛏️',
          x: 50,
          y: 200,
          width: 160,
          height: 80,
          isMissing: false
        },
        {
          id: 'pillow',
          name: 'Pillow',
          emoji: '🛋️',
          x: 400,
          y: 50,
          width: 50,
          height: 40,
          isMissing: true,
          correctSlot: { x: 70, y: 210, width: 50, height: 40 },
          hint: 'Something soft for your head',
          sound: 'pillow-fluff'
        },
        {
          id: 'lamp',
          name: 'Bedside Lamp',
          emoji: '🛋️',
          x: 240,
          y: 200,
          width: 40,
          height: 60,
          isMissing: false
        },
        {
          id: 'book',
          name: 'Storybook',
          emoji: '📖',
          x: 450,
          y: 300,
          width: 40,
          height: 30,
          isMissing: true,
          correctSlot: { x: 250, y: 220, width: 40, height: 30 },
          hint: 'Contains magical stories',
          sound: 'page-turn'
        },
        {
          id: 'clock',
          name: 'Alarm Clock',
          emoji: '⏰',
          x: 350,
          y: 280,
          width: 45,
          height: 45,
          isMissing: true,
          correctSlot: { x: 290, y: 200, width: 45, height: 45 },
          hint: 'Tells you what time it is',
          sound: 'tick-tock'
        },
        {
          id: 'teddy',
          name: 'Teddy Bear',
          emoji: '🧸',
          x: 380,
          y: 120,
          width: 50,
          height: 60,
          isMissing: true,
          correctSlot: { x: 150, y: 220, width: 50, height: 60 },
          hint: 'Cuddly friend for bedtime',
          sound: 'soft-squeak'
        },
        {
          id: 'shoes',
          name: 'Slippers',
          emoji: '🥿',
          x: 320,
          y: 350,
          width: 60,
          height: 30,
          isMissing: true,
          correctSlot: { x: 80, y: 300, width: 60, height: 30 },
          hint: 'Keeps your feet warm',
          sound: 'soft-step'
        }
      ]
    },
    {
      id: 'kitchen',
      name: '🍳 Busy Kitchen',
      background: 'bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100',
      description: 'Chef Mario\'s kitchen is chaotic! Put everything back where it belongs.',
      difficulty: 'Medium',
      timeLimit: 120,
      objects: [
        {
          id: 'stove',
          name: 'Stove',
          emoji: '🔥',
          x: 60,
          y: 220,
          width: 100,
          height: 80,
          isMissing: false
        },
        {
          id: 'pot',
          name: 'Cooking Pot',
          emoji: '🍲',
          x: 400,
          y: 80,
          width: 60,
          height: 60,
          isMissing: true,
          correctSlot: { x: 80, y: 230, width: 60, height: 60 },
          hint: 'Used for cooking soup',
          sound: 'pot-clang'
        },
        {
          id: 'refrigerator',
          name: 'Refrigerator',
          emoji: '🧊',
          x: 200,
          y: 160,
          width: 80,
          height: 120,
          isMissing: false
        },
        {
          id: 'apple',
          name: 'Fresh Apple',
          emoji: '🍎',
          x: 420,
          y: 280,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 220, y: 180, width: 35, height: 35 },
          hint: 'A healthy red fruit',
          sound: 'crunch'
        },
        {
          id: 'cup',
          name: 'Coffee Mug',
          emoji: '☕',
          x: 360,
          y: 180,
          width: 40,
          height: 50,
          isMissing: true,
          correctSlot: { x: 300, y: 120, width: 40, height: 50 },
          hint: 'Contains a warm drink',
          sound: 'ceramic-clink'
        },
        {
          id: 'spatula',
          name: 'Spatula',
          emoji: '🥄',
          x: 450,
          y: 200,
          width: 30,
          height: 80,
          isMissing: true,
          correctSlot: { x: 350, y: 120, width: 30, height: 80 },
          hint: 'Tool for flipping food',
          sound: 'metal-tap'
        },
        {
          id: 'bread',
          name: 'Bread Loaf',
          emoji: '🍞',
          x: 380,
          y: 320,
          width: 50,
          height: 30,
          isMissing: true,
          correctSlot: { x: 350, y: 120, width: 50, height: 30 },
          hint: 'Goes in the toaster',
          sound: 'bread-squish'
        }
      ]
    },
    {
      id: 'playground',
      name: '🏞️ Fun Playground',
      background: 'bg-gradient-to-br from-green-100 via-blue-100 to-purple-100',
      description: 'The playground is messy after recess! Help put toys back in place.',
      difficulty: 'Easy',
      objects: [
        {
          id: 'swing',
          name: 'Swing Set',
          emoji: '🏗️',
          x: 80,
          y: 120,
          width: 100,
          height: 120,
          isMissing: false
        },
        {
          id: 'ball',
          name: 'Soccer Ball',
          emoji: '⚽',
          x: 400,
          y: 100,
          width: 50,
          height: 50,
          isMissing: true,
          correctSlot: { x: 200, y: 280, width: 50, height: 50 },
          hint: 'Round and used for kicking',
          sound: 'ball-bounce'
        },
        {
          id: 'slide',
          name: 'Slide',
          emoji: '🛝',
          x: 200,
          y: 180,
          width: 120,
          height: 100,
          isMissing: false
        },
        {
          id: 'kite',
          name: 'Colorful Kite',
          emoji: '🪁',
          x: 450,
          y: 200,
          width: 60,
          height: 70,
          isMissing: true,
          correctSlot: { x: 100, y: 60, width: 60, height: 70 },
          hint: 'Flies high in the sky',
          sound: 'wind-whoosh'
        },
        {
          id: 'bucket',
          name: 'Sand Bucket',
          emoji: '🪣',
          x: 350,
          y: 320,
          width: 40,
          height: 40,
          isMissing: true,
          correctSlot: { x: 280, y: 300, width: 40, height: 40 },
          hint: 'Used for building sandcastles',
          sound: 'sand-pour'
        },
        {
          id: 'frisbee',
          name: 'Flying Frisbee',
          emoji: '🥏',
          x: 420,
          y: 250,
          width: 45,
          height: 45,
          isMissing: true,
          correctSlot: { x: 150, y: 300, width: 45, height: 45 },
          hint: 'Spins through the air',
          sound: 'frisbee-whoosh'
        }
      ]
    },
    {
      id: 'classroom',
      name: '📚 School Classroom',
      background: 'bg-gradient-to-br from-blue-100 via-green-100 to-yellow-100',
      description: 'After art class, everything is scattered! Help organize the classroom.',
      difficulty: 'Medium',
      objects: [
        {
          id: 'desk',
          name: 'Teacher Desk',
          emoji: '🏫',
          x: 200,
          y: 200,
          width: 120,
          height: 80,
          isMissing: false
        },
        {
          id: 'pencil',
          name: 'Pencil',
          emoji: '✏️',
          x: 400,
          y: 120,
          width: 30,
          height: 8,
          isMissing: true,
          correctSlot: { x: 220, y: 220, width: 30, height: 8 },
          hint: 'Used for writing',
          sound: 'pencil-scratch'
        },
        {
          id: 'globe',
          name: 'World Globe',
          emoji: '🌍',
          x: 350,
          y: 280,
          width: 50,
          height: 50,
          isMissing: true,
          correctSlot: { x: 270, y: 200, width: 50, height: 50 },
          hint: 'Shows all countries',
          sound: 'globe-spin'
        },
        {
          id: 'backpack',
          name: 'School Backpack',
          emoji: '🎒',
          x: 450,
          y: 300,
          width: 60,
          height: 80,
          isMissing: true,
          correctSlot: { x: 80, y: 250, width: 60, height: 80 },
          hint: 'Carries school supplies',
          sound: 'zipper-close'
        },
        {
          id: 'calculator',
          name: 'Calculator',
          emoji: '🔢',
          x: 380,
          y: 200,
          width: 40,
          height: 50,
          isMissing: true,
          correctSlot: { x: 240, y: 230, width: 40, height: 50 },
          hint: 'Helps with math problems',
          sound: 'button-beep'
        }
      ]
    },
    {
      id: 'garden',
      name: '🌻 Beautiful Garden',
      background: 'bg-gradient-to-br from-green-100 via-yellow-100 to-pink-100',
      description: 'The garden needs tending! Put all the gardening tools back in place.',
      difficulty: 'Hard',
      timeLimit: 150,
      objects: [
        {
          id: 'tree',
          name: 'Oak Tree',
          emoji: '🌳',
          x: 100,
          y: 80,
          width: 100,
          height: 120,
          isMissing: false
        },
        {
          id: 'watering-can',
          name: 'Watering Can',
          emoji: '🚿',
          x: 400,
          y: 160,
          width: 50,
          height: 60,
          isMissing: true,
          correctSlot: { x: 300, y: 280, width: 50, height: 60 },
          hint: 'Waters the plants',
          sound: 'water-splash'
        },
        {
          id: 'flower',
          name: 'Sunflower',
          emoji: '🌻',
          x: 350,
          y: 100,
          width: 40,
          height: 80,
          isMissing: true,
          correctSlot: { x: 250, y: 200, width: 40, height: 80 },
          hint: 'Follows the sun',
          sound: 'nature-chirp'
        },
        {
          id: 'shovel',
          name: 'Garden Shovel',
          emoji: '🌿',
          x: 450,
          y: 250,
          width: 30,
          height: 100,
          isMissing: true,
          correctSlot: { x: 350, y: 250, width: 30, height: 100 },
          hint: 'Digs holes in soil',
          sound: 'dirt-dig'
        },
        {
          id: 'butterfly',
          name: 'Butterfly',
          emoji: '🦋',
          x: 380,
          y: 80,
          width: 35,
          height: 35,
          isMissing: true,
          correctSlot: { x: 150, y: 100, width: 35, height: 35 },
          hint: 'Beautiful flying insect',
          sound: 'flutter-wings'
        },
        {
          id: 'seeds',
          name: 'Flower Seeds',
          emoji: '🌱',
          x: 420,
          y: 320,
          width: 30,
          height: 30,
          isMissing: true,
          correctSlot: { x: 200, y: 300, width: 30, height: 30 },
          hint: 'Grows into plants',
          sound: 'seed-rattle'
        }
      ]
    }
  ];