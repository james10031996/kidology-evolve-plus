
import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, Calendar, Star, Timer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import Header from '@/components/home/Header';
import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';
import InteractiveCalendar from './components/InteractiveCalendar';

const TimeAdventure = () => {
  const navigate = useNavigate();
  const { updateStars, updateProgress } = useUser();
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const lessons = [
    { 
      id: 'analog-clock', 
      title: '🕐 Analog Clock', 
      description: 'Learn to read traditional clocks with hands', 
      color: 'gradient-blue', 
      difficulty: 'Easy' 
    },
    { 
      id: 'digital-time', 
      title: '🔢 Digital Time', 
      description: 'Master digital clocks and 24-hour format', 
      color: 'gradient-green', 
      difficulty: 'Easy' 
    },
    { 
      id: 'time-concepts', 
      title: '⏰ Time Concepts', 
      description: 'Hours, minutes, seconds and time zones', 
      color: 'gradient-purple', 
      difficulty: 'Medium' 
    },
    { 
      id: 'calendar', 
      title: '📅 Calendar & Events', 
      description: 'Days, weeks, months and special events', 
      color: 'gradient-orange', 
      difficulty: 'Medium' 
    },
    { 
      id: 'time-games', 
      title: '🎮 Time Games', 
      description: 'Fun activities to practice time skills', 
      color: 'gradient-pink', 
      difficulty: 'Easy' 
    }
  ];

  const startLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    updateStars(20);
    updateProgress('Time', 15);
  };

  const renderLessonContent = () => {
    switch (selectedLesson) {
      case 'analog-clock':
        return (
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50">
              <h3 className="font-fredoka text-2xl font-bold text-center mb-6">🕐 Learning Analog Clocks</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex justify-center">
                  <AnalogClock time={currentTime} showNumbers={true} interactive={true} />
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-fredoka font-bold text-blue-700 mb-2">🕐 Clock Parts</h4>
                    <ul className="font-comic text-sm space-y-2">
                      <li>⏰ <strong>Hour Hand:</strong> Short, thick hand shows hours</li>
                      <li>⏰ <strong>Minute Hand:</strong> Long hand shows minutes</li>
                      <li>⏰ <strong>Second Hand:</strong> Thin hand that moves fast</li>
                      <li>⏰ <strong>Numbers:</strong> 12 numbers around the clock</li>
                    </ul>
                  </div>
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <h4 className="font-fredoka font-bold text-yellow-700 mb-2">🌟 Fun Facts</h4>
                    <ul className="font-comic text-sm space-y-1">
                      <li>• Each number represents 5 minutes</li>
                      <li>• Hour hand moves slowly</li>
                      <li>• Minute hand completes a full circle in 60 minutes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'digital-time':
        return (
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50">
              <h3 className="font-fredoka text-2xl font-bold text-center mb-6">🔢 Digital Time Learning</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex flex-col items-center space-y-4">
                  <DigitalClock time={currentTime} format="12" />
                  <p className="font-comic text-lg">12-Hour Format</p>
                  <DigitalClock time={currentTime} format="24" />
                  <p className="font-comic text-lg">24-Hour Format</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-fredoka font-bold text-green-700 mb-2">🔢 Reading Digital Time</h4>
                    <div className="font-comic text-sm space-y-2">
                      <p><strong>Format:</strong> Hours : Minutes : Seconds</p>
                      <p><strong>Example:</strong> 3:45:20 PM</p>
                      <p>• 3 = 3 o'clock</p>
                      <p>• 45 = 45 minutes past the hour</p>
                      <p>• 20 = 20 seconds</p>
                      <p>• PM = Afternoon/Evening</p>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-xl">
                    <h4 className="font-fredoka font-bold text-blue-700 mb-2">🌍 AM vs PM</h4>
                    <div className="font-comic text-sm space-y-1">
                      <p>• <strong>AM:</strong> Morning (12:00 AM - 11:59 AM)</p>
                      <p>• <strong>PM:</strong> Afternoon/Evening (12:00 PM - 11:59 PM)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        );

      case 'calendar':
        return (
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-orange-50 to-yellow-50">
              <h3 className="font-fredoka text-2xl font-bold text-center mb-6">📅 Calendar & Events</h3>
              <InteractiveCalendar />
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

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

          {renderLessonContent()}
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
            ⏰ Time Adventure
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Learn to read clocks, understand time, and explore calendars! Master both analog and digital time formats with fun activities.
          </p>
        </div>

        {/* Current Time Display */}
        <Card className="p-6 mb-8 bg-gradient-to-r from-yellow-100 to-orange-100">
          <div className="text-center">
            <h3 className="font-fredoka text-xl font-bold text-gray-800 mb-4">🕐 Current Time</h3>
            <div className="flex justify-center items-center space-x-8">
              <div className="flex justify-center">
                <AnalogClock time={currentTime} size="small" />
              </div>
              <div className="text-center">
                <DigitalClock time={currentTime} format="12" />
                <p className="font-comic text-sm text-gray-600 mt-2">
                  {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </div>
          </div>
        </Card>

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
                <Badge className={`font-comic ${
                  lesson.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  lesson.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {lesson.difficulty}
                </Badge>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-comic text-sm font-bold text-yellow-600">20 stars</span>
                </div>
              </div>

              <Button 
                className={`w-full ${lesson.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                onClick={() => startLesson(lesson.id)}
              >
                <Clock className="w-4 h-4 mr-2" />
                Learn Time
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimeAdventure;
