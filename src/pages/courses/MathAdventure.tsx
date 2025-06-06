
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import GameCompletionPopup from '@/components/GameCompletionPopup';

const MathAdventure = () => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCompletion, setShowCompletion] = useState(false);

  const topics = [
    {
      id: 1,
      title: 'Numbers 1-20',
      icon: '🔢',
      description: 'Learn to count and recognize numbers',
      slides: [
        {
          title: 'Number 1',
          content: 'This is number ONE! Count the apple: 🍎',
          visual: '1️⃣',
          animation: 'bounce',
          example: '🍎'
        },
        {
          title: 'Number 2', 
          content: 'This is number TWO! Count the cats: 🐱🐱',
          visual: '2️⃣',
          animation: 'scale',
          example: '🐱🐱'
        },
        {
          title: 'Number 3',
          content: 'This is number THREE! Count the stars: ⭐⭐⭐', 
          visual: '3️⃣',
          animation: 'bounce',
          example: '⭐⭐⭐'
        },
        {
          title: 'Number 4',
          content: 'This is number FOUR! Count the flowers: 🌸🌸🌸🌸', 
          visual: '4️⃣',
          animation: 'pulse',
          example: '🌸🌸🌸🌸'
        },
        {
          title: 'Number 5',
          content: 'This is number FIVE! Count the balloons: 🎈🎈🎈🎈🎈', 
          visual: '5️⃣',
          animation: 'bounce',
          example: '🎈🎈🎈🎈🎈'
        }
      ]
    },
    {
      id: 2,
      title: 'Addition Magic',
      icon: '➕',
      description: 'Learn to add numbers together',
      slides: [
        {
          title: '1 + 1 = 2',
          content: 'One apple plus one apple equals two apples!',
          visual: '🍎 + 🍎 = 🍎🍎',
          animation: 'slide',
          example: '1 + 1 = 2'
        },
        {
          title: '2 + 1 = 3',
          content: 'Two birds plus one bird equals three birds!',
          visual: '🐦🐦 + 🐦 = 🐦🐦🐦',
          animation: 'bounce',
          example: '2 + 1 = 3'
        },
        {
          title: '2 + 2 = 4',
          content: 'Two cars plus two cars equals four cars!',
          visual: '🚗🚗 + 🚗🚗 = 🚗🚗🚗🚗',
          animation: 'scale',
          example: '2 + 2 = 4'
        },
        {
          title: '3 + 2 = 5',
          content: 'Three hearts plus two hearts equals five hearts!',
          visual: '❤️❤️❤️ + ❤️❤️ = ❤️❤️❤️❤️❤️',
          animation: 'pulse',
          example: '3 + 2 = 5'
        }
      ]
    },
    {
      id: 3,
      title: 'Subtraction Fun',
      icon: '➖',
      description: 'Learn to subtract numbers',
      slides: [
        {
          title: '3 - 1 = 2',
          content: 'Three cookies, eat one, two remain!',
          visual: '🍪🍪🍪 - 🍪 = 🍪🍪',
          animation: 'fade',
          example: '3 - 1 = 2'
        },
        {
          title: '5 - 2 = 3',
          content: 'Five bananas, eat two, three left!',
          visual: '🍌🍌🍌🍌🍌 - 🍌🍌 = 🍌🍌🍌',
          animation: 'scale',
          example: '5 - 2 = 3'
        },
        {
          title: '4 - 3 = 1',
          content: 'Four toys, give away three, one remains!',
          visual: '🧸🧸🧸🧸 - 🧸🧸🧸 = 🧸',
          animation: 'bounce',
          example: '4 - 3 = 1'
        }
      ]
    },
    {
      id: 4,
      title: 'Shape Kingdom',
      icon: '🔷',
      description: 'Discover magical shapes',
      slides: [
        {
          title: 'Circle',
          content: 'A circle is perfectly round like the sun!',
          visual: '🟡',
          animation: 'spin',
          example: 'Sun ☀️, Ball ⚽, Coin 🪙'
        },
        {
          title: 'Square',
          content: 'A square has four equal sides like a window!',
          visual: '🟦',
          animation: 'bounce',
          example: 'Window 🪟, Box 📦, Dice 🎲'
        },
        {
          title: 'Triangle',
          content: 'A triangle has three sides like a mountain!',
          visual: '🔺',
          animation: 'wobble',
          example: 'Mountain ⛰️, Roof 🏠, Pizza slice 🍕'
        },
        {
          title: 'Rectangle',
          content: 'A rectangle is like a stretched square!',
          visual: '📱',
          animation: 'pulse',
          example: 'Phone 📱, Book 📖, Door 🚪'
        }
      ]
    },
    {
      id: 5,
      title: 'Pattern Puzzles',
      icon: '🧩',
      description: 'Find and create amazing patterns',
      slides: [
        {
          title: 'Color Patterns',
          content: 'Red, Blue, Red, Blue - what comes next?',
          visual: '🔴🔵🔴🔵❓',
          animation: 'bounce',
          example: 'Answer: 🔴 (Red)'
        },
        {
          title: 'Shape Patterns',
          content: 'Circle, Square, Circle, Square - continue!',
          visual: '⭕🔲⭕🔲❓',
          animation: 'scale',
          example: 'Answer: ⭕ (Circle)'
        },
        {
          title: 'Number Patterns',
          content: '1, 2, 3, 4 - what number is next?',
          visual: '1️⃣2️⃣3️⃣4️⃣❓',
          animation: 'pulse',
          example: 'Answer: 5️⃣ (Five)'
        }
      ]
    },
    {
      id: 6,
      title: 'Size & Comparison',
      icon: '📏',
      description: 'Learn about big, small, tall, and short',
      slides: [
        {
          title: 'Big vs Small',
          content: 'The elephant is BIG, the mouse is SMALL!',
          visual: '🐘 vs 🐭',
          animation: 'scale',
          example: 'Big: 🐘🏠🌳 Small: 🐭🐛🌸'
        },
        {
          title: 'Tall vs Short',
          content: 'The giraffe is TALL, the dog is SHORT!',
          visual: '🦒 vs 🐕',
          animation: 'bounce',
          example: 'Tall: 🦒🌲🏢 Short: 🐕🌿🏘️'
        },
        {
          title: 'Long vs Short',
          content: 'The snake is LONG, the caterpillar is SHORT!',
          visual: '🐍 vs 🐛',
          animation: 'slide',
          example: 'Long: 🐍🚂📏 Short: 🐛✏️📎'
        }
      ]
    }
  ];

  const currentTopicData = topics[currentTopic];
  const currentSlideData = currentTopicData?.slides[currentSlide];

  const nextSlide = () => {
    if (currentSlide < currentTopicData.slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      completeTopic();
    }
  };

  const completeTopic = () => {
    if (!completedTopics.includes(currentTopic)) {
      setCompletedTopics([...completedTopics, currentTopic]);
    }
    
    if (currentTopic < topics.length - 1) {
      setCurrentTopic(currentTopic + 1);
      setCurrentSlide(0);
    } else {
      // All topics completed - show completion popup
      setShowCompletion(true);
    }
  };

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

        <div className="text-center mb-8">
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🧮 Math Adventure
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Join us on an exciting mathematical journey through numbers, shapes, and patterns!
          </p>
        </div>

        {/* Topic Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {topics.map((topic, index) => (
            <Card 
              key={topic.id}
              className={`p-4 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                currentTopic === index 
                  ? 'bg-gradient-to-br from-blue-100 to-purple-100 border-blue-300' 
                  : completedTopics.includes(index)
                  ? 'bg-gradient-to-br from-green-100 to-emerald-100 border-green-300'
                  : 'bg-white border-gray-200'
              }`}
              onClick={() => {
                setCurrentTopic(index);
                setCurrentSlide(0);
              }}
            >
              <div className="text-center">
                <div className="text-3xl mb-2 animate-bounce">
                  {topic.icon}
                </div>
                <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-1">
                  {topic.title}
                </h3>
                <p className="font-comic text-sm text-gray-600">
                  {topic.description}
                </p>
                {completedTopics.includes(index) && (
                  <CheckCircle className="w-6 h-6 text-green-500 mx-auto mt-2" />
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Current Lesson */}
        {currentSlideData && (
          <Card className="p-8 bg-white rounded-2xl shadow-lg mb-8">
            <div className="text-center">
              <h2 className="font-fredoka font-bold text-3xl text-gray-800 mb-4">
                {currentSlideData.title}
              </h2>
              
              <div className={`text-6xl mb-6 animate-${currentSlideData.animation}`}>
                {currentSlideData.visual}
              </div>
              
              <p className="font-comic text-xl text-gray-700 mb-6">
                {currentSlideData.content}
              </p>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 rounded-xl p-4 mb-6">
                <p className="font-comic text-lg text-gray-800 mb-2">Example:</p>
                <div className="text-2xl">{currentSlideData.example}</div>
              </div>
              
              <div className="flex justify-between items-center">
                <Badge variant="outline" className="font-comic">
                  {currentSlide + 1} of {currentTopicData.slides.length}
                </Badge>
                
                <Button 
                  onClick={nextSlide}
                  className="gradient-blue text-white font-comic font-bold px-8 py-3 rounded-full hover:scale-105 transition-transform"
                >
                  <Play className="w-4 h-4 mr-2" />
                  {currentSlide < currentTopicData.slides.length - 1 ? 'Next' : 'Complete Topic'}
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Progress */}
        <Card className="p-6 bg-gradient-to-r from-yellow-100 to-orange-100">
          <div className="text-center">
            <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-4">
              Your Progress
            </h3>
            <Progress value={(completedTopics.length / topics.length) * 100} className="mb-4" />
            <p className="font-comic text-gray-700">
              {completedTopics.length} of {topics.length} topics completed
            </p>
            {completedTopics.length === topics.length && (
              <div className="mt-4">
                <Badge className="gradient-green text-white font-comic font-bold px-4 py-2">
                  <Star className="w-4 h-4 mr-2" />
                  Course Completed! +100 Stars
                </Badge>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Game Completion Popup */}
      <GameCompletionPopup
        isOpen={showCompletion}
        onClose={() => {
          setShowCompletion(false);
          navigate('/courses');
        }}
        score={100}
        stars={100}
        gameName="Math Adventure Course"
      />
    </div>
  );
};

export default MathAdventure;
