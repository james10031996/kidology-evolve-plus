import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Calculator, Star, Plus, Minus, X, Divide } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const MathAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const numbers = Array.from({ length: 20 }, (_, i) => i + 1);
  
  const mathConcepts = {
    addition: [
      { problem: '2 + 3', answer: 5, visual: '🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎' },
      { problem: '4 + 1', answer: 5, visual: '⭐⭐⭐⭐ + ⭐ = ⭐⭐⭐⭐⭐' },
      { problem: '3 + 4', answer: 7, visual: '🌟🌟🌟 + 🌟🌟🌟🌟 = 🌟🌟🌟🌟🌟🌟🌟' }
    ],
    subtraction: [
      { problem: '5 - 2', answer: 3, visual: '🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎' },
      { problem: '7 - 3', answer: 4, visual: '⭐⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐ = ⭐⭐⭐⭐' },
      { problem: '6 - 4', answer: 2, visual: '🌟🌟🌟🌟🌟🌟 - 🌟🌟🌟🌟 = 🌟🌟' }
    ],
    multiplication: [
      { problem: '2 × 3', answer: 6, visual: '🍎🍎 + 🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎🍎' },
      { problem: '3 × 2', answer: 6, visual: '⭐⭐⭐ + ⭐⭐⭐ = ⭐⭐⭐⭐⭐⭐' },
      { problem: '4 × 2', answer: 8, visual: '🌟🌟🌟🌟 + 🌟🌟🌟🌟 = 🌟🌟🌟🌟🌟🌟🌟🌟' }
    ],
    shapes: [
      { name: 'Circle', sides: 0, emoji: '⭕', description: 'Round like a ball' },
      { name: 'Square', sides: 4, emoji: '⬜', description: 'Four equal sides' },
      { name: 'Triangle', sides: 3, emoji: '🔺', description: 'Three sides' },
      { name: 'Rectangle', sides: 4, emoji: '▬', description: 'Four sides, opposite equal' }
    ]
  };

  const lessons = [
    { id: 'numbers', title: '🔢 Numbers 1-20', description: 'Learn to count and recognize numbers', color: 'gradient-blue' },
    { id: 'addition', title: '➕ Addition Magic', description: 'Add numbers with fun visuals', color: 'gradient-green' },
    { id: 'subtraction', title: '➖ Subtraction Fun', description: 'Take away numbers playfully', color: 'gradient-red' },
    { id: 'multiplication', title: '✖️ Multiplication', description: 'Multiply with repeated addition', color: 'gradient-purple' },
    { id: 'shapes', title: '🔷 Geometry Shapes', description: 'Discover basic shapes around us', color: 'gradient-orange' },
    { id: 'patterns', title: '🎨 Patterns', description: 'Create and continue patterns', color: 'gradient-pink' },
    { id: 'measurement', title: '📏 Measurement', description: 'Learn about size, length, and weight', color: 'gradient-teal' },
    { id: 'time', title: '⏰ Telling Time', description: 'Read clocks and understand time', color: 'gradient-yellow' }
  ];

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(10);
    updateProgress('Mathematics', 5);
  };

  const renderNumbersLesson = () => (
    <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-6">
      {numbers.map((number, index) => (
        <Card key={number} className="p-6 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <div className="text-6xl font-fredoka font-bold text-blue-600 mb-4 animate-bounce">
            {number}
          </div>
          <div className="text-2xl mb-4">
            {Array.from({ length: Math.min(number, 10) }, (_, i) => '⭐').join('')}
          </div>
          <div className="font-comic text-sm text-gray-600">
            {number === 1 ? 'One' : number === 2 ? 'Two' : number === 3 ? 'Three' : 
             number === 4 ? 'Four' : number === 5 ? 'Five' : number === 6 ? 'Six' :
             number === 7 ? 'Seven' : number === 8 ? 'Eight' : number === 9 ? 'Nine' :
             number === 10 ? 'Ten' : `Number ${number}`}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderOperationLesson = (operation: string, problems: any[], icon: any) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {problems.map((prob, index) => (
        <Card key={index} className="p-8 text-center bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-4xl mb-4">
            {React.createElement(icon, { className: "w-12 h-12 mx-auto text-purple-600" })}
          </div>
          <div className="font-fredoka text-3xl font-bold text-purple-700 mb-4">
            {prob.problem} = {prob.answer}
          </div>
          <div className="bg-white p-4 rounded-xl mb-4 text-2xl">
            {prob.visual}
          </div>
          <div className="font-comic text-gray-600">
            Visual representation helps understand {operation}!
          </div>
        </Card>
      ))}
    </div>
  );

  const renderShapesLesson = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {mathConcepts.shapes.map((shape, index) => (
        <Card key={shape.name} className="p-8 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-8xl mb-4 animate-bounce">
            {shape.emoji}
          </div>
          <div className="font-fredoka text-2xl font-bold text-orange-600 mb-2">
            {shape.name}
          </div>
          <div className="font-comic text-lg text-gray-700 mb-2">
            {shape.sides > 0 ? `${shape.sides} sides` : 'No sides'}
          </div>
          <div className="font-comic text-sm text-gray-600 bg-orange-50 p-3 rounded-lg">
            {shape.description}
          </div>
        </Card>
      ))}
    </div>
  );

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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

          {selectedLesson === 'numbers' && renderNumbersLesson()}
          {selectedLesson === 'addition' && renderOperationLesson('addition', mathConcepts.addition, Plus)}
          {selectedLesson === 'subtraction' && renderOperationLesson('subtraction', mathConcepts.subtraction, Minus)}
          {selectedLesson === 'multiplication' && renderOperationLesson('multiplication', mathConcepts.multiplication, X)}
          {selectedLesson === 'shapes' && renderShapesLesson()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            🔢 Math Adventure Course
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the magical world of mathematics! Learn numbers, operations, shapes, and much more with colorful visuals.
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
                <Badge className="bg-blue-100 text-blue-700 font-comic">
                  Mathematical
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">10 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MathAdventure;
