
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Play, Globe, Star, Map, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import InteractiveMap from './components/InteractiveMap';
import CompassLesson from './components/CompassLesson';
import { geographyTopics, lessons } from './geographyExplorerData';

const GeographyExplorer = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(15);
    updateProgress('Geography', 10);
  };

  const renderTopicLessons = (topicId: string) => {
  const topic = geographyTopics[topicId as keyof typeof geographyTopics];
  if (!topic || !('lessons' in topic) || !Array.isArray(topic.lessons)) return null;

  return (
    <div className="space-y-8">
      {topic.lessons.map((lesson, index) => (
        <Card
          key={index}
          className="p-8 bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg animate-fade-in"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <div className="text-center mb-6">
            <div className="text-6xl mb-4 animate-bounce">{lesson.emoji}</div>
            <h3 className="font-fredoka text-3xl font-bold text-gray-800 mb-2">{lesson.name}</h3>
            <p className="font-comic text-lg text-gray-600">{lesson.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lesson.details.continents?.map((continent, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-2">{continent.emoji}</div>
                  <h4 className="font-fredoka font-bold text-blue-800">{continent.name}</h4>
                  <p className="font-comic text-sm text-gray-600 mb-2">{continent.fact}</p>
                  <div className="text-xs text-gray-500">
                    Countries: {continent.countries.length > 0 ? continent.countries.join(', ') : 'Research station only'}
                  </div>
                </div>
              </div>
            ))}

            {lesson.details.oceans?.map((ocean, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border-2 border-cyan-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-2">{ocean.emoji}</div>
                  <h4 className="font-fredoka font-bold text-cyan-800">{ocean.name}</h4>
                  <p className="font-comic text-sm text-gray-600 mb-2">{ocean.fact}</p>
                  <div className="text-xs text-gray-500">Animals: {ocean.animals.join(', ')}</div>
                </div>
              </div>
            ))}

            {lesson.details.countries?.map((country, i) => (
              <div key={i} className="bg-white p-4 rounded-xl border-2 border-green-200 hover:shadow-lg transition-shadow">
                <div className="text-center">
                  <div className="text-3xl mb-2">{country.emoji}</div>
                  <h4 className="font-fredoka font-bold text-green-800">{country.name}</h4>
                  <p className="font-comic text-sm text-gray-600">Capital: {country.capital}</p>
                  <p className="font-comic text-sm text-gray-600">Famous: {country.landmark}</p>
                  <p className="font-comic text-sm text-purple-600">Food: {country.food}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
};


  if (selectedLesson) {
    const lesson = lessons.find(l => l.id === selectedLesson);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
        <Header />

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-6">
            <Button onClick={() => setSelectedLesson(null)} variant="ghost" className="mr-4 font-comic">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Topics
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

          {renderTopicLessons(selectedLesson)}
          {selectedLesson === 'interactiveMap' && <InteractiveMap />}
          {selectedLesson === 'compassLesson' && <CompassLesson />}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-cyan-50">
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
            🌍 Geography Explorer
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our amazing planet! Learn about continents, countries, weather, habitats, and cultures from around the world. Become a geography expert!
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
                <Badge className={`font-comic ${lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                    lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                  }`}>
                  {lesson.difficulty}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">15 stars</span>
                </div>
              </div>

              <Button
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Globe className="w-4 h-4 mr-2" />
                Explore World
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographyExplorer;
