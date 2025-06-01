
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Volume2, Star, Award, Play, Pause } from 'lucide-react';

const ReadingAdventures = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [wordsRead, setWordsRead] = useState(145);

  const storyBooks = [
    {
      id: 1,
      title: 'The Magical Garden',
      author: 'Emma Stories',
      pages: 12,
      level: 'Beginner',
      cover: '🌸',
      description: 'Join Lily as she discovers a garden where flowers can talk!',
      completed: true,
      rating: 5
    },
    {
      id: 2,
      title: 'Adventure in Space',
      author: 'Cosmic Tales',
      pages: 15,
      level: 'Intermediate',
      cover: '🚀',
      description: 'Blast off with Captain Max on an exciting space mission!',
      completed: false,
      rating: 4
    },
    {
      id: 3,
      title: 'Friendly Dragons',
      author: 'Fantasy Friends',
      pages: 10,
      level: 'Beginner',
      cover: '🐉',
      description: 'Meet Sparky, the friendliest dragon in the kingdom!',
      completed: false,
      rating: 5
    },
    {
      id: 4,
      title: 'Ocean Mysteries',
      author: 'Deep Blue',
      pages: 18,
      level: 'Advanced',
      cover: '🌊',
      description: 'Dive deep with Marina to explore underwater wonders!',
      completed: false,
      rating: 4
    }
  ];

  const readingActivities = [
    {
      id: 1,
      title: 'Phonics Fun',
      description: 'Learn letter sounds with interactive games',
      icon: '🔤',
      type: 'phonics',
      progress: 75
    },
    {
      id: 2,
      title: 'Sight Words',
      description: 'Practice common words that appear in stories',
      icon: '👀',
      type: 'vocabulary',
      progress: 45
    },
    {
      id: 3,
      title: 'Reading Comprehension',
      description: 'Answer questions about the stories you read',
      icon: '🧠',
      type: 'comprehension',
      progress: 60
    },
    {
      id: 4,
      title: 'Story Creator',
      description: 'Write and illustrate your own stories',
      icon: '✍️',
      type: 'writing',
      progress: 30
    }
  ];

  const toggleReading = () => {
    setIsReading(!isReading);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Reading Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border-0 shadow-lg">
        <div className="text-center">
          <div className="w-16 h-16 gradient-purple rounded-full mx-auto mb-3 flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
            📚 Reading Adventures
          </h2>
          <p className="font-comic text-gray-600">
            Explore magical stories and improve your reading skills!
          </p>
        </div>

        {/* Reading Progress */}
        <div className="mt-6 bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-comic font-bold text-gray-800">Words Read Today</span>
            <span className="font-comic text-sm text-gray-600">{wordsRead}/200 words</span>
          </div>
          <Progress value={(wordsRead / 200) * 100} className="h-3" />
        </div>
      </Card>

      {/* Story Library */}
      <div className="grid md:grid-cols-2 gap-6">
        {storyBooks.map((book) => (
          <Card key={book.id} className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="p-4">
              <div className="flex items-start space-x-4 mb-3">
                <div className="text-4xl">{book.cover}</div>
                <div className="flex-1">
                  <h3 className="font-fredoka font-bold text-lg text-gray-800 mb-1">
                    {book.title}
                  </h3>
                  <p className="font-comic text-sm text-gray-600 mb-2">by {book.author}</p>
                  <div className="flex items-center space-x-1 mb-2">
                    {renderStars(book.rating)}
                  </div>
                </div>
              </div>

              <p className="font-comic text-sm text-gray-600 mb-4">
                {book.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-2">
                  <Badge className={`font-comic text-xs ${
                    book.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                    book.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {book.level}
                  </Badge>
                  <Badge variant="outline" className="font-comic text-xs">
                    {book.pages} pages
                  </Badge>
                </div>
                {book.completed && (
                  <Award className="w-5 h-5 text-yellow-500" />
                )}
              </div>

              <div className="flex space-x-2">
                <Button 
                  className="flex-1 gradient-purple text-white font-comic font-bold rounded-full"
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {book.completed ? 'Read Again' : 'Start Reading'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                  onClick={toggleReading}
                >
                  {isReading ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full"
                >
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Reading Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        {readingActivities.map((activity) => (
          <Card key={activity.id} className="p-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0">
            <div className="text-center mb-4">
              <div className="text-3xl mb-2">{activity.icon}</div>
              <h4 className="font-fredoka font-bold text-lg text-gray-800">{activity.title}</h4>
            </div>

            <p className="font-comic text-sm text-gray-600 mb-4 text-center">
              {activity.description}
            </p>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-comic text-sm text-gray-700">Progress</span>
                <span className="font-comic text-sm font-bold">{activity.progress}%</span>
              </div>
              <Progress value={activity.progress} className="h-2" />
            </div>

            <Button className="w-full mt-4 gradient-pink text-white font-comic font-bold rounded-full">
              Practice Now
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReadingAdventures;
