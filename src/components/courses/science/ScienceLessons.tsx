
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ScienceLessonsProps {
  lessonType: string;
}

const ScienceLessons = ({ lessonType }: ScienceLessonsProps) => {
  const plantLifeContent = [
    {
      title: '🌱 How Plants Grow',
      content: 'Plants need sunlight, water, and soil to grow big and strong!',
      example: 'Watch a tiny seed become a beautiful flower',
      activity: 'Plant your own seed and watch it grow every day!'
    },
    {
      title: '🌸 Parts of a Plant',
      content: 'Plants have roots, stems, leaves, and flowers - each part has a special job!',
      example: 'Roots drink water, leaves make food from sunlight',
      activity: 'Draw a plant and label all its parts'
    },
    {
      title: '🌳 Trees are Special Plants',
      content: 'Trees are the biggest plants! They give us oxygen to breathe and homes for animals.',
      example: 'A big oak tree can live for hundreds of years',
      activity: 'Hug a tree and feel how strong it is!'
    }
  ];

  const humanBodyContent = [
    {
      title: '❤️ Your Amazing Heart',
      content: 'Your heart pumps blood all around your body to keep you healthy and strong!',
      example: 'Put your hand on your chest and feel your heartbeat',
      activity: 'Count your heartbeats for 10 seconds!'
    },
    {
      title: '🧠 Your Smart Brain',
      content: 'Your brain controls everything you do - thinking, moving, and remembering!',
      example: 'When you learn something new, your brain grows stronger',
      activity: 'Try to remember 5 different animals!'
    },
    {
      title: '🦴 Strong Bones',
      content: 'Your bones hold up your body like a strong frame holds up a house!',
      example: 'You have 206 bones in your body when you grow up',
      activity: 'Feel your arm bone and see how strong it is!'
    }
  ];

  const rocksContent = [
    {
      title: '🪨 What are Rocks?',
      content: 'Rocks are hard pieces of Earth that come in many colors, shapes, and sizes!',
      example: 'Some rocks are smooth, some are rough, some sparkle in the sun',
      activity: 'Go on a rock hunt and find 3 different rocks!'
    },
    {
      title: '💎 Shiny Crystals',
      content: 'Some rocks have beautiful crystals inside that sparkle like jewels!',
      example: 'Diamonds are the hardest crystals in the world',
      activity: 'Look for shiny or colorful rocks outside'
    },
    {
      title: '🌋 Volcano Rocks',
      content: 'When volcanoes erupt, they create special rocks from hot melted rock!',
      example: 'Pumice rock is so light it can float on water',
      activity: 'Make a volcano with baking soda and vinegar!'
    }
  ];

  const waterLifeContent = [
    {
      title: '🐠 Fish Friends',
      content: 'Fish live in water and breathe through special parts called gills!',
      example: 'Goldfish can remember things for months, not just 3 seconds!',
      activity: 'Pretend to swim like different fish!'
    },
    {
      title: '🐙 Ocean Creatures',
      content: 'The ocean is full of amazing animals like octopuses, whales, and seahorses!',
      example: 'An octopus has 3 hearts and 8 arms!',
      activity: 'Draw your favorite ocean animal'
    },
    {
      title: '💧 Water Cycle',
      content: 'Water travels in a circle - from oceans to clouds to rain and back again!',
      example: 'When water gets hot, it becomes invisible water vapor',
      activity: 'Watch steam from a hot cup and see water vapor!'
    }
  ];

  const universeContent = [
    {
      title: '🌟 Twinkling Stars',
      content: 'Stars are giant balls of fire far away in space that give us light at night!',
      example: 'Our Sun is actually a star - the closest one to Earth!',
      activity: 'Count the stars you can see tonight!'
    },
    {
      title: '🌌 The Milky Way',
      content: 'Our galaxy has billions of stars and looks like spilled milk across the night sky!',
      example: 'If you could drive to the nearest star, it would take 4 million years!',
      activity: 'Look for the Milky Way on a clear, dark night'
    },
    {
      title: '🚀 Space Travel',
      content: 'Astronauts use special rockets to travel to space and explore other worlds!',
      example: 'It takes 3 days to travel from Earth to the Moon',
      activity: 'Build a rocket ship with blocks or boxes!'
    }
  ];

  const getContent = () => {
    switch (lessonType) {
      case 'plants': return plantLifeContent;
      case 'human-body': return humanBodyContent;
      case 'rocks': return rocksContent;
      case 'water-life': return waterLifeContent;
      case 'universe': return universeContent;
      default: return [];
    }
  };

  const content = getContent();

  return (
    <div className="grid md:grid-cols-1 gap-8">
      {content.map((item, index) => (
        <Card key={index} className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <h3 className="font-fredoka text-2xl font-bold text-blue-700 mb-4">
            {item.title}
          </h3>
          
          <div className="bg-white p-6 rounded-xl mb-4">
            <h4 className="font-comic font-bold text-gray-800 mb-2">🔬 What You'll Learn:</h4>
            <p className="font-comic text-gray-700 text-lg">{item.content}</p>
          </div>

          <div className="bg-yellow-100 p-6 rounded-xl mb-4">
            <h4 className="font-comic font-bold text-gray-800 mb-2">🌟 Fun Fact:</h4>
            <p className="font-comic text-gray-700">{item.example}</p>
          </div>

          <div className="bg-green-100 p-6 rounded-xl">
            <h4 className="font-comic font-bold text-gray-800 mb-2">🎯 Try This:</h4>
            <p className="font-comic text-gray-700">{item.activity}</p>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ScienceLessons;
