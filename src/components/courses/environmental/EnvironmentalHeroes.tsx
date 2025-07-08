
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf, Recycle, TreePine } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

const EnvironmentalHeroes = () => {
  const navigate = useNavigate();

  const lessons = [
    {
      id: 'earth-care',
      title: '🌍 Caring for Earth',
      description: 'Learn how to protect our planet',
      icon: <Leaf className="w-8 h-8" />,
      color: 'gradient-green'
    },
    {
      id: 'recycling',
      title: '♻️ Recycling Heroes',
      description: 'Discover the magic of recycling',
      icon: <Recycle className="w-8 h-8" />,
      color: 'gradient-blue'
    },
    {
      id: 'nature-protection',
      title: '🌲 Nature Protection',
      description: 'Help protect forests and animals',
      icon: <TreePine className="w-8 h-8" />,
      color: 'gradient-forest'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-6">
          <Button onClick={() => navigate('/courses')} variant="ghost" className="mr-4 font-comic">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Button>
        </div>

        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-5xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            🌍 Environmental Heroes
          </h1>
          <p className="font-comic text-xl text-gray-700">
            Become an Earth hero and protect our beautiful planet! 🌱✨
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-8 bg-white rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-4 border-transparent hover:border-green-200" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-white z-10 animate-bounce">
                  {lesson.icon}
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
              </div>

              <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 mb-6">
                {lesson.description}
              </p>

              <Button className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}>
                Save the Planet! 🌍
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnvironmentalHeroes;
