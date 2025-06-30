
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Star, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const SocialMoral = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const socialTopics = [
    {
      id: 'kindness',
      title: '💝 Being Kind',
      description: 'Learn how small acts of kindness make the world brighter!',
      color: 'gradient-pink',
      lessons: [
        {
          title: 'Magic Words',
          content: 'Please, thank you, and sorry are magic words that make people smile!',
          funFact: 'Saying "thank you" makes both you and others feel happy!',
          activity: 'Practice saying magic words to your family today!'
        },
        {
          title: 'Helping Hands',
          content: 'When we help others, we feel good and make their day better too!',
          funFact: 'Helping others actually makes your brain release happy chemicals!',
          activity: 'Help someone at home with a small task today!'
        }
      ]
    },
    {
      id: 'sharing',
      title: '🤝 Sharing is Caring',
      description: 'Discover the joy of sharing with friends and family!',
      color: 'gradient-blue',
      lessons: [
        {
          title: 'Sharing Toys',
          content: 'When we share our toys, we make new friends and have more fun!',
          funFact: 'Sharing makes playtime twice as fun because you laugh together!',
          activity: 'Share your favorite toy with a friend today!'
        },
        {
          title: 'Sharing Food',
          content: 'Sharing snacks and meals brings people together and shows we care!',
          funFact: 'Many cultures believe sharing food creates special bonds!',
          activity: 'Share your snack with someone special!'
        }
      ]
    },
    {
      id: 'emotions',
      title: '😊 Understanding Feelings',
      description: 'Learn about different emotions and how to express them!',
      color: 'gradient-green',
      lessons: [
        {
          title: 'Happy Feelings',
          content: 'It\'s wonderful to feel happy! We can share our joy with others through smiles!',
          funFact: 'Smiling uses fewer muscles than frowning!',
          activity: 'Draw a picture of something that makes you happy!'
        },
        {
          title: 'Sad Feelings',
          content: 'It\'s okay to feel sad sometimes. Talking about it helps us feel better!',
          funFact: 'Crying actually helps your body feel better - it\'s like a natural healer!',
          activity: 'Tell someone you trust about a time you felt sad!'
        }
      ]
    },
    {
      id: 'friendship',
      title: '👫 Making Friends',
      description: 'Learn how to be a good friend and make new friendships!',
      color: 'gradient-purple',
      lessons: [
        {
          title: 'Being a Good Friend',
          content: 'Good friends are kind, share, listen, and help each other!',
          funFact: 'Friendships help us live longer and happier lives!',
          activity: 'Do something nice for a friend today!'
        },
        {
          title: 'Making New Friends',
          content: 'We can make new friends by being kind, sharing, and including others!',
          funFact: 'The best way to make a friend is to be a friend first!',
          activity: 'Say hello to someone new and ask them to play!'
        }
      ]
    }
  ];

  const startTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    updateStars(15);
    updateProgress('Social', 8);
  };

  if (selectedTopic) {
    const topic = socialTopics.find(t => t.id === selectedTopic);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
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
                <h3 className="font-fredoka text-2xl font-bold text-pink-700 mb-4">
                  {lesson.title}
                </h3>
                
                <div className="bg-pink-50 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">💭 Let's Learn:</h4>
                  <p className="font-comic text-gray-700 text-lg">{lesson.content}</p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🌟 Amazing Fact:</h4>
                  <p className="font-comic text-gray-700">{lesson.funFact}</p>
                </div>

                <div className="bg-green-100 p-6 rounded-xl">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🎯 Your Mission:</h4>
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
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
            ❤️ Social & Moral Learning
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Learn about kindness, friendship, sharing, and understanding feelings to become the best version of yourself!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {socialTopics.map((topic, index) => (
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
                <Badge className="bg-pink-100 text-pink-700 font-comic">
                  Social Skills
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">15 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${topic.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startTopic(topic.id)}
              >
                <Heart className="w-4 h-4 mr-2" />
                Start Learning
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialMoral;
