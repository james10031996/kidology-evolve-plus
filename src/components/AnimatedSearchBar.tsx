
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X, Sparkles, BookOpen, Gamepad2, Palette } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  type: 'course' | 'activity' | 'game' | 'story';
  category: string;
  description: string;
  icon: React.ReactNode;
}

const AnimatedSearchBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Math Basics',
      type: 'course',
      category: 'Mathematics',
      description: 'Learn counting, addition, and subtraction',
      icon: <BookOpen className="w-4 h-4" />
    },
    {
      id: '2',
      title: 'Number Bubble Pop',
      type: 'game',
      category: 'Math Games',
      description: 'Pop bubbles in numerical order',
      icon: <Gamepad2 className="w-4 h-4" />
    },
    {
      id: '3',
      title: 'Creative Art Studio',
      type: 'activity',
      category: 'Art & Creativity',
      description: 'Express your creativity with digital art',
      icon: <Palette className="w-4 h-4" />
    },
    {
      id: '4',
      title: 'The Magic Forest Adventure',
      type: 'story',
      category: 'Stories',
      description: 'Join Luna on a magical counting adventure',
      icon: <BookOpen className="w-4 h-4" />
    }
  ];

  const filteredResults = mockResults.filter(result =>
    result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setIsExpanded(true);
    setShowResults(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      if (!searchQuery) {
        setIsExpanded(false);
      }
      setShowResults(false);
    }, 200);
  };

  const handleClear = () => {
    setSearchQuery('');
    setIsExpanded(false);
    setShowResults(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'course': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'game': return 'bg-green-100 text-green-700 border-green-200';
      case 'activity': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'story': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Bar Container */}
      <Card className={`relative overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded 
          ? 'shadow-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border-purple-200' 
          : 'shadow-lg hover:shadow-xl bg-white border-gray-200 hover:border-purple-300'
      }`}>
        <div className="relative flex items-center p-4">
          {/* Animated Background Elements */}
          <div className={`absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 opacity-0 transition-opacity duration-500 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Sparkle Decorations */}
          <div className={`absolute top-2 left-4 transition-all duration-700 ${
            isExpanded ? 'opacity-100 scale-100 rotate-12' : 'opacity-0 scale-0 rotate-0'
          }`}>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
          </div>
          
          <div className={`absolute bottom-2 right-6 transition-all duration-700 delay-200 ${
            isExpanded ? 'opacity-100 scale-100 rotate-45' : 'opacity-0 scale-0 rotate-0'
          }`}>
            <Sparkles className="w-3 h-3 text-pink-400 animate-pulse" />
          </div>

          {/* Search Icon */}
          <div className={`relative z-10 transition-all duration-300 ${
            isExpanded ? 'text-purple-600 scale-110' : 'text-gray-500'
          }`}>
            <Search className="w-5 h-5" />
          </div>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="🔍 Search courses, games, activities, and stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={`relative z-10 flex-1 mx-4 border-none bg-transparent font-comic text-gray-700 placeholder-gray-500 focus:ring-0 focus:outline-none transition-all duration-300 ${
              isExpanded ? 'text-lg' : 'text-base'
            }`}
          />

          {/* Clear Button */}
          {searchQuery && (
            <Button
              onClick={handleClear}
              variant="ghost"
              size="sm"
              className={`relative z-10 p-1 h-8 w-8 rounded-full transition-all duration-300 hover:bg-red-100 ${
                isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
              }`}
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          )}

          {/* Animated Border */}
          <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 transition-all duration-500 ${
            isExpanded ? 'w-full opacity-100' : 'w-0 opacity-0'
          }`} />
        </div>
      </Card>

      {/* Search Results */}
      {showResults && (
        <Card className={`absolute top-full left-0 right-0 mt-2 bg-white border border-purple-200 shadow-2xl z-50 transition-all duration-300 ${
          searchQuery ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          <div className="p-4">
            {searchQuery ? (
              <>
                <div className="text-sm font-comic text-gray-600 mb-3">
                  {filteredResults.length} results for "{searchQuery}"
                </div>
                
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredResults.map((result, index) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer animate-fade-in hover:scale-102 ${
                        getTypeColor(result.type)
                      }`}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          {result.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold font-comic text-gray-800">
                            {result.title}
                          </h4>
                          <p className="text-sm text-gray-600 font-comic">
                            {result.description}
                          </p>
                          <div className="text-xs text-gray-500 font-comic mt-1">
                            {result.category} • {result.type}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredResults.length === 0 && (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-2">🔍</div>
                      <div className="font-comic text-gray-500">
                        No results found for "{searchQuery}"
                      </div>
                      <div className="font-comic text-sm text-gray-400 mt-1">
                        Try searching for courses, games, or activities
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="text-4xl mb-2 animate-bounce">✨</div>
                <div className="font-comic text-gray-600 mb-2">
                  Start typing to discover amazing content!
                </div>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  {['Math', 'Games', 'Art', 'Stories', 'Science'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-comic cursor-pointer hover:bg-purple-200 transition-colors"
                      onClick={() => {
                        setSearchQuery(tag);
                        setShowResults(true);
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

export default AnimatedSearchBar;
