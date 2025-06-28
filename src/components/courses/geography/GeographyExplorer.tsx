
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Globe, MapPin, Compass, Mountain, Waves, TreePine } from 'lucide-react';

const GeographyExplorer = () => {
  const [currentCountry, setCurrentCountry] = useState(0);
  const [visitedPlaces, setVisitedPlaces] = useState([]);

  const countries = [
    {
      id: 1,
      name: 'Egypt',
      capital: 'Cairo',
      continent: 'Africa',
      flag: '🇪🇬',
      landmark: 'Pyramids of Giza',
      language: 'Arabic',
      funFact: 'Home to the longest river in the world - the Nile!',
      climate: 'Desert',
      population: '104 million'
    },
    {
      id: 2,
      name: 'Japan',
      capital: 'Tokyo',
      continent: 'Asia',
      flag: '🇯🇵',
      landmark: 'Mount Fuji',
      language: 'Japanese',
      funFact: 'Has over 6,800 islands!',
      climate: 'Temperate',
      population: '125 million'
    },
    {
      id: 3,
      name: 'Brazil',
      capital: 'Brasília',
      continent: 'South America',
      flag: '🇧🇷',
      landmark: 'Christ the Redeemer',
      language: 'Portuguese',
      funFact: 'Home to the Amazon rainforest!',
      climate: 'Tropical',
      population: '215 million'
    },
    {
      id: 4,
      name: 'Australia',
      capital: 'Canberra',
      continent: 'Oceania',
      flag: '🇦🇺',
      landmark: 'Sydney Opera House',
      language: 'English',
      funFact: 'The only country that is also a continent!',
      climate: 'Varies',
      population: '26 million'
    }
  ];

  const geographyTopics = [
    {
      id: 1,
      title: 'Continents & Oceans',
      description: 'Discover the 7 continents and 5 oceans',
      icon: '🌍',
      progress: 60,
      activities: 8
    },
    {
      id: 2,
      title: 'Weather & Climate',
      description: 'Learn about different weather patterns',
      icon: '🌤️',
      progress: 40,
      activities: 6
    },
    {
      id: 3,
      title: 'Landforms',
      description: 'Explore mountains, valleys, and plains',
      icon: '🏔️',
      progress: 75,
      activities: 10
    },
    {
      id: 4,
      title: 'World Cultures',
      description: 'Meet people from around the world',
      icon: '🎭',
      progress: 30,
      activities: 12
    }
  ];

  const explorationGames = [
    {
      id: 1,
      title: 'Flag Match',
      description: 'Match flags to their countries',
      icon: '🏁',
      difficulty: 'Easy',
      type: 'Memory'
    },
    {
      id: 2,
      title: 'Capital Quiz',
      description: 'Test your knowledge of world capitals',
      icon: '🏛️',
      difficulty: 'Medium',
      type: 'Quiz'
    },
    {
      id: 3,
      title: 'Landmark Hunt',
      description: 'Find famous landmarks on the map',
      icon: '🗼',
      difficulty: 'Medium',
      type: 'Adventure'
    },
    {
      id: 4,
      title: 'Culture Explorer',
      description: 'Learn about traditions around the world',
      icon: '🎨',
      difficulty: 'Easy',
      type: 'Learning'
    }
  ];

  const visitCountry = () => {
    const country = countries[currentCountry];
    if (!visitedPlaces.includes(country.id)) {
      setVisitedPlaces([...visitedPlaces, country.id]);
    }
  };

  const nextCountry = () => {
    setCurrentCountry((currentCountry + 1) % countries.length);
  };

  const getClimateIcon = (climate) => {
    switch(climate) {
      case 'Desert': return '🏜️';
      case 'Tropical': return '🌴';
      case 'Temperate': return '🌸';
      case 'Varies': return '🌈';
      default: return '🌍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Geography Header */}
      <Card className="p-6 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-blue rounded-full mx-auto mb-3 flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            🌍 Geography Explorer
          </h2>
          <p className="font-comic text-gray-600">
            Discover amazing places and learn about our wonderful world!
          </p>
        </div>

        {/* Travel Stats */}
        <div className="flex justify-center space-x-6 mt-6">
          <div className="text-center">
            <div className="font-fredoka text-2xl text-blue-600">{visitedPlaces.length}</div>
            <div className="font-comic text-xs text-gray-600">Countries Visited</div>
          </div>
          <div className="text-center">
            <div className="font-fredoka text-2xl text-green-500">{countries.length}</div>
            <div className="font-comic text-xs text-gray-600">Total Countries</div>
          </div>
          <div className="text-center">
            <div className="font-fredoka text-2xl text-orange-500">7</div>
            <div className="font-comic text-xs text-gray-600">Continents</div>
          </div>
        </div>
      </Card>

      {/* Country Explorer */}
      <Card className="p-6 bg-white rounded-2xl border-0 shadow-lg">
        <div className="text-center mb-6">
          <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
            🗺️ Virtual Travel
          </h3>

          <div className="bg-gradient-to-r from-blue-100 to-green-100 rounded-xl p-6">
            <div className="text-6xl mb-4">{countries[currentCountry].flag}</div>
            <h4 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
              {countries[currentCountry].name}
            </h4>
            <p className="font-comic text-gray-600 mb-4">
              Capital: {countries[currentCountry].capital}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-white rounded-lg p-3">
                <div className="font-comic font-bold text-gray-700">Continent</div>
                <div className="font-comic text-gray-600">{countries[currentCountry].continent}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-comic font-bold text-gray-700">Language</div>
                <div className="font-comic text-gray-600">{countries[currentCountry].language}</div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-comic font-bold text-gray-700">Climate</div>
                <div className="flex items-center space-x-1">
                  <span>{getClimateIcon(countries[currentCountry].climate)}</span>
                  <span className="font-comic text-gray-600">{countries[currentCountry].climate}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-3">
                <div className="font-comic font-bold text-gray-700">Population</div>
                <div className="font-comic text-gray-600">{countries[currentCountry].population}</div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-lg p-3 mb-4">
              <div className="font-comic font-bold text-sm text-gray-700 mb-1">Fun Fact:</div>
              <div className="font-comic text-sm text-gray-600">{countries[currentCountry].funFact}</div>
            </div>

            <div className="bg-purple-50 rounded-lg p-3 mb-4">
              <div className="font-comic font-bold text-sm text-gray-700 mb-1">Famous Landmark:</div>
              <div className="font-comic text-sm text-gray-600">{countries[currentCountry].landmark}</div>
            </div>

            <div className="flex space-x-3 justify-center">
              <Button
                onClick={visitCountry}
                className="gradient-green text-white font-comic font-bold rounded-full"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Visit Country
              </Button>
              <Button
                onClick={nextCountry}
                variant="outline"
                className="font-comic rounded-full"
              >
                Next Country →
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Geography Topics */}
      <div className="grid md:grid-cols-2 gap-6">
        {geographyTopics.map((topic) => (
          <Card key={topic.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{topic.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{topic.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {topic.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="font-comic text-sm text-gray-700">Progress</span>
                <span className="font-comic text-sm font-bold">{topic.progress}%</span>
              </div>
              <Progress value={topic.progress} className="h-2" />
              <div className="text-center">
                <span className="font-comic text-xs text-gray-500">{topic.activities} activities</span>
              </div>
            </div>

            <Button className="w-full gradient-blue text-white font-comic font-bold rounded-full">
              Explore Topic
            </Button>
          </Card>
        ))}
      </div>

      {/* Geography Games */}
      <div className="grid md:grid-cols-2 gap-6">
        {explorationGames.map((game) => (
          <Card key={game.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-3">
              <div className="text-3xl mb-2">{game.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{game.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {game.description}
            </p>

            <div className="flex items-center justify-between mb-4">
              <Badge className={`font-comic text-xs ${
                game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {game.difficulty}
              </Badge>
              <Badge variant="outline" className="font-comic text-xs">
                {game.type}
              </Badge>
            </div>

            <Button className="w-full gradient-orange text-white font-comic font-bold rounded-full">
              Play Game
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GeographyExplorer;
