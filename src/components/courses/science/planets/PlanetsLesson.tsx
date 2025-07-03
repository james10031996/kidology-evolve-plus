
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Telescope, Info, Star, X } from 'lucide-react';
import ThreeDSolarSystem from './solar/3d/System';
import SolarSystem from './solar/2D/SolarSystem';
import { Suspense } from 'react';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { planets } from './planetsLessonData';

const PlanetsLesson = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<number | null>(null);
  const [open1D, setOpen1D] = useState(false);
  const [open2D, setOpen2D] = useState(false);
  const [open3D, setOpen3D] = useState(false);


  return (
    <div className="space-y-6">
      {/* Dialog for 2D Solar System */}
      <Dialog open={open2D} onOpenChange={setOpen2D}>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 mr-2 text-white bg-violet-500 hover:bg-violet-700 rounded">
            2D Solar System
          </Button>
        </DialogTrigger>

        <DialogContent className="bg-black w-full h-[70vh] sm:h-[90vh] p-0 max-w-[90vw]">
          <div
            id="dialog-2d-solar"
            className="relative w-full h-full data-close controls-close view-2D scale-stretched"
          >
            <DialogTitle className="sr-only">2D Solar System</DialogTitle>
            <DialogDescription className="sr-only">
              Explore a 2D interactive solar system
            </DialogDescription>

            <Button
              onClick={() => setOpen2D(false)}
              className="absolute sm:top-4 top-8 right-2 sm:right-1 z-[9999] bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0"
              size="sm"
            >
              <X className="" />
            </Button>

            <SolarSystem />
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog for 3D Solar System */}
      <Dialog open={open3D} onOpenChange={setOpen3D}>
        <DialogTrigger asChild>
          <Button className="px-4 py-2 text-white bg-purple-500 hover:bg-purple-700 rounded">
            3D Solar System
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full h-[90vh] p-0 max-w-[90vw]">
          <DialogTitle className="sr-only">3D Solar System</DialogTitle>
          <DialogDescription className="sr-only">
            Explore a 3D interactive solar system
          </DialogDescription>
          <div className="relative w-full h-full">
            <Button
              onClick={() => setOpen3D(false)}
              className="absolute top-4 right-4 z-50 bg-white/80 text-gray-800 hover:bg-white rounded-full w-10 h-10 p-0"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
            <TooltipProvider>
              <Suspense fallback={<div className="p-4 text-center">Loading...</div>}>
                <ThreeDSolarSystem />
              </Suspense>
            </TooltipProvider>
          </div>
        </DialogContent>
      </Dialog>

      <div className="text-center mb-8">
        <h2 className="font-fredoka text-3xl text-blue-700 mb-4">🪐 Journey Through Our Solar System</h2>
        <p className="font-comic text-gray-600">Explore the amazing planets in our cosmic neighborhood!</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {planets.map((planet, index) => (
        <Card
          key={planet.name}
          className="p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] animate-fade-in border-2 border-blue-100 bg-gradient-to-br from-white via-blue-50 to-white"
          style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}
        >
          <div className="text-center">
            <div className="text-6xl mb-3 animate-bounce">{planet.emoji}</div>
            <div className={`${planet.color} text-white font-fredoka text-xl font-bold py-2 px-4 rounded-lg shadow-inner mb-3`}>{planet.name}</div>
            <p className="font-comic text-gray-700 bg-gray-100 p-3 rounded-md text-sm mb-4">{planet.fact}</p>

            {selectedPlanet === index && (
              <div className="bg-white/90 border rounded-xl p-4 text-left space-y-3 shadow-inner animate-fade-in">
                <h4 className="font-comic font-bold text-blue-700 flex items-center">
                  <Info className="w-4 h-4 mr-2" />Planet Details:
                </h4>
                <ul className="text-sm text-gray-700 font-comic space-y-1 pl-4 list-disc">
                  <li><strong>Distance from Sun:</strong> {planet.distance}</li>
                  <li><strong>Atmosphere:</strong> {planet.atmosphere}</li>
                  <li><strong>Temperature:</strong> {planet.temperatureRange}</li>
                  <li><strong>Moons:</strong> {planet.moons}</li>
                  <li><strong>Rotation:</strong> {planet.rotationPeriod}</li>
                  <li><strong>Orbit:</strong> {planet.orbitalPeriod}</li>
                  <li><strong>Surface:</strong> {planet.surface}</li>
                </ul>
                <p className="text-xs text-blue-500 italic">{planet.details}</p>
                <div className="bg-yellow-100 p-3 rounded-md">
                  <p className="font-bold text-yellow-800 text-sm">🌟 Fun Fact:</p>
                  <p className="text-yellow-700 text-sm">{planet.funFact}</p>
                </div>
              </div>
            )}

            <div className="space-y-2 mt-4">
              <Button
                onClick={() => setSelectedPlanet(selectedPlanet === index ? null : index)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-comic hover:from-blue-600 hover:to-purple-600"
              >
                <Telescope className="w-4 h-4 mr-2" />
                {selectedPlanet === index ? 'Hide Details' : 'Explore Planet'}
              </Button>

              {selectedPlanet === index && (
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 font-comic text-xs">
                    🚀 Visit Planet
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 font-comic text-xs">
                    📸 View Images
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