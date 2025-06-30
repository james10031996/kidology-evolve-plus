
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Star, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const NatureExplorer = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const natureTopics = [
    {
      id: 'forest-friends',
      title: '🌲 Forest Friends',
      description: 'Meet the amazing animals and plants that live in the forest!',
      color: 'gradient-green',
      lessons: [
        {
          title: 'Woodland Animals',
          content: 'Squirrels, rabbits, deer, and many birds make their homes in the forest!',
          funFact: 'Squirrels can remember where they hide over 1000 nuts!',
          activity: 'Go outside and look for animal tracks or homes!'
        },
        {
          title: 'Forest Trees',
          content: 'Trees are the homes and food sources for many forest animals!',
          funFact: 'One big tree can give oxygen to 4 people for a whole day!',
          activity: 'Hug a tree and listen to the sounds of the forest!'
        }
      ]
    },
    {
      id: 'garden-wonders',
      title: '🌺 Garden Wonders',
      description: 'Discover the colorful world of flowers, vegetables, and garden creatures!',
      color: 'gradient-pink',
      lessons: [
        {
          title: 'Beautiful Flowers',
          content: 'Flowers come in all colors and help feed bees and butterflies!',
          funFact: 'Sunflowers can grow as tall as grown-ups!',
          activity: 'Plant a seed and water it every day!'
        },
        {
          title: 'Helpful Bugs',
          content: 'Many bugs help plants grow by moving pollen from flower to flower!',
          funFact: 'Bees visit about 2 million flowers to make one pound of honey!',
          activity: 'Watch a bee or butterfly visit flowers in your garden!'
        }
      ]
    },
    {
      id: 'water-world',
      title: '🏞️ Water World',
      description: 'Explore ponds, rivers, and lakes to find amazing water creatures!',
      color: 'gradient-blue',
      lessons: [
        {
          title: 'Pond Life',
          content: 'Ponds are full of frogs, fish, ducks, and tiny water bugs!',
          funFact: 'Frogs can breathe through their skin as well as their lungs!',
          activity: 'Visit a pond and count how many different animals you see!'
        },
        {
          title: 'River Adventures',
          content: 'Rivers flow and carry leaves, feed fish, and give water to all living things!',
          funFact: 'Some rivers are so long they flow through many different countries!',
          activity: 'Float a leaf down a stream and watch where it goes!'
        }
      ]
    },
    {
      id: 'sky-watchers',
      title: '☁️ Sky Watchers',
      description: 'Look up and discover the wonders of clouds, birds, and weather!',
      color: 'gradient-purple',
      lessons: [
        {
          title: 'Cloud Shapes',
          content: 'Clouds make different shapes in the sky - some look like animals or objects!',
          funFact: 'Clouds are made of tiny water droplets floating in the air!',
          activity: 'Lie on your back and find shapes in the clouds!'
        },
        {
          title: 'Flying Friends',
          content: 'Birds fly in the sky and some travel very far to find warm places to live!',
          funFact: 'Some birds fly thousands of miles without stopping!',
          activity: 'Count different types of birds you see in the sky!'
        }
      ]
    }
  ];

  const startTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    updateStars(18);
    updateProgress('Nature', 12);
  };

  if (selectedTopic) {
    const topic = natureTopics.find(t => t.id === selectedTopic);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
        <Header />
        
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedTopic(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
            </Button>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
              {topic?.title}
            </h1>
            <p className="font-comic text-lg text-gray-600">
              {topic?.description}
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8">
            {topic?.lessons.map((lesson, index) => (
              <Card key={index} className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                <h3 className="font-fredoka text-2xl font-bold text-green-700 mb-4">
                  {lesson.title}
                </h3>
                
                <div className="bg-green-50 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🌿 Nature's Story:</h4>
                  <p className="font-comic text-gray-700 text-lg">{lesson.content}</p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🔍 Nature Fact:</h4>
                  <p className="font-comic text-gray-700">{lesson.funFact}</p>
                </div>

                <div className="bg-blue-100 p-6 rounded-xl">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🎒 Nature Quest:</h4>
                  <p className="font-comic text-gray-700">{lesson.activity}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

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
          <h1 className="font-fredoka font-bold text-4xl text-gray-800 mb-4">
            🌿 Nature Explorer
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Step outside and discover the amazing world of nature! Learn about plants, animals, and the environment around us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {natureTopics.map((topic, index) => (
            <Card key={topic.id} className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`w-full h-32 ${topic.color} rounded-xl mb-4 flex items-center justify-center`}>
                <div className="text-4xl text-white animate-bounce">
                  {topic.title.split(' ')[0]}
                </div>
              </div>

              <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                {topic.title}
              </h3>
              <p className="font-comic text-gray-600 text-sm mb-4">
                {topic.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-green-100 text-green-700 font-comic">
                  Nature Study
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">18 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${topic.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startTopic(topic.id)}
              >
                <Leaf className="w-4 h-4 mr-2" />
                Explore Nature
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NatureExplorer;
