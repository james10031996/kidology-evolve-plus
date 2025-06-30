
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Telescope, Info, Star } from 'lucide-react';

const PlanetsLesson = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);

  const planets = [
    { 
      name: 'Mercury', 
      emoji: '☿️', 
      fact: 'Closest to the Sun - very hot!', 
      color: 'bg-gray-400',
      details: 'Mercury is the smallest planet and closest to our Sun. It\'s very hot during the day but freezing cold at night!',
      distance: '58 million km from Sun',
      funFact: 'A day on Mercury is longer than its year!'
    },
    { 
      name: 'Venus', 
      emoji: '♀️', 
      fact: 'Hottest planet in our solar system', 
      color: 'bg-yellow-400',
      details: 'Venus is covered in thick clouds that trap heat, making it hotter than Mercury even though it\'s further from the Sun!',
      distance: '108 million km from Sun',
      funFact: 'Venus spins backwards compared to most planets!'
    },
    { 
      name: 'Earth', 
      emoji: '🌍', 
      fact: 'Our beautiful home planet', 
      color: 'bg-blue-400',
      details: 'Earth is the only planet we know of that has life! It has water, air, and the perfect temperature for living things.',
      distance: '150 million km from Sun',
      funFact: 'Earth is the only planet not named after a Roman god!'
    },
    { 
      name: 'Mars', 
      emoji: '♂️', 
      fact: 'The red planet with giant dust storms', 
      color: 'bg-red-400',
      details: 'Mars looks red because of iron oxide (rust) on its surface. It has the largest volcano in our solar system!',
      distance: '228 million km from Sun',
      funFact: 'Mars has two tiny moons named Phobos and Deimos!'
    },
    { 
      name: 'Jupiter', 
      emoji: '♃', 
      fact: 'Largest planet - a gas giant!', 
      color: 'bg-orange-400',
      details: 'Jupiter is so big that all the other planets could fit inside it! It has a giant red spot that\'s actually a huge storm.',
      distance: '778 million km from Sun',
      funFact: 'Jupiter has over 80 moons, including four big ones you can see with a telescope!'
    },
    { 
      name: 'Saturn', 
      emoji: '♄', 
      fact: 'Famous for its beautiful rings', 
      color: 'bg-yellow-300',
      details: 'Saturn\'s rings are made of ice and rock pieces. Saturn is so light it could float in water if there was a bathtub big enough!',
      distance: '1.4 billion km from Sun',
      funFact: 'Saturn has 82 known moons, and its largest moon Titan has lakes and rivers!'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl text-blue-700 mb-4">🪐 Journey Through Our Solar System</h2>
        <p className="font-comic text-gray-600">Explore the amazing planets in our cosmic neighborhood!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planets.map((planet, index) => (
          <Card key={planet.name} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in border-2 border-blue-200" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-center">
              <div className="text-6xl mb-4 animate-bounce">
                {planet.emoji}
              </div>
              <div className={`${planet.color} text-white font-fredoka font-bold text-xl p-3 rounded-xl mb-4 shadow-lg`}>
                {planet.name}
              </div>
              <p className="font-comic text-gray-600 text-center bg-gray-50 p-3 rounded-lg mb-4">
                {planet.fact}
              </p>

              {selectedPlanet === index && (
                <div className="bg-blue-50 p-4 rounded-xl mb-4 text-left animate-fade-in">
                  <h4 className="font-comic font-bold text-blue-700 mb-2 flex items-center">
                    <Info className="w-4 h-4 mr-2" />
                    More Details:
                  </h4>
                  <p className="font-comic text-gray-700 text-sm mb-3">{planet.details}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-comic text-gray-600 text-xs">Distance from Sun:</span>
                      <span className="font-comic font-bold text-blue-600 text-xs">{planet.distance}</span>
                    </div>
                    <div className="bg-yellow-100 p-2 rounded">
                      <p className="font-comic font-bold text-yellow-700 text-xs">🌟 Fun Fact:</p>
                      <p className="font-comic text-yellow-600 text-xs">{planet.funFact}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Button
                  onClick={() => setSelectedPlanet(selectedPlanet === index ? null : index)}
                  className="w-full gradient-blue text-white font-comic"
                >
                  <Telescope className="w-4 h-4 mr-2" />
                  {selectedPlanet === index ? 'Hide Details' : 'Explore Planet'}
                </Button>
                
                {selectedPlanet === index && (
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1 font-comic text-xs">
                      <Star className="w-3 h-3 mr-1" />
                      Quiz
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1 font-comic text-xs">
                      🚀 Visit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
        <div className="text-center">
          <h3 className="font-fredoka text-xl text-blue-700 mb-4">🌌 Solar System Fun Facts</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="font-comic text-gray-700">
                <span className="font-bold">Did you know?</span> Our solar system is about 4.6 billion years old!
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="font-comic text-gray-700">
                <span className="font-bold">Amazing fact:</span> The Sun is so big that 1.3 million Earths could fit inside it!
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PlanetsLesson;
