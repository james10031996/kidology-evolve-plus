
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Map, Globe, Mountain, Building } from 'lucide-react';

const InteractiveMap = () => {
  const [selectedMap, setSelectedMap] = useState<'world' | 'continents' | 'terrain' | 'political'>('world');
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const continents = [
    { name: 'North America', color: '#FF6B6B', emoji: '🦅', countries: ['USA', 'Canada', 'Mexico'] },
    { name: 'South America', color: '#4ECDC4', emoji: '🦙', countries: ['Brazil', 'Argentina', 'Peru'] },
    { name: 'Europe', color: '#45B7D1', emoji: '🏰', countries: ['France', 'Germany', 'Italy'] },
    { name: 'Africa', color: '#FFA07A', emoji: '🦁', countries: ['Egypt', 'Kenya', 'Nigeria'] },
    { name: 'Asia', color: '#98D8C8', emoji: '🐼', countries: ['China', 'India', 'Japan'] },
    { name: 'Australia', color: '#F7DC6F', emoji: '🦘', countries: ['Australia'] },
    { name: 'Antarctica', color: '#AED6F1', emoji: '🐧', countries: ['Research Stations'] }
  ];

  const terrainFeatures = [
    { name: 'Himalayas', type: 'Mountain', emoji: '🏔️', location: 'Asia', height: '29,029 ft' },
    { name: 'Amazon River', type: 'River', emoji: '🌊', location: 'South America', length: '4,000 miles' },
    { name: 'Sahara Desert', type: 'Desert', emoji: '🏜️', location: 'Africa', size: '3.6M sq miles' },
    { name: 'Great Barrier Reef', type: 'Coral Reef', emoji: '🐠', location: 'Australia', length: '1,400 miles' }
  ];

  const famousPlaces = [
    { name: 'Eiffel Tower', country: 'France', emoji: '🗼', type: 'Monument' },
    { name: 'Great Wall', country: 'China', emoji: '🏯', type: 'Structure' },
    { name: 'Pyramids', country: 'Egypt', emoji: '🏜️', type: 'Ancient' },
    { name: 'Statue of Liberty', country: 'USA', emoji: '🗽', type: 'Monument' }
  ];

  const renderWorldMap = () => (
    <div className="relative w-full h-96 bg-gradient-to-b from-blue-200 to-blue-400 rounded-xl overflow-hidden">
      {/* Simple world map representation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg viewBox="0 0 800 400" className="w-full h-full">
          {/* Continents as simple shapes */}
          {continents.map((continent, index) => {
            const positions = [
              { x: 150, y: 120, width: 120, height: 80 }, // North America
              { x: 200, y: 220, width: 80, height: 120 }, // South America
              { x: 380, y: 100, width: 60, height: 80 }, // Europe
              { x: 360, y: 180, width: 100, height: 120 }, // Africa
              { x: 480, y: 80, width: 200, height: 150 }, // Asia
              { x: 600, y: 250, width: 80, height: 60 }, // Australia
              { x: 300, y: 320, width: 200, height: 40 } // Antarctica
            ];
            
            const pos = positions[index];
            
            return (
              <rect
                key={continent.name}
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                fill={continent.color}
                rx="10"
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onMouseEnter={() => setHoveredRegion(continent.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              />
            );
          })}
        </svg>
      </div>
      
      {/* Hover tooltip */}
      {hoveredRegion && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">
              {continents.find(c => c.name === hoveredRegion)?.emoji}
            </span>
            <div>
              <h5 className="font-fredoka font-bold">{hoveredRegion}</h5>
              <p className="font-comic text-xs">
                Countries: {continents.find(c => c.name === hoveredRegion)?.countries.join(', ')}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Map Type Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={() => setSelectedMap('world')}
          variant={selectedMap === 'world' ? 'default' : 'outline'}
          className="font-comic"
        >
          <Globe className="w-4 h-4 mr-2" />
          World Map
        </Button>
        <Button
          onClick={() => setSelectedMap('continents')}
          variant={selectedMap === 'continents' ? 'default' : 'outline'}
          className="font-comic"
        >
          <Map className="w-4 h-4 mr-2" />
          Continents
        </Button>
        <Button
          onClick={() => setSelectedMap('terrain')}
          variant={selectedMap === 'terrain' ? 'default' : 'outline'}
          className="font-comic"
        >
          <Mountain className="w-4 h-4 mr-2" />
          Terrain
        </Button>
        <Button
          onClick={() => setSelectedMap('political')}
          variant={selectedMap === 'political' ? 'default' : 'outline'}
          className="font-comic"
        >
          <Building className="w-4 h-4 mr-2" />
          Places
        </Button>
      </div>

      {/* Map Display */}
      <Card className="p-6 bg-white">
        {selectedMap === 'world' && (
          <div>
            <h3 className="font-fredoka text-xl font-bold text-center mb-4">🌍 Interactive World Map</h3>
            {renderWorldMap()}
            <p className="font-comic text-sm text-center mt-4 text-gray-600">
              Hover over continents to learn more!
            </p>
          </div>
        )}

        {selectedMap === 'continents' && (
          <div>
            <h3 className="font-fredoka text-xl font-bold text-center mb-4">🌎 Seven Continents</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {continents.map((continent) => (
                <div 
                  key={continent.name}
                  className="p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                  style={{ backgroundColor: continent.color + '20' }}
                >
                  <div className="text-3xl text-center mb-2">{continent.emoji}</div>
                  <h4 className="font-fredoka font-bold text-center">{continent.name}</h4>
                  <p className="font-comic text-xs text-center mt-2">
                    {continent.countries.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMap === 'terrain' && (
          <div>
            <h3 className="font-fredoka text-xl font-bold text-center mb-4">🏔️ Terrain Features</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {terrainFeatures.map((feature) => (
                <div key={feature.name} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-3xl">{feature.emoji}</span>
                    <div>
                      <h4 className="font-fredoka font-bold">{feature.name}</h4>
                      <Badge className="font-comic text-xs">{feature.type}</Badge>
                    </div>
                  </div>
                  <div className="font-comic text-sm space-y-1">
                    <p><strong>Location:</strong> {feature.location}</p>
                    <p><strong>Size:</strong> {feature.height || feature.length || feature.size}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedMap === 'political' && (
          <div>
            <h3 className="font-fredoka text-xl font-bold text-center mb-4">🏛️ Famous Places</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {famousPlaces.map((place) => (
                <div key={place.name} className="bg-yellow-50 p-4 rounded-xl shadow-md">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl">{place.emoji}</span>
                    <div>
                      <h4 className="font-fredoka font-bold">{place.name}</h4>
                      <p className="font-comic text-sm">{place.country}</p>
                      <Badge className="font-comic text-xs bg-blue-100 text-blue-800">
                        {place.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Map Legend */}
      <Card className="p-4 bg-gradient-to-r from-blue-50 to-green-50">
        <h4 className="font-fredoka font-bold text-center mb-3">🗺️ Map Reading Tips</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm font-comic">
          <div>
            <p>• <strong>Blue areas:</strong> Water (oceans, seas, rivers)</p>
            <p>• <strong>Green areas:</strong> Land with plants and forests</p>
            <p>• <strong>Brown areas:</strong> Mountains and high places</p>
          </div>
          <div>
            <p>• <strong>Yellow areas:</strong> Deserts and dry places</p>
            <p>• <strong>White areas:</strong> Snow and ice (poles)</p>
            <p>• <strong>Symbols:</strong> Show cities, mountains, rivers</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InteractiveMap;
