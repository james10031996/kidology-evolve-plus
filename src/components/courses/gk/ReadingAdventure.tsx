
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, BookOpen, Star, Volume2, Eye, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const ReadingAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'single'>('overview');

  const alphabets = [
    { letter: 'A', examples: ['Apple', 'Ant'], singleViewExamples: ['Apple', 'Ant', 'Airplane', 'Alligator', 'Astronaut'] },
    { letter: 'B', examples: ['Ball', 'Bear'], singleViewExamples: ['Ball', 'Bear', 'Butterfly', 'Banana', 'Bicycle'] },
    { letter: 'C', examples: ['Cat', 'Car'], singleViewExamples: ['Cat', 'Car', 'Cookie', 'Castle', 'Crayons'] },
    { letter: 'D', examples: ['Dog', 'Duck'], singleViewExamples: ['Dog', 'Duck', 'Dinosaur', 'Drum', 'Dolphin'] },
    { letter: 'E', examples: ['Elephant', 'Egg'], singleViewExamples: ['Elephant', 'Egg', 'Eagle', 'Engine', 'Elf'] }
  ];

  const vocabulary = {
    colors: ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Black', 'White', 'Gray', 'Violet', 'Turquoise', 'Maroon', 'Gold', 'Silver', 'Cyan', 'Magenta', 'Lime', 'Coral'],
    bodyParts: ['Head', 'Eyes', 'Nose', 'Mouth', 'Ears', 'Hair', 'Arms', 'Hands', 'Fingers', 'Legs', 'Feet', 'Toes', 'Back', 'Chest', 'Stomach', 'Neck', 'Shoulders', 'Knees', 'Elbows', 'Face'],
    animals: ['Dog', 'Cat', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Rabbit', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat', 'Deer', 'Fox', 'Wolf', 'Monkey', 'Giraffe', 'Zebra', 'Hippo', 'Rhino'],
    birds: ['Eagle', 'Sparrow', 'Robin', 'Owl', 'Duck', 'Swan', 'Peacock', 'Parrot', 'Crow', 'Pigeon', 'Flamingo', 'Penguin', 'Ostrich', 'Turkey', 'Chicken', 'Rooster', 'Hummingbird', 'Cardinal', 'Blue Jay', 'Hawk'],
    fruits: ['Apple', 'Banana', 'Orange', 'Grape', 'Strawberry', 'Pineapple', 'Mango', 'Watermelon', 'Kiwi', 'Peach', 'Pear', 'Cherry', 'Plum', 'Apricot', 'Blueberry', 'Raspberry', 'Blackberry', 'Coconut', 'Papaya', 'Lemon'],
    vegetables: ['Carrot', 'Potato', 'Tomato', 'Onion', 'Lettuce', 'Broccoli', 'Spinach', 'Corn', 'Peas', 'Beans', 'Cucumber', 'Pepper', 'Cabbage', 'Celery', 'Radish', 'Beet', 'Turnip', 'Squash', 'Pumpkin', 'Eggplant'],
    furniture: ['Chair', 'Table', 'Bed', 'Sofa', 'Desk', 'Shelf', 'Cabinet', 'Dresser', 'Lamp', 'Mirror', 'Couch', 'Stool', 'Bench', 'Wardrobe', 'Bookcase', 'Nightstand', 'Ottoman', 'Armchair', 'Recliner', 'Loveseat'],
    relatives: ['Mother', 'Father', 'Sister', 'Brother', 'Grandmother', 'Grandfather', 'Aunt', 'Uncle', 'Cousin', 'Daughter', 'Son', 'Niece', 'Nephew', 'Stepmother', 'Stepfather', 'Stepsister', 'Stepbrother', 'Mother-in-law', 'Father-in-law', 'Sister-in-law']
  };

  const lessons = [
    { id: 'alphabets', title: '🔤 Learn Alphabets', description: 'Discover letters A-Z with fun examples', color: 'gradient-blue' },
    { id: 'colors', title: '🌈 Colors', description: 'Learn 20 beautiful colors', color: 'gradient-pink' },
    { id: 'body', title: '👤 Body Parts', description: 'Know your body from head to toe', color: 'gradient-green' },
    { id: 'animals', title: '🦁 Animals', description: 'Meet 20 amazing animals', color: 'gradient-orange' },
    { id: 'birds', title: '🦅 Birds', description: 'Fly with 20 beautiful birds', color: 'gradient-purple' },
    { id: 'fruits', title: '🍎 Fruits', description: 'Taste 20 delicious fruits', color: 'gradient-red' },
    { id: 'vegetables', title: '🥕 Vegetables', description: 'Grow with 20 healthy vegetables', color: 'gradient-green' },
    { id: 'furniture', title: '🪑 Furniture', description: 'Furnish your home with 20 items', color: 'gradient-brown' },
    { id: 'relatives', title: '👨‍👩‍👧‍👦 Family', description: 'Meet your family members', color: 'gradient-yellow' }
  ];

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(10);
    updateProgress('English', 5);
  };

  const getColorForWord = (word: string, category: string) => {
    const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-indigo-400', 'bg-teal-400'];
    const index = word.length % colors.length;
    return colors[index];
  };

  const renderAlphabetLesson = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center mb-6">
        <Button onClick={() => setViewMode('overview')} variant="outline" className="font-comic">
          Single View
        </Button>
        <Button onClick={() => setViewMode('single')} variant="outline" className="font-comic">
          Overview
        </Button>
      </div>

      {viewMode === 'overview' ? (
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {alphabets.map((alpha, index) => (
            <Card key={alpha.letter} className="p-6 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="text-6xl font-fredoka font-bold text-purple-600 mb-4 animate-bounce">
                {alpha.letter}
              </div>
              <div className="space-y-2">
                {alpha.examples.map((example, i) => (
                  <div key={i} className="font-comic text-lg text-gray-700 p-2 bg-purple-50 rounded-lg animate-pulse">
                    {example}
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {alphabets.map((alpha) => (
            <Card key={alpha.letter} className="p-8 text-center bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl shadow-lg">
              <div className="text-8xl font-fredoka font-bold text-purple-600 mb-6 animate-bounce">
                {alpha.letter}
              </div>
              <div className="grid grid-cols-1 gap-4">
                {alpha.singleViewExamples.map((example, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-md hover:scale-105 transition-transform">
                    <div className="text-2xl mb-2">🎯</div>
                    <div className="font-fredoka text-xl text-purple-700 mb-2">{example}</div>
                    <div className="font-comic text-sm text-gray-600">
                      A word that starts with {alpha.letter}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderVocabularyLesson = (category: string, words: string[], emoji: string) => (
    <div className="grid md:grid-cols-4 lg:grid-cols-5 gap-6">
      {words.map((word, index) => (
        <Card key={word} className="p-6 text-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
          <div className="text-4xl mb-4 animate-bounce">
            {emoji}
          </div>
          <div className={`${getColorForWord(word, category)} text-white font-fredoka font-bold text-lg p-3 rounded-xl mb-3 animate-pulse`}>
            {word}
          </div>
          <Button size="sm" variant="outline" className="font-comic">
            <Volume2 className="w-4 h-4 mr-2" />
            Listen
          </Button>
        </Card>
      ))}
    </div>
  );

  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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

          {selectedLesson === 'alphabets' && renderAlphabetLesson()}
          {selectedLesson === 'colors' && renderVocabularyLesson('colors', vocabulary.colors, '🌈')}
          {selectedLesson === 'body' && renderVocabularyLesson('body', vocabulary.bodyParts, '👤')}
          {selectedLesson === 'animals' && renderVocabularyLesson('animals', vocabulary.animals, '🦁')}
          {selectedLesson === 'birds' && renderVocabularyLesson('birds', vocabulary.birds, '🦅')}
          {selectedLesson === 'fruits' && renderVocabularyLesson('fruits', vocabulary.fruits, '🍎')}
          {selectedLesson === 'vegetables' && renderVocabularyLesson('vegetables', vocabulary.vegetables, '🥕')}
          {selectedLesson === 'furniture' && renderVocabularyLesson('furniture', vocabulary.furniture, '🪑')}
          {selectedLesson === 'relatives' && renderVocabularyLesson('relatives', vocabulary.relatives, '👨‍👩‍👧‍👦')}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
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
            📖 Reading Adventure Course
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Master English with alphabets, colors, vocabulary, and much more! Learn with vibrant visuals and interactive content.
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
                <Badge className="bg-purple-100 text-purple-700 font-comic">
                  Interactive
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
                <BookOpen className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingAdventure;
