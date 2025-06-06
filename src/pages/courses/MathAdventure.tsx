
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Play, Star, CheckCircle, Brain, Calculator, Shapes, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const MathAdventure = () => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState(0);
  const [completedTopics, setCompletedTopics] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const topics = [
    {
      id: 1,
      title: 'Numbers 1-20',
      icon: '🔢',
      description: 'Learn to count and recognize numbers',
      slides: [
        {
          title: 'Number 1',
          content: 'This is number ONE! 🎈',
          visual: '🎈',
          animation: 'bounce'
        },
        {
          title: 'Number 2', 
          content: 'This is number TWO! 🎈🎈',
          visual: '🎈🎈',
          animation: 'scale'
        },
        {
          title: 'Number 3',
          content: 'This is number THREE! 🎈🎈🎈', 
          visual: '🎈🎈🎈',
          animation: 'bounce'
        }
      ]
    },
    {
      id: 2,
      title: 'Addition Basics',
      icon: '➕',
      description: 'Learn to add numbers together',
      slides: [
        {
          title: '1 + 1 = 2',
          content: 'One apple plus one apple equals two apples!',
          visual: '🍎 + 🍎 = 🍎🍎',
          animation: 'slide'
        },
        {
          title: '2 + 2 = 4',
          content: 'Two cats plus two cats equals four cats!',
          visual: '🐱🐱 + 🐱🐱 = 🐱🐱🐱🐱',
          animation: 'bounce'
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
          content: 'Three birds, one flies away, two remain!',
          visual: '🐦🐦🐦 - 🐦 = 🐦🐦',
          animation: 'fade'
        },
        {
          title: '5 - 2 = 3',
          content: 'Five cookies, eat two, three left!',
          visual: '🍪🍪🍪🍪🍪 - 🍪🍪 = 🍪🍪🍪',
          animation: 'scale'
        }
      ]
    },
    {
      id: 4,
      title: 'Basic Shapes',
      icon: '🔷',
      description: 'Learn about circles, squares, and triangles',
      slides: [
        {
          title: 'Circle',
          content: 'A circle is round like a ball! 🔵',
          visual: '🔵',
          animation: 'spin'
        },
        {
          title: 'Square',
          content: 'A square has four equal sides! 🟦',
          visual: '🟦',
          animation: 'bounce'
        },
        {
          title: 'Triangle',
          content: 'A triangle has three sides! 🔺',
          visual: '🔺',
          animation: 'wobble'
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
            Join us on an exciting mathematical journey!
          </p>
        </div>

        {/* Topic Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              
              <p className="font-comic text-xl text-gray-700 mb-8">
                {currentSlideData.content}
              </p>
              
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
    </div>
  );
};

export default MathAdventure;
