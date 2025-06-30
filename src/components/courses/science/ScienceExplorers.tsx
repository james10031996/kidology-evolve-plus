import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Beaker, Star, Microscope } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import ScienceLessons from './ScienceLessons';
import ExperimentsLesson from './experiments/ExperimentsLesson';
import PlanetsLesson from './planets/PlanetsLesson';

const ScienceExplorers = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const scienceTopics = {
    planets: [
      { name: 'Mercury', emoji: '☿️', fact: 'Closest to the Sun', color: 'bg-gray-400' },
      { name: 'Venus', emoji: '♀️', fact: 'Hottest planet', color: 'bg-yellow-400' },
      { name: 'Earth', emoji: '🌍', fact: 'Our home planet', color: 'bg-blue-400' },
      { name: 'Mars', emoji: '♂️', fact: 'The red planet', color: 'bg-red-400' },
      { name: 'Jupiter', emoji: '♃', fact: 'Largest planet', color: 'bg-orange-400' },
      { name: 'Saturn', emoji: '♄', fact: 'Has beautiful rings', color: 'bg-yellow-300' }
    ],
    weather: [
      { type: 'Sunny', emoji: '☀️', description: 'Bright and warm day' },
      { type: 'Rainy', emoji: '🌧️', description: 'Water falls from clouds' },
      { type: 'Cloudy', emoji: '☁️', description: 'Sky covered with clouds' },
      { type: 'Snowy', emoji: '❄️', description: 'White flakes from sky' },
      { type: 'Windy', emoji: '💨', description: 'Air moves quickly' },
      { type: 'Stormy', emoji: '⛈️', description: 'Thunder and lightning' }
    ],
    animals: [
      { habitat: 'Ocean', animals: ['Dolphin 🐬', 'Whale 🐋', 'Shark 🦈', 'Fish 🐟'], color: 'bg-blue-200' },
      { habitat: 'Forest', animals: ['Bear 🐻', 'Deer 🦌', 'Squirrel 🐿️', 'Owl 🦉'], color: 'bg-green-200' },
      { habitat: 'Desert', animals: ['Camel 🐫', 'Snake 🐍', 'Lizard 🦎', 'Cactus 🌵'], color: 'bg-yellow-200' },
      { habitat: 'Arctic', animals: ['Penguin 🐧', 'Polar Bear 🐻‍❄️', 'Seal 🦭', 'Walrus 🦭'], color: 'bg-cyan-200' }
    ]
  };

  const lessons = [
    { id: 'experiments', title: '🧪 Fun Experiments', description: 'Safe and exciting science experiments', color: 'gradient-purple' },
    { id: 'planets', title: '🪐 Solar System', description: 'Explore planets and space', color: 'gradient-blue' },
    { id: 'weather', title: '🌦️ Weather Patterns', description: 'Understand different weather types', color: 'bg-gradient-to-r from-pink-300 via-rose-400 to-fuchsia-500' },
    { id: 'animals', title: '🦁 Animal Habitats', description: 'Where different animals live', color: 'gradient-green' },
    { id: 'plants', title: '🌱 Plant Life', description: 'How plants grow and live', color: 'gradient-green' },
    { id: 'human-body', title: '🫀 Human Body', description: 'Amazing facts about our body', color: 'bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500' },
    { id: 'rocks', title: '🪨 Rocks and Minerals', description: 'Earth\'s building blocks', color: 'bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-100' },
    { id: 'water-life', title: '🐠 Water Life', description: 'Amazing creatures that live in water', color: 'gradient-blue' },
    { id: 'universe', title: '🌌 Universe', description: 'Explore the vast cosmos and stars', color: 'bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-500' }
  ];

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(15);
    updateProgress('Science', 5);
  };

  const renderWeatherLesson = () => (
    <div className="grid md:grid-cols-3 gap-6">
      {scienceTopics.weather.map((weather, index) => (
        <Card key={weather.type} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="text-6xl text-center mb-4 animate-bounce">
            {weather.emoji}
          </div>
          <h3 className="font-fredoka text-xl font-bold text-pink-600 text-center mb-3">
            {weather.type}
          </h3>
          <p className="font-comic text-gray-600 text-center bg-pink-50 p-3 rounded-lg">
            {weather.description}
          </p>
        </Card>
      ))}
    </div>
  );

  const renderAnimalsLesson = () => (
    <div className="grid md:grid-cols-2 gap-8">
      {scienceTopics.animals.map((habitat, index) => (
        <Card key={habitat.habitat} className={`p-8 ${habitat.color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
          <h3 className="font-fredoka text-2xl font-bold text-gray-800 text-center mb-6">
            {habitat.habitat} Habitat
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {habitat.animals.map((animal, i) => (
              <div key={i} className="bg-white p-4 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="font-comic text-lg">{animal}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedLesson(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Lessons
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {lesson?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600">
              {lesson?.description}
            </p>
          </div>

          {selectedLesson === 'experiments' && <ExperimentsLesson />}
          {selectedLesson === 'planets' && <PlanetsLesson />}
          
          {(selectedLesson === 'plants' || selectedLesson === 'human-body' || 
            selectedLesson === 'rocks' || selectedLesson === 'water-life' || 
            selectedLesson === 'universe') && (
            <ScienceLessons lessonType={selectedLesson} />
          )}
          
          {selectedLesson === 'weather' && renderWeatherLesson()}
          {selectedLesson === 'animals' && renderAnimalsLesson()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/courses')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🔬 Science Explorers Course
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the wonders of science! Conduct experiments, explore space, understand weather, and learn about the amazing world around us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-xl mb-4 flex items-center justify-center`}>
                <div className="text-4xl text-white animate-bounce">
                  {lesson.title.split(' ')[0]}
                </div>
              </div>

              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-cyan-100 text-cyan-700 font-comic">
                  Scientific
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">15 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Beaker className="w-4 h-4 mr-2" />
                Explore Science
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceExplorers;
