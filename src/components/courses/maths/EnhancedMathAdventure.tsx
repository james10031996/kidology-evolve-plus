import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Calculator, Star, Plus, Minus, X, Divide, Trophy, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import GameCompletionPopup from '@/components/game/game/GameCompletionPopup';

const EnhancedMathAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [showCompletion, setShowCompletion] = useState(false);
  const [completionData, setCompletionData] = useState({ score: 0, stars: 0, gameName: '' });

  const mathConcepts = {
    numbers: {
      title: '🔢 Numbers 1-100',
      description: 'Learn counting, number recognition, and number sequences',
      concepts: [
        { range: '1-10', emoji: '🔟', color: 'from-blue-100 to-blue-200', items: Array.from({length: 10}, (_, i) => i + 1) },
        { range: '11-20', emoji: '🌟', color: 'from-green-100 to-green-200', items: Array.from({length: 10}, (_, i) => i + 11) },
        { range: '21-50', emoji: '🎯', color: 'from-purple-100 to-purple-200', items: Array.from({length: 30}, (_, i) => i + 21) },
        { range: '51-100', emoji: '🚀', color: 'from-orange-100 to-orange-200', items: Array.from({length: 50}, (_, i) => i + 51) }
      ]
    },
    addition: {
      title: '➕ Addition Magic',
      description: 'Add numbers with fun visuals and interactive examples',
      problems: [
        { problem: '2 + 3', answer: 5, visual: '🍎🍎 + 🍎🍎🍎 = 🍎🍎🍎🍎🍎', emoji: '🍎', explanation: 'Two apples plus three apples equals five apples!' },
        { problem: '4 + 1', answer: 5, visual: '⭐⭐⭐⭐ + ⭐ = ⭐⭐⭐⭐⭐', emoji: '⭐', explanation: 'Four stars plus one star equals five stars!' },
        { problem: '3 + 4', answer: 7, visual: '🌟🌟🌟 + 🌟🌟🌟🌟 = 🌟🌟🌟🌟🌟🌟🌟', emoji: '🌟', explanation: 'Three stars plus four stars equals seven stars!' },
        { problem: '5 + 2', answer: 7, visual: '🐝🐝🐝🐝🐝 + 🐝🐝 = 🐝🐝🐝🐝🐝🐝🐝', emoji: '🐝', explanation: 'Five bees plus two bees equals seven bees!' },
        { problem: '6 + 3', answer: 9, visual: '🌸🌸🌸🌸🌸🌸 + 🌸🌸🌸 = 🌸🌸🌸🌸🌸🌸🌸🌸🌸', emoji: '🌸', explanation: 'Six flowers plus three flowers equals nine flowers!' }
      ]
    },
    subtraction: {
      title: '➖ Subtraction Fun',
      description: 'Learn to subtract with interactive examples',
      problems: [
        { problem: '5 - 2', answer: 3, visual: '🍎🍎🍎🍎🍎 - 🍎🍎 = 🍎🍎🍎', emoji: '🍎', explanation: 'Five apples take away two apples leaves three apples!' },
        { problem: '7 - 3', answer: 4, visual: '⭐⭐⭐⭐⭐⭐⭐ - ⭐⭐⭐ = ⭐⭐⭐⭐', emoji: '⭐', explanation: 'Seven stars take away three stars leaves four stars!' },
        { problem: '8 - 5', answer: 3, visual: '🦋🦋🦋🦋🦋🦋🦋🦋 - 🦋🦋🦋🦋🦋 = 🦋🦋🦋', emoji: '🦋', explanation: 'Eight butterflies take away five butterflies leaves three butterflies!' },
        { problem: '9 - 4', answer: 5, visual: '🌻🌻🌻🌻🌻🌻🌻🌻🌻 - 🌻🌻🌻🌻 = 🌻🌻🌻🌻🌻', emoji: '🌻', explanation: 'Nine sunflowers take away four sunflowers leaves five sunflowers!' }
      ]
    },
    multiplication: {
      title: '✖️ Multiplication Adventures',
      description: 'Discover multiplication through repeated addition',
      problems: [
        { problem: '2 × 3', answer: 6, visual: '🍎🍎 + 🍎🍎 + 🍎🍎 = 🍎🍎🍎🍎🍎🍎', emoji: '🍎', explanation: 'Two apples three times equals six apples!' },
        { problem: '3 × 2', answer: 6, visual: '⭐⭐⭐ + ⭐⭐⭐ = ⭐⭐⭐⭐⭐⭐', emoji: '⭐', explanation: 'Three stars two times equals six stars!' },
        { problem: '4 × 2', answer: 8, visual: '🌟🌟🌟🌟 + 🌟🌟🌟🌟 = 🌟🌟🌟🌟🌟🌟🌟🌟', emoji: '🌟', explanation: 'Four stars two times equals eight stars!' },
        { problem: '5 × 2', answer: 10, visual: '🐛🐛🐛🐛🐛 + 🐛🐛🐛🐛🐛 = 🐛🐛🐛🐛🐛🐛🐛🐛🐛🐛', emoji: '🐛', explanation: 'Five bugs two times equals ten bugs!' }
      ]
    },
    shapes: {
      title: '🔷 Geometry Shapes',
      description: 'Explore basic shapes and their properties',
      shapes: [
        { name: 'Circle', sides: 0, emoji: '⭕', description: 'Round like a ball', color: 'bg-red-100', examples: 'Ball, Sun, Wheel' },
        { name: 'Square', sides: 4, emoji: '🟦', description: 'Four equal sides', color: 'bg-blue-100', examples: 'Window, Box, Tile' },
        { name: 'Triangle', sides: 3, emoji: '🔺', description: 'Three sides', color: 'bg-green-100', examples: 'Mountain, Roof, Pizza slice' },
        { name: 'Rectangle', sides: 4, emoji: '▬', description: 'Four sides, opposite equal', color: 'bg-yellow-100', examples: 'Door, Book, Phone' },
        { name: 'Diamond', sides: 4, emoji: '💎', description: 'Four equal sides tilted', color: 'bg-purple-100', examples: 'Kite, Playing card suit' },
        { name: 'Oval', sides: 0, emoji: '🥚', description: 'Like a stretched circle', color: 'bg-pink-100', examples: 'Egg, Mirror, Face' }
      ]
    },
    patterns: {
      title: '🎨 Patterns & Sequences',
      description: 'Create and continue amazing patterns',
      patterns: [
        { type: 'Color', sequence: ['🔴', '🔵', '🟡', '🔴', '🔵', '🟡'], next: '🔴', description: 'Red, Blue, Yellow pattern' },
        { type: 'Shape', sequence: ['⭐', '⭕', '🔺', '⭐', '⭕', '🔺'], next: '⭐', description: 'Star, Circle, Triangle pattern' },
        { type: 'Size', sequence: ['🐜', '🐝', '🦋', '🐜', '🐝', '🦋'], next: '🐜', description: 'Small, Medium, Large pattern' },
        { type: 'Numbers', sequence: ['1️⃣', '2️⃣', '3️⃣', '1️⃣', '2️⃣', '3️⃣'], next: '1️⃣', description: '1, 2, 3 number pattern' }
      ]
    },
    fractions: {
      title: '🍕 Fun with Fractions',
      description: 'Learn about parts of a whole with pizza and cakes!',
      fractions: [
        { fraction: '1/2', visual: '🍕', description: 'One half - pizza cut in 2 equal pieces', emoji: '🍕' },
        { fraction: '1/4', visual: '🍰', description: 'One quarter - cake cut in 4 equal pieces', emoji: '🍰' },
        { fraction: '3/4', visual: '🥧', description: 'Three quarters - most of the pie', emoji: '🥧' },
        { fraction: '1/3', visual: '🍫', description: 'One third - chocolate bar divided by 3', emoji: '🍫' }
      ]
    },
    time: {
      title: '⏰ Time Adventures',
      description: 'Learn to read clocks and understand time',
      times: [
        { time: '1:00', description: 'One o\'clock', emoji: '🕐', activity: 'Lunch time!' },
        { time: '3:00', description: 'Three o\'clock', emoji: '🕒', activity: 'Snack time!' },
        { time: '6:00', description: 'Six o\'clock', emoji: '🕕', activity: 'Dinner time!' },
        { time: '9:00', description: 'Nine o\'clock', emoji: '🕘', activity: 'Bedtime!' }
      ]
    },
    money: {
      title: '💰 Money Math',
      description: 'Learn about coins, counting money, and making change',
      coins: [
        { coin: 'Penny', value: 1, emoji: '🪙', color: 'bg-orange-100', description: '1 cent - copper colored' },
        { coin: 'Nickel', value: 5, emoji: '🪙', color: 'bg-gray-100', description: '5 cents - silver colored' },
        { coin: 'Dime', value: 10, emoji: '🪙', color: 'bg-gray-200', description: '10 cents - smallest silver coin' },
        { coin: 'Quarter', value: 25, emoji: '🪙', color: 'bg-gray-300', description: '25 cents - largest common coin' }
      ]
    }
  };

  const lessons = [
    { id: 'numbers', title: '🔢 Numbers & Counting', description: 'Master numbers from 1 to 100', color: 'gradient-blue', difficulty: 'Easy', duration: '15 min' },
    { id: 'addition', title: '➕ Addition Magic', description: 'Add numbers with fun visuals', color: 'gradient-green', difficulty: 'Easy', duration: '20 min' },
    { id: 'subtraction', title: '➖ Subtraction Fun', description: 'Take away numbers playfully', color: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400', difficulty: 'Easy', duration: '20 min' },
    { id: 'multiplication', title: '✖️ Multiplication', description: 'Multiply with repeated addition', color: 'gradient-purple', difficulty: 'Medium', duration: '25 min' },
    { id: 'shapes', title: '🔷 Geometry Shapes', description: 'Discover shapes around us', color: 'gradient-orange', difficulty: 'Easy', duration: '18 min' },
    { id: 'patterns', title: '🎨 Patterns', description: 'Create and continue patterns', color: 'gradient-pink', difficulty: 'Medium', duration: '22 min' },
    { id: 'fractions', title: '🍕 Fun Fractions', description: 'Learn about parts of whole', color: 'bg-gradient-to-r from-pink-300 via-rose-400 to-fuchsia-500', difficulty: 'Medium', duration: '20 min' },
    { id: 'time', title: '⏰ Telling Time', description: 'Read clocks and understand time', color: 'bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500', difficulty: 'Medium', duration: '25 min' },
    { id: 'money', title: '💰 Money Math', description: 'Count coins and make change', color: 'bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-100', difficulty: 'Hard', duration: '30 min' }
  ];

  const completeLesson = (lessonId: string) => {
    if (!completedTopics.includes(lessonId)) {
      setCompletedTopics([...completedTopics, lessonId]);
      const lesson = lessons.find(l => l.id === lessonId);
      const stars = lesson?.difficulty === 'Easy' ? 10 : lesson?.difficulty === 'Medium' ? 15 : 20;
      updateStars(stars);
      updateProgress('Mathematics', 15);
      setCompletionData({
        score: stars * 10,
        stars: stars,
        gameName: lesson?.title || 'Math Topic'
      });
      setShowCompletion(true);
    }
  };

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
  };

  const renderNumbersLesson = () => (
    <div className="space-y-8">
      {mathConcepts.numbers.concepts.map((concept, index) => (
        <Card key={concept.range} className={`p-6 bg-gradient-to-r ${concept.color} rounded-2xl shadow-lg animate-fade-in`} style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="text-center mb-6">
            <div className="text-6xl mb-3 animate-bounce">{concept.emoji}</div>
            <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-2">Numbers {concept.range}</h3>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {concept.items.slice(0, 20).map((number) => (
              <div key={number} className="bg-white p-4 rounded-xl text-center shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer">
                <div className="text-2xl font-fredoka font-bold text-blue-600 mb-2">{number}</div>
                <div className="text-sm text-gray-600">{number === 1 ? 'One' : number === 2 ? 'Two' : number === 3 ? 'Three' : number === 4 ? 'Four' : number === 5 ? 'Five' : `${number}`}</div>
              </div>
            ))}
          </div>
        </Card>
      ))}
      <div className="text-center">
        <Button onClick={() => completeLesson('numbers')} className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
          <Trophy className="w-5 h-5 mr-2" />
          Complete Numbers Lesson
        </Button>
      </div>
    </div>
  );

  const renderOperationLesson = (operation: string, data: any, icon: any) => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.problems.map((prob: any, index: number) => (
          <Card key={index} className="p-6 text-center bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in border-2 border-blue-100" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-5xl mb-4 animate-bounce">
              {prob.emoji}
            </div>
            <div className="font-fredoka text-2xl font-bold text-purple-700 mb-4">
              {prob.problem} = {prob.answer}
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl mb-4 text-lg border border-purple-200">
              {prob.visual}
            </div>
            <div className="font-comic text-gray-700 text-sm bg-white p-3 rounded-lg shadow-inner">
              {prob.explanation}
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={() => completeLesson(operation)} className={`gradient-${operation === 'addition' ? 'green' : operation === 'subtraction' ? 'red' : 'purple'} text-white font-comic font-bold px-8 py-3 rounded-full text-lg`}>
          <Trophy className="w-5 h-5 mr-2" />
          Complete {operation.charAt(0).toUpperCase() + operation.slice(1)} Lesson
        </Button>
      </div>
    </div>
  );

  const renderShapesLesson = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mathConcepts.shapes.shapes.map((shape, index) => (
          <Card key={shape.name} className={`p-6 text-center ${shape.color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in border-2`} style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="text-8xl mb-4 animate-bounce">
              {shape.emoji}
            </div>
            <div className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
              {shape.name}
            </div>
            <div className="font-comic text-lg text-gray-700 mb-3">
              {shape.sides > 0 ? `${shape.sides} sides` : 'No sides'}
            </div>
            <div className="font-comic text-sm text-gray-600 bg-white/80 p-3 rounded-lg mb-3">
              {shape.description}
            </div>
            <div className="bg-white/60 p-2 rounded-lg">
              <div className="font-comic text-xs text-gray-600 font-bold">Examples:</div>
              <div className="font-comic text-xs text-gray-700">{shape.examples}</div>
            </div>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button onClick={() => completeLesson('shapes')} className="gradient-orange text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
          <Trophy className="w-5 h-5 mr-2" />
          Complete Shapes Lesson
        </Button>
      </div>
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
            {completedTopics.includes(selectedLesson) && (
              <Badge className="bg-green-100 text-green-700 font-comic">
                <Trophy className="w-3 h-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {lesson?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600 mb-4">
              {lesson?.description}
            </p>
            <div className="flex justify-center space-x-4">
              <Badge className="bg-blue-100 text-blue-700 font-comic">{lesson?.difficulty}</Badge>
              <Badge className="bg-purple-100 text-purple-700 font-comic">{lesson?.duration}</Badge>
            </div>
          </div>

          {selectedLesson === 'numbers' && renderNumbersLesson()}
          {selectedLesson === 'addition' && renderOperationLesson('addition', mathConcepts.addition, Plus)}
          {selectedLesson === 'subtraction' && renderOperationLesson('subtraction', mathConcepts.subtraction, Minus)}
          {selectedLesson === 'multiplication' && renderOperationLesson('multiplication', mathConcepts.multiplication, X)}
          {selectedLesson === 'shapes' && renderShapesLesson()}
        </div>

        <GameCompletionPopup
          isOpen={showCompletion}
          onClose={() => setShowCompletion(false)}
          score={completionData.score}
          stars={completionData.stars}
          gameName={completionData.gameName}
        />
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
            🔢 Enhanced Math Adventure
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Embark on an exciting mathematical journey! Learn numbers, operations, shapes, and much more with interactive visuals and engaging activities.
          </p>
          <div className="mt-4 flex justify-center">
            <Badge className="bg-green-100 text-green-700 font-comic text-sm">
              {completedTopics.length} of {lessons.length} topics completed
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in border-0" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${lesson.color} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                <div className="text-4xl text-white animate-bounce z-10">
                  {lesson.title.split(' ')[0]}
                </div>
                {completedTopics.includes(lesson.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                    <Trophy className="w-4 h-4" />
                  </div>
                )}
              </div>

              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                {lesson.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {lesson.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={`font-comic text-xs ${
                    lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {lesson.difficulty}
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700 font-comic text-xs">
                    {lesson.duration}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">
                    {lesson.difficulty === 'Easy' ? '10' : lesson.difficulty === 'Medium' ? '15' : '20'} stars
                  </span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200 ${
                  completedTopics.includes(lesson.id) ? 'opacity-75' : ''
                }`}
                onClick={() => startLesson(lesson.id)}
              >
                {completedTopics.includes(lesson.id) ? (
                  <>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Review Lesson
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4 mr-2" />
                    Start Learning
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {completedTopics.length === lessons.length && (
          <Card className="mt-12 p-8 bg-gradient-to-r from-yellow-100 to-green-100 rounded-2xl text-center border-2 border-green-200">
            <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
            <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
              🎉 Math Master Achievement! 🎉
            </h2>
            <p className="font-comic text-lg text-gray-700 mb-6">
              Congratulations! You've completed all math topics and become a Math Adventure Master!
            </p>
            <Button className="gradient-rainbow text-white font-comic font-bold px-8 py-3 rounded-full text-lg">
              <Star className="w-5 h-5 mr-2" />
              Claim Master Certificate
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EnhancedMathAdventure;
