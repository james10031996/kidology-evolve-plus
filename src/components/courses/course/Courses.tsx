import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Star, Clock, Users, BookOpen, Award } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/home/Header';

const Courses = () => {
  const { userData, updateStars, updateProgress } = useUser();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const courses = [
    {
      id: 'math-basics',
      title: 'Math Adventure',
      description: 'Learn counting, addition, subtraction, and basic geometry',
      category: 'mathematics',
      difficulty: 'Beginner',
      duration: '45 min',
      lessons: 12,
      rating: 4.9,
      students: 2340,
      progress: userData.progress.find(p => p.name === 'Mathematics')?.progress || 0,
      color: 'gradient-blue',
      topics: ['Numbers', 'Addition', 'Subtraction', 'Shapes', 'Patterns'],
      nextLesson: 'Learning Numbers 1-20',
      route: '/courses/math-adventure'
    },
    {
      id: 'reading-adventure',
      title: 'Reading Adventure',
      description: 'Alphabets, vocabulary, colors, and comprehensive English learning',
      category: 'english',
      difficulty: 'Beginner',
      duration: '30 min',
      lessons: 15,
      rating: 4.8,
      students: 1890,
      progress: userData.progress.find(p => p.name === 'English')?.progress || 0,
      color: 'gradient-green',
      topics: ['Alphabets', 'Colors', 'Vocabulary', 'Body Parts', 'Animals'],
      nextLesson: 'Letter A-E with Examples',
      route: '/courses/reading-adventure'
    },
    {
      id: 'science-explorers',
      title: 'Science Explorers',
      description: 'Discover experiments, planets, weather, and amazing science facts',
      category: 'science',
      difficulty: 'Intermediate',
      duration: '40 min',
      lessons: 10,
      rating: 4.7,
      students: 1560,
      progress: userData.progress.find(p => p.name === 'Science')?.progress || 0,
      color: 'gradient-purple',
      topics: ['Experiments', 'Planets', 'Weather', 'Animals', 'Plants'],
      nextLesson: 'Fun Science Experiments',
      route: '/courses/science-explorers'
    },
    {
      id: 'creative-arts',
      title: 'Creative Arts',
      description: 'Drawing, coloring, crafts, and creative expression',
      category: 'art',
      difficulty: 'All Levels',
      duration: '35 min',
      lessons: 8,
      rating: 4.9,
      students: 1230,
      progress: userData.progress.find(p => p.name === 'Art')?.progress || 0,
      color: 'gradient-pink',
      topics: ['Drawing', 'Coloring', 'Crafts', 'Creativity'],
      nextLesson: 'Basic Shapes Drawing',
      route: '/courses/creative-arts'
    },
    {
      id: 'geography-explorer',
      title: 'Geography Explorer',
      description: 'Discover countries, continents, maps, and world wonders',
      category: 'geography',
      difficulty: 'Beginner',
      duration: '30 min',
      lessons: 12,
      rating: 4.6,
      students: 980,
      progress: userData.progress.find(p => p.name === 'Geography')?.progress || 0,
      color: 'gradient-teal',
      topics: ['Countries', 'Continents', 'Maps', 'Landmarks'],
      nextLesson: 'World Map Adventure',
      route: '/courses/geography-explorer'
    },
    {
      id: 'history-adventures',
      title: 'History Adventures',
      description: 'Journey through time with exciting historical stories',
      category: 'history',
      difficulty: 'Intermediate',
      duration: '35 min',
      lessons: 10,
      rating: 4.5,
      students: 750,
      progress: userData.progress.find(p => p.name === 'History')?.progress || 0,
      color: 'gradient-orange',
      topics: ['Ancient Times', 'Famous People', 'Inventions', 'Civilizations'],
      nextLesson: 'Ancient Civilizations',
      route: '/courses/history-adventures'
    },
    {
      id: 'social-moral',
      title: 'Social & Moral Values',
      description: 'Learn kindness, sharing, friendship, and good values',
      category: 'social',
      difficulty: 'All Levels',
      duration: '25 min',
      lessons: 8,
      rating: 4.8,
      students: 1100,
      progress: userData.progress.find(p => p.name === 'Social')?.progress || 0,
      color: 'gradient-yellow',
      topics: ['Kindness', 'Sharing', 'Friendship', 'Respect'],
      nextLesson: 'Being Kind to Others',
      route: '/courses/social-moral'
    },
    {
      id: 'nature-explorer',
      title: 'Nature Explorer',
      description: 'Explore forests, oceans, mountains, and natural wonders',
      category: 'nature',
      difficulty: 'Beginner',
      duration: '30 min',
      lessons: 10,
      rating: 4.7,
      students: 890,
      progress: userData.progress.find(p => p.name === 'Nature')?.progress || 0,
      color: 'gradient-green',
      topics: ['Forests', 'Oceans', 'Mountains', 'Wildlife'],
      nextLesson: 'Forest Adventure',
      route: '/courses/nature-explorer'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'mathematics', name: 'Mathematics', icon: '🔢' },
    { id: 'english', name: 'English', icon: '📖' },
    { id: 'science', name: 'Science', icon: '🔬' },
    { id: 'art', name: 'Art', icon: '🎨' },
    { id: 'geography', name: 'Geography', icon: '🌍' },
    { id: 'history', name: 'History', icon: '🏛️' },
    { id: 'social', name: 'Social', icon: '🤝' },
    { id: 'nature', name: 'Nature', icon: '🌲' }
  ];

  const filteredCourses = selectedCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === selectedCategory);

  const startCourse = (course: any) => {
    if (course.route) {
      navigate(course.route);
    } else {
      updateStars(10);
      updateProgress(course.title.includes('Math') ? 'Mathematics' : 
                    course.title.includes('Reading') ? 'English' :
                    course.title.includes('Science') ? 'Science' : 'Art', 5);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-fredoka font-bold text-4xl md:text-5xl text-gray-800 mb-4">
            🎓 Learning Courses
          </h1>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our exciting courses designed to make learning fun and engaging!
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className={`font-comic font-bold rounded-full ${
                selectedCategory === category.id 
                  ? 'gradient-orange text-white' 
                  : 'text-gray-700 hover:bg-orange-50'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="p-6 bg-white rounded-2xl shadow-lg border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className={`w-full h-32 ${course.color} rounded-xl mb-4 flex items-center justify-center`}>
                <div className="text-4xl text-white">
                  {course.category === 'mathematics' && '🔢'}
                  {course.category === 'english' && '📖'}
                  {course.category === 'science' && '🔬'}
                  {course.category === 'art' && '🎨'}
                  {course.category === 'geography' && '🌍'}
                  {course.category === 'history' && '🏛️'}
                  {course.category === 'social' && '🤝'}
                  {course.category === 'nature' && '🌲'}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-fredoka font-bold text-xl text-gray-800 mb-2">
                  {course.title}
                </h3>
                <p className="font-comic text-gray-600 text-sm mb-3">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="font-comic text-xs">
                    {course.difficulty}
                  </Badge>
                  <Badge variant="outline" className="font-comic text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    {course.duration}
                  </Badge>
                  <Badge variant="outline" className="font-comic text-xs">
                    <BookOpen className="w-3 h-3 mr-1" />
                    {course.lessons} lessons
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-comic text-sm font-bold text-gray-700">
                      {course.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span className="font-comic text-sm text-gray-600">
                      {course.students.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-comic text-sm text-gray-700">Progress</span>
                    <span className="font-comic text-sm font-bold text-gray-800">
                      {course.progress}%
                    </span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  {course.progress > 0 && (
                    <p className="font-comic text-xs text-gray-600 mt-1">
                      Next: {course.nextLesson}
                    </p>
                  )}
                </div>

                {/* Topics */}
                <div className="mb-4">
                  <p className="font-comic text-sm text-gray-700 mb-2">What you'll learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.topics.map((topic, index) => (
                      <Badge key={index} className="bg-gray-100 text-gray-700 text-xs font-comic">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className={`w-full ${course.color} text-white font-comic font-bold rounded-full hover:scale-105 transition-transform duration-200`}
                  onClick={() => startCourse(course)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Achievement Banner */}
        <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Award className="w-8 h-8 text-orange-500" />
            <h3 className="font-fredoka font-bold text-2xl text-gray-800">
              Complete courses to unlock achievements!
            </h3>
          </div>
          <p className="font-comic text-gray-700">
            Earn stars, unlock badges, and track your amazing learning journey.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Courses;
