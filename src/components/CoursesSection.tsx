
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import CourseCard from './CourseCard';
import { Search, Filter, Grid, List } from 'lucide-react';

const CoursesSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const categories = ['All', 'Math', 'English', 'Science', 'Art', 'Music', 'Geography'];

  const courses = [
    {
      id: '1',
      title: 'Fun with Numbers',
      description: 'Learn basic math concepts through exciting games and interactive activities designed for young learners.',
      thumbnail: '',
      difficulty: 'Beginner' as const,
      duration: '2 weeks',
      students: 1520,
      rating: 4.8,
      progress: 65,
      lessons: 12,
      category: 'Math',
      gradient: 'gradient-blue',
      isNew: false
    },
    {
      id: '2',
      title: 'Reading Adventures',
      description: 'Embark on magical reading journeys with stories, phonics, and vocabulary building exercises.',
      thumbnail: '',
      difficulty: 'Beginner' as const,
      duration: '3 weeks',
      students: 2100,
      rating: 4.9,
      progress: 30,
      lessons: 18,
      category: 'English',
      gradient: 'gradient-green',
      isNew: true
    },
    {
      id: '3',
      title: 'Little Scientists',
      description: 'Discover the wonders of science through hands-on experiments and fascinating discoveries.',
      thumbnail: '',
      difficulty: 'Intermediate' as const,
      duration: '4 weeks',
      students: 980,
      rating: 4.7,
      lessons: 20,
      category: 'Science',
      gradient: 'gradient-purple',
      isNew: false
    },
    {
      id: '4',
      title: 'Creative Art Studio',
      description: 'Express creativity through drawing, painting, and crafting in this comprehensive art course.',
      thumbnail: '',
      difficulty: 'Beginner' as const,
      duration: '2 weeks',
      students: 1750,
      rating: 4.8,
      progress: 80,
      lessons: 15,
      category: 'Art',
      gradient: 'gradient-pink',
      isNew: false
    },
    {
      id: '5',
      title: 'Musical Playground',
      description: 'Learn rhythm, melody, and basic music theory through fun songs and interactive instruments.',
      thumbnail: '',
      difficulty: 'Beginner' as const,
      duration: '3 weeks',
      students: 1200,
      rating: 4.6,
      lessons: 16,
      category: 'Music',
      gradient: 'gradient-orange',
      isNew: true
    },
    {
      id: '6',
      title: 'World Explorer',
      description: 'Travel the world from home and learn about different countries, cultures, and landmarks.',
      thumbnail: '',
      difficulty: 'Intermediate' as const,
      duration: '5 weeks',
      students: 850,
      rating: 4.7,
      lessons: 25,
      category: 'Geography',
      gradient: 'gradient-blue',
      isNew: false
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 bg-gradient-to-b from-white to-orange-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-fredoka font-bold text-3xl md:text-4xl text-gray-800 mb-4">
            Explore Amazing Courses
          </h2>
          <p className="font-comic text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from hundreds of interactive courses designed to make learning fun and engaging for kids of all ages.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 font-comic rounded-full border-2 border-gray-200 focus:border-orange-300"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer font-comic font-bold px-4 py-2 rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category
                      ? 'gradient-orange text-white'
                      : 'text-gray-600 hover:bg-orange-50'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className="rounded-full"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className="rounded-full"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="font-comic text-gray-600">
            Found {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
          </p>
          <Button variant="outline" size="sm" className="font-comic rounded-full">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Courses Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} {...course} />
          ))}
        </div>

        {/* Load More */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-12">
            <Button 
              size="lg" 
              variant="outline" 
              className="font-comic font-bold px-8 py-4 rounded-full border-2 border-orange-300 text-orange-600 hover:bg-orange-50"
            >
              Load More Courses
            </Button>
          </div>
        )}

        {/* No Results */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-fredoka font-bold text-2xl text-gray-800 mb-2">
              No courses found
            </h3>
            <p className="font-comic text-gray-600 mb-6">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
              }}
              className="gradient-orange text-white font-comic font-bold rounded-full"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
