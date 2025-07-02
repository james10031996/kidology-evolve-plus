
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Compass, Navigation, Map } from 'lucide-react';

const CompassLesson = () => {
  const [rotation, setRotation] = useState(0);
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);

  const directions = [
    { name: 'North', angle: 0, emoji: '⬆️', color: 'text-red-500', description: 'Top of the world, cold places like Arctic' },
    { name: 'Northeast', angle: 45, emoji: '↗️', color: 'text-orange-500', description: 'Between North and East' },
    { name: 'East', angle: 90, emoji: '➡️', color: 'text-yellow-500', description: 'Where the sun rises' },
    { name: 'Southeast', angle: 135, emoji: '↘️', color: 'text-green-500', description: 'Between South and East' },
    { name: 'South', angle: 180, emoji: '⬇️', color: 'text-blue-500', description: 'Bottom of the world, warm places' },
    { name: 'Southwest', angle: 225, emoji: '↙️', color: 'text-indigo-500', description: 'Between South and West' },
    { name: 'West', angle: 270, emoji: '⬅️', color: 'text-purple-500', description: 'Where the sun sets' },
    { name: 'Northwest', angle: 315, emoji: '↖️', color: 'text-pink-500', description: 'Between North and West' }
  ];

  const getCurrentDirection = () => {
    const normalizedAngle = ((rotation % 360) + 360) % 360;
    const closest = directions.reduce((prev, curr) => {
      const prevDiff = Math.abs(prev.angle - normalizedAngle);
      const currDiff = Math.abs(curr.angle - normalizedAngle);
      return currDiff < prevDiff ? curr : prev;
    });
    return closest;
  };

  const currentDirection = getCurrentDirection();

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-gradient-to-br from-blue-50 to-green-50">
        <h3 className="font-fredoka text-2xl font-bold text-center mb-6">🧭 Interactive Compass</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Compass */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-64 h-64">
              {/* Compass Base */}
              <div className="absolute inset-0 bg-white border-8 border-gray-300 rounded-full shadow-2xl">
                {/* Direction markers */}
                {directions.map((dir) => {
                  const x = 50 + 40 * Math.cos((dir.angle - 90) * Math.PI / 180);
                  const y = 50 + 40 * Math.sin((dir.angle - 90) * Math.PI / 180);
                  
                  return (
                    <div
                      key={dir.name}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => {
                        setRotation(dir.angle);
                        setSelectedDirection(dir.name);
                      }}
                    >
                      <div className={`text-2xl ${dir.color} hover:scale-125 transition-transform`}>
                        {dir.emoji}
                      </div>
                      <div className="text-xs font-comic font-bold text-center mt-1">
                        {dir.name}
                      </div>
                    </div>
                  );
                })}
                
                {/* Compass Needle */}
                <div 
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-500"
                  style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
                >
                  <div className="w-1 h-20 bg-gradient-to-t from-gray-600 to-red-500 rounded-full shadow-lg"></div>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-500 rounded-full"></div>
                </div>
                
                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gray-800 rounded-full"></div>
              </div>
            </div>
            
            <div className="text-center">
              <Badge className="bg-blue-100 text-blue-800 font-comic text-lg px-4 py-2">
                Pointing: {currentDirection.name} {currentDirection.emoji}
              </Badge>
            </div>
          </div>

          {/* Direction Info */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h4 className="font-fredoka font-bold text-blue-700 mb-3">🧭 How to Use a Compass</h4>
              <ul className="font-comic text-sm space-y-2">
                <li>• The red end always points North</li>
                <li>• Use it to find your direction</li>
                <li>• Sailors and explorers use compasses</li>
                <li>• Click the direction buttons to rotate!</li>
              </ul>
            </div>

            {selectedDirection && (
              <div className="bg-yellow-50 p-4 rounded-xl shadow-md animate-fade-in">
                <h4 className="font-fredoka font-bold text-yellow-700 mb-2">
                  📍 {selectedDirection} Direction
                </h4>
                <p className="font-comic text-sm">
                  {directions.find(d => d.name === selectedDirection)?.description}
                </p>
              </div>
            )}

            <div className="bg-green-50 p-4 rounded-xl shadow-md">
              <h4 className="font-fredoka font-bold text-green-700 mb-3">🌍 Direction Facts</h4>
              <div className="space-y-2 text-sm font-comic">
                <p>🌅 <strong>East:</strong> Sun rises here every morning</p>
                <p>🌇 <strong>West:</strong> Sun sets here every evening</p>
                <p>❄️ <strong>North:</strong> Colder regions, North Pole</p>
                <p>🌞 <strong>South:</strong> Warmer regions, South Pole</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Direction Practice */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <h4 className="font-fredoka font-bold text-xl text-center mb-4">🎯 Direction Practice</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {directions.map((dir) => (
            <button
              key={dir.name}
              onClick={() => {
                setRotation(dir.angle);
                setSelectedDirection(dir.name);
              }}
              className="p-3 bg-white rounded-xl shadow hover:shadow-lg transition-all hover:scale-105"
            >
              <div className={`text-3xl ${dir.color} mb-2`}>{dir.emoji}</div>
              <div className="font-comic font-bold text-sm">{dir.name}</div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default CompassLesson;
