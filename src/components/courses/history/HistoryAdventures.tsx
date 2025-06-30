
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Star, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';

const HistoryAdventures = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const historyTopics = [
    {
      id: 'dinosaurs',
      title: '🦕 Dinosaur Times',
      description: 'Meet the amazing dinosaurs that lived long, long ago!',
      color: 'gradient-green',
      lessons: [
        {
          title: 'T-Rex the King',
          content: 'T-Rex was the king of dinosaurs with big teeth and tiny arms!',
          funFact: 'T-Rex teeth were as big as bananas!',
          activity: 'Roar like a T-Rex and stomp around!'
        },
        {
          title: 'Gentle Giants',
          content: 'Some dinosaurs were huge but only ate plants, like the long-necked Brontosaurus!',
          funFact: 'Brontosaurus was as long as 3 school buses!',
          activity: 'Stretch your neck up high like a Brontosaurus!'
        }
      ]
    },
    {
      id: 'ancient-egypt',
      title: '🏺 Ancient Egypt',
      description: 'Discover the land of pharaohs, pyramids, and mummies!',
      color: 'gradient-orange',
      lessons: [
        {
          title: 'Amazing Pyramids',
          content: 'The Egyptians built huge pyramids that are still standing today!',
          funFact: 'The Great Pyramid took 20 years to build!',
          activity: 'Build your own pyramid with blocks!'
        },
        {
          title: 'Mummy Mysteries',
          content: 'Egyptians wrapped important people in cloth to keep them safe forever!',
          funFact: 'Some mummies still have their hair and fingernails!',
          activity: 'Wrap your teddy bear like a mummy!'
        }
      ]
    },
    {
      id: 'knights-castles',
      title: '🏰 Knights and Castles',
      description: 'Journey to medieval times with brave knights and tall castles!',
      color: 'gradient-purple',
      lessons: [
        {
          title: 'Brave Knights',
          content: 'Knights wore heavy metal armor and rode horses to protect people!',
          funFact: 'A knight\'s armor weighed as much as a big dog!',
          activity: 'Pretend to be a knight and protect your kingdom!'
        },
        {
          title: 'Tall Castles',
          content: 'Castles had thick walls and tall towers to keep everyone safe inside!',
          funFact: 'Some castle walls were 20 feet thick!',
          activity: 'Build a castle with pillows and blankets!'
        }
      ]
    },
    {
      id: 'pioneers',
      title: '🛤️ Pioneer Adventures',
      description: 'Learn about brave families who traveled west in covered wagons!',
      color: 'gradient-blue',
      lessons: [
        {
          title: 'Wagon Trains',
          content: 'Families packed everything in wagons and traveled together for safety!',
          funFact: 'The journey west took 4-6 months!',
          activity: 'Pack your wagon with essential supplies!'
        },
        {
          title: 'Life on the Trail',
          content: 'Pioneers cooked over campfires and slept under the stars!',
          funFact: 'Children had to walk most of the way to save space!',
          activity: 'Set up a pretend campfire and cook dinner!'
        }
      ]
    }
  ];

  const startTopic = (topicId: string) => {
    setSelectedTopic(topicId);
    updateStars(20);
    updateProgress('History', 10);
  };

  if (selectedTopic) {
    const topic = historyTopics.find(t => t.id === selectedTopic);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
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
                <h3 className="font-fredoka text-2xl font-bold text-amber-700 mb-4">
                  {lesson.title}
                </h3>
                
                <div className="bg-amber-50 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">📚 Story Time:</h4>
                  <p className="font-comic text-gray-700 text-lg">{lesson.content}</p>
                </div>

                <div className="bg-yellow-100 p-6 rounded-xl mb-4">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🤔 Did You Know?</h4>
                  <p className="font-comic text-gray-700">{lesson.funFact}</p>
                </div>

                <div className="bg-green-100 p-6 rounded-xl">
                  <h4 className="font-comic font-bold text-gray-800 mb-2">🎭 Let's Play:</h4>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
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
            🏛️ History Adventures
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Travel back in time to meet dinosaurs, explore ancient civilizations, and discover how people lived long ago!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {historyTopics.map((topic, index) => (
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
                <Badge className="bg-amber-100 text-amber-700 font-comic">
                  Historical
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">20 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${topic.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startTopic(topic.id)}
              >
                <Play className="w-4 h-4 mr-2" />
                Start Adventure
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryAdventures;
