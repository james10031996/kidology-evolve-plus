
import React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Calculator, Star, Plus, Minus, X, Divide, Trophy, BookOpen, Clock, Coins } from 'lucide-react';
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

  // ... keep existing code (mathConcepts object with existing topics)

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
        { type: 'Numbers', sequence: ['1️⃣', '2️⃣', '3️⃣', '1️⃣', '2️⃣', '3️⃣'], next: '1️⃣', description: '1, 2, 3 number pattern' },
        { type: 'Animals', sequence: ['🐶', '🐱', '🐰', '🐶', '🐱', '🐰'], next: '🐶', description: 'Dog, Cat, Rabbit pattern' },
        { type: 'Fruits', sequence: ['🍎', '🍌', '🍊', '🍎', '🍌', '🍊'], next: '🍎', description: 'Apple, Banana, Orange pattern' }
      ]
    },
    measurement: {
      title: '📏 Measurement Fun',
      description: 'Learn about size, length, weight, and capacity',
      concepts: [
        { 
          type: 'Length', 
          emoji: '📏', 
          examples: [
            { item: 'Pencil', length: '6 inches', visual: '✏️', comparison: 'Short' },
            { item: 'Ruler', length: '12 inches', visual: '📏', comparison: 'Medium' },
            { item: 'Yard stick', length: '36 inches', visual: '📐', comparison: 'Long' }
          ],
          activities: [
            'Measure classroom objects',
            'Compare heights of friends',
            'Find things longer than your hand'
          ]
        },
        { 
          type: 'Weight', 
          emoji: '⚖️', 
          examples: [
            { item: 'Feather', weight: 'Very light', visual: '🪶', comparison: 'Lightest' },
            { item: 'Apple', weight: 'Medium', visual: '🍎', comparison: 'Medium' },
            { item: 'Book', weight: 'Heavy', visual: '📚', comparison: 'Heaviest' }
          ],
          activities: [
            'Compare weights by holding objects',
            'Sort toys by weight',
            'Find heaviest backpack'
          ]
        },
        { 
          type: 'Capacity', 
          emoji: '🥤', 
          examples: [
            { item: 'Spoon', capacity: '1 tablespoon', visual: '🥄', comparison: 'Small' },
            { item: 'Cup', capacity: '8 ounces', visual: '☕', comparison: 'Medium' },
            { item: 'Pitcher', capacity: '32 ounces', visual: '🏺', comparison: 'Large' }
          ],
          activities: [
            'Pour water between containers',
            'Count how many cups fill a pitcher',
            'Compare bottle sizes'
          ]
        }
      ]
    },
    time: {
      title: '⏰ Time Adventures',
      description: 'Learn to read clocks and understand time',
      concepts: [
        {
          type: 'Clock Reading',
          times: [
            { time: '1:00', description: 'One o\'clock', emoji: '🕐', activity: 'Lunch time!', explanation: 'Hour hand points to 1' },
            { time: '3:00', description: 'Three o\'clock', emoji: '🕒', activity: 'Snack time!', explanation: 'Hour hand points to 3' },
            { time: '6:00', description: 'Six o\'clock', emoji: '🕕', activity: 'Dinner time!', explanation: 'Hour hand points to 6' },
            { time: '9:00', description: 'Nine o\'clock', emoji: '🕘', activity: 'Bedtime!', explanation: 'Hour hand points to 9' },
            { time: '12:00', description: 'Twelve o\'clock', emoji: '🕛', activity: 'Noon or Midnight!', explanation: 'Both hands point up' }
          ]
        },
        {
          type: 'Daily Schedule',
          activities: [
            { time: '7:00 AM', activity: 'Wake up', emoji: '🌅', description: 'Start of the day' },
            { time: '8:00 AM', activity: 'Breakfast', emoji: '🥞', description: 'Most important meal' },
            { time: '9:00 AM', activity: 'School starts', emoji: '🎒', description: 'Learning time' },
            { time: '12:00 PM', activity: 'Lunch', emoji: '🍽️', description: 'Midday meal' },
            { time: '3:00 PM', activity: 'School ends', emoji: '🚌', description: 'Time to go home' },
            { time: '6:00 PM', activity: 'Dinner', emoji: '🍝', description: 'Family meal time' },
            { time: '8:00 PM', activity: 'Bedtime story', emoji: '📚', description: 'Quiet time' },
            { time: '9:00 PM', activity: 'Sleep', emoji: '😴', description: 'Rest for tomorrow' }
          ]
        },
        {
          type: 'Time Games',
          games: [
            { name: 'What Time Is It?', description: 'Match clocks to activities', difficulty: 'Easy' },
            { name: 'Daily Routine', description: 'Put activities in time order', difficulty: 'Medium' },
            { name: 'Clock Master', description: 'Draw hands on blank clocks', difficulty: 'Hard' }
          ]
        }
      ]
    },
    money: {
      title: '💰 Money Math',
      description: 'Learn about coins, counting money, and making change',
      concepts: [
        {
          type: 'Coins',
          coins: [
            { coin: 'Penny', value: 1, emoji: '🪙', color: 'bg-orange-100', description: '1 cent - copper colored', front: 'Lincoln', back: 'Shield' },
            { coin: 'Nickel', value: 5, emoji: '🪙', color: 'bg-gray-100', description: '5 cents - silver colored', front: 'Jefferson', back: 'Monticello' },
            { coin: 'Dime', value: 10, emoji: '🪙', color: 'bg-gray-200', description: '10 cents - smallest silver coin', front: 'Roosevelt', back: 'Torch' },
            { coin: 'Quarter', value: 25, emoji: '🪙', color: 'bg-gray-300', description: '25 cents - largest common coin', front: 'Washington', back: 'Eagle' }
          ]
        },
        {
          type: 'Counting Money',
          examples: [
            { coins: ['🪙', '🪙', '🪙'], total: '3¢', description: '3 pennies = 3 cents' },
            { coins: ['🪙'], total: '5¢', description: '1 nickel = 5 cents' },
            { coins: ['🪙', '🪙', '🪙'], total: '15¢', description: '1 dime + 1 nickel = 15 cents' },
            { coins: ['🪙', '🪙', '🪙', '🪙'], total: '31¢', description: '1 quarter + 1 nickel + 1 penny = 31 cents' }
          ]
        },
        {
          type: 'Shopping Games',
          items: [
            { item: 'Candy', price: '25¢', emoji: '🍬', coins: ['1 quarter'] },
            { item: 'Sticker', price: '10¢', emoji: '⭐', coins: ['1 dime'] },
            { item: 'Small toy', price: '50¢', emoji: '🧸', coins: ['2 quarters'] },
            { item: 'Pencil', price: '15¢', emoji: '✏️', coins: ['1 dime + 1 nickel'] }
          ]
        },
        {
          type: 'Making Change',
          scenarios: [
            { item: 'Gum', cost: '15¢', paid: '25¢', change: '10¢', explanation: '25¢ - 15¢ = 10¢ change' },
            { item: 'Eraser', cost: '20¢', paid: '25¢', change: '5¢', explanation: '25¢ - 20¢ = 5¢ change' },
            { item: 'Stickers', cost: '35¢', paid: '50¢', change: '15¢', explanation: '50¢ - 35¢ = 15¢ change' }
          ]
        }
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
    }
  };

  const lessons = [
    { id: 'numbers', title: '🔢 Numbers & Counting', description: 'Master numbers from 1 to 100', color: 'gradient-blue', difficulty: 'Easy', duration: '15 min' },
    { id: 'addition', title: '➕ Addition Magic', description: 'Add numbers with fun visuals', color: 'gradient-green', difficulty: 'Easy', duration: '20 min' },
    { id: 'subtraction', title: '➖ Subtraction Fun', description: 'Take away numbers playfully', color: 'bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400', difficulty: 'Easy', duration: '20 min' },
    { id: 'multiplication', title: '✖️ Multiplication', description: 'Multiply with repeated addition', color: 'gradient-purple', difficulty: 'Medium', duration: '25 min' },
    { id: 'shapes', title: '🔷 Geometry Shapes', description: 'Discover shapes around us', color: 'gradient-orange', difficulty: 'Easy', duration: '18 min' },
    { id: 'patterns', title: '🎨 Patterns', description: 'Create and continue patterns', color: 'gradient-pink', difficulty: 'Medium', duration: '22 min' },
    { id: 'measurement', title: '📏 Measurement', description: 'Learn about size and weight', color: 'bg-gradient-to-r from-blue-300 via-indigo-200 to-cyan-100', difficulty: 'Medium', duration: '25 min' },
    { id: 'time', title: '⏰ Telling Time', description: 'Read clocks and understand time', color: 'bg-gradient-to-r from-green-300 via-emerald-400 to-teal-500', difficulty: 'Medium', duration: '25 min' },
    { id: 'money', title: '💰 Money Math', description: 'Count coins and make change', color: 'bg-gradient-to-r from-yellow-300 via-amber-200 to-orange-100', difficulty: 'Hard', duration: '30 min' },
    { id: 'fractions', title: '🍕 Fun Fractions', description: 'Learn about parts of whole', color: 'bg-gradient-to-r from-pink-300 via-rose-400 to-fuchsia-500', difficulty: 'Medium', duration: '20 min' }
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
            <div className="text-6xl mb-4 animate-bounce">{concept.emoji}</div>
            <h3 className="font-fredoka text-2xl font-bold text-gray-800 mb-2">Numbers {concept.range}</h3>
          </div>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-4">
            {concept.items.map((number) => (
              <div key={number} className="bg-white p-4 rounded-xl text-center hover:scale-110 transition-transform cursor-pointer shadow-md">
                <div className="font-fredoka text-2xl font-bold text-purple-600 mb-2">{number}</div>
                <div className="text-sm">
                  {Array.from({ length: Math.min(number, 5) }, (_, i) => '⭐').join('')}
                </div>
              </div>
            ))}
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
          <div className="font-comic text-gray-600 text-sm">
            {prob.explanation}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderShapesLesson = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {mathConcepts.shapes.shapes.map((shape, index) => (
        <Card key={shape.name} className={`p-8 text-center ${shape.color} rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-8xl mb-4 animate-bounce">
            {shape.emoji}
          </div>
          <div className="font-fredoka text-2xl font-bold text-gray-800 mb-2">
            {shape.name}
          </div>
          <div className="font-comic text-lg text-gray-700 mb-2">
            {shape.sides > 0 ? `${shape.sides} sides` : 'No sides'}
          </div>
          <div className="font-comic text-sm text-gray-600 bg-white bg-opacity-70 p-3 rounded-lg mb-3">
            {shape.description}
          </div>
          <div className="font-comic text-xs text-gray-700 bg-white bg-opacity-50 p-2 rounded-lg">
            Examples: {shape.examples}
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPatternsLesson = () => (
    <div className="grid md:grid-cols-2 gap-8">
      {mathConcepts.patterns.patterns.map((pattern, index) => (
        <Card key={pattern.type} className="p-8 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-center mb-6">
            <h3 className="font-fredoka text-2xl font-bold text-purple-700 mb-2">{pattern.type} Pattern</h3>
            <p className="font-comic text-gray-600">{pattern.description}</p>
          </div>
          <div className="flex items-center justify-center space-x-2 mb-6 bg-white p-4 rounded-xl">
            {pattern.sequence.map((item, i) => (
              <div key={i} className="text-4xl animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}>
                {item}
              </div>
            ))}
            <div className="text-2xl text-gray-400">→</div>
            <div className="text-4xl border-2 border-dashed border-purple-400 p-2 rounded-lg bg-purple-50">
              ?
            </div>
          </div>
          <div className="text-center">
            <Button 
              className="gradient-purple text-white font-comic font-bold"
              onClick={() => alert(`Next is: ${pattern.next}`)}
            >
              Show Answer
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderMeasurementLesson = () => (
    <div className="space-y-8">
      {mathConcepts.measurement.concepts.map((concept, index) => (
        <Card key={concept.type} className="p-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{concept.emoji}</div>
            <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">{concept.type}</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {concept.examples.map((example, i) => (
              <div key={i} className="bg-white p-6 rounded-xl text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">{example.visual}</div>
                <div className="font-fredoka text-lg font-bold text-gray-800">{example.item}</div>
                <div className="font-comic text-purple-600 font-bold">{example.length || example.weight || example.capacity}</div>
                <div className="font-comic text-sm text-gray-600">{example.comparison}</div>
              </div>
            ))}
          </div>

          <div className="bg-yellow-100 p-4 rounded-xl">
            <h4 className="font-fredoka font-bold text-lg text-yellow-800 mb-3">Try These Activities:</h4>
            <ul className="font-comic text-yellow-700 space-y-1">
              {concept.activities.map((activity, i) => (
                <li key={i}>• {activity}</li>
              ))}
            </ul>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTimeLesson = () => (
    <div className="space-y-8">
      {mathConcepts.time.concepts.map((concept, index) => (
        <Card key={index} className="p-8 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          {concept.times && (
            <>
              <div className="text-center mb-6">
                <Clock className="w-16 h-16 mx-auto text-blue-600 mb-4" />
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Clock Reading</h3>
              </div>
              <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                {concept.times.map((timeItem, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl text-center hover:scale-110 transition-transform cursor-pointer shadow-md">
                    <div className="text-4xl mb-3 animate-pulse">{timeItem.emoji}</div>
                    <div className="font-fredoka text-xl font-bold text-blue-600 mb-2">{timeItem.time}</div>
                    <div className="font-comic text-sm text-gray-700 mb-2">{timeItem.description}</div>
                    <div className="font-comic text-xs text-purple-600 font-bold">{timeItem.activity}</div>
                    <div className="font-comic text-xs text-gray-500 mt-2">{timeItem.explanation}</div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {concept.activities && (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Daily Schedule</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {concept.activities.map((activity, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="text-3xl text-center mb-2">{activity.emoji}</div>
                    <div className="font-fredoka font-bold text-center text-blue-600">{activity.time}</div>
                    <div className="font-comic text-center text-gray-800 font-bold">{activity.activity}</div>
                    <div className="font-comic text-xs text-center text-gray-600">{activity.description}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {concept.games && (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎮</div>
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Time Games</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {concept.games.map((game, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl text-center hover:scale-105 transition-transform cursor-pointer">
                    <div className="font-fredoka text-lg font-bold text-purple-600 mb-2">{game.name}</div>
                    <div className="font-comic text-gray-700 mb-3">{game.description}</div>
                    <Badge className={`${game.difficulty === 'Easy' ? 'bg-green-100 text-green-700' : game.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );

  const renderMoneyLesson = () => (
    <div className="space-y-8">
      {mathConcepts.money.concepts.map((concept, index) => (
        <Card key={index} className="p-8 bg-gradient-to-br from-yellow-100 to-green-100 rounded-2xl shadow-lg animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          {concept.coins && (
            <>
              <div className="text-center mb-6">
                <Coins className="w-16 h-16 mx-auto text-yellow-600 mb-4" />
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Learn About Coins</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {concept.coins.map((coin, i) => (
                  <div key={i} className={`${coin.color} p-6 rounded-xl text-center hover:scale-110 transition-transform cursor-pointer shadow-md border-2 border-yellow-300`}>
                    <div className="text-5xl mb-3">{coin.emoji}</div>
                    <div className="font-fredoka text-xl font-bold text-gray-800 mb-2">{coin.coin}</div>
                    <div className="font-comic text-2xl font-bold text-green-600 mb-2">{coin.value}¢</div>
                    <div className="font-comic text-sm text-gray-700 mb-2">{coin.description}</div>
                    <div className="font-comic text-xs text-gray-600">
                      Front: {coin.front}<br/>Back: {coin.back}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {concept.examples && (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🧮</div>
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Counting Money</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {concept.examples.map((example, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                      {example.coins.map((coin, j) => (
                        <div key={j} className="text-3xl">{coin}</div>
                      ))}
                    </div>
                    <div className="text-center">
                      <div className="font-fredoka text-2xl font-bold text-green-600 mb-2">{example.total}</div>
                      <div className="font-comic text-gray-700">{example.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {concept.items && (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🛍️</div>
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Shopping Practice</h3>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {concept.items.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl text-center hover:scale-105 transition-transform border-2 border-green-300">
                    <div className="text-4xl mb-3">{item.emoji}</div>
                    <div className="font-fredoka text-lg font-bold text-gray-800 mb-2">{item.item}</div>
                    <div className="font-comic text-xl font-bold text-green-600 mb-2">{item.price}</div>
                    <div className="font-comic text-sm text-gray-700">
                      Pay with: {item.coins.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {concept.scenarios && (
            <>
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">💸</div>
                <h3 className="font-fredoka text-3xl font-bold text-gray-800">Making Change</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {concept.scenarios.map((scenario, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl hover:shadow-lg transition-shadow border-2 border-blue-300">
                    <div className="text-center mb-4">
                      <div className="font-fredoka text-lg font-bold text-gray-800">{scenario.item}</div>
                      <div className="font-comic text-sm text-gray-600">Cost: {scenario.cost}</div>
                      <div className="font-comic text-sm text-gray-600">Paid: {scenario.paid}</div>
                    </div>
                    <div className="text-center bg-blue-50 p-3 rounded-lg">
                      <div className="font-fredoka text-xl font-bold text-blue-600">Change: {scenario.change}</div>
                      <div className="font-comic text-xs text-blue-700 mt-2">{scenario.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      ))}
    </div>
  );

  const renderFractionsLesson = () => (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {mathConcepts.fractions.fractions.map((fraction, index) => (
        <Card key={fraction.fraction} className="p-8 text-center bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
          <div className="text-8xl mb-4 animate-bounce">
            {fraction.emoji}
          </div>
          <div className="font-fredoka text-3xl font-bold text-orange-600 mb-2">
            {fraction.fraction}
          </div>
          <div className="font-comic text-gray-600 bg-white bg-opacity-70 p-3 rounded-lg">
            {fraction.description}
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
            <div className="mt-4">
              <Button 
                onClick={() => completeLesson(selectedLesson)}
                className="gradient-green text-white font-comic font-bold"
                disabled={completedTopics.includes(selectedLesson)}
              >
                {completedTopics.includes(selectedLesson) ? (
                  <>
                    <Trophy className="w-4 h-4 mr-2" />
                    Completed!
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4 mr-2" />
                    Complete Lesson
                  </>
                )}
              </Button>
            </div>
          </div>

          {selectedLesson === 'numbers' && renderNumbersLesson()}
          {selectedLesson === 'addition' && renderOperationLesson('addition', mathConcepts.addition.problems, Plus)}
          {selectedLesson === 'subtraction' && renderOperationLesson('subtraction', mathConcepts.subtraction.problems, Minus)}
          {selectedLesson === 'multiplication' && renderOperationLesson('multiplication', mathConcepts.multiplication.problems, X)}
          {selectedLesson === 'shapes' && renderShapesLesson()}
          {selectedLesson === 'patterns' && renderPatternsLesson()}
          {selectedLesson === 'measurement' && renderMeasurementLesson()}
          {selectedLesson === 'time' && renderTimeLesson()}
          {selectedLesson === 'money' && renderMoneyLesson()}
          {selectedLesson === 'fractions' && renderFractionsLesson()}
        </div>
      </div>
    );
  }

  // ... keep existing code (main lesson selection screen)

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
            Explore the magical world of mathematics! Learn numbers, operations, shapes, patterns, time, money and much more with colorful visuals and interactive activities.
          </p>
          <div className="mt-6">
            <Badge className="bg-blue-100 text-blue-700 font-comic font-bold px-4 py-2 text-lg">
              Progress: {completedTopics.length}/{lessons.length} Topics Completed
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, index) => (
            <Card key={lesson.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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
                <Badge className={`font-comic ${
                  lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="font-comic text-sm text-gray-600">{lesson.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">
                    {lesson.difficulty === 'Easy' ? '10' : lesson.difficulty === 'Medium' ? '15' : '20'} stars
                  </span>
                </div>
                {completedTopics.includes(lesson.id) && (
                  <Badge className="bg-green-100 text-green-700 font-comic">
                    <BookOpen className="w-3 h-3 mr-1" />
                    Mastered
                  </Badge>
                )}
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                {completedTopics.includes(lesson.id) ? 'Review' : 'Start Learning'}
              </Button>
            </Card>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 text-center">
          <Card className="p-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl shadow-lg max-w-2xl mx-auto">
            <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-4">🏆 Your Math Journey</h3>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-purple-600">
                  {completedTopics.length}
                </div>
                <div className="font-comic text-purple-600">Topics Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-blue-600">
                  {Math.round((completedTopics.length / lessons.length) * 100)}%
                </div>
                <div className="font-comic text-blue-600">Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-fredoka font-bold text-green-600">
                  {completedTopics.reduce((total, topic) => {
                    const lesson = lessons.find(l => l.id === topic);
                    return total + (lesson?.difficulty === 'Easy' ? 10 : lesson?.difficulty === 'Medium' ? 15 : 20);
                  }, 0)}
                </div>
                <div className="font-comic text-green-600">Stars Earned</div>
              </div>
            </div>
            <div className="mt-6 bg-white bg-opacity-70 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-1000"
                style={{ width: `${(completedTopics.length / lessons.length) * 100}%` }}
              />
            </div>
          </Card>
        </div>
      </div>

      {showCompletion && (
        <GameCompletionPopup
          score={completionData.score}
          stars={completionData.stars}
          gameName={completionData.gameName}
          isOpen={showCompletion}
          onClose={() => setShowCompletion(false)}
        />
      )}
    </div>
  );
};

export default EnhancedMathAdventure;