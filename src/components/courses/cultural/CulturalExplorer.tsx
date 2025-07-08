
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, MapPin, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

const CulturalExplorer = () => {
  const navigate = useNavigate();

  const lessons = [
    {
      id: 'world-cultures',
      title: '🌍 World Cultures',
      description: 'Explore amazing cultures around the world',
      icon: <Globe className="w-8 h-8" />,
      color: 'gradient-rainbow'
    },
    {
      id: 'traditions',
      title: '🎭 Traditions & Festivals',
      description: 'Learn about colorful celebrations',
      icon: <Users className="w-8 h-8" />,
      color: 'gradient-sunset'
    },
    {
      id: 'geography',
      title: '🗺️ Countries & Places',
      description: 'Discover countries and their wonders',
      icon: <MapPin className="w-8 h-8" />,
      color: 'gradient-ocean'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/courses')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-5xl text-rainbow mb-4 animate-rainbow-pulse">
            🌍 Cultural Explorer
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Journey around the world and discover amazing cultures! 🎭✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-4 border-transparent hover:border-purple-200" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden animate-rainbow-pulse`}>
                <div className="text-white z-10 animate-bounce">
                  {lesson.icon}
                </div>
              </div>

              <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 mb-6">
                {lesson.description}
              </p>

              <Button className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}>
                Explore Culture! 🎭
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CulturalExplorer;
